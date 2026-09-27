import PaintMarker from "@/components/PaintMarker";
import { sectionLabel, sectionTitle } from "@/components/ui";

const reasons = [
  { title: "Live", text: "Real voices. Real instruments. No generic event soundtrack.", color: "#f1ac91" },
  { title: "Personal", text: "The music should fit the people, not the other way around.", color: "#e9a0bd" },
  { title: "Flexible", text: "From background atmosphere to the part everyone remembers.", color: "#a45bc2" },
  { title: "Easy", text: "Straightforward planning, communication and setup.", color: "#5eb3e4" },
];

export default function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="px-5 py-[72px] sm:px-10 md:pt-[120px] md:pb-[110px] lg:px-16">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
        <p className={`${sectionLabel} md:pl-[0.32em]`}>Why us</p>
        <h2 id="why-title" className={`${sectionTitle} mt-3.5 md:mt-5`}>
          Why Peach &amp; Pickle?
        </h2>
        {/* [Placeholders] — add their real years and number of events */}
        <p className="mt-4 max-w-[720px] text-base leading-relaxed text-muted md:mt-6 md:text-[19px]">
          [X] years and [100+] weddings and events in, we still get goosebumps at every first dance. Passion on
          stage, professionalism behind it — on time, sound-checked and easy to plan with.
        </p>

        <ul className="mt-10 grid w-full grid-cols-2 gap-x-5 gap-y-9 md:mt-[72px] md:grid-cols-4 md:gap-12">
          {reasons.map((reason, i) => (
            <li key={reason.title} className="flex flex-col items-center gap-2.5 md:gap-3.5">
              <span className="md:hidden">
                <PaintMarker color={reason.color} size={48} seed={i * 7 + 3} />
              </span>
              <span className="hidden md:inline-flex">
                <PaintMarker color={reason.color} size={64} seed={i * 7 + 3} />
              </span>
              <h3 className="pl-[0.22em] text-xs font-semibold tracking-[0.22em] uppercase md:pl-[0.26em] md:text-sm md:tracking-[0.26em]">
                {reason.title}
              </h3>
              <p className="max-w-[250px] text-[15px] leading-normal text-muted md:text-[17px]">{reason.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
