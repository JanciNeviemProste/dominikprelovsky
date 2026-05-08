"use client";

import { useState } from "react";
import highlightsData from "@/data/highlights.json";
import settings from "@/data/site-settings.json";

export default function Highlights() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleBuy(ebookId: string) {
    setLoading(ebookId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ebookId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
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
            {settings.highlightsSection.title}
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
            {settings.highlightsSection.subtitle}
          </p>
        </div>

        <div className="responsive-grid">
          {highlightsData.map((h) => (
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
                  {loading === h.ebookId ? "NAČÍTAVAM..." : h.label}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
