import React from 'react';
import {
  HeroSection,
  AboutSection,
  PricingSection,
  TrainerProfileSection,
  TransformationsSection,
  TestimonialsCarousel,
  ProductsSection,
  SocialLinksSection,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Novinky / Products Section */}
      <ProductsSection />

      {/* 3. Filozofia / About Section */}
      <AboutSection />

      {/* 4. Trainer Profile Section */}
      <TrainerProfileSection />

      {/* 5. Pricing Section */}
      <PricingSection />

      {/* 6. Transformations Section */}
      <TransformationsSection />

      {/* 7. Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* 8. Social Links Section */}
      <SocialLinksSection />
    </>
  );
}
