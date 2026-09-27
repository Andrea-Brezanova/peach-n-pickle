import MediaPlaceholder from "@/components/MediaPlaceholder";
import CircleDrops from "@/components/CircleDrops";
import { cardDropSets } from "@/components/dropSets";
import { sectionLabel, sectionTitle } from "@/components/ui";

const places = [
  { name: "Weddings", photo: "Photo · ceremony or first dance", color: "#e4a88f" },
  { name: "Private parties", photo: "Photo · garden or dinner party", color: "#c2567c" },
  { name: "Venues & special events", photo: "Photo · hotel or restaurant evening", color: "#6076b0" },
];

export default function WhereWePlay() {
  return (
    <section aria-labelledby="where-title" className="bg-sand pt-[72px] pb-16 md:px-10 md:pt-[110px] md:pb-[130px] lg:px-16">
      <div className="mx-auto max-w-[1312px]">
        <div className="flex flex-col items-center px-5 text-center md:px-0">
          <p className={`${sectionLabel} md:pl-[0.32em]`}>Where we play</p>
          <h2 id="where-title" className={`${sectionTitle} mt-3.5 md:mt-5`}>
            Weddings, parties
            <br className="hidden md:block" /> &amp; special evenings.
          </h2>
        </div>

        {/* Mobile: swipe sideways · Desktop: three across */}
        <ul className="mt-2 flex snap-x snap-mandatory scroll-px-9 gap-11 overflow-x-auto px-9 py-10 [scrollbar-width:none] md:py-0 md:mt-20 md:grid md:grid-cols-3 md:gap-14 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {places.map((place, i) => (
            <li key={place.name} className="w-[72vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
              <figure className="flex flex-col gap-12 md:gap-16">
                <div className="relative">
                  <CircleDrops drops={cardDropSets[i]} color={place.color} seed={i + 1} />
                  <MediaPlaceholder tag="Photo" note={place.photo} className="aspect-[4/5]" />
                </div>
                <figcaption className="relative text-center text-[28px] leading-tight font-semibold tracking-[-0.04em] md:text-[34px]">
                  {place.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
