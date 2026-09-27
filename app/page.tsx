import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showreel from "@/components/Showreel";
import WhatWePlay from "@/components/WhatWePlay";
import WhereWePlay from "@/components/WhereWePlay";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import HowWeDoIt from "@/components/HowWeDoIt";
import CelebrateCTA from "@/components/CelebrateCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <WhatWePlay />
        <WhereWePlay />
        <WhyUs />
        <Testimonials />
        <HowWeDoIt />
        <CelebrateCTA />
      </main>
      <Footer />
    </>
  );
}
