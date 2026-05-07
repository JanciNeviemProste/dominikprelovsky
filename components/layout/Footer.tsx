import React from 'react';
import Link from 'next/link';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from '../icons';
import type { SiteSettings } from '@/lib/content/types';

interface FooterProps {
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-darker-gray)] text-white">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-2xl text-[var(--color-primary)] mb-4">
              Dominik Prelovský
            </h3>
            <p className="font-body text-sm text-[var(--color-light-gray)] leading-relaxed">
              Akreditovaný kondičný tréner. Online koučing, stravovacie a tréningové plány,
              osobné tréningy v Trnave.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-4">Rýchle odkazy</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#sluzby"
                  className="font-body text-sm text-[var(--color-light-gray)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Online koučing
                </Link>
              </li>
              <li>
                <Link
                  href="/#premeny"
                  className="font-body text-sm text-[var(--color-light-gray)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Premeny klientov
                </Link>
              </li>
              <li>
                <Link
                  href="/#recenzie"
                  className="font-body text-sm text-[var(--color-light-gray)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Recenzie
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="font-body text-sm text-[var(--color-light-gray)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/online-koucing/formular"
                  className="font-body text-sm text-[var(--color-light-gray)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Prihlasovací formulár
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl mb-4">Kontakt</h4>
            <ul className="space-y-2 mb-4">
              <li>
                <a
                  href={`tel:${settings.contact.phone.replace(/\s+/g, '')}`}
                  className="font-body text-sm text-[var(--color-light-gray)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {settings.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="font-body text-sm text-[var(--color-light-gray)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {settings.contact.email}
                </a>
              </li>
              <li className="font-body text-sm text-[var(--color-light-gray)] leading-relaxed">
                {settings.contact.address}
              </li>
            </ul>
            <div className="flex gap-4">
              {settings.social.instagram && (
                <a
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[var(--color-primary)] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-6 h-6" />
                </a>
              )}
              {settings.social.tiktok && (
                <a
                  href={settings.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[var(--color-primary)] transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-6 h-6" />
                </a>
              )}
              {settings.social.youtube && (
                <a
                  href={settings.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[var(--color-primary)] transition-colors"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-dark-gray)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-[var(--color-light-gray)]">
            © {currentYear} Dominik Prelovský. Všetky práva vyhradené.
          </p>
          <Link
            href="/podmienky"
            className="font-body text-sm text-[var(--color-light-gray)] hover:text-[var(--color-primary)] transition-colors"
          >
            Všeobecné podmienky a ochrana súkromia
          </Link>
        </div>
      </div>
    </footer>
  );
};
