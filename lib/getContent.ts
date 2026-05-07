import { sanityClient, sanityEnabled } from './sanity/client';
import {
  siteSettingsQuery,
  servicesQuery,
  transformationsQuery,
  testimonialsQuery,
} from './sanity/queries';
import {
  siteSettings as fallbackSiteSettings,
  services as fallbackServices,
  transformations as fallbackTransformations,
  testimonials as fallbackTestimonials,
} from './content';
import type {
  SiteSettings,
  Service,
  Transformation,
  Testimonial,
} from './content/types';

const fetchOptions = { next: { revalidate: 60, tags: ['sanity-content'] } };

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityEnabled || !sanityClient) return fallbackSiteSettings;
  const data = await sanityClient.fetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    fetchOptions,
  );
  return data ?? fallbackSiteSettings;
}

export async function getServices(): Promise<Service[]> {
  if (!sanityEnabled || !sanityClient) return fallbackServices;
  const data = await sanityClient.fetch<Service[]>(
    servicesQuery,
    {},
    fetchOptions,
  );
  return data.length > 0 ? data : fallbackServices;
}

export async function getTransformations(): Promise<Transformation[]> {
  if (!sanityEnabled || !sanityClient) return fallbackTransformations;
  const data = await sanityClient.fetch<Transformation[]>(
    transformationsQuery,
    {},
    fetchOptions,
  );
  return data.length > 0 ? data : fallbackTransformations;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!sanityEnabled || !sanityClient) return fallbackTestimonials;
  const data = await sanityClient.fetch<Testimonial[]>(
    testimonialsQuery,
    {},
    fetchOptions,
  );
  return data.length > 0 ? data : fallbackTestimonials;
}
