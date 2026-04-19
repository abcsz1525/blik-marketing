'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionHeader';

export function AboutStory() {
  const t = useTranslations('about');
  const story = t.raw('story') as string[];

  return (
    <section className="py-28 md:py-40">
      <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <SectionEyebrow index="— 01" label={t('storyTitle')} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8 flex flex-col gap-8"
        >
          {story.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink)] max-w-[64ch] balanced"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
