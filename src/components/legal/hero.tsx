import { FadeIn } from '@/components/animations';
import { H1, Muted } from '@/components/shadcn/typography';

interface LegalHeroProps {
  title: string;
  lastUpdated: string;
}

export function LegalHero({ title, lastUpdated }: LegalHeroProps) {
  return (
    <section className="relative py-24 px-4 text-center border-b border-border bg-muted/30">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-4">
        <FadeIn>
          <p className="text-sm font-medium text-primary tracking-widest uppercase">Legal</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <H1>{title}</H1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Muted>Last updated: {lastUpdated}</Muted>
        </FadeIn>
      </div>
    </section>
  );
}
