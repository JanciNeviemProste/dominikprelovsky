import {
  HeroSection,
  AkoPracujemSection,
  TrainerProfileSection,
  YouTubeWelcomeSection,
  ServicesSection,
  TransformationsSection,
  TestimonialsSection,
  HeroHeroLinkSection,
} from '@/components/sections';
import {
  getSiteSettings,
  getServices,
  getTransformations,
  getTestimonials,
} from '@/lib/getContent';

export default async function Home() {
  const [settings, services, transformations, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTransformations(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <AkoPracujemSection steps={settings.howIWorkSteps} />
      <TrainerProfileSection settings={settings} />
      <YouTubeWelcomeSection youtubeUrl={settings.youtubeUrl} />
      <ServicesSection services={services} />
      <TransformationsSection items={transformations} />
      <TestimonialsSection testimonials={testimonials} />
      <HeroHeroLinkSection url={settings.heroHeroUrl} />
    </>
  );
}
