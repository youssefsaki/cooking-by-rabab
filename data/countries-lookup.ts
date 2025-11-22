// Optimized country lookup using Map for O(1) performance
import { COUNTRIES, Country } from './countries';

// Create lookup map for faster country code matching
const dialCodeMap = new Map<string, Country>();
COUNTRIES.forEach(country => {
  dialCodeMap.set(country.dialCode, country);
});

export function findCountryByDialCode(dialCode: string): Country | undefined {
  return dialCodeMap.get(dialCode);
}

// Re-export for convenience
export { COUNTRIES, type Country };







