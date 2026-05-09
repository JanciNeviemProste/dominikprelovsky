import testimonialsData from "@/data/testimonials.json";
import settings from "@/data/site-settings.json";
import TestimonialsCarousel from "./TestimonialsCarousel";
import Editable from "@/components/admin/Editable";

export default function Testimonials() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: "#eeeeee", padding: "80px 0" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "80px",
              fontWeight: 400,
              marginBottom: 0,
              color: "#2b2b2b",
            }}
          >
            <Editable
              contentType="site-settings"
              path="testimonialsSection.title"
              value={settings.testimonialsSection.title}
              label="Recenzie — nadpis"
            >
              {settings.testimonialsSection.title}
            </Editable>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 19,
              fontWeight: 300,
              color: "#888888",
              marginBottom: 0,
            }}
          >
            <Editable
              contentType="site-settings"
              path="testimonialsSection.subtitle"
              value={settings.testimonialsSection.subtitle}
              label="Recenzie — podtitulok"
            >
              {settings.testimonialsSection.subtitle}
            </Editable>
          </p>
        </div>

        <TestimonialsCarousel testimonials={testimonialsData} />
      </div>
    </section>
  );
}
