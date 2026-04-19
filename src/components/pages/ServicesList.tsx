'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { LinkButton } from '@/components/ui/Button';
import type { Service } from '@/data/services';

interface Props {
  services: Service[];
  locale: 'ru' | 'en';
}

export function ServicesList({ services, locale }: Props) {
  const t = useTranslations('services.items');
  const tPage = useTranslations('servicesPage');

  return (
    <section className="section-py">
      <div className="container-site flex flex-col gap-0">
        {services.map((s, idx) => (
          <motion.article
            key={s.id}
            id={s.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="scroll-mt-[120px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-16 md:py-24 border-t border-[var(--color-line)] first:border-t-0"
          >
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-[12px] tracking-[0.24em] uppercase text-[var(--color-ink-subtle)] tabular-nums">
                  {s.number}
                </span>
                <span
                  className="w-12 h-12 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${s.color}, transparent 75%)`,
                    border: '1px solid var(--color-line)',
                  }}
                  aria-hidden
                />
              </div>
              <h2
                className="display-md max-w-[16ch] balanced leading-[1.02]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t(`${s.id}.name`)}
              </h2>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-10">
              <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink)] max-w-[56ch] balanced">
                {t(`${s.id}.full`)}
              </p>

              <div>
                <div className="eyebrow mb-5">
                  {locale === 'ru' ? 'Что входит' : "What's included"}
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {(locale === 'ru' ? s.deliverables : s.deliverablesEn).map((d, i) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 text-[15px] text-[var(--color-ink)]"
                    >
                      <span
                        className="text-[11px] tabular-nums text-[var(--color-ink-subtle)] pt-1"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {idx === services.length - 1 && (
                <div>
                  <LinkButton href="/contacts" variant="primary" size="lg" withArrow>
                    {tPage('cta')}
                  </LinkButton>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
