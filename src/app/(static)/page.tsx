import { getFeaturedItems } from '@/actions/menu';
import { Hero } from '@/components/home/hero';
import { Features } from '@/components/home/features';
import { AboutSnippet } from '@/components/home/about-snippet';
import { Chefs } from '@/components/home/chefs';
import { BestDishes } from '@/components/home/best-dishes';
import { Testimonials } from '@/components/home/testimonials';

export default async function HomePage() {
  const featuredDishes = await getFeaturedItems();

  return (
    <>
      <Hero />
      <Features />
      <AboutSnippet />
      <Chefs />
      <BestDishes dishes={featuredDishes} />
      <Testimonials />
    </>
  );
}
