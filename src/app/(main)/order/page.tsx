import type { Metadata } from 'next';
import { getDeliveryFee } from '@/actions/settings';
import { OrderSection } from '@/components/order/order';

export const metadata: Metadata = {
  title: 'Your Order',
};

export default async function OrderPage() {
  const deliveryFee = await getDeliveryFee();
  return (
    <div className="min-h-screen bg-muted/30">
      <OrderSection deliveryFee={deliveryFee} />
    </div>
  );
}
