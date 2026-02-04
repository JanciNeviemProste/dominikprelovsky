import { Metadata } from 'next';
import { OnlineCoachingForm } from '@/components/forms/OnlineCoachingForm';

export const metadata: Metadata = {
  title: 'Online Koučing - Formulár | Dominik Prelovský',
  description: 'Vyplň formulár a začni svoju fitness transformáciu s profesionálnym online koučingom od Dominika Prelovského.',
};

export default function FormularPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl text-center mb-6" style={{ color: '#000000' }}>
            ONLINE KOUČING
          </h1>
          <p className="font-body text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Vyplň dotazník a začneme tvoju cestu k lepšej verzii seba. Proces trvá približne 5-10 minút.
          </p>
        </div>

        {/* Form */}
        <OnlineCoachingForm />
      </div>
    </div>
  );
}
