import type { Metadata } from 'next';
import { getAdminMenuItems, getAdminCategories } from '@/actions/admin';
import { AdminMenu } from '@/components/admin/menu';

export const metadata: Metadata = { title: 'Manage Menu' };

export default async function AdminMenuPage() {
  const [items, categories] = await Promise.all([getAdminMenuItems(), getAdminCategories()]);
  return <AdminMenu items={items} categories={categories} />;
}
