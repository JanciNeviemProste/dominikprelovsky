# Hosting — kde a za koľko web bude bežať

Krátky sprievodca pre Jana ako majiteľa projektu. Vyber si jeden z troch scenárov.

---

## TL;DR — odporúčanie

**Najlepšia voľba: Vercel (zadarmo)** + doména cez WebSupport.sk (~9 €/rok).
Beží na ňom Next.js natívne, deploy z GitHub jedným klikom, ISR + edge cache automaticky, žiadny server admin.

**Slovenská alternatíva (ak klient chce SK provider):** **HostCreators.sk** od ~0,80 €/mes (Banská Bystrica, podporuje npm build, Git deploy, beta Node.js) **alebo** **WebSupport.sk Cloud Hosting / VPS** (väčšia značka, drahšie). Detail nižšie.

---

## Ako web technicky funguje

- **Framework:** Next.js 16 App Router. Čo to znamená: stránky sa generujú serverom (SSR/ISR), nie sú to statické HTML súbory. Časť webu (homepage, sekcie) sa generuje pri builde a revaliduje raz za 60 sekúnd; časť (formuláre, Sanity Studio) je server-rendered on demand.
- **Runtime:** Node.js 20+ (LTS). Bez Node.js runtime web nepojde.
- **Databáza:** žiadna vlastná DB. Obsah ide cez **Sanity CMS** (cloud, free plán). Maily cez **Resend** (cloud, free plán).
- **Build proces:** `npm install && npm run build` produkuje optimalizovaný `.next/` priečinok. Deploy platforma musí vedieť tento build spustiť po každom git pushi.
- **Statický hosting (FTP, holé HTML) NESTAČÍ.** Dynamické routy (`/kontakt` form, `/api/*`, `/studio`) potrebujú server.

---

## Možnosť A — Vercel (odporúčané, **0 €/mes**)

Vercel je platforma od tvorcov Next.js. Každý push do `main` automaticky:
1. spustí build,
2. dá to na CDN edge (~30 lokácií celého sveta),
3. updatne live URL.

**Prečo Vercel:**
- ISR + edge cache fungujú **bez akejkoľvek konfigurácie**.
- HTTPS, custom doména, preview deploy z PR — všetko zadarmo na Hobby tieri.
- Logy, metriky, error tracking v UI.
- Slovak DNS provider (napr. WebSupport) môže smerovať doménu cez CNAME na Vercel.

**Limity Hobby (free) tieru — stačí pre fitness web 100×:**
- 100 GB bandwidth/mes (priemerný fitness web má 5–20 GB).
- 100 K Functions invocations/mes (formuláre + API).
- Build 6 000 minút/mes.
- 1 user (Jan ako owner).

**Cena: 0 €/mes.** Doména `dominikprelovsky.sk` cez SK registrátora ~9 €/rok.

**Setup:** import GitHub repo, vyplniť env vars (`RESEND_API_KEY`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, …), kliknúť Deploy. ~3 minúty.

---

## Možnosť B — HostCreators.sk (slovenský, lacný)

[HostCreators](https://hostcreators.sk/) je banskobystrický hosting podporujúci modernú výstavbu Next.js (npm build, Git deploy, SSH). Aktívne testujú beta Node.js runtime — pre full SSR Next.js to znamená čakať na release alebo brať VPS variant.

**Ceny (apríl 2026, aktuálny stav cennika):**
- **Webhosting balíky** od cca **0,80 €/mes** (build cez npm + Git deploy, podpora statických frameworkov ako Astro/Vite — Next.js 16 SSR čaká na ich Node.js beta GA).
- **Managed VPS** — full kontrola, Node.js neobmedzene; cca **5–10 €/mes**.

**Plus:**
- SK podpora v slovenčine.
- Servery v Banskej Bystrici (latency 5–10 ms).
- npm + Git + cron + zdarma SSL.

**Mínus:**
- Pre Next.js 16 ISR + on-demand revalidate je potrebný plný Node runtime — odporúča sa VPS variant alebo počkať na Node.js GA na zdieľanom hostingu.
- Manuálnejší setup než Vercel (CI/CD si treba zariadiť).

[Pozri cenník na hostcreators.sk](https://hostcreators.sk/webhosting/)

---

## Možnosť C — WebSupport.sk (väčšia SK značka)

[WebSupport](https://www.websupport.sk/) má širokú ponuku od zdieľaného hostingu po Cloud Hosting a VPS. Pre Next.js 16 odporúčaný **VPS** alebo **Cloud Hosting** s Node.js — zdieľaný PHP webhosting **NEBEŽÍ** Next.js.

**Orientačné ceny (vždy si over aktuálny cennik):**
- Cloud Hosting / Node.js runtime: **5–10 €/mes**.
- VPS: **6–15 €/mes** podľa CPU/RAM.
- WebSupport zdražoval k 13. 4. 2026 — pred objednávkou pozri [aktuálny cenník 2026](https://www.websupport.sk/cennik-2026/).

**Plus:** najväčšia SK značka, podpora 24/7 v slovenčine, dlhodobá stabilita.
**Mínus:** drahšie než HostCreators, manuálny CI/CD setup.

---

## Náklady na chod webu mesačne / ročne

| Položka | Vercel scenár | SK hosting scenár |
|---|---|---|
| Hosting | **0 €** (Vercel Hobby) | 5–10 €/mes (VPS / Cloud) |
| Doména `.sk` | ~9 €/rok | ~9 €/rok |
| Sanity CMS | 0 € (Free plán) | 0 € |
| Resend (e-maily) | 0 € (3 000 mailov/mes free) | 0 € |
| **Spolu** | **~9 €/rok** | **~70–120 €/rok** |

Free plány Sanity a Resend sú pre fitness web s pár klientmi viac než dostatočné. Limity:
- Sanity Free: 3 user-i Studio, 5 GB assets, 10 GB bandwidth.
- Resend Free: 3 000 e-mailov/mes (formulár + confirmation = 2 e-maily na lead).

---

## Aký je odporúčaný setup krok-po-kroku

1. **GitHub** — kód je v repe `JanciNeviemProste/dominikprelovsky-master`.
2. **Vercel** — `vercel.com` → Import Git Repository → vyber repo. Auto-detekuje Next.js.
3. **Env vars** — v Vercel Project Settings vyplň:
   - `RESEND_API_KEY` (z resend.com)
   - `RESEND_FROM_EMAIL=Dominik Prelovský <noreply@dominikprelovsky.sk>`
   - `COACH_EMAIL=info@dominikprelovsky.sk`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` (zo sanity.io)
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `SANITY_WEBHOOK_SECRET=` (vygeneruj 32 zn. heslo)
   - `NEXT_PUBLIC_SITE_URL=https://dominikprelovsky.sk`
4. **Doména** — v WebSupport DNS pridaj CNAME `www → cname.vercel-dns.com` a A record `@ → 76.76.21.21` (Vercel ti to ukáže presne).
5. **Resend doména** — v resend.com pridaj `dominikprelovsky.sk` a doplň DKIM, SPF, DMARC TXT záznamy do WebSupport DNS. Bez toho mailové zasielanie pôjde do spamu.
6. **Sanity** — vytvor projekt na sanity.io, skopíruj Project ID. Po deploy choď na `https://dominikprelovsky.sk/studio`, prihlás sa Sanity účtom, pridaj obsah.

---

## Kedy zmeniť hosting

- **Z Vercel free → Vercel Pro (20 $/mes)** ak prekročíš 100 GB bandwidth alebo chceš teamovú spoluprácu.
- **Z Vercel → SK VPS** ak je požiadavka „dáta musia byť na SK serveri“ (zriedkavé pre fitness web; GDPR sa Vercel-u nebráni).

Zatiaľ stačí Vercel Hobby + WebSupport doména.

---

## Kontakty pri probléme

- **Build failed** → Vercel Deployment logs (Project → Deployments → klikni neúspešný)
- **Maily nedorážajú** → Resend dashboard → Logs
- **Sanity zmeny sa nezobrazia** → over webhook v Sanity → API → Webhooks; alebo ručne v Vercel-i klikni „Redeploy“
