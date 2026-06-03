'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';

const images: { src: string; name: string }[] = [
  { src: '/photos/infra/cnc_machine.jpg', name: 'CNC Machine' },
  { src: '/photos/infra/cold_rolling_mill.jpeg', name: 'Cold Rolling Mill' },
  { src: '/photos/infra/cut_to_length_line.jpg', name: 'Cut to Length Line' },
  { src: '/photos/infra/induction_hardening_machine.png', name: 'Induction Hardening Machine' },
  { src: '/photos/infra/power_presses.jpg', name: 'Power Presses' },
  { src: '/photos/infra/shearing_machines.webp', name: 'Shearing Machines' },
  { src: '/photos/infra/slitting_line.jpg', name: 'Slitting Line' },
  { src: '/photos/infra/vmc_machine.jpg', name: 'VMC Machine' },
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

export default function InfrastructureClient() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main>
      <PageBanner
        title="Infrastructure"
        subtitle="Home > Infrastructure"
        bgImage="/photos/infra/cnc_machine.jpg"
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
            {images.map((img, i) => (
              <motion.div
                key={i}
                className="group overflow-hidden relative shadow-md cursor-pointer"
                variants={imageVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedImage(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.name}
                  className="w-full h-56 md:h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white border-2 border-white px-4 md:px-6 py-2 uppercase text-[0.65rem] md:text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                    Click to Enlarge
                  </span>
                </div>
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-3">
                  <span className="text-white text-sm md:text-base font-semibold">
                    {img.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-10"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &#10005;
            </motion.button>
            <motion.img
              src={selectedImage}
              alt="Aeron Steels facility"
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
