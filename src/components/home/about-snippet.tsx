// Lib Imports
import Image from 'next/image';
import Link from 'next/link';
// Shadcn Imports
import { Button } from '@/components/shadcn/button';
import { Separator } from '@/components/shadcn/separator';
// Typography
import { H2, P, SectionLabel } from '@/components/shadcn/typography';

const STATS = [
  { value: '40', label: 'Years of Experience' },
  { value: '77', label: 'Restaurant Locations' },
  { value: '12', label: 'Popular Master Chefs' },
];

export function AboutSnippet() {
  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left — Text */}
        <div className="flex flex-col gap-6">
          <div>
            <SectionLabel>About Us</SectionLabel>
            <H2 className="mt-1">Available everywhere!</H2>
          </div>

          <P className="text-muted-foreground mt-0">
            Urban Dish is more than just a restaurant; it&apos;s a culinary journey that spans the
            globe. With hundreds of locations worldwide, we&apos;re committed to bringing you the
            finest dining experience, no matter where you are.
          </P>

          <P className="text-muted-foreground mt-0">
            Indulge in our diverse menu, crafted with passion and precision. From classic comfort
            food to innovative fusion cuisine, there&apos;s something to satisfy every palate.
          </P>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-2">
            {STATS.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">{stat.value}</span>
                  <span className="text-xs text-muted-foreground leading-tight">{stat.label}</span>
                </div>
                {index < STATS.length - 1 && <Separator orientation="vertical" className="h-10" />}
              </div>
            ))}
          </div>

          <Button asChild className="w-fit mt-2">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>

        {/* Right — Image Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src={`/images/gallery/locations/${i}.webp`}
                alt={`Restaurant image ${i}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
