'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../ui';
import { FormProgressIndicator } from './FormProgressIndicator';
import {
  Step1PersonalInfo,
  Step2FitnessGoals,
  Step3WorkoutExperience,
  Step4DietaryInfo,
  Step5Availability,
} from './steps';
import {
  CompleteFormData,
  PersonalInfoData,
  FitnessGoalsData,
  WorkoutExperienceData,
  DietaryInfoData,
  AvailabilityData,
  completeFormSchema,
} from '@/lib/validations/coachingFormSchemas';

export const OnlineCoachingForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CompleteFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalSteps = 5;
  const stepLabels = [
    'Osobné údaje',
    'Ciele',
    'Tréning',
    'Stravovanie',
    'Dostupnosť',
  ];

  const handleStep1Next = (data: PersonalInfoData) => {
    setFormData((prev) => ({ ...prev, personalInfo: data }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Next = (data: FitnessGoalsData) => {
    setFormData((prev) => ({ ...prev, fitnessGoals: data }));
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep3Next = (data: WorkoutExperienceData) => {
    setFormData((prev) => ({ ...prev, workoutExperience: data }));
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep4Next = (data: DietaryInfoData) => {
    setFormData((prev) => ({ ...prev, dietaryInfo: data }));
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep5Submit = async (data: AvailabilityData) => {
    const completeData: CompleteFormData = {
      personalInfo: formData.personalInfo!,
      fitnessGoals: formData.fitnessGoals!,
      workoutExperience: formData.workoutExperience!,
      dietaryInfo: formData.dietaryInfo!,
      availability: data,
    };

    // Validate complete form
    try {
      const validated = completeFormSchema.parse(completeData);
      setIsSubmitting(true);
      setSubmitError(null);

      // Submit to API
      const response = await fetch('/api/online-coaching-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      // Success - redirect to success page
      router.push('/online-koucing/formular/success');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        'Nepodarilo sa odoslať formulár. Skontroluj internetové pripojenie a skús to prosím znova.'
      );
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <FormProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={stepLabels}
      />

      {/* Error Banner */}
      {submitError && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-red-700 font-body font-semibold">
                {submitError}
              </p>
            </div>
            <button
              onClick={() => setSubmitError(null)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Form Card */}
      <Card className="p-6 md:p-10 lg:p-12 shadow-xl">
        {currentStep === 1 && (
          <Step1PersonalInfo
            initialValues={formData.personalInfo || {}}
            onNext={handleStep1Next}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 2 && (
          <Step2FitnessGoals
            initialValues={formData.fitnessGoals || {}}
            onNext={handleStep2Next}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 3 && (
          <Step3WorkoutExperience
            initialValues={formData.workoutExperience || {}}
            onNext={handleStep3Next}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 4 && (
          <Step4DietaryInfo
            initialValues={formData.dietaryInfo || {}}
            onNext={handleStep4Next}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === 5 && (
          <Step5Availability
            initialValues={formData.availability || {}}
            onNext={handleStep5Submit}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
            isSubmitting={isSubmitting}
          />
        )}
      </Card>
    </div>
  );
};
