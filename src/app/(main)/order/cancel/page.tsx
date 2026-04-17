import { redirect } from 'next/navigation';
import { cancelPendingOrder } from '@/actions/stripe';

export default async function OrderCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  if (orderId) {
    await cancelPendingOrder(orderId);
  }

  redirect('/order');
}
