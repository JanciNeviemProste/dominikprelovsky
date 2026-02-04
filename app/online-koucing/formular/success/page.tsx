import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Ďakujeme | Dominik Prelovský',
  description: 'Tvoja žiadosť o online koučing bola úspešne odoslaná.',
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-20 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center py-12">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-[#f73131] rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: '#ffffff' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="font-heading text-5xl md:text-6xl mb-6" style={{ color: '#000000' }}>
          ĎAKUJEME!
        </h1>

        <div className="space-y-4 mb-10">
          <p className="font-body text-xl md:text-2xl text-gray-700 leading-relaxed">
            Tvoja žiadosť o online koučing bola <strong>úspešne odoslaná</strong>.
          </p>

          <p className="font-body text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            Ozvem sa ti do <strong className="text-[#f73131]">24 hodín</strong> na uvedený email.
            Priprav sa na začiatok svojej fitness transformácie!
          </p>
        </div>

        {/* What's Next Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10 max-w-lg mx-auto">
          <h2 className="font-heading text-2xl mb-4" style={{ color: '#000000' }}>
            ČO ĎALEJ?
          </h2>
          <ul className="text-left font-body text-gray-700 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#f73131] font-bold">1.</span>
              <span>Skontroluj si email (aj spam priečinok)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#f73131] font-bold">2.</span>
              <span>Priprav si akékoľvek ďalšie otázky</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#f73131] font-bold">3.</span>
              <span>Čakaj na moju odpoveď s ďalšími krokmi</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="filled" size="lg">
              Späť na homepage
            </Button>
          </Link>
          <Link href="/transformacie">
            <Button variant="outline" size="lg">
              Pozri transformácie
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
