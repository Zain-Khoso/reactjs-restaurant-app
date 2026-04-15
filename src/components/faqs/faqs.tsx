import { FadeIn, StaggerChildren, StaggerItem } from '@/components/animations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/accordion';
import { H2, SectionLabel } from '@/components/shadcn/typography';

const FAQS = [
  {
    category: 'Orders & Delivery',
    items: [
      {
        question: 'How do I place an order?',
        answer:
          'You can place an order directly through our website by browsing the menu, adding items to your cart, and proceeding to checkout. You can pay securely online and your order will be confirmed via email.',
      },
      {
        question: 'What is the estimated delivery time?',
        answer:
          'Delivery typically takes 30–45 minutes depending on your location and how busy our kitchen is. You will receive a notification once your order is on its way.',
      },
      {
        question: 'Can I modify or cancel my order after placing it?',
        answer:
          'You can modify or cancel your order within 5 minutes of placing it by contacting us directly at contact@urbandish.com or calling us. After that, your order will already be in preparation.',
      },
      {
        question: 'Is there a minimum order amount for delivery?',
        answer:
          'Yes, there is a minimum order amount of Rs 500 for delivery. Orders below this amount can still be placed for dine-in or takeaway.',
      },
    ],
  },
  {
    category: 'Reservations',
    items: [
      {
        question: 'How do I book a table?',
        answer:
          'You can book a table through our Reservations page. Simply select your preferred date, time, and party size, fill in your details, and submit. You will receive a confirmation email shortly after.',
      },
      {
        question: 'How far in advance can I make a reservation?',
        answer:
          'You can book a table up to 30 days in advance. For large groups of 10 or more, we recommend booking at least a week ahead to ensure availability.',
      },
      {
        question: 'What is your cancellation policy for reservations?',
        answer:
          'We ask that you cancel at least 2 hours before your reservation time. Repeated no-shows may result in restricted booking privileges.',
      },
    ],
  },
  {
    category: 'Menu & Dietary',
    items: [
      {
        question: 'Do you offer vegetarian or vegan options?',
        answer:
          'Yes, we have a wide range of vegetarian and vegan dishes on our menu. Each dish is clearly labeled with dietary tags so you can easily find what suits you.',
      },
      {
        question: 'Can I customize my order for allergies?',
        answer:
          'Absolutely. You can add special instructions when placing your order. However, please note that our kitchen handles all allergens and we cannot guarantee a completely allergen-free environment.',
      },
      {
        question: 'Are your ingredients locally sourced?',
        answer:
          'We source the majority of our ingredients from local suppliers. We believe in supporting local farmers and producers while ensuring the freshest possible ingredients in every dish.',
      },
    ],
  },
  {
    category: 'Payments & Pricing',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit and debit cards through our secure Stripe payment gateway. Cash on delivery is also available for local orders.',
      },
      {
        question: 'Are your prices inclusive of taxes?',
        answer:
          'All prices displayed on our menu are inclusive of applicable taxes. There are no hidden charges — what you see is what you pay.',
      },
      {
        question: 'Do you offer any discounts or loyalty rewards?',
        answer:
          'Yes, we have a loyalty program where you earn points on every order. Points can be redeemed for discounts on future orders. Sign up for an account to start earning.',
      },
    ],
  },
];

export function FaqsSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-3xl flex flex-col gap-14">
        {FAQS.map((group) => (
          <FadeIn key={group.category} className="flex flex-col gap-6">
            <div>
              <SectionLabel>{group.category}</SectionLabel>
              <H2 className="mt-1 text-2xl">{group.category}</H2>
            </div>
            <StaggerChildren className="flex flex-col gap-2">
              <Accordion type="single" collapsible className="flex flex-col gap-2">
                {group.items.map((faq) => (
                  <StaggerItem key={faq.question}>
                    <AccordionItem
                      value={faq.question}
                      className="border border-border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </StaggerItem>
                ))}
              </Accordion>
            </StaggerChildren>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export const dynamic = 'force-static';
export const revalidate = 3600;
