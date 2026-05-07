'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/carousel';
import { Card, CardContent } from '@/components/shadcn/card';
import { H2, H4, Muted, SectionLabel } from '@/components/shadcn/typography';
import { FadeIn } from '@/components/animations';

import { Testimonial } from '@/prisma/client';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-16 px-4 bg-muted/40">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-10">
        <FadeIn className="text-center">
          <SectionLabel className="justify-center">Testimonials</SectionLabel>
          <H2 className="mt-1">Let us take care of you.</H2>
        </FadeIn>
        <FadeIn delay={0.2} className="w-full">
          <Carousel opts={{ align: 'start', loop: true }} className="w-full">
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem key={t.id} className="sm:basis-1/2 lg:basis-1/3">
                  <Card className="border border-border shadow-sm h-full">
                    <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
                        {t.image ? (
                          <Image
                            src={t.image}
                            alt={t.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-muted" />
                        )}
                      </div>
                      <div>
                        <Muted className="text-xs">{t.location}</Muted>
                        <H4 className="text-base mt-0.5">{t.name}</H4>
                      </div>
                      <Muted className="text-sm leading-relaxed">{t.comment}</Muted>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </FadeIn>
      </div>
    </section>
  );
}
