'use client';

import Link from 'next/link';
import { FiClock, FiMapPin, FiUsers, FiStar } from 'react-icons/fi';

const highlights = [
  { icon: FiClock, label: 'Half-day', detail: 'About 4–5 hours' },
  { icon: FiMapPin, label: '15 min drive', detail: 'From Taghazout Mosque' },
  { icon: FiUsers, label: 'Small groups', detail: 'Intimate village kitchen' },
  { icon: FiStar, label: '5.0 rated', detail: 'Loved by 500+ guests' },
];

const dayFlow = [
  { n: '01', title: 'Pickup', text: 'Meet at Taghazout Mosque — we drive you into the hills.' },
  { n: '02', title: 'Village welcome', text: 'Tea, house tour, and the story of a 300-year-old Amazigh home.' },
  { n: '03', title: 'Cook together', text: 'Hands-on cooking, clay oven bread, amlou, and your chosen dish.' },
  { n: '04', title: 'Feast & view', text: 'Share the meal with mountain views — then ride back to the coast.' },
];

export default function HighlightsStrip() {
  return (
    <section className="border-y border-white/10 bg-ink py-12 sm:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 sm:grid-cols-4 sm:gap-8 lg:px-12">
        {highlights.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="text-center" data-fade>
            <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-primary/35 bg-primary/10">
              <Icon className="h-4 w-4 text-primary-light" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="mt-1 text-xs text-white/45">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DayFlowSection() {
  return (
    <section className="bg-surface py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-fade>
          <p className="section-eyebrow">Your day</p>
          <h2 className="section-title">From the coast to the kitchen</h2>
          <p className="section-lead mx-auto mt-5 max-w-lg">
            A simple rhythm — pickup, cook, feast, return — so you can focus on the experience.
          </p>
        </div>

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {dayFlow.map((step) => (
            <li key={step.n} className="border-t-2 border-primary/25 pt-6" data-fade>
              <span className="mb-3 block font-display text-sm text-primary">{step.n}</span>
              <h3 className="mb-2 text-base font-medium text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function MeetRababTeaser() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 0% 50%, color-mix(in srgb, var(--color-primary) 14%, transparent), transparent 70%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="relative aspect-[4/5] overflow-hidden bg-line" data-fade>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/our-story/meet-the-chef/rabab.webp"
            alt="Chef Rabab — Taghazout cooking class host in the Atlas Mountains"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 h-1 w-24 bg-primary" />
        </div>

        <div data-fade>
          <p className="section-eyebrow">Meet the chef</p>
          <h2 className="section-title">Cook with Rabab in her village home</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Step into a 300-year-old Amazigh kitchen above Taghazout. Rabab shares family recipes,
            stories, and the quiet rhythm of village life — bread from the clay oven, mint tea, and
            a feast with a view.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/ourstory/meet-the-chef" className="btn-primary">
              Our story
            </Link>
            <Link href="/book" className="btn-outline">
              Book a class
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCtaBand() {
  return (
    <section
      className="cta-band relative overflow-hidden py-20 sm:py-24"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="cta-band__glow cta-band__glow--a" aria-hidden="true" />
      <div className="cta-band__glow cta-band__glow--b" aria-hidden="true" />
      <div className="cta-band__sheen" aria-hidden="true" />

      <div className="relative z-[1] mx-auto max-w-2xl px-5 text-center sm:px-8" data-fade>
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
          Ready when you are
        </p>
        <h2 className="font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your Atlas Mountains cooking day starts here
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/85">
          Pickup from Taghazout, hands-on cooking, clay oven bread, and a shared feast — book your
          spot today.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/book"
            className="inline-flex w-full items-center justify-center bg-white px-8 py-3.5 text-sm font-medium tracking-[0.02em] text-ink transition hover:bg-paper sm:w-auto"
          >
            Book now
          </Link>
          <Link
            href="/packages"
            className="inline-flex w-full items-center justify-center border border-white/40 px-8 py-3.5 text-sm font-medium tracking-[0.02em] text-white transition hover:bg-white/10 sm:w-auto"
          >
            Compare packages
          </Link>
        </div>
      </div>
    </section>
  );
}
