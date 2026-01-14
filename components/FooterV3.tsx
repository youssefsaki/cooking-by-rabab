'use client';

import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiSend, FiClock } from 'react-icons/fi';

/**
 * FOOTER - Design 3 of 6
 * 
 * Design 3: Warm Split Design
 * 
 * Aesthetic: Warm, inviting, amber theme
 * - Amber top section
 * - Dark bottom section
 * - Large contact area
 * - Recipe-inspired design
 */

const footerData = {
  brand: {
    name: "Rabab's Kitchen",
    tagline: "Traditional Moroccan Cooking Classes",
    description: "Join Rabab in her traditional Amazigh kitchen and discover the secrets of authentic Moroccan cuisine."
  },
  experiences: [
    "Tajine Masterclass",
    "Amazigh Heritage",
    "Tea Ceremony",
    "Clay Oven Bread",
    "Amlou Workshop"
  ],
  contact: {
    address: "Tamraght Village, Morocco",
    phone: "+212 600 000 000",
    email: "rabab@cookingclass.ma",
    whatsapp: "+212600000000",
    hours: "Daily: 9:00 AM - 6:00 PM"
  }
};

const FooterV3: React.FC = () => {
  return (
    <footer>
      {/* Warm Top Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-black text-white mb-2">
                Ready to Start Cooking?
              </h3>
              <p className="text-white/90">
                Book your authentic Moroccan experience today!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Book a Class
              </Link>
              <a
                href={`https://wa.me/${footerData.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
              >
                <FiSend className="w-5 h-5" />
                WhatsApp Rabab
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Main Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">👩‍🍳</span>
                <div>
                  <h4 className="text-2xl font-black text-white">{footerData.brand.name}</h4>
                  <p className="text-amber-400 text-sm font-medium">{footerData.brand.tagline}</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                {footerData.brand.description}
              </p>
              
              {/* Social */}
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/rababskitchen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a
                  href={`https://wa.me/${footerData.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors"
                >
                  <FiSend className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Our Classes */}
            <div>
              <h5 className="text-lg font-bold text-white mb-6">Our Classes</h5>
              <ul className="space-y-3">
                {footerData.experiences.map((exp) => (
                  <li key={exp}>
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {exp}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-lg font-bold text-white mb-6">Contact</h5>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">{footerData.contact.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <a href={`tel:${footerData.contact.phone}`} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                    {footerData.contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <a href={`mailto:${footerData.contact.email}`} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                    {footerData.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FiClock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">{footerData.contact.hours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Rabab's Kitchen. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/faq-contact" className="hover:text-amber-400 transition-colors">FAQ</Link>
                <Link href="/faq-contact" className="hover:text-amber-400 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV3;
