'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const IridescentCanvas = dynamic(
  () => import('@/components/hero/IridescentCanvas').then((m) => m.IridescentCanvas),
  { ssr: false },
);

export function AboutPhilosophy() {
  const t = useTranslations('about');

  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-[var(--color-surface)]">
      <div className="absolute inset-0 opacity-50">
        <IridescentCanvas />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(248,247,245,0.9) 0%, rgba(248,247,245,0.4) 40%, rgba(248,247,245,0.9) 100%)',
        }}
      />
      <div className="container-site relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10 max-w-[900px] mx-auto text-center items-center"
        >
          <div className="eyebrow">— 02 {t('philosophyTitle')}</div>

          <h2
            className="display-lg balanced max-w-[18ch]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="iri-text">{t('philosophyLead')}</span>
          </h2>
          <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink)] max-w-[60ch] balanced">
            {t('philosophy')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
