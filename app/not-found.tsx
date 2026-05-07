import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-[var(--color-light-gray)]">
      <div className="text-center px-4">
        <h1
          className="font-heading text-7xl md:text-9xl text-[var(--color-primary)] mb-4"
          style={{ textTransform: 'none' }}
        >
          404
        </h1>
        <h2
          className="font-heading text-3xl md:text-4xl text-black mb-4"
          style={{ textTransform: 'none' }}
        >
          Stránka neexistuje
        </h2>
        <p className="font-body text-[var(--color-text-tertiary)] mb-8 max-w-md mx-auto">
          Túto stránku sme nenašli. Možno bola presunutá alebo si zadal nesprávnu adresu.
        </p>
        <Link href="/">
          <Button variant="filled" size="lg">
            Späť na úvod
          </Button>
        </Link>
      </div>
    </section>
  );
}
