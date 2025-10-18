'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Instagram, Home, Menu, X } from 'lucide-react';
import { HeaderProps } from '@/types';
import { getSocialIconName } from '@/lib/static-data';
import { usePathname } from 'next/navigation';

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

const Header: React.FC<HeaderProps> = ({ navigationData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSocialIcon = (platform: string) => {
    const iconName = getSocialIconName(platform);
    switch (iconName) {
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
      }`}
    >
      <div className="header-container">
        <nav className="flex items-center justify-between w-full h-24 sm:h-26 lg:h-28 py-8 lg:py-10">
          {/* Block 1: Logo (Left) */}
          <div className="flex-shrink-0">
            <Link href={navigationData.logo.href} className="flex items-center group">
              {navigationData.logo.image ? (
                <Image
                  src={navigationData.logo.image.src}
                  alt={navigationData.logo.image.alt}
                  width={navigationData.logo.image.width}
                  height={navigationData.logo.image.height}
                  priority
                  className="h-16 sm:h-18 lg:h-20 w-auto"
                />
              ) : (
                <div className="flex flex-col">
                  <div className="bg-primary text-white px-3 py-1 rounded text-lg font-bold">
                    {navigationData.logo.text}
                  </div>
                  <div className="bg-primary text-white px-3 py-1 rounded text-xs font-bold">
                    {navigationData.logo.subtext}
                  </div>
                </div>
              )}
            </Link>
          </div>

          {/* Block 2: Navigation Links (Center) */}
          <div className="hidden lg:flex items-center gap-3 mt-1">
            {navigationData.menuItems.map((item: any) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-black tracking-wide transition-colors duration-200 ${
                    isActive 
                      ? 'text-orange-500' 
                      : 'text-charcoal-700 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Block 3: CTA Button + Social Icons (Right) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center gap-2">
              {navigationData.socialLinks.map((social: any) => {
                const IconComponent = getSocialIcon(social.platform);
                return (
                  <Link
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal-600 hover:text-primary transition-colors duration-300"
                    aria-label={social.ariaLabel}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link href={navigationData.ctaButton.href} className="btn-primary text-sm">
              {navigationData.ctaButton.text}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal-600 hover:text-primary transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navigationData.menuItems.map((item: any) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`block text-sm font-black tracking-wide transition-colors duration-200 py-2 ${
                        isActive 
                          ? 'text-orange-500' 
                          : 'text-charcoal-700 hover:text-primary'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              
              {/* Mobile Social Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                {navigationData.socialLinks.map((social: any) => {
                  const IconComponent = getSocialIcon(social.platform);
                  return (
                    <Link
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal-600 hover:text-primary transition-colors duration-300"
                      aria-label={social.ariaLabel}
                    >
                      <IconComponent className="w-6 h-6" />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-4">
                <Link
                  href={navigationData.ctaButton.href}
                  className="btn-primary w-full text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {navigationData.ctaButton.text}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
