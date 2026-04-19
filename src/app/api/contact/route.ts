import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactSchema } from '@/lib/contact-schema';

export async function POST(req: Request) {
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
