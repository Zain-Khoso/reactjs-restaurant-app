'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/utils/session';
import prisma from '@/utils/prisma';
import { sanitizeArray, sanitizeInput } from '@/utils/sanitize';
import { menuItemSchema } from '@/utils/validations';
import { MenuItem } from '@/prisma/client';

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
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'CANCELLED' } },
    }),
    prisma.reservation.count({
      where: { status: { not: 'CANCELLED' } },
    }),
    prisma.user.count({
      where: { role: 'CUSTOMER' }, // ← string literal, not enum reference
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
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

export async function createMenuItem(data: MenuItem) {
  await requireAdmin();

  const parsed = menuItemSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.message ?? 'Invalid input.',
    };
  }

  await prisma.menuItem.create({
    data: {
      name: sanitizeInput(data.name),
      slug: sanitizeInput(data.slug),
      description: sanitizeInput(data.description),
      price: data.price,
      categoryId: data.categoryId,
      image: data.image ?? null,
      tags: sanitizeArray(data.tags),
      ingredients: sanitizeArray(data.ingredients),
      featured: data.featured,
      available: data.available,
    },
  });

  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}

export async function updateMenuItem(id: string, data: MenuItem) {
  await requireAdmin();

  await prisma.menuItem.update({
    where: { id },
    data: {
      ...(data.name && { name: sanitizeInput(data.name) }),
      ...(data.slug && { slug: sanitizeInput(data.slug) }),
      ...(data.description && { description: sanitizeInput(data.description) }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.categoryId && { categoryId: data.categoryId }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.tags && { tags: sanitizeArray(data.tags) }),
      ...(data.ingredients && { ingredients: sanitizeArray(data.ingredients) }),
      ...(data.featured !== undefined && { featured: data.featured }),
      ...(data.available !== undefined && { available: data.available }),
    },
  });

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
    include: { user: true, table: true },
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

export async function getPageContent(key: string) {
  return prisma.pageContent.findUnique({
    where: { key },
  });
}

export async function getAllPageContent() {
  await requireAdmin();
  return prisma.pageContent.findMany({
    orderBy: { key: 'asc' },
  });
}

export async function updatePageContent(key: string, data: { title: string; content: string }) {
  await requireAdmin();

  await prisma.pageContent.upsert({
    where: { key },
    update: {
      title: sanitizeInput(data.title),
      content: sanitizeInput(data.content),
    },
    create: {
      key,
      title: sanitizeInput(data.title),
      content: sanitizeInput(data.content),
    },
  });

  revalidatePath(`/${key}`);
  revalidatePath('/admin/pages');
  return { success: true };
}

// ── Chefs ─────────────────────────────────────────────────────

export async function getChefs() {
  try {
    return prisma.chef.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
  } catch {
    return [];
  }
}

export async function getAllChefs() {
  await requireAdmin();
  return prisma.chef.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function createChef(data: {
  name: string;
  cuisine: string;
  image?: string;
  sortOrder?: number;
}) {
  await requireAdmin();
  await prisma.chef.create({
    data: {
      name: sanitizeInput(data.name),
      cuisine: sanitizeInput(data.cuisine),
      image: data.image ?? null,
      sortOrder: data.sortOrder ?? 0,
    },
  });
  revalidatePath('/admin/home');
  revalidatePath('/');
  revalidatePath('/about');
  return { success: true };
}

export async function updateChef(
  id: string,
  data: {
    name?: string;
    cuisine?: string;
    image?: string;
    sortOrder?: number;
    active?: boolean;
  }
) {
  await requireAdmin();
  await prisma.chef.update({
    where: { id },
    data: {
      ...(data.name && { name: sanitizeInput(data.name) }),
      ...(data.cuisine && { cuisine: sanitizeInput(data.cuisine) }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      ...(data.active !== undefined && { active: data.active }),
    },
  });
  revalidatePath('/admin/home');
  revalidatePath('/');
  revalidatePath('/about');
  return { success: true };
}

export async function deleteChef(id: string) {
  await requireAdmin();
  await prisma.chef.delete({ where: { id } });
  revalidatePath('/admin/home');
  revalidatePath('/');
  revalidatePath('/about');
  return { success: true };
}

// ── Testimonials ──────────────────────────────────────────────

export async function getTestimonials() {
  try {
    return prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
  } catch {
    return [];
  }
}

export async function getAllTestimonials() {
  await requireAdmin();
  return prisma.testimonial.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function createTestimonial(data: {
  name: string;
  location: string;
  comment: string;
  image?: string;
  sortOrder?: number;
}) {
  await requireAdmin();
  await prisma.testimonial.create({
    data: {
      name: sanitizeInput(data.name),
      location: sanitizeInput(data.location),
      comment: sanitizeInput(data.comment),
      image: data.image ?? null,
      sortOrder: data.sortOrder ?? 0,
    },
  });
  revalidatePath('/admin/home');
  revalidatePath('/');
  return { success: true };
}

export async function updateTestimonial(
  id: string,
  data: {
    name?: string;
    location?: string;
    comment?: string;
    image?: string;
    sortOrder?: number;
    active?: boolean;
  }
) {
  await requireAdmin();
  await prisma.testimonial.update({
    where: { id },
    data: {
      ...(data.name && { name: sanitizeInput(data.name) }),
      ...(data.location && { location: sanitizeInput(data.location) }),
      ...(data.comment && { comment: sanitizeInput(data.comment) }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      ...(data.active !== undefined && { active: data.active }),
    },
  });
  revalidatePath('/admin/home');
  revalidatePath('/');
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath('/admin/home');
  revalidatePath('/');
  return { success: true };
}

export async function getFeaturedItems() {
  return prisma.menuItem.findMany({
    where: { available: true },
    select: { id: true, name: true, image: true, featured: true },
    orderBy: { name: 'asc' },
  });
}

export async function getTables() {
  await requireAdmin();
  return prisma.table.findMany({
    orderBy: { number: 'asc' },
  });
}

export async function getAvailableTables(date: Date, time: string) {
  await requireAdmin();

  // Get all tables
  const allTables = await prisma.table.findMany({
    where: { active: true },
    orderBy: { number: 'asc' },
  });

  // Get tables already reserved at this date+time
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const takenTableIds = await prisma.reservation.findMany({
    where: {
      date: { gte: startOfDay, lte: endOfDay },
      time,
      status: { not: 'CANCELLED' },
      tableId: { not: null },
    },
    select: { tableId: true },
  });

  const takenIds = new Set(takenTableIds.map((r) => r.tableId));

  return allTables.filter((t) => !takenIds.has(t.id));
}

export async function assignTableToReservation(reservationId: string, tableId: string) {
  await requireAdmin();

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  });

  if (!reservation) {
    return { success: false, error: 'Reservation not found.' };
  }

  // Check table availability
  const available = await getAvailableTables(reservation.date, reservation.time);
  const isAvailable = available.some((t) => t.id === tableId);

  if (!isAvailable) {
    return {
      success: false,
      error: 'This table is already reserved at that date and time.',
    };
  }

  await prisma.reservation.update({
    where: { id: reservationId },
    data: {
      tableId,
      status: 'CONFIRMED',
    },
  });

  revalidatePath('/admin/reservations');
  revalidatePath('/account');
  return { success: true };
}
