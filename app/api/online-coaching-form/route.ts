import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
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

function formatFormDataToHtml(data: CompleteFormData): string {
  const { personalInfo, fitnessGoals, workoutExperience, dietaryInfo, availability } = data;

  // Format available days
  const formattedDays = availability.availableDays
    .map((day) => dayLabels[day as keyof typeof dayLabels])
    .join(', ');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 {
            color: #f73131;
            font-size: 28px;
            margin-bottom: 10px;
            border-bottom: 3px solid #f73131;
            padding-bottom: 10px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            color: #f73131;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
            margin-top: 25px;
          }
          .field {
            margin-bottom: 12px;
            padding: 8px 0;
          }
          .label {
            font-weight: 600;
            color: #555;
            margin-right: 8px;
          }
          .value {
            color: #222;
          }
          .highlight {
            background-color: #fff3f3;
            padding: 15px;
            border-left: 4px solid #f73131;
            margin: 15px 0;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            text-align: center;
            color: #777;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🏋️ Nová žiadosť o Online Koučing</h1>

          <div class="highlight">
            <div class="field">
              <span class="label">Meno:</span>
              <span class="value"><strong>${personalInfo.fullName}</strong></span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value">${personalInfo.email}</span>
            </div>
            <div class="field">
              <span class="label">Telefón:</span>
              <span class="value">${personalInfo.phone}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">📋 Osobné údaje</div>
            <div class="field">
              <span class="label">Vek:</span>
              <span class="value">${personalInfo.age} rokov</span>
            </div>
            <div class="field">
              <span class="label">Pohlavie:</span>
              <span class="value">${genderLabels[personalInfo.gender]}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">🎯 Fitness ciele</div>
            <div class="field">
              <span class="label">Hlavný cieľ:</span>
              <span class="value"><strong>${primaryGoalLabels[fitnessGoals.primaryGoal]}</strong></span>
            </div>
            ${fitnessGoals.targetWeight ? `
            <div class="field">
              <span class="label">Cieľová váha:</span>
              <span class="value">${fitnessGoals.targetWeight} kg</span>
            </div>
            ` : ''}
            ${fitnessGoals.targetDate ? `
            <div class="field">
              <span class="label">Cieľový dátum:</span>
              <span class="value">${new Date(fitnessGoals.targetDate).toLocaleDateString('sk-SK')}</span>
            </div>
            ` : ''}
            <div class="field">
              <span class="label">Motivácia:</span>
              <div class="value" style="margin-top: 8px; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
                ${fitnessGoals.motivation}
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">💪 Tréningové skúsenosti</div>
            <div class="field">
              <span class="label">Úroveň skúseností:</span>
              <span class="value">${experienceLevelLabels[workoutExperience.experienceLevel]}</span>
            </div>
            <div class="field">
              <span class="label">Súčasná frekvencia tréningov:</span>
              <span class="value">${currentFrequencyLabels[workoutExperience.currentFrequency]}</span>
            </div>
            <div class="field">
              <span class="label">Preferované miesto tréningu:</span>
              <span class="value">${preferredLocationLabels[workoutExperience.preferredLocation]}</span>
            </div>
            ${workoutExperience.injuriesLimitations ? `
            <div class="field">
              <span class="label">Zranenia/Obmedzenia:</span>
              <div class="value" style="margin-top: 8px; padding: 10px; background-color: #fff9f9; border-radius: 4px;">
                ${workoutExperience.injuriesLimitations}
              </div>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <div class="section-title">🥗 Stravovanie</div>
            <div class="field">
              <span class="label">Stravovací prístup:</span>
              <span class="value">${dietApproachLabels[dietaryInfo.currentDietApproach]}</span>
            </div>
            ${dietaryInfo.dietaryRestrictions ? `
            <div class="field">
              <span class="label">Dietetické obmedzenia:</span>
              <div class="value" style="margin-top: 8px; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
                ${dietaryInfo.dietaryRestrictions}
              </div>
            </div>
            ` : ''}
            <div class="field">
              <span class="label">Príprava jedál:</span>
              <span class="value">${mealPrepLabels[dietaryInfo.mealPrepPreference]}</span>
            </div>
            ${dietaryInfo.currentDailyCalories ? `
            <div class="field">
              <span class="label">Denný kalorický príjem:</span>
              <span class="value">${dietaryInfo.currentDailyCalories} kcal</span>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <div class="section-title">📅 Dostupnosť a balíček</div>
            <div class="field">
              <span class="label">Dostupné dni:</span>
              <span class="value"><strong>${formattedDays}</strong></span>
            </div>
            <div class="field">
              <span class="label">Preferovaný dátum začiatku:</span>
              <span class="value">${new Date(availability.preferredStartDate).toLocaleDateString('sk-SK')}</span>
            </div>
            <div class="field">
              <span class="label">Vybraný balíček:</span>
              <span class="value"><strong>${budgetRangeLabels[availability.budgetRange]}</strong></span>
            </div>
            ${availability.additionalNotes ? `
            <div class="field">
              <span class="label">Dodatočné poznámky:</span>
              <div class="value" style="margin-top: 8px; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
                ${availability.additionalNotes}
              </div>
            </div>
            ` : ''}
          </div>

          <div class="footer">
            <p>Odoslané z webu dominikprelovsky.sk</p>
            <p>Generované ${new Date().toLocaleString('sk-SK')}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = completeFormSchema.parse(body);

    // Format email content
    const emailHtml = formatFormDataToHtml(validatedData);

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Online Koučing <onboarding@resend.dev>',
      to: process.env.COACH_EMAIL || 'info@dominikprelovsky.sk',
      subject: `Nová žiadosť o online koučing - ${validatedData.personalInfo.fullName}`,
      html: emailHtml,
      replyTo: validatedData.personalInfo.email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Nepodarilo sa odoslať email' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error: any) {
    // Validation error
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Neplatné dáta formulára', details: error.errors },
        { status: 400 }
      );
    }

    // Generic error
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Interná chyba servera' },
      { status: 500 }
    );
  }
}
