'use client';

import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { FiCheck, FiMail, FiPhone, FiUser, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import WorkshopCalendar from '@/components/booking/WorkshopCalendar';
import DishSelectionStep from '@/components/booking/DishSelectionStep';
import type { CalendarSlot, PackageType } from '@/lib/booking/schedule';
import {
  BASIC_MAX_GUESTS,
  BASIC_MIN_ADULTS,
  effectiveMinAdultsForPrivate,
  getUpcomingCalendarWeeks,
  minAdultsForPackage,
  unitPriceForPackage,
} from '@/lib/booking/schedule';
import { calculateBookingTotal, countGuestsTowardCapacity, type ChildGuest } from '@/lib/booking/pricing';
import {
  BOOKING_MENU_IDS,
  getDishById,
  getDishesForSlotCategory,
} from '@/lib/booking/menu';
import {
  isPeriodLockedForPrivate,
  isSharedSlotForPrivate,
  leftoverSpotsForPrivateJoin,
  SLOT_CONFLICT_MESSAGE,
  type SlotOccupancy,
} from '@/lib/booking/conflicts';
import Image from 'next/image';

const countryOptions = [
  { value: 'Morocco', label: '🇲🇦 Morocco', flag: '🇲🇦' },
  { value: 'France', label: '🇫🇷 France', flag: '🇫🇷' },
  { value: 'Spain', label: '🇪🇸 Spain', flag: '🇪🇸' },
  { value: 'Germany', label: '🇩🇪 Germany', flag: '🇩🇪' },
  { value: 'United Kingdom', label: '🇬🇧 United Kingdom', flag: '🇬🇧' },
  { value: 'United States', label: '🇺🇸 United States', flag: '🇺🇸' },
  { value: 'Canada', label: '🇨🇦 Canada', flag: '🇨🇦' },
  { value: 'Netherlands', label: '🇳🇱 Netherlands', flag: '🇳🇱' },
  { value: 'Belgium', label: '🇧🇪 Belgium', flag: '🇧🇪' },
  { value: 'Italy', label: '🇮🇹 Italy', flag: '🇮🇹' },
  { value: 'Portugal', label: '🇵🇹 Portugal', flag: '🇵🇹' },
  { value: 'Switzerland', label: '🇨🇭 Switzerland', flag: '🇨🇭' },
  { value: 'Australia', label: '🇦🇺 Australia', flag: '🇦🇺' },
  { value: 'Brazil', label: '🇧🇷 Brazil', flag: '🇧🇷' },
  { value: 'Mexico', label: '🇲🇽 Mexico', flag: '🇲🇽' },
  { value: 'Argentina', label: '🇦🇷 Argentina', flag: '🇦🇷' },
  { value: 'Japan', label: '🇯🇵 Japan', flag: '🇯🇵' },
  { value: 'South Korea', label: '🇰🇷 South Korea', flag: '🇰🇷' },
  { value: 'China', label: '🇨🇳 China', flag: '🇨🇳' },
  { value: 'India', label: '🇮🇳 India', flag: '🇮🇳' },
  { value: 'United Arab Emirates', label: '🇦🇪 United Arab Emirates', flag: '🇦🇪' },
  { value: 'Saudi Arabia', label: '🇸🇦 Saudi Arabia', flag: '🇸🇦' },
  { value: 'South Africa', label: '🇿🇦 South Africa', flag: '🇿🇦' },
  { value: 'Other', label: '🌍 Other', flag: '🌍' },
];

const PHONE_LENGTHS: Record<string, number[]> = {
  '212': [12],
  '33': [11],
  '34': [11],
  '49': [12, 13],
  '44': [12],
  '1': [11],
  '31': [11],
  '32': [11],
  '39': [12, 13],
  '351': [12],
  '41': [11],
  '61': [11],
  '55': [12, 13],
  '52': [12],
  '54': [12, 13],
  '81': [12, 13],
  '82': [12, 13],
  '86': [13],
  '91': [12],
  '971': [12, 13],
  '966': [12],
  '27': [11],
};

function validatePhoneForCountry(phone: string, dialCode: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  const expectedLengths = PHONE_LENGTHS[dialCode];
  if (!expectedLengths) {
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  }
  return expectedLengths.includes(digitsOnly.length);
}

function resolvePackageType(packageParam: string | null): PackageType {
  if (packageParam === 'private-at-location') return 'private-at-location';
  if (packageParam === 'private') return 'private';
  if (packageParam === 'weekly-event') return 'weekly-event';
  return 'basic';
}

function isPrivatePackage(pkg: PackageType): boolean {
  return pkg === 'private' || pkg === 'private-at-location';
}

function usesCalendar(pkg: PackageType): boolean {
  return (
    pkg === 'basic' ||
    pkg === 'weekly-event' ||
    pkg === 'private' ||
    pkg === 'private-at-location'
  );
}

function calendarModeForPackage(pkg: PackageType): 'basic' | 'weekly' | 'private' {
  if (pkg === 'weekly-event') return 'weekly';
  if (pkg === 'private' || pkg === 'private-at-location') return 'private';
  return 'basic';
}

function packageLabel(packageType: PackageType): string {
  if (packageType === 'basic') return 'The Authentic Mountain & Culinary Escape';
  if (packageType === 'weekly-event') return 'Weekly Event (80 EUR)';
  if (packageType === 'private-at-location') return 'Rabab Comes to You (100 EUR)';
  return 'Private Workshop Experience (80 EUR)';
}

const baseValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .required('Full name is required'),
  phone: Yup.string().required('Phone number is required'),
  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country must be less than 100 characters')
    .required('Country is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  packageType: Yup.string()
    .oneOf(['basic', 'weekly-event', 'private', 'private-at-location'], 'Please select a valid package')
    .required('Package selection is required'),
  dietaryPreference: Yup.string()
    .oneOf(['none', 'vegetarian', 'vegan'], 'Please select a valid dietary preference')
    .required('Dietary preference is required'),
  allergies: Yup.string().max(500, 'Allergies description must be less than 500 characters'),
  dietaryNotes: Yup.string().max(500, 'Dietary notes must be less than 500 characters'),
  adults: Yup.number().min(1).required(),
  preferredDate: Yup.string().notRequired(),
  preferredPeriod: Yup.string()
    .oneOf(['morning', 'afternoon'])
    .notRequired(),
  dishId: Yup.string().when('packageType', {
    is: (pkg: string) => pkg === 'basic',
    then: (schema) =>
      schema
        .oneOf(BOOKING_MENU_IDS, 'Please select one dish for your group')
        .required('Please select one dish for your group'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

function BookingForm() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package');
  const { t } = useLanguage();
  const initialPackage = resolvePackageType(packageParam);
  const calendarFlow = usesCalendar(initialPackage);

  const [step, setStep] = useState<'calendar' | 'dish' | 'form'>(
    calendarFlow ? 'calendar' : 'form'
  );
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null);
  const [dishStepError, setDishStepError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [phoneDialCode, setPhoneDialCode] = useState('212');
  const [phoneError, setPhoneError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [bringingChildren, setBringingChildren] = useState(false);
  const [children, setChildren] = useState<ChildGuest[]>([]);
  const [slotOccupancy, setSlotOccupancy] = useState<SlotOccupancy | null>(null);
  const [slotOccupancyLoading, setSlotOccupancyLoading] = useState(false);

  // Warm availability cache as soon as /book opens (before calendar paint settles)
  useEffect(() => {
    if (!calendarFlow) return;
    const weeks = getUpcomingCalendarWeeks(4);
    const dates = weeks.flatMap((w) => w.days.map((d) => d.date));
    const from = dates[0];
    const to = dates[dates.length - 1];
    if (!from || !to) return;
    void fetch(`/api/availability?from=${from}&to=${to}`);
  }, [calendarFlow]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      country: '',
      email: '',
      packageType: initialPackage as PackageType,
      dietaryPreference: 'none',
      allergies: '',
      dietaryNotes: '',
      adults: minAdultsForPackage(initialPackage),
      dishId: '',
      preferredDate: '',
      preferredPeriod: 'morning',
    },
    validationSchema: baseValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError('');
      if (!validatePhoneForCountry(values.phone, phoneDialCode)) {
        setPhoneError(`Phone number must match the format for +${phoneDialCode}`);
        setSubmitting(false);
        return;
      }

      try {
        const pkg = values.packageType as PackageType;
        const isBasic = pkg === 'basic';
        const isWeekly = pkg === 'weekly-event';
        const isPrivate = isPrivatePackage(pkg);

        if ((isBasic || isWeekly || isPrivate) && !selectedSlot) {
          setSubmitError('Please select a workshop slot first.');
          setStep('calendar');
          setSubmitting(false);
          return;
        }

        const joiningShared =
          isPrivate && isSharedSlotForPrivate(slotOccupancy);
        const privateRemaining =
          slotOccupancy?.remainingBasicCapacity ?? BASIC_MAX_GUESTS;
        const minAdults = isPrivate
          ? effectiveMinAdultsForPrivate(pkg, privateRemaining, joiningShared)
          : minAdultsForPackage(pkg);

        if (values.adults < minAdults) {
          setSubmitError(`This package requires at least ${minAdults} adults.`);
          setSubmitting(false);
          return;
        }

        if (isBasic) {
          const childPayload = bringingChildren ? children : [];
          const partySize = countGuestsTowardCapacity(values.adults, childPayload);
          const remaining = slotOccupancy?.remainingBasicCapacity ?? BASIC_MAX_GUESTS;
          const leftover = leftoverSpotsForPrivateJoin(slotOccupancy);
          if (leftover > 0) {
            setSubmitError(
              `Only ${leftover} spot${leftover === 1 ? '' : 's'} left — Basic needs at least ${BASIC_MIN_ADULTS} guests. You can join via the Private package.`
            );
            setSubmitting(false);
            return;
          }
          const minForPackage = minAdultsForPackage(pkg);
          if (remaining < minForPackage) {
            setSubmitError(
              'This workshop is fully booked. Please choose another day.'
            );
            setSubmitting(false);
            return;
          }
          if (partySize > remaining) {
            setSubmitError(
              remaining <= 0
                ? 'This workshop is fully booked. Please choose another day.'
                : `Only ${remaining} spot${remaining === 1 ? '' : 's'} left on this workshop, but your group needs ${partySize}. Please choose another day, or reduce your group size (ages 0–3 do not count).`
            );
            setSubmitting(false);
            return;
          }
        }

        if (isPrivate && selectedSlot) {
          // Re-check live locks / capacity before submit
          try {
            const res = await fetch(
              `/api/availability?from=${selectedSlot.date}&to=${selectedSlot.date}`,
              { cache: 'no-store' }
            );
            if (res.ok) {
              const data = (await res.json()) as { occupancy?: SlotOccupancy[] };
              const hold = data.occupancy?.find((o) => o.slotId === selectedSlot.id);
              if (isPeriodLockedForPrivate(hold)) {
                setSubmitError(SLOT_CONFLICT_MESSAGE);
                setStep('calendar');
                setSubmitting(false);
                return;
              }
              if (isSharedSlotForPrivate(hold)) {
                const childPayload = bringingChildren ? children : [];
                const partySize = countGuestsTowardCapacity(values.adults, childPayload);
                const remaining = hold?.remainingBasicCapacity ?? 0;
                if (partySize > remaining) {
                  setSubmitError(
                    `Only ${remaining} spot${remaining === 1 ? '' : 's'} left on this workshop, but your group needs ${partySize}. Please reduce your group size.`
                  );
                  setSubmitting(false);
                  return;
                }
              }
            }
          } catch {
            // Server will still enforce conflicts
          }
        }

        const selectedDish = getDishById(values.dishId);
        if (isBasic && !selectedDish) {
          setSubmitError('Please select one shared dish for your group.');
          setStep('dish');
          setSubmitting(false);
          return;
        }

        const slotDate = selectedSlot!.date;
        const slotPeriod = selectedSlot!.period;

        const childPayload = bringingChildren ? children.filter((c) => Number.isFinite(c.age)) : [];
        const locationLabel =
          pkg === 'private-at-location'
            ? 'At your villa / riad (Rabab comes to you)'
            : pkg === 'weekly-event'
              ? `Weekly Event · ${selectedSlot!.startTime}–${selectedSlot!.endTime}`
              : pkg === 'private'
                ? joiningShared
                  ? `Joining shared workshop — ${selectedSlot!.startTime}–${selectedSlot!.endTime}`
                  : `Private workshop — ${selectedSlot!.startTime}–${selectedSlot!.endTime}`
                : `Pick-up ${selectedSlot!.pickup.time} at ${selectedSlot!.pickup.meetingPoint}`;

        const dishName = isBasic
          ? selectedDish!.name
          : isWeekly
            ? selectedSlot!.dish
            : 'Private cooking experience (to confirm)';

        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: values.fullName,
            phone: values.phone,
            country: values.country,
            email: values.email,
            packageType: pkg,
            slotDate,
            slotPeriod,
            dishId: selectedDish?.id,
            dish: dishName,
            adults: values.adults,
            children: childPayload,
            location: locationLabel,
            dietaryNotes: values.dietaryNotes,
            allergies: values.dietaryNotes,
          }),
        });

        const data = (await res.json()) as { error?: string; booking?: { totalPrice: number } };
        if (!res.ok) {
          setSubmitError(data.error || SLOT_CONFLICT_MESSAGE);
          if (res.status === 409 && isBasic) setStep('calendar');
          setSubmitting(false);
          return;
        }

        setSubmitted(true);
        openWhatsApp({
          ...values,
          dish: dishName,
          dishPrice: unitPriceForPackage(pkg, selectedDish?.priceEur),
          slotDate,
          slotPeriod,
          pickup: locationLabel,
          adults: values.adults,
          children: childPayload,
          totalPrice: data.booking?.totalPrice,
          dietaryNotes: values.dietaryNotes,
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('Something went wrong. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const availableDishes = useMemo(
    () => getDishesForSlotCategory(selectedSlot?.menuCategory),
    [selectedSlot?.menuCategory]
  );

  const selectedDish = getDishById(formik.values.dishId);
  const activePackage = formik.values.packageType as PackageType;
  const unitPrice = unitPriceForPackage(activePackage, selectedDish?.priceEur);

  const needsSlotOccupancy =
    (initialPackage === 'basic' || isPrivatePackage(initialPackage)) && !!selectedSlot;

  // Live remaining capacity for Basic + Private (join) workshop form
  useEffect(() => {
    if (!needsSlotOccupancy || !selectedSlot) {
      setSlotOccupancy(null);
      setSlotOccupancyLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setSlotOccupancyLoading(true);
      try {
        const date = selectedSlot.date;
        const res = await fetch(`/api/availability?from=${date}&to=${date}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('availability failed');
        const data = (await res.json()) as { occupancy?: SlotOccupancy[] };
        const hold = data.occupancy?.find((o) => o.slotId === selectedSlot.id) ?? null;
        if (!cancelled) setSlotOccupancy(hold);
      } catch {
        if (!cancelled) setSlotOccupancy(null);
      } finally {
        if (!cancelled) setSlotOccupancyLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [needsSlotOccupancy, selectedSlot]);

  const remainingSpots = useMemo(() => {
    if (!needsSlotOccupancy) return null;
    if (slotOccupancyLoading) return null;
    return slotOccupancy?.remainingBasicCapacity ?? BASIC_MAX_GUESTS;
  }, [needsSlotOccupancy, slotOccupancy, slotOccupancyLoading]);

  const bookedGuestCount = slotOccupancy?.basicGuestCount ?? 0;
  const joiningSharedSlot =
    isPrivatePackage(initialPackage) && isSharedSlotForPrivate(slotOccupancy);
  const basicLeftoverSpots =
    initialPackage === 'basic' ? leftoverSpotsForPrivateJoin(slotOccupancy) : 0;

  const minAdults = useMemo(() => {
    if (isPrivatePackage(activePackage)) {
      const remaining = remainingSpots ?? BASIC_MAX_GUESTS;
      return effectiveMinAdultsForPrivate(activePackage, remaining, joiningSharedSlot);
    }
    return minAdultsForPackage(activePackage);
  }, [activePackage, remainingSpots, joiningSharedSlot]);

  const partyCapacityCount = useMemo(() => {
    const childPayload = bringingChildren ? children : [];
    return countGuestsTowardCapacity(formik.values.adults, childPayload);
  }, [bringingChildren, children, formik.values.adults]);

  /** True when this Basic slot cannot fit the package minimum (e.g. only 2 left, min is 3) */
  const slotTooFullForPackage =
    initialPackage === 'basic' &&
    remainingSpots !== null &&
    remainingSpots < BASIC_MIN_ADULTS;

  /** True when the guest party exceeds remaining capacity */
  const partyExceedsCapacity =
    (initialPackage === 'basic' || joiningSharedSlot) &&
    remainingSpots !== null &&
    partyCapacityCount > remainingSpots;

  const cannotBookThisSlot =
    (slotTooFullForPackage && basicLeftoverSpots === 0) ||
    (initialPackage === 'basic' && basicLeftoverSpots > 0) ||
    partyExceedsCapacity;

  // Keep adult count within joining capacity / effective minimum
  useEffect(() => {
    if (!joiningSharedSlot || remainingSpots === null) return;
    const maxAdults = Math.max(minAdults, remainingSpots);
    if (formik.values.adults > maxAdults) {
      formik.setFieldValue('adults', maxAdults);
    } else if (formik.values.adults < minAdults) {
      formik.setFieldValue('adults', minAdults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only clamp when capacity/min changes
  }, [joiningSharedSlot, remainingSpots, minAdults]);

  const priceSummary = useMemo(() => {
    const childPayload = bringingChildren ? children : [];
    return calculateBookingTotal({
      adults: formik.values.adults,
      children: childPayload,
      dishPriceEur: unitPrice,
    });
  }, [bringingChildren, children, formik.values.adults, unitPrice]);

  function openWhatsApp(payload: Record<string, unknown>) {
    const whatsappPhone = '212772527475';
    const childrenList = Array.isArray(payload.children)
      ? (payload.children as ChildGuest[]).map((c) => `${c.age}y`).join(', ') || 'None'
      : 'None';

    const lines = [
      '🍽️ *New Booking Request*',
      '',
      `👤 *Name:* ${payload.fullName}`,
      `📞 *Phone:* ${payload.phone}`,
      `🌍 *Country:* ${payload.country}`,
      `📧 *Email:* ${payload.email}`,
      '',
      `📦 *Package:* ${packageLabel(payload.packageType as PackageType)}`,
    ];

    if (payload.slotDate) {
      lines.push(
        `📅 *Preferred date:* ${payload.slotDate} · ${payload.slotPeriod}`,
        payload.dish ? `🍲 *Dish:* ${payload.dish}${
          payload.dishPrice != null && (payload.packageType as PackageType) === 'basic'
            ? ` (${payload.dishPrice} EUR/guest)`
            : ''
        }` : '',
        `📍 *Location:* ${payload.pickup}`,
        `👥 *Adults:* ${payload.adults}`,
        `👶 *Children:* ${childrenList}`,
        payload.totalPrice != null ? `💶 *Total:* ${payload.totalPrice} EUR` : ''
      );
    }

    const dietaryNotes =
      (payload.dietaryNotes as string) ||
      (payload.allergies as string) ||
      (payload.dietaryPreference && payload.dietaryPreference !== 'none'
        ? String(payload.dietaryPreference)
        : '') ||
      'None';

    lines.push(
      `🥗 *Dietary notes / allergies:* ${dietaryNotes}`,
      '',
      'Looking forward to cooking with you! 🇲🇦'
    );

    const whatsappMessage = lines.filter(Boolean).join('\n');
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;
      const newWindow = window.open(whatsappUrl, '_blank');
      if (!newWindow || newWindow.closed) {
        window.location.href = whatsappUrl;
      }
    }, 1200);
  }

  const resetAll = () => {
    setSubmitted(false);
    setSubmitError('');
    setDishStepError('');
    setSelectedSlot(null);
    setBringingChildren(false);
    setChildren([]);
    setStep(calendarFlow ? 'calendar' : 'form');
    formik.resetForm({
      values: {
        fullName: '',
        phone: '',
        country: '',
        email: '',
        packageType: initialPackage,
        dietaryPreference: 'none',
        allergies: '',
        dietaryNotes: '',
        adults: minAdultsForPackage(initialPackage),
        dishId: '',
        preferredDate: '',
        preferredPeriod: 'morning',
      },
    });
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-green-200">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <FiCheck className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">{t.booking.success}</h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.booking.successMessage}</p>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
              <p className="text-sm text-green-800 font-semibold mb-2">✓ Your booking details have been saved</p>
              <p className="text-sm text-green-700">✓ We&apos;ll reach out within 24 hours</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetAll}
                className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105"
              >
                {t.booking.bookAnother}
              </button>
              <Link
                href="/"
                className="inline-block bg-white text-gray-900 font-bold px-8 py-4 rounded-full border-2 border-gray-200 hover:border-amber-500 transition-all duration-300 shadow-lg hover:scale-105"
              >
                {t.booking.backHome}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (calendarFlow && step === 'calendar') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#FBF7F0] via-white to-amber-50">
        <section className="pt-32 sm:pt-40 pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <WorkshopCalendar
              mode={calendarModeForPackage(initialPackage)}
              selectedSlotId={selectedSlot?.id}
              onSelectSlot={(slot) => {
                setSelectedSlot(slot);
                setSubmitError('');
                setDishStepError('');
                formik.setFieldValue('preferredDate', slot.date);
                formik.setFieldValue('preferredPeriod', slot.period);
                if (initialPackage === 'basic') {
                  const options = getDishesForSlotCategory(slot.menuCategory);
                  if (options.length === 1) {
                    formik.setFieldValue('dishId', options[0].id);
                  } else {
                    formik.setFieldValue('dishId', '');
                  }
                  setStep('dish');
                } else {
                  formik.setFieldValue('dishId', '');
                  setStep('form');
                }
              }}
            />
          </div>
        </section>
      </main>
    );
  }

  if (initialPackage === 'basic' && step === 'dish' && selectedSlot) {
    const slotLabel = `${selectedSlot.weekday} ${selectedSlot.dayNumber} ${selectedSlot.month} · ${selectedSlot.period}`;
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#FBF7F0] via-white to-amber-50">
        <section className="pt-32 sm:pt-40 pb-16 px-4 sm:px-6">
          <DishSelectionStep
            dishes={availableDishes}
            value={formik.values.dishId}
            onChange={(dishId) => {
              formik.setFieldValue('dishId', dishId);
              setDishStepError('');
            }}
            onBack={() => {
              setDishStepError('');
              setStep('calendar');
            }}
            onContinue={() => {
              if (!formik.values.dishId) {
                setDishStepError('Please select one dish for your group.');
                return;
              }
              setDishStepError('');
              setStep('form');
            }}
            slotLabel={slotLabel}
            error={dishStepError}
            remainingSpots={remainingSpots}
            maxGuests={BASIC_MAX_GUESTS}
            minAdults={BASIC_MIN_ADULTS}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="pt-40 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {calendarFlow && (
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 mb-3">
              {initialPackage === 'basic' ? 'Step 3 of 3' : 'Step 2 of 2'}
            </p>
          )}
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {t.booking.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">{t.booking.description}</p>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {calendarFlow && selectedSlot && (
            <div className="mb-6 rounded-3xl border border-amber-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700 mb-2">
                    {t.booking.selectedSlot}
                  </p>
                  <p className="text-lg font-black text-gray-900">
                    {selectedSlot.weekday} {selectedSlot.dayNumber} {selectedSlot.month}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    {selectedSlot.period} · {selectedSlot.startTime} – {selectedSlot.endTime}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {isPrivatePackage(activePackage) ? (
                      joiningSharedSlot ? (
                        <>
                          <span className="font-semibold">Joining shared workshop</span>
                          {' · '}
                          {selectedSlot.startTime} – {selectedSlot.endTime}
                        </>
                      ) : (
                        <>
                          <span className="font-semibold">Exclusive private slot</span>
                          {' · '}
                          {selectedSlot.startTime} – {selectedSlot.endTime}
                        </>
                      )
                    ) : (
                      <>
                        <span className="font-semibold">{t.booking.pickupLabel}:</span>{' '}
                        {selectedSlot.pickup.time} · {selectedSlot.pickup.meetingPoint}
                      </>
                    )}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-2">
                    {packageLabel(activePackage)}
                  </p>
                  {initialPackage === 'basic' && (
                    <p
                      className={`text-sm font-bold mt-3 ${
                        remainingSpots === null
                          ? 'text-gray-500'
                          : basicLeftoverSpots > 0
                            ? 'text-amber-700'
                            : remainingSpots === 0 || slotTooFullForPackage
                              ? 'text-red-600'
                              : remainingSpots <= 3
                                ? 'text-amber-700'
                                : 'text-emerald-700'
                      }`}
                    >
                      {remainingSpots === null
                        ? 'Checking availability…'
                        : basicLeftoverSpots > 0
                          ? `${basicLeftoverSpots} spot${basicLeftoverSpots === 1 ? '' : 's'} left — join via Private`
                          : remainingSpots === 0 || slotTooFullForPackage
                            ? 'Fully booked — please choose another day'
                            : `${remainingSpots} of ${BASIC_MAX_GUESTS} spots available`}
                    </p>
                  )}
                  {isPrivatePackage(initialPackage) && (
                    <p
                      className={`text-sm font-bold mt-3 ${
                        remainingSpots === null
                          ? 'text-gray-500'
                          : joiningSharedSlot
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                      }`}
                    >
                      {remainingSpots === null
                        ? 'Checking availability…'
                        : joiningSharedSlot
                          ? `${bookedGuestCount} already booked · ${remainingSpots} spot${remainingSpots === 1 ? '' : 's'} left`
                          : 'Exclusive private — this slot will be reserved for your group'}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setStep('calendar')}
                  className="text-sm font-bold text-amber-700 underline underline-offset-2 shrink-0"
                >
                  {cannotBookThisSlot ? 'Choose another day' : t.booking.changeSlot}
                </button>
              </div>

              {selectedDish && initialPackage === 'basic' && (
                <div className="flex gap-3 sm:gap-4 items-center border-t border-amber-100 pt-5">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <Image
                      src={selectedDish.image}
                      alt={selectedDish.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">
                      Shared dish
                    </p>
                    <p className="font-bold text-gray-900 leading-snug">{selectedDish.name}</p>
                    <p className="text-sm text-amber-700 font-semibold mt-1">
                      {selectedDish.priceEur} € / person · {selectedDish.priceMad} MAD
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('dish')}
                    className="text-sm font-bold text-amber-700 underline underline-offset-2 shrink-0"
                  >
                    Change dish
                  </button>
                </div>
              )}

              {initialPackage === 'weekly-event' && (
                <div className="border-t border-amber-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">
                    Event
                  </p>
                  <p className="font-bold text-gray-900 leading-snug">{selectedSlot.dish}</p>
                  <p className="text-sm text-violet-700 font-semibold mt-1">80 € / person</p>
                </div>
              )}
            </div>
          )}

          {!calendarFlow && (
            <div className="mb-6 rounded-3xl border border-amber-200 bg-white p-5 sm:p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700 mb-2">
                Package
              </p>
              <p className="text-lg font-black text-gray-900">{packageLabel(activePackage)}</p>
            </div>
          )}

          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-2 border-amber-100"
          >
            {submitError && (
              <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
                {submitError}
              </div>
            )}

            {/* 1. Guests */}
            <div className="mb-6">
              <label htmlFor="adults" className="text-sm font-bold text-gray-700 mb-2 block">
                {t.booking.adults} *
              </label>
              {initialPackage === 'basic' && remainingSpots !== null && (
                <div
                  className={`mb-3 text-sm font-semibold rounded-xl px-3 py-2.5 border ${
                    basicLeftoverSpots > 0
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : remainingSpots === 0 || slotTooFullForPackage || partyExceedsCapacity
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : remainingSpots <= 3
                          ? 'bg-amber-50 border-amber-200 text-amber-800'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}
                >
                  {basicLeftoverSpots > 0 ? (
                    <>
                      <p className="font-bold">
                        {basicLeftoverSpots} spot{basicLeftoverSpots === 1 ? '' : 's'} left
                      </p>
                      <p className="mt-1 font-medium leading-relaxed">
                        Basic needs at least {BASIC_MIN_ADULTS} guests. You can still join this
                        workshop with the Private package.
                      </p>
                      <Link
                        href="/book?package=private"
                        className="mt-2 inline-block text-sm font-bold underline underline-offset-2"
                      >
                        Book / join via Private →
                      </Link>
                    </>
                  ) : remainingSpots === 0 || slotTooFullForPackage ? (
                    <p>This workshop is fully booked. Please choose another day.</p>
                  ) : partyExceedsCapacity ? (
                    <p>
                      Your group needs {partyCapacityCount} spots, but only {remainingSpots}{' '}
                      {remainingSpots === 1 ? 'is' : 'are'} left. Please choose another day, or
                      reduce your group (ages 0–3 do not count).
                    </p>
                  ) : (
                    <p>
                      {remainingSpots} spot{remainingSpots === 1 ? '' : 's'} available on this
                      workshop (max {BASIC_MAX_GUESTS})
                    </p>
                  )}
                  {cannotBookThisSlot && basicLeftoverSpots === 0 && (
                    <button
                      type="button"
                      onClick={() => setStep('calendar')}
                      className="mt-2 text-sm font-bold underline underline-offset-2"
                    >
                      Choose another day →
                    </button>
                  )}
                </div>
              )}
              {joiningSharedSlot && remainingSpots !== null && (
                <div
                  className={`mb-3 text-sm font-semibold rounded-xl px-3 py-2.5 border ${
                    partyExceedsCapacity
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  {partyExceedsCapacity ? (
                    <p>
                      Your group needs {partyCapacityCount} spots, but only {remainingSpots}{' '}
                      {remainingSpots === 1 ? 'is' : 'are'} left. Please reduce your group size.
                    </p>
                  ) : (
                    <>
                      <p className="font-bold">{bookedGuestCount} people already booked</p>
                      <p className="mt-1 font-medium leading-relaxed">
                        You’ll join them · {remainingSpots} spot
                        {remainingSpots === 1 ? '' : 's'} left (max {BASIC_MAX_GUESTS})
                      </p>
                    </>
                  )}
                </div>
              )}
              <input
                type="number"
                id="adults"
                min={minAdults}
                max={
                  (initialPackage === 'basic' || joiningSharedSlot) && remainingSpots !== null
                    ? Math.max(minAdults, remainingSpots)
                    : BASIC_MAX_GUESTS
                }
                {...formik.getFieldProps('adults')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum {minAdults} adult{minAdults === 1 ? '' : 's'} for this package
                {(initialPackage === 'basic' || joiningSharedSlot) && remainingSpots !== null
                  ? ` · ${remainingSpots} spot${remainingSpots === 1 ? '' : 's'} left`
                  : ''}
              </p>
            </div>

            {/* 2. Children */}
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-700 mb-3">{t.booking.childrenQuestion}</p>
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setBringingChildren(true);
                    if (children.length === 0) setChildren([{ age: 5 }]);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${
                    bringingChildren
                      ? 'border-amber-500 bg-amber-50 text-amber-800'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {t.booking.childrenYes}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBringingChildren(false);
                    setChildren([]);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${
                    !bringingChildren
                      ? 'border-amber-500 bg-amber-50 text-amber-800'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {t.booking.childrenNo}
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-3">{t.booking.childrenPricingNote}</p>
              {bringingChildren && (
                <div className="space-y-3">
                  {children.map((child, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <label className="text-sm text-gray-600 w-28 shrink-0">
                        {t.booking.childAge} {index + 1}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={17}
                        value={child.age}
                        onChange={(e) => {
                          const next = [...children];
                          next[index] = { age: Number(e.target.value) };
                          setChildren(next);
                        }}
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                      {children.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setChildren(children.filter((_, i) => i !== index))}
                          className="text-xs font-bold text-red-600"
                        >
                          {t.booking.removeChild}
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setChildren([...children, { age: 5 }])}
                    className="text-sm font-bold text-amber-700 underline underline-offset-2"
                  >
                    {t.booking.addChild}
                  </button>
                </div>
              )}
            </div>

            {/* Preferred date — removed: Private now picks a slot on the calendar first */}

            {/* Location — Private only */}
            {isPrivatePackage(activePackage) && (
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-700 mb-3">Location *</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue('packageType', 'private');
                      if (formik.values.adults < 2) formik.setFieldValue('adults', 2);
                    }}
                    className={`text-left rounded-2xl border-2 p-4 transition-all ${
                      activePackage === 'private'
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <p className="font-bold text-gray-900">At our workshop</p>
                    <p className="text-sm text-gray-600 mt-1">80 € / person · min 2 guests</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue('packageType', 'private-at-location');
                      if (formik.values.adults < 6) formik.setFieldValue('adults', 6);
                    }}
                    className={`text-left rounded-2xl border-2 p-4 transition-all ${
                      activePackage === 'private-at-location'
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <p className="font-bold text-gray-900">At your location</p>
                    <p className="text-sm text-gray-600 mt-1">100 € / person · min 6 guests</p>
                  </button>
                </div>
              </div>
            )}

            {/* 7. Allergies */}
            <div className="mb-8">
              <label htmlFor="dietaryNotes" className="text-sm font-bold text-gray-700 mb-2 block">
                {t.booking.dietaryNotes || 'Allergies or dietary restrictions'}
              </label>
              <textarea
                id="dietaryNotes"
                {...formik.getFieldProps('dietaryNotes')}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 resize-none"
                placeholder={
                  t.booking.dietaryNotesPlaceholder ||
                  'e.g. one guest no meat, nut allergy — notes for the host'
                }
              />
            </div>

            {/* 8. Personal information (last) */}
            <div className="mb-2">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700 mb-4">
                Personal information
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiUser className="w-4 h-4 text-amber-600" />
                {t.booking.fullName} *
              </label>
              <input
                type="text"
                id="fullName"
                {...formik.getFieldProps('fullName')}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  formik.touched.fullName && formik.errors.fullName
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-amber-500'
                }`}
                placeholder={t.booking.fullNamePlaceholder}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm mt-1">⚠ {formik.errors.fullName}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiPhone className="w-4 h-4 text-amber-600" />
                {t.booking.phone} *
              </label>
              <style jsx global>{`
                .phone-input-container .react-tel-input .form-control {
                  width: 100%;
                  height: 50px;
                  border: 2px solid ${formik.touched.phone && formik.errors.phone ? '#ef4444' : '#e5e7eb'};
                  border-radius: 0.75rem;
                  font-size: 1rem;
                  padding-left: 52px;
                }
                .phone-input-container .react-tel-input .form-control:focus {
                  border-color: ${formik.touched.phone && formik.errors.phone ? '#ef4444' : '#f59e0b'};
                  box-shadow: none;
                  outline: none;
                }
                .phone-input-container .react-tel-input .flag-dropdown {
                  border: none;
                  background: transparent;
                  border-radius: 0.75rem 0 0 0.75rem;
                }
                .phone-input-container .react-tel-input .selected-flag {
                  width: 45px;
                  padding: 0 0 0 12px;
                  border-radius: 0.75rem 0 0 0.75rem;
                }
                .phone-input-container .react-tel-input .country-list {
                  border-radius: 0.75rem;
                  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                  border: 1px solid #e5e7eb;
                  max-height: 250px;
                  width: 300px;
                }
              `}</style>
              <div className="phone-input-container">
                <PhoneInput
                  country={'ma'}
                  value={formik.values.phone}
                  onChange={(value: string, countryData: { dialCode?: string }) => {
                    formik.setFieldValue('phone', value);
                    const dialCode = countryData?.dialCode || '212';
                    setPhoneDialCode(dialCode);
                    if (value && value.length > dialCode.length) {
                      const isValid = validatePhoneForCountry(value, dialCode);
                      setPhoneError(isValid ? '' : `Phone number must match the format for +${dialCode}`);
                    } else {
                      setPhoneError('');
                    }
                  }}
                  onBlur={() => {
                    formik.setFieldTouched('phone', true);
                    if (formik.values.phone) {
                      const isValid = validatePhoneForCountry(formik.values.phone, phoneDialCode);
                      setPhoneError(
                        isValid ? '' : `Phone number must match the format for +${phoneDialCode}`
                      );
                    }
                  }}
                  inputProps={{ name: 'phone', required: true, id: 'phone' }}
                  enableSearch
                  searchPlaceholder="Search country..."
                  preferredCountries={['ma', 'fr', 'es', 'de', 'gb', 'us']}
                />
              </div>
              {formik.touched.phone && (formik.errors.phone || phoneError) && (
                <p className="text-red-500 text-sm mt-1">⚠ {formik.errors.phone || phoneError}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="country" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiMapPin className="w-4 h-4 text-amber-600" />
                {t.booking.country} *
              </label>
              <Select
                instanceId="country-select"
                id="country"
                options={countryOptions}
                value={countryOptions.find((option) => option.value === formik.values.country) || null}
                onChange={(option) => formik.setFieldValue('country', option?.value || '')}
                onBlur={() => formik.setFieldTouched('country', true)}
                placeholder={t.booking.countryPlaceholder}
                isClearable
                isSearchable
                classNamePrefix="react-select"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minHeight: '50px',
                    borderRadius: '0.75rem',
                    borderWidth: '2px',
                    borderColor:
                      formik.touched.country && formik.errors.country
                        ? '#ef4444'
                        : state.isFocused
                          ? '#f59e0b'
                          : '#e5e7eb',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor:
                        formik.touched.country && formik.errors.country ? '#ef4444' : '#f59e0b',
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? '#f59e0b'
                      : state.isFocused
                        ? '#fef3c7'
                        : 'white',
                    color: state.isSelected ? 'white' : '#111827',
                  }),
                  indicatorSeparator: () => ({ display: 'none' }),
                }}
              />
              {formik.touched.country && formik.errors.country && (
                <p className="text-red-500 text-sm mt-1">⚠ {formik.errors.country}</p>
              )}
            </div>

            <div className="mb-8">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FiMail className="w-4 h-4 text-amber-600" />
                {t.booking.email} *
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps('email')}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-amber-500'
                }`}
                placeholder={t.booking.emailPlaceholder}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">⚠ {formik.errors.email}</p>
              )}
            </div>

            {/* 9. Price summary */}
            <div className="mb-8 rounded-2xl bg-[#F7F2EA] border border-amber-100 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800 mb-3">
                {t.booking.priceSummary}
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                {selectedDish && (
                  <p className="font-semibold text-gray-900">{selectedDish.name}</p>
                )}
                <div className="flex justify-between">
                  <span>
                    {t.booking.adultsSubtotal} ({formik.values.adults} × {unitPrice} €)
                  </span>
                  <span className="font-semibold">{priceSummary.adultSubtotal} €</span>
                </div>
                {bringingChildren && (
                  <div className="flex justify-between">
                    <span>{t.booking.childrenSubtotal}</span>
                    <span className="font-semibold">{priceSummary.childrenSubtotal} €</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-amber-200 text-base font-black text-gray-900">
                  <span>{t.booking.total}</span>
                  <span>{priceSummary.total} €</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting || cannotBookThisSlot}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-5 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {formik.isSubmitting ? (
                <>
                  <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-lg">{t.booking.submitting}</span>
                </>
              ) : (
                <span className="text-lg">{t.booking.submit}</span>
              )}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">{t.booking.disclaimer}</p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500" />
        </div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}
