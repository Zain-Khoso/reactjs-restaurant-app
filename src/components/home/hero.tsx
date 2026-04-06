// Lib Imports
import Link from 'next/link';
import Image from 'next/image';

// Component Imports
import { Button } from '@/components/shadcn/button';
import { H1, P } from '@/components/shadcn/typography';
import { FadeIn } from '../animations';

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center text-center px-4 py-20">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg-image.webp"
          alt="Hero background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
      </div>

      {/* Background subtle pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="mx-auto max-w-3xl flex flex-col items-center gap-6">
        <FadeIn delay={0.1}>
          <p className="text-sm font-medium text-primary tracking-widest uppercase">
            Welcome to Urban Dish
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <H1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Your Culinary Journey <span className="text-primary">Starts Here.</span>
          </H1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <P className="max-w-xl text-muted-foreground text-base md:text-lg mt-0">
            Urban Dish is more than just a restaurant. It&apos;s a destination for food lovers,
            offering a diverse menu of mouthwatering dishes. From classic comfort food to innovative
            fusion cuisine, there&apos;s something for everyone.
          </P>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-row items-center gap-3 mt-2">
            <Button variant="outline" size="lg" asChild>
              <Link href="/reservations">Book a Table</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/menu">Menu</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
