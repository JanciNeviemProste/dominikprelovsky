import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dominik Prelovský — Skutočný Science-Based Tréner",
  description:
    "Akreditovaný kondičný tréner s 10-ročnými skúsenosťami. Osobný tréning, online coaching, stravovací plány a kondičná príprava športovcov v Trnave.",
  keywords: [
    "fitness tréner",
    "osobný tréner Trnava",
    "Dominik Prelovský",
    "online coaching",
    "stravovací plán",
    "kondičná príprava",
    "Men's Physique",
  ],
  openGraph: {
    title: "Dominik Prelovský — Skutočný Science-Based Tréner",
    description:
      "Akreditovaný kondičný tréner s 10-ročnými skúsenosťami. Osobný tréning, online coaching a stravovací plány v Trnave.",
    type: "website",
    locale: "sk_SK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
