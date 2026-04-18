'use server';

import { prisma } from '@/utils/prisma';
import { requireUser } from '@/utils/session';
import { revalidatePath } from 'next/cache';
import { profileSchema } from '@/utils/validations';
import { sanitizeInput } from '@/utils/sanitize';

export async function getUserOrders() {
  const user = await requireUser();

  return prisma.order.findMany({
    where: { userId: user.id },
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserReservations() {
  const user = await requireUser();

  return prisma.reservation.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });
}

export async function cancelReservation(id: string) {
  try {
    const user = await requireUser();

    await prisma.reservation.update({
      where: { id, userId: user.id },
      data: { status: 'CANCELLED' },
    });

    revalidatePath('/account');
    return { success: true };
  } catch (error) {
    console.error('cancelReservation error:', error);
    return { success: false, error: 'Failed to cancel reservation.' };
  }
}

export async function updateProfile(data: { name: string; phone: string }) {
  try {
    const user = await requireUser();

    const parsed = profileSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.message ?? 'Invalid input.',
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: sanitizeInput(data.name),
        phone: data.phone ? sanitizeInput(data.phone) : null,
      },
    });

    revalidatePath('/account');
    return { success: true };
  } catch (error) {
    console.error('updateProfile error:', error);
    return { success: false, error: 'Failed to update profile.' };
  }
}
