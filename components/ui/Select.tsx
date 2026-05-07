import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="font-body font-semibold text-sm text-black">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            px-4 py-3
            font-body text-base
            border-2 border-[var(--color-light-gray)]
            focus:outline-none focus:border-[var(--color-primary)]
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            bg-white
            cursor-pointer
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-sm text-red-500 font-body">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
