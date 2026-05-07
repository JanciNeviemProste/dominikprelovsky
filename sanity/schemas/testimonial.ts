import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Recenzia',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Poradie',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'clientName', title: 'Meno klienta', type: 'string' }),
    defineField({ name: 'role', title: 'Rola / typ spolupráce', type: 'string' }),
    defineField({
      name: 'rating',
      title: 'Hodnotenie (1–5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({ name: 'text', title: 'Text recenzie', type: 'text', rows: 4 }),
    defineField({
      name: 'clientPhoto',
      title: 'Foto klienta',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [{ title: 'Poradie', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});
