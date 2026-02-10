import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov — Dominik Prelovský",
  description: "Zásady ochrany osobných údajov.",
};

export default function OchranaOsobnychUdajovPage() {
  return (
    <>
      <Header />
      <main
        style={{ paddingTop: 80, minHeight: "100vh" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 20px" }}>
          <h1
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              color: "#2b2b2b",
              marginBottom: 32,
            }}
          >
            OCHRANA OSOBNÝCH ÚDAJOV
          </h1>

          <div
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#2b2b2b",
            }}
          >
            <p>
              Prevádzkovateľom osobných údajov je Dominik Prelovský, kontaktný
              email: prelovskydominik@gmail.com.
            </p>

            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                textTransform: "uppercase",
                marginTop: 32,
                marginBottom: 16,
              }}
            >
              Aké údaje zbierame
            </h3>
            <p>
              Prostredníctvom kontaktného formulára zbierame nasledovné osobné
              údaje: meno a priezvisko, e-mailovú adresu a obsah správy. Tieto
              údaje nám slúžia výlučne na to, aby sme vám mohli odpovedať na
              vašu požiadavku.
            </p>

            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                textTransform: "uppercase",
                marginTop: 32,
                marginBottom: 16,
              }}
            >
              Účel spracovania
            </h3>
            <p>
              Vaše osobné údaje spracúvame na základe oprávneného záujmu za
              účelom komunikácie s vami a poskytovania informácií o našich
              službách.
            </p>

            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                textTransform: "uppercase",
                marginTop: 32,
                marginBottom: 16,
              }}
            >
              Doba uchovávania
            </h3>
            <p>
              Osobné údaje uchovávame po dobu nevyhnutnú na splnenie účelu, pre
              ktorý boli získané, maximálne však po dobu 3 rokov.
            </p>

            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                textTransform: "uppercase",
                marginTop: 32,
                marginBottom: 16,
              }}
            >
              Vaše práva
            </h3>
            <p>
              Máte právo požiadať o prístup k svojim osobným údajom, ich opravu,
              vymazanie alebo obmedzenie spracovania. Svoje práva si môžete
              uplatniť zaslaním e-mailu na adresu prelovskydominik@gmail.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
