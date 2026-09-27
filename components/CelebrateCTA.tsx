import Image from "next/image";
import Link from "next/link";
import { btnInk, btnLine } from "@/components/ui";

/** Final booking moment: heading over the watercolor strokes. */
export default function CelebrateCTA() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative flex flex-col items-center overflow-hidden px-5 pt-[72px] pb-[88px] text-center sm:px-10 md:pt-[130px] md:pb-[150px] lg:px-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute top-[54px] left-1/2 -ml-[37px] h-[230px] w-[390px] -translate-x-1/2 md:top-[22px] md:-ml-[85px] md:h-[440px] md:w-[900px]">
        <Image
          src="/watercolor/peach.webp"
          alt=""
          width={932}
          height={1199}
          className="absolute -top-2.5 left-10 w-[170px] -rotate-[62deg] opacity-85 motion-safe:animate-drift md:top-0 md:left-[150px] md:w-[330px]"
        />
        <Image
          src="/watercolor/grey.webp"
          alt=""
          width={1189}
          height={887}
          className="absolute top-5 left-[170px] w-[230px] opacity-70 motion-safe:animate-drift md:top-10 md:left-[420px] md:w-[460px]"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <h2
        id="cta-title"
        className="relative mt-[110px] text-[38px] leading-none font-semibold tracking-[-0.045em] md:mt-[90px] md:text-[72px]"
      >
        Got something worth
        <br className="hidden md:block" /> celebrating?
      </h2>
      <p className="relative mt-[18px] max-w-[560px] text-[17px] leading-normal md:mt-7 md:text-[21px]">
        Tell us where, when and what you’re planning. We’ll take it from there.
      </p>
      <div className="relative mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-3.5 md:mt-10">
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
