import React from 'react';
import { HeroSection, AboutSection, CTASection } from '@/components/sections';

export default function Home() {
  return (
    <>
      <HeroSection />

      <AboutSection />

      <CTASection
        title="PRIPRAVENÝ NA ZMENU?"
        description="Nečakaj na perfektný moment. Začni dnes a dosiahni telo, o akom si vždy sníval. Profesionálny online koučing prispôsobený tvojim cieľom."
        buttonText="Začni online koučing"
        buttonHref="/online-koucing/formular"
        variant="red"
      />

      {/* Placeholder for Testimonials - will be added later */}
      <section className="py-20 bg-white">
        <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl text-[var(--color-black)] mb-4">
            TRANSFORMÁCIE KLIENTOV
          </h2>
          <p className="font-body text-lg text-[var(--color-dark-gray)] mb-8">
            (Carousel bude pridaný v ďalšom kroku)
          </p>
        </div>
      </section>

      <CTASection
        title="SLEDUJ MÔJ INSTAGRAM"
        description="Každý deň zdieľam fitness tipy, tréningové postupy a motiváciu. Pripoj sa k mojej komunite!"
        buttonText="Sleduj ma"
        buttonHref="https://www.instagram.com/fitcoach_dominprelovsky/"
        variant="dark"
      />
    </>
  );
}
