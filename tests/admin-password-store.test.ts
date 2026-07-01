import { describe, it, expect } from "vitest";
import { hashPassword, verifyAgainstHash } from "@/lib/admin-password-store";

describe("admin heslo — scrypt hash", () => {
  it("overí správne heslo voči vlastnému hashu", () => {
    const hash = hashPassword("SuperTajne123!");
    expect(verifyAgainstHash("SuperTajne123!", hash)).toBe(true);
  });

  it("odmietne nesprávne heslo", () => {
    const hash = hashPassword("SuperTajne123!");
    expect(verifyAgainstHash("zleHeslo", hash)).toBe(false);
  });

  it("používa náhodnú soľ (rovnaké heslo → iný hash) a scrypt formát", () => {
    const a = hashPassword("rovnakeHeslo");
    const b = hashPassword("rovnakeHeslo");
    expect(a.startsWith("scrypt$")).toBe(true);
    expect(a.split("$")).toHaveLength(3);
    expect(a).not.toBe(b);
    // ...ale obidva sa dajú overiť
    expect(verifyAgainstHash("rovnakeHeslo", a)).toBe(true);
    expect(verifyAgainstHash("rovnakeHeslo", b)).toBe(true);
  });

  it("odmietne poškodený/neznámy formát hashu", () => {
    expect(verifyAgainstHash("x", "nie-je-hash")).toBe(false);
    expect(verifyAgainstHash("x", "scrypt$len-dve")).toBe(false);
    expect(verifyAgainstHash("x", "bcrypt$aa$bb")).toBe(false);
  });
});
