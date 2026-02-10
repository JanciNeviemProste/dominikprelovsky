export default function Transformations() {
  return (
    <section className="w-full" style={{ backgroundColor: "#ebebeb" }}>
      <div className="media-text media-right">
        {/* Text vľavo (50%) */}
        <div className="media-text__content" style={{ padding: "3em 8%" }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              marginBottom: 16,
              color: "#2b2b2b",
            }}
          >
            Premeny klientov
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#2b2b2b",
            }}
          >
            Pomohol som už desiatkom klientov dosiahnuť ich cieľ. Pracujem s
            rôznymi ľuďmi — pomáham chudnúť, priberať, dosahovať lepšiu verziu
            samého seba. Výsledky hovoria za všetko.
          </p>
          <a href="/kontakt" className="btn-outline">
            ZAČNI SVOJU PREMENU
          </a>
        </div>

        {/* Obrázok vpravo (50%) */}
        <div className="media-text__media">
          <img
            src="/images/premena_pred_po_800x600.jpg"
            alt="Premeny klientov"
          />
        </div>
      </div>
    </section>
  );
}
