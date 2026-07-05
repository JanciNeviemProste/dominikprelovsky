"use client";

import { useState } from "react";
import AdminShell from "./AdminShell";
import SaveBar from "./SaveBar";
import { saveContent } from "@/lib/admin-save";
import { labelStyle, inputStyle, cardStyle } from "./common";
import type siteSettingsType from "@/data/site-settings.json";

type Settings = typeof siteSettingsType;

export default function HeroEditor({ initial }: { initial: Settings }) {
  const [data, setData] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  function patch<K extends keyof Settings>(key: K, value: Settings[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      await saveContent("site-settings", data);
      setMessage({ type: "success", text: "Uložené!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Chyba." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="HERO A SEKCIE" subtitle="Hlavičky sekcií, hero copy, CTA tlačidlá">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Hero */}
        <article style={cardStyle}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#666", textTransform: "uppercase" }}>
            Hero (úvodná sekcia)
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={labelStyle}>Veľký nadpis</label>
              <input
                type="text"
                value={data.hero.title}
                onChange={(e) => patch("hero", { ...data.hero, title: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Podtitulok</label>
              <input
                type="text"
                value={data.hero.subtitle}
                onChange={(e) => patch("hero", { ...data.hero, subtitle: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Background image (URL alebo /images/...)</label>
              <input
                type="text"
                value={data.hero.backgroundImage}
                onChange={(e) =>
                  patch("hero", { ...data.hero, backgroundImage: e.target.value })
                }
                style={inputStyle}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Tlačidlo 1 — text</label>
                <input
                  type="text"
                  value={data.hero.primaryButton.text}
                  onChange={(e) =>
                    patch("hero", {
                      ...data.hero,
                      primaryButton: { ...data.hero.primaryButton, text: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Tlačidlo 1 — odkaz</label>
                <input
                  type="text"
                  value={data.hero.primaryButton.href}
                  onChange={(e) =>
                    patch("hero", {
                      ...data.hero,
                      primaryButton: { ...data.hero.primaryButton, href: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Tlačidlo 2 — text</label>
                <input
                  type="text"
                  value={data.hero.secondaryButton.text}
                  onChange={(e) =>
                    patch("hero", {
                      ...data.hero,
                      secondaryButton: { ...data.hero.secondaryButton, text: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Tlačidlo 2 — odkaz</label>
                <input
                  type="text"
                  value={data.hero.secondaryButton.href}
                  onChange={(e) =>
                    patch("hero", {
                      ...data.hero,
                      secondaryButton: { ...data.hero.secondaryButton, href: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </article>

        {/* Brand */}
        <article style={cardStyle}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#666", textTransform: "uppercase" }}>
            Brand (hlavička, footer)
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={labelStyle}>Meno značky</label>
              <input
                type="text"
                value={data.brand.name}
                onChange={(e) => patch("brand", { ...data.brand, name: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Logo image (kruhové foto v hlavičke)</label>
              <input
                type="text"
                value={data.brand.logoImage}
                onChange={(e) => patch("brand", { ...data.brand, logoImage: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
        </article>

        {/* Hlavičky sekcií */}
        <article style={cardStyle}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#666", textTransform: "uppercase" }}>
            Hlavičky sekcií
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={labelStyle}>Služby — nadpis</label>
              <input
                type="text"
                value={data.servicesSection.title}
                onChange={(e) =>
                  patch("servicesSection", { ...data.servicesSection, title: e.target.value })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Služby — podnadpis</label>
              <input
                type="text"
                value={data.servicesSection.subtitle}
                onChange={(e) =>
                  patch("servicesSection", { ...data.servicesSection, subtitle: e.target.value })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Ako pracujem — nadpis</label>
              <input
                type="text"
                value={data.philosophySection.title}
                onChange={(e) =>
                  patch("philosophySection", { ...data.philosophySection, title: e.target.value })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Ako pracujem — podnadpis</label>
              <input
                type="text"
                value={data.philosophySection.subtitle}
                onChange={(e) =>
                  patch("philosophySection", {
                    ...data.philosophySection,
                    subtitle: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Recenzie — nadpis</label>
              <input
                type="text"
                value={data.testimonialsSection.title}
                onChange={(e) =>
                  patch("testimonialsSection", {
                    ...data.testimonialsSection,
                    title: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Recenzie — podnadpis</label>
              <input
                type="text"
                value={data.testimonialsSection.subtitle}
                onChange={(e) =>
                  patch("testimonialsSection", {
                    ...data.testimonialsSection,
                    subtitle: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>
          </div>
        </article>

        {/* CTA + Premeny + Highlights texty */}
        <article style={cardStyle}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#666", textTransform: "uppercase" }}>
            CTA (červená sekcia „Prvá konzultácia zadarmo“)
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={labelStyle}>Nadpis</label>
              <input
                type="text"
                value={data.cta.title}
                onChange={(e) => patch("cta", { ...data.cta, title: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Text</label>
              <textarea
                value={data.cta.text}
                onChange={(e) => patch("cta", { ...data.cta, text: e.target.value })}
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <div>
              <label style={labelStyle}>Image</label>
              <input
                type="text"
                value={data.cta.image}
                onChange={(e) => patch("cta", { ...data.cta, image: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
        </article>

        <article style={cardStyle}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#666", textTransform: "uppercase" }}>
            Sekcia „Premeny klientov“ — texty
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={labelStyle}>Nadpis</label>
              <input
                type="text"
                value={data.transformationsSection.title}
                onChange={(e) =>
                  patch("transformationsSection", {
                    ...data.transformationsSection,
                    title: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Intro 1</label>
              <textarea
                value={data.transformationsSection.intro1}
                onChange={(e) =>
                  patch("transformationsSection", {
                    ...data.transformationsSection,
                    intro1: e.target.value,
                  })
                }
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <div>
              <label style={labelStyle}>Intro 2</label>
              <textarea
                value={data.transformationsSection.intro2}
                onChange={(e) =>
                  patch("transformationsSection", {
                    ...data.transformationsSection,
                    intro2: e.target.value,
                  })
                }
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>CTA text</label>
                <input
                  type="text"
                  value={data.transformationsSection.ctaText}
                  onChange={(e) =>
                    patch("transformationsSection", {
                      ...data.transformationsSection,
                      ctaText: e.target.value,
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>CTA odkaz</label>
                <input
                  type="text"
                  value={data.transformationsSection.ctaHref}
                  onChange={(e) =>
                    patch("transformationsSection", {
                      ...data.transformationsSection,
                      ctaHref: e.target.value,
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </article>

        {/* Footer */}
        <article style={cardStyle}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#666", textTransform: "uppercase" }}>
            Footer
          </h3>
          <div>
            <label style={labelStyle}>Rok copyrightu</label>
            <input
              type="number"
              value={data.footer.copyrightYear}
              onChange={(e) =>
                patch("footer", { ...data.footer, copyrightYear: Number(e.target.value) })
              }
              style={inputStyle}
            />
          </div>
        </article>
      </div>

      <SaveBar saving={saving} message={message} onSave={save} />
    </AdminShell>
  );
}
