'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/focus-cards';

interface ProductCard {
  _id: string;
  title: string;
  src: string;
}

interface ProductGridProps {
  products: ProductCard[];
  itemsPerPage?: number;
}

export default function ProductGrid({ products, itemsPerPage = 6 }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [hovered, setHovered] = useState<number | null>(null);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

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

  const renderCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {currentProducts.map((product, index) => (
        <Link key={product._id} href={`/products/${product._id}`}>
          <Card
            card={{ title: product.title, src: product.src }}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        </Link>
      ))}
    </div>
  );

  if (totalPages <= 1) {
    return renderCards();
  }

  return (
    <div>
      {renderCards()}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-16">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:hover:bg-white"
          >
            ← Prev
          </button>

          {getPageNumbers().map((page, i) =>
            page === 'dots' ? (
              <span key={`dots-${i}`} className="px-2 text-gray-400">...</span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 text-sm font-medium rounded-sm transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-[#FF5B22] text-white'
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
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:hover:bg-white"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
