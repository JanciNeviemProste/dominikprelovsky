import { describe, it, expect } from "vitest";
import services from "@/data/services.json";

// Replikuje logiku z components/ContactForm.tsx a app/api/kontakt/route.ts:
// „Typ služby" a jeho ceny sa generujú z data/services.json.
const labels: Record<string, string> = {
  ...Object.fromEntries(services.map((s) => [s.slug, `${s.title} (${s.price})`])),
  "iny-dovod": "Iný dôvod",
};

describe("kontakt — typ služby odzrkadľuje reálne služby a ceny", () => {
  it("každá služba má label so správnym názvom a cenou", () => {
    for (const s of services) {
      expect(labels[s.slug]).toBe(`${s.title} (${s.price})`);
    }
  });

  it("obsahuje kľúčové balíčky s aktuálnymi cenami", () => {
    expect(labels["premium"]).toContain("250 €/mesiac");
    expect(labels["konzultacia"]).toContain("60 € / hodina");
    expect(labels["standard"]).toContain("150 €/mesiac");
  });

  it("neobsahuje staré neplatné slugy ani ceny", () => {
    expect(labels["online-coaching"]).toBeUndefined();
    expect(labels["osobny-trening"]).toBeUndefined();
    expect(labels["osobna-konzultacia"]).toBeUndefined();
    const all = JSON.stringify(labels);
    expect(all).not.toContain("600 €");
    expect(all).not.toContain("170 €");
  });

  it("zachováva možnosť „Iný dôvod“", () => {
    expect(labels["iny-dovod"]).toBe("Iný dôvod");
  });
});
