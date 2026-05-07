import { defineType, defineField } from 'sanity';

export const transformation = defineType({
  name: 'transformation',
  title: 'Premena klienta',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Poradie',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Fotka (pred / po koláž)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({ name: 'headline', title: 'Headline (napr. -20 kg)', type: 'string' }),
    defineField({ name: 'caption', title: 'Popisok', type: 'text', rows: 2 }),
  ],
  orderings: [{ title: 'Poradie', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});
