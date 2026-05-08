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
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              marginBottom: 8,
              color: "#ffffff",
            }}
          >
            Dominik Prelovský
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 24,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#888888",
            }}
          >
            Akreditovaný kondičný tréner
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#ffffff",
            }}
          >
            Som dlhoročný akreditovaný kondičný tréner (akreditovaný
            Ministerstvom školstva SR) a športový tréner 2. kvalifikačného
            stupňa, ktorý absolvoval 4-ročné štúdium športovej prípravy na
            Športovom gymnáziu Jozefa Herdu v Trnave ukončené maturitnou
            skúškou. Taktiež som súťažiaci v kulturistike v kategórii Men's
            Physique, pričom sa primárne zaoberám svalovým rastom a redukciou
            podkožného tuku v naturálnej rovine. Nemám rád faloš a snažím sa
            aj v tomto smere ukazovať pravdu a realitu bez zbytočného
            zavádzania.
          </p>
        </div>
      </div>
    </section>
  );
}
