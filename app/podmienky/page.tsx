import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/getContent';

export const metadata: Metadata = {
  title: 'Všeobecné podmienky a ochrana súkromia',
  description:
    'Všeobecné obchodné podmienky a zásady ochrany osobných údajov pre služby Dominika Prelovského.',
  robots: { index: false, follow: true },
};

export default async function PodmienkyPage() {
  const { contact } = await getSiteSettings();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-neutral">
      <h1 className="font-heading text-4xl md:text-5xl text-black mb-8" style={{ textTransform: 'none' }}>
        Všeobecné podmienky a ochrana súkromia
      </h1>

      <p className="font-body text-base text-[var(--color-text-tertiary)] mb-6">
        Tieto podmienky upravujú vzťah medzi tebou (ďalej „klient“) a poskytovateľom služieb, ktorým
        je Dominik Prelovský — fitness coach, kontakt {contact.email}, {contact.phone}. Stránka je
        prevádzkovaná ako informačná a kontaktná, nejde o e-shop.
      </p>

      <h2 className="font-heading text-2xl text-black mt-10 mb-4">1. Predmet služieb</h2>
      <p className="font-body text-base text-[var(--color-text-primary)] mb-4 leading-relaxed">
        Poskytovateľ ponúka individuálne fitness služby — online koučing, stravovacie a tréningové
        plány, osobné konzultácie a osobné tréningy. Konkrétny obsah, dĺžka a cena sú špecifikované
        pri uzatvorení dohody medzi poskytovateľom a klientom.
      </p>

      <h2 className="font-heading text-2xl text-black mt-10 mb-4">2. Objednávka a úhrada</h2>
      <p className="font-body text-base text-[var(--color-text-primary)] mb-4 leading-relaxed">
        Záujem o spoluprácu klient prejavuje vyplnením kontaktného formulára alebo formulára pre
        online koučing. Po vstupnej konzultácii je klientovi zaslaná konkrétna ponuka a platobné
        inštrukcie. Vstup do služby sa realizuje až po pripísaní platby.
      </p>

      <h2 className="font-heading text-2xl text-black mt-10 mb-4">3. Storno a reklamácie</h2>
      <p className="font-body text-base text-[var(--color-text-primary)] mb-4 leading-relaxed">
        Konkrétne storno podmienky sú uvedené v dohode pre danú službu. Reklamácie a sťažnosti
        zasielaj na {contact.email}; vybavujeme ich v zákonných lehotách.
      </p>

      <h2 className="font-heading text-2xl text-black mt-10 mb-4">4. Ochrana osobných údajov</h2>
      <p className="font-body text-base text-[var(--color-text-primary)] mb-4 leading-relaxed">
        Údaje, ktoré nám poskytneš cez formuláre (meno, email, telefón, fitness ciele, zdravotný
        stav), spracovávame výhradne na účely poskytnutia služby a vzájomnej komunikácie. Údaje
        neposkytujeme tretím stranám okrem nevyhnutných sprostredkovateľov (e-mailová služba
        Resend, hosting). Údaje uchovávame po dobu trvania spolupráce a 3 roky po jej ukončení.
      </p>
      <p className="font-body text-base text-[var(--color-text-primary)] mb-4 leading-relaxed">
        Máš právo požiadať o výpis, opravu alebo vymazanie svojich osobných údajov písomne na{' '}
        {contact.email}.
      </p>

      <h2 className="font-heading text-2xl text-black mt-10 mb-4">5. Cookies a tretie strany</h2>
      <p className="font-body text-base text-[var(--color-text-primary)] mb-4 leading-relaxed">
        Stránka používa len technické cookies nevyhnutné pre svoju funkčnosť. Žiadne marketingové
        ani trackovacie cookies tretích strán nie sú aktívne. Embedy z YouTube a Google Maps môžu
        používať vlastné cookies podľa pravidiel ich poskytovateľov.
      </p>

      <h2 className="font-heading text-2xl text-black mt-10 mb-4">6. Záverečné ustanovenia</h2>
      <p className="font-body text-base text-[var(--color-text-primary)] mb-4 leading-relaxed">
        Vzťahy neupravené týmito podmienkami sa riadia právnym poriadkom Slovenskej republiky.
        Poskytovateľ si vyhradzuje právo tieto podmienky aktualizovať.
      </p>

      <p className="font-body text-sm text-[var(--color-text-tertiary)] mt-12 italic">
        Tento text je šablónou — odporúčame klientovi nechať ho odsúhlasiť právnikom pred ostrým
        nasadením.
      </p>
    </article>
  );
}
