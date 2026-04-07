// Home Sections
import { Hero } from '@/components/home/hero';
import { Features } from '@/components/home/features';
import { AboutSnippet } from '@/components/home/about-snippet';
import { Chefs } from '@/components/home/chefs';
import { BestDishes } from '@/components/home/best-dishes';
import { Testimonials } from '@/components/home/testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <AboutSnippet />
      <Chefs />
      <BestDishes />
      <Testimonials />
    </>
  );
}
