import Link from "next/link";
import MediaPlaceholder from "@/components/MediaPlaceholder";

type EventCard =
  | { kind: "feature"; title: string; text: string; cta: string; href: string }
  | { kind: "event"; title: string; text: string; dark?: boolean }
  | { kind: "cta"; eyebrow: string; title: string; href: string };

// Order matters: it fills the grid left→right, top→bottom (Weddings spans two rows on desktop)
const cards: EventCard[] = [
  {
    kind: "feature",
    title: "Weddings",
    text: "Ceremony, cocktails, dinner and the party after. One act for all of it.",
    cta: "Weddings page",
    href: "#",
  },
  { kind: "event", title: "Cocktail Hours", text: "Lounge sets with a little shimmy." },
  { kind: "event", title: "Walking Dinners", text: "Music that moves between courses." },
  { kind: "event", title: "Apéros", text: "Spritz-friendly acoustic sessions." },
  { kind: "event", title: "Private Parties", text: "Your birthday, your garden, our piano.", dark: true },
  {
    kind: "event",
    title: "Corporate Events",
    text: "Receptions and dinners that deserve better than a playlist.",
  },
  { kind: "event", title: "Launches & Special Events", text: "Openings, launches and one-off nights." },
  { kind: "cta", eyebrow: "Something else in mind?", title: "Tell us about your event →", href: "/book" },
];

export default function EventsGrid() {
  return (
    <section
      aria-labelledby="events-title"
      className="bg-sand px-5 py-[72px] sm:px-10 md:pt-[130px] md:pb-[140px] lg:px-16"
    >
      <div className="mx-auto max-w-[1312px]">
        <div className="mb-7 flex flex-col gap-6 md:mb-[60px] md:flex-row md:items-end md:justify-between md:gap-[60px]">
          <h2
            id="events-title"
            className="text-[60px] leading-none font-semibold tracking-[-0.045em] md:text-[110px] lg:text-[150px]"
          >
            Weddings.
            <span className="mt-3 block text-2xl leading-tight font-normal tracking-[-0.02em] md:mt-6 md:text-[40px] md:leading-none md:tracking-[-0.03em] lg:text-[52px]">
              Also pretty much everything else.
            </span>
          </h2>
          <Link
            href="/book"
            className="hidden h-14 shrink-0 items-center rounded-full bg-ink px-7 text-base font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:mb-2 md:inline-flex"
          >
            Tell us about your event
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:grid-rows-[repeat(3,300px)] md:gap-5">
          {cards.map((card) => {
            if (card.kind === "feature") {
              return (
                <li key={card.title} className="col-span-2 md:col-span-1 md:row-span-2">
                  <MediaPlaceholder tag="Photo" className="h-[280px] md:h-full md:p-8">
                    <h3 className="text-[34px] leading-none font-semibold tracking-[-0.045em] md:text-[52px]">
                      {card.title}
                    </h3>
                    <p className="mt-1 max-w-[380px] text-[15px] leading-normal md:text-[17px]">{card.text}</p>
                    <a
                      href={card.href}
                      className="mt-2.5 self-start text-base font-semibold underline decoration-peach decoration-2 underline-offset-[6px] hover:text-magenta focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      {card.cta} →
                    </a>
                  </MediaPlaceholder>
                </li>
              );
            }
            if (card.kind === "cta") {
              return (
                <li key={card.title} className="col-span-2 md:col-span-1">
                  <Link
                    href={card.href}
                    className="flex h-full min-h-[170px] flex-col justify-between gap-6 bg-ink p-6 text-cream transition hover:bg-[#2a2626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:p-7"
                  >
                    <span className="text-base text-[#cfc7c0] md:text-[17px]">{card.eyebrow}</span>
                    <span className="text-[28px] leading-tight font-semibold tracking-[-0.045em] md:text-4xl">
                      {card.title}
                    </span>
                  </Link>
                </li>
              );
            }
            return (
              <li key={card.title}>
                <MediaPlaceholder tag="Photo" dark={card.dark} className="h-[170px] p-3.5 md:h-full md:p-[22px]">
                  <h3 className="text-lg leading-tight font-semibold tracking-[-0.02em] md:text-[28px]">
                    {card.title}
                  </h3>
                  <p className={`hidden text-sm leading-snug sm:block ${card.dark ? "text-[#cfc7c0]" : "text-muted"}`}>
                    {card.text}
                  </p>
                </MediaPlaceholder>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
