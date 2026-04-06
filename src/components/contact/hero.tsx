import { FadeIn } from '@/components/animations';
import { H1, Lead } from '@/components/shadcn/typography';

export function ContactHero() {
  return (
    <section className="relative py-24 px-4 text-center border-b border-border bg-muted/30">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-4">
        <FadeIn>
          <p className="text-sm font-medium text-primary tracking-widest uppercase">Get In Touch</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <H1>We&apos;d Love to Hear From You.</H1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Lead className="text-muted-foreground">
            Have a question, feedback, or just want to make a reservation? We&apos;re here and happy
            to help.
          </Lead>
        </FadeIn>
      </div>
    </section>
  );
}
