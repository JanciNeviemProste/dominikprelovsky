"use client";

import { useState } from "react";

const serviceOptions = [
  "Konzultácia 1on1 (ZADARMO)",
  "Osobný tréning (od 30€/hod)",
  "Stravovací plán a koučing (od 100€)",
  "Online coaching (od 80€/mesiac)",
  "Tréningový plán (od 80€)",
  "Kondičná príprava športovcov (individuálna cena)",
  "Príprava na súťaž (individuálna cena)",
  "Iný dôvod",
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

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
            NAPÍŠ MI
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
            Prvý krok máš na dosah! Spoj sa so mnou.
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
            Na každý e-mail odpovedám do 24 hodín
          </p>
        </div>

        {/* Form */}
        <form
          action="https://formspree.io/f/xpwzgkqr"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            fetch(form.action, {
              method: "POST",
              body: new FormData(form),
              headers: { Accept: "application/json" },
            }).then((res) => {
              if (res.ok) setSubmitted(true);
            });
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
              style={inputStyle}
            >
              <option value="">Vyber typ služby...</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
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

          {/* Submit */}
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <button
              type="submit"
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
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#cf2e2e")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f73131")}
            >
              ODOSLAŤ
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
