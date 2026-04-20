'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SERVICES } from '@/data/services';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Link } from '@/i18n/routing';
import { LinkButton } from '@/components/ui/Button';

export function ServicesGrid() {
  const t = useTranslations('services');
  const tItems = useTranslations('services.items');

  return (
    <section className="relative section-py bg-[var(--color-surface)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.35] iri-surface pointer-events-none" />
      <div className="container-site relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} index="— 01" />
          <div className="lg:pb-2">
            <LinkButton href="/services" variant="outline" size="md" withArrow>
              {t('viewAll')}
            </LinkButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)]">
          {SERVICES.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-[var(--color-background)] hover:bg-white transition-colors"
            >
              <Link
                href={`/services#${s.slug}`}
                className="relative flex flex-col gap-6 p-8 md:p-10 h-full min-h-[320px]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[12px] tracking-[0.24em] uppercase text-[var(--color-ink-subtle)] tabular-nums"
                  >
                    {s.number}
                  </span>
                  <span
                    className="w-10 h-10 rounded-full border border-[var(--color-line)] grid place-items-center transition-all duration-500 group-hover:border-[var(--color-ink)] group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle, ${s.color}, transparent 70%)`,
                    }}
                    aria-hidden
                  />
                </div>

                <h3
                  className="display-md mt-auto max-w-[14ch] balanced leading-[1.02] break-words"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {tItems(`${s.id}.name`)}
                </h3>

                <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)] max-w-[32ch]">
                  {tItems(`${s.id}.short`)}
                </p>

                <span className="mt-2 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--color-ink)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
