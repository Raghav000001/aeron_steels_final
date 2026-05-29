'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';

const trustIndicators = [
  { label: 'Certification Body', value: 'Bureau Veritas / TÜV' },
  { label: 'Valid Until', value: 'Annual Surveillance' },
  { label: 'Scope', value: 'Steel Manufacturing & Fabrication' },
  { label: 'Standard', value: 'ISO 9001:2015' },
];

const qualityPoints = [
  'Stringent quality control at every production stage',
  'Regular audits ensure compliance with international standards',
  'Certified processes for mounting plates, CTL sheets, and fabricated components',
  'Commitment to continuous improvement and operational excellence',
];

export default function CertificationsClient() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <main>
      <PageBanner
        title="Certifications"
        subtitle="Home > Certifications"
        bgImage="/images/service_chemical_1778761046335.png"
      />

      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <motion.button
                onClick={() => setLightboxOpen(true)}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-[#FF5B22]/10 via-transparent to-[#FF5B22]/5 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white p-4 md:p-6 rounded-lg shadow-[0_8px_40px_-8px_rgba(0,0,0,0.25)] border border-gray-200/80 group-hover:shadow-[0_12px_50px_-8px_rgba(0,0,0,0.35)] transition-shadow duration-500">
                  <div className="absolute inset-2 rounded border border-[#FF5B22]/20 pointer-events-none" />
                  <img
                    src="/images/certification.png"
                    alt="Aeron Steels ISO 9001:2015 Certification"
                    className="w-full max-w-[400px] h-auto object-contain rounded relative z-10"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-colors duration-300 z-20 flex items-center justify-center">
                    <motion.span
                      className="text-white text-sm font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FF5B22] px-4 py-2 rounded-sm shadow-lg whitespace-nowrap"
                      initial={false}
                    >
                      Click to Enlarge
                    </motion.span>
                  </div>
                </div>
              </motion.button>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <motion.span
                className="text-[#FF5B22] text-sm font-bold uppercase tracking-[0.2em] block mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Official Certification
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-light uppercase text-gray-800 mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                ISO 9001:2015
                <br />
                <strong className="font-bold text-[#FF5B22]">Quality Management</strong>
              </motion.h2>
              <motion.div
                className="w-14 h-1 bg-[#FF5B22] mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 56 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.25 }}
              />
              <motion.p
                className="text-gray-600 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Aeron Steels Private Limited is officially certified under the
                ISO 9001:2015 Quality Management System standard. This certification
                reflects our unwavering commitment to manufacturing excellence,
                consistent product quality, and continuous process improvement
                across all operations.
              </motion.p>
              <motion.div
                className="grid grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {trustIndicators.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="bg-gray-50 rounded-sm p-4 border-l-2 border-[#FF5B22]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: 0.45 + i * 0.08 }}
                  >
                    <span className="block text-[0.65rem] text-gray-400 uppercase font-bold tracking-wider mb-1">
                      {item.label}
                    </span>
                    <span className="block text-sm font-semibold text-gray-800">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="bg-[#1C1D1F] rounded-sm p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-white font-bold text-base md:text-lg uppercase mb-4 flex items-center gap-3">
                  <span className="text-[#FF5B22] text-xl">&#10003;</span>
                  Quality Assurance
                </h3>
                <ul className="space-y-3">
                  {qualityPoints.map((point, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-gray-300 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: 0.55 + i * 0.08 }}
                    >
                      <span className="text-[#FF5B22] mt-0.5 text-xs flex-shrink-0">&#9658;</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#FF5B22] text-sm font-bold uppercase tracking-[0.2em] block mb-4">
              Our Commitment
            </span>
            <h2 className="text-2xl md:text-3xl font-light uppercase text-gray-800 mb-6">
              Built on <strong className="font-bold text-[#FF5B22]">Trust & Quality</strong>
            </h2>
            <motion.div
              className="w-14 h-1 bg-[#FF5B22] mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              At Aeron Steels, certification is not just a document — it is a daily practice.
              Every product that leaves our facility meets the rigorous standards set by our
              ISO 9001:2015 certified quality management system. From raw material inspection
              to final dispatch, quality is built into every step of our process.
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl z-10"
              onClick={() => setLightboxOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &#10005;
            </motion.button>
            <motion.img
              src="/images/certification.png"
              alt="Aeron Steels ISO 9001:2015 Certification"
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
