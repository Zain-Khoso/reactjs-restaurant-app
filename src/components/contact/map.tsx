import { FadeIn } from '@/components/animations';
import { H2, SectionLabel } from '@/components/shadcn/typography';

export function ContactMap() {
  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-10">
        <FadeIn className="text-center">
          <SectionLabel className="justify-center">Our Location</SectionLabel>
          <H2 className="mt-1">Come visit us.</H2>
        </FadeIn>

        <FadeIn delay={0.2} className="w-full">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm w-full h-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7062.941857037873!2d68.83110248149768!3d27.733617216668552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3935d5002a983411%3A0x75157d2ea8a3277f!2sNEHAL%20KHAN%20KHOSA%20GOTH!5e0!3m2!1sen!2s!4v1775474152145!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Urban Dish location"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
