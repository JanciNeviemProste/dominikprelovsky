import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string;
  error?: string;
  options: RadioOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ label, error, options, name, value, onChange, disabled, layout = 'vertical', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="font-body font-semibold text-sm text-black">
            {label}
          </label>
        )}
        <div className={`flex ${layout === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'} gap-3`}>
          {options.map((option, index) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                ref={index === 0 ? ref : undefined}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                className={`
                  w-5 h-5
                  border-2 border-[var(--color-light-gray)]
                  text-[var(--color-primary)]
                  focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
                  transition-colors duration-200
                  cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${error ? 'border-red-500' : ''}
                `}
                {...props}
              />
              <span className="font-body text-base text-black group-hover:text-[var(--color-primary)] transition-colors duration-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        {error && (
          <span className="text-sm text-red-500 font-body">{error}</span>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
