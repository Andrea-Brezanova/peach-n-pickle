import Image from "next/image";

export default function AboutIntro() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative overflow-hidden px-5 pt-9 pb-16 sm:px-10 md:pt-16 md:pb-[120px] lg:px-16"
    >
      <Image
        src="/watercolor/peach.webp"
        alt=""
        width={932}
        height={1199}
        className="pointer-events-none absolute top-5 -left-10 w-[210px] -rotate-[14deg] opacity-85 motion-safe:animate-drift md:top-2.5 md:-left-5 md:w-[360px]"
      />
      <Image
        src="/watercolor/grey.webp"
        alt=""
        width={1189}
        height={887}
        className="pointer-events-none absolute top-28 left-[150px] w-[270px] opacity-60 motion-safe:animate-drift md:top-[150px] md:left-[380px] md:w-[520px]"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative mx-auto flex max-w-[1312px] flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="flex flex-col gap-[18px] md:gap-[22px]">
          <p className="text-[13px] font-semibold tracking-[0.22em] text-[#c21f63] uppercase">About</p>
          <h1
            id="about-title"
            className="text-[56px] leading-none font-semibold tracking-[-0.045em] md:text-[96px] lg:text-[128px]"
          >
            One peach.
            <br />
            One pickle.
            <br />
            One piano.
          </h1>
        </div>
        <div className="flex flex-col gap-[18px] md:max-w-[440px] md:pb-4">
          <p className="text-[17px] leading-relaxed md:text-xl">
            We’re Simona and Xavier — a musical duo on stage and a couple off it. Which means we already know
            each other’s cues, and exactly when to stop the solo.
          </p>
          <p className="hidden text-base text-muted md:block">
            <strong className="font-semibold text-ink">Simona</strong> sings ·{" "}
            <strong className="font-semibold text-ink">Xavier</strong> plays piano, keys &amp; beats
          </p>
        </div>
      </div>
    </section>
  );
}
