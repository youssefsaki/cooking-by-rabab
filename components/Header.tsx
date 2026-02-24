'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Instagram, Home, Menu, X, ChevronDown, Sparkles, Star, Crown } from 'lucide-react';
import { HeaderProps } from '@/types';
import { getSocialIconName } from '@/lib/static-data';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

// =====================================================
// BOOK NOW DROPDOWN DESIGN SELECTOR
// Change this value to switch between designs: 1, 2, or 3
// =====================================================
const BOOK_NOW_DROPDOWN_DESIGN: number = 1;

// =====================================================
// MOBILE BOOK NOW DESIGN SELECTOR
// Change this value to switch between designs: 1, 2, or 3
// =====================================================
const MOBILE_BOOK_NOW_DESIGN: number = 1;

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
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [ctaDropdownOpen, setCtaDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'EN' as const, label: 'English', flag: '🇬🇧' },
    { code: 'FR' as const, label: 'Français', flag: '🇫🇷' },
    { code: 'DE' as const, label: 'Deutsch', flag: '🇩🇪' }
  ];

  useEffect(() => {
    setHasMounted(true);
    setIsScrolled(window.scrollY > 10);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
        !hasMounted ? 'bg-white/95 shadow-lg' :
        isScrolled ? 'bg-white shadow-xl border-b border-gray-200/30' : 'bg-white/95 shadow-lg'
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
          <div className="hidden lg:flex items-center justify-center gap-3 flex-1">
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
                      {item.id === 'ourstory' ? (t?.nav?.ourStory || item.label) : item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu - with padding-top to bridge the gap */}
                    {openDropdown === item.id && (
                      <div className="absolute top-full left-0 pt-2 w-56 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                          {item.dropdownItems.map((dropdownItem: any) => {
                            const translatedLabel = 
                              dropdownItem.id === 'meet-the-chef' ? (t?.nav?.meetTheChef || dropdownItem.label) :
                              dropdownItem.id === 'our-kitchen' ? (t?.nav?.ourKitchen || dropdownItem.label) :
                              dropdownItem.id === 'location' ? (t?.nav?.location || dropdownItem.label) :
                              dropdownItem.label;
                            return (
                              <Link
                                key={dropdownItem.id}
                                href={dropdownItem.href}
                                className="block px-4 py-3 text-sm font-medium text-dark-blue hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                              >
                                {translatedLabel}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              const translatedLabel = 
                item.id === 'experiences' ? t.nav.experiences :
                item.id === 'packages' ? t.nav.packages :
                item.id === 'events' ? t.nav.events :
                item.label;
              
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
                  {translatedLabel}
                </Link>
              );
            })}
          </div>

          {/* Block 3: CTA Button + Language Selector (Right) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-xl">{languages.find(l => l.code === language)?.flag}</span>
                <span className="text-sm font-bold text-dark-blue">{language}</span>
                <ChevronDown className={`w-4 h-4 text-dark-blue transition-transform duration-200 ${languageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown */}
              {languageDropdownOpen && (
                <>
                  {/* Backdrop to close dropdown when clicking outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLanguageDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLanguageDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 transition-colors duration-200 ${
                          language === lang.code ? 'bg-amber-50' : ''
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-semibold text-gray-900">{lang.label}</div>
                          <div className="text-xs text-gray-500">{lang.code}</div>
                        </div>
                        {language === lang.code && (
                          <span className="text-amber-500">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CTA Button with Dropdown */}
            {navigationData.ctaButton.hasDropdown ? (
              <div 
                className="relative"
                onMouseEnter={() => setCtaDropdownOpen(true)}
                onMouseLeave={() => setCtaDropdownOpen(false)}
              >
                <button className="btn-primary text-sm flex items-center gap-2">
                  {t.nav.bookNow}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${ctaDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* DESIGN 1: Clean Card Grid */}
                {ctaDropdownOpen && BOOK_NOW_DROPDOWN_DESIGN === 1 && (
                  <div className="absolute top-full right-0 pt-3 w-80 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3">
                        <p className="text-white font-bold text-sm">{t.header.chooseExperience}</p>
                      </div>
                      <div className="p-2">
                        {navigationData.ctaButton.dropdownItems?.map((item: any) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className={`block p-3 rounded-xl transition-all duration-200 hover:bg-amber-50 group ${item.popular ? 'bg-amber-50/50 ring-1 ring-amber-200' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-gray-900 group-hover:text-amber-600">{item.label}</span>
                                  {item.popular && (
                                    <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">Popular</span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                              </div>
                              <span className="text-lg font-black text-amber-600">{item.price}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                        <Link href="/packages" className="text-xs text-amber-600 font-semibold hover:underline">
                          {t.header.viewAllPackages} →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* DESIGN 2: Elegant List with Icons */}
                {ctaDropdownOpen && BOOK_NOW_DROPDOWN_DESIGN === 2 && (
                  <div className="absolute top-full right-0 pt-3 w-72 z-50">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
                      <div className="p-4 border-b border-gray-800">
                        <p className="text-amber-400 font-bold text-sm tracking-wide uppercase">{t.header.selectPackage}</p>
                      </div>
                      <div className="py-2">
                        {navigationData.ctaButton.dropdownItems?.map((item: any, index: number) => {
                          const icons = [Sparkles, Star, Crown, Star];
                          const IconComponent = icons[index] || Star;
                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 transition-colors group"
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.popular ? 'bg-amber-500' : 'bg-gray-800 group-hover:bg-gray-700'}`}>
                                <IconComponent className={`w-5 h-5 ${item.popular ? 'text-white' : 'text-amber-400'}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white">{item.label}</span>
                                  {item.popular && <span className="text-xs text-amber-400">★ Best Value</span>}
                                </div>
                                <p className="text-xs text-gray-400">{item.description}</p>
                              </div>
                              <span className="text-amber-400 font-black">{item.price}</span>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="p-4 bg-gray-800/50">
                        <Link href="/packages" className="block text-center text-sm text-white bg-amber-500 hover:bg-amber-600 py-2 rounded-lg font-bold transition-colors">
                          {t.header.comparePackages}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* DESIGN 3: Compact Pills */}
                {ctaDropdownOpen && BOOK_NOW_DROPDOWN_DESIGN === 3 && (
                  <div className="absolute top-full right-0 pt-3 w-64 z-50">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.header.quickBook}</p>
                      <div className="space-y-2">
                        {navigationData.ctaButton.dropdownItems?.map((item: any) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 hover:border-amber-400 hover:bg-amber-50 ${item.popular ? 'border-amber-400 bg-amber-50' : 'border-gray-100'}`}
                          >
                            <div className="flex items-center gap-2">
                              {item.popular && <span className="text-amber-500">⭐</span>}
                              <span className={`font-bold ${item.popular ? 'text-amber-700' : 'text-gray-700'}`}>{item.label}</span>
                            </div>
                            <span className={`font-black ${item.popular ? 'text-amber-600' : 'text-gray-600'}`}>{item.price}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <Link href="/packages" className="text-xs text-center block text-amber-600 font-semibold hover:underline">
                          {t.header.viewAllPackages}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
            <Link href={navigationData.ctaButton.href} className="btn-primary text-sm">
              {navigationData.ctaButton.text}
            </Link>
            )}
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
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-200 px-4">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Language / Langue / Sprache</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setLanguage('EN');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all ${
                      language === 'EN'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">🇬🇧</span>
                    <span className="text-xs font-bold">English</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setLanguage('FR');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all ${
                      language === 'FR'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">🇫🇷</span>
                    <span className="text-xs font-bold">Français</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setLanguage('DE');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all ${
                      language === 'DE'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">🇩🇪</span>
                    <span className="text-xs font-bold">Deutsch</span>
                  </button>
                </div>
              </div>

              {/* Mobile CTA Button with Packages */}
              <div className="pt-4">
                {navigationData.ctaButton.hasDropdown ? (
                  <>
                    {/* MOBILE DESIGN 1: Card Stack */}
                    {MOBILE_BOOK_NOW_DESIGN === 1 && (
                      <div className="space-y-3 px-2">
                        <div className="flex items-center justify-between px-2">
                          <p className="text-sm font-bold text-gray-900">{t.header.bookYourExperience}</p>
                          <span className="text-xs text-gray-500">{t.header.packages}</span>
                        </div>
                        <div className="space-y-2">
                          {navigationData.ctaButton.dropdownItems?.map((item: any) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              className={`block p-4 rounded-xl transition-all active:scale-[0.98] ${
                                item.popular 
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                                  : 'bg-gray-50 border border-gray-200'
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className={`font-bold ${item.popular ? 'text-white' : 'text-gray-900'}`}>{item.label}</span>
                                    {item.popular && <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">★ Popular</span>}
                                  </div>
                                  <p className={`text-xs mt-1 ${item.popular ? 'text-white/80' : 'text-gray-500'}`}>{item.description}</p>
                                </div>
                                <span className={`text-xl font-black ${item.popular ? 'text-white' : 'text-amber-600'}`}>{item.price}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/packages"
                          className="block text-center text-sm text-amber-600 font-semibold py-3 border-t border-gray-100"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Compare all packages →
                        </Link>
                      </div>
                    )}

                    {/* MOBILE DESIGN 2: Horizontal Scroll Cards */}
                    {MOBILE_BOOK_NOW_DESIGN === 2 && (
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-gray-900 px-4">{t.header.selectPackage}</p>
                        <div className="flex gap-3 overflow-x-auto pb-3 px-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          {navigationData.ctaButton.dropdownItems?.map((item: any) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              className={`flex-shrink-0 w-36 snap-start rounded-2xl p-4 transition-all active:scale-[0.98] ${
                                item.popular 
                                  ? 'bg-gray-900 text-white' 
                                  : 'bg-white border-2 border-gray-200'
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="text-center">
                                {item.popular && <span className="text-amber-400 text-xs font-bold">⭐ BEST VALUE</span>}
                                <p className={`text-2xl font-black mt-1 ${item.popular ? 'text-amber-400' : 'text-amber-600'}`}>{item.price}</p>
                                <p className={`font-bold text-sm mt-2 ${item.popular ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                                <p className={`text-xs mt-1 ${item.popular ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</p>
                                <div className={`mt-3 py-2 rounded-lg text-xs font-bold ${item.popular ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                  Book Now
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/packages"
                          className="block text-center text-xs text-gray-500 py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {t.header.viewAllPackages}
                        </Link>
                      </div>
                    )}

                    {/* MOBILE DESIGN 3: Compact Grid */}
                    {MOBILE_BOOK_NOW_DESIGN === 3 && (
                      <div className="px-4 space-y-4">
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
                          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">🍳 Choose Your Package</p>
                          <div className="grid grid-cols-2 gap-2">
                            {navigationData.ctaButton.dropdownItems?.map((item: any) => (
                              <Link
                                key={item.id}
                                href={item.href}
                                className={`relative p-3 rounded-xl text-center transition-all active:scale-[0.98] ${
                                  item.popular 
                                    ? 'bg-amber-500 text-white shadow-md' 
                                    : 'bg-white border border-amber-200'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.popular && (
                                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">HOT</span>
                                )}
                                <p className={`text-lg font-black ${item.popular ? 'text-white' : 'text-amber-600'}`}>{item.price}</p>
                                <p className={`text-xs font-bold mt-1 ${item.popular ? 'text-white' : 'text-gray-700'}`}>{item.label}</p>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/packages"
                            className="block text-center text-xs text-amber-700 font-semibold mt-4 py-2 bg-white rounded-lg border border-amber-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {t.header.seeWhatsIncluded} →
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                <Link
                  href={navigationData.ctaButton.href}
                  className="btn-primary w-full text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {navigationData.ctaButton.text}
                </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
