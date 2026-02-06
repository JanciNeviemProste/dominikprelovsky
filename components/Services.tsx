const services = [
  {
    image: "/images/fitness_01_osobny_trening.jpg",
    title: "Osobný tréning",
    text: "Individuálne tréningy 1-na-1 v 365 GYM Trnava. Prispôsobený tréningový plán, korekcia techniky cvikov a pravidelná diagnostika výsledkov. Každý tréning je naplánovaný presne podľa tvojich cieľov.",
    price: "od 30€/hod",
  },
  {
    image: "/images/fitness_02_stravovaci_plan.jpg",
    title: "Stravovací plán",
    text: "Jedálniček šitý priamo pre teba. Vyskladáš si kombinácie jedál a kalórie s makroživinami ti budú sedieť. Týždenný check-in je samozrejmosť. Jedálniček prispôsobím tvojmu životnému štýlu a preferenciám.",
    price: "od 100€",
  },
  {
    image: "/images/fitness_03_online_coaching.jpg",
    title: "Online coaching",
    text: "Kompletný tréningový a stravovací plán na mieru s týždennou komunikáciou a pravidelnými úpravami. Ideálne riešenie, ak nie si z Trnavy alebo preferuješ samostatné trénovanie.",
    price: "od 80€/mesiac",
  },
  {
    image: "/images/fitness_04_kondicna_priprava.jpg",
    title: "Kondičná príprava",
    text: "Rozvoj sily, výbušnosti, rýchlosti a vytrvalosti. Pre profesionálnych športovcov aj bežných ľudí. Spolupracujem s mládežníckymi tímami FC Spartak Trnava.",
    price: "individuálna cena",
  },
];

export default function Services() {
  return (
    <section id="sluzby" className="w-full bg-white" style={{ padding: "64px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "80px",
              fontWeight: 400,
              marginBottom: 0,
              color: "#2b2b2b",
            }}
          >
            ONLINE COACHING
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
            Vyber si tú možnosť, ktorá ti najviac vyhovuje
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="services-grid">
          {services.map((s) => (
            <div
              key={s.title}
              style={{ textAlign: "center" }}
            >
              {/* Obrázok hore */}
              <div style={{ overflow: "hidden", marginBottom: 16 }}>
                <img
                  src={s.image}
                  alt={s.title}
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily:
                    "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 20,
                  lineHeight: "24px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: 8,
                  color: "#2b2b2b",
                }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily:
                    "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "#2b2b2b",
                }}
              >
                {s.text}
              </p>

              {/* Price */}
              <p
                style={{
                  fontFamily:
                    "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#f73131",
                  marginBottom: 16,
                }}
              >
                {s.price}
              </p>

              {/* CTA Button */}
              <a href="/kontakt" className="btn-outline">
                MÁM ZÁUJEM
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
