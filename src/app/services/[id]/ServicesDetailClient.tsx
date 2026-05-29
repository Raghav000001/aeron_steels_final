'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ServiceData } from '@/lib/services-data';

interface ServicesDetailClientProps {
  service: ServiceData;
}

export default function ServicesDetailClient({ service }: ServicesDetailClientProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full border-b border-gray-100 bg-gray-50">
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-400 hover:text-[#FF5B22] transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium">{service.title}</span>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
              <span className="text-[#FF5B22] text-xs font-bold uppercase tracking-[0.15em] block mb-3">
                Our Service
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {service.title}
              </h1>
              <div className="w-14 h-1 bg-[#FF5B22] mb-8" />
              <p className="text-gray-500 leading-relaxed mb-8 text-sm md:text-base">
                {service.shortDesc}
              </p>

              <ul className="space-y-4 mb-10">
                {service.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                  >
                    <span className="text-[#FF5B22] mt-1 flex-shrink-0">&#9679;</span>
                    <span className="text-gray-600 text-sm md:text-base leading-relaxed">{detail}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact-us"
                  className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 uppercase text-sm transition-colors duration-300 text-center"
                >
                  Enquire Now
                </Link>
                <Link
                  href="/"
                  className="border border-gray-300 hover:border-[#FF5B22] text-gray-600 hover:text-[#FF5B22] font-bold py-3 px-8 uppercase text-sm transition-colors duration-300 text-center"
                >
                  &#8592; Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
