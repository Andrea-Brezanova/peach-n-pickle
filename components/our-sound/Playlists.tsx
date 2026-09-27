import Image from "next/image";
import Waveform from "@/components/Waveform";
import { sectionLabel, type RGB } from "@/components/ui";

// [Placeholders] — add real song counts, lengths and playlist links
const playlists: {
  name: string;
  text: string;
  cover: string;
  stroke: string;
  accent: string;
  href: string;
  wave: { from: RGB; to: RGB; duration: number; seed: number };
}[] = [
  {
    name: "Acoustic",
    text: "Piano + voice for ceremonies, apéros and dinners.",
    cover: "#f7d9cd",
    stroke: "/watercolor/peach.webp",
    accent: "#e0896c",
    href: "#",
    wave: { from: [241, 172, 145], to: [224, 137, 108], duration: 2.4, seed: 0.4 },
  },
  {
    name: "Lounge",
    text: "Relaxed, stylish reworks for cocktails and walking dinners.",
    cover: "#f3cad9",
    stroke: "/watercolor/grey.webp",
    accent: "#d4246f",
    href: "#",
    wave: { from: [212, 36, 111], to: [138, 72, 174], duration: 1.4, seed: 2.2 },
  },
  {
    name: "House / Electro",
    text: "Keys, beats and live vocals for the late set.",
    cover: "#cdd6f3",
    stroke: "/watercolor/peach.webp",
    accent: "#4466c4",
    href: "#",
    wave: { from: [138, 72, 174], to: [94, 179, 228], duration: 0.8, seed: 3.1 },
  },
];

export default function Playlists() {
  return (
    <section aria-labelledby="playlists-title" className="bg-sand pt-16 pb-14 md:px-10 md:pt-[110px] md:pb-[120px] lg:px-16">
      <div className="mx-auto max-w-[1312px]">
        <div className="flex flex-col gap-3 px-5 md:flex-row md:items-end md:justify-between md:px-0">
          <div className="flex flex-col gap-3 md:gap-3.5">
            <p className={sectionLabel}>Playlists</p>
            <h2 id="playlists-title" className="text-[38px] leading-none font-semibold tracking-[-0.045em] md:text-[64px]">
              Listen before you book.
            </h2>
          </div>
          <p className="max-w-[360px] text-base leading-relaxed text-muted md:mb-2.5 md:text-[17px]">
            Three moods, one duo. Pick the one that sounds like your event — or all three.
          </p>
        </div>

        <ul className="mt-7 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mt-12 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {playlists.map((p) => (
            <li key={p.name} className="w-[74vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
              <article className="flex flex-col gap-3.5">
                <div className="relative aspect-square overflow-hidden" style={{ background: p.cover }}>
                  <Image
                    src={p.stroke}
                    alt=""
                    width={932}
                    height={1199}
                    className="absolute -top-[18%] -left-[20%] w-[90%] -rotate-[24deg] opacity-85"
                  />
                  <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
                    <Waveform {...p.wave} bars={36} height={90} animated />
                  </div>
                  <span className="absolute top-4 left-[18px] text-xs font-semibold tracking-[0.2em] uppercase">Playlist</span>
                  <a
                    href={p.href}
                    aria-label={`Play the ${p.name} playlist`}
                    className="absolute right-4 bottom-4 flex size-14 items-center justify-center rounded-full bg-cream transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:size-16"
                  >
                    <svg viewBox="0 0 14 14" aria-hidden="true" className="ml-0.5 size-5">
                      <path d="M3 1 L13 7 L3 13 Z" fill="currentColor" />
                    </svg>
                  </a>
                </div>
                <h3 className="mt-1 text-[26px] leading-none font-semibold tracking-[-0.04em] md:text-[34px]">{p.name}</h3>
                <p className="text-[15px] leading-normal text-muted">{p.text}</p>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted">[12] songs · [48] min</span>
                  <a
                    href={p.href}
                    className="font-semibold underline decoration-[3px] underline-offset-[6px] hover:text-magenta"
                    style={{ textDecorationColor: p.accent }}
                  >
                    Listen on Spotify →
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
