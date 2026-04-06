import { FadeIn } from '@/components/animations';
import { H1, Lead } from '@/components/shadcn/typography';

export function MenuHero() {
  return (
    <section className="relative py-24 px-4 text-center border-b border-border bg-muted/30">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-4">
        <FadeIn>
          <p className="text-sm font-medium text-primary tracking-widest uppercase">Our Menu</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <H1>Crafted With Passion.</H1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Lead className="text-muted-foreground">
            From classic comfort food to bold fusion cuisine — there is something for every palate.
          </Lead>
        </FadeIn>
      </div>
    </section>
  );
}
