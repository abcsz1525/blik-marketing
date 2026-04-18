'use client';

import { useLocale, useTranslations } from 'next-intl';
import { INDUSTRIES } from '@/data/industries';
import { motion } from 'framer-motion';

export function IndustriesMarquee() {
  const t = useTranslations('industries');
  const locale = useLocale() as 'ru' | 'en';

  const clients = INDUSTRIES.flatMap((i) =>
    i.clients.map((c) => ({ name: c, industry: i[locale], accent: i.accent })),
  );
  const doubled = [...clients, ...clients];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-y border-[var(--color-line)]">
      <div className="container-site mb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--color-ink)] opacity-40" />
            <span>— 03 {t('eyebrow')}</span>
          </div>
          <p className="text-[15px] text-[var(--color-ink-muted)] max-w-[52ch]">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>

      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0, #000 10%, #000 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0, #000 10%, #000 90%, transparent 100%)',
        }}
      >
        <div className="marquee-track items-center py-4">
          {doubled.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex items-center gap-4 pr-12 shrink-0"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: c.accent }}
              />
              <span
                className="text-[28px] md:text-[40px] tracking-[0.02em] whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-site mt-8 flex items-center justify-end">
        <span className="text-[13px] text-[var(--color-ink-muted)] italic">
          {t('andMore')}
        </span>
      </div>
    </section>
  );
}
