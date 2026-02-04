import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

export const TransformationsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#ebebeb]">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Content - Left Side (40%) */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-5xl md:text-6xl text-black mb-6" style={{ color: '#000000' }}>
              Premeny klientov
            </h2>

            <p className="font-body text-lg text-gray-600 mb-6 leading-relaxed">
              Pomohol som už stovkám klientov dosiahnuť ich fitness ciele.
              Či chudnutie, priberanie svalov alebo príprava na súťaž – vždy robím maximum pre reálne a udržateľné výsledky.
              Pracujem s rôznymi ľuďmi a cieľmi.
            </p>

            <p className="font-body text-lg text-gray-600 mb-8 leading-relaxed">
              Poď do toho so mnou a konečne uvidíš výsledky.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-white">
                <div className="font-heading text-4xl text-[var(--color-primary)] mb-2">
                  500+
                </div>
                <div className="font-body text-sm text-gray-600 uppercase tracking-wider">
                  Transformácií
                </div>
              </div>
              <div className="text-center p-6 bg-white">
                <div className="font-heading text-4xl text-[var(--color-primary)] mb-2">
                  10+
                </div>
                <div className="font-body text-sm text-gray-600 uppercase tracking-wider">
                  Rokov skúseností
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/online-koucing/formular">
              <Button variant="filled" size="lg" className="w-full sm:w-auto">
                ZAČNI SVOJU PREMENU
              </Button>
            </Link>
          </div>

          {/* Transformations Collage - Right Side (60%) */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4">
              {/* Transformation Card 1 */}
              <div className="bg-white p-4 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 text-gray-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-xs text-gray-500">Before/After</p>
                  <p className="text-xs text-gray-500">Klient #1</p>
                </div>
              </div>

              {/* Transformation Card 2 */}
              <div className="bg-white p-4 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 text-gray-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-xs text-gray-500">Before/After</p>
                  <p className="text-xs text-gray-500">Klient #2</p>
                </div>
              </div>

              {/* Transformation Card 3 */}
              <div className="bg-white p-4 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 text-gray-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-xs text-gray-500">Before/After</p>
                  <p className="text-xs text-gray-500">Klient #3</p>
                </div>
              </div>

              {/* Transformation Card 4 */}
              <div className="bg-white p-4 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 text-gray-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-xs text-gray-500">Before/After</p>
                  <p className="text-xs text-gray-500">Klient #4</p>
                </div>
              </div>

              {/* Big CTA Card */}
              <div className="col-span-2 bg-[var(--color-primary)] p-8 flex flex-col items-center justify-center text-center">
                <h3 className="font-heading text-3xl text-white mb-4">
                  CHCEŠ BYŤ ĎALŠÍ?
                </h3>
                <p className="font-body text-white mb-6 max-w-md">
                  Pridaj sa k stovkám spokojných klientov a začni svoju transformáciu ešte dnes.
                </p>
                <Link href="/online-koucing/formular">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-[var(--color-primary)]">
                    ZAČNI SVOJU PREMENU
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
