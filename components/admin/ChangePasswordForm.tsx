"use client";

import { useState } from "react";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  color: "#2b2b2b",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: 14,
  border: "1px solid #ccc",
  borderRadius: 6,
  outline: "none",
  boxSizing: "border-box",
};

export default function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (next !== confirm) {
      setError("Nové heslá sa nezhodujú.");
      return;
    }
    if (next.length < 8) {
      setError("Nové heslo musí mať aspoň 8 znakov.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      if (res.ok) {
        setDone(true);
        setCurrent("");
        setNext("");
        setConfirm("");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Zmena hesla zlyhala.");
      }
    } catch {
      setError("Chyba siete.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div
        style={{
          maxWidth: 480,
          padding: 20,
          fontSize: 14,
          color: "#0a7d33",
          backgroundColor: "#eafaf0",
          border: "1px solid #b6e6c8",
          borderRadius: 8,
        }}
      >
        ✅ Heslo bolo zmenené. Nabudúce sa prihlás novým heslom.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        maxWidth: 480,
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        borderLeft: "4px solid #f73131",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div>
        <label htmlFor="current" style={labelStyle}>
          Súčasné heslo
        </label>
        <input
          id="current"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
          autoComplete="current-password"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="next" style={labelStyle}>
          Nové heslo (min. 8 znakov)
        </label>
        <input
          id="next"
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          required
          autoComplete="new-password"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="confirm" style={labelStyle}>
          Zopakuj nové heslo
        </label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          autoComplete="new-password"
          style={inputStyle}
        />
      </div>

      {error && (
        <div
          style={{
            padding: 12,
            fontSize: 13,
            color: "#b00020",
            backgroundColor: "#ffeaea",
            borderRadius: 4,
            border: "1px solid #f5c2c2",
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#f73131",
          color: "#fff",
          border: 0,
          padding: "14px 0",
          borderRadius: 9999,
          fontSize: 14,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Ukladám…" : "Zmeniť heslo"}
      </button>
    </form>
  );
}
