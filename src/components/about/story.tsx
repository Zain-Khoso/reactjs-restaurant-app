// Lib Imports
import Image from 'next/image';
// Animations
import { FadeIn, ScaleIn } from '@/components/animations';
// Typography
import { H2, P, SectionLabel } from '@/components/shadcn/typography';

export function AboutStory() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left — Image */}
        <ScaleIn>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/images/gallery/locations/1.webp"
              alt="Urban Dish restaurant interior"
              loading="eager"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </ScaleIn>

        {/* Right — Text */}
        <FadeIn direction="left" className="flex flex-col gap-6">
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <H2 className="mt-1">A culinary journey that spans the globe.</H2>
          </div>
          <P className="text-muted-foreground mt-0">
            Urban Dish started as a small family kitchen in the heart of the city. What began as a
            passion project quickly grew into something much bigger — a culinary destination that
            welcomes food lovers from all walks of life.
          </P>
          <P className="text-muted-foreground mt-0">
            Today, with locations across the globe and a team of world-class chefs, we remain
            committed to the same values that started it all: quality ingredients, bold flavors, and
            an experience that feels like home.
          </P>
          <P className="text-muted-foreground mt-0">
            Every dish on our menu tells a story. From classic comfort food to innovative fusion
            cuisine, we craft each plate with passion, precision, and a deep respect for culinary
            tradition.
          </P>
        </FadeIn>
      </div>
    </section>
  );
}
