'use client';

import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiSend, FiArrowUpRight } from 'react-icons/fi';

/**
 * FOOTER - Design 4 of 6
 * 
 * Design 4: Magazine Editorial
 * 
 * Aesthetic: Editorial, sophisticated
 * - Large typography
 * - Asymmetric layout
 * - Bold headings
 * - Dark with amber accents
 */

const footerData = {
  contact: {
    address: "Tamraght Village, Morocco",
    phone: "+212 600 000 000",
    email: "rabab@cookingclass.ma",
    whatsapp: "+212600000000"
  }
};

const FooterV4: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left - Brand */}
          <div className="lg:col-span-5">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Rabab's<br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Kitchen
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
              Authentic Amazigh cooking classes in the heart of Morocco. Learn traditional recipes passed down through generations.
            </p>
            
            <Link
              href="/book"
              className="inline-flex items-center gap-3 text-amber-400 font-bold text-lg hover:text-amber-300 transition-colors group"
            >
              <span>Book Your Experience</span>
              <FiArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Middle - Navigation */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
              Explore
            </h4>
            <nav className="space-y-4">
              {[
                { label: "Cooking Classes", href: "/experiences" },
                { label: "About Rabab", href: "/about" },
                { label: "Photo Gallery", href: "/gallery" },
                { label: "Book Now", href: "/book" },
                { label: "FAQ", href: "/faq-contact" }
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-gray-300 hover:text-amber-400 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right - Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
              Contact
            </h4>
            <div className="space-y-4 mb-8">
              <p className="text-gray-300 flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                {footerData.contact.address}
              </p>
              <a href={`tel:${footerData.contact.phone}`} className="text-gray-300 hover:text-amber-400 flex items-center gap-3 transition-colors">
                <FiPhone className="w-5 h-5 text-amber-400" />
                {footerData.contact.phone}
              </a>
              <a href={`mailto:${footerData.contact.email}`} className="text-gray-300 hover:text-amber-400 flex items-center gap-3 transition-colors">
                <FiMail className="w-5 h-5 text-amber-400" />
                {footerData.contact.email}
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/rababskitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${footerData.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:border-green-400 hover:text-green-400 transition-colors"
              >
                <FiSend className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Rabab's Kitchen
            </p>
            <p className="text-gray-500 text-sm">
              Tamraght, Morocco 🇲🇦
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV4;
