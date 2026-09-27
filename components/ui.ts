// Shared class strings for the recurring Peach & Pickle UI pieces.

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export const btnInk = `inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-base font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-magenta ${focusRing}`;

export const btnLine = `inline-flex h-14 items-center justify-center rounded-full border-[1.5px] border-ink bg-cream px-7 text-base font-semibold transition hover:-translate-y-0.5 hover:bg-ink hover:text-cream ${focusRing}`;

/** Big section heading used across the homepage */
export const sectionTitle = "text-[44px] leading-none font-semibold tracking-[-0.045em] md:text-[72px]";

/** Small tracked-caps label above headings (same style as the hero tagline) */
export const sectionLabel =
  "text-[13px] font-semibold tracking-[0.26em] text-[#c21f63] uppercase md:text-[15px] md:tracking-[0.32em]";

export type RGB = [number, number, number];
