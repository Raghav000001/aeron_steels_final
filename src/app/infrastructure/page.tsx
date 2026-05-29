import type { Metadata } from 'next';
import InfrastructureClient from './InfrastructureClient';

export const metadata: Metadata = {
  title: 'Infrastructure',
  description:
    'Explore the state-of-the-art facilities at Aeron Steels Private Limited in Rohtak, Haryana. Modern steel manufacturing plant with advanced fabrication and quality control equipment.',
  openGraph: {
    title: 'Infrastructure | Aeron Steels',
    description:
      'State-of-the-art steel manufacturing facilities at Aeron Steels Private Limited, Rohtak, Haryana.',
  },
};

export default function InfrastructurePage() {
  return <InfrastructureClient />;
}
