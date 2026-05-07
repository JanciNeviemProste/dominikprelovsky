import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui';
import type { Transformation } from '@/lib/content/types';

interface TransformationsSectionProps {
  items: Transformation[];
}

export const TransformationsSection: React.FC<TransformationsSectionProps> = ({ items }) => {
  return (
    <section id="premeny" className="py-20 bg-[var(--color-light-gray)]">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="font-heading text-5xl md:text-6xl text-black mb-6"
            style={{ textTransform: 'none' }}
          >
            Premeny klientov
          </h2>
          <p className="font-body text-lg text-[var(--color-text-tertiary)] max-w-3xl mx-auto leading-relaxed">
            Za moju kariéru trénera od roku 2016 prešli mojimi rukami stovky klientov — bežní ľudia,
            profi aj amatérski športovci, aj tí, ktorí chceli jednoducho zdravšie a kvalitnejšie žiť.
            Práca s ľuďmi je špecifická tým, že každý je iný. Doteraz som sa nestretol s klientom,
            s ktorým by sme akýkoľvek problém nevyriešili. Presvedč sa sám — a poď do toho aj ty.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-12">
          {items.map((item) => (
            <figure
              key={item.order}
              className="relative aspect-square overflow-hidden bg-white group"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.headline && (
                <figcaption className="absolute top-2 left-2 bg-[var(--color-primary)] text-white px-3 py-1 font-heading text-sm">
                  {item.headline}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        <div className="text-center">
          <Link href="/online-koucing/formular">
            <Button variant="filled" size="lg">
              Poď do toho už teraz
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
