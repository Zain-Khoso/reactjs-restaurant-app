'use server';

import { prisma } from '@/utils/prisma';

export async function getMenuItems() {
  return prisma.menuItem.findMany({
    where: { available: true },
    include: { category: true },
    orderBy: { createdAt: 'asc' },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
  });
}

export async function getFeaturedItems() {
  return prisma.menuItem.findMany({
    where: { featured: true, available: true },
    include: { category: true },
    take: 4,
  });
}
