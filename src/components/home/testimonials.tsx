// Lib Imports
import Image from 'next/image';
// Shadcn Imports
import { Card, CardContent } from '@/components/shadcn/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/carousel';
// Typography
import { H2, H4, Muted, SectionLabel } from '@/components/shadcn/typography';
import { FadeIn } from '../animations';

const TESTIMONIALS = [
  {
    name: 'Maria Hernandez',
    location: 'Mexico',
    comment: 'The food here is absolutely amazing! The flavors are bold and authentic.',
    image: '/images/gallery/testimonials/1.jpeg',
  },
  {
    name: 'Carlos Hernandez',
    location: 'Spain',
    comment: 'The paella is amazing! So flavorful and filling.',
    image: '/images/gallery/testimonials/2.jpeg',
  },
  {
    name: 'Marco Rossi',
    location: 'Italy',
    comment: 'This restaurant is a hidden gem. The pasta dishes are to die for.',
    image: '/images/gallery/testimonials/3.jpeg',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-muted/40">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-10">
        {/* Heading */}
        <FadeIn className="text-center">
          <SectionLabel className="justify-center">Testimonials</SectionLabel>
          <H2 className="mt-1">Let us take care of you.</H2>
        </FadeIn>

        {/* Carousel */}
        <FadeIn delay={0.2} className="w-full">
          <Carousel opts={{ align: 'start', loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t) => (
                <CarouselItem key={t.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="border border-border shadow-sm h-full">
                    <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
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

            {/* Arrows */}
            <div className="flex justify-center gap-3 mt-6">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </FadeIn>
      </div>
    </section>
  );
}
