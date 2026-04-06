// Animations
import { FadeIn } from '@/components/animations';
// Typography
import { H1, Lead } from '@/components/shadcn/typography';

export function AboutHero() {
  return (
    <section className="relative py-24 px-4 text-center border-b border-border bg-muted/30">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-4">
        <FadeIn>
          <p className="text-sm font-medium text-primary tracking-widest uppercase">Our Story</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <H1>More Than Just a Restaurant.</H1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Lead className="text-muted-foreground">
            Urban Dish was born from a simple belief — that great food brings people together.
            We&apos;ve spent decades perfecting that belief, one dish at a time.
          </Lead>
        </FadeIn>
      </div>
    </section>
  );
}
