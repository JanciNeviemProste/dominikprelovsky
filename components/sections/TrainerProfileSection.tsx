import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui';
import type { SiteSettings } from '@/lib/content/types';

interface TrainerProfileSectionProps {
  settings: SiteSettings;
}

export const TrainerProfileSection: React.FC<TrainerProfileSectionProps> = ({ settings }) => {
  return (
    <section className="py-20 bg-[var(--color-darker-gray)]" id="o-mne">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] bg-[var(--color-dark-gray)] overflow-hidden">
              {settings.profilePhoto ? (
                <Image
                  src={settings.profilePhoto}
                  alt="Dominik Prelovský — fitness coach"
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-center text-[var(--color-text-secondary)]">
                  <div>
                    <svg
                      className="w-32 h-32 mx-auto mb-4 text-[var(--color-text-tertiary)]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm">Profilová fotka — doplniť cez Sanity</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-6">
              {settings.heroName}
            </h2>

            <p className="font-body text-lg text-[var(--color-light-gray)] leading-relaxed mb-8">
              {settings.shortBio}
            </p>

            <div className="mb-8">
              <h3 className="font-heading text-xl text-white mb-4" style={{ letterSpacing: '2px' }}>
                Kvalifikácie
              </h3>
              <ul className="space-y-2">
                {[
                  'Akreditovaný kondičný tréner (Ministerstvo školstva SR)',
                  'Športový tréner 2. kvalifikačného stupňa',
                  '4-ročné štúdium športovej prípravy — Šport. gymnázium J. Herdu, Trnava',
                  'Súťažiaci kulturista, kategória Men’s Physique',
                  'Osobný tréner v 365 Gym, Trnava — od roku 2016',
                ].map((item) => (
                  <li
                    key={item}
                    className="font-body text-[var(--color-light-gray)] flex items-start gap-2"
                  >
                    <svg
                      className="w-5 h-5 mt-1 text-[var(--color-primary)] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/online-koucing/formular">
                <Button variant="filled" size="lg">
                  Začni koučing
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  Kontaktuj ma
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
