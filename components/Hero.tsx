export default function Hero() {
  return (
    <section
      id="domov"
      className="relative w-full text-white hero-section"
      style={{
        minHeight: 500,
        paddingTop: 200,
        paddingBottom: 200,
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
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1140px] mx-auto text-left">
        <h1
          className="text-white mb-4 hero-title"
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            letterSpacing: 0,
            fontWeight: 400,
          }}
        >
          DOMINIK PRELOVSKÝ
        </h1>

        <p
          className="text-white"
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: 20,
            fontWeight: 400,
            lineHeight: "20px",
            marginBottom: 30,
          }}
        >
          Tvoj skutočný <strong style={{ fontWeight: 600 }}>science-based</strong> tréner
        </p>

        {/* 1 CTA Button (rovnako ako fitkoucing.sk) */}
        <a href="/#sluzby" className="btn-outline btn-white">
          SLUŽBY
        </a>
      </div>
    </section>
  );
}
