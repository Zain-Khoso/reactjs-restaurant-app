import type { Prisma } from '@/prisma/client';

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: { include: { menuItem: true } };
    user: true;
  };
}>;

export type ReservationWithRelations = Prisma.ReservationGetPayload<{
  include: { user: true; table: true };
}>;

export type MenuItemWithCategory = Prisma.MenuItemGetPayload<{
  include: { category: true };
}>;

export type OrderItemWithMenuItem = Prisma.OrderItemGetPayload<{
  include: { menuItem: true };
}>;

export type ChefType = Prisma.ChefGetPayload<Record<string, never>>;

export type TestimonialType = Prisma.TestimonialGetPayload<Record<string, never>>;
