import type { Metadata } from 'next';
import { ReservationsHero } from '@/components/reservations/hero';
import { ReservationsSection } from '@/components/reservations/reservation';

export const metadata: Metadata = {
  title: 'Reservations',
  description: 'Book a table at Urban Dish. Select your date, time, and party size.',
};

export default function ReservationsPage() {
  return (
    <>
      <ReservationsHero />
      <ReservationsSection />
    </>
  );
}
