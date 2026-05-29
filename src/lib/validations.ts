import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .trim(),
  email: z.string().email('Please enter a valid email address').trim().toLowerCase(),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be under 200 characters')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be under 5000 characters')
    .trim(),
});

export const productCreateSchema = z.object({
  title: z
    .string()
    .min(1, 'Product title is required')
    .max(200, 'Title must be under 200 characters')
    .trim(),
  src: z.string().url('Product image URL must be a valid URL').optional(),
});

export const productUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'Product title is required')
    .max(200, 'Title must be under 200 characters')
    .trim()
    .optional(),
  src: z.string().url('Product image URL must be a valid URL').optional(),
});
