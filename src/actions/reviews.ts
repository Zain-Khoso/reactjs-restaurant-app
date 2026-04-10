'use server';

import { revalidatePath } from 'next/cache';
import { requireUser } from '@/utils/session';
import prisma from '@/utils/prisma';

export async function getMenuItemReviews(menuItemId: string) {
  return prisma.review.findMany({
    where: { menuItemId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createReview(input: {
  menuItemId: string;
  rating: number;
  comment?: string;
}) {
  const user = await requireUser();

  // Check if user already reviewed this item
  const existing = await prisma.review.findUnique({
    where: {
      userId_menuItemId: {
        userId: user.id,
        menuItemId: input.menuItemId,
      },
    },
  });

  if (existing) {
    return { success: false, error: 'You have already reviewed this item.' };
  }

  await prisma.review.create({
    data: {
      userId: user.id,
      menuItemId: input.menuItemId,
      rating: input.rating,
      comment: input.comment ?? null,
    },
  });

  revalidatePath('/menu');
  return { success: true };
}

export async function deleteReview(id: string) {
  const user = await requireUser();

  await prisma.review.delete({
    where: { id, userId: user.id },
  });

  revalidatePath('/menu');
  return { success: true };
}
