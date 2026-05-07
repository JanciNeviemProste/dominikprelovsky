import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nastavenia stránky',
  type: 'document',
  fields: [
    defineField({ name: 'heroName', title: 'Meno v heroi', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Podnadpis hero', type: 'string' }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Pozadie hero',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profilová fotka',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'shortBio', title: 'Krátky bio', type: 'text', rows: 5 }),
    defineField({
      name: 'howIWorkSteps',
      title: 'Ako pracujem (3 body)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Číslo', type: 'number' },
            { name: 'title', title: 'Nadpis', type: 'string' },
            { name: 'body', title: 'Text', type: 'text', rows: 4 },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({ name: 'youtubeUrl', title: 'YouTube uvítacie video URL', type: 'url' }),
    defineField({ name: 'heroHeroUrl', title: 'HeroHero URL', type: 'url' }),
    defineField({
      name: 'social',
      title: 'Sociálne siete',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
        { name: 'youtube', title: 'YouTube kanál', type: 'url' },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Kontakt',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Telefón', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'address', title: 'Adresa', type: 'string' },
        { name: 'googleMapsEmbedUrl', title: 'Google Maps embed URL', type: 'url' },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Nastavenia stránky' }) },
});
