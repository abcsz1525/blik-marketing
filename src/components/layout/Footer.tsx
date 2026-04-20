'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Logo } from '@/components/ui/Logo';
import { SERVICES } from '@/data/services';

export function Footer() {
  const t = useTranslations('footer');
  const tServices = useTranslations('services.items');
  const tContact = useTranslations('contact.directContact');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--color-line)] bg-[var(--color-background)]">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute inset-0 iri-surface opacity-30" />
      </div>
      <div className="relative container-site pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5 flex flex-col gap-6">
            <Logo />
            <p className="text-[var(--color-ink-muted)] text-[15px] leading-relaxed max-w-[38ch]">
              {t('tagline')}
            </p>
            <div className="mt-4 flex flex-col gap-1 text-[14px]">
              <a
                href="mailto:itsdanilina@yandex.ru"
                className="font-[var(--font-display)] text-[24px] tracking-[0.03em] hover:underline underline-offset-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {tContact('email')}
              </a>
              <a
                href="tel:+79057728800"
                className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
              >
                {tContact('phoneHuman')}
              </a>
              <span className="text-[var(--color-ink-subtle)] mt-2 text-[13px]">
                {tContact('owner')}
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-5">{t('sections.navigate')}</div>
            <ul className="flex flex-col gap-3">
              {(['home', 'services', 'portfolio', 'about', 'contacts'] as const).map(
                (k) => (
                  <li key={k}>
                    <Link
                      href={
                        k === 'home'
                          ? '/'
                          : `/${k === 'contacts' ? 'contacts' : k}`
                      }
                      className="text-[15px] hover:text-[var(--color-ink-muted)] transition-colors"
                    >
                      {tNav(k)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-5">{t('sections.services')}</div>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-[15px] hover:text-[var(--color-ink-muted)] transition-colors flex items-baseline gap-3"
                  >
                    <span className="text-[11px] text-[var(--color-ink-subtle)] tabular-nums">
                      {s.number}
                    </span>
                    <span>{tServices(`${s.id}.name`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] text-[var(--color-ink-muted)]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{t('copyright', { year })}</span>
            <span className="breathing-dot hidden md:inline-block" aria-hidden />
            <span>{t('madeIn')}</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--color-ink)] transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/agreement" className="hover:text-[var(--color-ink)] transition-colors">
              {t('agreement')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
