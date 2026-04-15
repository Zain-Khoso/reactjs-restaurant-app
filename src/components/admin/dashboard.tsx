'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { ShoppingBag, CalendarCheck, DollarSign, Users, TrendingUp, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/shadcn/card';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { H2, H3, H4, Muted, SectionLabel } from '@/components/shadcn/typography';
import { formatStat, formatCurrency } from '@/utils/format';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler
);

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  PREPARING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  PENDING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  CONFIRMED: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  READY: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
};

type Stats = {
  totalOrders: number;
  totalRevenue: number;
  totalReservations: number;
  totalCustomers: number;
  recentOrders: any[];
  monthlyRevenue: { month: string; revenue: number }[];
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, border: { display: false } },
    y: { border: { display: false } },
  },
};

export function AdminDashboard({ stats }: { stats: Stats }) {
  const STATS_CARDS = [
    {
      label: 'Total Orders',
      value: formatStat(stats.totalOrders),
      icon: ShoppingBag,
    },
    {
      label: 'Revenue',
      value: `Rs ${formatStat(stats.totalRevenue)}`,
      icon: DollarSign,
    },
    {
      label: 'Reservations',
      value: formatStat(stats.totalReservations),
      icon: CalendarCheck,
    },
    {
      label: 'Customers',
      value: formatStat(stats.totalCustomers),
      icon: Users,
    },
  ];

  const revenueData = {
    labels: stats.monthlyRevenue.map((m) => m.month),
    datasets: [
      {
        data: stats.monthlyRevenue.map((m) => Number(m.revenue)),
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
    labels: stats.monthlyRevenue.map((m) => m.month),
    datasets: [
      {
        data: stats.monthlyRevenue.map((_, i) => i + 10),
        backgroundColor: 'oklch(0.52 0.18 27 / 0.8)',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <SectionLabel>Overview</SectionLabel>
        <H2 className="mt-1">Dashboard</H2>
      </FadeIn>

      {/* Stat Cards */}
      <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS_CARDS.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="border border-border shadow-sm">
              <CardContent className="flex items-start justify-between p-5">
                <div className="flex flex-col gap-1">
                  <Muted className="text-xs">{stat.label}</Muted>
                  <p className="text-2xl font-bold">{stat.value}</p>
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
                <TrendingUp className="h-4 w-4 text-primary" />
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
                <ShoppingBag className="h-4 w-4 text-primary" />
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
              {stats.recentOrders.length === 0 ? (
                <Muted className="text-sm py-4 text-center">No orders yet.</Muted>
              ) : (
                stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3">
                    <div className="flex flex-col gap-0.5">
                      <H4 className="text-sm">{order.id.slice(0, 8).toUpperCase()}</H4>
                      <Muted className="text-xs">
                        {order.user?.name ?? 'Guest'} · {format(new Date(order.createdAt), 'PPP')}
                      </Muted>
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
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
