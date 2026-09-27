import Image from "next/image";
import Link from "next/link";
import PaintDrops from "@/components/PaintDrops";

/** Closing band: wordmark in a ring of paint drops + the two main actions. */
export default function AboutOutro() {
  return (
    <section className="relative flex flex-col items-center gap-7 overflow-hidden px-5 py-20 text-center md:py-[130px]">
      <PaintDrops
        mask="/splashes/wide-1.png"
        color="#f1ac91"
        className="top-1/2 left-1/2 aspect-[1100/669] w-[480px] -translate-x-1/2 -translate-y-1/2 md:w-[1000px]"
      />
      <Image
        src="/peach-pickle-wordmark.png"
        alt="Peach & Pickle"
        width={900}
        height={298}
        className="relative h-auto w-[260px] md:w-[420px]"
      />
      <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-3.5">
        <Link
          href="/#showreel"
          className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-base font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 1 L13 7 L2 13 Z" fill="currentColor" />
          </svg>
          Watch the showreel
        </Link>
        <Link
          href="/book"
          className="inline-flex h-14 items-center justify-center rounded-full border-[1.5px] border-ink bg-cream px-7 text-base font-semibold transition hover:-translate-y-0.5 hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Check availability
        </Link>
      </div>
    </section>
  );
}
