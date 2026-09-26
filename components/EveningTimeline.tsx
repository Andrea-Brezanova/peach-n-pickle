import Image from "next/image";
import Link from "next/link";
import Waveform from "@/components/Waveform";

type RGB = [number, number, number];

// The evening gets busier from left to right: taller bars and a faster pulse
const moments: {
  time: string;
  stage: string;
  music: string;
  dot: string;
  label: string;
  wave: { from: RGB; to: RGB; height: number; duration: number; seed: number };
}[] = [
  {
    time: "16:00",
    stage: "Ceremony",
    music: "Piano + voice",
    dot: "#f1ac91",
    label: "#f1ac91",
    wave: { from: [241, 172, 145], to: [241, 172, 145], height: 12, duration: 2.4, seed: 0.4 },
  },
  {
    time: "18:00",
    stage: "Cocktails",
    music: "Lounge & acoustic grooves",
    dot: "#e0607f",
    label: "#f08fb0",
    wave: { from: [241, 172, 145], to: [212, 36, 111], height: 20, duration: 1.8, seed: 1.3 },
  },
  {
    time: "20:00",
    stage: "Dinner",
    music: "Soulful, relaxed live music",
    dot: "#a45bc2",
    label: "#c49ae0",
    wave: { from: [212, 36, 111], to: [138, 72, 174], height: 28, duration: 1.3, seed: 2.2 },
  },
  {
    time: "23:00",
    stage: "Party",
    music: "House · Electro · Live vocals",
    dot: "#5eb3e4",
    label: "#8fcdf0",
    wave: { from: [138, 72, 174], to: [94, 179, 228], height: 40, duration: 0.8, seed: 3.1 },
  },
];

export default function EveningTimeline() {
  return (
    <section
      aria-labelledby="evening-title"
      className="relative overflow-hidden bg-ink px-5 py-[72px] text-cream sm:px-10 md:pt-[130px] md:pb-[140px] lg:px-16"
    >
      <Image
        src="/watercolor/peach.webp"
        alt=""
        width={932}
        height={1199}
        className="pointer-events-none absolute -top-20 -right-24 w-60 rotate-[18deg] opacity-30 motion-safe:animate-drift md:-top-[120px] md:-right-20 md:w-[420px] md:opacity-[0.32]"
      />

      <div className="relative mx-auto max-w-[1312px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-[60px]">
          <h2
            id="evening-title"
            className="text-[46px] leading-none font-semibold tracking-[-0.045em] md:text-[88px] lg:text-[120px]"
          >
            One duo.
            <br />
            Your whole
            <br />
            evening.
          </h2>
          <div className="flex flex-col gap-[22px] md:max-w-[420px] md:pb-3">
            <p className="text-[17px] leading-relaxed text-[#e6dfda] md:text-[19px]">
              Most events need three kinds of music. You only need one act. We start soft for the
              ceremony and turn it up as the night takes off.
            </p>
            {/* Desktop: underlined link — mobile: the button at the end of the section */}
            <Link
              href="/book"
              className="hidden self-start text-[17px] font-semibold text-peach underline decoration-2 underline-offset-[6px] hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach md:inline"
            >
              Plan your evening with us →
            </Link>
          </div>
        </div>

        <div className="relative mt-10 md:mt-24">
          {/* One continuous line behind the markers on desktop */}
          <div
            aria-hidden="true"
            className="absolute top-[9px] right-0 left-2.5 hidden h-[3px] bg-[linear-gradient(90deg,#f1ac91,#d4246f_40%,#8a48ae_70%,#5eb3e4)] md:block"
          />
          <ol className="relative flex flex-col md:grid md:grid-cols-4 md:gap-10">
            {moments.map((moment, i) => {
              const next = moments[i + 1];
              return (
                <li
                  key={moment.time}
                  className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-4 pb-[30px] last:pb-0 md:flex md:flex-col md:gap-3.5 md:pb-0"
                >
                  {/* Mobile: vertical line segment down to the next marker */}
                  {next && (
                    <span
                      aria-hidden="true"
                      className="absolute top-3 -bottom-1 left-2.5 w-[3px] md:hidden"
                      style={{ background: `linear-gradient(180deg, ${moment.dot}, ${next.dot})` }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="relative mt-2 size-[22px] rounded-full md:mt-0 md:shadow-[0_0_0_6px_var(--color-ink)]"
                    style={{ background: moment.dot }}
                  />
                  <div className="flex flex-col gap-1.5 md:gap-3.5">
                    <p className="text-[40px] leading-none font-semibold tracking-[-0.045em] md:mt-[18px] md:text-[64px]">
                      <time>{moment.time}</time>
                    </p>
                    <h3
                      className="text-[13px] font-semibold tracking-[0.22em] uppercase"
                      style={{ color: moment.label }}
                    >
                      {moment.stage}
                    </h3>
                    <p className="text-lg font-medium md:text-xl">{moment.music}</p>
                    <div className="mt-1 flex h-11 items-center">
                      <Waveform {...moment.wave} animated />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-10 text-[15px] text-[#b8afa9] md:mt-14">
          Times are an example — we build the running order around your day.
        </p>

        <Link
          href="/book"
          className="mt-9 flex h-14 w-full items-center justify-center rounded-full bg-cream text-base font-semibold text-ink transition hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream md:hidden"
        >
          Plan your evening with us
        </Link>
      </div>
    </section>
  );
}
