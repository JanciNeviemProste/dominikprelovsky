type Service = {
  slug: string;
  title: string;
  tagline: string;
  bullets: string[];
  price: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    slug: "online-coaching",
    title: "Online coaching",
    tagline:
      "Pre tých, ktorí to myslia naozaj vážne a sú schopní robiť veci precízne, zodpovedne a dlhodobo.",
    bullets: [
      "3-mesačný protokol",
      "Kompletný stravovací a tréningový plán",
      "Týždenná kontrola výsledkov a úprava plánov",
      "Týždenný call / videohovor",
      "Video ukážka s komentárom každého cviku",
      "Komunikácia 24/7 (odpoveď do hodiny)",
      "2 osobné tréningy v cene",
    ],
    price: "600 €",
    featured: true,
  },
  {
    slug: "osobna-konzultacia",
    title: "Osobná konzultácia",
    tagline:
      "Pre tých, ktorí potrebujú poradiť, uistiť sa alebo skontrolovať si, či veci robia správne.",
    bullets: [
      "Stravovanie a kalórie podľa cieľa",
      "Tréning pre čo najlepšiu postavu",
      "Technika cvikov",
      "Spánok a regenerácia",
      "Konzistentnosť a návyky",
    ],
    price: "60 €/hod",
  },
  {
    slug: "stravovaci-plan",
    title: "Stravovací plán",
    tagline:
      "Pre tých, čo majú poriešený tréning a chýbajú im už len správne stravovacie návyky.",
    bullets: [
      "Plán na mieru po vstupnej konzultácii",
      "Vstupný hovor — prejdeme si celý plán",
      "Vyradenie surovín (alergie, vegetarián, vegán…)",
      "Mnoho variantov na každé jedlo",
      "Slané aj sladké varianty",
      "1 mesiac konzultácie v cene",
    ],
    price: "200 €",
  },
  {
    slug: "treningovy-plan",
    title: "Tréningový plán",
    tagline:
      "Pre ľudí, ktorí v gyme alebo doma už nejaký čas makajú a potrebujú usmerniť alebo pushnúť cez svoje limity.",
    bullets: [
      "Plán podľa preferencií a vybavenia",
      "Plány do gymu aj na doma s vlastnou váhou",
      "Časové prispôsobenie (práca, rodina, hobby)",
      "Video zásobník cvikov so stručným komentárom",
    ],
    price: "170 €",
  },
  {
    slug: "osobny-trening",
    title: "Osobný tréning",
    tagline:
      "Pre každého, kto potrebuje osobný kontakt a chce trénovať priamo v Trnave — 365 GYM, Zelenečská 111.",
    bullets: [
      "Vstupná konzultácia",
      "Osobná ukážka techniky cvikov",
      "Kontrola výsledkov a progresu",
      "Cvičenie na hranici limitov",
      "Progresívne preťažovanie každý týždeň",
      "Tréning podľa aktuálnych štúdií",
    ],
    price: "30 €/tréning",
  },
];

export default function Services() {
  return (
    <section
      id="sluzby"
      className="w-full bg-white"
      style={{ padding: "64px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "60px",
              fontWeight: 400,
              marginBottom: 8,
              color: "#2b2b2b",
            }}
          >
            ONLINE COACHING — ČO PONÚKAM
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 19,
              fontWeight: 300,
              color: "#888888",
              marginBottom: 0,
            }}
          >
            Vyber si formát, ktorý ti najlepšie sedí.
          </p>
        </div>

        {/* Grid kariet */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {services.map((s) => (
            <article
              key={s.title}
              style={{
                position: "relative",
                backgroundColor: "#f7f7f7",
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                border: s.featured ? "2px solid #f73131" : "2px solid transparent",
              }}
            >
              {s.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: -14,
                    left: 24,
                    backgroundColor: "#f73131",
                    color: "#fff",
                    fontFamily:
                      "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                  }}
                >
                  Najobľúbenejšie
                </span>
              )}

              <h3
                style={{
                  fontFamily:
                    "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 32,
                  lineHeight: "32px",
                  fontWeight: 400,
                  marginBottom: 8,
                  color: "#2b2b2b",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {s.title}
              </h3>

              <p
                style={{
                  fontFamily:
                    "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "#666",
                  marginBottom: 20,
                }}
              >
                {s.tagline}
              </p>

              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily:
                      "var(--font-bebas), 'Bebas Neue', sans-serif",
                    fontSize: 44,
                    lineHeight: "44px",
                    fontWeight: 400,
                    color: "#f73131",
                  }}
                >
                  {s.price}
                </span>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  marginBottom: 24,
                  flex: 1,
                }}
              >
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily:
                        "var(--font-montserrat), 'Montserrat', sans-serif",
                      fontSize: 13,
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: "#2b2b2b",
                      marginBottom: 8,
                      paddingLeft: 20,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        color: "#f73131",
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href={`/kontakt?sluzba=${s.slug}`}
                className="btn-outline"
                style={{ alignSelf: "flex-start" }}
              >
                MÁM ZÁUJEM
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
