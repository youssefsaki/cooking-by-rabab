'use client';

import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiSend, FiHeart } from 'react-icons/fi';

/**
 * FOOTER - Design 5 of 6
 * 
 * Design 5: Compact Simple
 * 
 * Aesthetic: Minimal, clean, efficient
 * - Single row links
 * - Compact layout
 * - Essential info only
 * - Great for mobile
 */

const footerData = {
  links: [
    { label: "Home", href: "/" },
    { label: "Classes", href: "/experiences" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Book", href: "/book" },
    { label: "Contact", href: "/faq-contact" }
  ],
  contact: {
    phone: "+212 600 000 000",
    email: "rabab@cookingclass.ma",
    whatsapp: "+212600000000",
    location: "Tamraght, Morocco"
  }
};

const FooterV5: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {/* Top Row - Brand & Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 pb-8 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👩‍🍳</span>
            <div>
              <h4 className="text-xl font-black text-white">Rabab's Kitchen</h4>
              <p className="text-amber-400 text-xs font-medium">Traditional Moroccan Cooking</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/rababskitchen"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors"
            >
              <FiInstagram className="w-5 h-5" />
            </a>
            <a
              href={`https://wa.me/${footerData.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors"
            >
              <FiSend className="w-5 h-5" />
            </a>
            <Link
              href="/book"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg text-sm hover:scale-105 transition-transform"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Middle Row - Links */}
        <nav className="flex flex-wrap justify-center gap-6 lg:gap-10 mb-8">
          {footerData.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-amber-400 font-medium text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact Row */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 mb-8 text-sm">
          <span className="flex items-center gap-2 text-gray-400">
            <FiMapPin className="w-4 h-4 text-amber-400" />
            {footerData.contact.location}
          </span>
          <a href={`tel:${footerData.contact.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
            <FiPhone className="w-4 h-4 text-amber-400" />
            {footerData.contact.phone}
          </a>
          <a href={`mailto:${footerData.contact.email}`} className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
            <FiMail className="w-4 h-4 text-amber-400" />
            {footerData.contact.email}
          </a>
        </div>

        {/* Bottom Row */}
        <div className="text-center pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Rabab's Kitchen • Made with <FiHeart className="w-3 h-3 text-red-500" /> in Morocco 🇲🇦
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterV5;
