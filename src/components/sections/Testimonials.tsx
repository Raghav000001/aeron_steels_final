"use client";

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Maria Robinson',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet velit rhoncus, congue justo vel, ultrices orci. Nullam feugiat leo ac tincidunt consequat. Aenean sed pulvinar ex.',
    avatar: '/images/about_worker_1778760981240.png'
  },
  {
    name: 'Maria Robinson',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet velit rhoncus, congue justo vel, ultrices orci. Nullam feugiat leo ac tincidunt consequat. Aenean sed pulvinar ex.',
    avatar: '/images/about_worker_1778760981240.png'
  }
];

export default function TestimonialsSection() {
  return (
    <section 
      className="relative py-28 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/service_material_1778761584582.png')" }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="max-w-[1240px] relative z-10 mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="flex flex-col items-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-white font-bold uppercase mb-4">TESTIMONIALS</h2>
          <motion.div 
            className="w-12 h-[2px] bg-[#FF5B22]"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              className="border border-white/20 bg-white/5 p-8 relative rounded-sm text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Avatar */}
              <motion.div 
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden border-4 border-gray-800 shadow-xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.15, type: "spring" }}
              >
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </motion.div>
              
              <div className="mt-8 mb-2">
                <h4 className="text-white font-bold">{t.name}</h4>
                <div className="flex justify-center gap-1 mt-1">
                  {[...Array(t.rating)].map((_, idx) => (
                    <motion.span 
                      key={idx} 
                      className="text-[#FF5B22] text-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.15 + idx * 0.1 }}
                    >★</motion.span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {t.quote}
              </p>
              
              <div className="text-white text-4xl opacity-80 leading-none">
                &ldquo;
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
