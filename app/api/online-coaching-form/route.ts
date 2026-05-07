import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ZodError } from 'zod';
import {
  completeFormSchema,
  CompleteFormData,
  genderLabels,
  primaryGoalLabels,
  experienceLevelLabels,
  currentFrequencyLabels,
  preferredLocationLabels,
  dietApproachLabels,
  mealPrepLabels,
  budgetRangeLabels,
  dayLabels,
} from '@/lib/validations/coachingFormSchemas';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Dominik Prelovský <noreply@dominikprelovsky.sk>';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatFormDataToHtml(data: CompleteFormData): string {
  const { personalInfo, fitnessGoals, workoutExperience, dietaryInfo, availability } = data;

  const formattedDays = availability.availableDays
    .map((day) => dayLabels[day as keyof typeof dayLabels])
    .join(', ');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }
          .container { background-color: #ffffff; padding: 40px; }
          h1 { color: #f73131; font-size: 28px; margin-bottom: 10px; border-bottom: 3px solid #f73131; padding-bottom: 10px; }
          .section-title { color: #f73131; font-size: 20px; font-weight: bold; margin-bottom: 15px; margin-top: 25px; }
          .field { margin-bottom: 12px; padding: 8px 0; }
          .label { font-weight: 600; color: #555; margin-right: 8px; }
          .value { color: #222; }
          .highlight { background-color: #fff3f3; padding: 15px; border-left: 4px solid #f73131; margin: 15px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #777; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Nová žiadosť o online koučing</h1>
          <div class="highlight">
            <div class="field"><span class="label">Meno:</span> <strong>${escapeHtml(personalInfo.fullName)}</strong></div>
            <div class="field"><span class="label">Email:</span> <a href="mailto:${escapeHtml(personalInfo.email)}">${escapeHtml(personalInfo.email)}</a></div>
            <div class="field"><span class="label">Telefón:</span> ${escapeHtml(personalInfo.phone)}</div>
          </div>
          <div class="section-title">Osobné údaje</div>
          <div class="field"><span class="label">Vek:</span> ${personalInfo.age} rokov</div>
          <div class="field"><span class="label">Pohlavie:</span> ${genderLabels[personalInfo.gender]}</div>
          <div class="section-title">Fitness ciele</div>
          <div class="field"><span class="label">Hlavný cieľ:</span> <strong>${primaryGoalLabels[fitnessGoals.primaryGoal]}</strong></div>
          ${fitnessGoals.targetWeight ? `<div class="field"><span class="label">Cieľová váha:</span> ${fitnessGoals.targetWeight} kg</div>` : ''}
          ${fitnessGoals.targetDate ? `<div class="field"><span class="label">Cieľový dátum:</span> ${new Date(fitnessGoals.targetDate).toLocaleDateString('sk-SK')}</div>` : ''}
          <div class="field"><span class="label">Motivácia:</span><br>${escapeHtml(fitnessGoals.motivation)}</div>
          <div class="section-title">Tréningové skúsenosti</div>
          <div class="field"><span class="label">Úroveň skúseností:</span> ${experienceLevelLabels[workoutExperience.experienceLevel]}</div>
          <div class="field"><span class="label">Súčasná frekvencia tréningov:</span> ${currentFrequencyLabels[workoutExperience.currentFrequency]}</div>
          <div class="field"><span class="label">Preferované miesto tréningu:</span> ${preferredLocationLabels[workoutExperience.preferredLocation]}</div>
          ${workoutExperience.injuriesLimitations ? `<div class="field"><span class="label">Zranenia/Obmedzenia:</span><br>${escapeHtml(workoutExperience.injuriesLimitations)}</div>` : ''}
          <div class="section-title">Stravovanie</div>
          <div class="field"><span class="label">Stravovací prístup:</span> ${dietApproachLabels[dietaryInfo.currentDietApproach]}</div>
          ${dietaryInfo.dietaryRestrictions ? `<div class="field"><span class="label">Dietetické obmedzenia:</span><br>${escapeHtml(dietaryInfo.dietaryRestrictions)}</div>` : ''}
          <div class="field"><span class="label">Príprava jedál:</span> ${mealPrepLabels[dietaryInfo.mealPrepPreference]}</div>
          ${dietaryInfo.currentDailyCalories ? `<div class="field"><span class="label">Denný kalorický príjem:</span> ${dietaryInfo.currentDailyCalories} kcal</div>` : ''}
          <div class="section-title">Dostupnosť a balíček</div>
          <div class="field"><span class="label">Dostupné dni:</span> <strong>${formattedDays}</strong></div>
          <div class="field"><span class="label">Preferovaný dátum začiatku:</span> ${new Date(availability.preferredStartDate).toLocaleDateString('sk-SK')}</div>
          <div class="field"><span class="label">Vybraný balíček:</span> <strong>${budgetRangeLabels[availability.budgetRange]}</strong></div>
          ${availability.additionalNotes ? `<div class="field"><span class="label">Poznámky:</span><br>${escapeHtml(availability.additionalNotes)}</div>` : ''}
          <div class="footer">Odoslané z dominikprelovsky.sk · ${new Date().toLocaleString('sk-SK')}</div>
        </div>
      </body>
    </html>
  `;
}

function formatClientConfirmationHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #161616;">
        <div style="border-top: 4px solid #f73131; padding-top: 24px;">
          <h1 style="color: #f73131; margin: 0 0 16px;">Ďakujem za prihlášku, ${escapeHtml(name)}!</h1>
          <p style="line-height: 1.6;">
            Tvoja žiadosť o online koučing dorazila a začínam si ju prechádzať. Ozvem sa ti
            zvyčajne do 24 hodín — väčšinou rýchlejšie. Pošlem ti termín na vstupnú konzultáciu
            a doplňujúce otázky, aby som ti vedel pripraviť plán naozaj na mieru.
          </p>
          <p style="line-height: 1.6;">
            Medzičasom mi môžeš napísať na Instagrame
            <a href="https://www.instagram.com/fitcoach_dominprelovsky/" style="color: #f73131;">@fitcoach_dominprelovsky</a>
            alebo odpovedať priamo na tento email.
          </p>
          <p style="margin-top: 32px; line-height: 1.4;">
            Drž sa,<br>
            <strong>Dominik Prelovský</strong><br>
            <span style="color: #686868; font-size: 14px;">Fitness coach · Trnava</span>
          </p>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = checkRateLimit({
    key: 'online-coaching-form',
    ip,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Príliš veľa pokusov. Skús to prosím o pár minút znova.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)) } },
    );
  }

  try {
    const body = await request.json();
    const validatedData = completeFormSchema.parse(body);

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Server nie je nakonfigurovaný (chýba RESEND_API_KEY).' },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const coachEmail = process.env.COACH_EMAIL || 'info@dominikprelovsky.sk';
    const clientName = validatedData.personalInfo.fullName;
    const clientEmail = validatedData.personalInfo.email;

    const coachSend = resend.emails.send({
      from: FROM_EMAIL,
      to: coachEmail,
      replyTo: clientEmail,
      subject: `Nová žiadosť o online koučing — ${clientName}`,
      html: formatFormDataToHtml(validatedData),
    });

    const clientSend = resend.emails.send({
      from: FROM_EMAIL,
      to: clientEmail,
      replyTo: coachEmail,
      subject: 'Tvoja prihláška na online koučing dorazila',
      html: formatClientConfirmationHtml(clientName),
    });

    const [coachResult, clientResult] = await Promise.all([coachSend, clientSend]);

    if (coachResult.error) {
      console.error('Resend error (coach notification):', coachResult.error);
      return NextResponse.json({ error: 'Nepodarilo sa odoslať správu.' }, { status: 500 });
    }
    if (clientResult.error) {
      console.warn('Resend warn (client confirmation):', clientResult.error);
    }

    return NextResponse.json(
      { success: true, messageId: coachResult.data?.id },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: 'Neplatné dáta formulára' },
        { status: 400 },
      );
    }
    console.error('Form submission error:', err);
    return NextResponse.json({ error: 'Interná chyba servera' }, { status: 500 });
  }
}
