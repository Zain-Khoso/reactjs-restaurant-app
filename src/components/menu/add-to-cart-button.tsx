'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { useCartStore } from '@/store/cart';

type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string | null;
};

export function AddToCartButton({ item }: { item: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button
      size="lg"
      className="w-full sm:w-fit gap-2"
      onClick={() =>
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        })
      }
    >
      <ShoppingCart className="h-5 w-5" />
      Add to Cart
    </Button>
  );
}
