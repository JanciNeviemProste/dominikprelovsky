import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'outline',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'font-body font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black',
    filled: 'bg-[var(--color-primary)] border-2 border-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)]',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
