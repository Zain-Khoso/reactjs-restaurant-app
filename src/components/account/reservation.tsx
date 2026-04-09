'use client';

import { Button } from '@/components/shadcn/button';
import { Card, CardContent } from '@/components/shadcn/card';
import { StaggerChildren, StaggerItem } from '@/components/animations';
import { H3, H4, Muted } from '@/components/shadcn/typography';
import { CalendarCheck, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { cancelReservation } from '@/actions/account';

const STATUS_STYLES: Record<string, string> = {
  CONFIRMED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  PENDING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export function AccountReservations({ reservations }: { reservations: any[] }) {
  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <CalendarCheck className="h-7 w-7 text-muted-foreground" />
        </div>
        <H3 className="text-lg">No reservations yet</H3>
        <Muted>Your booking history will appear here.</Muted>
        <Button asChild>
          <Link href="/reservations">Book a Table</Link>
        </Button>
      </div>
    );
  }

  return (
    <StaggerChildren className="flex flex-col gap-4">
      {reservations.map((res) => (
        <StaggerItem key={res.id}>
          <Card className="border border-border shadow-sm">
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <H4 className="text-sm font-semibold">{res.id.slice(0, 8).toUpperCase()}</H4>
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
              {res.status !== 'CANCELLED' && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={async () => {
                    await cancelReservation(res.id);
                  }}
                >
                  Cancel
                </Button>
              )}
            </CardContent>
          </Card>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
