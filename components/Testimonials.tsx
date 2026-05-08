import { getTestimonials } from "@/lib/getTestimonials";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "#eeeeee", padding: "80px 0" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
        {/* Heading */}
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
            Čo hovoria klienti
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
            Skutočný feedback od skutočných ľudí
          </p>
        </div>

        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
