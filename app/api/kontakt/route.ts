import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const COACH_EMAIL =
  process.env.COACH_EMAIL || "prelovskydominik@gmail.com";
const FROM_EMAIL = "Web kontakt <noreply@dominikprelovsky.sk>";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const SERVICE_LABELS: Record<string, string> = {
  "konzultacia-zadarmo": "Konzultácia 1on1 (ZADARMO)",
  "online-coaching": "Online coaching (600 €)",
  "osobna-konzultacia": "Osobná konzultácia (60 €/hod)",
  "stravovaci-plan": "Stravovací plán (200 €)",
  "treningovy-plan": "Tréningový plán (170 €)",
  "osobny-trening": "Osobný tréning (30 €/tréning)",
  "iny-dovod": "Iný dôvod",
};

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Server zatiaľ nie je nakonfigurovaný." },
      { status: 500 },
    );
  }

  let payload: Record<string, string>;
  try {
    const form = await req.formData();
    payload = Object.fromEntries(
      Array.from(form.entries()).map(([k, v]) => [k, String(v)]),
    );
  } catch {
    return NextResponse.json(
      { error: "Neplatný formát požiadavky." },
      { status: 400 },
    );
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const service = (payload.service || "").trim();
  const message = (payload.message || "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Zadaj meno a priezvisko." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Zadaj platný e-mail." }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Príliš dlhý vstup." }, { status: 400 });
  }

  const serviceLabel = service ? SERVICE_LABELS[service] || service : "—";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: COACH_EMAIL,
      replyTo: email,
      subject: `Nová správa z webu — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px;">
          <h1 style="font-size: 24px; color: #2b2b2b; border-bottom: 3px solid #f73131; padding-bottom: 8px;">
            Nová správa z kontaktného formulára
          </h1>
          <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #888; width: 140px;">Meno:</td><td><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding: 6px 0; color: #888;">E-mail:</td><td><a href="mailto:${escapeHtml(email)}" style="color: #f73131;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Typ služby:</td><td>${escapeHtml(serviceLabel)}</td></tr>
          </table>
          ${
            message
              ? `<div style="margin-top: 24px; padding: 16px; background: #f7f7f7; border-left: 4px solid #f73131; white-space: pre-wrap;">${escapeHtml(message)}</div>`
              : `<p style="margin-top: 24px; color: #888;">(bez správy)</p>`
          }
          <p style="margin-top: 32px; font-size: 12px; color: #888;">
            Odoslané z dominikprelovsky.sk · ${new Date().toLocaleString("sk-SK")}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error (kontakt):", error);
      return NextResponse.json({ error: "Nepodarilo sa odoslať." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Kontakt route error:", err);
    return NextResponse.json({ error: "Interná chyba." }, { status: 500 });
  }
}
