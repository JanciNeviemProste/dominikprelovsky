import React from 'react';
import type { HowIWorkStep } from '@/lib/content/types';

interface AkoPracujemSectionProps {
  steps: HowIWorkStep[];
}

export const AkoPracujemSection: React.FC<AkoPracujemSectionProps> = ({ steps }) => {
  return (
    <section className="py-20 bg-[var(--color-light-gray)]">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-heading text-5xl md:text-6xl text-black mb-6"
            style={{ textTransform: 'none' }}
          >
            Ako pracujem
          </h2>
          <p className="font-body text-lg text-[var(--color-text-tertiary)] max-w-3xl mx-auto leading-relaxed">
            Vedecký prístup, vlastná prax v silových športoch a osobná zodpovednosť za výsledok.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step) => (
            <article
              key={step.number}
              className="bg-white p-8 md:p-10 border-t-4 border-[var(--color-primary)] flex flex-col"
            >
              <div className="font-heading text-6xl text-[var(--color-primary)] mb-4 leading-none">
                {String(step.number).padStart(2, '0')}
              </div>
              <h3
                className="font-heading text-xl text-black mb-4"
                style={{ letterSpacing: '1px' }}
              >
                {step.title}
              </h3>
              <p className="font-body text-base text-[var(--color-text-tertiary)] leading-relaxed">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
