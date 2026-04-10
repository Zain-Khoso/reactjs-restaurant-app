'use server';

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContactForm(input: ContactInput) {
  // Basic validation
  if (!input.name || !input.email || !input.subject || !input.message) {
    return { success: false, error: 'All fields are required.' };
  }

  // For now we just log it — later you can wire up email (Resend, Nodemailer etc.)
  console.log('Contact form submission:', input);

  // Optionally store in DB — add a ContactMessage model later if needed
  return { success: true };
}
