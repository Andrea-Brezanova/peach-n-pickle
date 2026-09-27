import Image from "next/image";
import Waveform from "@/components/Waveform";
import { sectionLabel } from "@/components/ui";

export default function SoundHero() {
  return (
    <section
      aria-labelledby="sound-title"
      className="relative flex flex-col items-center overflow-hidden px-5 pt-11 pb-16 text-center sm:px-10 md:pt-[72px] md:pb-[100px] lg:px-16"
    >
      <Image
        src="/watercolor/peach.webp"
        alt=""
        width={932}
        height={1199}
        className="pointer-events-none absolute top-5 -left-12 w-[170px] -rotate-[18deg] opacity-70 motion-safe:animate-drift md:left-[60px] md:w-[300px]"
      />
      <Image
        src="/watercolor/grey.webp"
        alt=""
        width={1189}
        height={887}
        className="pointer-events-none absolute top-[120px] -right-[70px] w-[230px] opacity-55 motion-safe:animate-drift md:top-[90px] md:right-10 md:w-[420px]"
        style={{ animationDelay: "-6s" }}
      />
      <p className={`${sectionLabel} relative md:pl-[0.32em]`}>Our sound</p>
      <h1
        id="sound-title"
        className="relative mt-4 text-[48px] leading-none font-semibold tracking-[-0.045em] md:mt-[22px] md:text-[80px] lg:text-[104px]"
      >
        One duo,
        <br className="hidden md:block" /> endless possibilities
      </h1>
      <p className="relative mt-[18px] max-w-[640px] text-[17px] leading-relaxed md:mt-7 md:text-xl">
        A taste of what we play — soft piano &amp; voice, smooth lounge and late-night house. Press play, or
        browse the songs we love to perform.
      </p>
      <div className="relative mt-8 flex h-16 items-center md:mt-11 md:h-[120px]">
        <Waveform bars={90} height={110} gap={4} from={[212, 36, 111]} to={[94, 179, 228]} seed={0.5} animated className="hidden md:flex" />
        <Waveform bars={40} height={56} from={[212, 36, 111]} to={[94, 179, 228]} seed={0.5} animated className="md:hidden" />
      </div>
    </section>
  );
}
