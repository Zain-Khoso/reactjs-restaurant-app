// Lib Imports
import { Heart, Leaf, Star, Users } from 'lucide-react';
// Shadcn Imports
import { Card, CardContent } from '@/components/shadcn/card';
// Animations
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
// Typography
import { H2, H4, Muted, P, SectionLabel } from '@/components/shadcn/typography';

const VALUES = [
  {
    icon: Heart,
    title: 'Passion for Food',
    description:
      'Every dish is crafted with love and dedication. We believe food is an art form and treat it as such.',
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description:
      'We source only the finest, freshest ingredients from trusted local and global suppliers.',
  },
  {
    icon: Star,
    title: 'Excellence Always',
    description:
      'From kitchen to table, we hold ourselves to the highest standards in every single interaction.',
  },
  {
    icon: Users,
    title: 'Community First',
    description:
      'We are proud to be part of your community and strive to give back through local partnerships.',
  },
];

export function AboutValues() {
  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-12">
        {/* Heading */}
        <FadeIn className="text-center">
          <SectionLabel className="justify-center">What Drives Us</SectionLabel>
          <H2 className="mt-1">Our values.</H2>
          <P className="text-muted-foreground max-w-xl mx-auto mt-3">
            These aren&apos;t just words on a wall. They are the principles that guide every
            decision we make.
          </P>
        </FadeIn>

        {/* Cards */}
        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <Card className="border border-border shadow-sm h-full">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <H4 className="text-base">{value.title}</H4>
                  <Muted>{value.description}</Muted>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
