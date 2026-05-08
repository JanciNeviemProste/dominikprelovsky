// Centrálny registry editovateľných content typov.
// Každý typ má presný JSON path v repe + validátor.

export type ContentType =
  | "testimonials"
  | "services"
  | "philosophy"
  | "profile"
  | "transformations"
  | "highlights"
  | "site-settings";

export const CONTENT_FILES: Record<ContentType, string> = {
  testimonials: "data/testimonials.json",
  services: "data/services.json",
  philosophy: "data/philosophy.json",
  profile: "data/profile.json",
  transformations: "data/transformations.json",
  highlights: "data/highlights.json",
  "site-settings": "data/site-settings.json",
};

export function isValidContentType(t: string): t is ContentType {
  return Object.prototype.hasOwnProperty.call(CONTENT_FILES, t);
}

// ---------- Validátory ----------

function isStr(v: unknown, max = 5000, min = 0): v is string {
  return typeof v === "string" && v.length >= min && v.length <= max;
}

function isOptStr(v: unknown, max = 5000): v is string | undefined {
  return v === undefined || (typeof v === "string" && v.length <= max);
}

function isUrl(v: unknown): boolean {
  if (typeof v !== "string") return false;
  if (v.length === 0) return true;
  if (v.startsWith("/")) return true;
  return /^https?:\/\//.test(v);
}

function validateTestimonials(data: unknown): unknown[] | string {
  if (!Array.isArray(data)) return "Očakávam pole.";
  for (const item of data) {
    if (!item || typeof item !== "object") return "Neplatná položka.";
    const t = item as Record<string, unknown>;
    if (!isStr(t.clientName, 100, 1)) return "Meno klienta je povinné (max 100 znakov).";
    if (!isStr(t.text, 5000, 1)) return "Text recenzie je povinný (max 5000 znakov).";
    if (!isOptStr(t.role, 200)) return "Rola príliš dlhá.";
    if (
      t.rating !== undefined &&
      (typeof t.rating !== "number" || t.rating < 1 || t.rating > 5)
    ) {
      return "Hodnotenie 1-5.";
    }
  }
  return data;
}

function validateServices(data: unknown): unknown[] | string {
  if (!Array.isArray(data)) return "Očakávam pole.";
  for (const item of data) {
    if (!item || typeof item !== "object") return "Neplatná položka.";
    const s = item as Record<string, unknown>;
    if (!isStr(s.slug, 100, 1)) return "Slug je povinný.";
    if (!isStr(s.title, 200, 1)) return "Názov je povinný.";
    if (!isStr(s.tagline, 1000, 1)) return "Tagline je povinný.";
    if (!isStr(s.price, 50, 1)) return "Cena je povinná (text).";
    if (typeof s.featured !== "boolean") return "Featured musí byť boolean.";
    if (!Array.isArray(s.bullets)) return "Bullets musí byť pole.";
    for (const b of s.bullets) {
      if (!isStr(b, 500, 1)) return "Každý bullet musí byť text 1-500 znakov.";
    }
  }
  return data;
}

function validatePhilosophy(data: unknown): unknown[] | string {
  if (!Array.isArray(data)) return "Očakávam pole.";
  for (const item of data) {
    if (!item || typeof item !== "object") return "Neplatná položka.";
    const p = item as Record<string, unknown>;
    if (!isStr(p.number, 10, 1)) return "Číslo je povinné.";
    if (!isStr(p.title, 200, 1)) return "Názov je povinný.";
    if (!isStr(p.text, 5000, 1)) return "Text je povinný.";
  }
  return data;
}

function validateProfile(data: unknown): unknown | string {
  if (!data || typeof data !== "object") return "Očakávam objekt.";
  const p = data as Record<string, unknown>;
  if (!isStr(p.name, 200, 1)) return "Meno je povinné.";
  if (!isStr(p.role, 200, 1)) return "Rola je povinná.";
  if (!isStr(p.bio, 5000, 1)) return "Bio je povinné.";
  if (!isUrl(p.photo)) return "Foto musí byť URL.";
  return data;
}

function validateTransformations(data: unknown): unknown[] | string {
  if (!Array.isArray(data)) return "Očakávam pole.";
  for (const item of data) {
    if (!item || typeof item !== "object") return "Neplatná položka.";
    const t = item as Record<string, unknown>;
    if (!isUrl(t.image)) return "Image musí byť URL.";
    if (!isOptStr(t.headline, 100)) return "Headline príliš dlhý.";
    if (!isOptStr(t.caption, 500)) return "Caption príliš dlhý.";
  }
  return data;
}

function validateHighlights(data: unknown): unknown[] | string {
  if (!Array.isArray(data)) return "Očakávam pole.";
  for (const item of data) {
    if (!item || typeof item !== "object") return "Neplatná položka.";
    const h = item as Record<string, unknown>;
    if (!isUrl(h.image)) return "Image musí byť URL.";
    if (!isStr(h.label, 200, 1)) return "Label je povinný.";
    if (!isStr(h.ebookId, 100, 1)) return "ebookId je povinný.";
  }
  return data;
}

function validateSiteSettings(data: unknown): unknown | string {
  if (!data || typeof data !== "object") return "Očakávam objekt.";
  const s = data as Record<string, unknown>;
  // Lite validation — necháme klienta editovať voľne, ale typy fixujeme
  for (const key of [
    "brand",
    "hero",
    "contact",
    "social",
    "cta",
    "transformationsSection",
    "philosophySection",
    "servicesSection",
    "highlightsSection",
    "testimonialsSection",
    "contactFormSection",
    "footer",
  ] as const) {
    if (!s[key] || typeof s[key] !== "object") {
      return `Chýba sekcia '${key}'.`;
    }
  }
  return data;
}

export function validateContent(type: ContentType, data: unknown): unknown | string {
  switch (type) {
    case "testimonials":
      return validateTestimonials(data);
    case "services":
      return validateServices(data);
    case "philosophy":
      return validatePhilosophy(data);
    case "profile":
      return validateProfile(data);
    case "transformations":
      return validateTransformations(data);
    case "highlights":
      return validateHighlights(data);
    case "site-settings":
      return validateSiteSettings(data);
  }
}
