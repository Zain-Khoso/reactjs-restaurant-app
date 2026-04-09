'use server';

import { prisma } from '@/utils/prisma';
import { requireUser } from '@/utils/session';
import { revalidatePath } from 'next/cache';

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
  const user = await requireUser();

  await prisma.reservation.update({
    where: { id, userId: user.id },
    data: { status: 'CANCELLED' },
  });

  revalidatePath('/account');
  return { success: true };
}

export async function updateProfile(data: { name: string; phone: string }) {
  const user = await requireUser();

  await prisma.user.update({
    where: { id: user.id },
    data,
  });

  revalidatePath('/account');
  return { success: true };
}
