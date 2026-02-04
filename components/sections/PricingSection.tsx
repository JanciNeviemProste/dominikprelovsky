import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  priceDetail?: string;
  ctaText: string;
  ctaLink: string;
  featured?: boolean;
}

export const PricingSection: React.FC = () => {
  const services: ServiceCard[] = [
    {
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      title: 'STRAVOVACÍ PLÁN',
      description: 'Individuálny jedálny lístok šitý na mieru tvojim potrebám a cieľom. Vrátane makier, receptov a úprav počas celého programu.',
      price: '€150',
      priceDetail: '€60/mesiac',
      ctaText: 'Objednať plán',
      ctaLink: '/online-koucing/formular',
    },
    {
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      ),
      title: 'TRÉNINGOVÝ PLÁN',
      description: 'Profesionálny tréningový program prispôsobený tvojej úrovni, vybaveniu a cieľom. Pravidelné úpravy a progress tracking.',
      price: '€120',
      priceDetail: '3 mesiace',
      ctaText: 'Objednať plán',
      ctaLink: '/online-koucing/formular',
    },
    {
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      ),
      title: 'KONZULTÁCIA',
      description: 'Hodinová online konzultácia kde preberieme tvoje ciele, techniku cvičenia, stravu alebo čokoľvek čo potrebuješ.',
      price: '€50',
      priceDetail: '60 minút',
      ctaText: 'Rezervovať termín',
      ctaLink: '/kontakt',
    },
    {
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
        </svg>
      ),
      title: 'PREMIUM KOUČING',
      description: 'Kompletný balík: Stravovací plán, tréningový plán, neomedzený kontakt cez WhatsApp, týždenné check-ins a priebežné úpravy.',
      price: '€600',
      priceDetail: '3 mesiace',
      ctaText: 'Začni Premium',
      ctaLink: '/online-koucing/formular',
      featured: true,
    },
  ];

  return (
    <section id="online-coaching" className="py-20 bg-white">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-black mb-6" style={{ color: '#000000' }}>
            ONLINE COACHING
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Vyber si balík, ktorý ti najlepšie vyhovuje a začni svoju transformáciu.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-[#eeeeee] p-8 md:p-10 transition-all duration-300 hover:shadow-lg ${
                service.featured ? 'border-2 border-[var(--color-primary)]' : ''
              }`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="text-black group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl text-center text-black mb-4" style={{ color: '#000000' }}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-body text-base text-gray-600 text-center mb-6 leading-relaxed min-h-[120px]">
                {service.description}
              </p>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="font-heading text-4xl text-[var(--color-primary)] mb-2">
                  {service.price}
                </div>
                {service.priceDetail && (
                  <div className="font-body text-sm text-gray-500">
                    {service.priceDetail}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Link href={service.ctaLink}>
                  <Button variant="filled" size="md" className="w-full">
                    {service.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="font-body text-lg text-gray-600 mb-6">
            Nevieš sa rozhodnúť? Napíš mi a spoločne nájdeme riešenie pre teba.
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
