'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { LinkButton } from '@/components/ui/Button';

export function NotFoundBody() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <section className="relative pt-[160px] pb-24 md:pb-32 overflow-hidden min-h-[80svh] flex items-center">
      <div className="iri-surface absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.95) 100%)',
        }}
      />
      <div className="container-site relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 max-w-[900px]"
        >
          <div className="eyebrow">{t('eyebrow')}</div>
          <h1 lang={locale} className="display-lg balanced max-w-[18ch]">
            {t('title')}
          </h1>
          <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink-muted)] max-w-[48ch] balanced">
            {t('subtitle')}
          </p>
          <div className="mt-4">
            <LinkButton href="/" variant="primary" size="lg" withArrow>
              {t('cta')}
            </LinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
