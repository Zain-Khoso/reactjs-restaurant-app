'use client';

import * as React from 'react';
import { Search, CalendarCheck, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
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
import { updateReservationStatus } from '@/actions/admin';

const STATUS_STYLES: Record<string, string> = {
  CONFIRMED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  PENDING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'];

export function AdminReservations({ reservations }: { reservations: any[] }) {
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('ALL');

  const filtered = reservations.filter((res) => {
    const matchesSearch =
      res.id.toLowerCase().includes(search.toLowerCase()) ||
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || res.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleConfirm = async (id: string) => {
    await updateReservationStatus(id, 'CONFIRMED');
  };

  const handleCancel = async (id: string) => {
    await updateReservationStatus(id, 'CANCELLED');
  };

  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <SectionLabel>Admin</SectionLabel>
        <H2 className="mt-1">Reservations</H2>
      </FadeIn>

      <FadeIn className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reservations..."
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
        <Muted className="text-sm text-center py-10">No reservations found.</Muted>
      ) : (
        <StaggerChildren className="flex flex-col gap-3">
          {filtered.map((res) => (
            <StaggerItem key={res.id}>
              <Card className="border border-border shadow-sm">
                <CardContent className="flex flex-col gap-4 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <H4 className="text-sm">
                        {res.id.slice(0, 8).toUpperCase()} · {res.name}
                      </H4>
                      <Muted className="text-xs">
                        {res.email} · {res.phone}
                      </Muted>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full w-fit ${STATUS_STYLES[res.status]}`}
                    >
                      {res.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1.5">
                      <CalendarCheck className="h-3.5 w-3.5 text-primary" />
                      <Muted className="text-sm">{format(new Date(res.date), 'PPP')}</Muted>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <Muted className="text-sm">{res.time}</Muted>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      <Muted className="text-sm">{res.partySize} Guests</Muted>
                    </div>
                  </div>

                  {res.notes && <Muted className="text-xs italic">&quot;{res.notes}&quot;</Muted>}

                  {res.status === 'PENDING' && (
                    <div className="flex items-center gap-2 pt-1">
                      <Button size="sm" onClick={() => handleConfirm(res.id)}>
                        Confirm
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleCancel(res.id)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </div>
  );
}
