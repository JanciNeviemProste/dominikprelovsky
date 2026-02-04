import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Textarea } from '@/components/ui';
import { FormNavigation } from '../FormNavigation';
import {
  dietaryInfoSchema,
  DietaryInfoData,
  dietApproachLabels,
  mealPrepLabels,
} from '@/lib/validations/coachingFormSchemas';

interface Step4DietaryInfoProps {
  initialValues: Partial<DietaryInfoData>;
  onNext: (data: DietaryInfoData) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const Step4DietaryInfo: React.FC<Step4DietaryInfoProps> = ({
  initialValues,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DietaryInfoData>({
    resolver: zodResolver(dietaryInfoSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: DietaryInfoData) => {
    onNext(data);
  };

  const dietApproachOptions = [
    { value: 'none', label: dietApproachLabels.none },
    { value: 'flexible', label: dietApproachLabels.flexible },
    { value: 'keto', label: dietApproachLabels.keto },
    { value: 'vegan', label: dietApproachLabels.vegan },
    { value: 'vegetarian', label: dietApproachLabels.vegetarian },
    { value: 'paleo', label: dietApproachLabels.paleo },
    { value: 'other', label: dietApproachLabels.other },
  ];

  const mealPrepOptions = [
    { value: 'cook_at_home', label: mealPrepLabels.cook_at_home },
    { value: 'meal_prep', label: mealPrepLabels.meal_prep },
    { value: 'eating_out', label: mealPrepLabels.eating_out },
    { value: 'mix', label: mealPrepLabels.mix },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="font-heading text-3xl text-black mb-6" style={{ color: '#000000' }}>
          STRAVOVANIE
        </h3>
        <p className="font-body text-gray-600 mb-8">
          Informácie o tvojom súčasnom stravovacom režime a preferenciách.
        </p>
      </div>

      {/* Current Diet Approach */}
      <Select
        label="Súčasný stravovací prístup *"
        placeholder="Vyber prístup"
        options={dietApproachOptions}
        error={errors.currentDietApproach?.message}
        {...register('currentDietApproach')}
      />

      {/* Dietary Restrictions */}
      <Textarea
        label="Dietetické obmedzenia alebo alergie"
        placeholder="Popíš akékoľvek potravinové alergie, intolerancie alebo dietetické preferencie..."
        rows={4}
        error={errors.dietaryRestrictions?.message}
        {...register('dietaryRestrictions')}
      />

      {/* Meal Prep Preference */}
      <Select
        label="Ako preferuješ prípravu jedál? *"
        placeholder="Vyber spôsob"
        options={mealPrepOptions}
        error={errors.mealPrepPreference?.message}
        {...register('mealPrepPreference')}
      />

      {/* Current Daily Calories */}
      <Input
        label="Súčasný denný kalorický príjem (kcal)"
        type="number"
        placeholder="2000"
        min="800"
        max="6000"
        error={errors.currentDailyCalories?.message}
        {...register('currentDailyCalories', { valueAsNumber: true })}
      />

      <p className="text-sm text-gray-500 font-body">
        Ak nevieš presný kalorický príjem, nechaj prázdne.
      </p>

      {/* Navigation */}
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={onBack}
        isSubmitting={false}
        isLastStep={false}
      />
    </form>
  );
};
