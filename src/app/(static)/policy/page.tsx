import type { Metadata } from 'next';
import { LegalHero } from '@/components/legal/hero';
import { LegalContent } from '@/components/legal/content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Privacy Policy for Urban Dish.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalHero title="Privacy Policy" lastUpdated="April 2026" />
      <LegalContent>
        <h2>1. Information We Collect</h2>
        <p>
          When you use Urban Dish, we may collect the following types of information: your name,
          email address, phone number, delivery address, and payment information when you place an
          order or create an account. We also collect usage data such as pages visited and actions
          taken on our platform.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to process your orders and reservations, communicate
          with you about your account and orders, improve our services, and send you promotional
          offers if you have opted in. We do not sell your personal data to third parties.
        </p>

        <h2>3. Cookies</h2>
        <p>
          Urban Dish uses cookies to enhance your browsing experience, remember your preferences,
          and analyze site traffic. You can control cookie settings through your browser. Disabling
          cookies may affect the functionality of certain features on our platform.
        </p>

        <h2>4. Data Sharing</h2>
        <p>
          We may share your information with trusted third-party service providers who assist in
          operating our website and services, such as payment processors and delivery partners.
          These parties are contractually obligated to keep your information confidential and use it
          only for the purposes we specify.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal data from
          unauthorized access, alteration, or disclosure. However, no method of transmission over
          the internet is completely secure, and we cannot guarantee absolute security.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your personal data for as long as your account is active or as needed to provide
          services. You may request deletion of your account and associated data at any time by
          contacting us directly.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data at any time. You may
          also opt out of marketing communications by clicking the unsubscribe link in any email we
          send or by contacting us directly.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be reflected on this
          page with a revised date. We encourage you to review this policy periodically.
        </p>

        <h2>9. Contact</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please reach out to us at{' '}
          <a href="mailto:contact@urbandish.com">contact@urbandish.com</a>.
        </p>
      </LegalContent>
    </>
  );
}

export const dynamic = 'force-static';
export const revalidate = 86400;
