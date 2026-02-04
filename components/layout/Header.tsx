'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Domov' },
    { href: '/o-mne', label: 'O mne' },
    { href: '/transformacie', label: 'Transformácie' },
    { href: '/blog', label: 'Blog' },
    { href: '/online-koucing', label: 'Online Koučing' },
    { href: '/eshop', label: 'E-shop' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-heading text-3xl text-[var(--color-primary)]">
              DOMINIK PRELOVSKÝ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-semibold text-sm uppercase text-[var(--color-black)] hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link href="/online-koucing/formular">
              <Button variant="filled" size="sm">
                Začni teraz
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[var(--color-black)] transition-transform duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--color-black)] transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--color-black)] transition-transform duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[var(--color-light-gray)]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-body font-semibold text-base text-[var(--color-black)] hover:text-[var(--color-primary)] transition-colors duration-200 py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/online-koucing/formular" onClick={() => setIsMenuOpen(false)}>
                <Button variant="filled" size="md" className="w-full">
                  Začni teraz
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
