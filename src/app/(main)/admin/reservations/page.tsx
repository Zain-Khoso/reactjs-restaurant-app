import type { Metadata } from 'next';
import { getAdminReservations } from '@/actions/admin';
import { AdminReservations } from '@/components/admin/reservations';

export const metadata: Metadata = { title: 'Manage Reservations' };

export default async function AdminReservationsPage() {
  const reservations = await getAdminReservations();
  return <AdminReservations reservations={reservations} />;
}
