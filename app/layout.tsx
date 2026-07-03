import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";
import { isAuthenticated } from "@/lib/admin-auth";
import { AdminProvider } from "@/lib/admin-context";
import EditModeBanner from "@/components/admin/EditModeBanner";
import PendingChangesBar from "@/components/admin/PendingChangesBar";

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
  // Náhľad pri zdieľaní odkazu (link preview). Bez explicitného og:image si siete
  // brali hero fotku (súťažné pódium). Sem daj profesionálnu 1200×630 fotku Dominika.
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
        url: "/images/online_coaching_800x600.jpg",
        width: 800,
        height: 600,
        alt: "Dominik Prelovský — kondičný tréner a online coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominik Prelovský — Skutočný Science-Based Tréner",
    description:
      "Akreditovaný kondičný tréner s 10-ročnými skúsenosťami. Osobný tréning, online coaching a stravovací plány v Trnave.",
    images: ["/images/online_coaching_800x600.jpg"],
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
        <AdminProvider isAdmin={isAdmin}>
          <EditModeBanner />
          {children}
          <PendingChangesBar />
        </AdminProvider>
      </body>
    </html>
  );
}
