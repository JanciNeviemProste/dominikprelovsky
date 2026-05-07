'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Testimonial } from '@/lib/content/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (testimonials.length === 0) return null;

  return (
    <section id="recenzie" className="py-20 bg-white">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="font-heading text-5xl md:text-6xl text-black mb-4"
            style={{ textTransform: 'none' }}
          >
            Čo hovoria klienti
          </h2>
          <p className="font-body text-lg text-[var(--color-text-tertiary)] max-w-3xl mx-auto">
            Osobná skúsenosť je viac ako reči.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div
                  key={t.order}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] pl-4"
                >
                  <div className="bg-[var(--color-light-gray)] p-8 md:p-10 h-full flex flex-col">
                    <div className="flex gap-1 mb-6" aria-label={`Hodnotenie ${t.rating} z 5`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-[var(--color-primary)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="font-body text-lg text-[var(--color-text-primary)] mb-6 leading-relaxed italic flex-1">
                      “{t.text}”
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-heading text-xl">
                        {t.clientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-heading text-lg text-black">{t.clientName}</div>
                        {t.role && (
                          <div className="font-body text-sm text-[var(--color-text-tertiary)]">
                            {t.role}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors"
            aria-label="Predchádzajúca recenzia"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors"
            aria-label="Ďalšia recenzia"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-3 transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-[var(--color-primary)] w-8'
                  : 'bg-gray-300 hover:bg-gray-400 w-3'
              }`}
              aria-label={`Prejsť na recenziu ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
