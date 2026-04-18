'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { INDUSTRIES } from '@/data/industries';
import type { CaseStudy } from '@/data/cases';

interface Props {
  next: CaseStudy;
  locale: 'ru' | 'en';
}

export function NextCase({ next, locale }: Props) {
  const t = useTranslations('cases');
  const industry = INDUSTRIES.find((i) => i.id === next.industryId);

  return (
    <section className="pb-24 md:pb-32">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={`/portfolio/${next.slug}`} className="group block">
            <div className="flex items-center gap-3 eyebrow mb-8">
              <span className="inline-block w-8 h-px bg-[var(--color-ink)] opacity-40" />
              <span>{t('nextCase')}</span>
            </div>
            <div
              className="relative aspect-[16/6] rounded-[var(--radius-xl)] overflow-hidden transition-transform duration-700 group-hover:scale-[0.995]"
              style={{
                background: `linear-gradient(135deg, ${next.accent}, rgba(255,255,255,0.4) 70%)`,
              }}
            >
              <div className="absolute inset-0 iri-surface opacity-30 mix-blend-overlay group-hover:opacity-60 transition-opacity duration-700" />
              <div className="absolute inset-0 p-12 md:p-20 flex items-center justify-between gap-10">
                <div className="flex flex-col gap-4">
                  <span className="text-[12px] tracking-[0.2em] uppercase text-[var(--color-ink)]/70">
                    {industry?.[locale]} · {next.year}
                  </span>
                  <h3
                    className="text-[48px] md:text-[80px] leading-[0.95] max-w-[16ch] text-[var(--color-ink)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {next.client[locale]}
                  </h3>
                </div>
                <span className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm grid place-items-center text-[20px] shrink-0 transition-transform duration-500 group-hover:scale-110">
                  →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
