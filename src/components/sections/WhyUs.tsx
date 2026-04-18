'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const METRICS = [
  { id: 'years', value: 3, suffix: '+' },
  { id: 'cases', value: 40, suffix: '+' },
  { id: 'industries', value: 17, suffix: '+' },
  { id: 'team', value: 12, suffix: '' },
] as const;

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCurrent(value);
      return;
    }
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {current}
      {suffix}
    </span>
  );
}

export function WhyUs() {
  const t = useTranslations('whyUs');
  const points = t.raw('points') as Array<{ title: string; body: string }>;

  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="container-site">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          align="left"
          index="— 04"
          className="mb-20"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-y border-[var(--color-line)] mb-20">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative py-10 md:py-14 px-6 md:px-8 border-r border-[var(--color-line)] last:border-r-0 border-b md:border-b-0"
            >
              <div
                className="display-lg mb-3 tabular-nums"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Counter value={m.value} suffix={m.suffix} />
              </div>
              <div className="text-[13px] tracking-[0.08em] uppercase text-[var(--color-ink-muted)] max-w-[20ch]">
                {t(`metrics.${m.id}`)}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex gap-6"
            >
              <div className="text-[12px] tracking-[0.2em] uppercase text-[var(--color-ink-subtle)] tabular-nums pt-2 min-w-[28px]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex flex-col gap-3">
                <h3
                  className="text-[26px] leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {p.title}
                </h3>
                <p className="text-[16px] leading-relaxed text-[var(--color-ink-muted)] max-w-[42ch] balanced">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
