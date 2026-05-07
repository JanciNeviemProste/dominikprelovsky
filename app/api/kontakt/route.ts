import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ZodError } from 'zod';
import { kontaktSchema } from '@/lib/validations/kontaktSchema';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Dominik Prelovský <noreply@dominikprelovsky.sk>';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = checkRateLimit({ key: 'kontakt', ip, limit: 3, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Príliš veľa pokusov. Skús to prosím o pár minút znova.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)) } },
    );
  }

  try {
    const body = await request.json();
    const data = kontaktSchema.parse(body);

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Server nie je nakonfigurovaný (chýba RESEND_API_KEY).' },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const coachEmail = process.env.COACH_EMAIL || 'info@dominikprelovsky.sk';

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: coachEmail,
      replyTo: data.email,
      subject: `Nová správa z webu — ${data.name}`,
      html: `
        <h1 style="font-family: sans-serif; color: #f73131;">Nová správa z kontaktného formulára</h1>
        <p><strong>Meno:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
        ${data.phone ? `<p><strong>Telefón:</strong> ${escapeHtml(data.phone)}</p>` : ''}
        <p><strong>Správa:</strong></p>
        <p style="white-space: pre-wrap; padding: 12px; background: #f7f7f7; border-left: 4px solid #f73131;">${escapeHtml(data.message)}</p>
      `,
    });

    if (error) {
      console.error('Resend error (kontakt):', error);
      return NextResponse.json({ error: 'Nepodarilo sa odoslať správu.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: 'Neplatné vstupné dáta.' }, { status: 400 });
    }
    console.error('Kontakt route error:', err);
    return NextResponse.json({ error: 'Interná chyba servera.' }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
