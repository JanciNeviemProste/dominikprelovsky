import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import AboutSection from "@/components/AboutSection";
import YouTubeWelcome from "@/components/YouTubeWelcome";
import Services from "@/components/Services";
import CtaSection from "@/components/CtaSection";
import Transformations from "@/components/Transformations";
import Testimonials from "@/components/Testimonials";
import PremiumVideos from "@/components/PremiumVideos";
import Highlights from "@/components/Highlights";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        <Hero />
        <Philosophy />
        <AboutSection />
        <YouTubeWelcome />
        <Services />
        <CtaSection />
        <Transformations />
        <Testimonials />
        <PremiumVideos />
        <Highlights />
      </main>
      <Footer />
    </>
  );
}
