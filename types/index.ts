/**
 * Main types index file - exports all type definitions
 */

// Import types for internal use
import type { NavigationData } from './navigation.types';
import type { HeroData } from './hero.types';
import type { HeroSectionData } from './hero-section.types';
import type { GoogleReviewsSectionData } from './google-reviews.types';
import type { FooterData } from './footer.types';

// Navigation types
export type {
  ButtonVariant,
  SocialPlatform,
  NavLink,
  SocialLink,
  LogoConfig,
  CTAButton,
  NavigationData,
} from './navigation.types';

// Hero types
export type {
  BackgroundImage,
  HeroCTAButton,
  ScrollIndicator,
  HeroData,
} from './hero.types';

// Site config types
export type {
  ColorPalette,
  ColorScheme,
  SiteMetadata,
  SiteInfo,
  ContactInfo,
  SiteConfig,
} from './site-config.types';

// Pages types
export type {
  PageMeta,
  PageConfig,
  PagesConfig,
} from './pages.types';

// Hero Section types
export type {
  Feature,
  CTA,
  HeroImage,
  HeroSectionData,
} from './hero-section.types';

// Google Reviews Section types
export type {
  GoogleReview,
  GoogleReviewsSectionData,
} from './google-reviews.types';

// Footer types
export type {
  FooterLink,
  FooterSection,
  FooterData,
} from './footer.types';

// Legacy types for backward compatibility
export interface LayoutProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  navigationData: NavigationData;
}

export interface HeroProps {
  heroData: HeroData;
}
