"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  const fadeInUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  });

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/photos/home/big_circle.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex items-center w-full h-full">
        <div className="w-full max-w-[1240px] mx-auto px-6 pt-32 md:pt-36 lg:pt-40">
          <motion.div className="max-w-2xl" {...fadeInUp(0.2)}>
            <motion.span
              className="inline-block text-[#FF5B22] text-sm md:text-base font-bold uppercase tracking-[0.25em] mb-5"
              {...fadeInUp(0.15)}
            >
              Transforming Steel into Solutions
            </motion.span>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.05] text-white mb-6 drop-shadow-lg"
              {...fadeInUp(0.25)}
            >
              Your Steel,
              <br />
              <span className="text-[#FF5B22]">Your Way</span>
            </motion.h1>

            <motion.p
              className="text-gray-300 text-lg md:text-xl lg:text-2xl mb-10 font-light leading-relaxed max-w-xl"
              {...fadeInUp(0.35)}
            >
              Precision in every process
            </motion.p>

            <motion.div {...fadeInUp(0.45)}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push('/contact-us')}
                className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3.5 px-9 uppercase text-sm tracking-wider transition-all duration-200 shadow-xl shadow-orange-900/30 cursor-pointer"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
