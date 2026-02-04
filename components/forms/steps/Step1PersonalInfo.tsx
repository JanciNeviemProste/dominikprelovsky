import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select } from '@/components/ui';
import { FormNavigation } from '../FormNavigation';
import { personalInfoSchema, PersonalInfoData, genderLabels } from '@/lib/validations/coachingFormSchemas';

interface Step1PersonalInfoProps {
  initialValues: Partial<PersonalInfoData>;
  onNext: (data: PersonalInfoData) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({
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
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: PersonalInfoData) => {
    onNext(data);
  };

  const genderOptions = [
    { value: 'male', label: genderLabels.male },
    { value: 'female', label: genderLabels.female },
    { value: 'other', label: genderLabels.other },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="font-heading text-3xl text-black mb-6" style={{ color: '#000000' }}>
          OSOBNÉ ÚDAJE
        </h3>
        <p className="font-body text-gray-600 mb-8">
          Zadaj svoje základné informácie, aby sme ťa mohli lepšie spoznať.
        </p>
      </div>

      {/* Full Name */}
      <Input
        label="Celé meno *"
        placeholder="Napr. Ján Novák"
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      {/* Email and Phone - 2 column grid on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email *"
          type="email"
          placeholder="jan.novak@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Telefón *"
          type="tel"
          placeholder="+421 123 456 789"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {/* Age and Gender - 2 column grid on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Vek *"
          type="number"
          placeholder="25"
          min="16"
          max="100"
          error={errors.age?.message}
          {...register('age', { valueAsNumber: true })}
        />

        <Select
          label="Pohlavie *"
          placeholder="Vyber pohlavie"
          options={genderOptions}
          error={errors.gender?.message}
          {...register('gender')}
        />
      </div>

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
