import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactSchema } from '@/lib/contact-schema';
import { checkRateLimit } from '@/lib/rate-limit';

const ALLOWED_ORIGINS = [
  'https://blik-marketing.ru',
  'https://www.blik-marketing.ru',
  'https://blik-marketing-production.up.railway.app',
  'http://localhost:3400',
];

function isAllowedOrigin(origin: string | null): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

export async function POST(req: Request) {
  // 1. Origin-check — blocks curl and cross-origin submissions in prod.
  const origin = req.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    console.warn('[spam-trap] blocked origin:', origin);
    return NextResponse.json(
      { ok: false, error: 'forbidden' },
      { status: 403 },
    );
  }

  // 2. Rate-limit by IP. x-forwarded-for first (Railway's standard),
  //    x-real-ip as fallback for edge cases.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    console.warn('[spam-trap] rate-limited IP:', ip, 'retryAfter:', rate.retryAfter);
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      {
        status: 429,
        headers: rate.retryAfter
          ? { 'Retry-After': String(rate.retryAfter) }
          : undefined,
      },
    );
  }

  try {
    const json = await req.json();
    const data = contactSchema.parse(json);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL ?? 'itsdanilina@yandex.ru';

    const subject = `Заявка с сайта — ${data.name} (${data.company})`;
    const text = [
      `Новая заявка с blik-marketing.ru`,
      ``,
      `Имя: ${data.name}`,
      `Компания: ${data.company}`,
      `Email: ${data.email}`,
      `Телефон: ${data.phone || '—'}`,
      `Сообщение: ${data.message || '—'}`,
      ``,
      `Отправлено: ${new Date().toISOString()}`,
    ].join('\n');

    if (apiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Блик Маркетинг <hello@blik-marketing.ru>',
          to: [to],
          reply_to: data.email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error('Resend error', errText);
        return NextResponse.json(
          { ok: false, error: 'mail_failed' },
          { status: 502 },
        );
      }
    } else {
      // No API key yet — log to server for review.
      console.log('[contact] Заявка получена, но RESEND_API_KEY не задан.');
      console.log(text);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: 'validation', issues: err.issues },
        { status: 400 },
      );
    }
    console.error(err);
    return NextResponse.json({ ok: false, error: 'unknown' }, { status: 500 });
  }
}
