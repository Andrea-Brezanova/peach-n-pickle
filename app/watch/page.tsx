import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import UnderConstruction from "@/components/UnderConstruction";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Watch — Peach & Pickle",
};

export default function WatchPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <UnderConstruction page="Watch" />
      </main>
      <Footer />
    </>
  );
}
