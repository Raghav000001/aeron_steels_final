'use client';

import React, { useState } from 'react';
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

interface MenuCategory {
  slug: string;
  displayName: string;
  type: 'page' | 'modal';
  route: string;
  icon: string;
}

const PRODUCT_MENU_CATEGORIES: MenuCategory[] = [
  {
    slug: 'center-bearing-packets',
    displayName: 'Center Bearing Packets',
    type: 'page',
    route: '/products/center-bearing-packets',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  },
  {
    slug: 'mounting-plates',
    displayName: 'Mounting Plates',
    type: 'page',
    route: '/products/mounting-plates',
    icon: 'M4 16l4.58-4.58a1 1 0 011.41 0L12 13.41l4.59-4.59a1 1 0 011.41 0L20 12m-8-8v4m0 12v-4m-8-4h4m12 0h-4',
  },
  {
    slug: 'suspension-plates',
    displayName: 'Suspension Plates',
    type: 'page',
    route: '/products/suspension-plates',
    icon: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
  },
  {
    slug: 'hr-hrpo-crca-slit-coils',
    displayName: 'HR / HRPO & CRCA Slit Coils',
    type: 'page',
    route: '/products/hr-hrpo-crca-slit-coils',
    icon: 'M4 8V2h16v6M4 8v8M4 8H2m18 0v8m0-8h2M4 16h16M4 16H2m18 0h2M6 12h12',
  },
  {
    slug: 'hr-hrpo-crca-sheets-strips',
    displayName: 'HR / HRPO & CRCA Sheets & Strips',
    type: 'page',
    route: '/products/hr-hrpo-crca-sheets-strips',
    icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z',
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

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

          {/* Contact Info */}
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

        {/* Mega Menu — 5 Category Cards */}
        <AnimatePresence>
          {productsOpen && (
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
                <div className="max-w-[900px] mx-auto px-6 py-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {PRODUCT_MENU_CATEGORIES.map((cat) => (
                      <CategoryCard
                        key={cat.slug}
                        category={cat}
                        onClick={() => setProductsOpen(false)}
                      />
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
                        className="flex items-center justify-between w-full text-white text-sm font-bold uppercase py-3 hover:text-[#FF5B22] transition-colors border-b border-white/5 cursor-pointer"
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
                            <div className="py-3 space-y-1 pl-4">
                              {PRODUCT_MENU_CATEGORIES.map((cat) => (
                                <Link
                                  key={cat.slug}
                                  href={cat.route}
                                  onClick={() => { setMenuOpen(false); setMobileProductsOpen(false); }}
                                  className="block text-sm text-gray-300 hover:text-[#FF5B22] py-2.5 transition-colors"
                                >
                                  {cat.displayName}
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

function CategoryCard({ category, onClick }: { category: MenuCategory; onClick: () => void }) {
  return (
    <Link href={category.route} onClick={onClick}>
      <div className="group relative bg-white border-2 border-gray-100 rounded-xl p-5 h-full flex flex-col items-center justify-center text-center hover:border-[#FF5B22] hover:shadow-lg hover:shadow-orange-100 transition-all duration-300 min-h-[120px] cursor-pointer">
        <svg
          className="w-8 h-8 text-[#FF5B22] mb-3 group-hover:scale-110 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
        </svg>

        <span className="text-xs lg:text-sm font-bold text-gray-800 group-hover:text-[#FF5B22] transition-colors leading-snug">
          {category.displayName}
        </span>

        <span className="mt-2 text-[#FF5B22] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">
          Browse &rarr;
        </span>
      </div>
    </Link>
  );
}
