# Dominik Prelovský — Web

Osobný web fitness coacha a osobného trénera Dominika Prelovského. Postavené na **Next.js 16 (App Router)**, **Tailwind 4**, **Sanity CMS** (voliteľne) a **Resend** pre transakčné e-maily.

## Štart

```bash
pnpm install      # alebo: npm install
cp .env.example .env.local
pnpm dev          # http://localhost:3000
```

Web sa zobrazuje aj **bez** vyplnených env premenných — používa sa fallback obsah z `lib/content/`. Funkčný formulár (online koučing + kontakt) potrebuje aspoň `RESEND_API_KEY`.

## Skripty

- `pnpm dev` — vývojový server (Turbopack).
- `pnpm build` — produkčný build.
- `pnpm start` — produkčný server.
- `pnpm lint` — ESLint.

## Štruktúra

```
app/
  page.tsx                        homepage (server component, fetch obsahu)
  layout.tsx                      globálne meta, JSON-LD
  kontakt/page.tsx                kontakt + Maps
  podmienky/page.tsx              VOP + ochrana súkromia
  online-koucing/formular/        5-krokový formulár
  studio/[[...tool]]/page.tsx     Sanity Studio (na /studio)
  api/
    kontakt/route.ts
    online-coaching-form/route.ts
    sanity-webhook/route.ts
  robots.ts, sitemap.ts
  opengraph-image.tsx, icon.tsx, apple-icon.tsx
components/
  layout/                         Header, Footer
  sections/                       sekcie homepage
  forms/                          OnlineCoachingForm, KontaktForm
  ui/                             Button, Input, Textarea, …
lib/
  content/                        zdroj obsahu (fallback ak Sanity nie je nastavený)
  sanity/                         Sanity client + GROQ queries
  validations/                    Zod schémy
  rate-limit.ts                   per-IP rate limit pre API
  getContent.ts                   Sanity-first → fallback bridge
sanity/schemas/                   Sanity content types
public/images/transformations/    29 fotiek premien (zo zdroja od klienta)
```

## Sanity (správa obsahu)

Pre Dominika je Sanity Studio dostupné na `/studio` priamo v doméne. Edituje sa:
- **Nastavenia stránky** (hero, „Ako pracujem“ 3 body, social, kontakt, YouTube link, HeroHero link).
- **Služby** (5 služieb s cenami a bullets).
- **Premeny klientov** (foto + headline „-20 kg“ a popis).
- **Recenzie** (meno, hodnotenie, text).

Aby Studio fungovalo:
1. Vytvor projekt na https://sanity.io.
2. Skopíruj Project ID a dataset do `.env.local`.
3. `pnpm dev` → choď na `/studio`, prihlás sa Sanity účtom.
4. Pridaj obsah cez Studio. Web ho automaticky natiahne. Pri zmene obsahu Sanity webhook (POST na `/api/sanity-webhook` s `Authorization: Bearer <SANITY_WEBHOOK_SECRET>`) revaliduje stránky.

Bez Sanity projektu sa použije fallback obsah z `lib/content/`. Web tak funguje aj bez Sanity, ale klient nevie editovať.

## Resend (e-maily)

1. Účet na https://resend.com.
2. Verifikuj doménu `dominikprelovsky.sk` (DKIM/SPF/DMARC) v Resend dashboarde.
3. Vyplň `RESEND_API_KEY` a `RESEND_FROM_EMAIL` v `.env.local`.

Bez verifikovanej domény pôjdu maily z fallback adresy a hrozí spam.

## Hosting

Pozri [`HOSTING.md`](./HOSTING.md) — porovnanie hostingových možností a odporúčanie.

Krátko: **Vercel zadarmo** je natívna voľba pre Next.js. Slovenská alternatíva je **WebSupport.sk Cloud Hosting**.

## Licencia

Súkromný repozitár Dominika Prelovského.
