import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Textarea, Checkbox } from '@/components/ui';
import { FormNavigation } from '../FormNavigation';
import {
  availabilitySchema,
  AvailabilityData,
  budgetRangeLabels,
  dayLabels,
} from '@/lib/validations/coachingFormSchemas';

interface Step5AvailabilityProps {
  initialValues: Partial<AvailabilityData>;
  onNext: (data: AvailabilityData) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
}

export const Step5Availability: React.FC<Step5AvailabilityProps> = ({
  initialValues,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AvailabilityData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: AvailabilityData) => {
    onNext(data);
  };

  const budgetOptions = [
    { value: 'basic', label: budgetRangeLabels.basic },
    { value: 'standard', label: budgetRangeLabels.standard },
    { value: 'premium', label: budgetRangeLabels.premium },
    { value: 'vip', label: budgetRangeLabels.vip },
  ];

  const days = [
    { value: 'monday', label: dayLabels.monday },
    { value: 'tuesday', label: dayLabels.tuesday },
    { value: 'wednesday', label: dayLabels.wednesday },
    { value: 'thursday', label: dayLabels.thursday },
    { value: 'friday', label: dayLabels.friday },
    { value: 'saturday', label: dayLabels.saturday },
    { value: 'sunday', label: dayLabels.sunday },
  ];

  const selectedDays = watch('availableDays', []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="font-heading text-3xl text-black mb-6" style={{ color: '#000000' }}>
          DOSTUPNOSŤ A BALÍČEK
        </h3>
        <p className="font-body text-gray-600 mb-8">
          Povedz nám, kedy si dostupný/á a vyber si balíček, ktorý ti vyhovuje.
        </p>
      </div>

      {/* Available Days */}
      <div className="space-y-3">
        <label className="font-body font-semibold text-sm text-black">
          Dostupné dni na tréning *
        </label>
        <p className="text-sm text-gray-500 font-body mb-3">
          Vyber dni, kedy môžeš trénovať (aspoň 1 deň)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {days.map((day) => (
            <Controller
              key={day.value}
              name="availableDays"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label={day.label}
                  checked={field.value?.includes(day.value as any)}
                  onChange={(e) => {
                    const currentDays = field.value || [];
                    if (e.target.checked) {
                      field.onChange([...currentDays, day.value]);
                    } else {
                      field.onChange(currentDays.filter((d) => d !== day.value));
                    }
                  }}
                />
              )}
            />
          ))}
        </div>

        {errors.availableDays && (
          <span className="text-sm text-red-500 font-body">
            {errors.availableDays.message}
          </span>
        )}
      </div>

      {/* Preferred Start Date */}
      <Input
        label="Preferovaný dátum začiatku *"
        type="date"
        error={errors.preferredStartDate?.message}
        {...register('preferredStartDate')}
      />

      {/* Budget Range */}
      <Select
        label="Cenový balíček *"
        placeholder="Vyber balíček"
        options={budgetOptions}
        error={errors.budgetRange?.message}
        {...register('budgetRange')}
      />

      {/* Additional Notes */}
      <Textarea
        label="Dodatočné poznámky"
        placeholder="Je niečo ďalšie, o čom by som mal vedieť? Akékoľvek otázky alebo špeciálne požiadavky..."
        rows={4}
        error={errors.additionalNotes?.message}
        {...register('additionalNotes')}
      />

      {/* Navigation */}
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={onBack}
        isSubmitting={isSubmitting}
        isLastStep={true}
      />
    </form>
  );
};
