import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemberLogout from "@/components/MemberLogout";
import { getSessionEmail } from "@/lib/premium-auth";
import { hasActiveMembership } from "@/lib/premium-membership";
import { premiumVideos, premiumEmbedUrl } from "@/lib/premium-videos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premium knižnica — Dominik Prelovský",
  robots: { index: false, follow: false },
};

export default async function KniznicaPage() {
  const email = await getSessionEmail();
  if (!email) redirect("/premium-videa?login=1");

  const active = await hasActiveMembership(email);
  if (!active) redirect("/premium-videa?error=nomember");

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80, backgroundColor: "#101010", color: "#fff", minHeight: "70vh" }}>
        <section style={{ padding: "56px 20px 80px", maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "clamp(36px, 6vw, 56px)",
                margin: 0,
              }}
            >
              Premium knižnica
            </h1>
            <MemberLogout />
          </div>
          <p style={{ color: "#9a9a9a", fontSize: 14, margin: "0 0 32px" }}>
            Prihlásený ako {email}
          </p>

          {premiumVideos.length === 0 ? (
            <div
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                padding: "40px 24px",
                textAlign: "center",
                color: "#bdbdbd",
              }}
            >
              Videá čoskoro pribudnú. Ďakujeme, že si súčasťou! 💪
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 24,
              }}
            >
              {premiumVideos.map((v) => (
                <article key={v.id}>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "16 / 9",
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "1px solid #2a2a2a",
                      backgroundColor: "#000",
                    }}
                  >
                    <iframe
                      src={premiumEmbedUrl(v)}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      margin: "14px 0 6px",
                    }}
                  >
                    {v.title}
                  </h3>
                  {v.description && (
                    <p style={{ fontSize: 14, color: "#a9a9a9", lineHeight: 1.6, margin: 0 }}>
                      {v.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
