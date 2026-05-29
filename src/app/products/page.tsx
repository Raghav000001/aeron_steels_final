import type { Metadata } from 'next';
import PageBanner from '@/components/ui/PageBanner';
import ProductGrid from '@/components/ui/product-grid';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';

export const dynamic = 'force-dynamic';

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
    await connectDB();
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    return products.map((p) => ({
      _id: (p._id as { toString(): string }).toString(),
      title: p.title,
      src: p.src,
    }));
  } catch (error) {
    console.error('getProducts error:', error);
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
