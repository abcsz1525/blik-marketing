import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { CASES } from '@/data/cases';
import { PortfolioHero } from '@/components/pages/PortfolioHero';
import { PortfolioGrid } from '@/components/pages/PortfolioGrid';
import { ContactSection } from '@/components/sections/ContactSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolioPage' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid cases={CASES} locale={locale as 'ru' | 'en'} />
      <ContactSection />
    </>
  );
}
