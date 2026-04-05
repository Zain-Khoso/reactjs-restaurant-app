// Lib Imports
import Image from 'next/image';
import Link from 'next/link';
// Shadcn Imports
import { Button } from '@/components/shadcn/button';
import { Card, CardContent } from '@/components/shadcn/card';
import { Badge } from '@/components/shadcn/badge';
// Typography
import { H2, H4, Muted, SectionLabel } from '@/components/shadcn/typography';

const DISHES = [
  {
    name: 'Margherita Pizza',
    description: '1 pizza + 2 drinks',
    price: 'Rs 1299',
    image: '/images/gallery/dishes/1.webp',
    badge: 'Popular',
  },
  {
    name: 'Spaghetti Carbonara',
    description: '1 pasta dish + 1 drink',
    price: 'Rs 1099',
    image: '/images/gallery/dishes/2.webp',
    badge: 'Chef Pick',
  },
  {
    name: 'Classic Cheeseburger',
    description: '1 burger + 1 side + 1 drink',
    price: 'Rs 999',
    image: '/images/gallery/dishes/3.webp',
    badge: 'Popular',
  },
  {
    name: 'Sushi Platter',
    description: '12 pieces of sushi + miso soup',
    price: 'Rs 1599',
    image: '/images/gallery/dishes/4.webp',
    badge: 'New',
  },
];

export function BestDishes() {
  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-10">
        {/* Heading */}
        <div className="text-center">
          <SectionLabel className="justify-center">Best Dishes</SectionLabel>
          <H2 className="mt-1">Some of our best cuisines.</H2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {DISHES.map((dish) => (
            <Card key={dish.name} className="border border-border shadow-sm overflow-hidden group">
              {/* Image */}
              <div className="relative aspect-4/3 bg-muted overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3">{dish.badge}</Badge>
              </div>

              <CardContent className="flex flex-col gap-3 p-4">
                <div>
                  <H4 className="text-base">{dish.name}</H4>
                  <Muted className="text-xs mt-0.5">{dish.description}</Muted>
                </div>
                <p className="text-lg font-bold text-primary">{dish.price}</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Add to Cart
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link href="/menu">Buy Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
