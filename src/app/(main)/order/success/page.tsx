'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { H1, Lead, Muted } from '@/components/shadcn/typography';
import { useCartStore } from '@/store/cart';

export default function OrderSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    clearCart();
  }, []);

  const handleCopy = async () => {
    if (!orderId) return;
    await navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center text-center gap-6 max-w-md w-full">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>

        <div className="flex flex-col gap-2">
          <H1 className="text-3xl">Order Confirmed!</H1>
          <Lead className="text-muted-foreground">
            Thank you for your order. We&apos;ve received your payment and are already preparing
            your food.
          </Lead>
          {orderId && (
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-1.5 mx-auto mt-1 group"
              title="Click to copy order ID"
            >
              <Muted className="text-xs group-hover:text-primary transition-colors">
                Order ID: {orderId.slice(0, 8).toUpperCase()}
              </Muted>
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/account">View My Orders</Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/menu">Order Again</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
