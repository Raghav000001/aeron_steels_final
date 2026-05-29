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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="w-full bg-[#1C1D1F]">
        <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-stretch">
          {/* Desktop nav */}
          <ul className="hidden md:flex flex-wrap items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white text-[0.6rem] lg:text-[0.7rem] font-bold uppercase py-3 lg:py-4 inline-block hover:text-[#FF5B22] transition-colors border-b-2 border-transparent hover:border-[#FF5B22]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <Link href="/contact-us" className="bg-[#FF5B22] hover:bg-[#e04b19] text-white px-6 lg:px-8 text-[0.75rem] lg:text-[0.7rem] font-bold uppercase transition-colors self-stretch flex items-center">
            GET A QUOTE
          </Link>
        </div>
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
              {navLinks.map((link) => (
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
              ))}
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
