import { describe, it, expect } from "vitest";
import settings from "@/data/site-settings.json";
import services from "@/data/services.json";

describe("obsah — premium videá a služby", () => {
  it("site-settings má premiumVideosSection s potrebnými poľami", () => {
    const s = settings.premiumVideosSection;
    expect(s).toBeDefined();
    expect(s.title).toBeTruthy();
    expect(s.ctaText).toBeTruthy();
    expect(s.ctaHref).toBe("https://herohero.co/prelovskydominik/subscribe");
  });

  it("services.json obsahuje novú Konzultáciu 1 na 1 (60 € / hodina)", () => {
    const k = services.find((s) => s.slug === "konzultacia");
    expect(k).toBeDefined();
    expect(k?.price).toBe("60 € / hodina");
  });

  it("žiadna služba nemá prázdny slug/title/price (slug = CTA /kontakt?sluzba=)", () => {
    for (const s of services) {
      expect(s.slug).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.price).toBeTruthy();
    }
  });
});
