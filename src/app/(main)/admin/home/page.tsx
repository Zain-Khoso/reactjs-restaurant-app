import type { Metadata } from 'next';
import { getAllChefs, getAllTestimonials, getFeaturedItems } from '@/actions/admin';
import { AdminHomeContent } from '@/components/admin/admin-home-content';
export const metadata: Metadata = { title: 'Manage Home Content' };

export default async function AdminHomePage() {
  const [chefs, testimonials, featuredDishes] = await Promise.all([
    getAllChefs(),
    getAllTestimonials(),
    getFeaturedItems(),
  ]);

  return (
    <AdminHomeContent chefs={chefs} testimonials={testimonials} featuredDishes={featuredDishes} />
  );
}
