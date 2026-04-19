import { z } from 'zod';

/**
 * Shared Zod schema for the contact form — validates identically on:
 *  - Client (via @hookform/resolvers/zod in ContactForm.tsx)
 *  - Server (src/app/api/contact/route.ts)
 *
 * Error messages are i18n keys. The client component resolves them via t().
 * The server returns { issues } in 400 responses — not user-facing text.
 *
 * `consent` is NOT in the schema — it's UX-only (checkbox required to submit),
 * not a data field sent to the API.
 */

const PHONE_REGEX = /^[+\d\s()-]{6,}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'required')
    .min(2, 'tooShort')
    .max(100),
  company: z
    .string()
    .min(1, 'required')
    .min(2, 'tooShort')
    .max(120),
  email: z
    .string()
    .min(1, 'required')
    .email('invalidEmail')
    .max(120),
  phone: z
    .string()
    .max(120)
    .optional()
    .default('')
    .refine((v) => !v || PHONE_REGEX.test(v), {
      message: 'invalidPhone',
    }),
  message: z
    .string()
    .max(2000)
    .optional()
    .default(''),
});

export type ContactInput = z.infer<typeof contactSchema>;
