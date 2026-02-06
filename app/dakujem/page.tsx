import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ďakujeme za nákup — Dominik Prelovský",
  description: "Tvoj e-book ti príde na email do pár minút.",
};

export default function DakujemPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        <section
          className="w-full bg-white"
          style={{ padding: "80px 0", minHeight: "60vh" }}
        >
          <div
            style={{
              maxWidth: 700,
              margin: "0 auto",
              padding: "0 20px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 60,
                lineHeight: "50px",
                fontWeight: 400,
                color: "#2b2b2b",
                marginBottom: 24,
              }}
            >
              Ďakujem za nákup!
            </h1>

            <p
              style={{
                fontFamily:
                  "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 18,
                fontWeight: 300,
                lineHeight: 1.7,
                color: "#2b2b2b",
                marginBottom: 8,
              }}
            >
              Tvoj e-book ti príde na email do pár minút.
            </p>

            <p
              style={{
                fontFamily:
                  "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "#888888",
                marginBottom: 40,
              }}
            >
              Skontroluj aj priečinok spam. Ak email nepríde do 15 minút,
              napíš mi na{" "}
              <a
                href="mailto:prelovskydominik@gmail.com"
                style={{ color: "#f73131", textDecoration: "none" }}
              >
                prelovskydominik@gmail.com
              </a>
            </p>

            <a href="/" className="btn-outline">
              SPÄŤ NA HLAVNÚ STRÁNKU
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
