import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Recenzia",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Poradie",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Meno klienta",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rola / typ spolupráce (napr. Online coaching)",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Hodnotenie (1–5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "text",
      title: "Text recenzie",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Poradie",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
