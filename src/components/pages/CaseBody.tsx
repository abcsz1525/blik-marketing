'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { CaseStudy } from '@/data/cases';

interface Props {
  kase: CaseStudy;
  locale: 'ru' | 'en';
}

export function CaseBody({ kase, locale }: Props) {
  const t = useTranslations('cases');
  return (
    <section className="py-20 md:py-32">
      <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-10"
        >
          <Block label={t('taskLabel')} body={kase.task[locale]} />
          <Block label={t('solutionLabel')} body={kase.solution[locale]} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col gap-8"
        >
          <div className="eyebrow">
            {locale === 'ru' ? 'Что входило в проект' : 'Project deliverables'}
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kase.deliverables[locale].map((d, i) => (
              <li
                key={d}
                className="flex gap-4 p-5 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white hover:border-[var(--color-line-strong)] transition-colors"
              >
                <span
                  className="text-[11px] tabular-nums tracking-[0.2em] text-[var(--color-ink-subtle)] pt-1"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] leading-relaxed text-[var(--color-ink)]">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="container-site mt-24 md:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10"
        >
          <h2 className="display-md">{t('resultsLabel')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-[var(--radius-lg)] overflow-hidden">
            {kase.metrics.map((m, i) => (
              <motion.div
                key={m.value + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-8 md:p-10 bg-white flex flex-col gap-3 min-h-[200px]"
              >
                <div
                  className="display-md leading-[1]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {m.value}
                </div>
                <div className="text-[13px] leading-relaxed text-[var(--color-ink-muted)] mt-auto">
                  {m.label[locale]}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="eyebrow">{label}</div>
      <p className="text-[18px] leading-relaxed text-[var(--color-ink)] balanced">
        {body}
      </p>
    </div>
  );
}
