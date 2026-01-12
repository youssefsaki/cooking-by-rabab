/**
 * TypeScript interfaces for Hero Section component
 * Designed for Amazigh Cooking Class experience
 */

export interface CookingFeature {
  /** Icon name from react-icons */
  icon: string;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

export interface CTA {
  /** Button text */
  text: string;
  /** Button link */
  link: string;
}

export interface HeroImage {
  /** Image source path */
  src: string;
  /** Alt text for accessibility */
  alt: string;
}

export interface BentoImages {
  /** Main large image */
  main: HeroImage;
  /** Secondary image */
  secondary: HeroImage;
  /** Tertiary image */
  tertiary: HeroImage;
  /** Accent/bottom image */
  accent: HeroImage;
}

export interface HeroSectionData {
  /** Tagline badge text */
  tagline: string;
  /** Main title text (supports \n for line breaks) */
  title: string;
  /** Subtitle/description text */
  subtitle: string;
  /** Array of cooking features */
  features: CookingFeature[];
  /** Primary call-to-action button */
  cta: CTA;
  /** Optional secondary call-to-action button */
  secondaryCta?: CTA;
  /** Bento grid images */
  images: BentoImages;
}

// Legacy support - keeping old types for backwards compatibility
export interface Feature {
  icon: string;
  title: string;
  description: string;
  link?: string;
}
