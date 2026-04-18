'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function PortfolioHero() {
  const t = useTranslations('portfolioPage');
  return (
    <section className="relative pt-[160px] pb-20 md:pb-28">
      <div className="iri-surface absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        }}
        aria-hidden
      />
      <div className="container-site relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 max-w-[900px]"
        >
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--color-ink)] opacity-40" />
            <span>{t('eyebrow')}</span>
          </div>
          <h1
            className="display-xl balanced max-w-[20ch]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('title')}
          </h1>
          <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink-muted)] max-w-[56ch] balanced">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
