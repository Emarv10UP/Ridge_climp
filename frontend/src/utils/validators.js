import { z } from 'zod';

export const bookingFormSchema = z.object({
  expeditionId: z.string().min(1, 'Please select an expedition'),
  package: z.enum(['BASIC', 'PRO', 'EXTREME'], {
    errorMap: () => ({ message: 'Please select a package' }),
  }),
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().max(1000, 'Message is too long').optional(),
});

export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
});
