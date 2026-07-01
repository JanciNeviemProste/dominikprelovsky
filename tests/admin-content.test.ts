import { describe, it, expect } from "vitest";
import { validateContent, isValidContentType } from "@/lib/admin-content";

// Validátory admin obsahu — pure logika, spoločná pre obe vetvy.
describe("admin-content validácia", () => {
  it("isValidContentType pozná známe typy a odmietne neznáme", () => {
    expect(isValidContentType("services")).toBe(true);
    expect(isValidContentType("ebooks")).toBe(true);
    expect(isValidContentType("premium-videos")).toBe(true);
    expect(isValidContentType("nieco-neexistujuce")).toBe(false);
  });

  it("premium-videos: platná položka prejde", () => {
    const ok = validateContent("premium-videos", [
      { id: "v1", title: "Tréning", provider: "youtube", videoId: "abc123" },
    ]);
    expect(Array.isArray(ok)).toBe(true);
  });

  it("premium-videos: neplatný provider / celá URL zlyhá", () => {
    const badProvider = validateContent("premium-videos", [
      { id: "v1", title: "T", provider: "tiktok", videoId: "abc" },
    ]);
    expect(typeof badProvider).toBe("string");

    const urlInsteadOfId = validateContent("premium-videos", [
      { id: "v1", title: "T", provider: "youtube", videoId: "https://youtu.be/x" },
    ]);
    expect(typeof urlInsteadOfId).toBe("string");
  });

  it("services: chýbajúce povinné polia zlyhajú", () => {
    const bad = validateContent("services", [{ slug: "x" }]);
    expect(typeof bad).toBe("string");
  });

  it("services: kompletná položka prejde", () => {
    const ok = validateContent("services", [
      {
        slug: "standard",
        title: "Štandard",
        tagline: "Popis",
        price: "150 €/mesiac",
        featured: false,
        bullets: ["a", "b"],
      },
    ]);
    expect(Array.isArray(ok)).toBe(true);
  });
});
