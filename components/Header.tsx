'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Instagram, Home, Menu, X, ChevronDown } from 'lucide-react';
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
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
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/30' : 'bg-white/90 backdrop-blur-sm shadow-lg'
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
                  <div className="bg-primary px-3 py-1 rounded text-lg font-bold" style={{ color: '#084869' }}>
                    {navigationData.logo.text}
                  </div>
                  <div className="bg-primary px-3 py-1 rounded text-xs font-bold" style={{ color: '#084869' }}>
                    {navigationData.logo.subtext}
                  </div>
                </div>
              )}
            </Link>
          </div>

          {/* Block 2: Navigation Links (Center) */}
          <div className="hidden lg:flex items-center gap-3 mt-1">
            {navigationData.menuItems.map((item: any) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              const hasDropdown = item.hasDropdown && item.dropdownItems?.length > 0;
              
              if (hasDropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setOpenDropdown(item.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`text-sm font-bold tracking-wide transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-1 ${
                        isActive || openDropdown === item.id
                          ? 'text-primary bg-primary/10' 
                          : 'text-dark-blue hover:text-primary'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu - with padding-top to bridge the gap */}
                    {openDropdown === item.id && (
                      <div className="absolute top-full left-0 pt-2 w-56 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                          {item.dropdownItems.map((dropdownItem: any) => (
                            <Link
                              key={dropdownItem.id}
                              href={dropdownItem.href}
                              className="block px-4 py-3 text-sm font-medium text-dark-blue hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-bold tracking-wide transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-1 ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-dark-blue hover:text-primary'
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
                    className="text-dark-blue hover:text-primary transition-colors duration-300"
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
            className="lg:hidden p-2 text-dark-blue hover:text-primary transition-colors duration-300"
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
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                  const hasDropdown = item.hasDropdown && item.dropdownItems?.length > 0;

                  if (hasDropdown) {
                    return (
                      <div key={item.id}>
                        <button
                          onClick={() => setMobileDropdownOpen(mobileDropdownOpen === item.id ? null : item.id)}
                          className={`flex items-center justify-between w-full text-sm font-black tracking-wide transition-colors duration-200 py-2 px-4 rounded-lg ${
                            isActive 
                              ? 'text-primary bg-primary/10' 
                              : 'text-dark-blue hover:text-primary hover:bg-primary/5'
                          }`}
                        >
                          {item.label}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen === item.id ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Mobile Dropdown */}
                        {mobileDropdownOpen === item.id && (
                          <div className="ml-4 mt-2 space-y-1 border-l-2 border-primary/20 pl-4">
                            {item.dropdownItems.map((dropdownItem: any) => (
                              <Link
                                key={dropdownItem.id}
                                href={dropdownItem.href}
                                className="block py-2 text-sm font-medium text-dark-blue hover:text-primary transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-1 text-sm font-black tracking-wide transition-colors duration-200 py-2 px-4 rounded-lg ${
                        isActive 
                          ? 'text-primary bg-primary/10' 
                          : 'text-dark-blue hover:text-primary hover:bg-primary/5'
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
                      className="text-dark-blue hover:text-primary transition-colors duration-300"
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
