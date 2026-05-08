// Actions
import { getFeaturedItems } from '@/actions/menu';
import { getChefs, getTestimonials } from '@/actions/admin';

// Components
import { Hero } from '@/components/home/hero';
import { Features } from '@/components/home/features';
import { AboutSnippet } from '@/components/home/about-snippet';
import { Chefs } from '@/components/home/chefs';
import { BestDishes } from '@/components/home/best-dishes';
import { Testimonials } from '@/components/home/testimonials';

export const revalidate = 3600;

// Component
export default async function HomePage() {
  const [featuredDishes, chefs, testimonials] = await Promise.all([
    getFeaturedItems(),
    getChefs(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <Features />
      <AboutSnippet />
      <Chefs chefs={chefs} />
      <BestDishes dishes={featuredDishes} />
      <Testimonials testimonials={testimonials} />
    </>
  );
}
