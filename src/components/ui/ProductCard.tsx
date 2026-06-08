'use client';

import React from 'react';
import Link from 'next/link';

export interface ProductCardData {
  /** Unique identifier (MongoDB _id or product name) */
  id: string;
  /** Display name */
  name: string;
  /** Image URL or path */
  image: string;
  /** Optional category badge text */
  category?: string;
  /** Optional product code / SKU */
  code?: string;
}

interface ProductCardProps {
  product: ProductCardData;
  /** Href for the "View Details" link/action */
  detailHref?: string;
  /** Called when "View Details" is clicked */
  onViewDetails?: (product: ProductCardData) => void;
  /** Called when "Request Quote" is clicked */
  onRequestQuote?: (product: ProductCardData) => void;
}

export default function ProductCard({
  product,
  detailHref,
  onViewDetails,
  onRequestQuote,
}: ProductCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#FF5B22] transition-all duration-300 flex flex-col">
      {/* Image Area */}
      <div className="aspect-[4/3] bg-white p-5 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="px-4 pb-4 pt-2 flex flex-col gap-2 flex-1">
        {/* Category badge */}
        {product.category && (
          <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#FF5B22] bg-orange-50 px-2.5 py-1 rounded-full w-fit">
            {product.category}
          </span>
        )}

        {/* Product name */}
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Product code */}
        {product.code && (
          <span className="text-[0.65rem] text-gray-400 font-mono">
            {product.code}
          </span>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          {/* View Details */}
          {detailHref ? (
            <Link
              href={detailHref}
              className="flex-1 text-center bg-[#FF5B22] hover:bg-[#e04b19] text-white text-[0.65rem] font-bold uppercase py-2.5 px-3 rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-orange-200"
            >
              View Details
            </Link>
          ) : (
            <button
              onClick={() => onViewDetails?.(product)}
              className="flex-1 bg-[#FF5B22] hover:bg-[#e04b19] text-white text-[0.65rem] font-bold uppercase py-2.5 px-3 rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-orange-200 cursor-pointer"
            >
              View Details
            </button>
          )}

          {/* Request Quote */}
          <Link
            href={`/contact-us?product=${encodeURIComponent(product.name)}`}
            onClick={(e) => {
              if (onRequestQuote) {
                e.preventDefault();
                onRequestQuote(product);
              }
            }}
            className="flex-1 text-center border-2 border-[#FF5B22] text-[#FF5B22] hover:bg-[#FF5B22] hover:text-white text-[0.65rem] font-bold uppercase py-2.5 px-3 rounded-lg transition-all duration-200"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
