import { FadeIn } from '@/components/animations';
import { H1, Lead } from '@/components/shadcn/typography';

export function FaqsHero() {
  return (
    <section className="relative py-24 px-4 text-center border-b border-border bg-muted/30">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-4">
        <FadeIn>
          <p className="text-sm font-medium text-primary tracking-widest uppercase">FAQs</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <H1>Got Questions?</H1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Lead className="text-muted-foreground">
            We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, feel free
            to reach out to us directly.
          </Lead>
        </FadeIn>
      </div>
    </section>
  );
}
