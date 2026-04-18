'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const IridescentCanvas = dynamic(
  () => import('@/components/hero/IridescentCanvas').then((m) => m.IridescentCanvas),
  { ssr: false },
);

export function ServicesHero() {
  const t = useTranslations('servicesPage');
  return (
    <section className="relative min-h-[80svh] flex items-end overflow-hidden pt-[160px] pb-20 md:pb-28">
      <div className="iri-surface absolute inset-0" aria-hidden />
      <IridescentCanvas className="opacity-80" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.9) 100%)',
        }}
        aria-hidden
      />
      <div className="container-site relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 max-w-[880px]"
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
          <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink)] max-w-[58ch] balanced">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
