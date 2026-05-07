"use client";

import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";

const navItems = [
  { label: "Domov", href: "/" },
  { label: "Služby", href: "/#sluzby" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50, backgroundColor: "#282828", height: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        {/* Logo */}
        <a
          href="/"
          style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", maxHeight: 75, color: "#fff", fontSize: 28, lineHeight: 1, letterSpacing: "1px", whiteSpace: "nowrap", textDecoration: "none" }}
        >
          DOMINIK PRELOVSKÝ
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ alignItems: "center", height: "100%", gap: 8 }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                padding: "0 20px",
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                transition: "background-color 0.2s",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://instagram.com/fitcoach_dominprelovsky"
            target="_blank"
            rel="noopener noreferrer"
            style={{ height: "100%", display: "flex", alignItems: "center", color: "#fff", padding: "0 16px", transition: "color 0.2s" }}
          >
            <Instagram size={20} />
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          style={{ color: "#fff", padding: 8, background: "none", border: "none", cursor: "pointer" }}
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="mobile-menu" style={{ backgroundColor: "#282828", borderTop: "1px solid #333" }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "16px 24px",
                color: "#fff",
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: 14,
                letterSpacing: "1px",
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://instagram.com/fitcoach_dominprelovsky"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 24px", color: "#fff", textDecoration: "none", transition: "color 0.2s" }}
          >
            <Instagram size={18} />
            <span style={{ fontSize: 14 }}>Instagram</span>
          </a>
        </nav>
      )}
    </header>
  );
}
