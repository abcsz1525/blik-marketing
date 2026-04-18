import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CASES } from '@/data/cases';
import { CaseHero } from '@/components/pages/CaseHero';
import { CaseBody } from '@/components/pages/CaseBody';
import { NextCase } from '@/components/pages/NextCase';
import { ContactSection } from '@/components/sections/ContactSection';

export function generateStaticParams() {
  return CASES.flatMap((c) => [
    { locale: 'ru', slug: c.slug },
    { locale: 'en', slug: c.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const kase = CASES.find((c) => c.slug === slug);
  if (!kase) return {};
  return {
    title: kase.title[locale as 'ru' | 'en'],
    description: kase.summary[locale as 'ru' | 'en'],
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const kase = CASES.find((c) => c.slug === slug);
  if (!kase) notFound();

  const idx = CASES.findIndex((c) => c.slug === slug);
  const next = CASES[(idx + 1) % CASES.length];

  return (
    <>
      <CaseHero kase={kase} locale={locale as 'ru' | 'en'} />
      <CaseBody kase={kase} locale={locale as 'ru' | 'en'} />
      <NextCase next={next} locale={locale as 'ru' | 'en'} />
      <ContactSection />
    </>
  );
}
