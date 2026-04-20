'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const SECTION_KEYS = [
  'operator',
  'purposes',
  'lawful',
  'categories',
  'retention',
  'rights',
  'security',
] as const;

export function PrivacyBody() {
  const t = useTranslations('privacyPage');

  return (
    <>
      {/*
        Last-updated date is a static string in messages/*.json
        (privacyPage.lastUpdated). Update manually when policy content changes.
        TODO: Add legal entity details (INN, OGRN, legal address) before
              production launch.
      */}
      <section className="relative pt-[160px] pb-20 md:pb-28 overflow-hidden">
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
            <h1 className="display-xl balanced max-w-[20ch]">{t('title')}</h1>
            <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink)] max-w-[58ch] balanced">
              {t('subtitle')}
            </p>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[var(--color-ink-subtle)]">
              {t('lastUpdated')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-site">
          <div className="flex flex-col gap-14 max-w-[68ch]">
            {SECTION_KEYS.map((key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3"
              >
                <h3 className="display-md max-w-[24ch]">
                  {t(`sections.${key}.title`)}
                </h3>
                <p className="text-[17px] leading-relaxed text-[var(--color-ink)] max-w-[64ch]">
                  {t(`sections.${key}.body`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
