/**
 * Site configuration type definitions
 */

/** Color palette configuration */
export interface ColorPalette {
  /** Color shades from 50 to 900 */
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  /** Optional 950 shade */
  950?: string;
}

/** Site color scheme */
export interface ColorScheme {
  /** Primary brand color */
  primary: string;
  /** Secondary/accent color */
  secondary: string;
  /** White color */
  white: string;
  /** Primary color variations */
  'primary-dark': string;
  'primary-light': string;
  /** Secondary color variations */
  'secondary-dark': string;
  'secondary-light': string;
  /** Text colors for contrast */
  'text-primary': string;
  'text-secondary': string;
  /** Legacy charcoal colors for compatibility */
  charcoal: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

/** Site metadata for SEO */
export interface SiteMetadata {
  /** Page title */
  title: string;
  /** Meta description */
  description: string;
  /** SEO keywords */
  keywords: string[];
  /** Site author */
  author: string;
  /** Language code */
  language: string;
  /** Locale code */
  locale: string;
}

/** Site information */
export interface SiteInfo {
  /** Site name */
  name: string;
  /** Site tagline */
  tagline: string;
  /** Site description */
  description: string;
  /** Physical location */
  location: string;
  /** Site URL */
  url: string;
}

/** Contact information */
export interface ContactInfo {
  /** Contact email */
  email: string;
  /** Contact phone */
  phone: string;
  /** Physical address */
  address: string;
  /** Booking URL */
  bookingUrl: string;
}

/** Complete site configuration */
export interface SiteConfig {
  /** Site information */
  site: SiteInfo;
  /** SEO metadata */
  metadata: SiteMetadata;
  /** Color scheme */
  colors: ColorScheme;
  /** Contact information */
  contact: ContactInfo;
  /** Site features list */
  features: string[];
}
