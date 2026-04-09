import type { Metadata } from 'next';
import { getMenuItems, getCategories } from '@/actions/menu';
import { MenuHero } from '@/components/menu/hero';
import { MenuSection } from '@/components/menu/menu';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse the full Urban Dish menu — from starters to desserts.',
};

export default async function MenuPage() {
  const [items, categories] = await Promise.all([getMenuItems(), getCategories()]);

  return (
    <>
      <MenuHero />
      <MenuSection items={items} categories={categories} />
    </>
  );
}
