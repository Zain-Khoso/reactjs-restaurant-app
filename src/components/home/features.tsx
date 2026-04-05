// Lib Imports
import { Truck, Gift, CalendarHeart, Users } from 'lucide-react';

// Component Imports
import { Card, CardContent } from '@/components/shadcn/card';
import { H4, Muted } from '@/components/shadcn/typography';

const FEATURES = [
  {
    icon: Truck,
    title: 'Speedy Delivery',
    description:
      'Craving your favorite dish? Our lightning-fast delivery ensures it reaches you hot and fresh.',
  },
  {
    icon: Gift,
    title: 'Reward Yourself',
    description:
      'Join our loyalty program and earn points on every purchase. Redeem rewards and enjoy exclusive perks.',
  },
  {
    icon: CalendarHeart,
    title: 'Elevate Your Event',
    description:
      'Let us cater your next event. From corporate functions to private parties, we&apos;ve got you covered.',
  },
  {
    icon: Users,
    title: 'Family-Friendly Dining',
    description:
      'A warm and welcoming space for families to enjoy quality time and delicious food.',
  },
];

export function Features() {
  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="border border-border shadow-sm">
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <H4 className="text-base">{feature.title}</H4>
                <Muted>{feature.description}</Muted>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
