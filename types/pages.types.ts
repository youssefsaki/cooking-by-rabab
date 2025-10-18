/**
 * Pages configuration type definitions
 */

/** Page metadata for SEO */
export interface PageMeta {
  /** Page title */
  title: string;
  /** Meta description */
  description: string;
}

/** Individual page configuration */
export interface PageConfig {
  /** Page title */
  title: string;
  /** Page slug/URL */
  slug: string;
  /** SEO metadata */
  meta: PageMeta;
}

/** Pages configuration structure */
export interface PagesConfig {
  /** Individual page configurations */
  pages: {
    home: PageConfig;
    rooms: PageConfig;
    packages: PageConfig;
    activities: PageConfig;
    team: PageConfig;
    contact: PageConfig;
  };
}



