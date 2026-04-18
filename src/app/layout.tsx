import type { Metadata, Viewport } from 'next';
import { cormorant, manrope } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blik-marketing.ru',
  ),
  title: {
    default: 'Блик Маркетинг — премиальное маркетинговое агентство',
    template: '%s — Блик Маркетинг',
  },
  description:
    'Маркетинговое агентство полного цикла. Стратегия, позиционирование, бренд-дизайн, SMM, PR и антикризисное управление для брендов премиум-сегмента.',
  openGraph: {
    type: 'website',
    siteName: 'Блик Маркетинг',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
