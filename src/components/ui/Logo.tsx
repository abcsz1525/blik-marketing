import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  accent?: boolean;
  variant?: 'full' | 'mark';
}

export function Logo({ className, accent = false, variant = 'full' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-2 select-none',
        className,
      )}
      aria-label="Блик Маркетинг"
    >
      <span
        className={cn(
          'font-[var(--font-display)] text-[22px] leading-none tracking-[0.08em] uppercase',
          accent && 'iri-text',
        )}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        БЛИК
      </span>
      {variant === 'full' && (
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-ink-muted)]">
          marketing
        </span>
      )}
    </span>
  );
}
