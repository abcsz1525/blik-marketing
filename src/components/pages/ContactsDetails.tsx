'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function ContactsDetails() {
  const t = useTranslations('contact.directContact');
  const items = [
    { label: t('emailLabel'),    value: t('email'),      href: `mailto:${t('email')}` },
    { label: t('phoneLabel'),    value: t('phoneHuman'), href: 'tel:+79057728800' },
    { label: t('locationLabel'), value: t('location'),   href: null as string | null },
  ];

  return (
    <section className="py-16 md:py-20 border-t border-[var(--color-line)]">
      <div className="container-site grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {items.map((item, i) => {
          const animationProps = {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-60px' },
            transition: {
              delay: i * 0.08,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            },
            className:
              'group flex flex-col gap-3 p-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] hover:border-[var(--color-line-strong)] bg-white hover:shadow-[var(--shadow-soft)] transition-all',
          };

          const content = (
            <>
              <span className="eyebrow">{item.label}</span>
              <span
                className="text-[24px] md:text-[28px] leading-[1.05]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {item.value}
              </span>
              {item.href && (
                <span className="text-[12px] tracking-[0.2em] uppercase text-[var(--color-ink-subtle)] mt-auto opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  →
                </span>
              )}
            </>
          );

          return item.href ? (
            <motion.a key={item.label} href={item.href} {...animationProps}>
              {content}
            </motion.a>
          ) : (
            <motion.div key={item.label} {...animationProps}>
              {content}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
