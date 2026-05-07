import { defineType, defineField } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Služba',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Poradie',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({ name: 'title', title: 'Názov', type: 'string' }),
    defineField({ name: 'tagline', title: 'Podtitulok', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Popis', type: 'text', rows: 4 }),
    defineField({
      name: 'bullets',
      title: 'Body',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'price', title: 'Cena', type: 'number' }),
    defineField({
      name: 'priceUnit',
      title: 'Jednotka ceny',
      type: 'string',
      options: { list: ['€', '€/hod', '€/tréning', '€/mesiac'] },
    }),
    defineField({ name: 'featured', title: 'Zvýraznená', type: 'boolean' }),
    defineField({ name: 'ctaLabel', title: 'CTA text', type: 'string' }),
  ],
  orderings: [{ title: 'Poradie', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});
