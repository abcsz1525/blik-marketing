import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/pages/AboutHero';
import { AboutStory } from '@/components/pages/AboutStory';
import { AboutPhilosophy } from '@/components/pages/AboutPhilosophy';
import { IndustriesMarquee } from '@/components/sections/IndustriesMarquee';
import { ContactSection } from '@/components/sections/ContactSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title'), description: t('lead') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutPhilosophy />
      <IndustriesMarquee />
      <ContactSection />
    </>
  );
}
