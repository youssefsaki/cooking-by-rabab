'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiCheck, FiX } from 'react-icons/fi';
import type { MenuDish } from '@/lib/booking/menu';

interface DishSelectionStepProps {
  dishes: MenuDish[];
  value: string;
  onChange: (dishId: string) => void;
  onContinue: () => void;
  onBack: () => void;
  slotLabel?: string;
  error?: string;
}

function shortBlurb(dish: MenuDish): string {
  const text = dish.description.trim();
  if (text.length <= 110) return text;
  return `${text.slice(0, 107).trim()}…`;
}

const DishSelectionStep: React.FC<DishSelectionStepProps> = ({
  dishes,
  value,
  onChange,
  onContinue,
  onBack,
  slotLabel,
  error,
}) => {
  const [detailsDish, setDetailsDish] = useState<MenuDish | null>(null);

  useEffect(() => {
    if (!detailsDish) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetailsDish(null);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [detailsDish]);

  const isTagineMenu = dishes.length > 1 && dishes.every((d) => d.category === 'tagine');

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 mb-3">
          Step 2 of 3
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
          {isTagineMenu ? 'Choose Your Tagine' : 'Confirm Your Dish'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Everyone cooks and eats the same dish. Pick one shared option for your group
          {slotLabel ? ` · ${slotLabel}` : ''}.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 text-sm font-bold text-amber-700 underline underline-offset-2"
        >
          ← Change date / time
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5" role="radiogroup" aria-label="Shared dish">
        {dishes.map((dish) => {
          const selected = value === dish.id;
          return (
            <article
              key={dish.id}
              className={`group rounded-3xl border-2 bg-white overflow-hidden transition-all duration-300 ${
                selected
                  ? 'border-amber-500 ring-2 ring-amber-200 shadow-lg scale-[1.01]'
                  : 'border-gray-100 hover:border-amber-300 hover:shadow-md shadow-sm'
              }`}
            >
              <div className="relative aspect-[16/10] bg-gray-100">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-300 ${
                    selected ? 'bg-amber-900/15' : 'bg-black/0 group-hover:bg-black/5'
                  }`}
                />
                {selected && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-amber-500 text-white text-xs font-bold px-3 py-1.5 shadow-lg animate-[fadeIn_0.25s_ease-out]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
                      <FiCheck className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    Selected
                  </span>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <button
                  type="button"
                  onClick={() => onChange(dish.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-black text-gray-900 leading-snug">{dish.name}</h2>
                      {dish.subtitle && (
                        <p className="text-sm text-amber-800/90 mt-1.5 leading-snug">{dish.subtitle}</p>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xl font-black text-amber-600">{dish.priceEur} €</p>
                      <p className="text-[11px] text-gray-500">{dish.priceMad} MAD</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{shortBlurb(dish)}</p>
                </button>

                <div className="mt-4 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => onChange(dish.id)}
                    aria-pressed={selected}
                    className={`relative w-full overflow-hidden rounded-2xl py-3.5 text-sm font-bold transition-all duration-300 ${
                      selected
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-200/80'
                        : 'bg-gray-900 text-white hover:bg-amber-600 hover:shadow-md'
                    }`}
                  >
                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                      {selected ? (
                        <>
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                            <FiCheck className="w-4 h-4" strokeWidth={3} />
                          </span>
                          Selected for your group
                        </>
                      ) : (
                        'Select this dish'
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDetailsDish(dish)}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 hover:border-amber-300 hover:text-amber-800 transition-colors"
                  >
                    View details
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {error && (
        <p className="text-center text-red-600 text-sm font-medium mt-5">⚠ {error}</p>
      )}

      <div
        className={`sticky bottom-4 z-20 mt-8 transition-all duration-300 ${
          value ? 'opacity-100 translate-y-0' : 'opacity-90'
        }`}
      >
        <div className="mx-auto max-w-xl rounded-2xl border border-amber-100 bg-white/95 backdrop-blur-md shadow-xl shadow-amber-900/10 p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3.5 rounded-xl border-2 border-gray-200 font-bold text-gray-700 hover:border-amber-300 transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={!value}
            className={`flex-1 rounded-xl py-3.5 font-bold transition-all duration-300 ${
              value
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200 hover:from-amber-600 hover:to-orange-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {value ? 'Continue to booking details →' : 'Select a dish to continue'}
          </button>
        </div>
      </div>

      {detailsDish && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-details-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close details"
            onClick={() => setDetailsDish(null)}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl">
            <div className="relative aspect-[16/9] bg-gray-100">
              <Image
                src={detailsDish.image}
                alt={detailsDish.name}
                fill
                className="object-cover"
                sizes="672px"
              />
              <button
                type="button"
                onClick={() => setDetailsDish(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 text-gray-800 flex items-center justify-center shadow"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="dish-details-title" className="text-2xl font-black text-gray-900 leading-snug">
                    {detailsDish.name}
                  </h2>
                  {detailsDish.subtitle && (
                    <p className="text-sm text-amber-800 mt-2">{detailsDish.subtitle}</p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-2xl font-black text-amber-600">{detailsDish.priceEur} €</p>
                  <p className="text-xs text-gray-500">{detailsDish.priceMad} MAD / person</p>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                {detailsDish.description}
              </p>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500 mb-2">
                  Ingredients
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {detailsDish.ingredients.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-amber-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500 mb-2">
                  What’s included with every booking
                </p>
                <ul className="space-y-1.5">
                  {detailsDish.inclusions.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-amber-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onChange(detailsDish.id);
                    setDetailsDish(null);
                  }}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3.5 shadow-md shadow-amber-200 transition-all inline-flex items-center justify-center gap-2"
                >
                  <FiCheck className="w-4 h-4" strokeWidth={3} />
                  Select this dish
                </button>
                <button
                  type="button"
                  onClick={() => setDetailsDish(null)}
                  className="flex-1 rounded-2xl border-2 border-gray-200 font-bold text-gray-700 py-3.5 hover:border-amber-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DishSelectionStep;
