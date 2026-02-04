import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Textarea } from '@/components/ui';
import { FormNavigation } from '../FormNavigation';
import { fitnessGoalsSchema, FitnessGoalsData, primaryGoalLabels } from '@/lib/validations/coachingFormSchemas';

interface Step2FitnessGoalsProps {
  initialValues: Partial<FitnessGoalsData>;
  onNext: (data: FitnessGoalsData) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const Step2FitnessGoals: React.FC<Step2FitnessGoalsProps> = ({
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
  } = useForm<FitnessGoalsData>({
    resolver: zodResolver(fitnessGoalsSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: FitnessGoalsData) => {
    onNext(data);
  };

  const goalOptions = [
    { value: 'weight_loss', label: primaryGoalLabels.weight_loss },
    { value: 'muscle_gain', label: primaryGoalLabels.muscle_gain },
    { value: 'general_fitness', label: primaryGoalLabels.general_fitness },
    { value: 'competition_prep', label: primaryGoalLabels.competition_prep },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="font-heading text-3xl text-black mb-6" style={{ color: '#000000' }}>
          FITNESS CIELE
        </h3>
        <p className="font-body text-gray-600 mb-8">
          Povedz nám, čo chceš dosiahnuť a prečo chceš začať s koučingom.
        </p>
      </div>

      {/* Primary Goal */}
      <Select
        label="Hlavný cieľ *"
        placeholder="Vyber svoj hlavný cieľ"
        options={goalOptions}
        error={errors.primaryGoal?.message}
        {...register('primaryGoal')}
      />

      {/* Target Weight and Date - 2 column grid on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Cieľová váha (kg)"
          type="number"
          placeholder="70"
          min="30"
          max="200"
          error={errors.targetWeight?.message}
          {...register('targetWeight', { valueAsNumber: true })}
        />

        <Input
          label="Cieľový dátum"
          type="date"
          error={errors.targetDate?.message}
          {...register('targetDate')}
        />
      </div>

      {/* Motivation */}
      <Textarea
        label="Motivácia *"
        placeholder="Popíš, čo ťa motivuje začať s online koučingom a aké sú tvoje očakávania..."
        rows={5}
        error={errors.motivation?.message}
        {...register('motivation')}
      />

      <p className="text-sm text-gray-500 font-body">
        * Minimálne 20 znakov
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
