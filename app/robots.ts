import type { MetadataRoute } from "next";

const SITE_URL = "https://dominikprelovsky.sk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api",
        "/dakujem",
        "/premium-videa/kniznica",
        "/premium-videa/vitaj",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
