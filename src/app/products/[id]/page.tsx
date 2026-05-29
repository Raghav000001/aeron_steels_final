import type { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  try {
    const baseUrl = process.env.INTERNAL_API_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.product || data.product || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: product.title,
    description: `High-quality precision manufactured component from Aeron Steels Private Limited — ${product.title}. ISO 9001:2015 certified quality.`,
    openGraph: {
      title: `${product.title} | Aeron Steels`,
      description: `Premium steel product: ${product.title} from Aeron Steels Private Limited.`,
      images: product.src ? [{ url: product.src, alt: product.title }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
