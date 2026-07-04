/**
 * Data constants and static imports for client-side usage
 */

import navigationData from '@/data/navigation.json';
import heroData from '@/data/hero.json';
import heroSectionData from '@/data/hero-section.json';
import googleReviewsData from '@/data/google-reviews.json';
import footerData from '@/data/footer.json';
import siteConfig from '@/data/site-config.json';
import pagesConfig from '@/data/pages.json';

import type {
  NavigationData,
  HeroData,
  HeroSectionData,
  GoogleReviewsSectionData,
  FooterData,
  SiteConfig,
  PagesConfig,
} from '@/types';

/**
 * Static data imports for client-side components
 * These are imported at build time and don't require async loading
 */
export const STATIC_DATA = {
  navigation: navigationData as unknown as NavigationData,
  hero: heroData as unknown as HeroData,
  heroSection: heroSectionData as unknown as HeroSectionData,
  googleReviews: googleReviewsData as unknown as GoogleReviewsSectionData,
  footer: footerData as unknown as FooterData,
  siteConfig: siteConfig as unknown as SiteConfig,
  pagesConfig: pagesConfig as unknown as PagesConfig,
} as const;

/**
 * Get navigation data (static import)
 */
export function getStaticNavigationData(): NavigationData {
  return STATIC_DATA.navigation;
}

/**
 * Get hero data (static import)
 */
export function getStaticHeroData(): HeroData {
  return STATIC_DATA.hero;
}

/**
 * Get hero section data (static import)
 */
export function getStaticHeroSectionData(): HeroSectionData {
  return STATIC_DATA.heroSection;
}

/**
 * Get Google reviews section data (static import)
 */
export function getStaticGoogleReviewsData(): GoogleReviewsSectionData {
  return STATIC_DATA.googleReviews;
}

/**
 * Get footer data (static import)
 */
export function getStaticFooterData(): FooterData {
  return STATIC_DATA.footer;
}

/**
 * Get site config (static import)
 */
export function getStaticSiteConfig(): SiteConfig {
  return STATIC_DATA.siteConfig;
}

/**
 * Get pages config (static import)
 */
export function getStaticPagesConfig(): PagesConfig {
  return STATIC_DATA.pagesConfig;
}

/**
 * Get all static data
 */
export function getAllStaticData() {
  return STATIC_DATA;
}

/**
 * Helper to get page metadata by slug
 */
export function getPageMeta(slug: string) {
  const pages = STATIC_DATA.pagesConfig.pages;
  
  switch (slug) {
    case '/':
      return pages.home.meta;
    case '/packages':
      return pages.packages.meta;
    case '/experiences':
      return pages.experiences.meta;
    case '/book':
      return pages.book.meta;
    case '/events':
      return pages.events.meta;
    case '/faq-contact':
    case '/contact':
      return pages.contact.meta;
    default:
      return pages.home.meta;
  }
}

/**
 * Helper to get social media icon component name
 */
export function getSocialIconName(platform: string): string {
  const iconMap: Record<string, string> = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    facebook: 'Facebook',
  };
  
  return iconMap[platform] || 'Home';
}
