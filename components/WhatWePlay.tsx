import Image from "next/image";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import { sectionLabel, sectionTitle } from "@/components/ui";

// Each style gets a video (placeholder for now) — rows alternate video left / right.
const styles: {
  name: string;
  text: string;
  bestFor: string;
  video: string;
  dark?: boolean;
}[] = [
  {
    name: "Acoustic",
    text: "Piano + voice. Soft, close and a little goosebumpy.",
    bestFor: "Ceremonies · Apéros · Dinner",
    video: "Video · acoustic set, piano + voice",
  },
  {
    name: "Lounge",
    text: "Relaxed, stylish reinterpretations of songs you know.",
    bestFor: "Cocktail hours · Walking dinners",
    video: "Video · lounge set at cocktail hour",
  },
  {
    name: "House / Electro",
    text: "Keys, beats and live vocals — for when the party starts.",
    bestFor: "Receptions · Parties · Late sets",
    video: "Video · house set, guests dancing",
    dark: true,
  },
];

export default function WhatWePlay() {
  return (
    <section
      aria-labelledby="play-title"
      className="relative overflow-hidden px-5 py-[72px] sm:px-10 md:pt-[120px] md:pb-[130px] lg:px-16"
    >
      <Image
        src="/watercolor/peach.webp"
        alt=""
        width={932}
        height={1199}
        className="pointer-events-none absolute top-2.5 -left-[70px] w-40 -rotate-[18deg] opacity-60 motion-safe:animate-drift md:top-10 md:right-[-80px] md:left-auto md:w-[260px] md:rotate-[18deg]"
      />
      <Image
        src="/watercolor/grey.webp"
        alt=""
        width={1189}
        height={887}
        className="pointer-events-none absolute bottom-[60px] -left-[100px] hidden w-[340px] opacity-50 motion-safe:animate-drift md:block"
        style={{ animationDelay: "-6s" }}
      />
      <Image
        src="/watercolor/peach.webp"
        alt=""
        width={932}
        height={1199}
        className="pointer-events-none absolute top-[44%] -left-[60px] hidden w-[200px] rotate-[64deg] opacity-45 motion-safe:animate-drift md:block lg:left-[-40px]"
        style={{ animationDelay: "-3s" }}
      />
      <Image
        src="/watercolor/lavender.webp"
        alt=""
        width={1189}
        height={887}
        className="pointer-events-none absolute top-[63%] -right-[90px] w-[220px] -rotate-12 opacity-40 motion-safe:animate-drift md:w-[300px]"
        style={{ animationDelay: "-9s" }}
      />

      <div className="relative mx-auto max-w-[1312px]">
        <div className="flex flex-col items-center text-center">
          <p className={`${sectionLabel} md:pl-[0.32em]`}>What we play</p>
          <h2 id="play-title" className={`${sectionTitle} mt-3.5 md:mt-5`}>
            From piano &amp; voice
            <br className="hidden md:block" /> to the dancefloor.
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-[52px] md:mt-[88px] md:gap-24">
          {styles.map((style, i) => (
            <article
              key={style.name}
              className={`flex flex-col gap-3.5 lg:items-center lg:justify-between lg:gap-[72px] ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Swap for a <video> once the clip exists */}
              <MediaPlaceholder
                tag="Video"
                note={style.video}
                dark={style.dark}
                className="aspect-[680/420] w-full shrink-0 lg:w-[52%]"
              >
                <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream shadow-[0_18px_40px_-18px_rgb(20_20_20/0.45)] md:size-24">
                  <svg viewBox="0 0 14 14" aria-hidden="true" className="ml-1 size-5 text-ink md:size-8">
                    <path d="M3 1 L13 7 L3 13 Z" fill="currentColor" />
                  </svg>
                </span>
              </MediaPlaceholder>

              <div className="flex flex-col gap-3.5 md:gap-[18px] lg:max-w-[460px]">
                <h3 className="mt-1.5 text-4xl leading-none font-semibold tracking-[-0.045em] md:text-[64px] lg:mt-0">
                  {style.name}
                </h3>
                <p className="text-base leading-normal md:text-[19px]">{style.text}</p>
                <p className="text-sm text-muted md:text-[15px]">
                  <b className="font-semibold text-ink">Best for</b> · {style.bestFor}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
