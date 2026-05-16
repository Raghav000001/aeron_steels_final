"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: "/images/hero_bg_1778760928163.png",
    titleLight: "AERON STEELS",
    titleBold: "PRIVATE LIMITED",
    desc: "At ASPL, we specialize in high-quality steel products, committed to excellence and innovation in manufacturing."
  },
  {
    image: "/images/service_material_1778761584582.png",
    titleLight: "CUSTOM",
    titleBold: "FABRICATION",
    desc: "10+ years on the market with high quality standards. Providing top tier quality for all industrial processing needs globally."
  },
  {
    image: "/images/service_power_1778761289382.png",
    titleLight: "QUALITY",
    titleBold: "ASSURANCE",
    desc: "Dedication to delivering durable products and efficient service to meet the diverse needs of our clients."
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      <div className="relative z-20 flex items-center justify-center w-full h-full px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4 leading-tight text-white drop-shadow-lg">
              {slides[currentIndex].titleLight} <br/>
              <span className="font-light text-gray-300">{slides[currentIndex].titleBold}</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base mb-8 max-w-2xl mx-auto">
              {slides[currentIndex].desc}
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 uppercase text-sm transition-colors duration-300 shadow-xl"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        onClick={prevSlide}
        className="absolute z-30 left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#FF5B22] text-white p-4 backdrop-blur-sm transition-colors border border-white/20"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute z-30 right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#FF5B22] text-white p-4 backdrop-blur-sm transition-colors border border-white/20"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </section>
  );
}
