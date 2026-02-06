export default function AboutSection() {
  return (
    <section className="w-full" style={{ backgroundColor: "#121212" }}>
      <div className="media-text">
        {/* Obrázok vľavo (50%) */}
        <div className="media-text__media">
          <img
            src="/images/dominik-prelovsky.jpg"
            alt="Dominik Prelovský"
          />
        </div>

        {/* Text vpravo (50%) */}
        <div className="media-text__content" style={{ padding: "3em 8%" }}>
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              marginBottom: 8,
            }}
          >
            Dominik Prelovský
          </h2>
          <p
            className="text-text-gray"
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 24,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Akreditovaný kondičný tréner
          </p>
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Akreditovaný kondičný tréner s 10-ročnými skúsenosťami. Absolvent
            4-ročného štúdia športovej prípravy na ŠG Jozefa Herdu v Trnave.
            Športový tréner 2. kvalifikačného stupňa. Pôsobím ako osobný fitness
            tréner v 365 GYM Trnava a zároveň ako mládežnícky kondičný tréner
            vo FC Spartak Trnava.
          </p>
        </div>
      </div>
    </section>
  );
}
