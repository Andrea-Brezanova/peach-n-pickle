"use client";

import { useState, type FormEvent } from "react";
import { BOOKING_EMAIL, EVENT_TYPES as eventTypes, INTERESTS as interests } from "@/lib/booking";

const fieldClass =
  "h-14 w-full rounded-[14px] border-[1.5px] border-ink bg-white px-4 text-base text-ink placeholder:text-[#8a8380] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta";

type Status = "idle" | "submitting" | "success" | "error";

/** Availability request form — posts to /api/contact, which emails Peach & Pickle via Resend. */
export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "");
    const payload = {
      name: get("name"),
      email: get("email"),
      date: get("date"),
      eventType: get("eventType"),
      venue: get("venue"),
      guests: get("guests"),
      interest: data.getAll("interest").map(String),
      message: get("message"),
      company: get("company"),
    };

    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) throw new Error(result.error || "");
      form.reset();
      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "");
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2 md:gap-x-5 md:gap-y-6">
      {/* Spam trap: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Name
        <input name="name" type="text" required autoComplete="name" placeholder="Your name(s)" className={fieldClass} />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Email
        <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={fieldClass} />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Event date
        <input name="date" type="date" required className={fieldClass} />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Event type
        <select name="eventType" required defaultValue={eventTypes[0]} className={fieldClass}>
          {eventTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Venue / city
        <input name="venue" type="text" placeholder="Where is it?" className={fieldClass} />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Approximate guest count
        <input name="guests" type="number" min={1} inputMode="numeric" placeholder="e.g. 80" className={fieldClass} />
      </label>

      <fieldset className="md:col-span-2">
        <legend className="mb-3 text-sm font-semibold">Interested in</legend>
        <div className="flex flex-wrap gap-2.5">
          {interests.map((interest) => (
            <label
              key={interest}
              className="inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-full border-[1.5px] border-ink bg-white px-[18px] text-[15px] font-medium has-[:checked]:bg-ink has-[:checked]:text-cream has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-magenta"
            >
              <input
                type="checkbox"
                name="interest"
                value={interest}
                defaultChecked={interest === "Full Event"}
                className="size-[18px] accent-magenta"
              />
              {interest}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2 text-sm font-semibold md:col-span-2">
        Message
        <textarea
          name="message"
          rows={5}
          placeholder="Timings, the vibe, that one song…"
          className={`${fieldClass} h-36 resize-none py-3.5`}
        />
      </label>

      <div className="flex flex-col gap-4 md:col-span-2 md:mt-2 md:flex-row md:items-center md:gap-5">
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="inline-flex h-[60px] items-center justify-center rounded-full bg-ink px-10 text-[17px] font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:h-[62px]"
        >
          {submitting ? "Sending…" : "Send request"}
        </button>
        <p className="text-center text-sm text-muted md:text-left">We only use your details to reply to you.</p>
      </div>

      <p role="status" aria-live="polite" className="text-[15px] leading-relaxed md:col-span-2">
        {status === "success" && "Thank you! Your message is on its way to Peach & Pickle. We’ll be in touch soon."}
        {status === "error" && (
          <>
            {errorMessage || "Sorry, something went wrong sending your request."} You can also write to us at{" "}
            <a href={`mailto:${BOOKING_EMAIL}`} className="font-semibold underline underline-offset-4">
              {BOOKING_EMAIL}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
