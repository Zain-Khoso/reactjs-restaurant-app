import type { Metadata } from 'next';
import { getDeliveryFee } from '@/actions/settings';
import { AdminSettings } from '@/components/admin/admin-settings';

export const metadata: Metadata = { title: 'Settings' };

export default async function AdminSettingsPage() {
  const deliveryFee = await getDeliveryFee();
  return <AdminSettings deliveryFee={deliveryFee} />;
}
