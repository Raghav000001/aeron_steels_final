"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function QuoteBannerSection() {
  return (
    <section 
      className="relative py-20 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/photos/home/custom_sheet_metal_components.png')" }}
    >
      <div className="absolute inset-0 bg-[#16212b]/80"></div>
      
      <motion.div 
        className="max-w-[1240px] relative z-10 mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2 
          className="text-3xl text-white font-bold uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get a <span className="text-[#FF5B22]">Quote</span>
        </motion.h2>
        
        <motion.div 
          className="w-10 h-[2px] bg-[#FF5B22] mx-auto mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        <motion.p 
          className="text-gray-300 text-sm max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Share your requirements and get a customized quote tailored to your specifications.
        </motion.p>

        <motion.button 
          className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 rounded-full uppercase text-sm transition-colors duration-300 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get a Quote ⊕
        </motion.button>
      </motion.div>
    </section>
  );
}
