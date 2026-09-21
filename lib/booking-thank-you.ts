const STORAGE_KEY = 'cbr_booking_thank_you';
const MAX_AGE_MS = 60 * 60 * 1000;

export type BookingThankYouPayload = {
  whatsappUrl: string;
  savedAt: number;
};

export function storeBookingThankYou(whatsappUrl: string) {
  try {
    const payload: BookingThankYouPayload = {
      whatsappUrl,
      savedAt: Date.now(),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export function readBookingThankYou(): BookingThankYouPayload | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BookingThankYouPayload;
    if (!parsed?.savedAt || Date.now() - parsed.savedAt > MAX_AGE_MS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
