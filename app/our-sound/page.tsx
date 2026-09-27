import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SoundHero from "@/components/our-sound/SoundHero";
import Playlists from "@/components/our-sound/Playlists";
import Repertoire from "@/components/our-sound/Repertoire";
import SongRequest from "@/components/our-sound/SongRequest";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our sound — Peach & Pickle",
  description: "Playlists and the songs we love to perform — from piano & voice to lounge and house.",
};

export default function OurSoundPage() {
  return (
    <>
      <Navbar />
      <main>
        <SoundHero />
        <Playlists />
        <Repertoire />
        <SongRequest />
      </main>
      <Footer />
    </>
  );
}
