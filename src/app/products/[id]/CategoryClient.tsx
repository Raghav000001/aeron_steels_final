'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import type { ProductCardData } from '@/components/ui/ProductCard';
import type { CategoryInfo, ProductItem } from '@/lib/item-data';

interface CategoryClientProps {
  category: CategoryInfo;
  products: ProductItem[];
}

const ITEMS_PER_PAGE = 8;

type SortOption = 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'A-Z' },
  { value: 'name-desc', label: 'Z-A' },
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
];

export default function CategoryClient({ category, products }: CategoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const [lightboxProduct, setLightboxProduct] = useState<ProductItem | null>(null);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'date-desc':
          return new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime();
        case 'date-asc':
          return new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [products, searchQuery, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages: (number | 'dots')[] = [];
    const delta = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== 'dots') {
        pages.push('dots');
      }
    }
    return pages;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
    setSortOpen(false);
  };

  const mapToCardData = (p: ProductItem): ProductCardData => ({
    id: p.name,
    name: p.name,
    image: p.imagePath,
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="w-full border-b border-gray-100 bg-gray-50">
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-400 hover:text-[#FF5B22] transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="text-gray-400 hover:text-[#FF5B22] transition-colors">Products</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium">{category.displayName}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#1C1D1F] py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {category.displayName}
          </motion.h1>
          <motion.p
            className="text-gray-400 text-sm md:text-base max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Browse our complete range of {category.displayName.toLowerCase()}. High-quality precision components manufactured by Aeron Steels Private Limited.
          </motion.p>
        </div>
      </section>

      {/* Controls: Search + Sort */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#FF5B22] focus:ring-1 focus:ring-[#FF5B22] transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider whitespace-nowrap">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </span>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  <span className="hidden sm:inline">
                    {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  </span>
                  <svg className={`w-3 h-3 transition-transform ${sortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                    <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSortChange(opt.value)}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                            sortBy === opt.value
                              ? 'bg-orange-50 text-[#FF5B22] font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="max-w-[1240px] mx-auto px-6">
          {paginated.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-5">
                <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">No products found matching your search.</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#FF5B22] text-sm hover:underline cursor-pointer"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginated.map((product, idx) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                >
                  <ProductCard
                    product={mapToCardData(product)}
                    onViewDetails={() => setLightboxProduct(product)}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:hover:bg-white cursor-pointer"
              >
                &larr; Prev
              </button>

              {getPageNumbers().map((page, i) =>
                page === 'dots' ? (
                  <span key={`dots-${i}`} className="px-2 text-gray-400">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#FF5B22] text-white shadow-sm'
                        : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:border-[#FF5B22] hover:text-[#FF5B22]'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:hover:bg-white cursor-pointer"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxProduct && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxProduct(null)}
          >
            <button
              onClick={() => setLightboxProduct(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-10 cursor-pointer"
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              className="max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gray-100 flex items-center justify-center p-6">
                <img
                  src={lightboxProduct.imagePath}
                  alt={lightboxProduct.name}
                  className="max-h-[55vh] w-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{lightboxProduct.name}</h3>
                <Link
                  href="/contact-us"
                  className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors inline-block"
                >
                  Enquire Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
