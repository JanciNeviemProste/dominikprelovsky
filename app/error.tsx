'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-[var(--color-light-gray)]">
      <div className="text-center px-4">
        <h1
          className="font-heading text-5xl md:text-6xl text-black mb-4"
          style={{ textTransform: 'none' }}
        >
          Niečo sa pokazilo
        </h1>
        <p className="font-body text-[var(--color-text-tertiary)] mb-8 max-w-md mx-auto">
          Mrzí ma to. Skús stránku načítať znova alebo sa vráť na úvod.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="filled" size="lg" onClick={() => reset()}>
            Skús znova
          </Button>
          <a href="/">
            <Button variant="outline" size="lg">
              Späť na úvod
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
