'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';
import AboutSection from '@/components/sections/About';
import ExhibitionsSection from '@/components/sections/Testimonials';

export default function AboutUsClient() {
  return (
    <main>
      <PageBanner
        title="About Us"
        subtitle="Home > About Us"
        bgImage="/images/service_material_1778761584582.png"
      />

      <AboutSection />

      <motion.section
        className="py-20 bg-gray-50 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold uppercase text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our History
          </motion.h2>
          <motion.div
            className="w-16 h-1 bg-[#FF5B22] mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.p
            className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Founded with a vision to deliver quality, precision, and reliability in the steel and manufacturing sector,
            Aeron Steels Pvt. Ltd. has quickly grown into a trusted name in steel processing and component manufacturing.
            What began as a commitment to meeting industry demands with dependable solutions has evolved into a company
            capable of serving diverse customer requirements with efficiency and consistency.
          </motion.p>
          <motion.p
            className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Over the years, we have strengthened our expertise in flat steel processing, including slitted coils,
            cut-to-length sheets and strips, while also expanding our capabilities in precision component manufacturing.
            By combining technical knowledge, manufacturing excellence, and a customer-centric approach, we have built
            a strong foundation rooted in quality and trust.
          </motion.p>
          <motion.p
            className="text-gray-600 leading-relaxed text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Today, Aeron Steels Pvt. Ltd. stands as an integrated solutions provider, transforming raw steel into
            precision-engineered products tailored to customer requirements. Backed by strong manufacturing capabilities
            and an unwavering focus on quality, we continue to move forward with a commitment to innovation, reliability,
            and long-term partnerships.
          </motion.p>
        </div>
      </motion.section>

      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gray-500 font-medium tracking-wide uppercase text-sm mb-2 block">
              Our Strengths
            </span>
            <h2 className="text-3xl lg:text-4xl uppercase font-bold text-gray-800">
              Core Values
            </h2>
            <motion.div
              className="w-12 h-1 bg-[#FF5B22] mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                src: '/Item Details/About Us/Quality Assurance.jpeg',
                title: 'Quality Assurance',
                desc: 'Committed to the highest standards of quality in every product we deliver.',
              },
              {
                src: '/Item Details/About Us/Customized Solutions.png',
                title: 'Customized Solutions',
                desc: 'Tailored steel processing and component manufacturing to meet unique client requirements.',
              },
              {
                src: '/Item Details/About Us/Efficient Service.jpeg',
                title: 'Efficient Service',
                desc: 'Timely delivery and responsive support built on long-standing client partnerships.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ExhibitionsSection />
    </main>
  );
}
