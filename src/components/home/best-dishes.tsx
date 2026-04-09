'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/shadcn/button';
import { Card, CardContent } from '@/components/shadcn/card';
import { Badge } from '@/components/shadcn/badge';
import { H2, H4, Muted, SectionLabel } from '@/components/shadcn/typography';
import { StaggerChildren, StaggerItem, FadeIn } from '@/components/animations';
import { useCartStore } from '@/store/cart';
import { ShoppingCart } from 'lucide-react';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  tags: string[];
  featured: boolean;
};

export function BestDishes({ dishes }: { dishes: MenuItem[] }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-10">
        <FadeIn className="text-center">
          <SectionLabel className="justify-center">Best Dishes</SectionLabel>
          <H2 className="mt-1">Some of our best cuisines.</H2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {dishes.map((dish) => (
            <StaggerItem key={dish.id}>
              <Card className="border border-border shadow-sm overflow-hidden group h-full flex flex-col">
                <div className="relative aspect-4/3 bg-muted overflow-hidden">
                  {dish.image ? (
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted" />
                  )}
                  {dish.tags.slice(0, 1).map((tag) => (
                    <Badge key={tag} className="absolute top-3 left-3">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardContent className="flex flex-col gap-3 p-4 flex-1">
                  <div className="flex-1">
                    <H4 className="text-base">{dish.name}</H4>
                    <Muted className="text-xs mt-0.5 line-clamp-2">{dish.description}</Muted>
                  </div>
                  <p className="text-lg font-bold text-primary">Rs {dish.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() =>
                        addItem({
                          id: dish.id,
                          name: dish.name,
                          price: dish.price,
                          image: dish.image,
                        })
                      }
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to Cart
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href="/menu">Buy Now</Link>
                    </Button>
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
