# Sanity CMS — Návod ako spustiť

> Krok-za-krokom návod pre Jana, ako aktivovať admin panel pre recenzie Dominikovho webu. Po dokončení si Dominik bude môcť pridávať a meniť recenzie sám cez webový formulár, bez programátora.

## Čo to vlastne je

**Sanity** je administračný panel (CMS — Content Management System) pre obsah webu. V tomto projekte rieši **iba recenzie**. Funguje takto:

- Web má URL `https://dominikprelovsky.vercel.app/studio`.
- Po prihlásení (cez Google účet) sa otvorí formulár, kde je zoznam recenzií a tlačidlo **„+ New"**.
- Dominik klikne, vyplní meno + text + hodnotenie, klikne **Publish**.
- Po ~60 sekundách sa recenzia objaví na webe v sekcii **„Čo hovoria klienti"**.

**Cena:** 0 € (Sanity Free tier — 3 user-i, 10 GB bandwidth, 5 GB médií). Pre fitness web s pár recenziami za rok je to viac ako dosť.

**Stav teraz:** Sanity kód je už v repe (`sanity.config.ts`, `sanity/schemas/`, `app/studio/`, `lib/sanity/`). Iba **nie je aktivovaný** — chýba projekt na sanity.io a env premenné vo Vercel-i. Pokým to nezapojíš, web ide normálne s hardcoded recenziami (fallback) — žiadny problém, len Dominik si nemôže pridávať.

---

## Pred začiatkom

Potrebuješ:
- **Google účet** (na prihlásenie do sanity.io a Vercel).
- **Prístup do Vercel projektu** `dominikprelovsky` (už máš, robíš tam Promote to Production).
- **15 minút** času.

---

## Krok 1 — Vytvoriť Sanity projekt (~5 min)

1. Otvor: <https://www.sanity.io/manage>
2. Klikni **„Sign up"** (vpravo hore) → vyber **„Continue with Google"** → prihlás sa svojim Google účtom.
3. Po prihlásení uvidíš dashboard. Klikni **„Create new project"** alebo **„+ New project"**.
4. Vyplň formulár:
   - **Project name:** `Dominik Prelovský`
   - **Use the default dataset configuration:** ✓ (necháš zaškrtnuté — vytvorí dataset menom `production`)
   - **Project template:** `Clean project with no predefined schemas`
5. Klikni **Create project**.
6. Po vytvorení projekt otvor v dashboarde — uvidíš **Project ID** v hornej časti stránky (vyzerá ako `abc12xyz` — 8 znakov).
7. **Skopíruj si Project ID** — budeš ho potrebovať v ďalšom kroku.

---

## Krok 2 — Pridať env premenné do Vercel (~3 min)

1. Otvor: <https://vercel.com/janstas105-gmailcoms-projects/dominikprelovsky/settings/environment-variables>
2. Klikni **„Add Another"** alebo **„+"** ikonku.
3. Pridaj **prvú premennú**:
   - **Key:** `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - **Value:** *(vlož Project ID z kroku 1, napr. `abc12xyz`)*
   - **Environment:** zaškrtni **všetky tri** — Production, Preview, Development.
   - Klikni **Save**.
4. Pridaj **druhú premennú**:
   - **Key:** `NEXT_PUBLIC_SANITY_DATASET`
   - **Value:** `production`
   - **Environment:** všetky tri.
   - Klikni **Save**.

---

## Krok 3 — Redeploy webu (~2 min)

Env premenné sa aktivujú až po novom deploy.

1. Otvor: <https://vercel.com/janstas105-gmailcoms-projects/dominikprelovsky/deployments>
2. Najnovší deployment v zozname → klikni na **⋯** vpravo (3 bodky) → **Redeploy**.
3. V dialógu **NEodznač** „Use existing Build Cache" (rýchlejší build).
4. Klik **Redeploy**.
5. Počkaj ~1 minútu kým build prejde — nový deployment musí mať status **READY**.
6. Klikni na ⋯ pri novom READY deployi → **Promote to Production**, aby live web bežal s novými env vars.

---

## Krok 4 — Pridať CORS origin v Sanity (~3 min)

Sanity Studio na webe potrebuje vedieť, že môže komunikovať s Sanity API z Vercel domény.

1. Otvor: <https://www.sanity.io/manage> → klikni na svoj projekt **„Dominik Prelovský"**.
2. V ľavom menu klik **API**.
3. V sekcii **CORS origins** klik **„Add CORS origin"**.
4. Vyplň:
   - **Origin:** `https://dominikprelovsky.vercel.app`
   - **Allow credentials:** ✓ (zaškrtni)
5. Klik **Save**.
6. *(Voliteľne — pre lokálny vývoj)* Pridaj ešte jeden origin: `http://localhost:3000` s Allow credentials ✓.

---

## Krok 5 — Otvoriť Studio a pridať prvú recenziu (~1 min)

1. Otvor: <https://dominikprelovsky.vercel.app/studio>
2. Studio sa načíta a vyzve ťa na prihlásenie. Klikni **„Continue with Google"** → prihlás sa rovnakým účtom ako v kroku 1.
3. Vľavo uvidíš menu **„Obsah"** → **„Recenzie"**. Klikni naň.
4. Vpravo hore klikni **„+ New"** alebo zelený plus button.
5. Vyplň formulár:
   - **Poradie:** `1` (najnovšie najvyššie číslo, alebo poradie zobrazenia)
   - **Meno klienta:** napr. `Marek`
   - **Rola:** napr. `Online coaching`
   - **Hodnotenie:** `5`
   - **Text recenzie:** plný text recenzie
6. Vpravo dole klik **„Publish"**.
7. Otvor `https://dominikprelovsky.vercel.app/` → scrolluj na sekciu **„Čo hovoria klienti"**. Po ~60 sekundách (revalidácia) sa nová recenzia zobrazí.

> **Pozn:** Ak v Sanity nepridáš žiadnu recenziu (alebo ich zmažeš), web automaticky zobrazí **fallback hardcoded recenzie** — nikdy sa nestane že by sekcia bola prázdna.

---

## Krok 6 (voliteľné) — Pridať Dominika ako editora

Ak chceš, aby Dominik mohol pridávať recenzie sám bez toho aby ti písal:

1. <https://www.sanity.io/manage> → tvoj projekt → **Members** (v ľavom menu).
2. Klik **„Invite"** alebo **„+ Add member"**.
3. Vyplň:
   - **Email:** Dominikov gmail (napr. `prelovskydominik@gmail.com`).
   - **Role:** **Editor** (môže pridávať/upravovať/mazať obsah, ale nie meniť projekt-settings).
4. Send invite.
5. Dominik dostane e-mail, klikne link, prihlási sa cez svoj Google → uvidí Studio s rovnakými právami.

---

## Troubleshooting

| Problém | Riešenie |
|---|---|
| **`/studio` ukazuje chybu „Project ID is missing"** | Krok 2 nebol urobený — pridaj env vars do Vercel a redeploy (krok 3). |
| **CORS error v konzole prehliadača** | Krok 4 nebol urobený — pridaj origin v Sanity API → CORS origins. |
| **Studio sa načíta ale ukazuje „Permission denied"** | Tvoj Google účet ešte nie je členom projektu. Zo dashboardu Members sa pridaj sám / cez invite link v emaili. |
| **Pridal som recenziu, ale na webe nie je** | Počkaj ~1 minútu (ISR revalidácia). Alebo trigger redeploy vo Vercel (Settings → Deployments → ⋯ → Redeploy). |
| **Chcem späť hardcoded recenzie** | Vymaž alebo deaktivuj env vars `NEXT_PUBLIC_SANITY_PROJECT_ID` v Vercel-i a redeploy. Web automaticky padne na fallback array v `lib/getTestimonials.ts`. |
| **Chcem zmeniť, čo má recenzia obsahovať (polia)** | Edit `sanity/schemas/testimonial.ts` v repe + push do main. Studio si automaticky obnoví formulár. |

---

## Bezpečnosť

- `NEXT_PUBLIC_SANITY_PROJECT_ID` je **verejný** — vidno ho v HTML zdroji webu. Nie je tajný, je len identifikátor projektu.
- `NEXT_PUBLIC_SANITY_DATASET` je tiež verejný.
- **Žiadny token nie je v repe** — Studio robí autentifikáciu cez Sanity OAuth (Google login), zápis do CMS funguje len keď si prihlásený ako Editor/Owner.
- Verejné čítanie z Sanity (cez `useCdn: true`) je iba pre **publishované** dokumenty — drafty a zmazané recenzie sú schované.

---

## Pre referenciu

- **Sanity dashboard:** <https://www.sanity.io/manage>
- **Vercel projekt settings:** <https://vercel.com/janstas105-gmailcoms-projects/dominikprelovsky/settings>
- **Web Studio URL:** <https://dominikprelovsky.vercel.app/studio>
- **Schéma recenzie v repe:** `sanity/schemas/testimonial.ts`
- **Fetch logika + fallback:** `lib/getTestimonials.ts`
- **Sanity config:** `sanity.config.ts`
