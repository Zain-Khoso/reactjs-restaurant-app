import type { Metadata } from 'next';
import { OrderSection } from '@/components/order/order';

export const metadata: Metadata = {
  title: 'Your Order',
  description: 'Review your cart and complete your order.',
};

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <OrderSection />
    </div>
  );
}
