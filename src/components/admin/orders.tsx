'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/shadcn/input';
import { Card, CardContent } from '@/components/shadcn/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { H2, H4, Muted, SectionLabel } from '@/components/shadcn/typography';
import { updateOrderStatus } from '@/actions/admin';

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  PREPARING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  PENDING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  CONFIRMED: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  READY: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
};

const STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'];

export function AdminOrders({ orders }: { orders: any[] }) {
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('ALL');

  const filtered = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      order.phone?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, status: string) => {
    await updateOrderStatus(orderId, status);
  };

  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <SectionLabel>Admin</SectionLabel>
        <H2 className="mt-1">Orders</H2>
      </FadeIn>

      <FadeIn className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FadeIn>

      {filtered.length === 0 ? (
        <Muted className="text-sm text-center py-10">No orders found.</Muted>
      ) : (
        <StaggerChildren className="flex flex-col gap-3">
          {filtered.map((order) => (
            <StaggerItem key={order.id}>
              <Card className="border border-border shadow-sm">
                <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <H4 className="text-sm">{order.id.slice(0, 8).toUpperCase()}</H4>
                    <Muted className="text-xs">
                      {order.user?.name ?? 'Guest'} · {order.phone}
                    </Muted>
                    <Muted className="text-xs">
                      {format(new Date(order.createdAt), 'PPP')} · {order.items.length} items
                    </Muted>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                    <p className="text-sm font-bold text-primary">
                      Rs {order.total.toLocaleString()}
                    </p>
                    <Select
                      defaultValue={order.status}
                      onValueChange={(val) => handleStatusChange(order.id, val)}
                    >
                      <SelectTrigger className="h-8 w-36 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.filter((s) => s !== 'ALL').map((s) => (
                          <SelectItem key={s} value={s} className="text-xs">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </div>
  );
}
