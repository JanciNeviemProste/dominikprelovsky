import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            className={`
              w-5 h-5
              border-2 border-[var(--color-light-gray)]
              text-[var(--color-primary)]
              focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
              transition-colors duration-200
              cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <span className="font-body text-base text-black group-hover:text-[var(--color-primary)] transition-colors duration-200">
            {label}
          </span>
        </label>
        {error && (
          <span className="text-sm text-red-500 font-body ml-8">{error}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
