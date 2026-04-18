'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import type { CaseStudy } from '@/data/cases';
import { INDUSTRIES } from '@/data/industries';
import { SERVICES } from '@/data/services';

interface Props {
  kase: CaseStudy;
  locale: 'ru' | 'en';
}

export function CaseHero({ kase, locale }: Props) {
  const t = useTranslations('cases');
  const tServices = useTranslations('services.items');
  const tCommon = useTranslations('common');
  const industry = INDUSTRIES.find((i) => i.id === kase.industryId);
  const service = SERVICES.find((s) => s.id === kase.primaryService);

  return (
    <section className="relative pt-[140px] md:pt-[160px] pb-16 md:pb-20 overflow-hidden">
      <div className="iri-surface absolute inset-0 opacity-50" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,1) 100%)',
        }}
      />
      <div className="container-site relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            ← {tCommon('allCases')}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <div className="eyebrow text-[var(--color-ink-muted)]">
              {kase.client[locale]}
            </div>
            <h1
              className="display-xl max-w-[22ch] balanced leading-[1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {kase.title[locale]}
            </h1>
            <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink-muted)] max-w-[58ch] balanced">
              {kase.summary[locale]}
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col gap-5 pt-6 border-t border-[var(--color-line)]"
          >
            {industry && (
              <Meta
                label={t('industryLabel')}
                value={industry[locale]}
              />
            )}
            {service && (
              <Meta
                label={t('serviceLabel')}
                value={tServices(`${service.id}.name`)}
              />
            )}
            <Meta label={t('yearLabel')} value={String(kase.year)} />
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 relative aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${kase.accent}, rgba(255,255,255,0.4) 70%)`,
          }}
        >
          <div className="absolute inset-0 iri-surface opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[12px] tracking-[0.22em] uppercase text-[var(--color-ink)]/60">
              <span>{industry?.[locale]}</span>
              <span className="tabular-nums">{kase.year}</span>
            </div>
            <div
              className="text-[8vw] md:text-[120px] leading-[0.9] text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {kase.client[locale]}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-ink-subtle)]">
        {label}
      </dt>
      <dd className="text-[17px] text-[var(--color-ink)]">{value}</dd>
    </div>
  );
}
