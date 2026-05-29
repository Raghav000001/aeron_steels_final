"use client";

import React from 'react';
import { motion } from 'framer-motion';

const exhibitionImages = [
  {
    src: '/photos/home/automechanika_delhi_1.jpg',
    alt: 'ACMA Automechanika 2026, New Delhi - Aeron Steels Booth'
  },
  {
    src: '/photos/home/automechanika_delhi_2.jpg',
    alt: 'ACMA Automechanika 2026, New Delhi - Exhibition View'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const imageVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

export default function ExhibitionsSection() {
  return (
    <section className="py-28 bg-[#F5F5F5] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-sm font-medium tracking-wide uppercase mb-2 text-gray-500">
            Our Presence
          </span>
          <h2 className="text-3xl lg:text-4xl uppercase leading-tight font-light text-gray-800 mb-4">
            Participation in <strong className="font-bold text-[#FF5B22]">International Exhibitions</strong>
          </h2>
          <motion.div 
            className="w-12 h-[2px] bg-[#FF5B22]"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </motion.div>

        {/* Exhibition Images Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
        >
          {exhibitionImages.map((img, i) => (
            <motion.div
              key={i}
              className="group overflow-hidden relative shadow-lg rounded-sm"
              variants={imageVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-72 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white text-sm font-medium">ACMA Automechanika 2026, New Delhi</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
