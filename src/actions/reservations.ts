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
  const user = await getUser();

  try {
    const reservation = await prisma.reservation.create({
      data: {
        ...input,
        userId: user?.id ?? null,
      },
    });

    revalidatePath('/account');
    return { success: true, reservation };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create reservation.' };
  }
}
