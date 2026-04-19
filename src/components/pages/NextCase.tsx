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
          <Link
            href={`/portfolio/${next.slug}`}
            className="group block border-t border-[var(--color-line)] pt-12 md:pt-16"
          >
            <div className="eyebrow text-[var(--color-ink-muted)] mb-6">
              {t('nextCase')} →
            </div>
            <h3 className="display-lg max-w-[20ch] underline-offset-[12px] decoration-1 decoration-transparent group-hover:decoration-[var(--color-ink)] transition-all duration-400">
              {next.client[locale]}
            </h3>
            <div className="text-[13px] text-[var(--color-ink-subtle)] mt-4">
              {industry?.[locale]} · {next.year}
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
