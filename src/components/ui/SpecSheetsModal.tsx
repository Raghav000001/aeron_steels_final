'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpecRow {
  label: string;
  crca: string;
  hrHrpo: string;
}

interface SpecSheet {
  title: string;
  subtitle: string;
  columns: [string, string];
  rows: SpecRow[];
}

const LABEL_ICONS: Record<string, string> = {
  Thickness: 'M12 20V10m0 0l-4 4m4-4l4 4',
  Width: 'M8 7h8M8 7a4 4 0 118 0M8 7a4 4 0 11-8 0m16 0a4 4 0 11-8 0',
  Length: 'M3 12h18M3 12a9 9 0 0118 0M3 12a9 9 0 0018 0',
  Grade: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
};

const SLIT_COILS_SPEC: SpecSheet = {
  title: 'Slit Coils',
  subtitle: 'HR / HRPO & CRCA Slit Coils — Specification Comparison',
  columns: ['CRCA', 'HR / HRPO'],
  rows: [
    { label: 'Thickness', crca: '0.40 to 1.6 mm', hrHrpo: '1.6 mm to 3.5 mm' },
    { label: 'Width', crca: '10 mm to 250 mm', hrHrpo: '20 mm to 450 mm' },
    { label: 'Grade', crca: 'As per Availability', hrHrpo: 'As per Availability' },
  ],
};

const SHEETS_STRIPS_SPEC: SpecSheet = {
  title: 'Sheets & Strips',
  subtitle: 'HR / HRPO & CRCA Sheets & Strips — Specification Comparison',
  columns: ['CRCA', 'HR / HRPO'],
  rows: [
    { label: 'Thickness', crca: '0.40 to 1.6 mm', hrHrpo: '1.6 mm to 8 mm' },
    { label: 'Width', crca: '50 mm to 600 mm', hrHrpo: '25 mm to 600 mm' },
    { label: 'Length', crca: 'Upto 2500 mm', hrHrpo: 'Upto 2500 mm' },
    { label: 'Grade', crca: 'As per Availability', hrHrpo: 'As per Availability' },
  ],
};

const SPEC_SHEETS: Record<string, SpecSheet> = {
  'hr-hrpo-slit-coils': SLIT_COILS_SPEC,
  'hr-hrpo-crca-sheets-strips': SHEETS_STRIPS_SPEC,
};

interface SpecSheetsModalProps {
  slug: string;
  open: boolean;
  onClose: () => void;
}

export function getSpecSheet(slug: string): SpecSheet | undefined {
  return SPEC_SHEETS[slug];
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.92, y: 30 },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function SpecSheetsModal({ slug, open, onClose }: SpecSheetsModalProps) {
  const sheet = SPEC_SHEETS[slug];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!sheet) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* ── Header ── */}
            <div className="relative px-6 sm:px-8 pt-7 pb-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gray-400">
                      Specification Sheet
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {sheet.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1 max-w-md">
                    {sheet.subtitle}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-gray-300 hover:text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Brand accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5B22] via-[#FF7A42] to-transparent" />
            </div>

            {/* ── Table ── */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
              {/* Column headers — visible on md+ */}
              <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr] gap-4 mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-2">
                  Specification
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-white bg-[#FF5B22] rounded-lg px-4 py-2.5 text-center shadow-sm shadow-orange-200">
                  {sheet.columns[0]}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-white bg-gray-800 rounded-lg px-4 py-2.5 text-center shadow-sm">
                  {sheet.columns[1]}
                </div>
              </div>

              {/* Spec rows */}
              <div className="space-y-3">
                {sheet.rows.map((row, i) => (
                  <motion.div
                    key={row.label}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.08 * i, ease: 'easeOut' }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-2 md:gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
                  >
                    {/* Label — row header on mobile, first col on desktop */}
                    <div className="flex items-center gap-3 pb-2 md:pb-0 border-b border-gray-100 md:border-b-0">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                        <svg
                          className="w-4 h-4 text-[#FF5B22]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d={LABEL_ICONS[row.label] || 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'} />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-gray-800">{row.label}</span>
                    </div>

                    {/* CRCA value */}
                    <div className="flex md:flex-col items-center md:items-center gap-2 md:gap-1">
                      <span className="md:hidden text-[0.6rem] font-bold uppercase tracking-wider text-[#FF5B22]">
                        {sheet.columns[0]}
                      </span>
                      <span className="text-sm text-gray-600 font-medium text-center w-full bg-orange-50/50 md:bg-transparent rounded-lg md:rounded-none px-3 md:px-0 py-2 md:py-0">
                        {row.crca}
                      </span>
                    </div>

                    {/* HR/HRPO value */}
                    <div className="flex md:flex-col items-center md:items-center gap-2 md:gap-1">
                      <span className="md:hidden text-[0.6rem] font-bold uppercase tracking-wider text-gray-500">
                        {sheet.columns[1]}
                      </span>
                      <span className="text-sm text-gray-600 font-medium text-center w-full bg-gray-50 md:bg-transparent rounded-lg md:rounded-none px-3 md:px-0 py-2 md:py-0">
                        {row.hrHrpo}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footnote */}
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Specifications are indicative and subject to availability. Please contact us for current stock and exact dimensions.</span>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="shrink-0 px-6 sm:px-8 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/80">
              <LinkButton />
              <button
                onClick={onClose}
                className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-2.5 px-7 rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.97] cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function LinkButton() {
  return (
    <a
      href="/contact-us"
      className="text-sm text-gray-500 hover:text-[#FF5B22] transition-colors underline underline-offset-2 decoration-gray-300 hover:decoration-[#FF5B22]"
    >
      Need exact specifications? Contact us
    </a>
  );
}
