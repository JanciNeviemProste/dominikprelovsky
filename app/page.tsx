import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Philosophy from "@/components/Philosophy";
import AboutSection from "@/components/AboutSection";
import CtaSection from "@/components/CtaSection";
import Services from "@/components/Services";
import Transformations from "@/components/Transformations";
import Testimonials from "@/components/Testimonials";
import SocialMedia from "@/components/SocialMedia";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        <Hero />
        <Highlights />
        <Philosophy />
        <AboutSection />
        <CtaSection />
        <Services />
        <Transformations />
        <Testimonials />
        <SocialMedia />
      </main>
      <Footer />
    </>
  );
}
