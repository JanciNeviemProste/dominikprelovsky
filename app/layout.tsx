import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";
import { isAuthenticated } from "@/lib/admin-auth";
import { AdminProvider } from "@/lib/admin-context";
import EditModeBanner from "@/components/admin/EditModeBanner";
import PendingChangesBar from "@/components/admin/PendingChangesBar";
import StructuredData from "@/components/StructuredData";

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
  metadataBase: new URL("https://dominikprelovsky.sk"),
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
  // Náhľad pri zdieľaní odkazu (link preview). Zámerne IFBB Pro Card fotka
  // (1200×630 orez z hero-ifbb-pro.jpg) — Dominik ju chce v náhľadoch.
  openGraph: {
    title: "Dominik Prelovský — Skutočný Science-Based Tréner",
    description:
      "Akreditovaný kondičný tréner s 10-ročnými skúsenosťami. Osobný tréning, online coaching a stravovací plány v Trnave.",
    url: "https://dominikprelovsky.sk",
    siteName: "Dominik Prelovský",
    type: "website",
    locale: "sk_SK",
    images: [
      {
        url: "/images/og-ifbb-pro.jpg",
        width: 1200,
        height: 630,
        alt: "Dominik Prelovský s medailou a IFBB Pro Card — IFBB Diamond Cup Budapest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominik Prelovský — Skutočný Science-Based Tréner",
    description:
      "Akreditovaný kondičný tréner s 10-ročnými skúsenosťami. Osobný tréning, online coaching a stravovací plány v Trnave.",
    images: ["/images/og-ifbb-pro.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await isAuthenticated();

  return (
    <html
      lang="sk"
      className="scroll-smooth"
      style={isAdmin ? ({ "--admin-bar-h": "44px" } as React.CSSProperties) : undefined}
    >
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} antialiased`}
      >
        <StructuredData />
        <AdminProvider isAdmin={isAdmin}>
          <EditModeBanner />
          {children}
          <PendingChangesBar />
        </AdminProvider>
      </body>
    </html>
  );
}
