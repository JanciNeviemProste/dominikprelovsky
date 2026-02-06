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
        style={{ paddingTop: 80 }}
        className="min-h-screen"
      >
        <div className="max-w-[1200px] mx-auto px-5 py-16">
          <h1
            className="text-text-dark mb-8"
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
            }}
          >
            OCHRANA OSOBNÝCH ÚDAJOV
          </h1>

          <div
            className="text-text-dark"
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            <p>
              Prevádzkovateľom osobných údajov je Dominik Prelovský, kontaktný
              email: prelovskydominik@gmail.com.
            </p>

            <h3 className="text-[20px] font-semibold uppercase mt-8 mb-4">
              Aké údaje zbierame
            </h3>
            <p>
              Prostredníctvom kontaktného formulára zbierame nasledovné osobné
              údaje: meno a priezvisko, e-mailovú adresu a obsah správy. Tieto
              údaje nám slúžia výlučne na to, aby sme vám mohli odpovedať na
              vašu požiadavku.
            </p>

            <h3 className="text-[20px] font-semibold uppercase mt-8 mb-4">
              Účel spracovania
            </h3>
            <p>
              Vaše osobné údaje spracúvame na základe oprávneného záujmu za
              účelom komunikácie s vami a poskytovania informácií o našich
              službách.
            </p>

            <h3 className="text-[20px] font-semibold uppercase mt-8 mb-4">
              Doba uchovávania
            </h3>
            <p>
              Osobné údaje uchovávame po dobu nevyhnutnú na splnenie účelu, pre
              ktorý boli získané, maximálne však po dobu 3 rokov.
            </p>

            <h3 className="text-[20px] font-semibold uppercase mt-8 mb-4">
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
