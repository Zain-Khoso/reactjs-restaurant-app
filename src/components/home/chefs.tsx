// Lib Imports
import Image from 'next/image';
// Shadcn Imports
import { Card, CardContent } from '@/components/shadcn/card';
// Typography
import { H2, H4, Muted, SectionLabel } from '@/components/shadcn/typography';
import { StaggerChildren, StaggerItem, FadeIn } from '../animations';
import { Chef } from '@/prisma/client';

export function Chefs({ chefs }: { chefs: Chef[] }) {
  return (
    <section className="py-16 px-4 bg-muted/40">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-10">
        <FadeIn className="text-center">
          <SectionLabel className="justify-center">Master Chefs</SectionLabel>
          <H2 className="mt-1">People who make your food.</H2>
        </FadeIn>
        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {chefs.map((chef) => (
            <StaggerItem key={chef.id}>
              <Card className="border border-border shadow-sm text-center h-full">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="relative h-28 w-28 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
                    {chef.image ? (
                      <Image
                        src={chef.image}
                        alt={chef.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted" />
                    )}
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
