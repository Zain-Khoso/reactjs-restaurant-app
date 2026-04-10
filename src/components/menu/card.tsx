'use client';

import Image from 'next/image';
import { ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { Badge } from '@/components/shadcn/badge';
import { Card, CardContent } from '@/components/shadcn/card';
import { H4, Muted } from '@/components/shadcn/typography';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';
import { MenuItem } from '@/prisma/client';

export function MenuCard({ dish }: { dish: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <Card className="border border-border shadow-sm overflow-hidden group h-full flex flex-col">
      <div className="relative aspect-4/3 bg-muted overflow-hidden">
        {dish.image ? (
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Muted className="text-xs">No image</Muted>
          </div>
        )}
        {dish.featured && <Badge className="absolute top-3 left-3">Featured</Badge>}
        {dish.tags.slice(0, 1).map((tag) => (
          <Badge key={tag} variant="secondary" className="absolute top-3 right-3 text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <CardContent className="flex flex-col gap-3 p-4 flex-1">
        <div className="flex-1">
          <Link href={`/menu/${dish.slug}`}>
            <H4 className="text-base hover:text-primary transition-colors">{dish.name}</H4>
          </Link>
          <Muted className="text-xs mt-1 line-clamp-2">{dish.description}</Muted>
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
          <Button size="sm" className="flex-1 gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
