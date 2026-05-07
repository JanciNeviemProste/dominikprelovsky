export type SocialLinks = {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  address: string;
  googleMapsEmbedUrl: string;
};

export type HowIWorkStep = {
  number: number;
  title: string;
  body: string;
};

export type SiteSettings = {
  heroName: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  profilePhoto: string;
  shortBio: string;
  longBio: string[];
  howIWorkSteps: HowIWorkStep[];
  youtubeUrl: string;
  heroHeroUrl: string;
  social: SocialLinks;
  contact: ContactInfo;
};

export type Service = {
  order: number;
  slug: string;
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
  price: number;
  priceUnit: string;
  featured?: boolean;
  ctaLabel: string;
};

export type Transformation = {
  order: number;
  image: string;
  alt: string;
  headline?: string;
  caption?: string;
};

export type Testimonial = {
  order: number;
  clientName: string;
  role?: string;
  rating: number;
  text: string;
  clientPhoto?: string;
};
