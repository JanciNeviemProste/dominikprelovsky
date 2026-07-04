# GO-LIVE — spustenie webu dominikprelovsky.sk do produkcie

Praktický checklist na rozbehnutie predaja (e-booky + členstvo) a odovzdanie Dominikovi.
Web beží na **Verceli**, doména na **Webglobe**, kód v GitHub repe `JanciNeviemProste/dominikprelovsky`.

> App kód netreba meniť — všetko sú **nastavenia/účty**. Env premenné sa nastavujú na
> **Vercel → Settings → Environment Variables** (vždy zaškrtni **Production**), a po každej zmene treba
> **Deployments → ⋯ → Redeploy**.
> Pozn.: väčšina premenných je **Sensitive** = hodnota je skrytá. Nie je zmazaná; zmeniť sa dá len
> cez **Remove + Add** (nie edit).

---

## 1. Prehľad env premenných

| Premenná | Načo | Kto / stav |
|---|---|---|
| `ADMIN_PASSWORD`, `ADMIN_SECRET` | admin login | ✅ hotové |
| `PREMIUM_SESSION_SECRET` | členské prihlásenie (magic-link) | ✅ hotové |
| `NEXT_PUBLIC_BASE_URL` = `https://dominikprelovsky.sk` | absolútne URL v e-mailoch/Stripe | ✅ hotové |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (PDF e-booky, heslá) | ✅ hotové (auto pri Blob store) |
| `GITHUB_TOKEN` | ukladanie obsahu z adminu (klasický token, scope `repo`) | ✅ hotové |
| `DOWNLOAD_TOKEN_SECRET` | podpis odkazov na stiahnutie e-booku (72 h) | ✅ hotové |
| `RESEND_API_KEY` | odosielanie e-mailov (formulár, doručenie e-booku, login) | ⏳ dorobiť |
| `COACH_EMAIL` | príjemca kontaktného formulára (default `prelovskydominik@gmail.com`) | voliteľné |
| `STRIPE_SECRET_KEY` | platby (checkout + webhook) | ⏳ dorobiť |
| `STRIPE_WEBHOOK_SECRET` | overenie Stripe webhooku | ⏳ dorobiť |
| `STRIPE_PREMIUM_PRICE_ID` | cena mesačného členstva (len pre premium videá) | ⏳ ak sa predáva členstvo |

---

## 2. Resend (e-maily)

1. Účet na **resend.com** → **Domains → Add** `dominikprelovsky.sk`.
2. Zobrazené DNS záznamy (MX + TXT/SPF + DKIM) vlož do **Webglobe → DNS** → v Resende **Verify**.
3. **API Keys → Create** → hodnota do `RESEND_API_KEY` na Verceli → **Redeploy**.

Odosielacia adresa v kóde je `noreply@dominikprelovsky.sk` (formulár, magic-link, doručenie e-booku, uvítací mail).
⚠️ Bez `RESEND_API_KEY` webhook **ticho zlyhá** — zákazník zaplatí, ale e-mail nepríde. Preto over pred predajom.

---

## 3. Stripe — TEST režim (najprv, dá sa bez Dominika)

Zadarmo, bez KYC, na overenie celého reťazca.

1. **stripe.com** → Sign up → vpravo hore prepni na **Test mode**.
2. **Developers → API keys** → **Secret key** (`sk_test_…`) → Vercel `STRIPE_SECRET_KEY`.
3. **Developers → Webhooks → Add endpoint**:
   - URL: `https://dominikprelovsky.sk/api/webhook`
   - Event: **`checkout.session.completed`**
   - ulož → **Signing secret** (`whsec_…`) → Vercel `STRIPE_WEBHOOK_SECRET`.
4. (len členstvo) **Products → Add product** → *Recurring* mesačná cena → **Price ID** (`price_…`) → `STRIPE_PREMIUM_PRICE_ID`.
5. Vercel **Redeploy**.
6. **Test nákup:** kúp e-book → karta **`4242 4242 4242 4242`**, dátum v budúcnosti, CVC/PSČ hocijaké →
   redirect `/dakujem` → e-mail s odkazom → stiahnutie PDF. Over v Stripe → Payments.

---

## 4. Stripe — PRODUCTION (live) režim

⚠️ Live kľúče fungujú až po **aktivácii Dominikovho účtu**.

1. **Dominik aktivuje účet:** typ podnikania (živnosť/s.r.o.), IČO/DIČ, adresa, **overenie totožnosti (KYC)**,
   **IBAN** na výplaty, súhlas s podmienkami → Stripe schváli (minúty–deň). Voliteľne pridá Janča ako **team member**.
2. Prepni Stripe na **Live mode**.
3. Vymeň na Verceli (Sensitive → **Remove + Add**):
   - **Live Secret key** (`sk_live_…`) → `STRIPE_SECRET_KEY`
   - **Live webhook** (vytvoriť ZNOVA v live režime, rovnaká URL + event `checkout.session.completed`) →
     live **Signing secret** (`whsec_…`) → `STRIPE_WEBHOOK_SECRET`
   - **(členstvo)** Product/Price **v live nanovo** → `price_…` → `STRIPE_PREMIUM_PRICE_ID`
4. Vercel **Redeploy**.
5. **Live smoke test:** reálny nákup e-booku (19,90 €) → e-mail + stiahnutie → v Stripe **Refund**.
6. **DPH/výplaty:** ak platca DPH, nastav daň; výplaty chodia automaticky na IBAN Dominika.

**Rozdiely test → live:** kľúče `sk_test_`→`sk_live_`; webhook/Products/Prices sú v live **samostatné**
(nekopírujú sa); testovacia karta `4242…` → reálna karta.

---

## 5. Obsah pred spustením

- **E-booky** — nahraté (Stravovanie 1,2 MB + Chudnutie 30 MB). ✅
- **Premium videá** — členská sekcia je zatiaľ **prázdna**; pridať súkromné YouTube/Vimeo odkazy cez
  `/admin/premium-videa` (+ rozhodnúť cenu členstva €/mes).
- **Náhľad pri zdieľaní (og:image)** — dočasne coaching fotka; vymeniť za **profi fotku Dominika 1200×630**
  (`app/layout.tsx` → `openGraph.images`).
- **Podmienky** a **Ochrana údajov** — skontrolovať reálny text.

---

## 6. SEO (marketing)

- ✅ Hotové: sitemap, robots, JSON-LD, canonical, og:image.
- ⏳ Doplniť do `components/StructuredData.tsx`: `sameAs` (Instagram/YouTube) + telefón (`ProfessionalService`).
- ⏳ **Google Search Console** → over doménu → odošli `https://dominikprelovsky.sk/sitemap.xml`.
- ⏳ **Google Business Profile** (Dominik) — lokálne vyhľadávanie „tréner Trnava".

---

## 7. Odovzdanie Dominikovi (na koniec)

- Transfer **Vercel projektu** + **GitHub repa** na Dominikove účty.
- `GITHUB_TOKEN` prehodiť na jeho token (repo constants sú už cez env: `GITHUB_REPO_OWNER/NAME/BRANCH`).
- Prípadne doména pod jeho účet.
