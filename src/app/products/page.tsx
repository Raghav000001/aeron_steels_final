import type { Metadata } from 'next';
import PageBanner from '@/components/ui/PageBanner';
import ProductGrid from '@/components/ui/product-grid';

interface ProductData {
  _id: string;
  title: string;
  src: string;
}

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse our catalog of high-quality steel products including mounting plates, CTL sheets, custom fabricated components, and precision-machined parts by Aeron Steels Private Limited.',
  openGraph: {
    title: 'Products | Aeron Steels',
    description:
      'Steel products catalog — mounting plates, CTL sheets, fabricated components, and more from Aeron Steels.',
  },
};

async function getProducts(): Promise<ProductData[]> {
  try {
    const baseUrl = process.env.INTERNAL_API_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return (data.data || data.products) as ProductData[];
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <PageBanner
        title="Products"
        subtitle="Home > Products"
        bgImage="/images/service_material_1778761584582.png"
      />

      <section className="py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          {products.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No products available yet. Connect MongoDB and add products to get started.
            </p>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>
    </main>
  );
}
