import { FadeIn } from '@/components/animations';

export function LegalContent({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 px-4">
      <FadeIn>
        <div className="mx-auto max-w-3xl prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:underline">
          {children}
        </div>
      </FadeIn>
    </section>
  );
}
