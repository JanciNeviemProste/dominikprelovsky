import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_NAME,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin-auth";

const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const limit = 5;
  const existing = buckets.get(ip);
  if (!existing || existing.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

function getClientIp(req: NextRequest): string {
  // On Vercel, `x-forwarded-for` is set by Vercel's edge — but we can't blindly trust
  // the first value if multiple proxies are in play. Use a single-key fallback chain.
  // Pre serverless rate-limit toto stačí; pre robustnosť proti spoofingu by sme
  // potrebovali Vercel KV alebo cf-connecting-ip pri Cloudflare.
  const xri = req.headers.get("x-real-ip");
  if (xri) return xri.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    // posledný v reťazci je najbližší proxy (Vercel) — bezpečnejšie ako prvý
    const parts = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Príliš veľa pokusov. Skús to o pár minút." },
      { status: 429 },
    );
  }

  let payload: { password?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 400 });
  }

  const password = payload.password || "";
  if (!password) {
    return NextResponse.json({ error: "Zadaj heslo." }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Nesprávne heslo." }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}
