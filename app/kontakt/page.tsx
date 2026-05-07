import type { Metadata } from 'next';
import { KontaktForm } from '@/components/forms/KontaktForm';
import { getSiteSettings } from '@/lib/getContent';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Napíš mi a začnime spoluprácu. Osobné tréningy v 365 Gym Trnava, Zelenečská 111. Online koučing kdekoľvek.',
};

export default async function KontaktPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-[var(--color-light-gray)] py-12">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="font-heading text-5xl md:text-6xl text-black mb-4"
            style={{ textTransform: 'none' }}
          >
            Kontakt
          </h1>
          <p className="font-body text-lg text-[var(--color-text-tertiary)] max-w-2xl mx-auto">
            Napíš mi cez formulár, telefonicky alebo na email — ozvem sa ti čo najskôr.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-8">
            <h2 className="font-heading text-2xl text-black mb-6" style={{ letterSpacing: '1px' }}>
              Napíš mi
            </h2>
            <KontaktForm />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8">
              <h2
                className="font-heading text-2xl text-black mb-6"
                style={{ letterSpacing: '1px' }}
              >
                Kde ma nájdeš
              </h2>
              <ul className="space-y-4 font-body text-base text-[var(--color-text-primary)]">
                <li className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-[var(--color-primary)]">
                    📍
                  </span>
                  <span>{settings.contact.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-[var(--color-primary)]">
                    📞
                  </span>
                  <a
                    href={`tel:${settings.contact.phone.replace(/\s+/g, '')}`}
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    {settings.contact.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-[var(--color-primary)]">
                    ✉
                  </span>
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    {settings.contact.email}
                  </a>
                </li>
              </ul>
            </div>

            {settings.contact.googleMapsEmbedUrl && (
              <div className="bg-white">
                <iframe
                  src={settings.contact.googleMapsEmbedUrl}
                  title="Mapa — 365 Gym Trnava"
                  loading="lazy"
                  className="w-full aspect-video"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
