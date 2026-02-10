export default function CtaSection() {
  return (
    <section className="w-full" style={{ backgroundColor: "#cf2e2e" }}>
      <div className="media-text media-right">
        {/* Text vľavo (50%) */}
        <div className="media-text__content" style={{ padding: "3em 8%" }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              marginBottom: 8,
              color: "#ffffff",
            }}
          >
            Prvá konzultácia zadarmo
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#ffffff",
            }}
          >
            Napíš mi a dohodneme sa na nezáväznej konzultácii, kde zistíme, ako
            ti môžem pomôcť dosiahnuť tvoje ciele. Či už chceš schudnúť, nabrať
            svalovú hmotu, alebo sa pripraviť na súťaž — mám pre teba riešenie
            založené na vedeckých poznatkoch a rokoch praxe.
          </p>
        </div>

        {/* Obrázok vpravo (50%) */}
        <div className="media-text__media">
          <img
            src="/images/online_coaching_800x600.jpg"
            alt="Konzultácia zadarmo"
          />
        </div>
      </div>
    </section>
  );
}
