'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FEATURED_CASES } from '@/data/cases';
import { INDUSTRIES } from '@/data/industries';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LinkButton } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function CasesSlider() {
  const t = useTranslations('cases');
  const locale = useLocale() as 'ru' | 'en';
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-case-card]');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-case-card]');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    setActive(Math.round(el.scrollLeft / step));
  };

  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
            index="— 02"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              className="w-12 h-12 rounded-full border border-[var(--color-line-strong)] hover:border-[var(--color-ink)] transition-all hover:-translate-y-0.5 grid place-items-center"
              aria-label="Prev"
            >
              ←
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-12 h-12 rounded-full border border-[var(--color-line-strong)] hover:border-[var(--color-ink)] transition-all hover:-translate-y-0.5 grid place-items-center"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pl-[max(20px,4vw)] pr-[max(20px,4vw)] pb-12 no-scrollbar"
        style={{ scrollPaddingLeft: 'max(20px, 4vw)' }}
      >
        {FEATURED_CASES.map((c, idx) => {
          const industry = INDUSTRIES.find((i) => i.id === c.industryId);
          return (
            <motion.div
              key={c.slug}
              data-case-card
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start flex-shrink-0 w-[85vw] sm:w-[500px] lg:w-[580px]"
            >
              <Link
                href={`/portfolio/${c.slug}`}
                className="group block h-full"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${c.accent}, rgba(255,255,255,0.4) 80%)`,
                  }}
                >
                  <div className="absolute inset-0 iri-surface opacity-40 mix-blend-overlay group-hover:opacity-70 transition-opacity duration-700" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[12px] tracking-[0.2em] uppercase text-[var(--color-ink)]/70">
                      <span>{industry?.[locale]}</span>
                      <span className="tabular-nums">{c.year}</span>
                    </div>
                    <div
                      className="display-md max-w-[20ch] text-[var(--color-ink)] leading-[1.02]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {c.client[locale]}
                    </div>
                  </div>
                  <span className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm grid place-items-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    →
                  </span>
                </div>

                <div className="flex flex-col gap-3 px-1">
                  <h3
                    className="text-[22px] leading-tight max-w-[32ch] group-hover:underline underline-offset-4 decoration-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {c.title[locale]}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-[12px] text-[var(--color-ink-muted)]">
                    {c.metrics.slice(0, 2).map((m) => (
                      <span key={m.value} className="flex items-baseline gap-1.5">
                        <span className="font-medium text-[var(--color-ink)]">
                          {m.value}
                        </span>
                        <span className="max-w-[22ch] leading-tight">
                          {m.label[locale]}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="container-site mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {FEATURED_CASES.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all duration-500',
                  active === i
                    ? 'w-10 bg-[var(--color-ink)]'
                    : 'w-2 bg-[var(--color-line-strong)]',
                )}
              />
            ))}
          </div>
          <LinkButton href="/portfolio" variant="ghost" size="md" withArrow>
            {t('viewAll')}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
