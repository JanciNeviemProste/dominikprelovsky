import type { MetadataRoute } from "next";

const SITE_URL = "https://dominikprelovsky.sk";

// Verejné, indexovateľné stránky. Admin, /api, /dakujem a členské podstránky
// (kniznica, vitaj) sú z indexu vynechané — viď robots.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/kontakt", priority: 0.8 },
    { path: "/premium-videa", priority: 0.7 },
    { path: "/podmienky", priority: 0.3 },
    { path: "/ochrana-osobnych-udajov", priority: 0.3 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
