"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Marek",
    text: "Dominik je profesionál na správnom mieste. Za 6 mesiacov som schudol 15 kg a cítim sa lepšie ako kedykoľvek predtým. Jeho prístup založený na dátach a faktoch je presne to, čo som potreboval.",
  },
  {
    name: "Peter",
    text: "Vďaka Dominikovi som sa kvalifikoval na svoju prvú súťaž v Men's Physique. Individuálny prístup a odborné vedenie na každom kroku. Odporúčam každému, kto to myslí vážne.",
  },
  {
    name: "Andrea",
    text: "Konečne tréner, ktorý vie čo robí. Žiadne mýty ani zbytočné doplnky výživy. Science-based prístup a reálne výsledky. Po 3 mesiacoch som dosiahla svoju cieľovú váhu.",
  },
  {
    name: "Michaela",
    text: "Dominik mi pomohol pochopiť, že stravovanie nie je o hladovaní. S jeho jedálničkom jem viac ako predtým a pritom chudnem. Najlepšia investícia do seba.",
  },
  {
    name: "Tomáš",
    text: "Trénujem s Dominikom už rok a výsledky sú neuveriteľné. Nabral som 8 kg svalovej hmoty a cítim sa silnejší ako kedykoľvek predtým. Top tréner v Trnave.",
  },
  {
    name: "Barbora",
    text: "Online coaching s Dominikom je super riešenie. Aj keď nie som z Trnavy, komunikácia funguje perfektne. Týždenné check-iny a úpravy plánu podľa mojich výsledkov.",
  },
];

export default function Testimonials() {
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
            Čo hovoria ostatní
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

        {/* Carousel */}
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
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
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
                {/* Text */}
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
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Separator */}
                <div
                  style={{
                    width: 40,
                    height: 2,
                    backgroundColor: "#f73131",
                    margin: "0 auto 16px",
                  }}
                />

                {/* Name */}
                <p
                  style={{
                    fontFamily:
                      "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#2b2b2b",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: 0,
                  }}
                >
                  {t.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
