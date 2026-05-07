import { z } from 'zod';

export const kontaktSchema = z.object({
  name: z
    .string()
    .min(2, 'Meno je povinné')
    .max(100, 'Meno je príliš dlhé'),
  email: z.string().email('Zadaj platný email'),
  phone: z
    .string()
    .max(50, 'Telefón je príliš dlhý')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Správa musí mať aspoň 10 znakov')
    .max(2000, 'Správa je príliš dlhá'),
});

export type KontaktData = z.infer<typeof kontaktSchema>;
