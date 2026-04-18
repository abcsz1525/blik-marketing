'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/sections/ContactForm';

export function ContactsHero() {
  const t = useTranslations('contact');
  const tDirect = useTranslations('contact.directContact');

  return (
    <section className="relative pt-[140px] md:pt-[160px] pb-24 md:pb-32 overflow-hidden">
      <div className="iri-surface absolute inset-0 opacity-70" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.95) 100%)',
        }}
      />
      <div className="container-site relative grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-10"
        >
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--color-ink)] opacity-40" />
            <span>{t('eyebrow')}</span>
          </div>
          <h1
            className="display-xl balanced max-w-[16ch]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('title')}
          </h1>
          <p className="text-[18px] leading-relaxed text-[var(--color-ink-muted)] max-w-[48ch] balanced">
            {t('subtitle')}
          </p>

          <div className="mt-6 pt-8 border-t border-[var(--color-line)] flex flex-col gap-4">
            <div className="eyebrow">{tDirect('label')}</div>
            <a
              href="mailto:itsdanilina@yandex.ru"
              className="text-[28px] md:text-[32px] leading-none hover:iri-text transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {tDirect('email')}
            </a>
            <a
              href="tel:+79057728800"
              className="text-[17px] text-[var(--color-ink)] hover:opacity-70 transition-opacity"
            >
              {tDirect('phoneHuman')}
            </a>
            <div className="text-[13px] text-[var(--color-ink-muted)]">
              {tDirect('owner')}
            </div>
            <div className="text-[12px] tracking-[0.12em] uppercase text-[var(--color-ink-subtle)] mt-2">
              {t('hours')}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 bg-white/60 backdrop-blur-sm border border-[var(--color-line)] rounded-[var(--radius-xl)] p-8 md:p-12"
        >
          <ContactForm theme="light" />
        </motion.div>
      </div>
    </section>
  );
}
