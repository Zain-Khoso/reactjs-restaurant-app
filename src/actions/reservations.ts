'use server';

import prisma from '@/utils/prisma';
import { getUser } from '@/utils/session';
import { revalidatePath } from 'next/cache';
import { reservationSchema } from '@/utils/validations';
import { sanitizeInput, sanitizeOptional } from '@/utils/sanitize';

export async function createReservation(input: {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  partySize: number;
  notes?: string;
}) {
  try {
    const user = await getUser();

    // Validate
    const parsed = reservationSchema.safeParse({
      ...input,
      partySize: input.partySize.toString(),
    });

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.message ?? 'Invalid input.',
      };
    }

    // Sanitize before saving
    const reservation = await prisma.reservation.create({
      data: {
        name: sanitizeInput(input.name),
        email: sanitizeInput(input.email),
        phone: sanitizeInput(input.phone),
        date: input.date,
        time: sanitizeInput(input.time),
        partySize: input.partySize,
        notes: sanitizeOptional(input.notes),
        userId: user?.id ?? null,
        status: 'PENDING',
      },
    });

    revalidatePath('/account');
    revalidatePath('/admin/reservations');
    return { success: true, reservation };
  } catch (error) {
    console.error('createReservation error:', error);
    return { success: false, error: 'Failed to create reservation.' };
  }
}
