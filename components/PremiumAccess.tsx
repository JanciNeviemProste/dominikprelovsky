"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const btnPrimary: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#f73131",
  color: "#fff",
  border: 0,
  textDecoration: "none",
  padding: "16px 40px",
  borderRadius: 9999,
  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
  fontSize: 14,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 340,
  padding: "14px 16px",
  fontSize: 14,
  border: "1px solid #333",
  borderRadius: 8,
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#fff",
  color: "#2b2b2b",
};

function Inner({ ctaText }: { ctaText: string }) {
  const params = useSearchParams();
  const showLogin = params.get("login") === "1";
  const errorParam = params.get("error");

  const [email, setEmail] = useState("");
  const [buying, setBuying] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const errorText =
    errorParam === "expired"
      ? "Prihlasovací odkaz vypršal. Pošli si nový nižšie."
      : errorParam === "nomember"
        ? "Na tomto e-maile nemáš aktívne členstvo. Kúp si ho nižšie."
        : null;

  async function buy() {
    setBuying(true);
    setMsg(null);
    try {
      const res = await fetch("/api/premium/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || undefined }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setMsg(data.error || "Platbu sa nepodarilo spustiť.");
    } catch {
      setMsg("Chyba siete.");
    } finally {
      setBuying(false);
    }
  }

  async function sendLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setMsg(null);
    try {
      const res = await fetch("/api/premium/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
      } else {
        setMsg(data.error || "Odoslanie zlyhalo.");
      }
    } catch {
      setMsg("Chyba siete.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      {errorText && (
        <p
          style={{
            fontSize: 14,
            color: "#ffb4b4",
            backgroundColor: "rgba(247,49,49,0.1)",
            border: "1px solid rgba(247,49,49,0.4)",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 20,
          }}
        >
          {errorText}
        </p>
      )}

      {/* Kúpa členstva */}
      <button type="button" onClick={buy} disabled={buying} style={{ ...btnPrimary, opacity: buying ? 0.6 : 1 }}>
        {buying ? "Presmerúvam…" : ctaText}
      </button>

      {/* Prihlásenie existujúceho člena */}
      <div style={{ marginTop: 28 }}>
        <p style={{ fontSize: 14, color: "#bdbdbd", marginBottom: 12 }}>
          Už si člen? Prihlás sa e-mailom:
        </p>
        {sent ? (
          <p
            style={{
              fontSize: 14,
              color: "#8ef0b0",
              backgroundColor: "rgba(16,185,79,0.1)",
              border: "1px solid rgba(16,185,79,0.4)",
              borderRadius: 8,
              padding: "12px 16px",
            }}
          >
            ✅ Poslali sme ti prihlasovací odkaz na {email}. Skontroluj si e-mail (aj spam).
          </p>
        ) : (
          <form onSubmit={sendLink} style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            <input
              type="email"
              required
              placeholder="tvoj@email.sk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              autoComplete="email"
            />
            <button type="submit" disabled={sending} style={{ ...btnPrimary, opacity: sending ? 0.6 : 1 }}>
              {sending ? "Posielam…" : "Poslať odkaz"}
            </button>
          </form>
        )}
      </div>

      {msg && (
        <p style={{ fontSize: 13, color: "#ffb4b4", marginTop: 16 }}>{msg}</p>
      )}
      {showLogin && !sent && (
        <p style={{ fontSize: 12, color: "#8a8a8a", marginTop: 12 }}>
          Zadaj e-mail, ktorým si platil(a) členstvo.
        </p>
      )}
    </div>
  );
}

export default function PremiumAccess({ ctaText }: { ctaText: string }) {
  return (
    <Suspense fallback={null}>
      <Inner ctaText={ctaText} />
    </Suspense>
  );
}
