'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { ShoppingBag, CalendarCheck, DollarSign, Users, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/shadcn/card';
import { Badge } from '@/components/shadcn/badge';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { H2, H3, H4, Muted, SectionLabel } from '@/components/shadcn/typography';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const STATS = [
  {
    label: 'Total Orders',
    value: '128',
    change: '+12% this week',
    icon: ShoppingBag,
    positive: true,
  },
  {
    label: 'Revenue',
    value: 'Rs 142,500',
    change: '+8% this week',
    icon: DollarSign,
    positive: true,
  },
  {
    label: 'Reservations',
    value: '34',
    change: '+5% this week',
    icon: CalendarCheck,
    positive: true,
  },
  {
    label: 'Customers',
    value: '96',
    change: '-2% this week',
    icon: Users,
    positive: false,
  },
];

const RECENT_ORDERS = [
  { id: 'ORD-012', customer: 'Ahmed Khan', total: 2398, status: 'DELIVERED' },
  { id: 'ORD-011', customer: 'Sara Ali', total: 1099, status: 'PREPARING' },
  { id: 'ORD-010', customer: 'Usman Mir', total: 3199, status: 'PENDING' },
  { id: 'ORD-009', customer: 'Fatima Noor', total: 999, status: 'DELIVERED' },
  { id: 'ORD-008', customer: 'Bilal Raza', total: 1599, status: 'CANCELLED' },
];

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  PREPARING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  PENDING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const MONTHS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

const revenueData = {
  labels: MONTHS,
  datasets: [
    {
      label: 'Revenue (Rs)',
      data: [85000, 102000, 94000, 118000, 131000, 142500],
      borderColor: 'oklch(0.52 0.18 27)',
      backgroundColor: 'oklch(0.52 0.18 27 / 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: 'oklch(0.52 0.18 27)',
    },
  ],
};

const ordersData = {
  labels: MONTHS,
  datasets: [
    {
      label: 'Orders',
      data: [72, 89, 78, 95, 110, 128],
      backgroundColor: 'oklch(0.52 0.18 27 / 0.8)',
      borderRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
    },
    y: {
      grid: { color: 'oklch(0.925 0.005 214.3 / 0.5)' },
      border: { display: false },
    },
  },
};

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <FadeIn>
        <SectionLabel>Overview</SectionLabel>
        <H2 className="mt-1">Dashboard</H2>
      </FadeIn>

      {/* Stat Cards */}
      <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="border border-border shadow-sm">
              <CardContent className="flex items-start justify-between p-5">
                <div className="flex flex-col gap-1">
                  <Muted className="text-xs">{stat.label}</Muted>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p
                    className={`text-xs font-medium ${stat.positive ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FadeIn delay={0.1}>
          <Card className="border border-border shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <H3 className="text-base">Revenue</H3>
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">+8%</span>
                </div>
              </div>
              <div className="h-52">
                <Line data={revenueData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="border border-border shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <H3 className="text-base">Orders</H3>
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">+12%</span>
                </div>
              </div>
              <div className="h-52">
                <Bar data={ordersData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Recent Orders */}
      <FadeIn delay={0.1}>
        <Card className="border border-border shadow-sm">
          <CardContent className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <H3 className="text-base">Recent Orders</H3>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col divide-y divide-border">
              {RECENT_ORDERS.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3">
                  <div className="flex flex-col gap-0.5">
                    <H4 className="text-sm">{order.id}</H4>
                    <Muted className="text-xs">{order.customer}</Muted>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                    <p className="text-sm font-semibold text-primary">
                      Rs {order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
