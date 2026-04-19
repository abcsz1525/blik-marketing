'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { TEAM } from '@/data/team';
import { SectionHeader } from '@/components/ui/SectionHeader';

const ACCENTS = [
  '#FFD8E4',
  '#D8D4FF',
  '#CFF5E5',
  '#FFE3CF',
  '#CFE8FF',
  '#E8D8FF',
  '#F5E8D8',
  '#FFD4D4',
  '#D8F0FF',
  '#FFE8F0',
  '#E8FFE0',
  '#FFF0D8',
];

interface Props {
  locale: 'ru' | 'en';
}

export function TeamGrid({ locale }: Props) {
  const t = useTranslations('about');
  const tRole = useTranslations('team.role');

  return (
    <section className="py-28 md:py-40">
      <div className="container-site">
        <SectionHeader
          index="— 03"
          eyebrow={t('teamTitle')}
          title={t('teamSubtitle')}
          className="mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {TEAM.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: (idx % 8) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <div
                className="relative aspect-[3/4] rounded-[var(--radius-md)] overflow-hidden mb-5 transition-transform duration-500 group-hover:scale-[1.01]"
                style={{
                  background: `linear-gradient(160deg, ${ACCENTS[idx % ACCENTS.length]}, rgba(255,255,255,0.6))`,
                }}
              >
                <div className="absolute inset-0 iri-surface opacity-30 mix-blend-overlay group-hover:opacity-60 transition-opacity duration-700" />
                <div className="absolute inset-0 grid place-items-center">
                  <span
                    className="text-[64px] md:text-[80px] text-[var(--color-ink)]/30 select-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {m.name[locale].charAt(0)}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] tracking-[0.18em] uppercase text-[var(--color-ink)]/50 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3
                  className="text-[20px] leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {m.name[locale]}
                </h3>
                <p className="text-[12px] tracking-[0.04em] text-[var(--color-ink-muted)] leading-snug">
                  {tRole(m.roleKey)}
                </p>
                {m.focus && (
                  <p className="text-[11px] text-[var(--color-ink-subtle)] mt-1 max-w-[24ch] leading-snug">
                    {m.focus[locale]}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
