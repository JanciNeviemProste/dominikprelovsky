type Step = {
  number: string;
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Vstupná konzultácia",
    text:
      "Na začiatku si prejdeme vstupnou konzultáciou, kde o tebe zistím všetko potrebné. Vysvetlíme si všetko o vypracovaných plánoch, ako si sledovať progres a na všetko, čo ťa bude zaujímať, sa môžeš pýtať. Všetky plány sú vypracované na základe aktuálnych vedeckých poznatkov, štúdií a mojej praxe — môžeš sa na spoluprácu na 100 % spoľahnúť.",
  },
  {
    number: "02",
    title: "Kvalifikácia a skúsenosti",
    text:
      "Som akreditovaný kondičný tréner (akreditovaný Ministerstvom školstva SR) a športový tréner 2. kvalifikačného stupňa, ktorý absolvoval 4-ročné štúdium športovej prípravy na Športovom gymnáziu Jozefa Herdu v Trnave ukončené maturitnou skúškou. Taktiež som súťažiaci v kulturistike v kategórii Men's Physique — takže okrem vzdelania sa môžeš spoľahnúť aj na potrebnú prax.",
  },
  {
    number: "03",
    title: "Prax",
    text:
      "Bez ohľadu na certifikáty a vzdelanie som názoru, že to najdôležitejšie čo sa týka naberania svalov, chudnutia tuku alebo prípravy na súťaže — je osobná skúsenosť. Ak by za mnou prišiel človek, aby som ho naučil drepovať 300 kg, poslal by som ho za trénerom 3-boja — pretože som na chrbte nikdy nemal 300 kg. Avšak ak je tvoj cieľ naturálna rekompozícia postavy, naberanie svalov alebo chudnutie tuku, tak som ten pravý, ktorý ťa k tvojmu cieľu dovedie. Sám som si prešiel prípravami na súťaže v kategórii Men's Physique a umiestnil sa medzi top 3 súťažiacimi, kde steroidy neboli výnimkou. Naturálne sa mi podarilo maximalizovať výsledky sám na sebe — a od roku 2016 to prenášam na svojich klientov. A teraz pomôžem aj tebe.",
  },
];

export default function Philosophy() {
  return (
    <section className="w-full bg-white" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "60px",
              fontWeight: 400,
              color: "#2b2b2b",
              marginBottom: 8,
            }}
          >
            AKO PRACUJEM
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: "#888",
              marginBottom: 0,
            }}
          >
            Vedecký prístup, vlastná prax v silových športoch a osobná zodpovednosť za výsledok.
          </p>
        </div>

        {/* 3 očíslované karty */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {steps.map((step) => (
            <article
              key={step.number}
              style={{
                backgroundColor: "#f7f7f7",
                padding: "40px 28px",
                borderTop: "4px solid #f73131",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 64,
                  lineHeight: "1",
                  fontWeight: 400,
                  color: "#f73131",
                  marginBottom: 16,
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily:
                    "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 18,
                  lineHeight: "24px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#2b2b2b",
                  marginBottom: 16,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily:
                    "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "#2b2b2b",
                  margin: 0,
                }}
              >
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
