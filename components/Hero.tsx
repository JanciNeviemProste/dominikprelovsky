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
        backgroundImage:
          "url('/images/dominik-prelovsky.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)" }}
      />

      {/* Content */}
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
          DOMINIK PRELOVSKÝ
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
          Tu sa prihlás na <strong style={{ fontWeight: 600 }}>vstupnú konzultáciu</strong>.
        </p>

        {/* CTA — primárne na Online coaching formulár */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href="/kontakt" className="btn-outline btn-white">
            ONLINE COACHING
          </a>
          <a href="/#premeny" className="btn-outline btn-white">
            POZRI PREMENY
          </a>
        </div>
      </div>
    </section>
  );
}
