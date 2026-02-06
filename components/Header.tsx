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
    <header className="fixed top-0 left-0 w-full z-50 bg-dark" style={{ height: 80 }}>
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-5">
        {/* Logo */}
        <a
          href="/"
          className="text-white text-[28px] leading-none tracking-[1px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", maxHeight: 75 }}
        >
          DOMINIK PRELOVSKÝ
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full" style={{ gap: 8 }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="h-full flex items-center text-white transition-colors hover:bg-primary"
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                padding: "0 20px",
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://instagram.com/fitcoach_dominprelovsky"
            target="_blank"
            rel="noopener noreferrer"
            className="h-full flex items-center text-white hover:text-primary transition-colors"
            style={{ padding: "0 16px" }}
          >
            <Instagram size={20} />
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-dark border-t border-border-dark">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 text-white font-semibold uppercase text-[14px] tracking-[1px] hover:bg-primary transition-colors"
              style={{ fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif" }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://instagram.com/fitcoach_dominprelovsky"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 text-white hover:text-primary transition-colors"
          >
            <Instagram size={18} />
            <span className="text-[14px]">Instagram</span>
          </a>
        </nav>
      )}
    </header>
  );
}
