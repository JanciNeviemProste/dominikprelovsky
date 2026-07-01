import { describe, it, expect } from "vitest";
import highlights from "@/data/highlights.json";
import ebooks from "@/data/ebooks.json";

// Stráži sekciu NOVINKY: má práve 2 e-booky a každý odkazuje na existujúci produkt.
describe("NOVINKY ↔ e-booky konzistencia", () => {
  it("má práve 2 novinky", () => {
    expect(highlights.length).toBe(2);
  });

  it("každá novinka odkazuje na existujúci e-book (ebookId)", () => {
    const ids = new Set(ebooks.map((e) => e.id));
    for (const h of highlights) {
      expect(ids.has(h.ebookId), `chýba ebook pre novinku: ${h.ebookId}`).toBe(
        true,
      );
    }
  });

  it("obsahuje očakávané dva e-booky", () => {
    const labels = highlights.map((h) => h.label);
    expect(labels).toContain("Stravovanie profi športovca");
    expect(labels).toContain("Chudnutie bez rátania kalórií");
  });

  it("každá novinka má obrázok z /images/", () => {
    for (const h of highlights) {
      expect(h.image.startsWith("/images/")).toBe(true);
    }
  });
});
