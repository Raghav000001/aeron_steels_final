'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';

const images = [
  '/images/service_chemical_1778761046335.png',
  '/images/service_mechanical_1778761074973.png',
  '/images/service_power_1778761289382.png',
  '/images/service_material_1778761584582.png',
  '/images/hero_bg_1778760928163.png',
  '/images/about_worker_1778760981240.png',
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function InfrastructurePage() {
  return (
    <main>
      <PageBanner 
        title="Infrastructure" 
        subtitle="Home > Infrastructure" 
        bgImage="/images/service_mechanical_1778761074973.png" 
      />
      
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-light uppercase text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            State of the Art <strong className="font-bold text-[#FF5B22]">Facilities</strong>
          </motion.h2>
          <motion.div
            className="w-16 h-1 bg-[#FF5B22] mx-auto mb-12 md:mb-16"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-100px' }}
          >
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="group overflow-hidden relative shadow-md"
                variants={imageVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <img
                  src={src}
                  alt={`Facility ${i + 1}`}
                  className="w-full h-56 md:h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white border-2 border-white px-4 md:px-6 py-2 uppercase text-[0.65rem] md:text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer">
                    View Details
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
