import type { Metadata } from 'next';
import { AccountHeader } from '@/components/account/header';
import { AccountTabs } from '@/components/account/tabs';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your Urban Dish account, orders, and reservations.',
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <AccountHeader />
      <AccountTabs />
    </div>
  );
}
