'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageBanner from '@/components/ui/PageBanner';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUsClient() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  useEffect(() => {
    if (status === 'success' && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  return (
    <main>
      <PageBanner
        title="Contact Us"
        subtitle="Home > Contact Us"
        bgImage="/images/service_power_1778761289382.png"
      />

      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <h2 className="text-2xl md:text-3xl font-light uppercase text-gray-800 mb-8">
                Drop Us <strong className="font-bold text-[#FF5B22]">A Line</strong>
              </h2>

              {status === 'error' && (
                <motion.div
                  className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-sm text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMsg}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    ref={successRef}
                    className="flex flex-col items-center justify-center py-12 md:py-20 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {/* Animated checkmark circle */}
                    <motion.div
                      className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 12 }}
                    >
                      <motion.svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' }}
                      >
                        <motion.path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' }}
                        />
                      </motion.svg>
                    </motion.div>

                    <motion.h3
                      className="text-2xl font-bold text-gray-800 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      Message Sent Successfully!
                    </motion.h3>

                    <motion.p
                      className="text-gray-500 text-sm max-w-xs mb-8 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      Thank you for reaching out! We will get back to you shortly.
                    </motion.p>

                    <motion.button
                      className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 rounded-sm uppercase text-sm transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStatus('idle')}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="sr-only">Your Name</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-200 bg-gray-50 p-3 md:p-4 outline-none focus:border-[#FF5B22] transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="sr-only">Your Email</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-200 bg-gray-50 p-3 md:p-4 outline-none focus:border-[#FF5B22] transition-colors text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="sr-only">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 bg-gray-50 p-3 md:p-4 outline-none focus:border-[#FF5B22] transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="sr-only">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 bg-gray-50 p-3 md:p-4 outline-none focus:border-[#FF5B22] transition-colors text-sm"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-sm uppercase text-sm transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-3"
                      whileHover={{ scale: status === 'loading' ? 1 : 1.03 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.97 }}
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <h2 className="text-2xl md:text-3xl font-light uppercase text-gray-800 mb-8">
                Our <strong className="font-bold text-[#FF5B22]">Office</strong>
              </h2>
              <div className="mb-8 space-y-4 text-gray-600 text-sm md:text-base">
                <motion.div
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-[#FF5B22] text-xl mt-0.5">&#8962;</span>
                  <p>Khewat no 1306, Village Baniyani,<br />Bhiwani Road, Rohtak, Haryana 124001</p>
                </motion.div>
                <motion.div
                  className="flex gap-4 items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <span className="text-[#FF5B22] text-xl">&#128241;</span>
                  <strong>+91 8307028125</strong>
                </motion.div>
                <motion.div
                  className="flex gap-4 items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <span className="text-[#FF5B22] text-xl">&#9993;</span>
                  <p>aeronsteels28@gmail.com</p>
                </motion.div>
              </div>

              <motion.div
                className="w-full h-64 md:h-96 rounded-sm overflow-hidden shadow-md border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <iframe
                  src="https://www.google.com/maps?q=Khewat+no+1306,+Village+Baniyani,+Bhiwani+Road,+Rohtak,+Haryana+124001&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aeron Steels Office Location"
                  className="w-full h-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
