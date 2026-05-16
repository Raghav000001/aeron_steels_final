"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    title: 'Component Manufacturing',
    desc: 'Specializing in high-quality steel component manufacturing, equipped with modern equipment for industrial applications.',
    img: '/images/service_chemical_1778761046335.png',
    iconActive: true,
  },
  {
    title: 'Custom Cutting',
    desc: 'Precision custom cutting services ensuring that all distinct material specifications are met efficiently.',
    img: '/images/service_mechanical_1778761074973.png',
    iconActive: false,
  },
  {
    title: 'Durable Products',
    desc: 'Developing heavy duty steel sheets and plates known for longevity and wear resistance across the market.',
    img: '/images/service_power_1778761289382.png',
    iconActive: false,
  },
  {
    title: 'Quality Assurance',
    desc: 'Adhering to strict international quality standards through comprehensive inspection of all manufactured plates.',
    img: '/images/service_material_1778761584582.png',
    iconActive: false,
  },
  {
    title: 'Custom Fabrication',
    desc: 'Offering flexible fabrication to produce high-tolerance custom designs based on specialized client blueprints.',
    img: '/images/service_power_1778761289382.png',
    iconActive: false,
  },
  {
    title: 'Efficient Service',
    desc: 'A dedicated team committed to ensuring rapid turnover and 24/7 customer support for complex technical queries.',
    img: '/images/hero_bg_1778760928163.png',
    iconActive: false,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ServicesSection() {
  return (
    <section className="py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading titleLight="OUR" titleBold="SERVICES" centered={true} />
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
        >
          {services.map((svc, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white shadow-md group"
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Image */}
              <div className="w-full h-56 overflow-hidden">
                <img 
                  src={svc.img} 
                  alt={svc.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="relative p-8 pt-10">
                {/* Floating Icon Box */}
                <div 
                  className={`absolute -top-6 left-6 w-12 h-12 flex items-center justify-center ${
                    svc.iconActive ? 'bg-[#FF5B22] text-white' : 'bg-gray-100 text-gray-600'
                  } transition-colors duration-300 group-hover:bg-[#FF5B22] group-hover:text-white`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                  </svg>
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-3">{svc.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {svc.desc}
                </p>
                <a href="#" className="font-bold text-[#FF5B22] text-xs uppercase hover:underline">
                  Read More &gt;
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
