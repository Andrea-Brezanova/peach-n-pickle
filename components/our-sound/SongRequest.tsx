import Image from "next/image";
import Link from "next/link";
import { btnInk, btnLine } from "@/components/ui";

export default function SongRequest() {
  return (
    <section
      aria-labelledby="request-title"
      className="relative flex flex-col items-center overflow-hidden bg-sand px-5 pt-[72px] pb-20 text-center sm:px-10 md:py-[110px] lg:px-16"
    >
      <Image
        src="/watercolor/peach.webp"
        alt=""
        width={932}
        height={1199}
        className="pointer-events-none absolute top-5 -left-7 w-[150px] -rotate-[30deg] opacity-60 motion-safe:animate-drift md:top-10 md:left-[18%] md:w-[220px] md:opacity-70"
      />
      <Image
        src="/watercolor/grey.webp"
        alt=""
        width={1189}
        height={887}
        className="pointer-events-none absolute top-[70px] right-[18%] hidden w-[300px] opacity-55 motion-safe:animate-drift md:block"
        style={{ animationDelay: "-6s" }}
      />
      <h2 id="request-title" className="relative text-[40px] leading-none font-semibold tracking-[-0.045em] md:text-[64px]">
        Got a song in mind?
      </h2>
      <p className="relative mt-4 max-w-[520px] text-base leading-relaxed md:mt-5 md:text-[19px]">
        Send us your must-plays — and your never-plays. We’ll build the set around them.
      </p>
      <div className="relative mt-[26px] flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-3.5 md:mt-[34px]">
        <Link href="/book" className={btnInk}>
          Check availability
        </Link>
        <a href="mailto:peachnpicklemusic@gmail.com" className={btnLine}>
          Get in touch
        </a>
      </div>
    </section>
  );
}
