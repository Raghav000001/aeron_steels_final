import type { Metadata } from 'next';
import ContactUsClient from './ContactUsClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Aeron Steels Private Limited. Visit our office in Rohtak, Haryana, call us at +91 8307028125, or use the contact form to send us a message.',
  openGraph: {
    title: 'Contact Us | Aeron Steels',
    description:
      'Contact Aeron Steels in Rohtak, Haryana. Call +91 8307028125 or email aeronsteels28@gmail.com.',
  },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}
