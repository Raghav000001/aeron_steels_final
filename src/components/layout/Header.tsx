'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about-us', label: 'ABOUT US' },
  { href: '/infrastructure', label: 'INFRASTRUCTURE' },
  { href: '/certifications', label: 'CERTIFICATIONS' },
  { href: '/products', label: 'PRODUCTS' },
  { href: '/contact-us', label: 'CONTACT US' },
];

const PRODUCT_CATEGORIES = [
  {
    title: 'Sheets & Coils',
    items: ['HR/HRPO & CR CTL Sheets', 'Galvanized Steel Coils', 'Carbon Steel Plates HR'],
  },
  {
    title: 'Heavy Fabrication',
    items: ['Eicher Jumbo Front Plates 6MM', 'Heavy Duty Flanges MS', 'Power Press Components', 'Fabricated Base Plates', 'Custom CNC Machined Parts'],
  },
  {
    title: 'Precision & Industrial Parts',
    items: ['Leyland Front Engine Plates', 'Precision Shaft Components', 'Mechanical Seal Housings', 'Metacon Engine Mounting Plate', 'Chemical Resistant Liners', 'Industrial Bearing Housings', 'Hydraulic Cylinder Parts'],
  },
  {
    title: 'Mounting & Structural',
    items: ['Cabin 4018 Mounting Plates', 'Structural Steel Supports', 'Custom Fabricated Brackets', 'Tata Ace Gear Box Plates', 'Transmission Mounting Kits', 'Chassis Reinforcement Plates', 'Axle Mounting Assemblies', 'Radiator Support Brackets', 'Engine Bay Mounting Rails', 'Suspension Mounting Plates', 'Frame Cross Members'],
  },
];

const categoryLookup: Record<string, number> = {};
PRODUCT_CATEGORIES.forEach((cat, idx) => {
  cat.items.forEach((title) => {
    categoryLookup[title] = idx;
  });
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [products, setProducts] = useState<{ _id: string; title: string }[]>([]);

  useEffect(() => {
    fetch('/api/products?limit=200')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        }
      })
      .catch(() => {/* silently fail — nav works without dropdown */});
  }, []);

  const groupedProducts = useMemo(() => {
    const groups: { _id: string; title: string }[][] = PRODUCT_CATEGORIES.map(() => []);
    const unmatched: { _id: string; title: string }[] = [];
    products.forEach((p) => {
      const idx = categoryLookup[p.title];
      if (idx !== undefined) groups[idx].push(p);
      else unmatched.push(p);
    });
    // Distribute unmatched products evenly across all columns — never hide any product
    unmatched.forEach((p, i) => groups[i % groups.length].push(p));
    return groups;
  }, [products]);

  return (
    <header className="w-full bg-white shadow-sm font-sans z-50 sticky top-0">
      {/* Top Bar */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 py-2 md:py-3 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Aeron Steels" className="w-20 md:w-32 h-auto object-contain drop-shadow-sm" />
              <div>
                <h1 className="text-base md:text-lg font-black uppercase tracking-wide text-gray-900 leading-tight">
                  <span className="text-[#FF5B22]">AERON</span> STEELS
                </h1>
                <span className="text-[0.55rem] md:text-[0.6rem] text-gray-500 uppercase font-medium tracking-widest block">
                  Private Limited
                </span>
              </div>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>

          {/* Contact Info - hidden on mobile when menu open */}
          <div className="hidden md:flex flex-col sm:flex-row gap-4 lg:gap-12">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl text-[#FF5B22]">✉</span>
              <div>
                <span className="block text-[0.6rem] text-gray-400 uppercase font-bold">Email</span>
                <strong className="block text-sm md:text-[0.95rem] text-gray-800">aeronsteels28@gmail.com</strong>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl text-[#FF5B22]">℡</span>
              <div>
                <span className="block text-[0.6rem] text-gray-400 uppercase font-bold">Call Now</span>
                <strong className="block text-sm md:text-[0.95rem] text-gray-800">+91 8307028125</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full bg-[#1C1D1F] relative">
        <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-stretch">
          {/* Desktop nav */}
          <ul className="hidden md:flex flex-wrap items-center gap-4 lg:gap-6">
            {navLinks.map((link) => {
              if (link.label === 'PRODUCTS') {
                return (
                  <li
                    key={link.href}
                    onMouseEnter={() => setProductsOpen(true)}
                  >
                    <Link
                      href={link.href}
                      className="text-white text-[0.6rem] lg:text-[0.7rem] font-bold uppercase py-3 lg:py-4 inline-block hover:text-[#FF5B22] transition-colors border-b-2 border-transparent hover:border-[#FF5B22]"
                    >
                      PRODUCTS
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white text-[0.6rem] lg:text-[0.7rem] font-bold uppercase py-3 lg:py-4 inline-block hover:text-[#FF5B22] transition-colors border-b-2 border-transparent hover:border-[#FF5B22]"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <Link href="/contact-us" className="bg-[#FF5B22] hover:bg-[#e04b19] text-white px-8 md:px-6 lg:px-8 text-sm md:text-[0.75rem] lg:text-[0.7rem] font-bold uppercase transition-colors self-stretch flex items-center">
            GET A QUOTE
          </Link>
        </div>

        {/* Mega Menu — positioned directly below navbar */}
        <AnimatePresence>
          {productsOpen && products.length > 0 && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-40 bg-black/20"
                onClick={() => setProductsOpen(false)}
              />
              {/* Menu panel */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
                className="absolute top-full left-0 right-0 z-50 bg-white shadow-2xl border-t border-gray-100"
              >
                <div className="max-w-[1240px] mx-auto px-6 py-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
                    {PRODUCT_CATEGORIES.map((cat, catIdx) => (
                      <div key={cat.title}>
                        <h3 className="text-base font-bold text-gray-900 tracking-wide mb-4 pb-2 border-b border-gray-200">
                          {cat.title}
                        </h3>
                        <ul className="space-y-1 max-h-[280px] overflow-y-auto">
                          {groupedProducts[catIdx]?.map((p) => (
                            <li key={p._id}>
                              <Link
                                href={`/products/${p._id}`}
                                className="block text-sm text-gray-600 hover:text-[#FF5B22] hover:bg-orange-50 px-3 py-2 rounded-md transition-all duration-150"
                              >
                                {p.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#1C1D1F] border-t border-white/10"
          >
            <motion.ul
              className="flex flex-col px-6 py-4 gap-1"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
            >
              {navLinks.map((link) => {
                if (link.label === 'PRODUCTS') {
                  return (
                    <motion.li
                      key={link.href}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -20 },
                      }}
                    >
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className="flex items-center justify-between w-full text-white text-sm font-bold uppercase py-3 hover:text-[#FF5B22] transition-colors border-b border-white/5"
                      >
                        PRODUCTS
                        <motion.svg
                          animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="py-2 space-y-1 pl-4">
                              {products.map((p) => (
                                <Link
                                  key={p._id}
                                  href={`/products/${p._id}`}
                                  onClick={() => setMenuOpen(false)}
                                  className="block text-sm text-gray-300 hover:text-[#FF5B22] py-2 transition-colors"
                                >
                                  {p.title}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                }
                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-white text-sm font-bold uppercase py-3 hover:text-[#FF5B22] transition-colors border-b border-white/5"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
              {/* Mobile contact info */}
              <li className="pt-4 mt-2 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="text-[#FF5B22]">✉</span>
                  <span>aeronsteels28@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="text-[#FF5B22]">℡</span>
                  <span>+91 8307028125</span>
                </div>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
