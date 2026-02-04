import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-black mb-6" style={{ color: '#000000' }}>
            O MNE
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Som Dominik Prelovský, certifikovaný fitness coach s viac ako 10 rokmi
            skúseností v oblasti bodybuildingu, transformácie tela a výživy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Card 1 */}
          <div className="text-center p-8 md:p-10 bg-[#eeeeee] transition-all duration-300">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#f73131]">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: '#ffffff' }}
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="font-heading text-3xl text-black mb-4" style={{ color: '#000000' }}>
              10+ ROKOV SKÚSENOSTÍ
            </h3>
            <p className="font-body text-base md:text-lg text-gray-600 leading-relaxed">
              Certifikovaný tréner 2. kvalifikačnej úrovne s bohatou praxou
              v príprave športovcov a fitness nadšencov.
            </p>
          </div>

          {/* Card 2 */}
          <div className="text-center p-8 md:p-10 bg-[#eeeeee] transition-all duration-300">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#f73131]">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: '#ffffff' }}
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="font-heading text-3xl text-black mb-4" style={{ color: '#000000' }}>
              SCIENCE-BASED PRÍSTUP
            </h3>
            <p className="font-body text-base md:text-lg text-gray-600 leading-relaxed">
              Všetky metódy sú založené na vedeckých poznatkoch a overených
              tréningových princípoch, nie na trendoch.
            </p>
          </div>

          {/* Card 3 */}
          <div className="text-center p-8 md:p-10 bg-[#eeeeee] transition-all duration-300">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#f73131]">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: '#ffffff' }}
              >
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="font-heading text-3xl text-black mb-4" style={{ color: '#000000' }}>
              REÁLNE VÝSLEDKY
            </h3>
            <p className="font-body text-base md:text-lg text-gray-600 leading-relaxed">
              Stovky úspešných transformácií a spokojných klientov, ktorí
              dosiahli svoje fitness ciele.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href="/o-mne">
            <Button variant="filled" size="lg">
              Zisti viac o mne
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
