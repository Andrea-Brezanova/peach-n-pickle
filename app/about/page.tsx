import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutIntro from "@/components/about/AboutIntro";
import AboutProfiles from "@/components/about/AboutProfiles";
import AboutPaths from "@/components/about/AboutPaths";
import AboutOutro from "@/components/about/AboutOutro";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Peach & Pickle",
  description: "Simona and Xavier — a musical duo on stage and a couple off it.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutIntro />
        <AboutProfiles />
        <AboutPaths />
        <AboutOutro />
      </main>
      <Footer />
    </>
  );
}
