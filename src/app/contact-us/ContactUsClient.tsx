'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
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

              {status === 'success' && (
                <motion.div
                  className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for reaching out! We will get back to you shortly.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMsg}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-sm uppercase text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
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
