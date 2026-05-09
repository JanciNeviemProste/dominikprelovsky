"use client";

import { useState } from "react";
import highlightsData from "@/data/highlights.json";
import settings from "@/data/site-settings.json";
import Editable from "@/components/admin/Editable";

export default function Highlights() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy(ebookId: string) {
    setLoading(ebookId);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ebookId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Nepodarilo sa otvoriť platbu.");
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Server nevrátil URL na platbu.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Nepodarilo sa otvoriť platbu. Skús to znova alebo napíš na info.",
      );
      setLoading(null);
    }
  }

  return (
    <section className="w-full bg-white" style={{ padding: "64px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "80px",
              fontWeight: 400,
              marginBottom: 0,
              color: "#2b2b2b",
            }}
          >
            <Editable
              contentType="site-settings"
              path="highlightsSection.title"
              value={settings.highlightsSection.title}
              label="Novinky — nadpis"
            >
              {settings.highlightsSection.title}
            </Editable>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 19,
              fontWeight: 300,
              color: "#888888",
              marginBottom: 0,
            }}
          >
            <Editable
              contentType="site-settings"
              path="highlightsSection.subtitle"
              value={settings.highlightsSection.subtitle}
              label="Novinky — podtitulok"
            >
              {settings.highlightsSection.subtitle}
            </Editable>
          </p>
        </div>

        {error && (
          <div
            style={{
              maxWidth: 600,
              margin: "0 auto 24px",
              padding: 14,
              fontSize: 13,
              color: "#b00020",
              backgroundColor: "#ffeaea",
              border: "1px solid #f5c2c2",
              borderRadius: 6,
              textAlign: "center",
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            }}
          >
            {error}
          </div>
        )}

        <div className="responsive-grid">
          {highlightsData.map((h, idx) => (
            <div key={h.label} style={{ textAlign: "center" }}>
              <div style={{ marginBottom: 24, overflow: "hidden" }}>
                <img
                  src={h.image}
                  alt={h.label}
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={() => handleBuy(h.ebookId)}
                  disabled={loading === h.ebookId}
                  className="btn-outline"
                  style={{
                    cursor: loading === h.ebookId ? "wait" : "pointer",
                    opacity: loading === h.ebookId ? 0.6 : 1,
                  }}
                >
                  {loading === h.ebookId ? (
                    "NAČÍTAVAM..."
                  ) : (
                    <Editable
                      contentType="highlights"
                      path={`${idx}.label`}
                      value={h.label}
                      label={`Novinka ${idx + 1} — text tlačidla`}
                    >
                      {h.label}
                    </Editable>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
