import { z } from 'zod';
import validator from 'validator';

// ── Password strength helper ──────────────────────────────────

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 4) return { score, label: 'Fair', color: 'bg-amber-500' };
  if (score === 5) return { score, label: 'Good', color: 'bg-blue-500' };
  return { score, label: 'Strong', color: 'bg-green-500' };
}

// ── Common field schemas ──────────────────────────────────────

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .refine(
    (val) => validator.isAlpha(val.replace(/\s/g, ''), 'en-US', { ignore: "'-" }),
    'Name can only contain letters, spaces, hyphens and apostrophes'
  );

export const emailSchema = z
  .string()
  .max(100, 'Email must be less than 100 characters')
  .refine((val) => validator.isEmail(val), 'Invalid email address');

export const phoneSchema = z
  .string()
  .min(7, 'Phone number is too short')
  .max(20, 'Phone number is too long')
  .refine(
    (val) => validator.isMobilePhone(val, 'any', { strictMode: false }),
    'Invalid phone number'
  );

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(64, 'Password must be less than 64 characters')
  .refine((val) => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
  .refine((val) => /[a-z]/.test(val), 'Password must contain at least one lowercase letter')
  .refine((val) => /[0-9]/.test(val), 'Password must contain at least one number');

export const notesSchema = z.string().max(500, 'Notes must be less than 500 characters').optional();

export const subjectSchema = z
  .string()
  .min(3, 'Subject must be at least 3 characters')
  .max(100, 'Subject must be less than 100 characters');

export const messageSchema = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(1000, 'Message must be less than 1000 characters');

export const commentSchema = z
  .string()
  .max(500, 'Comment must be less than 500 characters')
  .optional();

export const addressSchema = z
  .string()
  .min(5, 'Address must be at least 5 characters')
  .max(200, 'Address must be less than 200 characters');

// ── Form schemas ──────────────────────────────────────────────

export const signInSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, 'Password is required')
    .max(64, 'Password must be less than 64 characters'),
});

export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

export const reservationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  date: z.date({ error: 'Please select a date' }),
  time: z.string().min(1, 'Please select a time'),
  partySize: z.string().min(1, 'Please select a party size'),
  notes: notesSchema,
});

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: subjectSchema,
  message: messageSchema,
});

export const checkoutSchema = z.object({
  deliveryName: nameSchema,
  deliveryPhone: phoneSchema,
  deliveryAddress: addressSchema,
  deliveryNotes: notesSchema,
});

export const profileSchema = z.object({
  name: nameSchema,
  phone: phoneSchema.optional().or(z.literal('')),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5, 'Rating cannot exceed 5'),
  comment: commentSchema,
});

export const menuItemSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  price: z.number().min(1, 'Price must be at least 1').max(100000, 'Price is too high'),
  tags: z.string().max(200, 'Tags must be less than 200 characters').optional(),
  ingredients: z.string().max(500, 'Ingredients must be less than 500 characters').optional(),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ReservationInput = z.infer<typeof reservationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type MenuItemInput = z.infer<typeof menuItemSchema>;
