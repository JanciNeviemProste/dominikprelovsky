export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  heroName,
  heroSubtitle,
  "heroBackgroundImage": heroBackgroundImage.asset->url,
  "profilePhoto": profilePhoto.asset->url,
  shortBio,
  howIWorkSteps[]{ number, title, body },
  youtubeUrl,
  heroHeroUrl,
  social { instagram, tiktok, youtube },
  contact { phone, email, address, googleMapsEmbedUrl }
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc){
  order,
  "slug": slug.current,
  title,
  tagline,
  body,
  bullets,
  price,
  priceUnit,
  featured,
  ctaLabel
}`;

export const transformationsQuery = `*[_type == "transformation"] | order(order asc){
  order,
  "image": image.asset->url,
  "alt": image.alt,
  headline,
  caption
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  order,
  clientName,
  role,
  rating,
  text,
  "clientPhoto": clientPhoto.asset->url
}`;
