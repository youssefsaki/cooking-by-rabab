/**
 * Data constants and static imports for client-side usage
 */

import navigationData from '@/data/navigation.json';
import heroData from '@/data/hero.json';
import heroSectionData from '@/data/hero-section.json';
import roomsSectionData from '@/data/rooms-section.json';
import googleReviewsData from '@/data/google-reviews.json';
import footerData from '@/data/footer.json';
import siteConfig from '@/data/site-config.json';
import pagesConfig from '@/data/pages.json';

import type {
  NavigationData,
  HeroData,
  HeroSectionData,
  RoomsSectionData,
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
  navigation: navigationData as NavigationData,
  hero: heroData as HeroData,
  heroSection: heroSectionData as HeroSectionData,
  roomsSection: roomsSectionData as RoomsSectionData,
  googleReviews: googleReviewsData as GoogleReviewsSectionData,
  footer: footerData as FooterData,
  siteConfig: siteConfig as SiteConfig,
  pagesConfig: pagesConfig as PagesConfig,
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
 * Get rooms section data (static import)
 */
export function getStaticRoomsSectionData(): RoomsSectionData {
  return STATIC_DATA.roomsSection;
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
    case '/rooms':
      return pages.rooms.meta;
    case '/packages':
      return pages.packages.meta;
    case '/activities':
      return pages.activities.meta;
    case '/team':
      return pages.team.meta;
    case '/contact':
      return pages.contact.meta;
    default:
      return pages.home.meta; // fallback to home
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

