'use server';

import { prisma } from '@/utils/prisma';
import { getUser } from '@/utils/session';
import { revalidatePath } from 'next/cache';

export type ReservationInput = {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  partySize: number;
  notes?: string;
};

export async function createReservation(input: ReservationInput) {
  try {
    const user = await getUser();

    const reservation = await prisma.reservation.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        date: input.date,
        time: input.time,
        partySize: input.partySize,
        notes: input.notes ?? null,
        userId: user?.id ?? null,
        status: 'PENDING',
      },
    });

    revalidatePath('/account');
    revalidatePath('/admin/reservations');
    return { success: true, reservation };
  } catch (error) {
    console.error('createReservation error:', error);
    return { success: false, error: 'Failed to create reservation. Please try again.' };
  }
}
