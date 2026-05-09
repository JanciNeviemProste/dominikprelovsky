"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Editable from "@/components/admin/Editable";
type Testimonial = {
  clientName: string;
  role?: string;
  rating?: number;
  text: string;
};

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: Props) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      spaceBetween={40}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 2 },
      }}
      style={{ paddingBottom: 56 }}
    >
      {testimonials.map((t, i) => (
        <SwiperSlide key={`${t.clientName}-${i}`}>
          <div
            style={{
              textAlign: "center",
              padding: "40px 32px",
              backgroundColor: "#ffffff",
              borderRadius: 12,
              minHeight: 240,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily:
                  "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.8,
                fontStyle: "italic",
                marginBottom: 20,
                color: "#2b2b2b",
              }}
            >
              &ldquo;
              <Editable
                contentType="testimonials"
                path={`${i}.text`}
                value={t.text}
                label={`Recenzia ${i + 1} — text`}
                multiline
              >
                {t.text}
              </Editable>
              &rdquo;
            </p>

            <div
              style={{
                width: 40,
                height: 2,
                backgroundColor: "#f73131",
                margin: "0 auto 16px",
              }}
            />

            <p
              style={{
                fontFamily:
                  "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#2b2b2b",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: t.role ? 4 : 0,
              }}
            >
              <Editable
                contentType="testimonials"
                path={`${i}.clientName`}
                value={t.clientName}
                label={`Recenzia ${i + 1} — meno klienta`}
              >
                {t.clientName}
              </Editable>
            </p>
            {t.role && (
              <p
                style={{
                  fontFamily:
                    "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: 12,
                  fontWeight: 300,
                  color: "#888",
                  marginBottom: 0,
                }}
              >
                <Editable
                  contentType="testimonials"
                  path={`${i}.role`}
                  value={t.role}
                  label={`Recenzia ${i + 1} — rola klienta`}
                >
                  {t.role}
                </Editable>
              </p>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
