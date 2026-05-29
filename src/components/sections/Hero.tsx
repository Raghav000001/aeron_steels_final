"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/photos/home/big_circle.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      <div className="relative z-20 flex items-center justify-center w-full h-full px-4 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4 leading-tight text-white drop-shadow-lg">
            Your Steel, Your Way
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-3 max-w-2xl mx-auto font-light">
            Precision in every process
          </p>
          <p className="text-[#FF5B22] text-sm md:text-base mb-8 max-w-2xl mx-auto font-medium uppercase tracking-widest">
            Transforming Steel into Solutions
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 uppercase text-sm transition-colors duration-300 shadow-xl"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
