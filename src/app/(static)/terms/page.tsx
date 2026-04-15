import type { Metadata } from 'next';
import { LegalHero } from '@/components/legal/hero';
import { LegalContent } from '@/components/legal/content';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read the Terms and Conditions for using Urban Dish services.',
};

export default function TermsPage() {
  return (
    <>
      <LegalHero title="Terms & Conditions" lastUpdated="April 2026" />
      <LegalContent>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Urban Dish website and services, you agree to be bound by these
          Terms and Conditions. If you do not agree with any part of these terms, please do not use
          our services.
        </p>

        <h2>2. Use of Services</h2>
        <p>
          Urban Dish provides an online platform for browsing our menu, placing food orders, and
          making table reservations. You agree to use these services only for lawful purposes and in
          a manner consistent with all applicable laws and regulations.
        </p>

        <h2>3. Orders and Payments</h2>
        <p>
          All orders placed through Urban Dish are subject to availability and confirmation. Prices
          are listed in Pakistani Rupees (PKR) and are subject to change without notice. Payment is
          processed securely through our payment provider. We reserve the right to cancel any order
          at our discretion.
        </p>

        <h2>4. Reservations</h2>
        <p>
          Table reservations are subject to availability. We ask that you notify us at least 2 hours
          in advance if you need to cancel or modify your reservation. Repeated no-shows may result
          in restricted booking privileges.
        </p>

        <h2>5. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. Urban
          Dish is not liable for any loss or damage arising from unauthorized use of your account.
          Please notify us immediately if you suspect any unauthorized activity.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content on this website, including text, images, logos, and graphics, is the property
          of Urban Dish and is protected by applicable intellectual property laws. You may not
          reproduce, distribute, or use our content without prior written permission.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          Urban Dish shall not be liable for any indirect, incidental, or consequential damages
          arising from your use of our services. Our total liability to you for any claim shall not
          exceed the amount paid by you for the relevant order or service.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms and Conditions at any time. Changes will be
          posted on this page with an updated date. Continued use of our services after changes
          constitutes acceptance of the revised terms.
        </p>

        <h2>9. Contact</h2>
        <p>
          If you have any questions about these Terms and Conditions, please contact us at{' '}
          <a href="mailto:contact@urbandish.com">contact@urbandish.com</a>.
        </p>
      </LegalContent>
    </>
  );
}

export const dynamic = 'force-static';
export const revalidate = 86400; // once a day
