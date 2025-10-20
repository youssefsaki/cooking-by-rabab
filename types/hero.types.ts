/**
 * Hero section type definitions
 */

import { ButtonVariant } from './navigation.types';

/** Background image configuration */
export interface BackgroundImage {
  /** Image URL */
  url: string;
  /** Alt text for accessibility */
  alt: string;
  /** Image credit or source */
  credit?: string;
}

/** Call-to-action button for hero section */
export interface HeroCTAButton {
  /** Button text */
  text: string;
  /** Link destination */
  href: string;
  /** Visual variant */
  variant: ButtonVariant;
  /** Whether this is the primary CTA */
  priority: boolean;
}

/** Scroll indicator configuration */
export interface ScrollIndicator {
  /** Whether scroll indicator is enabled */
  enabled: boolean;
  /** Tooltip text for scroll indicator */
  text?: string;
}

/** Complete hero section data structure */
export interface HeroData {
  /** Small heading above main title */
  subheading: string;
  /** Main hero heading */
  heading: string;
  /** Descriptive paragraph */
  description: string;
  /** Background image configuration */
  backgroundImage: BackgroundImage;
  /** Array of call-to-action buttons */
  ctaButtons: HeroCTAButton[];
  /** Scroll indicator configuration */
  scrollIndicator: ScrollIndicator;
}





