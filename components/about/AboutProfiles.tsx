import Image from "next/image";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import PaintDrops from "@/components/PaintDrops";

// Placeholders in [brackets] — replace with Simona & Xavier's real details.
const profiles = [
  {
    name: "Simona",
    nickname: "the peach",
    role: "Vocals",
    roleColor: "#c21f63",
    bio: "[Short bio — 2–3 sentences. Where Simona started singing, the music she loves most, and one detail that makes her human.]",
    facts: [
      { label: "Started singing", value: "[Year / place]" },
      { label: "Can’t stop listening to", value: "[Artists / genres]" },
      { label: "Go-to song at a party", value: "[Song — Artist]" },
    ],
    photo: { title: "Simona — close-up, mid-song", note: "Warm light, microphone in hand, eyes on the room.", dark: false },
    drops: { mask: "/splashes/portrait-1.png", color: "#d4246f" },
  },
  {
    name: "Xavier",
    nickname: "the pickle",
    role: "Piano · Keys · Synths · Beats",
    roleColor: "#4466c4",
    bio: "[Short bio — 2–3 sentences. How Xavier got into piano, when the synths and beats arrived, and one detail that makes him human.]",
    facts: [
      { label: "First piano", value: "[Year / place]" },
      { label: "Can’t stop listening to", value: "[Artists / genres]" },
      { label: "Go-to song at a party", value: "[Song — Artist]" },
    ],
    photo: { title: "Xavier — at the keys", note: "Hands on the piano, synth in frame, a little blue light.", dark: true },
    drops: { mask: "/splashes/portrait-2.png", color: "#4466c4" },
  },
];

function PeachIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="30" cy="36" r="22" fill="#f1ac91" />
      <path d="M32 14 C40 4 52 8 54 12 C46 18 38 18 32 14 Z" fill="#2f7a4a" />
    </svg>
  );
}

function PickleIcon() {
  return (
    <svg width="30" height="28" viewBox="0 0 70 64" aria-hidden="true">
      <rect x="10" y="18" width="52" height="28" rx="14" fill="#2f7a4a" transform="rotate(-24 36 32)" />
      <circle cx="26" cy="36" r="2.5" fill="#8bc49a" />
      <circle cx="38" cy="30" r="2.5" fill="#8bc49a" />
      <circle cx="48" cy="24" r="2.5" fill="#8bc49a" />
    </svg>
  );
}

export default function AboutProfiles() {
  return (
    <section
      aria-label="Simona and Xavier"
      className="overflow-x-clip px-5 pt-4 pb-20 sm:px-10 md:pt-10 md:pb-[150px] lg:px-16"
    >
      <div className="mx-auto grid max-w-[1312px] gap-20 md:grid-cols-2 md:items-start md:gap-[110px]">
        {profiles.map((p, i) => (
          <article key={p.name} className={`flex flex-col gap-4 md:gap-[22px] ${i === 1 ? "md:mt-[200px]" : ""}`}>
            {/* Portrait on painted brush strokes with paint drops */}
            <div className="relative mx-[26px] mt-[30px] mb-6 md:mx-7 md:mt-10 md:mb-[30px]">
              {i === 0 ? (
                <>
                  <Image
                    src="/watercolor/peach.webp"
                    alt=""
                    width={932}
                    height={1199}
                    className="pointer-events-none absolute -top-12 -left-14 w-[62%] -rotate-[20deg] opacity-90 motion-safe:animate-drift"
                  />
                  <PaintDrops
                    mask="/watercolor/grey.webp"
                    color="#e9a0bd"
                    className="-right-12 -bottom-10 aspect-[1189/887] w-[58%] rotate-[8deg] opacity-70"
                  />
                </>
              ) : (
                <>
                  <PaintDrops
                    mask="/watercolor/peach.webp"
                    color="#4466c4"
                    className="-top-12 -right-14 aspect-[932/1199] w-[58%] rotate-[16deg] opacity-55"
                  />
                  <Image
                    src="/watercolor/grey.webp"
                    alt=""
                    width={1189}
                    height={887}
                    className="pointer-events-none absolute -bottom-14 -left-16 w-[70%] opacity-75 motion-safe:animate-drift"
                    style={{ animationDelay: "-4s" }}
                  />
                </>
              )}
              <PaintDrops
                mask={p.drops.mask}
                color={p.drops.color}
                className="top-1/2 -left-[12%] aspect-[620/745] w-[124%] -translate-y-1/2"
              />
              <MediaPlaceholder
                tag="Portrait"
                title={p.photo.title}
                note={p.photo.note}
                dark={p.photo.dark}
                className="aspect-[4/5]"
              />
            </div>

            <div className="mt-1 flex items-baseline justify-between gap-5">
              <h2 className="text-[56px] leading-none font-semibold tracking-[-0.045em] md:text-[88px]">{p.name}</h2>
              <span className="flex items-center gap-2.5 text-[15px] font-semibold">
                {i === 0 ? <PeachIcon /> : <PickleIcon />}
                {p.nickname}
              </span>
            </div>
            <p className="text-[13px] font-semibold tracking-[0.22em] uppercase" style={{ color: p.roleColor }}>
              {p.role}
            </p>
            <p className="max-w-[560px] text-[17px] leading-relaxed md:text-[19px]">{p.bio}</p>
            <dl className="mt-1.5 max-w-[560px] border-t-[1.5px] border-ink">
              {p.facts.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col gap-0.5 border-b border-[#d8d2cc] py-3 md:flex-row md:justify-between md:gap-5 md:py-3.5"
                >
                  <dt className="text-sm text-muted md:text-base">{f.label}</dt>
                  <dd className="text-base font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
