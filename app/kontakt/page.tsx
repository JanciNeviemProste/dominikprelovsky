import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Dominik Prelovský",
  description:
    "Kontaktuj Dominika Prelovského. Prvá konzultácia zadarmo. Osobný tréning, online coaching, stravovací plány.",
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
