'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ComponentProps } from 'react';
import { Link } from '@/i18n/routing';

type Variant = 'primary' | 'ghost' | 'outline' | 'iridescent';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-medium transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform whitespace-nowrap';

const sizes: Record<Size, string> = {
  sm: 'text-[13px] tracking-[0.04em] px-5 h-10 rounded-full',
  md: 'text-[14px] tracking-[0.04em] px-7 h-12 rounded-full',
  lg: 'text-[15px] tracking-[0.04em] px-8 h-14 rounded-full',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-ink)] text-white hover:bg-black hover:shadow-[0_10px_30px_rgba(26,26,26,0.25)] hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-[var(--color-ink)] hover:bg-[rgba(26,26,26,0.04)]',
  outline:
    'bg-transparent text-[var(--color-ink)] border border-[var(--color-line-strong)] hover:border-[var(--color-ink)] hover:-translate-y-0.5',
  iridescent:
    'iri-edge bg-white/60 backdrop-blur-md text-[var(--color-ink)] hover:shadow-[var(--shadow-iri)] hover:-translate-y-0.5',
};

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
}

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden
    className="transition-transform duration-300 group-hover:translate-x-0.5"
  >
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(
  { variant = 'primary', size = 'md', className, children, withArrow, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && <Arrow />}
      </span>
    </button>
  );
});

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  withArrow,
  ...rest
}: ButtonBaseProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && <Arrow />}
      </span>
    </Link>
  );
}
