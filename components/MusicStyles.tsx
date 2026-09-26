import Image from "next/image";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import Waveform from "@/components/Waveform";

type RGB = [number, number, number];

const styles: {
  letter: string;
  name: string;
  description: string;
  bestFor: string;
  cta: string;
  href: string;
  media: { title: string; note: string; dark?: boolean };
  wave: { from: RGB; to: RGB; seed: number };
}[] = [
  {
    letter: "A",
    name: "Acoustic",
    description: "Piano + voice.",
    bestFor: "Ceremonies · Apéros · Dinner",
    cta: "Hear Acoustic",
    href: "#",
    media: { title: "Simona singing at the piano", note: "Soft, close light — intimate and warm." },
    wave: { from: [241, 172, 145], to: [212, 36, 111], seed: 0.8 },
  },
  {
    letter: "B",
    name: "Lounge",
    description: "Relaxed, stylish reinterpretations.",
    bestFor: "Cocktail hours · Walking dinners · Rooftop evenings",
    cta: "Hear Lounge",
    href: "#",
    media: {
      title: "Cocktail-hour set",
      note: "Golden hour, glasses up, the duo in the corner doing its thing.",
    },
    wave: { from: [212, 36, 111], to: [138, 72, 174], seed: 2.0 },
  },
  {
    letter: "C",
    name: "House / Electro",
    description: "Keys · Beats · Live vocals.",
    bestFor: "Receptions · Parties · Late sets",
    cta: "Hear House",
    href: "#",
    media: {
      title: "Lounge / house evening set",
      note: "Pink and blue light, Xavier on synth, guests dancing.",
      dark: true,
    },
    wave: { from: [68, 102, 196], to: [94, 179, 228], seed: 3.4 },
  },
];

export default function MusicStyles() {
  return (
    <section
      aria-labelledby="music-title"
      className="relative overflow-hidden px-5 py-[72px] sm:px-10 md:pt-[130px] md:pb-[140px] lg:px-16"
    >
      {/* Watercolor strokes behind the heading */}
      <Image
        src="/watercolor/grey.webp"
        alt=""
        width={1189}
        height={887}
        className="pointer-events-none absolute top-[50px] left-[150px] w-[260px] opacity-75 motion-safe:animate-drift md:top-[70px] md:left-[330px] md:w-[480px]"
      />
      <Image
        src="/watercolor/peach.webp"
        alt=""
        width={932}
        height={1199}
        className="pointer-events-none absolute top-[30px] -left-[30px] w-[200px] -rotate-12 opacity-85 motion-safe:animate-drift md:top-5 md:left-2.5 md:w-[330px]"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative mx-auto max-w-[1312px]">
        <div className="mb-10 flex flex-col gap-4 md:mb-[72px] md:flex-row md:items-end md:justify-between md:gap-[60px]">
          <h2
            id="music-title"
            className="text-[64px] leading-none font-semibold tracking-[-0.045em] md:text-[120px] lg:text-[160px]"
          >
            Three sides.
          </h2>
          <p className="text-[17px] leading-normal md:mb-[18px] md:max-w-[420px] md:text-xl">
            Same two people. Same instruments. A completely different mood when the evening changes.
          </p>
        </div>

        <ul className="grid gap-14 md:grid-cols-3 md:items-start md:gap-8">
          {styles.map((style, i) => (
            <li key={style.letter} className={`flex flex-col gap-4 ${i === 1 ? "md:mt-14" : ""}`}>
              <MediaPlaceholder
                tag="Photo / clip"
                title={style.media.title}
                note={style.media.note}
                dark={style.media.dark}
                className="aspect-[17/18]"
              />
              <h3 className="mt-1.5 flex items-baseline gap-3.5 text-[32px] leading-none font-semibold tracking-[-0.045em] md:text-[44px]">
                <span
                  aria-hidden="true"
                  className="text-[40px] text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)] md:text-[56px]"
                >
                  {style.letter}
                </span>
                <span className="sr-only">{style.letter} — </span>
                {style.name}
              </h3>
              <p className="text-[17px] font-medium md:text-[19px]">{style.description}</p>
              <p className="text-[15px] leading-normal text-muted md:text-base">
                <b className="font-semibold text-ink">Best for</b> · {style.bestFor}
              </p>
              <a
                href={style.href}
                className="mt-1.5 inline-flex h-[50px] items-center gap-2.5 self-start rounded-full border-[1.5px] border-ink px-5 text-[15px] font-semibold transition hover:-translate-y-0.5 hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:text-base"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M2 1 L13 7 L2 13 Z" fill="currentColor" />
                </svg>
                {style.cta}
                <Waveform bars={30} height={20} barWidth={2} gap={2} {...style.wave} className="ml-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
