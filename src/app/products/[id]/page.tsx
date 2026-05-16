'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductData {
  _id: string;
  title: string;
  src: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProduct(data.product);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#FF5B22] border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400 text-sm uppercase tracking-widest">Loading...</span>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link
            href="/products"
            className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 uppercase text-sm transition-colors duration-300"
          >
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb Bar */}
      <div className="w-full border-b border-gray-100 bg-gray-50">
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-400 hover:text-[#FF5B22] transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="text-gray-400 hover:text-[#FF5B22] transition-colors">Products</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium truncate max-w-[200px] md:max-w-none">{product.title}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

            {/* Product Image */}
            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.button
                onClick={() => setLightboxOpen(true)}
                className="w-full group cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <img
                    src={product.src}
                    alt={product.title}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FF5B22]/90 px-5 py-2 rounded-sm">
                      Click to Enlarge
                    </span>
                  </div>
                </div>
              </motion.button>
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
              <span className="text-[#FF5B22] text-xs font-bold uppercase tracking-[0.15em] block mb-3">
                Product Detail
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {product.title}
              </h1>

              <div className="w-14 h-1 bg-[#FF5B22] mb-8" />

              <p className="text-gray-500 leading-relaxed mb-8 text-sm md:text-base">
                High-quality precision manufactured component from Aeron Steels Private Limited.
                Engineered for durability, fabricated to exact specifications, and quality-tested
                to meet rigorous industrial standards across all applications.
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Material', value: 'High-Grade Steel' },
                  { label: 'Finish', value: 'Industrial Grade' },
                  { label: 'Quality Standard', value: 'ISO 9001:2015' },
                  { label: 'Availability', value: 'In Stock' },
                ].map((spec) => (
                  <div key={spec.label} className="bg-gray-50 rounded-sm p-4 border-l-2 border-[#FF5B22]">
                    <span className="block text-[0.6rem] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                      {spec.label}
                    </span>
                    <span className="block text-sm font-semibold text-gray-800">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact-us"
                  className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 uppercase text-sm transition-colors duration-300 text-center"
                >
                  Request Quote
                </Link>
                <Link
                  href="/products"
                  className="border border-gray-300 hover:border-[#FF5B22] text-gray-600 hover:text-[#FF5B22] font-bold py-3 px-8 uppercase text-sm transition-colors duration-300 text-center"
                >
                  ← All Products
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-10"
              onClick={() => setLightboxOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            <motion.img
              src={product.src}
              alt={product.title}
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
