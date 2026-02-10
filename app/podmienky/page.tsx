import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podmienky — Dominik Prelovský",
  description: "Obchodné podmienky poskytovania služieb.",
};

export default function PodmienkyPage() {
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
            OBCHODNÉ PODMIENKY
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
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                textTransform: "uppercase",
                marginTop: 32,
                marginBottom: 16,
              }}
            >
              1. Poskytovateľ služieb
            </h3>
            <p>
              Poskytovateľom služieb je Dominik Prelovský, osobný kondičný
              tréner so sídlom v Trnave, Slovensko. Kontakt:
              prelovskydominik@gmail.com, tel.: +421 910 672 251.
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
              2. Služby
            </h3>
            <p>
              Poskytovateľ ponúka služby osobného tréningu, online coachingu,
              stravovacích plánov a kondičnej prípravy športovcov. Presný rozsah
              a podmienky služieb sú dohodnuté individuálne medzi poskytovateľom
              a klientom.
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
              3. Platobné podmienky
            </h3>
            <p>
              Ceny služieb sú uvedené na webovej stránke a sú orientačné.
              Presná cena je dohodnutá pred začiatkom poskytovania služby.
              Platba sa uskutočňuje vopred, prevodom na účet alebo v
              hotovosti.
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
              4. Storno podmienky
            </h3>
            <p>
              Klient má právo zrušiť dohodnutý tréning najneskôr 24 hodín pred
              jeho začiatkom. V opačnom prípade sa tréning považuje za
              absolvovaný.
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
              5. Zodpovednosť
            </h3>
            <p>
              Klient sa zúčastňuje tréningov na vlastnú zodpovednosť. Pred
              začiatkom tréningov sa odporúča absolvovať lekársku prehliadku.
              Poskytovateľ nezodpovedá za zdravotné komplikácie vzniknuté v
              dôsledku zatajenia zdravotných problémov klientom.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
