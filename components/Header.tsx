"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Instagram, Youtube, Music2 } from "lucide-react";

const navItems = [
  { label: "Domov", href: "/" },
  { label: "Online coaching", href: "/#sluzby" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50, backgroundColor: "#282828", height: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        {/* Logo — kruhové foto + meno */}
        <a
          href="/"
          aria-label="Domov — Dominik Prelovský"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#fff",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              position: "relative",
              width: 48,
              height: 48,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              backgroundColor: "#444",
              border: "2px solid #f73131",
            }}
          >
            <Image
              src="/images/dominik-prelovsky.jpg"
              alt=""
              fill
              sizes="48px"
              style={{ objectFit: "cover" }}
              priority
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 24,
              lineHeight: 1,
              letterSpacing: "1px",
            }}
          >
            DOMINIK PRELOVSKÝ
          </span>
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
            aria-label="Instagram"
            style={{ height: "100%", display: "flex", alignItems: "center", color: "#fff", padding: "0 10px", transition: "color 0.2s" }}
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@fitcoach_dominprelovsky"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            style={{ height: "100%", display: "flex", alignItems: "center", color: "#fff", padding: "0 10px", transition: "color 0.2s" }}
          >
            <Music2 size={20} />
          </a>
          <a
            href="https://www.youtube.com/@fitcoach_dominprelovsky"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            style={{ height: "100%", display: "flex", alignItems: "center", color: "#fff", padding: "0 10px", transition: "color 0.2s" }}
          >
            <Youtube size={20} />
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
          <a
            href="https://www.tiktok.com/@fitcoach_dominprelovsky"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 24px", color: "#fff", textDecoration: "none", transition: "color 0.2s" }}
          >
            <Music2 size={18} />
            <span style={{ fontSize: 14 }}>TikTok</span>
          </a>
          <a
            href="https://www.youtube.com/@fitcoach_dominprelovsky"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 24px", color: "#fff", textDecoration: "none", transition: "color 0.2s" }}
          >
            <Youtube size={18} />
            <span style={{ fontSize: 14 }}>YouTube</span>
          </a>
        </nav>
      )}
    </header>
  );
}
