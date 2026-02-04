import React from 'react';

interface FormProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const FormProgressIndicator: React.FC<FormProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Heading */}
      <h2 className="font-heading text-3xl md:text-4xl text-center mb-8" style={{ color: '#000000' }}>
        KROK {currentStep} Z {totalSteps}
      </h2>

      {/* Progress Bar - Desktop */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <React.Fragment key={stepNumber}>
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      font-heading text-lg
                      transition-all duration-300
                      ${isCompleted ? 'bg-[#f73131] text-white' : ''}
                      ${isCurrent ? 'bg-[#f73131] text-white scale-110' : ''}
                      ${isUpcoming ? 'bg-white border-2 border-gray-300 text-gray-400' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span
                    className={`
                      font-body text-xs mt-2 text-center max-w-[80px]
                      ${isCurrent ? 'text-[#f73131] font-semibold' : 'text-gray-600'}
                    `}
                  >
                    {label}
                  </span>
                </div>

                {/* Connecting Line */}
                {stepNumber < totalSteps && (
                  <div
                    className={`
                      flex-1 h-1 mx-2
                      transition-all duration-300
                      ${stepNumber < currentStep ? 'bg-[#f73131]' : 'bg-gray-300'}
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Progress Bar - Mobile */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between max-w-md mx-auto px-4">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <React.Fragment key={stepNumber}>
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-heading text-base
                    transition-all duration-300
                    ${isCompleted ? 'bg-[#f73131] text-white' : ''}
                    ${isCurrent ? 'bg-[#f73131] text-white scale-110' : ''}
                    ${isUpcoming ? 'bg-white border-2 border-gray-300 text-gray-400' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>

                {/* Connecting Line */}
                {stepNumber < totalSteps && (
                  <div
                    className={`
                      flex-1 h-1 mx-1
                      transition-all duration-300
                      ${stepNumber < currentStep ? 'bg-[#f73131]' : 'bg-gray-300'}
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
