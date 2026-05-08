"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import transformations from "@/data/transformations.json";
import settings from "@/data/site-settings.json";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Transformations() {
  return (
    <section id="premeny" className="w-full" style={{ backgroundColor: "#ebebeb" }}>
      <div className="media-text media-right">
        {/* Text vľavo (50%) */}
        <div className="media-text__content" style={{ padding: "3em 8%" }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 50,
              lineHeight: "40px",
              fontWeight: 400,
              marginBottom: 16,
              color: "#2b2b2b",
            }}
          >
            {settings.transformationsSection.title}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#2b2b2b",
              marginBottom: 16,
            }}
          >
            {settings.transformationsSection.intro1}
          </p>
          <p
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#2b2b2b",
              marginBottom: 24,
            }}
          >
            {settings.transformationsSection.intro2}
          </p>
          <a href={settings.transformationsSection.ctaHref} className="btn-outline">
            {settings.transformationsSection.ctaText}
          </a>
        </div>

        {/* Carousel vpravo (50%) */}
        <div className="media-text__media">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            style={{ width: "100%", height: "100%" }}
          >
            {transformations.map((item, i) => (
              <SwiperSlide key={item.image}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#000",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={
                      item.caption ||
                      item.headline ||
                      `Premena klienta č. ${i + 1} — pred a po`
                    }
                    fill
                    sizes="(min-width: 768px) 600px, 100vw"
                    style={{ objectFit: "contain" }}
                    priority={i === 0}
                  />
                  {item.headline && (
                    <div
                      style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        backgroundColor: "rgba(247, 49, 49, 0.95)",
                        color: "#fff",
                        padding: "6px 14px",
                        fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                        fontSize: 24,
                        letterSpacing: "1px",
                      }}
                    >
                      {item.headline}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
