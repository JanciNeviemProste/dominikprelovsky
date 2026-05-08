"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Chyba pri prihlásení.");
      }
    } catch {
      setError("Chyba siete.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "48px 40px",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
          borderTop: "4px solid #f73131",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 36,
            color: "#2b2b2b",
            margin: 0,
            marginBottom: 8,
          }}
        >
          ADMIN PRIHLÁSENIE
        </h1>
        <p style={{ color: "#888", fontSize: 14, margin: 0, marginBottom: 32 }}>
          Zadaj heslo pre prístup do panela recenzií.
        </p>

        <label
          htmlFor="password"
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 6,
            color: "#2b2b2b",
          }}
        >
          Heslo
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: 14,
            border: "1px solid #ccc",
            borderRadius: 6,
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <div
            style={{
              marginTop: 16,
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
            marginTop: 24,
            width: "100%",
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
            transition: "background-color 0.2s",
          }}
        >
          {loading ? "Prihlasujem…" : "Prihlásiť sa"}
        </button>

        <a
          href="/"
          style={{
            display: "block",
            marginTop: 16,
            textAlign: "center",
            color: "#888",
            fontSize: 12,
            textDecoration: "none",
          }}
        >
          ← späť na web
        </a>
      </form>
    </div>
  );
}
