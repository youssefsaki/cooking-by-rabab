import type { DietaryPreference, PackageType } from '@/lib/types/cms';

export type BookingInput = {
  fullName: string;
  phone: string;
  country: string;
  email: string;
  packageType: PackageType;
  dietaryPreference: DietaryPreference;
  allergies?: string;
};

const PACKAGE_TYPES: PackageType[] = ['basic', 'weekly-event', 'private', 'private-at-location'];
const DIETARY: DietaryPreference[] = ['none', 'vegetarian', 'vegan'];

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateBooking(body: unknown): { ok: true; data: BookingInput } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' };
  }

  const b = body as Record<string, unknown>;
  const fullName = String(b.fullName ?? '').trim();
  const phone = String(b.phone ?? '').trim();
  const country = String(b.country ?? '').trim();
  const email = String(b.email ?? '').trim();
  const packageType = String(b.packageType ?? '') as PackageType;
  const dietaryPreference = String(b.dietaryPreference ?? 'none') as DietaryPreference;
  const allergies = String(b.allergies ?? '').trim();

  if (fullName.length < 2 || fullName.length > 100) {
    return { ok: false, error: 'Full name must be between 2 and 100 characters' };
  }
  if (!phone || phone.replace(/\D/g, '').length < 8) {
    return { ok: false, error: 'Valid phone number is required' };
  }
  if (country.length < 2 || country.length > 100) {
    return { ok: false, error: 'Country is required' };
  }
  if (!isEmail(email)) {
    return { ok: false, error: 'Valid email is required' };
  }
  if (!PACKAGE_TYPES.includes(packageType)) {
    return { ok: false, error: 'Invalid package type' };
  }
  if (!DIETARY.includes(dietaryPreference)) {
    return { ok: false, error: 'Invalid dietary preference' };
  }
  if (allergies.length > 500) {
    return { ok: false, error: 'Allergies must be under 500 characters' };
  }

  return {
    ok: true,
    data: {
      fullName,
      phone,
      country,
      email,
      packageType,
      dietaryPreference,
      allergies,
    },
  };
}

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function validateContact(body: unknown): { ok: true; data: ContactInput } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' };
  }

  const b = body as Record<string, unknown>;
  const name = String(b.name ?? '').trim();
  const email = String(b.email ?? '').trim();
  const subject = String(b.subject ?? '').trim();
  const message = String(b.message ?? '').trim();

  if (name.length < 2) {
    return { ok: false, error: 'Name must be at least 2 characters' };
  }
  if (!isEmail(email)) {
    return { ok: false, error: 'Valid email is required' };
  }
  if (!subject) {
    return { ok: false, error: 'Subject is required' };
  }
  if (message.length < 10) {
    return { ok: false, error: 'Message must be at least 10 characters' };
  }

  return { ok: true, data: { name, email, subject, message } };
}
