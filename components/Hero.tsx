import Image from "next/image";
import Link from "next/link";

// Swap for /peach-pickle-logo.svg when the vector artwork arrives (keep the aspect ratio in sync).
const LOGO = { src: "/peach-pickle-logo.png", width: 2100, height: 1355 };

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col items-center px-5 pt-1 pb-16 text-center md:px-10 md:pt-2 md:pb-[104px]"
    >
      <h1 id="hero-title" className="w-full max-w-[900px]">
        <Image
          src={LOGO.src}
          alt="Peach & Pickle"
          width={LOGO.width}
          height={LOGO.height}
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 960px) 92vw, 900px"
          className="h-auto w-full"
        />
      </h1>

      <p className="mt-6 max-w-[300px] pl-[0.26em] text-sm leading-[1.7] font-semibold tracking-[0.26em] uppercase sm:max-w-none md:mt-[34px] md:pl-[0.36em] md:text-xl md:leading-normal md:tracking-[0.36em]">
        Fancy stuff for your ears and events
      </p>

      <p className="mt-6 max-w-[700px] text-lg leading-normal md:mt-[30px] md:text-[22px]">
        Live music for weddings, parties and events — from acoustic piano &amp; voice to lounge,
        house and electro-inspired sets.
      </p>

      <p className="mt-3 text-[15px] text-muted md:mt-3.5 md:text-base">
        <strong className="font-semibold text-ink">Simona</strong> sings ·{" "}
        <strong className="font-semibold text-ink">Xavier</strong> plays piano, keys &amp; beats
      </p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-3.5 md:mt-[38px]">
        <a
          href="#showreel"
          className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-base font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 1 L13 7 L2 13 Z" fill="currentColor" />
          </svg>
          Watch the showreel
        </a>
        <Link
          href="/book"
          className="inline-flex h-14 items-center justify-center rounded-full border-[1.5px] border-ink px-7 text-base font-semibold transition hover:-translate-y-0.5 hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Check availability
        </Link>
      </div>
    </section>
  );
}
