'use server';

import { contactSchema } from '@/utils/validations';
import { sanitizeInput } from '@/utils/sanitize';

export async function submitContactForm(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.message ?? 'Invalid input.',
    };
  }

  // Sanitized data ready for storage or email
  const sanitized = {
    name: sanitizeInput(input.name),
    email: sanitizeInput(input.email),
    subject: sanitizeInput(input.subject),
    message: sanitizeInput(input.message),
  };

  console.log('Contact form submission:', sanitized);

  return { success: true };
}
