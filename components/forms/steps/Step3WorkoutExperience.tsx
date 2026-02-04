import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, Textarea } from '@/components/ui';
import { FormNavigation } from '../FormNavigation';
import {
  workoutExperienceSchema,
  WorkoutExperienceData,
  experienceLevelLabels,
  currentFrequencyLabels,
  preferredLocationLabels,
} from '@/lib/validations/coachingFormSchemas';

interface Step3WorkoutExperienceProps {
  initialValues: Partial<WorkoutExperienceData>;
  onNext: (data: WorkoutExperienceData) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const Step3WorkoutExperience: React.FC<Step3WorkoutExperienceProps> = ({
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
  } = useForm<WorkoutExperienceData>({
    resolver: zodResolver(workoutExperienceSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: WorkoutExperienceData) => {
    onNext(data);
  };

  const experienceLevelOptions = [
    { value: 'beginner', label: experienceLevelLabels.beginner },
    { value: 'intermediate', label: experienceLevelLabels.intermediate },
    { value: 'advanced', label: experienceLevelLabels.advanced },
  ];

  const frequencyOptions = [
    { value: '0', label: currentFrequencyLabels['0'] },
    { value: '1-2', label: currentFrequencyLabels['1-2'] },
    { value: '3-4', label: currentFrequencyLabels['3-4'] },
    { value: '5+', label: currentFrequencyLabels['5+'] },
  ];

  const locationOptions = [
    { value: 'home', label: preferredLocationLabels.home },
    { value: 'gym', label: preferredLocationLabels.gym },
    { value: 'both', label: preferredLocationLabels.both },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="font-heading text-3xl text-black mb-6" style={{ color: '#000000' }}>
          TRÉNINGOVÉ SKÚSENOSTI
        </h3>
        <p className="font-body text-gray-600 mb-8">
          Povedz nám o svojej súčasnej tréningovej úrovni a preferenciách.
        </p>
      </div>

      {/* Experience Level */}
      <Select
        label="Úroveň skúseností *"
        placeholder="Vyber svoju úroveň"
        options={experienceLevelOptions}
        error={errors.experienceLevel?.message}
        {...register('experienceLevel')}
      />

      {/* Current Frequency */}
      <Select
        label="Ako často momentálne trénuješ? *"
        placeholder="Vyber frekvenciu"
        options={frequencyOptions}
        error={errors.currentFrequency?.message}
        {...register('currentFrequency')}
      />

      {/* Preferred Location */}
      <Select
        label="Kde preferuješ trénovať? *"
        placeholder="Vyber miesto"
        options={locationOptions}
        error={errors.preferredLocation?.message}
        {...register('preferredLocation')}
      />

      {/* Injuries/Limitations */}
      <Textarea
        label="Zranenia alebo obmedzenia"
        placeholder="Popíš akékoľvek zranenia, zdravotné problémy alebo fyzické obmedzenia, o ktorých by som mal vedieť..."
        rows={4}
        error={errors.injuriesLimitations?.message}
        {...register('injuriesLimitations')}
      />

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
