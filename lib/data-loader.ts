/**
 * Data loading and validation utilities
 */

import { promises as fs } from 'fs';
import path from 'path';
import type {
  NavigationData,
  HeroData,
  SiteConfig,
  PagesConfig,
} from '@/types';

/**
 * Base data loader with error handling
 */
async function loadJsonData<T>(filePath: string): Promise<T> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const data = JSON.parse(fileContents) as T;
    return data;
  } catch (error) {
    console.error(`Error loading data from ${filePath}:`, error);
    throw new Error(`Failed to load data from ${filePath}`);
  }
}

/**
 * Load navigation data from JSON file
 */
export async function getNavigationData(): Promise<NavigationData> {
  return loadJsonData<NavigationData>('data/navigation.json');
}

/**
 * Load hero section data from JSON file
 */
export async function getHeroData(): Promise<HeroData> {
  return loadJsonData<HeroData>('data/hero.json');
}

/**
 * Load site configuration from JSON file
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  return loadJsonData<SiteConfig>('data/site-config.json');
}

/**
 * Load pages configuration from JSON file
 */
export async function getPagesConfig(): Promise<PagesConfig> {
  return loadJsonData<PagesConfig>('data/pages.json');
}

/**
 * Load all site data at once
 */
export async function getAllSiteData() {
  try {
    const [navigationData, heroData, siteConfig, pagesConfig] = await Promise.all([
      getNavigationData(),
      getHeroData(),
      getSiteConfig(),
      getPagesConfig(),
    ]);

    return {
      navigationData,
      heroData,
      siteConfig,
      pagesConfig,
    };
  } catch (error) {
    console.error('Error loading site data:', error);
    throw new Error('Failed to load site data');
  }
}

/**
 * Validate that required fields exist in data
 */
export function validateNavigationData(data: any): data is NavigationData {
  return (
    data &&
    typeof data === 'object' &&
    data.logo &&
    typeof data.logo.text === 'string' &&
    data.menuItems &&
    Array.isArray(data.menuItems) &&
    data.socialLinks &&
    Array.isArray(data.socialLinks) &&
    data.ctaButton &&
    typeof data.ctaButton.text === 'string'
  );
}

/**
 * Validate hero data structure
 */
export function validateHeroData(data: any): data is HeroData {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.subheading === 'string' &&
    typeof data.heading === 'string' &&
    typeof data.description === 'string' &&
    data.backgroundImage &&
    typeof data.backgroundImage.url === 'string' &&
    data.ctaButtons &&
    Array.isArray(data.ctaButtons)
  );
}

/**
 * Validate site config structure
 */
export function validateSiteConfig(data: any): data is SiteConfig {
  return (
    data &&
    typeof data === 'object' &&
    data.site &&
    typeof data.site.name === 'string' &&
    data.metadata &&
    typeof data.metadata.title === 'string' &&
    data.colors &&
    data.colors.primary &&
    data.colors.charcoal
  );
}

/**
 * Safe data loader with validation
 */
export async function getValidatedData<T>(
  loader: () => Promise<T>,
  validator: (data: any) => data is T,
  dataName: string
): Promise<T> {
  try {
    const data = await loader();
    if (!validator(data)) {
      throw new Error(`Invalid ${dataName} data structure`);
    }
    return data;
  } catch (error) {
    console.error(`Error loading ${dataName}:`, error);
    throw error;
  }
}



