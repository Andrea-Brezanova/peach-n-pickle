type Milestone = {
  who: "simona" | "xavier" | "duo";
  title: string;
  text: string;
  /** Position on the desktop drawing (in the 1312 × 600 artwork) */
  at: { x: number; y: number; w: number; align?: "right" };
};

// Placeholders in [brackets] — replace with Simona & Xavier's real story.
const milestones: Milestone[] = [
  { who: "simona", title: "[Year]", text: "[First stage — e.g. choir, school band, open mic]", at: { x: 120, y: 0, w: 240 } },
  { who: "xavier", title: "[Year]", text: "[First piano — e.g. lessons, conservatory]", at: { x: 120, y: 506, w: 240 } },
  { who: "simona", title: "[Year]", text: "[Solo milestone — e.g. first paid gigs, own project]", at: { x: 420, y: 40, w: 250 } },
  { who: "xavier", title: "[Year]", text: "[Solo milestone — e.g. bands, producing, DJ sets]", at: { x: 420, y: 462, w: 250 } },
  { who: "duo", title: "[Year] · They meet", text: "[Where and how Simona & Xavier met]", at: { x: 700, y: 360, w: 220 } },
  { who: "duo", title: "[Year] · Peach & Pickle", text: "[First gig as a duo]", at: { x: 960, y: 190, w: 220 } },
  {
    who: "duo",
    title: "Today",
    text: "Weddings, parties and events — acoustic to house.",
    at: { x: 1120, y: 340, w: 192, align: "right" },
  },
];

const laneColor = { simona: "#e0896c", xavier: "#4466c4", duo: "#8a48ae" } as const;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/** Desktop: two painted paths that merge into one. Below xl: the same story as a vertical list. */
export default function AboutPaths() {
  const meetIndex = milestones.findIndex((m) => m.title.includes("They meet"));

  return (
    <section
      aria-labelledby="paths-title"
      className="bg-sand px-5 py-[72px] sm:px-10 md:pt-[130px] md:pb-[140px] lg:px-16"
    >
      <div className="mx-auto max-w-[1312px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-[60px]">
          <h2
            id="paths-title"
            className="text-[52px] leading-none font-semibold tracking-[-0.045em] md:text-[96px] lg:text-[120px]"
          >
            Two paths.
            <br />
            One duo.
          </h2>
          <p className="text-[17px] leading-relaxed md:mb-3.5 md:max-w-[420px] md:text-[19px]">
            [One or two lines on how two solo musicians ended up as Peach &amp; Pickle.]
          </p>
        </div>

        {/* Desktop drawing */}
        <div className="relative mt-[70px] hidden aspect-[1312/600] w-full xl:block">
          <svg viewBox="0 0 1312 600" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="duoline" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#d4246f" />
                <stop offset="0.55" stopColor="#8a48ae" />
                <stop offset="1" stopColor="#5eb3e4" />
              </linearGradient>
            </defs>
            <path d="M 0 120 C 220 120, 380 140, 540 190 S 720 280, 790 300" fill="none" stroke="#f1ac91" strokeWidth="22" strokeLinecap="round" opacity=".45" />
            <path d="M 0 124 C 220 124, 380 144, 540 194 S 720 282, 790 300" fill="none" stroke="#e0896c" strokeWidth="9" strokeLinecap="round" opacity=".55" />
            <path d="M 0 480 C 220 480, 380 460, 540 410 S 720 320, 790 300" fill="none" stroke="#4466c4" strokeWidth="22" strokeLinecap="round" opacity=".35" />
            <path d="M 0 476 C 220 476, 380 456, 540 406 S 720 318, 790 300" fill="none" stroke="#4466c4" strokeWidth="9" strokeLinecap="round" opacity=".6" />
            <path d="M 790 300 C 930 300, 1100 292, 1312 292" fill="none" stroke="url(#duoline)" strokeWidth="30" strokeLinecap="round" opacity=".45" />
            <path d="M 790 300 C 930 300, 1100 292, 1312 292" fill="none" stroke="url(#duoline)" strokeWidth="12" strokeLinecap="round" />
            {[
              [770, 262, 5, "#d4246f"], [812, 252, 3, "#8a48ae"], [760, 344, 6, "#4466c4"],
              [822, 350, 3.5, "#d4246f"], [795, 238, 2.5, "#f1ac91"], [742, 330, 2.5, "#8a48ae"],
            ].map(([cx, cy, r, fill]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill as string} />
            ))}
            {[
              [150, 121, "#e0896c"], [450, 164, "#e0896c"], [150, 479, "#4466c4"], [450, 436, "#4466c4"],
              [1020, 297, "#8a48ae"], [1270, 292, "#5eb3e4"],
            ].map(([cx, cy, stroke]) => (
              <circle key={`m-${cx}-${cy}`} cx={cx} cy={cy} r="11" fill="#faf7f2" stroke={stroke as string} strokeWidth="5" />
            ))}
            <circle cx="790" cy="300" r="18" fill="#141414" />
          </svg>

          <span className="absolute text-sm font-semibold tracking-[0.2em] text-[#c8705a] uppercase" style={{ left: 0, top: pct(60, 600) }}>
            Simona
          </span>
          <span className="absolute text-sm font-semibold tracking-[0.2em] text-[#4466c4] uppercase" style={{ left: 0, top: pct(522, 600) }}>
            Xavier
          </span>
          {milestones.map((m) => (
            <div
              key={m.title + m.text}
              className={`absolute flex flex-col gap-1 ${m.at.align === "right" ? "text-right" : ""}`}
              style={{ left: pct(m.at.x, 1312), top: pct(m.at.y, 600), width: pct(m.at.w, 1312) }}
            >
              <b className="text-[22px] tracking-[-0.02em]">{m.title}</b>
              <span className="text-[15px] leading-snug text-muted">{m.text}</span>
            </div>
          ))}
        </div>

        {/* Mobile / tablet: vertical version */}
        <ol className="mt-10 xl:hidden">
          {milestones.map((m, i) => {
            const beforeMeet = i < meetIndex;
            const isMeet = i === meetIndex;
            const isLast = i === milestones.length - 1;
            return (
              <li key={m.title + m.text} className="relative grid grid-cols-[64px_minmax(0,1fr)] pb-8 last:pb-0">
                {/* Rails: two lanes before they meet, one gradient line after */}
                {beforeMeet && (
                  <>
                    <span aria-hidden="true" className="absolute top-0 bottom-0 left-3 w-[5px] rounded-full bg-[#f1ac91]/70" />
                    <span aria-hidden="true" className="absolute top-0 bottom-0 left-[38px] w-[5px] rounded-full bg-[#4466c4]/50" />
                  </>
                )}
                {isMeet && (
                  <span aria-hidden="true" className="absolute top-0 left-3 h-4 w-[31px] rounded-b-full border-x-[5px] border-b-[5px] border-[#b58ab0]" />
                )}
                {!beforeMeet && !isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-4 bottom-0 left-[23px] w-[7px] rounded-full bg-gradient-to-b from-[#d4246f] via-[#8a48ae] to-[#5eb3e4]"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`relative mt-1 rounded-full ${isMeet ? "ml-[14px] size-6 bg-ink" : "size-[22px] border-[4px] bg-cream"}`}
                  style={{
                    borderColor: isMeet ? undefined : laneColor[m.who],
                    marginLeft: isMeet ? undefined : m.who === "xavier" ? 30 : m.who === "simona" ? 4 : 16,
                  }}
                />
                <div className="flex flex-col gap-1">
                  {m.who !== "duo" && (
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: m.who === "simona" ? "#c8705a" : "#4466c4" }}>
                      {m.who === "simona" ? "Simona" : "Xavier"}
                    </span>
                  )}
                  <b className="text-[19px] tracking-[-0.02em]">{m.title}</b>
                  <span className="text-[15px] leading-snug text-muted">{m.text}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
