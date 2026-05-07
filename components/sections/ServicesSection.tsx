import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';
import type { Service } from '@/lib/content/types';

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section id="sluzby" className="py-20 bg-white">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-heading text-5xl md:text-6xl text-black mb-4"
            style={{ textTransform: 'none' }}
          >
            Online koučing — čo ponúkam
          </h2>
          <p className="font-body text-lg text-[var(--color-text-tertiary)] max-w-3xl mx-auto leading-relaxed">
            Vyber si formát, ktorý najlepšie sedí tvojim cieľom a tempu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <article
              key={service.slug}
              className={`relative bg-[var(--color-light-gray)] p-8 md:p-10 flex flex-col transition-all duration-300 ${
                service.featured ? 'border-2 border-[var(--color-primary)]' : 'border-2 border-transparent'
              }`}
            >
              {service.featured && (
                <span className="absolute -top-3 left-8 bg-[var(--color-primary)] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Najobľúbenejšie
                </span>
              )}

              <h3 className="font-heading text-2xl text-black mb-2" style={{ letterSpacing: '1px' }}>
                {service.title}
              </h3>
              <p className="font-body text-sm text-[var(--color-text-tertiary)] mb-6 leading-relaxed">
                {service.tagline}
              </p>

              <div className="mb-6">
                <span className="font-heading text-5xl text-[var(--color-primary)] leading-none">
                  {service.price}
                </span>
                <span className="font-body text-base text-[var(--color-text-tertiary)] ml-2">
                  {service.priceUnit}
                </span>
              </div>

              {service.body && (
                <p className="font-body text-sm text-[var(--color-text-tertiary)] mb-4 leading-relaxed">
                  {service.body}
                </p>
              )}

              <ul className="space-y-2 mb-8 flex-1">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="font-body text-sm text-[var(--color-text-primary)] flex items-start gap-2"
                  >
                    <svg
                      className="w-4 h-4 mt-1 text-[var(--color-primary)] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/online-koucing/formular?service=${service.slug}`}
                className="mt-auto"
              >
                <Button variant="filled" size="md" className="w-full">
                  {service.ctaLabel}
                </Button>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-body text-base text-[var(--color-text-tertiary)] mb-4">
            Nevieš si vybrať? Napíš mi a spolu nájdeme to pravé.
          </p>
          <Link href="/kontakt">
            <Button variant="outline" size="lg">
              Kontaktuj ma
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
