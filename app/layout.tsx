import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

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
  metadataBase: new URL('https://dominikprelovsky.sk'),
  title: {
    default: 'Dominik Prelovský | Fitness Coach & Online Koučing',
    template: '%s | Dominik Prelovský',
  },
  description: 'Fitness coach s 10 rokmi skúseností. Bodybuilding, transformácia tela, výživa. Online koučing pre serióznych klientov v Trnave.',
  keywords: ['fitness coach', 'online koučing', 'bodybuilding', 'transformácia tela', 'výživa', 'Trnava', 'personal trainer'],
  authors: [{ name: 'Dominik Prelovský' }],
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: 'Dominik Prelovský - Fitness Coach',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={`${bebasNeue.variable} ${montserrat.variable} antialiased`}>
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
