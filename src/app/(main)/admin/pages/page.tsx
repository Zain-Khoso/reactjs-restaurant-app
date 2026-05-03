import type { Metadata } from 'next';
import { getAllPageContent } from '@/actions/admin';
import { AdminPages } from '@/components/admin/pages';

export const metadata: Metadata = { title: 'Manage Pages' };

export default async function AdminPagesPage() {
  const pages = await getAllPageContent();
  return <AdminPages pages={pages} />;
}
