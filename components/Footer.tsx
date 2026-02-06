const footerMenu = [
  { label: "Podmienky", href: "/podmienky" },
  { label: "Ochrana údajov", href: "/ochrana-osobnych-udajov" },
  { label: "Služby", href: "/#sluzby" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer
      className="w-full text-white"
      style={{ backgroundColor: "#161616" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px", textAlign: "center" }}>
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "inline-block",
            marginBottom: 32,
            color: "#ffffff",
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 36,
            lineHeight: 1,
            textDecoration: "none",
          }}
        >
          DOMINIK PRELOVSKÝ
        </a>

        {/* Menu — v jednom riadku, centrované, uppercase */}
        <nav
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: 32, gap: "2em" }}
        >
          {footerMenu.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:underline"
              style={{
                fontFamily:
                  "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Kontaktné info — centrované */}
        <div style={{ marginBottom: 40 }}>
          <p
            className="text-white"
            style={{
              fontFamily:
                "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              marginBottom: 8,
            }}
          >
            prelovskydominik@gmail.com
          </p>
          <p
            className="text-white"
            style={{
              fontFamily:
                "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              marginBottom: 8,
            }}
          >
            +421 910 672 251
          </p>
          <p
            style={{
              fontFamily:
                "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              color: "#888888",
              marginBottom: 0,
            }}
          >
            365 GYM Trnava
          </p>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid #333333",
            paddingTop: 28,
          }}
        >
          <p
            style={{
              fontFamily:
                "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 13,
              color: "#888888",
              marginBottom: 0,
            }}
          >
            Všetky práva vyhradené &copy; 2026 Dominik Prelovský
          </p>
        </div>
      </div>
    </footer>
  );
}
