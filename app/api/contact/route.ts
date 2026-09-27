import { Resend } from "resend";
import { BOOKING_EMAIL, EVENT_TYPES, INTERESTS } from "@/lib/booking";

const FROM = "Peach & Pickle Website <hello@peachandpickle.com>";
const MAX_BODY_BYTES = 20_000;

type Inquiry = {
  name: string;
  email: string;
  date: string;
  eventType: string;
  venue: string;
  guests: string;
  interests: string[];
  message: string;
};

// Remove control characters; single-line fields also lose line breaks (keeps the subject header clean)
const clean = (value: unknown, max: number, multiline = false) => {
  if (typeof value !== "string") return "";
  const stripped = multiline
    ? value.replace(/\r\n?/g, "\n").replace(/[^\S\n]+\n/g, "\n").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
    : value.replace(/[\u0000-\u001F\u007F]+/g, " ");
  return stripped.trim().slice(0, max);
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[^\s@<>(),;:"]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function validate(body: Record<string, unknown>): Inquiry | null {
  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const date = clean(body.date, 10);
  const eventType = clean(body.eventType, 60);
  const venue = clean(body.venue, 200);
  const guests = clean(body.guests, 6);
  const message = clean(body.message, 5000, true);
  const interests = Array.isArray(body.interest)
    ? [...new Set(body.interest.filter((v): v is string => typeof v === "string" && INTERESTS.includes(v)))]
    : [];

  if (!name || !EMAIL_RE.test(email) || !EVENT_TYPES.includes(eventType)) return null;
  if (!DATE_RE.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) return null;
  if (guests && !/^\d{1,5}$/.test(guests)) return null;

  return { name, email, date, eventType, venue, guests, interests, message };
}

const prettyDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

function buildEmail(inquiry: Inquiry) {
  const rows: [string, string][] = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Event type", inquiry.eventType],
    ["Event date", prettyDate(inquiry.date)],
    ["Venue / city", inquiry.venue || "—"],
    ["Approximate guest count", inquiry.guests || "—"],
    ["Interested in", inquiry.interests.length ? inquiry.interests.join(", ") : "—"],
  ];
  const message = inquiry.message || "—";

  const text = [
    "New inquiry from the Peach & Pickle website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
    "",
    "Reply to this email to answer the client directly.",
  ].join("\n");

  const cell = "padding:8px 16px 8px 0;vertical-align:top;border-bottom:1px solid #eee4dc;";
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#141414;max-width:600px">
  <h2 style="margin:0 0 16px;font-size:20px">New inquiry from the Peach &amp; Pickle website</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="${cell}font-weight:bold;white-space:nowrap">${escapeHtml(label)}</td><td style="${cell}">${escapeHtml(value)}</td></tr>`,
      )
      .join("\n    ")}
  </table>
  <h3 style="margin:24px 0 8px;font-size:16px">Message</h3>
  <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
  <p style="margin:24px 0 0;font-size:13px;color:#4a4542">Reply to this email to answer the client directly.</p>
</div>`;

  return { text, html };
}

const fail = (status: number, error: string) => Response.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return fail(413, "Your message is too long.");
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "Invalid request.");
  }

  // Honeypot: real visitors never see or fill "company" — pretend it worked and drop it
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const inquiry = validate(body);
  if (!inquiry) {
    return fail(400, "Please check the form and try again.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return fail(500, "We couldn't send your message right now.");
  }

  const { text, html } = buildEmail(inquiry);
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: BOOKING_EMAIL,
      replyTo: inquiry.email,
      subject: `New Peach & Pickle inquiry — ${inquiry.eventType} — ${inquiry.name}`,
      text,
      html,
    });
    if (error) {
      // Log only the error type — never the visitor's details
      console.error(`[contact] Resend error: ${error.name}`);
      return fail(502, "We couldn't send your message right now.");
    }
  } catch {
    console.error("[contact] Resend request failed");
    return fail(502, "We couldn't send your message right now.");
  }

  return Response.json({ ok: true });
}
