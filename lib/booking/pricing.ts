import { BASIC_ADULT_PRICE_EUR } from './schedule';

export interface ChildGuest {
  age: number;
}

/** 0–3 free, 4–9 half price, 10+ full price */
export function childPriceMultiplier(age: number): number {
  if (age < 0) return 0;
  if (age <= 3) return 0;
  if (age <= 9) return 0.5;
  return 1;
}

export function childPriceEur(age: number, dishPrice = BASIC_ADULT_PRICE_EUR): number {
  return dishPrice * childPriceMultiplier(age);
}

/**
 * Order-level pricing: (selected dish price) × guests.
 * Children apply age multipliers against the same dish price.
 */
export function calculateBookingTotal(params: {
  adults: number;
  children: ChildGuest[];
  /** Per-guest price of the shared dish chosen for the booking */
  dishPriceEur?: number;
  /** @deprecated use dishPriceEur */
  adultPriceEur?: number;
}): {
  adultSubtotal: number;
  childrenSubtotal: number;
  total: number;
  adultPrice: number;
  dishPrice: number;
  guestCount: number;
} {
  const dishPrice = params.dishPriceEur ?? params.adultPriceEur ?? BASIC_ADULT_PRICE_EUR;
  const adults = Math.max(0, params.adults);
  const adultSubtotal = adults * dishPrice;
  const childrenSubtotal = params.children.reduce(
    (sum, child) => sum + childPriceEur(child.age, dishPrice),
    0
  );

  return {
    adultPrice: dishPrice,
    dishPrice,
    adultSubtotal,
    childrenSubtotal,
    guestCount: adults + params.children.length,
    total: adultSubtotal + childrenSubtotal,
  };
}

export function countGuestsTowardCapacity(adults: number, children: ChildGuest[]): number {
  // Ages 0–3 do not count toward the 13-guest workshop capacity
  const payingOrSeatedChildren = children.filter((c) => c.age >= 4).length;
  return Math.max(0, adults) + payingOrSeatedChildren;
}
