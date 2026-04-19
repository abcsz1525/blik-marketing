'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionEyebrowProps {
  index?: string;
  label?: React.ReactNode;
  className?: string;
}

export function SectionEyebrow({ index, label, className }: SectionEyebrowProps) {
  if (!index && !label) return null;
  return (
    <div className={cn('flex items-center gap-3 eyebrow', className)}>
      {index && <span className="text-[var(--color-ink-subtle)]">{index}</span>}
      {index && label && <span className="divider-dot" />}
      {label && <span>{label}</span>}
    </div>
  );
}

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  index?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  index,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col gap-6',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      <SectionEyebrow index={index} label={eyebrow} />
      <h2 className="display-lg balanced max-w-[20ch]">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            'text-[var(--color-ink-muted)] text-[17px] leading-relaxed balanced max-w-[54ch]',
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
