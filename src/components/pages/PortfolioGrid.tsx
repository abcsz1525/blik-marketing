'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { INDUSTRIES } from '@/data/industries';
import { SERVICES } from '@/data/services';
import type { CaseStudy } from '@/data/cases';
import { cn } from '@/lib/utils';
import { TiltCard } from '@/components/ui/TiltCard';

interface Props {
  cases: CaseStudy[];
  locale: 'ru' | 'en';
}

type Filter =
  | { kind: 'all' }
  | { kind: 'industry'; id: string }
  | { kind: 'service'; id: string };

export function PortfolioGrid({ cases, locale }: Props) {
  const t = useTranslations('portfolioPage.filters');
  const tPage = useTranslations('portfolioPage');
  const tEmpty = useTranslations('portfolioPage.empty');
  const tCases = useTranslations('cases');
  const tServices = useTranslations('services.items');
  const [filter, setFilter] = useState<Filter>({ kind: 'all' });

  const filtered = useMemo(() => {
    if (filter.kind === 'all') return cases;
    if (filter.kind === 'industry')
      return cases.filter((c) => c.industryId === filter.id);
    return cases.filter((c) => c.serviceIds.includes(filter.id as never));
  }, [cases, filter]);

  return (
    <section className="pb-24 md:pb-40">
      <div className="container-site">
        <div className="border-y border-[var(--color-line)] py-8 mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8">
            <div className="flex flex-col gap-6 lg:max-w-[80%]">
              <div className="flex flex-col gap-3">
                <span className="eyebrow text-[var(--color-ink-muted)]">{t('service')}</span>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    active={filter.kind === 'all'}
                    onClick={() => setFilter({ kind: 'all' })}
                  >
                    {t('all')}
                  </FilterButton>
                  {SERVICES.map((s) => (
                    <FilterButton
                      key={s.id}
                      active={filter.kind === 'service' && filter.id === s.id}
                      onClick={() => setFilter({ kind: 'service', id: s.id })}
                    >
                      {tServices(`${s.id}.name`)}
                    </FilterButton>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="eyebrow text-[var(--color-ink-muted)]">{t('industry')}</span>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((i) => (
                    <FilterButton
                      key={i.id}
                      active={filter.kind === 'industry' && filter.id === i.id}
                      onClick={() => setFilter({ kind: 'industry', id: i.id })}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mr-2 inline-block"
                        style={{ background: i.accent }}
                      />
                      {i[locale]}
                    </FilterButton>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-[13px] text-[var(--color-ink-muted)] tabular-nums">
              {tPage('count', { count: filtered.length })}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-6 py-20 max-w-[46ch]"
          >
            <h3 className="display-md balanced">{tEmpty('title')}</h3>
            <p className="text-[17px] text-[var(--color-ink-muted)] leading-relaxed balanced">
              {tEmpty('body')}
            </p>
            <a
              href="#contact"
              className="text-[13px] tracking-[0.2em] uppercase underline underline-offset-[6px] decoration-1 hover:decoration-[var(--color-ink)] mt-2"
            >
              {tEmpty('cta')} →
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-10">
            <AnimatePresence mode="popLayout">
              {filtered.map((c, idx) => {
                const industry = INDUSTRIES.find((i) => i.id === c.industryId);
                const service = SERVICES.find((s) => s.id === c.primaryService);
                const oddOffset =
                  filter.kind === 'all' && idx % 2 === 1 ? 'md:mt-24' : '';
                return (
                  <motion.div
                    key={c.slug}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: (idx % 4) * 0.05,
                    }}
                    className={oddOffset}
                  >
                    <TiltCard>
                      <Link
                        href={`/portfolio/${c.slug}`}
                        className="group block"
                      >
                      <div
                        className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden mb-6"
                        style={{
                          background: `linear-gradient(135deg, ${c.accent}, rgba(255,255,255,0.4) 75%)`,
                        }}
                      >
                        <div className="absolute inset-0 iri-surface opacity-30 mix-blend-overlay group-hover:opacity-60 transition-opacity duration-700" />
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[12px] tracking-[0.2em] uppercase text-[var(--color-ink)]/70">
                            <span>{industry?.[locale]}</span>
                            <span className="tabular-nums">{c.year}</span>
                          </div>
                          <div className="flex items-end justify-between gap-4">
                            <h3
                              className="display-md max-w-[16ch] leading-[1.02] text-[var(--color-ink)]"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {c.client[locale]}
                            </h3>
                            <span className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm grid place-items-center shrink-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                          {service && (
                            <>
                              <span>{tServices(`${service.id}.name`)}</span>
                              <span className="divider-dot" />
                            </>
                          )}
                          <span>{tCases('viewCase')} →</span>
                        </div>
                        <h4
                          className="text-[24px] leading-tight max-w-[32ch] group-hover:underline underline-offset-4 decoration-1"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {c.title[locale]}
                        </h4>
                        <div className="flex flex-wrap gap-4 mt-2 text-[13px]">
                          {c.metrics.slice(0, 3).map((m) => (
                            <div key={m.value} className="flex flex-col">
                              <span
                                className="text-[20px] tabular-nums"
                                style={{ fontFamily: 'var(--font-display)' }}
                              >
                                {m.value}
                              </span>
                              <span className="text-[11px] text-[var(--color-ink-muted)] max-w-[22ch] leading-snug">
                                {m.label[locale]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      </Link>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-9 px-4 rounded-full text-[13px] tracking-[0.02em] transition-all duration-300 flex items-center border',
        active
          ? 'border-[var(--color-ink)] text-[var(--color-ink)] bg-[var(--color-ink)]/5'
          : 'border-[var(--color-line)] text-[var(--color-ink-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]',
      )}
    >
      {children}
    </button>
  );
}
