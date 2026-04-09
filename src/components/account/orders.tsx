import { Badge } from '@/components/shadcn/badge';
import { Button } from '@/components/shadcn/button';
import { Card, CardContent } from '@/components/shadcn/card';
import { StaggerChildren, StaggerItem } from '@/components/animations';
import { H3, H4, Muted } from '@/components/shadcn/typography';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  PREPARING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  PENDING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  CONFIRMED: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  READY: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
};

export function AccountOrders({ orders }: { orders: any[] }) {
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
    <StaggerChildren className="flex flex-col gap-4">
      {orders.map((order) => (
        <StaggerItem key={order.id}>
          <Card className="border border-border shadow-sm">
            <CardContent className="p-0">
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
                  <p className="text-sm font-bold text-primary">
                    Rs {order.total.toLocaleString()}
                  </p>
                </div>
              </div>
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
                      Rs {(item.unitPrice * item.quantity).toLocaleString()}
                    </Muted>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 p-4 border-t border-border">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm" asChild>
                  <Link href="/menu">Reorder</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
