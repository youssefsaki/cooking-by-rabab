/**
 * TypeScript interfaces for Hero Section component
 */

export interface Feature {
  /** Icon name from react-icons/fa */
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

export interface HeroSectionData {
  /** Main title text */
  title: string;
  /** Subtitle text */
  subtitle: string;
  /** Array of features */
  features: Feature[];
  /** Call-to-action button */
  cta: CTA;
  /** Array of hero images */
  images: HeroImage[];
}






