'use client';

import { useTranslations } from 'next-intl';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';

const TIME_TRAP_MS = 2500;

interface FormValues extends ContactInput {
  consent: boolean;
  /** honeypot */
  website: string;
}

interface Props {
  theme?: 'light' | 'dark';
}

export function ContactForm({ theme = 'light' }: Props) {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const renderedAt = useRef<number>(0);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    // zodResolver validates only schema fields (name/company/email/phone/message).
    // consent + website (honeypot) are validated by RHF register rules.
    // Cast is safe: FormValues is a superset of ContactInput.
    resolver: zodResolver(contactSchema) as unknown as Resolver<FormValues>,
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
      website: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Time-trap — silent success if form submitted suspiciously fast.
    // Human can't fill a 4-field form in under ~2.5s.
    const elapsed = Date.now() - renderedAt.current;
    if (elapsed < TIME_TRAP_MS) {
      console.warn('[spam-trap] submitted too fast:', elapsed, 'ms');
      setStatus('success');
      reset();
      return;
    }

    if (data.website) {
      // Honeypot triggered — silently succeed
      setStatus('success');
      reset();
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });
      if (!res.ok) throw new Error('Bad response');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const isDark = theme === 'dark';

  const inputClass = cn(
    'w-full bg-transparent border-b py-3 px-0 text-[15px] focus:outline-none transition-colors duration-300 placeholder:text-current/40',
    isDark
      ? 'border-white/15 focus:border-white text-white placeholder:text-white/40'
      : 'border-[var(--color-line-strong)] focus:border-[var(--color-ink)] text-[var(--color-ink)]',
  );

  const labelClass = cn(
    'text-[11px] tracking-[0.2em] uppercase mb-2 block',
    isDark ? 'text-white/60' : 'text-[var(--color-ink-muted)]',
  );

  const errorClass = 'text-[12px] text-[#FF7A7A] mt-2 block';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative flex flex-col gap-7"
    >
      {/* Honeypot — hidden from screen readers and bots */}
      <div
        className="absolute left-[-9999px] top-[-9999px] w-px h-px overflow-hidden"
        aria-hidden="true"
      >
        <label aria-hidden="true">
          Leave this field empty
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div>
          <label className={labelClass}>{t('name')} *</label>
          <input
            type="text"
            placeholder={t('namePlaceholder')}
            className={inputClass}
            {...register('name')}
          />
          {errors.name && (
            <span className={errorClass}>
              {t(errors.name.message || 'required')}
            </span>
          )}
        </div>
        <div>
          <label className={labelClass}>{t('company')} *</label>
          <input
            type="text"
            placeholder={t('companyPlaceholder')}
            className={inputClass}
            {...register('company')}
          />
          {errors.company && (
            <span className={errorClass}>
              {t(errors.company.message || 'required')}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div>
          <label className={labelClass}>{t('email')} *</label>
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            className={inputClass}
            {...register('email')}
          />
          {errors.email && (
            <span className={errorClass}>
              {t(errors.email.message || 'required')}
            </span>
          )}
        </div>
        <div>
          <label className={labelClass}>{t('phone')}</label>
          <input
            type="tel"
            placeholder={t('phonePlaceholder')}
            className={inputClass}
            {...register('phone')}
          />
          {errors.phone && (
            <span className={errorClass}>
              {t(errors.phone.message || 'invalidPhone')}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>{t('message')}</label>
        <textarea
          rows={4}
          placeholder={t('messagePlaceholder')}
          className={cn(inputClass, 'resize-none')}
          {...register('message')}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className={cn(
            'mt-1 w-4 h-4 rounded-sm border shrink-0 appearance-none cursor-pointer relative',
            isDark
              ? 'border-white/30 checked:bg-white checked:border-white'
              : 'border-[var(--color-line-strong)] checked:bg-[var(--color-ink)] checked:border-[var(--color-ink)]',
          )}
          {...register('consent', { required: true })}
        />
        <span
          className={cn(
            'text-[13px] leading-relaxed',
            isDark ? 'text-white/60' : 'text-[var(--color-ink-muted)]',
            errors.consent && 'text-[#FF7A7A]',
          )}
        >
          {t('consent')}
        </span>
      </label>

      <div className="flex items-center gap-6 mt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'inline-flex items-center gap-3 h-14 px-8 rounded-full font-medium text-[14px] tracking-[0.04em] transition-all duration-400 will-change-transform hover:-translate-y-0.5 disabled:opacity-60',
            isDark
              ? 'bg-white text-[var(--color-ink)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.25)]'
              : 'bg-[var(--color-ink)] text-white hover:shadow-[0_10px_30px_rgba(26,26,26,0.25)]',
          )}
        >
          {status === 'submitting' ? t('submitting') : t('submit')}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              'text-[14px] p-4 rounded-lg border',
              isDark
                ? 'border-white/20 bg-white/5 text-white'
                : 'border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)]',
            )}
          >
            {t('success')}
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[14px] p-4 rounded-lg border border-[#FF7A7A]/30 bg-[#FF7A7A]/10 text-[#FF7A7A]"
          >
            {t('error')}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
