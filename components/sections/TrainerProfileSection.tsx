import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

export const TrainerProfileSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#161616]">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] bg-[#282828] overflow-hidden">
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-32 h-32 mx-auto mb-4 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <p className="text-gray-500 text-sm">
                    Dominik Prelovský<br />
                    Profesionálna fotka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-6">
              DOMINIK PRELOVSKÝ
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-body text-lg text-gray-300 leading-relaxed">
                Som dlhoročný akreditovaný kondičný tréner a športový tréner <strong className="text-white">2. kvalifikačnej úrovne</strong>.
                Absolvoval som 4-ročné štúdium športovej prípravy na Športovom gymnáziu Jozefa Herdu v Trnave.
                Pracujem ako osobný fitness tréner v <strong className="text-white">365 GYM</strong> a súťažím v bodybuilding kategórii <strong className="text-white">Men's Physique</strong>.
              </p>

              <p className="font-body text-lg text-gray-300 leading-relaxed">
                Verím v <strong className="text-white">science-based prístup</strong> – žiadne shortcuts,
                žiadne magické riešenia. Len overené metódy, tvrdá práca a konzistentnosť.
                Každý klient je pre mňa jedinečný a preto vytvárám plány presne na mieru.
              </p>

              <p className="font-body text-lg text-gray-300 leading-relaxed">
                Či už chceš schudnúť, nabrať svalovú hmotu alebo zlepšiť svoju kondíciu,
                som tu aby som ťa sprevádzal na tejto ceste a pomohol ti dosiahnuť výsledky,
                o ktorých si vždy sníval.
              </p>
            </div>

            {/* Certifications */}
            <div className="mb-8">
              <h3 className="font-heading text-xl text-white mb-4" style={{ letterSpacing: '2px' }}>
                CERTIFIKÁCIE & KVALIFIKÁCIE
              </h3>
              <ul className="space-y-2">
                <li className="font-body text-gray-300 flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Certifikovaný kondičný tréner (akreditovaný Ministerstvom školstva)
                </li>
                <li className="font-body text-gray-300 flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Športový tréner 2. kvalifikačnej úrovne
                </li>
                <li className="font-body text-gray-300 flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Špecializácia na bodybuilding (Men's Physique)
                </li>
                <li className="font-body text-gray-300 flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Špecializácia na svalový rast a redukciu podkožného tuku
                </li>
                <li className="font-body text-gray-300 flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-1 text-[var(--color-primary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  10+ rokov praktických skúseností
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/o-mne">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
                  Viac o mne
                </Button>
              </Link>
              <Link href="/online-koucing/formular">
                <Button variant="filled" size="lg">
                  Začni koučing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
