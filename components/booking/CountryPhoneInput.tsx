'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ChevronDown, Phone, Search } from 'lucide-react';
import { COUNTRIES, Country, findCountryByDialCode } from '@/data/countries-lookup';

interface CountryPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({
  value,
  onChange,
  error,
  placeholder = 'Enter phone number',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Default to Morocco
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with Morocco as default
  useEffect(() => {
    setSelectedCountry(COUNTRIES[0]); // Morocco
  }, []);

  // Parse existing value to extract country code and phone (only on initial mount)
  useEffect(() => {
    if (value && !phoneNumber) {
      // Optimized: Check for dial code match - start from longest dial codes first
      const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
      for (const country of sortedCountries) {
        if (value.startsWith(country.dialCode)) {
          setSelectedCountry(country);
          setPhoneNumber(value.replace(country.dialCode, '').trim());
          return;
        }
      }
      setPhoneNumber(value);
    }
  }, [value, phoneNumber]);

  // Debounce search query for better performance
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 150); // 150ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Update parent value when country or phone changes
  useEffect(() => {
    const trimmedPhone = phoneNumber.trim();
    if (!trimmedPhone) return;
    
    const fullNumber = selectedCountry.dialCode + ' ' + trimmedPhone;
    if (fullNumber !== value) {
      onChange(fullNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, phoneNumber]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = useCallback((country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery(''); // Clear search when selecting
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Only numbers
    setPhoneNumber(input);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Optimized filter: only search when dropdown is open and query is debounced
  const filteredCountries = useMemo(() => {
    if (!isOpen) return []; // Don't filter when closed
    
    if (!debouncedSearchQuery.trim()) {
      // Return first 20 countries + selected country if not in top 20
      const topCountries = COUNTRIES.slice(0, 20);
      const selectedIndex = COUNTRIES.findIndex(c => c.code === selectedCountry.code);
      if (selectedIndex >= 20 && !topCountries.find(c => c.code === selectedCountry.code)) {
        topCountries.push(selectedCountry);
      }
      return topCountries;
    }
    
    // Fast search - prioritize exact matches and starts-with matches
    const query = debouncedSearchQuery.toLowerCase();
    const exactMatches: Country[] = [];
    const startsWithMatches: Country[] = [];
    const containsMatches: Country[] = [];

    for (const country of COUNTRIES) {
      const nameLower = country.name.toLowerCase();
      const codeLower = country.code.toLowerCase();
      const dialCode = country.dialCode;

      if (nameLower === query || codeLower === query || dialCode === query) {
        exactMatches.push(country);
      } else if (nameLower.startsWith(query) || dialCode.startsWith(query)) {
        startsWithMatches.push(country);
      } else if (nameLower.includes(query) || dialCode.includes(query) || codeLower.includes(query)) {
        containsMatches.push(country);
      }
    }

    // Return in priority order, limit to 50 results max
    const results = [...exactMatches, ...startsWithMatches, ...containsMatches];
    return results.slice(0, 50);
  }, [debouncedSearchQuery, isOpen, selectedCountry]);

  // Reset search when closing
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setDebouncedSearchQuery('');
    }
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        {/* Phone Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Phone className="w-5 h-5 text-gray-400" />
        </div>

        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute left-12 top-1/2 transform -translate-y-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
            error
              ? 'bg-red-50 hover:bg-red-100 border-r border-red-200'
              : 'bg-amber-50 hover:bg-amber-100 border-r border-amber-200'
          } pr-3`}
        >
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className="text-sm font-medium text-gray-700">{selectedCountry.dialCode}</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Phone Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className={`w-full pl-36 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
            error
              ? 'border-red-400 focus:ring-red-400 bg-red-50'
              : 'border-amber-200 focus:ring-amber-400 bg-white focus:border-amber-400'
          }`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border-2 border-amber-200 rounded-xl shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
          {/* Search Input */}
          <div className="p-3 border-b border-amber-100 sticky top-0 bg-white">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search country..."
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              />
            </div>
          </div>

          {/* Countries List - Optimized rendering */}
          <div className="overflow-y-auto max-h-64">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors ${
                    selectedCountry.code === country.code ? 'bg-amber-100' : ''
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{country.flag}</span>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium text-gray-900 truncate">{country.name}</div>
                    <div className="text-sm text-gray-500">{country.dialCode}</div>
                  </div>
                  {selectedCountry.code === country.code && (
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <p className="text-sm">No countries found</p>
                <p className="text-xs mt-1">Try a different search</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-1.5 text-sm text-red-600 font-medium flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(CountryPhoneInput);

