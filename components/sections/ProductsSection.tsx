import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

interface Product {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  linkText: string;
  isNew?: boolean;
}

export const ProductsSection: React.FC = () => {
  const products: Product[] = [
    {
      title: 'TRÉNINGOVÉ PROGRAMY',
      subtitle: 'Hotové riešenia',
      description:
        'Kompletné tréningové programy pre rôzne úrovne a ciele. Od začiatočníkov až po pokročilých.',
      link: '/eshop?category=programs',
      linkText: 'ZOBRAZIŤ PROGRAMY',
    },
    {
      title: 'VÝŽIVOVÉ PLÁNY',
      subtitle: 'Jedálne lístky',
      description:
        'Hotové jedálne lístky s receptami a nákupnými zoznamami. Pripravené na rôzne kalorické príjmy.',
      link: '/eshop?category=nutrition',
      linkText: 'ZOBRAZIŤ PLÁNY',
    },
    {
      title: 'E-BOOKY & MATERIÁLY',
      subtitle: 'Vzdelávacie obsahy',
      description:
        'Profesionálne vypracované materiály o tréningu, výžive a športovej príprave.',
      link: '/eshop',
      linkText: 'NAVŠTÍVIŤ E-SHOP',
      isNew: true,
    },
  ];

  return (
    <section className="py-20 bg-[#eeeeee]">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-black mb-6" style={{ color: '#000000' }}>
            NOVINKY
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Profesionálne programy a materiály pre tvoj fitness progres.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white group relative overflow-hidden">
              {/* New Badge */}
              {product.isNew && (
                <div className="absolute top-4 right-4 bg-[var(--color-primary)] text-white px-3 py-1 text-xs font-bold z-10">
                  NOVINKA
                </div>
              )}

              {/* Product Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <svg
                  className="w-24 h-24 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>

              {/* Product Content */}
              <div className="p-8">
                <div className="mb-2">
                  <h3 className="font-heading text-xl text-black mb-1" style={{ color: '#000000' }}>
                    {product.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-primary)] uppercase tracking-wider">
                    {product.subtitle}
                  </p>
                </div>

                <p className="font-body text-base text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <Link href={product.link}>
                  <Button variant="outline" size="md" className="w-full">
                    {product.linkText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-lg text-gray-600 mb-6">
            Hľadáš niečo špecifické alebo potrebuješ pomoc s výberom?
          </p>
          <Link href="/kontakt">
            <Button variant="filled" size="lg">
              Kontaktuj ma
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
