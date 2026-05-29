import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicesDetailClient from './ServicesDetailClient';
import { services } from '@/lib/services-data';

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ id: String(s.id) }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === Number(id));
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.title,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | Aeron Steels`,
      description: service.shortDesc,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === Number(id));
  if (!service) notFound();

  return <ServicesDetailClient service={service} />;
}
