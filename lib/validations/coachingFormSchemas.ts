import { z } from 'zod';

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  fullName: z.string()
    .min(2, 'Meno musí mať aspoň 2 znaky')
    .max(100, 'Meno je príliš dlhé'),

  email: z.string()
    .email('Neplatná emailová adresa')
    .toLowerCase(),

  phone: z.string()
    .regex(/^(\+421|00421)?[0-9]{9,10}$/, 'Neplatné telefónne číslo'),

  age: z.number()
    .int('Vek musí byť celé číslo')
    .min(16, 'Musíš mať aspoň 16 rokov')
    .max(100, 'Neplatný vek'),

  gender: z.enum(['male', 'female', 'other']),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;

// Step 2: Fitness Goals Schema
export const fitnessGoalsSchema = z.object({
  primaryGoal: z.enum([
    'weight_loss',
    'muscle_gain',
    'general_fitness',
    'competition_prep'
  ]),

  targetWeight: z.number()
    .min(30, 'Neplatná cieľová váha')
    .max(200, 'Neplatná cieľová váha')
    .optional()
    .nullable(),

  targetDate: z.string()
    .optional()
    .nullable(),

  motivation: z.string()
    .min(20, 'Popíš svoju motiváciu aspoň v 20 znakoch')
    .max(1000, 'Text je príliš dlhý'),
});

export type FitnessGoalsData = z.infer<typeof fitnessGoalsSchema>;

// Step 3: Workout Experience Schema
export const workoutExperienceSchema = z.object({
  experienceLevel: z.enum([
    'beginner',
    'intermediate',
    'advanced'
  ]),

  currentFrequency: z.enum([
    '0',
    '1-2',
    '3-4',
    '5+'
  ]),

  preferredLocation: z.enum([
    'home',
    'gym',
    'both'
  ]),

  injuriesLimitations: z.string()
    .max(500, 'Text je príliš dlhý')
    .optional()
    .nullable(),
});

export type WorkoutExperienceData = z.infer<typeof workoutExperienceSchema>;

// Step 4: Dietary Information Schema
export const dietaryInfoSchema = z.object({
  currentDietApproach: z.enum([
    'none',
    'flexible',
    'keto',
    'vegan',
    'vegetarian',
    'paleo',
    'other'
  ]),

  dietaryRestrictions: z.string()
    .max(500, 'Text je príliš dlhý')
    .optional()
    .nullable(),

  mealPrepPreference: z.enum([
    'cook_at_home',
    'meal_prep',
    'eating_out',
    'mix'
  ]),

  currentDailyCalories: z.number()
    .min(800, 'Neplatný kalorický príjem')
    .max(6000, 'Neplatný kalorický príjem')
    .optional()
    .nullable(),
});

export type DietaryInfoData = z.infer<typeof dietaryInfoSchema>;

// Step 5: Availability & Commitment Schema
export const availabilitySchema = z.object({
  availableDays: z.array(z.enum([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ]))
    .min(1, 'Vyber aspoň jeden deň')
    .max(7, 'Maximum 7 dní'),

  preferredStartDate: z.string()
    .min(1, 'Vyber dátum začiatku'),

  budgetRange: z.enum([
    'basic',      // 50-100€/mesiac
    'standard',   // 100-150€/mesiac
    'premium',    // 150-200€/mesiac
    'vip'         // 200€+/mesiac
  ]),

  additionalNotes: z.string()
    .max(1000, 'Text je príliš dlhý')
    .optional()
    .nullable(),
});

export type AvailabilityData = z.infer<typeof availabilitySchema>;

// Complete Form Schema
export const completeFormSchema = z.object({
  personalInfo: personalInfoSchema,
  fitnessGoals: fitnessGoalsSchema,
  workoutExperience: workoutExperienceSchema,
  dietaryInfo: dietaryInfoSchema,
  availability: availabilitySchema,
});

export type CompleteFormData = z.infer<typeof completeFormSchema>;

// Human-readable labels for enum values
export const genderLabels: Record<PersonalInfoData['gender'], string> = {
  male: 'Muž',
  female: 'Žena',
  other: 'Iné',
};

export const primaryGoalLabels: Record<FitnessGoalsData['primaryGoal'], string> = {
  weight_loss: 'Chudnutie',
  muscle_gain: 'Budovanie svalov',
  general_fitness: 'Všeobecná kondícia',
  competition_prep: 'Príprava na súťaž',
};

export const experienceLevelLabels: Record<WorkoutExperienceData['experienceLevel'], string> = {
  beginner: 'Začiatočník',
  intermediate: 'Mierne pokročilý',
  advanced: 'Pokročilý',
};

export const currentFrequencyLabels: Record<WorkoutExperienceData['currentFrequency'], string> = {
  '0': 'Momentálne netrénujem',
  '1-2': '1-2 krát týždenne',
  '3-4': '3-4 krát týždenne',
  '5+': '5+ krát týždenne',
};

export const preferredLocationLabels: Record<WorkoutExperienceData['preferredLocation'], string> = {
  home: 'Doma',
  gym: 'V posilňovni',
  both: 'Oboje',
};

export const dietApproachLabels: Record<DietaryInfoData['currentDietApproach'], string> = {
  none: 'Žiadny špecifický prístup',
  flexible: 'Flexible dieting',
  keto: 'Ketogénna diéta',
  vegan: 'Vegánska strava',
  vegetarian: 'Vegetariánska strava',
  paleo: 'Paleo diéta',
  other: 'Iné',
};

export const mealPrepLabels: Record<DietaryInfoData['mealPrepPreference'], string> = {
  cook_at_home: 'Varím doma',
  meal_prep: 'Meal prep (vopred pripravujem)',
  eating_out: 'Jem vonku',
  mix: 'Kombinácia',
};

export const budgetRangeLabels: Record<AvailabilityData['budgetRange'], string> = {
  basic: 'Basic (50-100€/mesiac)',
  standard: 'Standard (100-150€/mesiac)',
  premium: 'Premium (150-200€/mesiac)',
  vip: 'VIP (200€+/mesiac)',
};

export const dayLabels = {
  monday: 'Pondelok',
  tuesday: 'Utorok',
  wednesday: 'Streda',
  thursday: 'Štvrtok',
  friday: 'Piatok',
  saturday: 'Sobota',
  sunday: 'Nedeľa',
};
