/**
 * Navigation-related type definitions
 */

/** Button variant types for consistent styling */
export type ButtonVariant = 'primary' | 'secondary';

/** Social media platform types */
export type SocialPlatform = 'instagram' | 'tiktok' | 'facebook';

/** Navigation link structure */
export interface NavLink {
  /** Unique identifier for the navigation item */
  id: string;
  /** Display text for the navigation item */
  label: string;
  /** URL or anchor link for navigation */
  href: string;
  /** Whether the link opens in a new tab */
  external?: boolean;
}

/** Social media link structure */
export interface SocialLink {
  /** Social media platform name */
  platform: SocialPlatform;
  /** URL to the social media profile */
  url: string;
  /** Icon name for rendering */
  icon: string;
  /** Accessibility label for screen readers */
  ariaLabel: string;
}

/** Logo configuration */
export interface LogoConfig {
  /** Main logo text */
  text: string;
  /** Subtitle or tagline */
  subtext: string;
  /** Link destination for logo click */
  href: string;
  /** Logo image configuration */
  image?: {
    /** Image source path */
    src: string;
    /** Alt text for accessibility */
    alt: string;
    /** Image width */
    width: number;
    /** Image height */
    height: number;
  };
}

/** Call-to-action button configuration */
export interface CTAButton {
  /** Button text */
  text: string;
  /** Link destination */
  href: string;
  /** Visual variant */
  variant: ButtonVariant;
}

/** Complete navigation data structure */
export interface NavigationData {
  /** Logo configuration */
  logo: LogoConfig;
  /** Array of navigation menu items */
  menuItems: NavLink[];
  /** Array of social media links */
  socialLinks: SocialLink[];
  /** Primary call-to-action button */
  ctaButton: CTAButton;
}
