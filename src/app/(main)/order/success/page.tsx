'use client';

import * as React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { H1, Lead } from '@/components/shadcn/typography';
import { useCartStore } from '@/store/cart';

export default function OrderSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  React.useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
      </div>
      <div className="flex flex-col gap-2">
        <H1 className="text-3xl">Order Confirmed!</H1>
        <Lead className="text-muted-foreground max-w-md">
          Thank you for your order. We&apos;ve received it and are already preparing your food.
        </Lead>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Button asChild variant="outline">
          <Link href="/account">View My Orders</Link>
        </Button>
        <Button asChild>
          <Link href="/menu">Order Again</Link>
        </Button>
      </div>
    </div>
  );
}
