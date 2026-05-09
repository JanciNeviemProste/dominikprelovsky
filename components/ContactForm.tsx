"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import settings from "@/data/site-settings.json";
import Editable from "@/components/admin/Editable";

const serviceOptions = [
  { value: "konzultacia-zadarmo", label: "Konzultácia 1on1 (ZADARMO)" },
  { value: "online-coaching", label: "Online coaching (600 €)" },
  { value: "osobna-konzultacia", label: "Osobná konzultácia (60 €/hod)" },
  { value: "stravovaci-plan", label: "Stravovací plán (200 €)" },
  { value: "treningovy-plan", label: "Tréningový plán (170 €)" },
  { value: "osobny-trening", label: "Osobný tréning (30 €/tréning)" },
  { value: "iny-dovod", label: "Iný dôvod" },
];

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 600,
  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
  color: "#2b2b2b",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #333333",
  borderRadius: 8,
  padding: "14px 16px",
  fontSize: 14,
  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
  color: "#2b2b2b",
  outline: "none",
  backgroundColor: "#ffffff",
  boxSizing: "border-box",
};

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialSluzba = searchParams.get("sluzba") || "";
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>(initialSluzba);

  // Ak sa URL zmení (napr. SPA navigácia), prepíš výber.
  useEffect(() => {
    const fromUrl = searchParams.get("sluzba");
    if (fromUrl) setSelectedService(fromUrl);
  }, [searchParams]);

  if (submitted) {
    return (
      <section
        id="kontakt"
        className="w-full bg-white"
        style={{ padding: "64px 0" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              marginBottom: 24,
              color: "#2b2b2b",
            }}
          >
            ĎAKUJEM!
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
            }}
          >
            Tvoja správa bola odoslaná. Ozvem sa ti do 24 hodín.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="kontakt"
      className="w-full bg-white"
      style={{ padding: "64px 0", scrollMarginTop: 80 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }} id="cennik">
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              marginBottom: 16,
              color: "#2b2b2b",
            }}
          >
            <Editable
              contentType="site-settings"
              path="contactFormSection.title"
              value={settings.contactFormSection.title}
              label="Kontakt formulár — nadpis"
            >
              {settings.contactFormSection.title}
            </Editable>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              color: "#2b2b2b",
              marginBottom: 8,
            }}
          >
            <Editable
              contentType="site-settings"
              path="contactFormSection.subtitle1"
              value={settings.contactFormSection.subtitle1}
              label="Kontakt formulár — podtitulok 1"
            >
              {settings.contactFormSection.subtitle1}
            </Editable>
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              color: "#888888",
              marginBottom: 0,
            }}
          >
            <Editable
              contentType="site-settings"
              path="contactFormSection.subtitle2"
              value={settings.contactFormSection.subtitle2}
              label="Kontakt formulár — podtitulok 2"
            >
              {settings.contactFormSection.subtitle2}
            </Editable>
          </p>
        </div>

        {/* Form */}
        <form
          action="/api/kontakt"
          method="POST"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            setSubmitting(true);
            setError(null);
            try {
              const res = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" },
              });
              if (res.ok) {
                setSubmitted(true);
              } else {
                const data = await res.json().catch(() => ({}));
                setError(data.error || "Nepodarilo sa odoslať. Skús to znova.");
              }
            } catch {
              setError("Chyba siete. Skús to znova.");
            } finally {
              setSubmitting(false);
            }
          }}
          style={{
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Meno */}
          <div>
            <label htmlFor="name" style={labelStyle}>
              Meno a priezvisko *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" style={labelStyle}>
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              style={inputStyle}
            />
          </div>

          {/* Typ služby */}
          <div>
            <label htmlFor="service" style={labelStyle}>
              Typ služby
            </label>
            <select
              id="service"
              name="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              style={inputStyle}
            >
              <option value="">Vyber typ služby...</option>
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Správa */}
          <div>
            <label htmlFor="message" style={labelStyle}>
              Správa
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              style={{ ...inputStyle, resize: "vertical" as const }}
            />
          </div>

          {/* Error banner */}
          {error && (
            <div
              style={{
                padding: 14,
                fontSize: 13,
                color: "#b00020",
                backgroundColor: "#ffeaea",
                border: "1px solid #f5c2c2",
                borderRadius: 6,
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                display: "inline-block",
                backgroundColor: "#f73131",
                color: "#ffffff",
                border: 0,
                borderRadius: 9999,
                padding: "calc(.667em + 2px) calc(1.333em + 2px)",
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: "1.125em",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: submitting ? "wait" : "pointer",
                opacity: submitting ? 0.7 : 1,
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!submitting) e.currentTarget.style.backgroundColor = "#cf2e2e";
              }}
              onMouseLeave={(e) => {
                if (!submitting) e.currentTarget.style.backgroundColor = "#f73131";
              }}
            >
              {submitting ? "ODOSIELAM…" : "ODOSLAŤ"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  );
}
