'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { LinkButton } from '@/components/ui/Button';

export function AboutIntro() {
  const t = useTranslations('aboutShort');

  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="container-site grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-3 flex flex-col gap-4"
        >
          <div className="eyebrow">
            <span className="inline-block w-8 h-px bg-[var(--color-ink)] opacity-40 mr-3 align-middle" />
            {t('eyebrow')}
          </div>
          <div className="text-[12px] tracking-[0.2em] uppercase text-[var(--color-ink-subtle)] tabular-nums">
            — 2022
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-9 flex flex-col gap-8"
        >
          <h2
            className="display-lg max-w-[28ch] balanced"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('headline')}
          </h2>
          <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink-muted)] max-w-[60ch] balanced">
            {t('lead')}
          </p>
          <div className="mt-4">
            <LinkButton href="/about" variant="outline" size="md" withArrow>
              {t('learnMore')}
            </LinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
