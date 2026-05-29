import type { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

interface ProductDoc {
  _id: { toString(): string };
  title: string;
  src: string;
}

async function getProduct(id: string) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return {
      _id: (product._id as { toString(): string }).toString(),
      title: product.title,
      src: product.src,
    };
  } catch (error) {
    console.error('getProduct error:', error);
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
