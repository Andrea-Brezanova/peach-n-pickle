import Image from "next/image";
import Link from "next/link";
import Waveform from "@/components/Waveform";

type UnderConstructionProps = {
  /** Page name shown as the small label, e.g. "Weddings" */
  page: string;
};

/** Friendly placeholder for routes that aren't built yet (instead of a 404). */
export default function UnderConstruction({ page }: UnderConstructionProps) {
  return (
    <section
      aria-labelledby="uc-title"
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-24 text-center sm:px-10 md:py-32"
    >
      <Image
        src="/watercolor/peach.webp"
        alt=""
        width={932}
        height={1199}
        className="pointer-events-none absolute top-6 -left-16 w-44 -rotate-[18deg] opacity-70 motion-safe:animate-drift md:top-10 md:left-[8%] md:w-72"
      />
      <Image
        src="/watercolor/grey.webp"
        alt=""
        width={1189}
        height={887}
        className="pointer-events-none absolute -right-20 bottom-8 w-56 opacity-60 motion-safe:animate-drift md:right-[6%] md:bottom-12 md:w-96"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative flex flex-col items-center">
        <p className="pl-[0.32em] text-[13px] font-semibold tracking-[0.32em] text-[#c21f63] uppercase md:text-[15px]">
          {page}
        </p>
        <h1
          id="uc-title"
          className="mt-5 max-w-[760px] text-[42px] leading-none font-semibold tracking-[-0.045em] md:text-[72px]"
        >
          This page is under construction
        </h1>
        <div className="mt-8 flex h-12 items-center">
          <Waveform bars={48} height={40} from={[212, 36, 111]} to={[94, 179, 228]} seed={1.7} animated />
        </div>
        <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-muted md:text-lg">
          We’re still tuning this one up. In the meantime, have a listen or check if we’re free for your date.
        </p>
        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-3.5">
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
            className="inline-flex h-14 items-center justify-center rounded-full border-[1.5px] border-ink px-7 text-base font-semibold transition hover:-translate-y-0.5 hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Check availability
          </Link>
        </div>
      </div>
    </section>
  );
}
