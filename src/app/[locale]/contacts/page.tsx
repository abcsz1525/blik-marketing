import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactsHero } from '@/components/pages/ContactsHero';
import { ContactsDetails } from '@/components/pages/ContactsDetails';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ContactsHero />
      <ContactsDetails />
    </>
  );
}
