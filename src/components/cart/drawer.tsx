'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn/sheet';
import { Separator } from '@/components/shadcn/separator';
import { Badge } from '@/components/shadcn/badge';
import { H3, Muted } from '@/components/shadcn/typography';
import { useCartStore } from '@/store/cart';

const DELIVERY_FEE = 150;

export function CartDrawer() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const totalItems = useCartStore((s) => s.totalItems());
  const subtotal = useCartStore((s) => s.subtotal());
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const total = subtotal + DELIVERY_FEE;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
          <ShoppingCart className="h-5 w-5" />
          {mounted && totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-96 flex flex-col px-6">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Your Cart
            {mounted && totalItems > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {totalItems} items
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {!mounted || items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 flex-1 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <H3 className="text-base">Your cart is empty</H3>
            <Muted className="text-sm">Add some dishes to get started.</Muted>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 py-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-sm text-primary font-bold">
                      Rs {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center justify-between text-sm">
                <Muted>Subtotal</Muted>
                <Muted>Rs {subtotal.toLocaleString()}</Muted>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Muted>Delivery Fee</Muted>
                <Muted>Rs {DELIVERY_FEE.toLocaleString()}</Muted>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="font-semibold">Total</p>
                <p className="font-bold text-primary text-lg">Rs {total.toLocaleString()}</p>
              </div>
              <Button className="w-full mt-2" asChild onClick={() => setOpen(false)}>
                <Link href="/order">Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
