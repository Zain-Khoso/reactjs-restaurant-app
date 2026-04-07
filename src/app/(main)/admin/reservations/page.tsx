import type { Metadata } from 'next';
import { AdminReservations } from '@/components/admin/reservations';

export const metadata: Metadata = { title: 'Manage Reservations' };

export default function AdminReservationsPage() {
  return <AdminReservations />;
}
