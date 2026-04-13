'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/utils/session';
import prisma from '@/utils/prisma';

// ── Dashboard ─────────────────────────────────────────────────

export async function getDashboardStats() {
  await requireAdmin();

  const [
    totalOrders,
    totalRevenue,
    totalReservations,
    totalCustomers,
    recentOrders,
    monthlyRevenue,
  ] = await Promise.all([
    prisma.reservation.count({
      where: { status: { not: 'CANCELLED' } },
    }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'CANCELLED' } },
    }),
    prisma.reservation.count(),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
    // Last 6 months revenue
    prisma.$queryRaw<{ month: string; revenue: number }[]>`
      SELECT
        TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon') as month,
        SUM(total) as revenue
      FROM "Order"
      WHERE
        "createdAt" >= NOW() - INTERVAL '6 months'
        AND status != 'CANCELLED'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY DATE_TRUNC('month', "createdAt") ASC
    `,
  ]);

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.total ?? 0,
    totalReservations,
    totalCustomers,
    recentOrders,
    monthlyRevenue,
  };
}

// ── Menu ──────────────────────────────────────────────────────

export async function getAdminMenuItems() {
  await requireAdmin();
  return prisma.menuItem.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAdminCategories() {
  await requireAdmin();
  return prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
  });
}

export async function createMenuItem(data: {
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  image?: string;
  tags: string[];
  featured: boolean;
  available: boolean;
}) {
  await requireAdmin();

  await prisma.menuItem.create({ data });
  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}

export async function updateMenuItem(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    categoryId?: string;
    image?: string;
    tags?: string[];
    featured?: boolean;
    available?: boolean;
  }
) {
  await requireAdmin();

  await prisma.menuItem.update({ where: { id }, data });
  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}

export async function deleteMenuItem(id: string) {
  await requireAdmin();

  // Delete related records first
  await prisma.orderItem.deleteMany({ where: { menuItemId: id } });
  await prisma.review.deleteMany({ where: { menuItemId: id } });
  await prisma.menuItem.delete({ where: { id } });

  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}

// ── Orders ────────────────────────────────────────────────────

export async function getAdminOrders() {
  await requireAdmin();
  return prisma.order.findMany({
    include: {
      user: true,
      items: { include: { menuItem: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateOrderStatus(id: string, status: string) {
  await requireAdmin();

  await prisma.order.update({
    where: { id },
    data: { status: status as any },
  });
  revalidatePath('/admin/orders');
  revalidatePath('/account');
  return { success: true };
}

// ── Reservations ──────────────────────────────────────────────

export async function getAdminReservations() {
  await requireAdmin();
  return prisma.reservation.findMany({
    include: { user: true },
    orderBy: { date: 'desc' },
  });
}

export async function updateReservationStatus(id: string, status: 'CONFIRMED' | 'CANCELLED') {
  await requireAdmin();

  await prisma.reservation.update({
    where: { id },
    data: { status },
  });
  revalidatePath('/admin/reservations');
  revalidatePath('/account');
  return { success: true };
}
