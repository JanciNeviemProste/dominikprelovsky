import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Dominik Prelovský",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
      }}
    >
      {children}
    </div>
  );
}
