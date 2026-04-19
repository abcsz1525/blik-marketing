'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LinkButton } from '@/components/ui/Button';

const IridescentCanvas = dynamic(
  () => import('./IridescentCanvas').then((m) => m.IridescentCanvas),
  { ssr: false },
);

const stagger = {
  animate: {
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center">
      <div className="iri-surface absolute inset-0" aria-hidden />
      <IridescentCanvas className="opacity-95" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0) 55%, rgba(255,255,255,0.85) 100%)',
        }}
        aria-hidden
      />

      <div className="container-site relative z-10 pt-[140px] pb-24 md:pt-[180px] md:pb-32 w-full">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-10 max-w-[900px]"
        >
          <motion.div variants={fadeUp} className="eyebrow flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--color-ink)] opacity-40" />
            <span>{t('eyebrow')}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="display-xl max-w-[19ch] balanced"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('title')}{' '}
            <span className="italic">
              <span className="iri-text">{t('titleAccent')}</span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink)] max-w-[56ch] balanced"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
            <LinkButton href="#contact" variant="primary" size="lg" withArrow>
              {t('cta')}
            </LinkButton>
            <LinkButton href="/portfolio" variant="ghost" size="lg">
              {t('ctaSecondary')} →
            </LinkButton>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
