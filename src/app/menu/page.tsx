import type { Metadata } from 'next';
import { MenuHero } from '@/components/menu/hero';
import { MenuSection } from '@/components/menu/menu';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse the full Urban Dish menu — from starters to desserts.',
};

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <MenuSection />
    </>
  );
}
