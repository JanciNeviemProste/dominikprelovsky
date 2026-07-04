import { Lock, PlayCircle } from "lucide-react";
import settings from "@/data/site-settings.json";

const s = settings.premiumVideosSection;

export default function PremiumVideos() {
  return (
    <section
      id="premium-videa"
      className="w-full"
      style={{ backgroundColor: "#101010", padding: "80px 20px" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 6vw, 60px)",
            color: "#fff",
            margin: 0,
            letterSpacing: "1px",
          }}
        >
          {s.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: 16,
            color: "#f73131",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            margin: "8px 0 24px",
          }}
        >
          {s.subtitle}
        </p>
        <p
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: 15,
            color: "#cfcfcf",
            lineHeight: 1.7,
            maxWidth: 640,
            margin: "0 auto 36px",
          }}
        >
          {s.text}
        </p>

        {/* Ukážka zamknutých videí */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 36,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                borderRadius: 10,
                overflow: "hidden",
                background:
                  "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
                border: "1px solid #2e2e2e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlayCircle size={40} color="#555" />
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 11,
                  color: "#fff",
                  backgroundColor: "rgba(247,49,49,0.9)",
                  padding: "4px 8px",
                  borderRadius: 999,
                  fontWeight: 600,
                }}
              >
                <Lock size={12} /> Členovia
              </span>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: 14,
            color: "#9a9a9a",
            margin: "0 0 20px",
          }}
        >
          {s.note}
        </p>

        <a
          href={s.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            backgroundColor: "#f73131",
            color: "#fff",
            textDecoration: "none",
            padding: "16px 40px",
            borderRadius: 9999,
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          {s.ctaText}
        </a>
      </div>
    </section>
  );
}
