import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createMagicToken } from "@/lib/premium-auth";

// Jednoduchý in-memory rate limit (per instancia): 5 pokusov / 10 min / IP.
const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = buckets.get(ip);
  if (!existing || existing.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (existing.count >= 5) return false;
  existing.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Priveľa pokusov. Skús to o pár minút." },
      { status: 429 },
    );
  }

  let email = "";
  try {
    email = ((await req.json())?.email || "").trim();
  } catch {
    return NextResponse.json({ error: "Neplatný formát." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Zadaj platný e-mail." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.PREMIUM_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Prihlásenie zatiaľ nie je nakonfigurované." },
      { status: 500 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const token = createMagicToken(email);
  const link = `${baseUrl}/api/premium/verify?token=${encodeURIComponent(token)}`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Dominik Prelovský <noreply@dominikprelovsky.sk>",
      to: email,
      subject: "Prihlásenie do Premium videí",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 28px; color: #2b2b2b; margin-bottom: 8px;">Prihlásenie do Premium videí</h1>
          <p style="font-size: 14px; color: #2b2b2b; line-height: 1.7; margin-bottom: 24px;">
            Klikni na tlačidlo nižšie a dostaneš sa do svojej členskej knižnice. Odkaz je platný 15 minút.
          </p>
          <a href="${link}" style="display: inline-block; background-color: #f73131; color: #ffffff; padding: 14px 32px; border-radius: 9999px; font-size: 16px; font-weight: 600; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
            PRIHLÁSIŤ SA
          </a>
          <p style="font-size: 12px; color: #888888; margin-top: 32px; line-height: 1.6;">
            Ak si o prihlásenie nežiadal(a), tento e-mail ignoruj.
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Premium login email error:", err);
    return NextResponse.json(
      { error: "E-mail sa nepodarilo odoslať. Skús to znova." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
