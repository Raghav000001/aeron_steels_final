'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import AboutSection from '@/components/sections/About';
import ExhibitionsSection from '@/components/sections/Testimonials';

export default function AboutUsClient() {
  return (
    <main>
      <PageBanner
        title="About Us"
        subtitle="Home > About Us"
        bgImage="/images/service_material_1778761584582.png"
      />

      <AboutSection />

      <motion.section
        className="py-20 bg-gray-50 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold uppercase text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our History
          </motion.h2>
          <motion.div
            className="w-16 h-1 bg-[#FF5B22] mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.p
            className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Aeron Steels Private Limited (ASPL) has been a leader in high-quality steel products for over 10 years.
            Committed to excellence and innovation in manufacturing, we pride ourselves on utilizing modern equipment
            to produce top-tier mounting plates and precision CTL sheets. Our dedication ensures we meet the diverse
            needs of our clients across all major industrial sectors.
          </motion.p>
          <motion.p
            className="text-gray-600 leading-relaxed text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            By focusing on durable products, quality assurance, custom fabrication, and efficient service,
            ASPL continues to set the benchmark in component manufacturing and custom cutting. Located in Haryana,
            we support both domestic logistics and highly technical fabrication requirements globally.
          </motion.p>
        </div>
      </motion.section>

      <ExhibitionsSection />
    </main>
  );
}
