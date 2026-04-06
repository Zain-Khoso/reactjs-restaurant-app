import { FadeIn } from '@/components/animations';
import { H1, Lead } from '@/components/shadcn/typography';

export function ReservationsHero() {
  return (
    <section className="relative py-24 px-4 text-center border-b border-border bg-muted/30">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-4">
        <FadeIn>
          <p className="text-sm font-medium text-primary tracking-widest uppercase">Reservations</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <H1>Book Your Table.</H1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Lead className="text-muted-foreground">
            Reserve your spot at Urban Dish and enjoy an unforgettable dining experience. We look
            forward to welcoming you.
          </Lead>
        </FadeIn>
      </div>
    </section>
  );
}
