'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, Link, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { LinkButton } from '@/components/ui/Button';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const nav = [
    { href: '/', key: 'home' as const },
    { href: '/services', key: 'services' as const },
    { href: '/portfolio', key: 'portfolio' as const },
    { href: '/about', key: 'about' as const },
    { href: '/contacts', key: 'contacts' as const },
  ];

  const switchLocale = (next: 'ru' | 'en') => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-[var(--color-line)]'
            : 'bg-transparent',
        )}
      >
        <div className="container-site flex items-center justify-between h-[72px] md:h-[88px]">
          <Link href="/" aria-label="Главная">
            <Logo className="transition-opacity hover:opacity-70" />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative text-[13px] tracking-[0.08em] uppercase transition-colors py-2',
                    active
                      ? 'text-[var(--color-ink)]'
                      : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]',
                  )}
                >
                  {t(item.key)}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-px bg-[var(--color-ink)]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-[11px] tracking-[0.14em] uppercase">
              <button
                onClick={() => switchLocale('ru')}
                className={cn(
                  'px-2 py-1 rounded transition-colors',
                  locale === 'ru'
                    ? 'text-[var(--color-ink)]'
                    : 'text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)]',
                )}
                aria-pressed={locale === 'ru'}
              >
                RU
              </button>
              <span className="text-[var(--color-ink-subtle)]">/</span>
              <button
                onClick={() => switchLocale('en')}
                className={cn(
                  'px-2 py-1 rounded transition-colors',
                  locale === 'en'
                    ? 'text-[var(--color-ink)]'
                    : 'text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)]',
                )}
                aria-pressed={locale === 'en'}
              >
                EN
              </button>
            </div>

            <LinkButton
              href="/contacts"
              variant="primary"
              size="sm"
              withArrow
              className="hidden md:inline-flex"
            >
              {t('cta')}
            </LinkButton>

            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-[var(--color-surface)]"
            >
              <span className="flex flex-col gap-1.5 w-5">
                <span
                  className={cn(
                    'h-px bg-[var(--color-ink)] transition-all duration-300',
                    open && 'translate-y-[7px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'h-px bg-[var(--color-ink)] transition-all duration-300',
                    open && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'h-px bg-[var(--color-ink)] transition-all duration-300',
                    open && '-translate-y-[5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden iri-surface"
          >
            <div className="absolute inset-0 backdrop-blur-xl" />
            <div className="relative container-site pt-[96px] pb-12 h-full flex flex-col justify-between">
              <nav className="flex flex-col gap-1">
                {nav.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-5 text-[44px] font-[var(--font-display)] leading-none border-b border-[var(--color-line)]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <button
                    onClick={() => switchLocale('ru')}
                    className={cn(
                      locale === 'ru' ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-muted)]',
                    )}
                  >
                    RU
                  </button>
                  <span>/</span>
                  <button
                    onClick={() => switchLocale('en')}
                    className={cn(
                      locale === 'en' ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-muted)]',
                    )}
                  >
                    EN
                  </button>
                </div>
                <LinkButton
                  href="/contacts"
                  variant="primary"
                  size="md"
                  withArrow
                  onClick={() => setOpen(false)}
                >
                  {t('cta')}
                </LinkButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
