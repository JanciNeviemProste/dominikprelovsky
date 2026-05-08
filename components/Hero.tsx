import settings from "@/data/site-settings.json";

export default function Hero() {
  return (
    <section
      id="domov"
      style={{
        position: "relative",
        width: "100%",
        color: "#fff",
        minHeight: 500,
        paddingTop: "clamp(100px, 20vw, 200px)",
        paddingBottom: "clamp(100px, 20vw, 200px)",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundImage: `url('${settings.hero.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1140, margin: "0 auto", textAlign: "left" }}>
        <h1
          style={{
            color: "#fff",
            marginBottom: 16,
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 8vw, 80px)",
            lineHeight: "clamp(40px, 7vw, 60px)",
            letterSpacing: 0,
            fontWeight: 400,
          }}
        >
          {settings.hero.title}
        </h1>

        <p
          style={{
            color: "#fff",
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: 20,
            fontWeight: 400,
            lineHeight: "28px",
            marginBottom: 30,
          }}
        >
          {settings.hero.subtitle}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href={settings.hero.primaryButton.href} className="btn-outline btn-white">
            {settings.hero.primaryButton.text}
          </a>
          <a href={settings.hero.secondaryButton.href} className="btn-outline btn-white">
            {settings.hero.secondaryButton.text}
          </a>
        </div>
      </div>
    </section>
  );
}
