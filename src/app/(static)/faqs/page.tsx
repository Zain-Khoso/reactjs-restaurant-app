import type { Metadata } from 'next';
import { FaqsHero } from '@/components/faqs/hero';
import { FaqsSection } from '@/components/faqs/faqs';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about Urban Dish.',
};

export default function FaqsPage() {
  return (
    <>
      <FaqsHero />
      <FaqsSection />
    </>
  );
}
