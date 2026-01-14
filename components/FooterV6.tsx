'use client';

import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiSend, FiArrowRight } from 'react-icons/fi';

/**
 * FOOTER - Design 6 of 6
 * 
 * Design 6: Full Experience (Premium)
 * 
 * Aesthetic: Rich, detailed, storytelling
 * - Image/pattern background option
 * - Newsletter signup
 * - Testimonial snippet
 * - Full navigation
 * - Stats bar
 */

const footerData = {
  brand: {
    name: "Rabab's Kitchen",
    tagline: "Traditional Moroccan Cooking Classes"
  },
  experiences: [
    { label: "Tajine Masterclass", href: "/experiences/tajine-masterclass" },
    { label: "Amazigh Heritage", href: "/experiences/amazigh-heritage" },
    { label: "Tea Ceremony", href: "/experiences/tea-ceremony" },
    { label: "Clay Oven Bread", href: "/experiences/clay-oven-bread" },
    { label: "Amlou Workshop", href: "/experiences/amlou-workshop" }
  ],
  quickLinks: [
    { label: "About Rabab", href: "/about" },
    { label: "Photo Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq-contact" },
    { label: "Contact Us", href: "/faq-contact" },
    { label: "Book Now", href: "/book" }
  ],
  contact: {
    address: "Tamraght Village, Agadir-Ida-Ou-Tanane, Morocco",
    phone: "+212 600 000 000",
    email: "rabab@cookingclass.ma",
    whatsapp: "+212600000000"
  },
  stats: [
    { number: "15+", label: "Years Experience" },
    { number: "500+", label: "Happy Guests" },
    { number: "50+", label: "Recipes" },
    { number: "5★", label: "Google Rating" }
  ],
  testimonial: {
    text: "The best cooking class I've ever attended! Rabab is amazing.",
    author: "Sarah M.",
    location: "United Kingdom"
  }
};

const FooterV6: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Stats Bar */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {footerData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Testimonial */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">👩‍🍳</span>
              <div>
                <h4 className="text-xl font-black text-white">{footerData.brand.name}</h4>
                <p className="text-amber-400 text-xs font-medium">{footerData.brand.tagline}</p>
              </div>
            </div>
            
            {/* Mini Testimonial */}
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-gray-300 text-sm italic mb-2">"{footerData.testimonial.text}"</p>
              <p className="text-amber-400 text-xs font-bold">— {footerData.testimonial.author}, {footerData.testimonial.location}</p>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/rababskitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${footerData.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <FiSend className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Our Classes</h5>
            <ul className="space-y-3">
              {footerData.experiences.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-300 hover:text-amber-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Quick Links</h5>
            <ul className="space-y-3">
              {footerData.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-300 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Contact</h5>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">{footerData.contact.address}</span>
              </li>
              <li>
                <a href={`tel:${footerData.contact.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-amber-400 text-sm transition-colors">
                  <FiPhone className="w-4 h-4 text-amber-400" />
                  {footerData.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${footerData.contact.email}`} className="flex items-center gap-3 text-gray-300 hover:text-amber-400 text-sm transition-colors">
                  <FiMail className="w-4 h-4 text-amber-400" />
                  {footerData.contact.email}
                </a>
              </li>
            </ul>

            {/* Book CTA */}
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg text-sm hover:scale-105 transition-transform"
            >
              <span>Book a Class</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-500">
              © {new Date().getFullYear()} Rabab's Kitchen. All rights reserved.
            </p>
            <p className="text-gray-500">
              🇲🇦 Proudly made in Morocco with love
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV6;
