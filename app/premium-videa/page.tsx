import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock, Dumbbell, Utensils, Trophy, Video } from "lucide-react";
import type { Metadata } from "next";
import settings from "@/data/site-settings.json";

export const metadata: Metadata = {
  title: "Premium videá — Dominik Prelovský",
  description:
    "Členská sekcia s exkluzívnymi videami: tréningové techniky, strava, príprava na súťaž a zákulisie. Mesačné členstvo.",
};

const s = settings.premiumVideosSection;

const benefits = [
  {
    Icon: Dumbbell,
    title: "Tréningové techniky",
    desc: "Detailné videá k cvikom, technika a programoverie krok za krokom.",
  },
  {
    Icon: Utensils,
    title: "Strava a suplementácia",
    desc: "Ako si nastaviť jedálniček, makrá a doplnky bez zbytočných mýtov.",
  },
  {
    Icon: Trophy,
    title: "Príprava na súťaž",
    desc: "Peak week, pózing a celý proces prípravy naturálneho IFBB Pro atléta.",
  },
  {
    Icon: Video,
    title: "Nový obsah každý mesiac",
    desc: "Knižnica sa pravidelne rozrastá o nové videá pre členov.",
  },
];

export default function PremiumVideaPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 80, backgroundColor: "#101010", color: "#fff" }}>
        {/* Intro */}
        <section style={{ padding: "72px 20px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "#fff",
                backgroundColor: "rgba(247,49,49,0.9)",
                padding: "6px 12px",
                borderRadius: 999,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: 20,
              }}
            >
              <Lock size={14} /> Členská sekcia
            </span>
            <h1
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "clamp(44px, 7vw, 72px)",
                margin: 0,
                letterSpacing: "1px",
              }}
            >
              {s.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 16,
                color: "#cfcfcf",
                lineHeight: 1.7,
                margin: "20px auto 0",
                maxWidth: 640,
              }}
            >
              {s.text}
            </p>
          </div>
        </section>

        {/* Benefity */}
        <section style={{ padding: "20px 20px 60px" }}>
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {benefits.map((b) => (
              <div
                key={b.title}
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: "rgba(247,49,49,0.12)",
                    color: "#f73131",
                    marginBottom: 14,
                  }}
                >
                  <b.Icon size={22} />
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    margin: "0 0 8px",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: 14,
                    color: "#a9a9a9",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "0 20px 90px", textAlign: "center" }}>
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: 16,
              padding: "40px 24px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 16,
                color: "#fff",
                margin: "0 0 24px",
              }}
            >
              {s.note}
            </p>
            <a
              href="/kontakt?sluzba=iny-dovod"
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
              {s.ctaText}
            </a>
            <p
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 13,
                color: "#8a8a8a",
                margin: "18px 0 0",
              }}
            >
              Online platba členstva spustíme čoskoro — zatiaľ ma kontaktuj a
              dohodneme sa.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
