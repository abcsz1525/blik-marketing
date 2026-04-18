import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { CASES } from '@/data/cases';

const PAGES = ['', '/services', '/portfolio', '/about', '/contacts'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blik-marketing.ru';
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    for (const p of PAGES) {
      entries.push({
        url: `${base}${prefix}${p}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: p === '' ? 1 : 0.7,
      });
    }
    for (const c of CASES) {
      entries.push({
        url: `${base}${prefix}/portfolio/${c.slug}`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
