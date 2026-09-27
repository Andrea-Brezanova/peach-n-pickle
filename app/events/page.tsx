import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import UnderConstruction from "@/components/UnderConstruction";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Events — Peach & Pickle",
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <UnderConstruction page="Events" />
      </main>
      <Footer />
    </>
  );
}
