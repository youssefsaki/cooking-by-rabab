'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Home, Mail, Phone, MapPin } from 'lucide-react';
import { FooterData } from '@/types';

interface FooterProps {
  data: FooterData;
}

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer: React.FC<FooterProps> = ({ data }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return Instagram;
      case 'TikTok':
        return TikTokIcon;
      case 'Facebook':
        return Home; // Using Home icon as placeholder for Facebook
      default:
        return Home;
    }
  };

  return (
    <footer className="relative bg-gray-900 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-amber-500/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-orange-500/20 rounded-full blur-lg"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Image
                  src={data.logo.src}
                  alt={data.logo.alt}
                  width={data.logo.width}
                  height={data.logo.height}
                  className="h-16 w-auto filter brightness-110 contrast-110"
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed font-medium">{data.contactInfo.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{data.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{data.contactInfo.email}</span>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            {data.sections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h3 className="text-base font-bold text-white mb-6 tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="text-gray-300 text-sm hover:text-orange-400 transition-all duration-300 block font-medium hover:translate-x-1"
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-3">
              Stay Updated with Our Adventures
            </h3>
            <p className="text-gray-300 mb-6 font-medium text-sm">
              Get the latest news about surf conditions, events, and special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
              />
              <button className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors duration-300 shadow-lg hover:shadow-xl text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-gray-400 text-sm font-medium">
              {data.copyright}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {data.socialLinks.map((social) => {
                const IconComponent = getSocialIcon(social.icon);
                return (
                  <Link
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 hover:bg-orange-500/30 hover:text-orange-300 transition-all duration-300 hover:scale-110"
                    aria-label={social.ariaLabel}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
