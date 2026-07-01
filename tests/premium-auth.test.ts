import { describe, it, expect, beforeAll } from "vitest";

// Modul načítame dynamicky až po nastavení secretu.
type Mod = typeof import("@/lib/premium-auth");
let mod: Mod;

beforeAll(async () => {
  process.env.PREMIUM_SESSION_SECRET = "test-secret-abc-123456789";
  mod = await import("@/lib/premium-auth");
});

describe("premium magic-link token", () => {
  it("vytvorí a overí platný token (case-insensitive e-mail)", () => {
    const t = mod.createMagicToken("Clen@Example.SK");
    expect(mod.verifyMagicToken(t)).toBe("clen@example.sk");
  });

  it("odmietne zmanipulovaný alebo neplatný token", () => {
    const t = mod.createMagicToken("a@b.sk");
    expect(mod.verifyMagicToken(t + "x")).toBeNull();
    expect(mod.verifyMagicToken("neplatny")).toBeNull();
    expect(mod.verifyMagicToken(undefined)).toBeNull();
  });
});

describe("premium member session", () => {
  it("vytvorí a overí session token", () => {
    const s = mod.createMemberSession("clen@example.sk");
    expect(mod.verifyMemberSession(s)).toBe("clen@example.sk");
  });

  it("magic token nie je platný ako session a naopak (rôzne domény podpisu)", () => {
    const magic = mod.createMagicToken("clen@example.sk");
    const session = mod.createMemberSession("clen@example.sk");
    expect(mod.verifyMemberSession(magic)).toBeNull();
    expect(mod.verifyMagicToken(session)).toBeNull();
  });
});
