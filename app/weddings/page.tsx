import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import UnderConstruction from "@/components/UnderConstruction";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Weddings — Peach & Pickle",
};

export default function WeddingsPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <UnderConstruction page="Weddings" />
      </main>
      <Footer />
    </>
  );
}
