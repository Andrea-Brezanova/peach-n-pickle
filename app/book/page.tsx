import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import BookingInfo from "@/components/BookingInfo";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Check availability — Peach & Pickle",
  description:
    "Tell us about your event. We’ll come back with availability, a few ideas for the music and a quote.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main>
        <section
          aria-labelledby="book-title"
          className="relative overflow-hidden px-5 pt-8 pb-[72px] sm:px-10 md:pt-[72px] md:pb-[120px] lg:px-16"
        >
          <Image
            src="/watercolor/peach.webp"
            alt=""
            width={932}
            height={1199}
            className="pointer-events-none absolute top-[-60px] right-[120px] hidden w-[300px] -rotate-[18deg] opacity-80 motion-safe:animate-drift md:block"
          />
          <Image
            src="/watercolor/grey.webp"
            alt=""
            width={1189}
            height={887}
            className="pointer-events-none absolute -top-5 -right-20 w-[260px] opacity-70 motion-safe:animate-drift md:top-0 md:-right-[60px] md:w-[420px]"
            style={{ animationDelay: "-6s" }}
          />

          <div className="relative mx-auto max-w-[1312px]">
            <h1
              id="book-title"
              className="text-[52px] leading-none font-semibold tracking-[-0.045em] md:text-[88px] lg:text-[120px]"
            >
              Check availability.
            </h1>
            <p className="mt-4 max-w-[620px] text-[17px] leading-normal md:mt-6 md:text-xl">
              Tell us about your event. We’ll come back with availability, a few ideas for the music and a quote.
            </p>

            <div className="mt-8 grid items-start gap-12 md:mt-16 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-[88px]">
              <BookingForm />
              <BookingInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
