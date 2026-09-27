"use client";

import { useState } from "react";
import Image from "next/image";

// Placeholders — replace with real reviews (never invent testimonials).
const testimonials = [
  {
    quote: "[Testimonial — a few warm sentences from a real couple or client, in their own words.]",
    name: "[Couple / client name]",
    event: "[Wedding · Venue, City]",
  },
  {
    quote: "[Second testimonial — e.g. about the moment the party started.]",
    name: "[Client name]",
    event: "[Private party · City]",
  },
  {
    quote: "[Third testimonial — e.g. from a venue or event planner.]",
    name: "[Name]",
    event: "[Venue / company]",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  const go = (step: number) => setIndex((i) => (i + step + testimonials.length) % testimonials.length);

  const arrowClass =
    "flex size-12 items-center justify-center rounded-full border-[1.5px] border-cream text-cream transition hover:bg-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream";

  return (
    <section
      aria-labelledby="reviews-title"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-ink px-5 py-[72px] text-center text-cream sm:px-10 md:py-[120px] lg:px-16"
    >
      <Image
        src="/watercolor/peach.webp"
        alt=""
        width={932}
        height={1199}
        className="pointer-events-none absolute -top-12 -left-[70px] w-44 -rotate-[16deg] opacity-[0.28] motion-safe:animate-drift md:-top-20 md:-left-10 md:w-80"
      />
      <Image
        src="/watercolor/grey.webp"
        alt=""
        width={1189}
        height={887}
        className="pointer-events-none absolute -right-[90px] -bottom-10 w-56 opacity-[0.18] motion-safe:animate-drift md:-right-[60px] md:-bottom-[60px] md:w-[420px]"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative mx-auto flex max-w-[980px] flex-col items-center">
        <h2
          id="reviews-title"
          className="pl-[0.26em] text-[13px] font-semibold tracking-[0.26em] text-peach uppercase md:pl-[0.32em] md:text-[15px] md:tracking-[0.32em]"
        >
          Kind words
        </h2>

        <figure
          aria-live="polite"
          aria-label={`Review ${index + 1} of ${testimonials.length}`}
          className="mt-5 flex flex-col items-center gap-5 md:mt-8 md:gap-[30px]"
        >
          <span aria-hidden="true" className="h-11 text-[110px] leading-[0.5] font-semibold text-magenta md:h-[70px] md:text-[160px]">
            “
          </span>
          <blockquote className="text-[28px] leading-[1.2] font-medium tracking-[-0.02em] md:text-[46px]">
            {current.quote}
          </blockquote>
          <figcaption className="flex items-center gap-3.5 text-left">
            <span aria-hidden="true" className="media-placeholder-dark size-[52px] rounded-full border border-cream/30 md:size-[60px]" />
            <span className="flex flex-col">
              <b className="text-base md:text-lg">{current.name}</b>
              <span className="text-sm text-[#cfc7c0] md:text-[15px]">{current.event}</span>
            </span>
          </figcaption>
        </figure>

        <div className="mt-8 flex items-center gap-[22px] md:mt-12">
          <button type="button" aria-label="Previous review" onClick={() => go(-1)} className={arrowClass}>
            <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M11 3 L5 9 L11 15" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name + i}
                type="button"
                aria-label={`Show review ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${
                  i === index ? "w-[26px] bg-peach" : "w-1.5 bg-cream/35"
                }`}
              />
            ))}
          </div>
          <button type="button" aria-label="Next review" onClick={() => go(1)} className={arrowClass}>
            <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M7 3 L13 9 L7 15" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
