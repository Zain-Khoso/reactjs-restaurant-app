// Metadata
import type { Metadata } from 'next';
// Sections
import { AboutHero } from '@/components/about/hero';
import { AboutStory } from '@/components/about/story';
import { AboutStats } from '@/components/about/stats';
import { AboutValues } from '@/components/about/values';
import { Chefs } from '@/components/home/chefs';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Urban Dish — our story, our mission, and the people behind the food.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <Chefs />
      <AboutValues />
    </>
  );
}

export const dynamic = 'force-static';
export const revalidate = 3600;
