'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
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

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  PREPARING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  PENDING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  CONFIRMED: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  READY: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
};

const STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'];

const ORDERS = [
  {
    id: 'ORD-012',
    customer: 'Ahmed Khan',
    email: 'ahmed@example.com',
    total: 2398,
    status: 'DELIVERED',
    date: 'Apr 6, 2026',
    items: 3,
  },
  {
    id: 'ORD-011',
    customer: 'Sara Ali',
    email: 'sara@example.com',
    total: 1099,
    status: 'PREPARING',
    date: 'Apr 6, 2026',
    items: 1,
  },
  {
    id: 'ORD-010',
    customer: 'Usman Mir',
    email: 'usman@example.com',
    total: 3199,
    status: 'PENDING',
    date: 'Apr 5, 2026',
    items: 4,
  },
  {
    id: 'ORD-009',
    customer: 'Fatima Noor',
    email: 'fatima@example.com',
    total: 999,
    status: 'DELIVERED',
    date: 'Apr 5, 2026',
    items: 1,
  },
  {
    id: 'ORD-008',
    customer: 'Bilal Raza',
    email: 'bilal@example.com',
    total: 1599,
    status: 'CANCELLED',
    date: 'Apr 4, 2026',
    items: 1,
  },
  {
    id: 'ORD-007',
    customer: 'Hina Shah',
    email: 'hina@example.com',
    total: 2197,
    status: 'CONFIRMED',
    date: 'Apr 4, 2026',
    items: 2,
  },
  {
    id: 'ORD-006',
    customer: 'Zain Malik',
    email: 'zain@example.com',
    total: 1748,
    status: 'READY',
    date: 'Apr 3, 2026',
    items: 2,
  },
];

export function AdminOrders() {
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('ALL');

  const filtered = ORDERS.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <SectionLabel>Admin</SectionLabel>
        <H2 className="mt-1">Orders</H2>
      </FadeIn>

      {/* Filters */}
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
            <SelectValue placeholder="Filter by status" />
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

      {/* Orders List */}
      <StaggerChildren className="flex flex-col gap-3">
        {filtered.map((order) => (
          <StaggerItem key={order.id}>
            <Card className="border border-border shadow-sm">
              <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <H4 className="text-sm">{order.id}</H4>
                  <Muted className="text-xs">
                    {order.customer} · {order.email}
                  </Muted>
                  <Muted className="text-xs">
                    {order.date} · {order.items} items
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
                  <Select defaultValue={order.status}>
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
    </div>
  );
}
