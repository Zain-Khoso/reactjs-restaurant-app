// Lib Imports
import Image from 'next/image';
// Shadcn Imports
import { Card, CardContent } from '@/components/shadcn/card';
// Typography
import { H2, H4, Muted, SectionLabel } from '@/components/shadcn/typography';
import { StaggerChildren, StaggerItem, FadeIn } from '../animations';

const CHEFS = [
  {
    name: 'Chef Rajeev Patel',
    cuisine: 'Indian',
    image: '/images/gallery/chefs/1.webp',
  },
  {
    name: 'Chef Maria Hernandez',
    cuisine: 'Mexican',
    image: '/images/gallery/chefs/2.webp',
  },
  {
    name: 'Chef Marco Rossi',
    cuisine: 'Italian',
    image: '/images/gallery/chefs/3.webp',
  },
  {
    name: 'Chef Li Wei',
    cuisine: 'Chinese',
    image: '/images/gallery/chefs/4.webp',
  },
];

export function Chefs() {
  return (
    <section className="py-16 px-4 bg-muted/40">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-10">
        {/* Heading */}
        <FadeIn className="text-center">
          <SectionLabel className="justify-center">Master Chefs</SectionLabel>
          <H2 className="mt-1">People who make your food.</H2>
        </FadeIn>

        {/* Cards */}
        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {CHEFS.map((chef) => (
            <StaggerItem key={chef.name}>
              <Card className="border border-border shadow-sm text-center">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="relative h-28 w-28 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
                    <Image
                      src={chef.image}
                      alt={chef.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Muted className="text-xs">{chef.cuisine}</Muted>
                    <H4 className="text-base mt-0.5">{chef.name}</H4>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
