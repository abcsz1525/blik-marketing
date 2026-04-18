import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SERVICES } from '@/data/services';
import { ServicesHero } from '@/components/pages/ServicesHero';
import { ServicesList } from '@/components/pages/ServicesList';
import { ContactSection } from '@/components/sections/ContactSection';
import { getLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ServicesHero />
      <ServicesList services={SERVICES} locale={locale as 'ru' | 'en'} />
      <ContactSection />
    </>
  );
}
