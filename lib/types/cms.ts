export type Locale = 'en' | 'fr' | 'de';
export type PackageType = 'basic' | 'weekly-event' | 'private';
export type DietaryPreference = 'none' | 'vegetarian' | 'vegan';
export type BookingStatus = 'new' | 'contacted' | 'confirmed' | 'cancelled';
export type ContactStatus = 'new' | 'read' | 'replied' | 'archived';

export type BookingRow = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  country: string;
  email: string;
  package_type: PackageType;
  dietary_preference: DietaryPreference;
  allergies: string | null;
  status: BookingStatus;
};

export type ContactMessageRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
};

export type ContentEntryRow = {
  id: string;
  section: string;
  locale: Locale;
  data: Record<string, unknown>;
  updated_at: string;
};

export type SiteSettingsData = {
  phone: { number: string; availability: string };
  email: { address: string; responseTime: string };
  whatsapp: { number: string; note: string; digits?: string };
  officeHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  emergencyNote: string;
};

export type PackageCmsItem = {
  id: PackageType;
  name: string;
  tagline: string;
  subtitle: string;
  price: string;
  currency: string;
  duration: string;
  groupSize: string;
  startTime: string;
  image: string;
  imageAlt: string;
  popular?: boolean;
  highlights: string[];
};

export type PackagesContent = {
  badge?: string;
  title?: string;
  description?: string;
  items: PackageCmsItem[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type FaqsContent = {
  categories: string[];
  faqs: FaqItem[];
};
