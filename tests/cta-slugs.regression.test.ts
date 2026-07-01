import { describe, it, expect } from "vitest";
import settings from "@/data/site-settings.json";
import services from "@/data/services.json";

// Regression: ISSUE — hero tlačidlo „ONLINE COACHING" a CTA „POĎ DO TOHO"
// odkazovali na /kontakt?sluzba=online-coaching, čo nie je platná služba
// (dropdown ju nepozná → žiadny predvýber, v e-maile surový slug).
// Found by /qa 2026-07-01.
const validSlugs = new Set<string>([...services.map((s) => s.slug), "iny-dovod"]);

function collectSluzbaSlugs(obj: unknown, acc: string[] = []): string[] {
  if (typeof obj === "string") {
    const m = obj.match(/[?&]sluzba=([^&#]+)/);
    if (m) acc.push(decodeURIComponent(m[1]));
  } else if (obj && typeof obj === "object") {
    for (const v of Object.values(obj as Record<string, unknown>)) {
      collectSluzbaSlugs(v, acc);
    }
  }
  return acc;
}

describe("CTA odkazy — každý ?sluzba= odkazuje na reálnu službu", () => {
  it("site-settings.json neobsahuje neplatné slugy v CTA odkazoch", () => {
    const used = collectSluzbaSlugs(settings);
    for (const slug of used) {
      expect(validSlugs.has(slug), `neplatný slug v CTA: ${slug}`).toBe(true);
    }
  });
});
