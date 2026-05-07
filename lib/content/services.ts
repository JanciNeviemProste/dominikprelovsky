import type { Service } from './types';

export const services: Service[] = [
  {
    order: 1,
    slug: 'online-coaching',
    title: 'Online koučing',
    tagline:
      'Pre tých, ktorí to myslia naozaj vážne a sú schopní robiť veci precízne, zodpovedne a dlhodobo.',
    body: 'Prevediem ťa kompletným procesom zlepšenia sa — či už v gyme, v kuchyni alebo v celkovom lifestyle.',
    bullets: [
      '3-mesačný protokol',
      'Kompletný stravovací a tréningový plán',
      'Týždenná kontrola výsledkov a úprava plánov podľa potreby',
      'Týždenný call / videohovor',
      'Video ukážka s komentárom každého cviku v pláne',
      'Komunikácia v správach 24/7 (odpisujem do hodiny)',
      '2 osobné tréningy v cene',
    ],
    price: 600,
    priceUnit: '€',
    featured: true,
    ctaLabel: 'Mám záujem',
  },
  {
    order: 2,
    slug: 'osobna-konzultacia',
    title: 'Osobná konzultácia',
    tagline:
      'Pre tých, ktorí potrebujú poradiť, uistiť sa alebo potvrdiť postupy a skontrolovať si, či veci robia naozaj správne.',
    body: 'Ak potrebuješ skonzultovať svoj progres, tréning, stravu alebo regeneráciu, toto je ideálny spôsob ako to vyriešiť.',
    bullets: [
      'Poradím ti, ako sa stravovať',
      'Poradím ti, ako si upraviť kalórie vzhľadom na tvoje ciele',
      'Poradím ti, ako trénovať pre čo najlepšiu postavu',
      'Poradím ti, ako zlepšiť techniku cvikov',
      'Poradím ti, ako zlepšiť spánok a regeneráciu',
      'Naučím ťa, ako byť konzistentný',
    ],
    price: 60,
    priceUnit: '€/hod',
    ctaLabel: 'Rezervovať konzultáciu',
  },
  {
    order: 3,
    slug: 'stravovaci-plan',
    title: 'Stravovací plán',
    tagline:
      'Pre tých, čo majú poriešený tréning a pohyb a chýbajú im už len správne stravovacie návyky.',
    body: 'Či už ide o naberanie svalovej hmoty, chudnutie alebo zlepšenie zdravia.',
    bullets: [
      'Stravovací plán na mieru podľa vstupnej konzultácie',
      'Vstupný hovor, kde si prejdeme celý plán',
      'Vyradenie surovín, ktoré ti nevyhovujú (alergie, neznášanlivosť, vegetarián, vegán…)',
      'Mnoho variantov na každé jedlo v rámci dňa',
      'Slané aj sladké varianty jedál',
      '1-mesačná konzultácia plánu v rámci ceny',
    ],
    price: 200,
    priceUnit: '€',
    ctaLabel: 'Objednať plán',
  },
  {
    order: 4,
    slug: 'treningovy-plan',
    title: 'Tréningový plán',
    tagline:
      'Pre ľudí, čo v gyme alebo doma už nejaký čas makajú a potrebujú usmerniť alebo pushnúť cez svoje limity.',
    body: 'Plán prispôsobený osobným preferenciám a tvojmu vybaveniu.',
    bullets: [
      'Tréningový plán podľa osobných preferencií a vybavenia',
      'Plány do gymu aj na doma s vlastnou váhou',
      'Časové prispôsobenie podľa tvojich potrieb (práca, rodina, hobby)',
      'Video zásobník cvikov z plánu so stručným komentárom',
    ],
    price: 170,
    priceUnit: '€',
    ctaLabel: 'Objednať plán',
  },
  {
    order: 5,
    slug: 'osobny-trening',
    title: 'Osobný tréning',
    tagline:
      'Pre každého, kto potrebuje osobný kontakt, povzbudenie a osobné vysvetlenie — v Trnave v 365 Gyme na Zelenečskej 111.',
    body: 'Pravidelné tréningy pod osobným dohľadom.',
    bullets: [
      'Vstupná konzultácia',
      'Osobný prístup a osobná ukážka techniky cvikov',
      'Kontrola výsledkov a progresu v rámci tréningového plánu',
      'Cvičenie na hranici limitov',
      'Progresívne preťažovanie každý týždeň',
      'Trénovanie podľa aktuálnych štúdií a poznatkov v rámci silového tréningu',
    ],
    price: 30,
    priceUnit: '€/tréning',
    ctaLabel: 'Mám záujem',
  },
];
