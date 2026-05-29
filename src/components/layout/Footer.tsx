import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#151516] text-[#cccccc] pt-24 pb-12 font-sans">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Col 1 */}
          <div className="lg:col-span-4">
            <h1 className="text-3xl font-black uppercase tracking-wide text-white mb-6">
              <span className="text-[#FF5B22]">AERON</span> STEELS
            </h1>
            <p className="text-sm leading-8 text-gray-400 mb-8 pr-4">
              At ASPL, we specialize in high-quality steel products, committed to excellence and innovation in manufacturing. Our dedication ensures we meet the diverse needs of our clients across various industries.
            </p>
            <Link href="/about-us" className="bg-[#FF5B22] hover:bg-[#e04b19] text-white font-bold py-3 px-8 rounded-full uppercase text-[0.75rem] transition-colors duration-300 inline-block">
              READ MORE ⊕
            </Link>
          </div>

          {/* Col 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-lg font-bold mb-8 relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-1 after:bg-[#FF5B22]">
              Quick links
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Privacy Policy</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Help Center</Link></li>
              <li><Link href="/terms" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Terms & Uses</Link></li>
              <li><Link href="/careers" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Careers</Link></li>
              <li><Link href="/about-us" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Meet the Team</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Contact</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-lg font-bold mb-8 relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-1 after:bg-[#FF5B22]">
              Our Services
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link href="/contact-us" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Custom Sheet Metal Components</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Slitted Coils</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Cut-to-length Sheets & Strips</Link></li>
              <li><Link href="/contact-us" className="hover:text-[#FF5B22] transition-colors flex items-center gap-2"><span className="text-[#FF5B22] text-xs">▸</span> Custom Bar Components</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-lg font-bold mb-8 relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-1 after:bg-[#FF5B22]">
              Contact Us
            </h4>
            <div className="flex flex-col gap-6 text-sm text-gray-400">
              <div className="flex gap-4">
                <span className="text-[#FF5B22] text-xl mt-1">⌂</span>
                <p className="leading-relaxed">Khewat no 1306, Village Baniyani,<br/>Bhiwani Road, Rohtak, Haryana 124001</p>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-[#FF5B22] text-xl">📱</span>
                <strong className="text-white text-lg tracking-wider">+91 8307028125</strong>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-[#FF5B22] text-xl">✉</span>
                <p>aeronsteels28@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              {[
                { label: 'f', href: 'https://facebook.com/aeronsteels', aria: 'Facebook' },
                { label: 't', href: 'https://twitter.com/aeronsteels', aria: 'Twitter' },
                { label: 'in', href: 'https://linkedin.com/company/aeronsteels', aria: 'LinkedIn' },
                { label: 'yt', href: 'https://youtube.com/@aeronsteels', aria: 'YouTube' },
              ].map((icon, i) => (
                <Link key={i} href={icon.href} aria-label={icon.aria} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-700 hover:border-[#FF5B22] hover:bg-[#FF5B22] text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300">
                  {icon.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
