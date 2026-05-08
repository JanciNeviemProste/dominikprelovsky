"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const photos: string[] = [
  ...[
    "image0", "image1", "image2", "image3", "image4",
    "image5", "image6", "image7", "image8", "image9",
    "image10", "image11", "image12", "image13", "image14",
    "image15", "image16", "image17", "image18", "image19",
    "image20", "image21", "image22", "image23", "image24",
    "image26", "image28", "image29",
  ].map((n) => `/images/transformations/${n}.jpeg`),
  "/images/transformations/image30.png",
];

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
            Premeny klientov
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
            Za moju kariéru trénera od roku 2016 prešli mojimi rukami stovky
            klientov. Či sa jednalo o bežných ľudí, profi alebo amatérskych
            športovcov — práca s ľuďmi je špecifická tým, že každý je iný.
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
            Doteraz som sa nestretol s klientom, s ktorým by sme akýkoľvek
            problém nevyriešili. Presvedč sa sám premenami. Poď do toho aj ty.
          </p>
          <a
            href="/kontakt?sluzba=online-coaching"
            className="btn-outline"
          >
            POĎ DO TOHO UŽ TERAZ
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
            {photos.map((src, i) => (
              <SwiperSlide key={src}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#000",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Premena klienta č. ${i + 1} — pred a po`}
                    fill
                    sizes="(min-width: 768px) 600px, 100vw"
                    style={{ objectFit: "contain" }}
                    priority={i === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
