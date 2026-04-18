import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/hero/Hero';
import { AboutIntro } from '@/components/sections/AboutIntro';

// Below-the-fold sections are split into separate chunks
// so the initial bundle stays lean (faster TTI / LCP).
const ServicesGrid = dynamic(() =>
  import('@/components/sections/ServicesGrid').then((m) => m.ServicesGrid),
);
const CasesSlider = dynamic(() =>
  import('@/components/sections/CasesSlider').then((m) => m.CasesSlider),
);
const IndustriesMarquee = dynamic(() =>
  import('@/components/sections/IndustriesMarquee').then((m) => m.IndustriesMarquee),
);
const WhyUs = dynamic(() =>
  import('@/components/sections/WhyUs').then((m) => m.WhyUs),
);
const ContactSection = dynamic(() =>
  import('@/components/sections/ContactSection').then((m) => m.ContactSection),
);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutIntro />
      <ServicesGrid />
      <CasesSlider />
      <IndustriesMarquee />
      <WhyUs />
      <ContactSection />
    </>
  );
}
