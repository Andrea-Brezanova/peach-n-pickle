"use client";

import { useMemo, useState } from "react";
import { btnInk, btnLine, sectionLabel } from "@/components/ui";

type Style = "Acoustic" | "Lounge" | "House / Electro";
type Song = { title: string; artist: string; style: Style; moment: string; length: string };

// [Placeholders] — replace with the real repertoire (or load it from a CMS / spreadsheet later)
const songs: Song[] = [
  { title: "[Song title]", artist: "[Artist]", style: "Acoustic", moment: "Ceremony", length: "[3:40]" },
  { title: "[Song title]", artist: "[Artist]", style: "Acoustic", moment: "Dinner", length: "[3:40]" },
  { title: "[Song title]", artist: "[Artist]", style: "Lounge", moment: "Cocktails", length: "[3:40]" },
  { title: "[Song title]", artist: "[Artist]", style: "Lounge", moment: "Dinner", length: "[3:40]" },
  { title: "[Song title]", artist: "[Artist]", style: "House / Electro", moment: "Party", length: "[3:40]" },
  { title: "[Song title]", artist: "[Artist]", style: "Acoustic", moment: "First dance", length: "[3:40]" },
  { title: "[Song title]", artist: "[Artist]", style: "Lounge", moment: "Apéro", length: "[3:40]" },
  { title: "[Song title]", artist: "[Artist]", style: "House / Electro", moment: "Late set", length: "[3:40]" },
];

const styleColor: Record<Style, string> = { Acoustic: "#e0896c", Lounge: "#d4246f", "House / Electro": "#4466c4" };
const filters = ["All", "Acoustic", "Lounge", "House / Electro", "Ceremony", "Dinner", "Party"] as const;
const PAGE = 8;

function PlayButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sand transition hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <svg viewBox="0 0 14 14" aria-hidden="true" className="ml-0.5 size-3">
        <path d="M3 1 L13 7 L3 13 Z" fill="currentColor" />
      </svg>
    </button>
  );
}

export default function Repertoire() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return songs.filter((s) => {
      const matchesFilter = filter === "All" || s.style === filter || s.moment === filter;
      const matchesQuery = !q || `${s.title} ${s.artist}`.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const shown = results.slice(0, visible);

  return (
    <section aria-labelledby="songs-title" className="px-5 py-16 sm:px-10 md:py-[110px] lg:px-16">
      <div className="mx-auto max-w-[1312px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex flex-col gap-3 md:gap-3.5">
            <p className={sectionLabel}>Repertoire</p>
            <h2 id="songs-title" className="text-[38px] leading-none font-semibold tracking-[-0.045em] md:text-[64px]">
              Songs we play.
            </h2>
          </div>
          <label className="flex h-[52px] items-center gap-2.5 rounded-full border-[1.5px] border-ink bg-white px-[18px] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-magenta md:w-[360px]">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <path d="M11 11 L14.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Search songs</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE);
              }}
              placeholder="Search a song or artist"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8380]"
            />
          </label>
        </div>

        <div role="group" aria-label="Filter songs" className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:mt-7 md:flex-wrap [&::-webkit-scrollbar]:hidden">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setVisible(PAGE);
              }}
              className={`h-10 shrink-0 rounded-full border-[1.5px] border-ink px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:h-[42px] md:text-[15px] ${
                filter === f ? "bg-ink text-cream" : "hover:bg-sand"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-4 border-t-2 border-ink md:mt-7">
          <div
            aria-hidden="true"
            className="hidden grid-cols-[48px_44px_minmax(0,1fr)_170px_150px_70px] gap-4 border-b border-[#d8d2cc] py-3 text-xs font-semibold tracking-[0.16em] text-[#6b6460] uppercase md:grid"
          >
            <span>#</span>
            <span />
            <span>Song</span>
            <span>Style</span>
            <span>Moment</span>
            <span className="text-right">Time</span>
          </div>
          <ul>
            {shown.map((s, i) => (
              <li
                key={i}
                className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-3 border-b border-[#d8d2cc] py-3 md:grid-cols-[48px_44px_minmax(0,1fr)_170px_150px_70px] md:gap-4 md:py-3.5"
              >
                <span className="hidden text-sm text-[#6b6460] md:block">{String(i + 1).padStart(2, "0")}</span>
                <PlayButton label={`Play a sample of ${s.title} by ${s.artist}`} />
                <span className="flex flex-col gap-0.5 md:block">
                  <b className="text-base font-semibold md:text-lg">{s.title}</b>
                  <span className="text-[13px] text-muted md:hidden">
                    {s.artist} · {s.style}
                  </span>
                  <span className="hidden font-normal text-muted md:inline md:text-lg"> — {s.artist}</span>
                </span>
                <span className="hidden items-center gap-2 text-sm md:flex">
                  <span className="size-2.5 rounded-full" style={{ background: styleColor[s.style] }} />
                  {s.style}
                </span>
                <span className="hidden text-sm text-muted md:block">{s.moment}</span>
                <span className="hidden text-right text-sm text-[#6b6460] md:block">{s.length}</span>
              </li>
            ))}
            {shown.length === 0 && <li className="py-6 text-muted">No songs match — try another filter.</li>}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:mt-7 md:flex-row md:items-center md:justify-between">
          <span className="text-sm text-muted md:text-[15px]" aria-live="polite">
            Showing {shown.length} of {results.length} songs
          </span>
          <div className="flex flex-col gap-3 md:flex-row">
            {visible < results.length && (
              <button type="button" onClick={() => setVisible((v) => v + PAGE)} className={`${btnLine} h-[50px]`}>
                Show more
              </button>
            )}
            {/* Point this at the real PDF, e.g. /repertoire.pdf in /public */}
            <a href="#" className={`${btnInk} h-[50px]`}>
              Download full repertoire (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
