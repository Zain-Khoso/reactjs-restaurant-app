import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/hero';
import { ContactSection } from '@/components/contact/form';
import { ContactMap } from '@/components/contact/map';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Urban Dish. Find our location, opening hours, and send us a message.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactMap />
    </>
  );
}
