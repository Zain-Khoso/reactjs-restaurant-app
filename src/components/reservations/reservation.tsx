'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users, User, Mail, Phone, NotebookPen } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Calendar } from '@/components/shadcn/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { Textarea } from '@/components/shadcn/textarea';
import { Card, CardContent } from '@/components/shadcn/card';
import { Separator } from '@/components/shadcn/separator';
import { cn } from '@/utils/index';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import { H2, H3, Muted, SectionLabel } from '@/components/shadcn/typography';
import { createReservation } from '@/actions/reservations';
import { useUserStore } from '@/store/user';

const TIME_SLOTS = [
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
];

const PARTY_SIZES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

const INFO_CARDS = [
  {
    icon: Clock,
    title: 'Opening Hours',
    lines: ['Mon – Sat: 7:00 am – 11:00 pm', 'Sunday: 12:00 pm – 9:00 pm'],
  },
  {
    icon: Users,
    title: 'Large Groups',
    lines: ['For parties over 10', 'please call us directly'],
  },
  {
    icon: CalendarIcon,
    title: 'Cancellations',
    lines: ['Cancel at least 2 hours', 'before your reservation'],
  },
];

export function ReservationsSection() {
  const user = useUserStore((s) => s.user);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [date, setDate] = React.useState<Date | undefined>();
  const [time, setTime] = React.useState('');
  const [partySize, setPartySize] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!date || !time || !partySize) {
      setError('Please fill in all required fields including date, time and party size.');
      return;
    }

    setLoading(true);

    const result = await createReservation({
      name,
      email,
      phone,
      date,
      time,
      partySize: partySize === '10+' ? 10 : parseInt(partySize),
      notes: notes || undefined,
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setDate(undefined);
      setTime('');
      setPartySize('');
      setNotes('');
    } else {
      setError(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  React.useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setEmail(user.email ?? '');
      setPhone(user.phone ?? '');
    }
  }, [user]);

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left — Form (2 cols) */}
        <FadeIn direction="right" className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <SectionLabel>Make a Booking</SectionLabel>
            <H2 className="mt-1">Reserve your table.</H2>
          </div>

          {success ? (
            <div className="flex flex-col gap-3 p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Reservation submitted successfully!
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                We will confirm your booking shortly via email or phone.
              </p>
              <Button variant="outline" className="w-fit mt-1" onClick={() => setSuccess(false)}>
                Make another reservation
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Personal Details */}
              <div className="flex flex-col gap-4">
                <H3 className="text-base text-muted-foreground font-medium">Personal Details</H3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="res-name">
                      <User className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="res-name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="res-email">
                      <Mail className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="res-email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="res-phone">
                      <Phone className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="res-phone"
                      type="tel"
                      placeholder="+92 300 0000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Booking Details */}
              <div className="flex flex-col gap-4">
                <H3 className="text-base text-muted-foreground font-medium">Booking Details</H3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Date */}
                  <div className="flex flex-col gap-2">
                    <Label>
                      <CalendarIcon className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                      Date <span className="text-destructive">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time */}
                  <div className="flex flex-col gap-2">
                    <Label>
                      <Clock className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                      Time <span className="text-destructive">*</span>
                    </Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Party Size */}
                  <div className="flex flex-col gap-2">
                    <Label>
                      <Users className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                      Party Size <span className="text-destructive">*</span>
                    </Label>
                    <Select value={partySize} onValueChange={setPartySize}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {PARTY_SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} {size === '1' ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Special Requests */}
              <div className="flex flex-col gap-4">
                <H3 className="text-base text-muted-foreground font-medium">Special Requests</H3>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="res-notes">
                    <NotebookPen className="inline h-3.5 w-3.5 mr-1.5 text-primary" />
                    Notes <span className="text-muted-foreground text-xs">(optional)</span>
                  </Label>
                  <Textarea
                    id="res-notes"
                    placeholder="Dietary requirements, special occasions, seating preferences..."
                    rows={4}
                    className="resize-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" size="lg" className="w-full sm:w-fit" disabled={loading}>
                {loading ? 'Submitting...' : 'Confirm Reservation'}
              </Button>
            </form>
          )}
        </FadeIn>

        {/* Right — Info */}
        <FadeIn direction="left" className="flex flex-col gap-6">
          <div>
            <SectionLabel>Good to Know</SectionLabel>
            <H2 className="mt-1 text-2xl">Before you book.</H2>
          </div>

          <StaggerChildren className="flex flex-col gap-4">
            {INFO_CARDS.map((card) => (
              <StaggerItem key={card.title}>
                <Card className="border border-border shadow-sm">
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <card.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{card.title}</p>
                      {card.lines.map((line) => (
                        <Muted key={line} className="text-xs">
                          {line}
                        </Muted>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <Separator />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Prefer to call?</p>
            <Muted className="text-xs">
              Reach us directly at{' '}
              <a href="tel:+923210123456" className="text-primary hover:underline font-medium">
                +92 321 0123456
              </a>{' '}
              and we&apos;ll take care of everything.
            </Muted>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
