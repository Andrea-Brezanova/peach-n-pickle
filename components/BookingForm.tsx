"use client";

import { useState, type FormEvent } from "react";

const BOOKING_EMAIL = "peachnpicklemusic@gmail.com";

const eventTypes = [
  "Wedding",
  "Cocktail hour / reception",
  "Walking dinner",
  "Apéro",
  "Private party",
  "Corporate event",
  "Launch / special event",
  "Something else",
];

const interests = ["Acoustic", "Lounge", "House / Electro", "Full Event", "Not sure yet"];

const fieldClass =
  "h-14 w-full rounded-[14px] border-[1.5px] border-ink bg-white px-4 text-base text-ink placeholder:text-[#8a8380] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta";

/**
 * Availability request form.
 * There's no email service connected yet, so on submit it opens the visitor's email app
 * with everything pre-filled. Replace `handleSubmit` with a server action / form service later.
 */
export default function BookingForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const picked = data.getAll("interest").map(String);

    const subject = `Availability request — ${get("eventType")} on ${get("date")}`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Event date: ${get("date")}`,
      `Event type: ${get("eventType")}`,
      `Venue / city: ${get("venue") || "—"}`,
      `Approximate guest count: ${get("guests") || "—"}`,
      `Interested in: ${picked.length ? picked.join(", ") : "—"}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2 md:gap-x-5 md:gap-y-6">
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
          className="inline-flex h-[60px] items-center justify-center rounded-full bg-ink px-10 text-[17px] font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:h-[62px]"
        >
          Send request
        </button>
        <p className="text-center text-sm text-muted md:text-left">We only use your details to reply to you.</p>
      </div>

      <p role="status" aria-live="polite" className="text-[15px] leading-relaxed md:col-span-2">
        {sent && (
          <>
            Your email app should now open with your request filled in — just press send. If nothing happened,
            write to{" "}
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
