'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, Tag } from 'lucide-react';
// Shadcn
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import { Card, CardContent } from '@/components/shadcn/card';
import { Separator } from '@/components/shadcn/separator';
import { Badge } from '@/components/shadcn/badge';
// Animations
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
// Typography
import { H2, H3, H4, Muted, SectionLabel } from '@/components/shadcn/typography';

const INITIAL_CART = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: '1 pizza + 2 drinks',
    price: 1299,
    image: '/images/gallery/dishes/1.webp',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Spaghetti Carbonara',
    description: '1 pasta dish + 1 drink',
    price: 1099,
    image: '/images/gallery/dishes/2.webp',
    quantity: 2,
  },
  {
    id: '3',
    name: 'Tiramisu',
    description: 'Classic Italian dessert',
    price: 599,
    image: '/images/gallery/dishes/3.webp',
    quantity: 1,
  },
];

const DELIVERY_FEE = 150;

export function OrderSection() {
  const [cart, setCart] = React.useState(INITIAL_CART);
  const [coupon, setCoupon] = React.useState('');

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-32 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-9 w-9 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2">
          <H3>Your cart is empty</H3>
          <Muted>Looks like you haven&apos;t added anything yet.</Muted>
        </div>
        <Button asChild>
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      {/* Page Header */}
      <FadeIn className="mb-10">
        <SectionLabel>Checkout</SectionLabel>
        <H2 className="mt-1">Your Order</H2>
      </FadeIn>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left — Cart Items (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Items */}
          <StaggerChildren className="flex flex-col gap-4">
            {cart.map((item) => (
              <StaggerItem key={item.id}>
                <Card className="border border-border shadow-sm">
                  <CardContent className="flex items-center gap-4 p-4">
                    {/* Image */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                      <H4 className="text-sm truncate">{item.name}</H4>
                      <Muted className="text-xs">{item.description}</Muted>
                      <p className="text-sm font-bold text-primary">
                        Rs {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {/* Coupon */}
          <FadeIn>
            <Card className="border border-border shadow-sm">
              <CardContent className="flex flex-col gap-3 p-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <H4 className="text-sm">Have a coupon?</H4>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Delivery Details */}
          <FadeIn>
            <Card className="border border-border shadow-sm">
              <CardContent className="flex flex-col gap-4 p-6">
                <H3 className="text-base">Delivery Details</H3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="delivery-name">Full Name</Label>
                    <Input id="delivery-name" placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="delivery-phone">Phone</Label>
                    <Input id="delivery-phone" placeholder="+92 300 0000000" />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="delivery-address">Delivery Address</Label>
                    <Input id="delivery-address" placeholder="123 Street, City" />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="delivery-notes">
                      Order Notes <span className="text-muted-foreground text-xs">(optional)</span>
                    </Label>
                    <Textarea
                      id="delivery-notes"
                      placeholder="Any special instructions for your order..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Right — Order Summary */}
        <FadeIn direction="left" className="flex flex-col gap-4">
          <Card className="border border-border shadow-sm sticky top-24">
            <CardContent className="flex flex-col gap-4 p-6">
              <H3 className="text-base">Order Summary</H3>

              {/* Item breakdown */}
              <div className="flex flex-col gap-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Muted className="text-sm truncate max-w-40">
                      {item.name} <span className="text-xs">x{item.quantity}</span>
                    </Muted>
                    <Muted className="text-sm shrink-0">
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </Muted>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Muted className="text-sm">Subtotal</Muted>
                  <Muted className="text-sm">Rs {subtotal.toLocaleString()}</Muted>
                </div>
                <div className="flex items-center justify-between">
                  <Muted className="text-sm">Delivery Fee</Muted>
                  <Muted className="text-sm">Rs {DELIVERY_FEE.toLocaleString()}</Muted>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <p className="font-semibold">Total</p>
                <p className="font-bold text-lg text-primary">Rs {total.toLocaleString()}</p>
              </div>

              {/* Stripe Checkout Button */}
              <Button size="lg" className="w-full mt-2">
                Pay with Stripe
              </Button>

              <Muted className="text-xs text-center">
                Secured by <span className="font-medium text-foreground">Stripe</span>. Your payment
                info is never stored.
              </Muted>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
