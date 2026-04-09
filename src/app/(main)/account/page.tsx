import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/session';
import { getUserOrders, getUserReservations } from '@/actions/account';
import { AccountHeader } from '@/components/account/header';
import { AccountTabs } from '@/components/account/tabs';

export const metadata: Metadata = {
  title: 'My Account',
};

export default async function AccountPage() {
  const user = await getUser();

  if (!user) redirect('/sign-in');

  const [orders, reservations] = await Promise.all([getUserOrders(), getUserReservations()]);

  return (
    <div className="min-h-screen bg-muted/30">
      <AccountHeader user={user} />
      <AccountTabs orders={orders} reservations={reservations} user={user} />
    </div>
  );
}
