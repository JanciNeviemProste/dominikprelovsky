import philosophySteps from "@/data/philosophy.json";
import settings from "@/data/site-settings.json";

export default function Philosophy() {
  return (
    <section className="w-full bg-white" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "60px",
              fontWeight: 400,
              color: "#2b2b2b",
              marginBottom: 8,
            }}
          >
            {settings.philosophySection.title}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: "#888",
              marginBottom: 0,
            }}
          >
            {settings.philosophySection.subtitle}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {philosophySteps.map((step) => (
            <article
              key={step.number}
              style={{
                backgroundColor: "#f7f7f7",
                padding: "40px 28px",
                borderTop: "4px solid #f73131",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 64,
                  lineHeight: "1",
                  fontWeight: 400,
                  color: "#f73131",
                  marginBottom: 16,
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 18,
                  lineHeight: "24px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#2b2b2b",
                  marginBottom: 16,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "#2b2b2b",
                  margin: 0,
                }}
              >
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
