"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

export default function AboutSection() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Text Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-8">
              <motion.span 
                className="text-gray-500 font-medium tracking-wide uppercase text-sm mb-2 block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                About Aeron Steels
              </motion.span>
              <div className="flex flex-col items-start gap-4">
                <h2 className="text-3xl lg:text-4xl uppercase leading-tight font-light text-gray-800">
                  <span className="font-bold text-[#FF5B22]">STEEL INNOVATION</span> AND MANUFACTURING
                </h2>
                <motion.div 
                  className="w-12 h-1 bg-[#FF5B22]"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </div>
            </div>

            <motion.p 
              className="text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              At ASPL, we specialize in high-quality steel products, committed to excellence and innovation in manufacturing. 
              Our dedication ensures we meet the diverse needs of our clients across various industries. 
            </motion.p>
            <motion.p 
              className="text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              With 10+ years on the market, we maintain high quality standards across our modern equipment. We pride ourselves on providing highly durable products through custom fabrication while ensuring stringent quality assurance and efficient service.
            </motion.p>

            <motion.button 
              className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 rounded-full uppercase text-sm transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More ⊕
            </motion.button>
          </motion.div>

          {/* Right Image Content */}
          <motion.div 
            className="lg:w-1/2 flex justify-center relative mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Primary circle image */}
            <motion.div 
              className="w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-8 border-white shadow-xl relative z-10"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                className="w-full h-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="/images/hero_bg_1778760928163.png" 
                  alt="Factory Interior" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            
            {/* Overlapping smaller circle */}
            <motion.div 
              className="absolute bottom-0 left-0 lg:-left-10 w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl z-20"
              initial={{ scale: 0.7, opacity: 0, x: -30 }}
              whileInView={{ scale: 1, opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="w-full h-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="/images/about_worker_1778760981240.png" 
                  alt="Industrial Worker" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
