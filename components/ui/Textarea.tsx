import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="font-body font-semibold text-sm text-[var(--color-black)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            px-4 py-3
            font-body text-base
            border-2 border-[var(--color-light-gray)]
            focus:outline-none focus:border-[var(--color-primary)]
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            min-h-[120px]
            resize-vertical
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

Textarea.displayName = 'Textarea';
