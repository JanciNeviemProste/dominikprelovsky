import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vitaj v Premium videách — Dominik Prelovský",
  robots: { index: false, follow: false },
};

export default function VitajPage() {
  return (
    <>
      <Header />
      <main
        style={{
          paddingTop: 80,
          backgroundColor: "#101010",
          color: "#fff",
          minHeight: "70vh",
        }}
      >
        <section style={{ padding: "72px 20px 90px", textAlign: "center" }}>
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            <h1
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "clamp(40px, 7vw, 64px)",
                margin: 0,
              }}
            >
              Vitaj medzi členmi! 🎉
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 16,
                color: "#cfcfcf",
                lineHeight: 1.7,
                margin: "20px 0 32px",
              }}
            >
              Tvoje mesačné členstvo je aktívne. Do knižnice sa prihlásiš cez svoj
              e-mail — pošleme ti prihlasovací odkaz. Použi ten istý e-mail, ktorým
              si platil(a).
            </p>
            <a
              href="/premium-videa?login=1"
              style={{
                display: "inline-block",
                backgroundColor: "#f73131",
                color: "#fff",
                textDecoration: "none",
                padding: "16px 40px",
                borderRadius: 9999,
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Prihlásiť sa do knižnice
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
