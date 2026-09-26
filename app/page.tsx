import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showreel from "@/components/Showreel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Showreel />
      </main>
    </>
  );
}
