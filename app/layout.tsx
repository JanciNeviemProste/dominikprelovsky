import type { Metadata } from 'next';
import { Bebas_Neue, Montserrat } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components/layout';
import { getSiteSettings } from '@/lib/getContent';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dominikprelovsky.sk'),
  title: {
    default: 'Dominik Prelovský — Online koučing & osobný tréner v Trnave',
    template: '%s | Dominik Prelovský',
  },
  description:
    'Akreditovaný kondičný tréner a súťažiaci kulturista. Online koučing, stravovacie a tréningové plány, osobné tréningy v 365 Gym Trnava.',
  keywords: [
    'fitness coach',
    'online koučing',
    'osobný tréner Trnava',
    'tréningový plán',
    'stravovací plán',
    'kulturistika',
    'Men’s Physique',
    'Dominik Prelovský',
  ],
  authors: [{ name: 'Dominik Prelovský' }],
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: 'Dominik Prelovský',
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dominik Prelovský',
    jobTitle: 'Fitness coach & osobný tréner',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dominikprelovsky.sk',
    sameAs: [settings.social.instagram, settings.social.tiktok, settings.social.youtube].filter(
      Boolean,
    ),
    worksFor: {
      '@type': 'LocalBusiness',
      name: '365 Gym',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Zelenečská 111',
        addressLocality: 'Trnava',
        postalCode: '917 05',
        addressCountry: 'SK',
      },
    },
  };

  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Dominik Prelovský — Online koučing & osobný tréner',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dominikprelovsky.sk'}/opengraph-image.png`,
    telephone: settings.contact.phone,
    email: settings.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zelenečská 111',
      addressLocality: 'Trnava',
      postalCode: '917 05',
      addressCountry: 'SK',
    },
    priceRange: '€€',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dominikprelovsky.sk',
  };

  return (
    <html lang="sk">
      <body className={`${bebasNeue.variable} ${montserrat.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <Header settings={settings} />
        <main className="pt-20">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
