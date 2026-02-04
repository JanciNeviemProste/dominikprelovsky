import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-[var(--font-size-hero-mobile)] md:text-[var(--font-size-hero)] text-white mb-6 leading-tight">
          TRANSFORMUJ SVOJE TELO
        </h1>
        <p className="font-body text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
          Fitness coach s 10 rokmi skúseností v bodybuildingu a transformácii tela.
          Profesionálny prístup založený na vede a reálnych výsledkoch.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/online-koucing/formular">
            <Button variant="outline" size="lg">
              Začni online koučing
            </Button>
          </Link>
          <Link href="/transformacie">
            <Button variant="outline" size="lg">
              Pozri transformácie
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};
