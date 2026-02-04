'use client';

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image?: string;
  rating: number;
}

export const TestimonialsCarousel: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Marek Novák',
      role: 'Klient - Transformácia tela',
      content:
        'S Dominikom som schudol 15kg za 4 mesiace a cítim sa fantasticky. Jeho prístup je profesionálny, motivujúci a hlavne funguje. Odporúčam každému!',
      rating: 5,
    },
    {
      name: 'Lucia Kováčová',
      role: 'Klientka - Bodybuilding',
      content:
        'Dominik mi pomohol nabrať 8kg svalovej hmoty a pripraviť sa na moju prvú fitness súťaž. Jeho vedomosti a skúsenosti sú neoceniteľné.',
      rating: 5,
    },
    {
      name: 'Peter Horváth',
      role: 'Klient - Kondícia',
      content:
        'Ako zaneprázdnený otec som potreboval efektívny tréningový plán. Dominik vytvoril program presne na mieru môjmu životnému štýlu a výsledky prišli rýchlo.',
      rating: 5,
    },
    {
      name: 'Jana Szabová',
      role: 'Klientka - Výživa',
      content:
        'Konečne som sa naučila jesť správne bez drastických diét. Dominikove jedálne plány sú realistické a chutné. Schudla som 12kg a udržiavam si váhu už rok.',
      rating: 5,
    },
    {
      name: 'Martin Kováč',
      role: 'Klient - Svalový rast',
      content:
        'Ako ektomorf som celý život bojoval s pribúdaním hmotnosti. Dominik mi ukázal, ako jesť a trénovať správne. Za 6 mesiacov som nabral 9kg čistých svalov.',
      rating: 5,
    },
    {
      name: 'Zuzana Nová',
      role: 'Klientka - Príprava na súťaž',
      content:
        'Dominik ma pripravil na moju prvú bikini fitness súťaž. Jeho prístup je profesionálny, motivujúci a hlavne funguje. Skončila som na 3. mieste!',
      rating: 5,
    },
    {
      name: 'Jakub Ferko',
      role: 'Klient - Recompositon',
      content:
        'Potreboval som schudnúť a zároveň budovať svaly. Dominik mi vytvoril plán ktorý fungoval dokonale. -12kg tuku, +5kg svalov za 5 mesiacov.',
      rating: 5,
    },
    {
      name: 'Michaela Tóthová',
      role: 'Klientka - Online koučing',
      content:
        'Online koučing s Dominikom je najlepšia investícia do seba. Pravidelné check-iny, úpravy plánu a motivácia. Schudla som 18kg a držím si váhu už rok.',
      rating: 5,
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-black mb-6" style={{ color: '#000000' }}>
            Čo hovoria klienti
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Skutočný feedback od skutočných ľudí.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] pl-4"
                >
                  <div className="bg-[#eeeeee] p-8 md:p-10 h-full">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-[var(--color-primary)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="font-body text-lg text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white font-heading text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-heading text-lg text-black">
                          {testimonial.name}
                        </div>
                        <div className="font-body text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors duration-300"
            aria-label="Previous testimonial"
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
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors duration-300"
            aria-label="Next testimonial"
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
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-3 h-3 transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-[var(--color-primary)] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
