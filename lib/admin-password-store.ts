import crypto from "node:crypto";
import { readJson, saveJson } from "./storage";

// Zmenené admin heslo sa ukladá ako scrypt hash do úložiska (Netlify Blobs).
// Kým sa heslo cez admin nezmení, login používa ADMIN_PASSWORD z env
// (fallback v lib/admin-auth.ts).
const CREDENTIALS_KEY = "admin/credentials.json";

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`;
}

export function verifyAgainstHash(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  try {
    const salt = Buffer.from(parts[1], "hex");
    const expected = Buffer.from(parts[2], "hex");
    const derived = crypto.scryptSync(password, salt, expected.length);
    return crypto.timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

// Vráti uložený hash hesla z úložiska, alebo null (ešte nezmenené heslo / chyba).
export async function getStoredPasswordHash(): Promise<string | null> {
  try {
    const data = await readJson<{ hash?: string }>(CREDENTIALS_KEY);
    return data?.hash ?? null;
  } catch {
    return null;
  }
}

export async function storePasswordHash(password: string): Promise<void> {
  const hash = hashPassword(password);
  await saveJson(CREDENTIALS_KEY, {
    hash,
    updatedAt: new Date().toISOString(),
  });
}
