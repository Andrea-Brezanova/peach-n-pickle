import Image from "next/image";
import Link from "next/link";
import { btnInk, sectionLabel } from "@/components/ui";

// The booking process, written as a gig setlist
const tracks = [
  { title: "Say hello", text: "Tell us the date, the place and the vibe.", time: "2 min", color: "#e0896c" },
  { title: "Pick your sound", text: "Acoustic, lounge, party — or all three as the day goes on.", time: "1 call", color: "#d4246f" },
  { title: "Fine-tune", text: "Song requests, timings and setup, all sorted.", time: "A few emails", color: "#8a48ae" },
  { title: "Showtime", text: "You celebrate. We handle the soundtrack.", time: "All night", color: "#4466c4" },
];

export default function HowWeDoIt() {
  return (
    <section aria-labelledby="how-title" className="bg-sand px-5 py-[72px] sm:px-10 md:py-[120px] lg:px-16">
      <div className="mx-auto grid max-w-[1312px] items-center gap-11 lg:grid-cols-[minmax(0,1fr)_640px] lg:gap-20">
        <div className="flex flex-col gap-3.5 md:gap-[22px]">
          <p className={sectionLabel}>How we do it</p>
          <h2 id="how-title" className="text-[44px] leading-none font-semibold tracking-[-0.045em] md:text-[80px]">
            Booking us is
            <br className="hidden md:block" /> the easy part.
          </h2>
          <p className="max-w-[460px] text-base leading-relaxed md:text-[19px]">
            Four tracks, no filler. Here’s how it goes from your first message to the last song of the night.
          </p>
          <div className="mt-2.5 hidden lg:block">
            <Link href="/book" className={btnInk}>
              Check availability
            </Link>
          </div>
        </div>

        {/* The setlist */}
        <div className="relative mx-auto w-full max-w-[620px] -rotate-[1.5deg] bg-white px-[22px] pt-[22px] pb-4 shadow-[0_30px_50px_-30px_rgb(70_45_35/0.35)] md:px-11 md:pt-11 md:pb-9">
          <span aria-hidden="true" className="absolute -top-4 left-1/2 h-[34px] w-[130px] -translate-x-1/2 rotate-3 bg-peach/75" />
          <div className="mb-3 flex items-center justify-between md:mb-[22px]">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-semibold tracking-[0.3em] uppercase">Setlist</span>
              <span className="text-sm text-muted">Your event · [date]</span>
            </div>
            <Image
              src="/peach-pickle-wordmark.png"
              alt=""
              width={900}
              height={298}
              className="h-auto w-[90px] md:w-[160px]"
            />
          </div>
          <ol>
            {tracks.map((track, i) => (
              <li
                key={track.title}
                className={`grid grid-cols-[40px_minmax(0,1fr)] gap-x-3.5 gap-y-1 py-[11px] md:grid-cols-[52px_minmax(0,1fr)] md:py-[22px] ${
                  i === 0 ? "border-t-2 border-ink" : "border-t border-dashed border-[#b9b3ad]"
                }`}
              >
                <span className="text-xl font-semibold tracking-[-0.045em] md:text-[26px]" style={{ color: track.color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-baseline gap-2.5">
                  <h3 className="text-[21px] font-semibold tracking-[-0.03em] whitespace-nowrap md:text-[28px]">{track.title}</h3>
                  <span aria-hidden="true" className="flex-1 -translate-y-[5px] border-b-2 border-dotted border-[#b9b3ad]" />
                  <span className="text-xs font-semibold tracking-[0.16em] whitespace-nowrap text-muted uppercase">{track.time}</span>
                </div>
                <p className="col-start-2 text-sm leading-normal text-muted md:text-base">{track.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <Link href="/book" className={`${btnInk} w-full lg:hidden`}>
          Check availability
        </Link>
      </div>
    </section>
  );
}
