'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { Card, CardContent } from '@/components/shadcn/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog';
import { Separator } from '@/components/shadcn/separator';
import { Badge } from '@/components/shadcn/badge';
import { StaggerChildren, StaggerItem } from '@/components/animations';
import { H3, H4, Muted } from '@/components/shadcn/typography';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';
import { DownloadReceiptButton } from '@/components/pdf/download-receipt-button';
import { formatCurrency } from '@/utils/format';

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  PREPARING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  PENDING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  CONFIRMED: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  READY: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
};

export function AccountOrders({ orders }: { orders: any[] }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [selectedOrder, setSelectedOrder] = React.useState<any | null>(null);

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      addItem({
        id: item.menuItem.id,
        name: item.menuItem.name,
        price: item.unitPrice,
        image: item.menuItem.image ?? null,
      });
    });
    router.push('/order');
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
        </div>
        <H3 className="text-lg">No orders yet</H3>
        <Muted>Your order history will appear here once you place an order.</Muted>
        <Button asChild>
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <StaggerChildren className="flex flex-col gap-4">
        {orders.map((order) => (
          <StaggerItem key={order.id}>
            <Card className="border border-border shadow-sm">
              <CardContent className="p-0">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-border">
                  <div className="flex flex-col gap-0.5">
                    <H4 className="text-sm font-semibold">{order.id.slice(0, 8).toUpperCase()}</H4>
                    <Muted className="text-xs">{format(new Date(order.createdAt), 'PPP')}</Muted>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                    <p className="text-sm font-bold text-primary">{formatCurrency(order.total)}</p>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="flex flex-col divide-y divide-border">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          x{item.quantity}
                        </span>
                        <span className="text-sm">{item.menuItem.name}</span>
                      </div>
                      <Muted className="text-sm">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </Muted>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-end gap-2 p-4 border-t border-border flex-wrap">
                  <DownloadReceiptButton orderId={order.id} />
                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                    View Details
                  </Button>
                  <Button size="sm" onClick={() => handleReorder(order)}>
                    Reorder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order #{selectedOrder?.id.slice(0, 8).toUpperCase()}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="flex flex-col gap-4 pt-2">
              {/* Status + Date */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
                <Muted className="text-xs">
                  {format(new Date(selectedOrder.createdAt), 'PPP')}
                </Muted>
              </div>

              <Separator />

              {/* Items */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Items</p>
                {selectedOrder.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      {item.menuItem.image && (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm">{item.menuItem.name}</p>
                        <Muted className="text-xs">x{item.quantity}</Muted>
                      </div>
                    </div>
                    <Muted className="text-sm">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </Muted>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Muted className="text-sm">Subtotal</Muted>
                  <Muted className="text-sm">{formatCurrency(selectedOrder.subtotal)}</Muted>
                </div>
                <div className="flex items-center justify-between">
                  <Muted className="text-sm">Delivery Fee</Muted>
                  <Muted className="text-sm">{formatCurrency(selectedOrder.deliveryFee)}</Muted>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm font-semibold">Total</p>
                  <p className="text-sm font-bold text-primary">
                    {formatCurrency(selectedOrder.total)}
                  </p>
                </div>
              </div>

              {/* Delivery Info */}
              {(selectedOrder.address || selectedOrder.phone) && (
                <>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Delivery Details</p>
                    {selectedOrder.phone && (
                      <Muted className="text-xs">{selectedOrder.phone}</Muted>
                    )}
                    {selectedOrder.address && (
                      <Muted className="text-xs">{selectedOrder.address}</Muted>
                    )}
                    {selectedOrder.notes && (
                      <Muted className="text-xs italic">&quot;{selectedOrder.notes}&quot;</Muted>
                    )}
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <DownloadReceiptButton orderId={selectedOrder.id} variant="outline" />
                <Button
                  className="flex-1"
                  onClick={() => {
                    handleReorder(selectedOrder);
                    setSelectedOrder(null);
                  }}
                >
                  Reorder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
