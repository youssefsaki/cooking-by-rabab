'use client';

import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiSend, FiArrowRight } from 'react-icons/fi';

/**
 * FOOTER - Design 2 of 6
 * 
 * Design 2: Centered Minimal
 * 
 * Aesthetic: Clean, modern, focused
 * - Centered layout
 * - Large CTA
 * - Minimal links
 * - Social prominent
 */

const footerData = {
  brand: {
    name: "Rabab's Kitchen",
    tagline: "Traditional Moroccan Cooking Classes"
  },
  links: [
    { label: "Home", href: "/" },
    { label: "Experiences", href: "/experiences" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq-contact" },
    { label: "Contact", href: "/faq-contact" }
  ],
  contact: {
    phone: "+212 600 000 000",
    email: "rabab@cookingclass.ma",
    whatsapp: "+212600000000",
    location: "Tamraght, Morocco"
  }
};

const FooterV2: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* CTA Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 text-center">
          <span className="text-5xl mb-6 block">🍲</span>
          <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Ready to Cook with Rabab?
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Book your authentic Moroccan cooking experience today and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              <span>Book a Class</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`https://wa.me/${footerData.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
            >
              <FiSend className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="text-center mb-10">
          <h4 className="text-2xl font-black text-white mb-2">{footerData.brand.name}</h4>
          <p className="text-amber-400 font-medium">{footerData.brand.tagline}</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 lg:gap-10 mb-10">
          {footerData.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-amber-400 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact Row */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10 mb-10 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <FiMapPin className="w-4 h-4 text-amber-400" />
            <span>{footerData.contact.location}</span>
          </div>
          <a href={`tel:${footerData.contact.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
            <FiPhone className="w-4 h-4 text-amber-400" />
            <span>{footerData.contact.phone}</span>
          </a>
          <a href={`mailto:${footerData.contact.email}`} className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
            <FiMail className="w-4 h-4 text-amber-400" />
            <span>{footerData.contact.email}</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-10">
          <a
            href="https://instagram.com/rababskitchen"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
            aria-label="Instagram"
          >
            <FiInstagram className="w-5 h-5" />
          </a>
          <a
            href={`https://wa.me/${footerData.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition-all duration-300"
            aria-label="WhatsApp"
          >
            <FiSend className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Rabab's Kitchen. Authentic Moroccan Cooking Experience.
        </p>
      </div>
    </footer>
  );
};

export default FooterV2;
