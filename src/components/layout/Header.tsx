'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
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
    slug: 'center-bearing-Brackets',
    displayName: 'Center Bearing Brackets',
    type: 'page',
    route: '/products/center-bearing-Brackets',
    icon: 'M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0',
  },
  {
    slug: 'mounting-parts',
    displayName: 'Mounting Parts',
    type: 'page',
    route: '/products/mounting-parts',
    icon: 'M4 4h16v16H4zM6.5 6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M14.5 6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M6.5 14.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M14.5 14.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0',
  },
  {
    slug: 'suspension-parts',
    displayName: 'Suspension Parts',
    type: 'page',
    route: '/products/suspension-parts',
    icon: 'M4 18c4-12 12-12 16 0M12 9v7',
  },
  {
    slug: 'hr-hrpo-crca-slit-coils',
    displayName: 'HR / HRPO & CRCA Slit Coils',
    type: 'page',
    route: '/products/hr-hrpo-crca-slit-coils',
    icon: 'M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0M12 3v2M12 19v2',
  },
  {
    slug: 'hr-hrpo-crca-sheets-strips',
    displayName: 'HR / HRPO & CRCA Sheets & Strips',
    type: 'page',
    route: '/products/hr-hrpo-crca-sheets-strips',
    icon: 'M7 5h12v4H7zM5 10h14v4H7z',
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setProductsOpen(false);
    }, 150);
  }, [cancelClose]);

  useEffect(() => {
    if (!productsOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuZoneRef.current && !megaMenuZoneRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [productsOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMobile = useCallback(() => {
    setMenuOpen(false);
    setMobileProductsOpen(false);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans">
            <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#1C1D1F] border-b border-white/5'
            : 'bg-black/20 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 py-2 md:py-2.5 flex items-center justify-between text-xs md:text-sm text-gray-300">
          <span className="hidden sm:flex items-center gap-2">
            <svg className="w-[14px] h-[14px] md:w-4 md:h-4 text-[#FF5B22]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Bhiwani Road, Rohtak, Haryana
          </span>

          <div className="flex items-center gap-5 md:gap-8 w-full sm:w-auto justify-between sm:justify-end">
            <span className="flex items-center gap-2">
              <svg className="w-[14px] h-[14px] md:w-4 md:h-4 text-[#FF5B22]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              aeronsteels28@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-[14px] h-[14px] md:w-4 md:h-4 text-[#FF5B22]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 8307028125
            </span>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#1C1D1F] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between h-[72px] md:h-20 lg:h-[100px]">
          <Link href="/" className="flex items-center gap-2 md:gap-6 lg:gap-7 flex-shrink-0">
            <img
              src="/images/logo-icon.png"
              alt="Aeron Steels"
              className="block md:hidden h-[34px] w-auto object-contain brightness-0 invert"
            />
            <img
              src="/images/logo.png"
              alt="Aeron Steels"
              className="hidden md:block h-[45px] lg:h-[90px] w-auto object-contain brightness-0 invert"
            />
            <div className="block md:hidden">
              <h1 className="text-lg font-black uppercase tracking-wide text-white leading-tight whitespace-nowrap">
                <span className="text-[#FF5B22]">AERON</span> STEELS
              </h1>
              <span className="text-[10px] text-gray-400 uppercase font-medium tracking-widest block whitespace-nowrap">
                Private Limited
              </span>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-4 lg:gap-8 flex-shrink-0 whitespace-nowrap">
            {navLinks.map((link) => {
              if (link.label === 'PRODUCTS') {
                return (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => { cancelClose(); setProductsOpen(true); }}
                  >
                    <Link
                      href={link.href}
                      className="text-white/90 hover:text-[#FF5B22] text-[0.7rem] lg:text-[0.75rem] font-bold uppercase tracking-wider transition-colors duration-200 inline-block"
                    >
                      PRODUCTS
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.href} onMouseEnter={cancelClose}>
                  <Link
                    href={link.href}
                    className="text-white/90 hover:text-[#FF5B22] text-[0.7rem] lg:text-[0.75rem] font-bold uppercase tracking-wider transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact-us"
            className="hidden md:inline-flex bg-[#FF5B22] hover:bg-[#e04b19] text-white px-6 lg:px-8 py-2.5 text-[0.7rem] lg:text-[0.75rem] font-bold uppercase tracking-wider transition-all duration-200 rounded-sm"
          >
            GET A QUOTE
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <div
        ref={megaMenuZoneRef}
        onMouseLeave={scheduleClose}
      >
        <AnimatePresence>
          {productsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
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
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={closeMobile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="absolute right-0 top-0 h-full w-[280px] max-w-[85vw] bg-[#1C1D1F] shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Menu</span>
                <button
                  onClick={closeMobile}
                  className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-5 py-4 space-y-1">
                {navLinks.map((link) => {
                  if (link.label === 'PRODUCTS') {
                    return (
                      <div key={link.href}>
                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className="flex items-center justify-between w-full text-gray-300 hover:text-white text-sm font-bold uppercase py-3 transition-colors cursor-pointer"
                        >
                          PRODUCTS
                          <motion.svg
                            animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
                              <div className="py-2 space-y-1 pl-4 border-l border-white/5 ml-1">
                                {PRODUCT_MENU_CATEGORIES.map((cat) => (
                                  <Link
                                    key={cat.slug}
                                    href={cat.route}
                                    onClick={closeMobile}
                                    className="block text-sm text-gray-400 hover:text-[#FF5B22] py-2 transition-colors"
                                  >
                                    {cat.displayName}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="block text-gray-300 hover:text-white text-sm font-bold uppercase py-3 transition-colors"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="px-5 mt-2">
                <Link
                  href="/contact-us"
                  onClick={closeMobile}
                  className="block w-full bg-[#FF5B22] hover:bg-[#e04b19] text-white text-center text-sm font-bold uppercase py-3.5 transition-colors rounded-sm"
                >
                  GET A QUOTE
                </Link>
              </div>

              <div className="px-5 pt-6 pb-8 mt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="text-[#FF5B22]">✉</span>
                  <span>aeronsteels28@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="text-[#FF5B22]">℡</span>
                  <span>+91 8307028125</span>
                </div>
              </div>
            </motion.div>
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
