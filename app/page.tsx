import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showreel from "@/components/Showreel";
import EveningTimeline from "@/components/EveningTimeline";
import MusicStyles from "@/components/MusicStyles";
import EventsGrid from "@/components/EventsGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <EveningTimeline />
        <MusicStyles />
        <EventsGrid />
      </main>
      <Footer />
    </>
  );
}
