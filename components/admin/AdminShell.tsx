"use client";

import { useRouter, usePathname } from "next/navigation";
import { ExternalLink, LogOut, ChevronLeft } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  showBackToHub?: boolean;
  children: React.ReactNode;
}

export default function AdminShell({
  title,
  subtitle,
  showBackToHub = true,
  children,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isHub = pathname === "/admin";

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 32,
          paddingBottom: 16,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          {showBackToHub && !isHub && (
            <a
              href="/admin"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "8px 12px",
                fontSize: 13,
                color: "#666",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: 6,
                backgroundColor: "#fff",
              }}
            >
              <ChevronLeft size={16} /> Späť
            </a>
          )}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 36,
                color: "#2b2b2b",
                margin: 0,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p style={{ color: "#888", fontSize: 13, margin: "4px 0 0 0" }}>{subtitle}</p>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              fontSize: 13,
              color: "#666",
              textDecoration: "none",
              border: "1px solid #ddd",
              borderRadius: 6,
              backgroundColor: "#fff",
            }}
          >
            <ExternalLink size={14} /> Pozri web
          </a>
          <button
            type="button"
            onClick={logout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              fontSize: 13,
              color: "#666",
              border: "1px solid #ddd",
              borderRadius: 6,
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            <LogOut size={14} /> Odhlásiť
          </button>
        </div>
      </header>

      {children}
    </div>
  );
}
