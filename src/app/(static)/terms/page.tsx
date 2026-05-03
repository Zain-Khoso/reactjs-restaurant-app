import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageContent } from '@/actions/admin';
import { LegalHero } from '@/components/legal/hero';
import { LegalContent } from '@/components/legal/content';
import { format } from 'date-fns';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('terms');
  return {
    title: page?.title ?? 'Terms & Conditions',
    description: 'Read the Terms and Conditions for using Urban Dish services.',
  };
}

export default async function TermsPage() {
  const page = await getPageContent('terms');
  if (!page) notFound();

  return (
    <>
      <LegalHero title={page.title} lastUpdated={format(new Date(page.updatedAt), 'MMMM yyyy')} />
      <LegalContent>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </LegalContent>
    </>
  );
}
