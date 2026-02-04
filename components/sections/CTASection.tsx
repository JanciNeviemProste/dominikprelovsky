import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'red' | 'dark';
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
  variant = 'red',
}) => {
  const bgColor = variant === 'red' ? 'bg-[#f73131]' : 'bg-[#161616]';

  return (
    <section className={`py-20 ${bgColor}`}>
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-5xl text-white mb-6" style={{ color: '#ffffff' }}>
          {title}
        </h2>
        <p className="font-body text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#ffffff' }}>
          {description}
        </p>
        <Link href={buttonHref}>
          <Button variant="outline" size="lg">
            {buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
};
