'use client';

import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiSend, FiHeart } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * FOOTER - Design 1 of 6
 * 
 * Design 1: Classic Multi-Column
 * 
 * Aesthetic: Clean, organized, professional
 * - 4-column layout
 * - Logo and description
 * - Navigation links
 * - Contact info
 * - Social links
 */

const footerData = {
  brand: {
    name: "Rabab's Kitchen",
    tagline: "Traditional Moroccan Cooking Classes",
    description: "Learn authentic Amazigh recipes passed down through generations in the heart of Tamraght, Morocco."
  },
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Cooking Classes", href: "/experiences" },
    { label: "Book Now", href: "/book" }
  ],
  experiences: [
    { label: "Tajine Masterclass", href: "/experiences#tajine-masterclass" },
    { label: "Amazigh Heritage", href: "/experiences#amazigh-heritage" },
    { label: "Tea Ceremony", href: "/experiences#tea-ceremony" },
    { label: "Clay Oven Bread", href: "/experiences#clay-oven-bread" },
    { label: "Amlou Workshop", href: "/experiences#amlou-workshop" }
  ],
  contact: {
    address: "Taghazout Village, Agadir-Ida-Ou-Tanane, Morocco",
    phone: "+212 726 671 746",
    email: "rababouhadda5@gmail.com",
    whatsapp: "212726671746"
  },
  social: [
    { platform: "Instagram", url: "https://instagram.com/rababskitchen", icon: FiInstagram },
    { platform: "TikTok", url: "https://www.tiktok.com/@rababskitchen", icon: SiTiktok }
  ]
};

const FooterV1: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="text-3xl mb-2 block">👩‍🍳</span>
              <h3 className="text-2xl font-black text-white">{footerData.brand.name}</h3>
              <p className="text-amber-400 font-medium text-sm">{t.footer.tagline}</p>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm mb-6">
              {t.footer.description}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {footerData.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-colors duration-300"
                    aria-label={item.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {t.footer.links.home}
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {t.footer.links.cookingClasses}
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {t.footer.links.bookNow}
                </Link>
              </li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">{t.footer.experiences}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/experiences#tajine-masterclass" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {t.footer.experienceLinks.tajine}
                </Link>
              </li>
              <li>
                <Link href="/experiences#amazigh-heritage" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {t.footer.experienceLinks.amazigh}
                </Link>
              </li>
              <li>
                <Link href="/experiences#tea-ceremony" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {t.footer.experienceLinks.tea}
                </Link>
              </li>
              <li>
                <Link href="/experiences#clay-oven-bread" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {t.footer.experienceLinks.bread}
                </Link>
              </li>
              <li>
                <Link href="/experiences#amlou-workshop" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {t.footer.experienceLinks.amlou}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">{t.footer.contactUs}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{footerData.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href={`tel:${footerData.contact.phone}`} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {footerData.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${footerData.contact.email}`} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {footerData.contact.email}
                </a>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${footerData.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <FiSend className="w-4 h-4" />
              <span>{t.footer.whatsappUs}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Rabab&apos;s Kitchen. {t.footer.rights}.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              {t.footer.madeWith} <FiHeart className="w-4 h-4 text-red-500" /> {t.footer.inMorocco}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV1;
