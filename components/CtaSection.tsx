import settings from "@/data/site-settings.json";

export default function CtaSection() {
  return (
    <section className="w-full" style={{ backgroundColor: "#cf2e2e" }}>
      <div className="media-text media-right">
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
            {settings.cta.title}
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
            {settings.cta.text}
          </p>
        </div>

        <div className="media-text__media">
          <img src={settings.cta.image} alt={settings.cta.title} />
        </div>
      </div>
    </section>
  );
}
