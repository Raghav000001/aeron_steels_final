import type { Metadata } from 'next';
import CertificationsClient from './CertificationsClient';

export const metadata: Metadata = {
  title: 'Certifications',
  description:
    'Aeron Steels is ISO 9001:2015 certified for Quality Management System. View our official certification and learn about our commitment to manufacturing excellence.',
  openGraph: {
    title: 'Certifications | Aeron Steels',
    description:
      'ISO 9001:2015 certified steel manufacturing — quality assured by Aeron Steels Private Limited.',
  },
};

export default function CertificationsPage() {
  return <CertificationsClient />;
}
