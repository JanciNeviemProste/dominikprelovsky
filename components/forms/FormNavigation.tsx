import React from 'react';
import { Button } from '../ui';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  isSubmitting: boolean;
  isLastStep: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onBack,
  isSubmitting,
  isLastStep,
}) => {
  const showBackButton = currentStep > 1;

  return (
    <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t-2 border-gray-200">
      {/* Back Button */}
      <div>
        {showBackButton && (
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onBack}
            disabled={isSubmitting}
          >
            ← Späť
          </Button>
        )}
      </div>

      {/* Next/Submit Button */}
      <div className="ml-auto">
        {isLastStep ? (
          <Button
            type="submit"
            variant="filled"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Odosielam...
              </span>
            ) : (
              'Odoslať žiadosť'
            )}
          </Button>
        ) : (
          <Button
            type="submit"
            variant="filled"
            size="md"
            disabled={isSubmitting}
          >
            Ďalej →
          </Button>
        )}
      </div>
    </div>
  );
};
