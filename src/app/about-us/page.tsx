import type { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Aeron Steels Private Limited (ASPL) — 10+ years of steel manufacturing excellence in Rohtak, Haryana. ISO 9001:2015 certified, custom fabrication, precision component manufacturing.',
  openGraph: {
    title: 'About Us | Aeron Steels',
    description:
      'ASPL — steel manufacturing, custom fabrication, and quality assurance since 2015.',
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
