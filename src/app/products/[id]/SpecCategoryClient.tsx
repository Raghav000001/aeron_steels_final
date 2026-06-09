'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CategoryInfo, ProductItem } from '@/lib/item-data';

interface SpecRow {
  label: string;
  crca: string;
  hrHrpo: string;
}

interface SpecSheetData {
  columns: [string, string];
  rows: SpecRow[];
}

interface CategoryHero {
  description: string;
}

const HERO_DATA: Record<string, CategoryHero> = {
  'hr-hrpo-crca-slit-coils': {
    description:
      'Precision slit coils available in multiple thicknesses, widths and grades for industrial applications.',
  },
  'hr-hrpo-crca-sheets-strips': {
    description:
      'High-quality sheets and strips manufactured to tight tolerances for diverse industrial requirements.',
  },
};

const SPEC_DATA: Record<string, SpecSheetData> = {
  'hr-hrpo-crca-slit-coils': {
    columns: ['CRCA', 'HR / HRPO'],
    rows: [
      { label: 'Thickness', crca: '0.40 to 1.6 mm', hrHrpo: '1.6 mm to 3.5 mm' },
      { label: 'Width', crca: '10 mm to 250 mm', hrHrpo: '20 mm to 450 mm' },
      { label: 'Grade', crca: 'As per Availability', hrHrpo: 'As per Availability' },
    ],
  },
  'hr-hrpo-crca-sheets-strips': {
    columns: ['CRCA', 'HR / HRPO'],
    rows: [
      { label: 'Thickness', crca: '0.40 to 1.6 mm', hrHrpo: '1.6 mm to 8 mm' },
      { label: 'Width', crca: '50 mm to 600 mm', hrHrpo: '25 mm to 600 mm' },
      { label: 'Length', crca: 'Upto 2500 mm', hrHrpo: 'Upto 2500 mm' },
      { label: 'Grade', crca: 'As per Availability', hrHrpo: 'As per Availability' },
    ],
  },
};

const LABEL_ICONS: Record<string, string> = {
  Thickness: 'M12 20V10m0 0l-4 4m4-4l4 4',
  Width: 'M8 7h8M8 7a4 4 0 118 0M8 7a4 4 0 11-8 0m16 0a4 4 0 11-8 0',
  Length: 'M3 12h18M3 12a9 9 0 0118 0M3 12a9 9 0 0018 0',
  Grade: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
};

interface SpecCategoryClientProps {
  category: CategoryInfo;
  products: ProductItem[];
}

export default function SpecCategoryClient({ category, products }: SpecCategoryClientProps) {
  const hero = HERO_DATA[category.slug];
  const spec = SPEC_DATA[category.slug];

  const mainImage = products[0];
  const gridImages = products.slice(1, 3);

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full border-b border-gray-100 bg-gray-50">
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-400 hover:text-[#FF5B22] transition-colors">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="text-gray-400 hover:text-[#FF5B22] transition-colors">
            Products
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium">{category.displayName}</span>
        </div>
      </div>

      <section className="relative bg-[#1C1D1F] py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {category.displayName}
          </motion.h1>
          {hero && (
            <motion.p
              className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {hero.description}
            </motion.p>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-[60%]">
              <motion.div
                className="relative w-full aspect-[4/3] bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {mainImage ? (
                  <Image
                    src={encodeURI(mainImage.imagePath)}
                    alt={mainImage.name}
                    fill
                    className="object-contain p-4 md:p-8"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
                    No image available
                  </div>
                )}
              </motion.div>
            </div>

            <div className="lg:w-[40%] flex flex-col gap-4">
              {gridImages.length > 0 ? (
                gridImages.map((img, i) => (
                  <motion.div
                    key={img.name}
                    className="relative w-full flex-1 min-h-[160px] md:min-h-[200px] bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  >
                    <Image
                      src={encodeURI(img.imagePath)}
                      alt={img.name}
                      fill
                      className="object-contain p-4 md:p-6"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </motion.div>
                ))
              ) : (
                <>
                  <div className="relative w-full flex-1 min-h-[160px] md:min-h-[200px] bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                    No additional images
                  </div>
                  <div className="relative w-full flex-1 min-h-[160px] md:min-h-[200px] bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                    No additional images
                  </div>
                </>
              )}

              {gridImages.length === 1 && (
                <div className="relative w-full flex-1 min-h-[160px] md:min-h-[200px]" />
              )}
            </div>
          </div>
        </div>
      </section>

      {spec && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-[1240px] mx-auto px-6">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#FF5B22]">
                Technical Specifications
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                Specifications
              </h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
                Detailed specifications for {category.displayName.toLowerCase()}
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr] gap-4 mb-4">
                <div className="text-[0.65rem] font-bold uppercase tracking-wider text-gray-400 pl-3">
                  Specification
                </div>
                <div className="text-[0.65rem] font-bold uppercase tracking-wider text-center text-white bg-[#FF5B22] rounded-lg px-4 py-2.5 shadow-sm shadow-orange-200">
                  {spec.columns[0]}
                </div>
                <div className="text-[0.65rem] font-bold uppercase tracking-wider text-center text-white bg-gray-800 rounded-lg px-4 py-2.5 shadow-sm">
                  {spec.columns[1]}
                </div>
              </div>

              <div className="space-y-2.5">
                {spec.rows.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.06 * i, ease: 'easeOut' }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-2 md:gap-4 p-3.5 md:p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 pb-2 md:pb-0 border-b border-gray-100 md:border-b-0">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                        <svg
                          className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF5B22]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={
                              LABEL_ICONS[row.label] ||
                              'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            }
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-gray-800">{row.label}</span>
                    </div>

                    <div className="flex md:flex-col items-center md:items-center gap-2 md:gap-1">
                      <span className="md:hidden text-[0.55rem] font-bold uppercase tracking-wider text-[#FF5B22]">
                        {spec.columns[0]}
                      </span>
                      <span className="text-sm text-gray-600 font-medium text-center w-full bg-orange-50/50 md:bg-transparent rounded-lg md:rounded-none px-3 md:px-0 py-2 md:py-0">
                        {row.crca}
                      </span>
                    </div>

                    <div className="flex md:flex-col items-center md:items-center gap-2 md:gap-1">
                      <span className="md:hidden text-[0.55rem] font-bold uppercase tracking-wider text-gray-500">
                        {spec.columns[1]}
                      </span>
                      <span className="text-sm text-gray-600 font-medium text-center w-full bg-gray-50 md:bg-transparent rounded-lg md:rounded-none px-3 md:px-0 py-2 md:py-0">
                        {row.hrHrpo}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 md:mt-6 flex items-start gap-2.5 text-xs text-gray-400 bg-white rounded-xl px-4 py-3.5 border border-gray-100">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Specifications are indicative and subject to availability. Please contact us for current stock and exact dimensions.</span>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-[1240px] mx-auto px-6 py-12 md:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Need More Information?
            </h3>
            <p className="text-sm text-gray-500 mb-6 max-w-lg mx-auto">
              Contact our team for detailed specifications, stock availability, and custom size enquiries.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.97]"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
