'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/sections/ContactForm';
import { SectionEyebrow } from '@/components/ui/SectionHeader';

export function ContactSection() {
  const t = useTranslations('contact');
  const tDirect = useTranslations('contact.directContact');

  return (
    <section
      id="contact"
      className="relative py-32 md:py-44 overflow-hidden bg-[var(--color-ink)] text-white"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(216,212,255,0.25), transparent 50%), radial-gradient(ellipse 60% 80% at 90% 90%, rgba(255,216,228,0.18), transparent 60%)',
        }}
        aria-hidden
      />

      <div className="container-site relative grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-10"
        >
          <SectionEyebrow
            index="— 05"
            label={t('eyebrow')}
            className="text-white/60"
          />
          <h2
            className="display-lg balanced max-w-[18ch]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('title')}
          </h2>
          <p className="text-[17px] leading-relaxed text-white/70 max-w-[44ch]">
            {t('subtitle')}
          </p>

          <div className="flex flex-col gap-6 mt-8 pt-8 border-t border-white/15">
            <SectionEyebrow label={tDirect('label')} className="text-white/40" />
            <div className="flex flex-col gap-2">
              <a
                href="mailto:itsdanilina@yandex.ru"
                className="text-[26px] md:text-[30px] tracking-[0.01em] hover:iri-text transition-all"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {tDirect('email')}
              </a>
              <a
                href="tel:+79057728800"
                className="text-[18px] text-white/70 hover:text-white transition-colors"
              >
                {tDirect('phoneHuman')}
              </a>
              <span className="text-[13px] text-white/40 mt-2">
                {tDirect('owner')}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <ContactForm theme="dark" />
        </motion.div>
      </div>
    </section>
  );
}
