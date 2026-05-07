import React from 'react';
import { Button } from '../ui';

interface HeroHeroLinkSectionProps {
  url: string;
}

export const HeroHeroLinkSection: React.FC<HeroHeroLinkSectionProps> = ({ url }) => {
  if (!url) return null;
  return (
    <section className="py-16 bg-[var(--color-primary)]">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="text-white">
          <h2
            className="font-heading text-3xl md:text-4xl mb-2"
            style={{ textTransform: 'none' }}
          >
            Chceš viac obsahu?
          </h2>
          <p className="font-body text-base md:text-lg max-w-2xl">
            Tréningové tipy, články a backstage z prípravy na súťaž — všetko nájdeš na mojom HeroHero.
          </p>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="lg"
            className="text-white border-white hover:bg-white hover:text-[var(--color-primary)]"
          >
            Pozri HeroHero
          </Button>
        </a>
      </div>
    </section>
  );
};
