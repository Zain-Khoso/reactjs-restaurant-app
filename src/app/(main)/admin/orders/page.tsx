import type { Metadata } from 'next';
import { getAdminOrders } from '@/actions/admin';
import { AdminOrders } from '@/components/admin/orders';

export const metadata: Metadata = { title: 'Manage Orders' };

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();
  return <AdminOrders orders={orders} />;
}
