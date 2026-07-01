import crypto from "node:crypto";
import { list, put } from "@vercel/blob";

// Zmenené admin heslo sa ukladá ako scrypt hash do Vercel Blob (deterministická
// cesta, aby sme ho vedeli spätne prečítať). Kým sa heslo cez admin nezmení,
// login používa ADMIN_PASSWORD z env (fallback v lib/admin-auth.ts).
const BLOB_PATH = "admin/credentials.json";

function hasBlobToken(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

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

// Vráti uložený hash hesla z Blobu, alebo null (žiadny token / ešte nezmenené heslo / chyba).
export async function getStoredPasswordHash(): Promise<string | null> {
  if (!hasBlobToken()) return null;
  try {
    const { blobs } = await list({
      prefix: BLOB_PATH,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const blob = blobs.find((b) => b.pathname === BLOB_PATH);
    if (!blob) return null;
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { hash?: string };
    return data.hash || null;
  } catch {
    return null;
  }
}

export async function storePasswordHash(password: string): Promise<void> {
  const hash = hashPassword(password);
  await put(
    BLOB_PATH,
    JSON.stringify({ hash, updatedAt: new Date().toISOString() }),
    {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    },
  );
}
