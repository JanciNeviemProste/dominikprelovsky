'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from '../icons';
import type { SiteSettings } from '@/lib/content/types';

interface HeaderProps {
  settings: SiteSettings;
}

const navLinks = [
  { href: '/#sluzby', label: 'Online koučing' },
  { href: '/#premeny', label: 'Premeny' },
  { href: '/#recenzie', label: 'Recenzie' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const Header: React.FC<HeaderProps> = ({ settings }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="Domov — Dominik Prelovský"
          >
            <span className="relative w-10 h-10 rounded-full overflow-hidden bg-[var(--color-primary)] flex items-center justify-center">
              {settings.profilePhoto ? (
                <Image
                  src={settings.profilePhoto}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <span className="font-heading text-white text-lg">DP</span>
              )}
            </span>
            <span className="hidden sm:block font-heading text-2xl text-[var(--color-primary)]">
              Dominik Prelovský
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-semibold text-sm uppercase text-[var(--color-black)] hover:text-[var(--color-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {settings.social.instagram && (
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[var(--color-black)] hover:text-[var(--color-primary)] transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            )}
            {settings.social.tiktok && (
              <a
                href={settings.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-[var(--color-black)] hover:text-[var(--color-primary)] transition-colors"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            )}
            {settings.social.youtube && (
              <a
                href={settings.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-[var(--color-black)] hover:text-[var(--color-primary)] transition-colors"
              >
                <YouTubeIcon className="w-5 h-5" />
              </a>
            )}
            {settings.heroHeroUrl && (
              <a href={settings.heroHeroUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="filled" size="sm">
                  HeroHero
                </Button>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-10 h-10 justify-center items-center"
            aria-label={isMenuOpen ? 'Zavrieť menu' : 'Otvoriť menu'}
            aria-expanded={isMenuOpen}
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

        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[var(--color-light-gray)]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-body font-semibold text-base text-[var(--color-black)] hover:text-[var(--color-primary)] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-2">
                {settings.social.instagram && (
                  <a
                    href={settings.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-6 h-6" />
                  </a>
                )}
                {settings.social.tiktok && (
                  <a
                    href={settings.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-6 h-6" />
                  </a>
                )}
                {settings.social.youtube && (
                  <a
                    href={settings.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon className="w-6 h-6" />
                  </a>
                )}
              </div>
              {settings.heroHeroUrl && (
                <a
                  href={settings.heroHeroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="filled" size="md" className="w-full">
                    HeroHero
                  </Button>
                </a>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
