"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const posts = [
  {
    dateStr: '27',
    monthStr: 'FEB',
    author: 'Jesscia Brown',
    comments: 3,
    title: 'Donec faucibus tellus quis turpis tempor',
    excerpt: 'Lorem Ipsum is simply text of the printing and orem ipsum has been the industry\'s dummy text evern.',
    img: '/images/service_chemical_1778761046335.png'
  },
  {
    dateStr: '22',
    monthStr: 'FEB',
    author: 'Kevin Martin',
    comments: 2,
    title: 'Fusce sit amet bibendum',
    excerpt: 'Lorem Ipsum is simply text of the printing and orem ipsum has been the industry\'s dummy text evern.',
    img: '/images/service_mechanical_1778761074973.png'
  },
  {
    dateStr: '18',
    monthStr: 'FEB',
    author: 'Chiristine Eve',
    comments: 4,
    title: 'Maecenas gravida magna quis accumsan',
    excerpt: 'Lorem Ipsum is simply text of the printing and orem ipsum has been the industry\'s dummy text evern.',
    img: '/images/service_power_1778761289382.png'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function BlogSection() {
  return (
    <section className="py-28 bg-[#F5F5F5] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading titleLight="OUR" titleBold="BLOG" centered={true} />
          <motion.p 
            className="text-center text-gray-500 max-w-2xl mx-auto mt-6 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar lacus at feugiat iaculis. Suspendisse eu viverra mauris.
            Ut amet facilisis lectus. Pellentesque mattis auctor quam, et feugiat elit volutpat vel.
          </motion.p>
        </motion.div>

        {/* Grid with staggered cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
        >
          {posts.map((post, i) => (
            <motion.div 
              key={i} 
              className="bg-white shadow-sm flex flex-col group"
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Image */}
              <div className="w-full h-56 overflow-hidden relative">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="relative pt-12 p-8 flex-1">
                {/* Date Badge */}
                <div className="absolute -top-10 left-8 bg-[#FF5B22] text-white flex flex-col items-center justify-center w-16 h-16 border-4 border-white shadow-sm">
                  <span className="text-lg font-bold leading-none">{post.dateStr}</span>
                  <span className="text-xs uppercase">{post.monthStr}</span>
                </div>

                {/* Meta */}
                <div className="flex items-center text-[#FF5B22] text-xs font-semibold uppercase mb-3 gap-2">
                  <span>{post.author}</span>
                  <span className="text-gray-300">|</span>
                  <span>{post.comments} Comments</span>
                </div>

                {/* Title */}
                <h3 className="text-gray-800 font-bold text-lg mb-4 hover:text-[#FF5B22] transition-colors cursor-pointer">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
