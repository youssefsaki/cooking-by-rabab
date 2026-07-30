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

export function childPriceEur(age: number, adultPrice = BASIC_ADULT_PRICE_EUR): number {
  return adultPrice * childPriceMultiplier(age);
}

export function calculateBookingTotal(params: {
  adults: number;
  children: ChildGuest[];
  adultPriceEur?: number;
}): {
  adultSubtotal: number;
  childrenSubtotal: number;
  total: number;
  adultPrice: number;
} {
  const adultPrice = params.adultPriceEur ?? BASIC_ADULT_PRICE_EUR;
  const adults = Math.max(0, params.adults);
  const adultSubtotal = adults * adultPrice;
  const childrenSubtotal = params.children.reduce(
    (sum, child) => sum + childPriceEur(child.age, adultPrice),
    0
  );

  return {
    adultPrice,
    adultSubtotal,
    childrenSubtotal,
    total: adultSubtotal + childrenSubtotal,
  };
}

export function countGuestsTowardCapacity(adults: number, children: ChildGuest[]): number {
  // Ages 0–3 do not count toward the 13-guest workshop capacity
  const payingOrSeatedChildren = children.filter((c) => c.age >= 4).length;
  return Math.max(0, adults) + payingOrSeatedChildren;
}
