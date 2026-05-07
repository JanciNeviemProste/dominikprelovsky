import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';
import type { SiteSettings } from '@/lib/content/types';

interface HeroSectionProps {
  settings: SiteSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  return (
    <section className="relative min-h-[640px] py-24 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${settings.heroBackgroundImage.replace(/"/g, '\\"')}")` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>

      <div className="relative z-10 max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className="font-heading text-[var(--font-size-hero-mobile)] md:text-[var(--font-size-hero)] mb-6 leading-tight text-white"
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
        >
          {settings.heroName}
        </h1>
        <p
          className="font-body text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto leading-relaxed"
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}
        >
          {settings.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="#sluzby">
            <Button variant="filled" size="lg">
              Online koučing
            </Button>
          </Link>
          <Link href="#premeny">
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Pozri premeny
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
