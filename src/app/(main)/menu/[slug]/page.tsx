import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import prisma from '@/utils/prisma';
import { getMenuItemReviews } from '@/actions/reviews';
import { Badge } from '@/components/shadcn/badge';
import { Separator } from '@/components/shadcn/separator';
import { H1, H2, Muted } from '@/components/shadcn/typography';
import { ReviewsSection } from '@/components/reviews/reviews';
import { AddToCartButton } from '@/components/menu/add-to-cart-button';
import { formatCurrency } from '@/utils/format';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await prisma.menuItem.findUnique({ where: { slug } });
  if (!item) return { title: 'Not Found' };
  return { title: item.name, description: item.description };
}

export default async function MenuItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const item = await prisma.menuItem.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!item) notFound();

  const reviews = await getMenuItemReviews(item.id);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-muted">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Muted>No image available</Muted>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <H1 className="text-3xl">{item.name}</H1>
            <p className="text-3xl font-bold text-primary">{formatCurrency(item.price)}</p>
            {/* Badges now below title */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{item.category.name}</Badge>
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
              {item.featured && <Badge>Featured</Badge>}
            </div>
            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
          </div>

          <Separator />

          <AddToCartButton item={item} />
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16 max-w-2xl">
        <ReviewsSection menuItemId={item.id} initialReviews={reviews as any} />
      </div>
    </div>
  );
}
