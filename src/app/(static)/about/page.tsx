// Metadata
import type { Metadata } from 'next';
// Sections
import { AboutHero } from '@/components/about/hero';
import { AboutStory } from '@/components/about/story';
import { AboutStats } from '@/components/about/stats';
import { AboutValues } from '@/components/about/values';
import { getChefs } from '@/actions/admin';
import { Chefs } from '@/components/home/chefs';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Urban Dish — our story, our mission, and the people behind the food.',
};

export default async function AboutPage() {
  const chefs = await getChefs();
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <Chefs chefs={chefs} />
      <AboutValues />
    </>
  );
}

export const dynamic = 'force-static';
export const revalidate = 3600;
