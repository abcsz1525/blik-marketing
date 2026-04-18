'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FormValues {
  name: string;
  company: string;
  contact: string;
  message: string;
  consent: boolean;
  /** honeypot */
  website: string;
}

const CONTACT_REGEX = /(^[^\s@]+@[^\s@]+\.[^\s@]+$)|(^[\d+\-\s()]{7,}$)/;

interface Props {
  theme?: 'light' | 'dark';
}

export function ContactForm({ theme = 'light' }: Props) {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      company: '',
      contact: '',
      message: '',
      consent: false,
      website: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
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
          contact: data.contact,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-7">
      {/* Honeypot */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <label>
          Website
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
            {...register('name', { required: true, minLength: 2 })}
          />
          {errors.name && (
            <span className="text-[12px] text-[#FF7A7A] mt-2 block">{t('required')}</span>
          )}
        </div>
        <div>
          <label className={labelClass}>{t('company')}</label>
          <input
            type="text"
            placeholder={t('companyPlaceholder')}
            className={inputClass}
            {...register('company')}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t('contact')} *</label>
        <input
          type="text"
          placeholder={t('contactPlaceholder')}
          className={inputClass}
          {...register('contact', {
            required: true,
            pattern: CONTACT_REGEX,
          })}
        />
        {errors.contact && (
          <span className="text-[12px] text-[#FF7A7A] mt-2 block">
            {t('invalidContact')}
          </span>
        )}
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
