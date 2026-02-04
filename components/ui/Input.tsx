import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="font-body font-semibold text-sm text-[var(--color-black)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            px-4 py-3
            font-body text-base
            border-2 border-[var(--color-light-gray)]
            rounded-lg
            focus:outline-none focus:border-[var(--color-primary)]
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-500 font-body">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
