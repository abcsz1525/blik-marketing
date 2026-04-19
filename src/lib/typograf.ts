import Typograf from 'typograf';

/**
 * RU-правила, на которые мы больше всего полагаемся (активны по умолчанию
 * в typograf 7.7.0):
 *   - common/nbsp/afterShortWord       NBSP после коротких слов (в, с, и, к)
 *   - common/nbsp/beforeShortLastWord  NBSP перед коротким последним словом
 *   - common/nbsp/afterNumber          NBSP между числом и следующим словом
 *   - common/punctuation/quote         «ёлочки»
 *   - common/punctuation/hellip        ... → …
 *   - common/punctuation/apostrophe    типографический апостроф
 *   - ru/dash/main                     hyphen → em-dash в предложениях
 *   - ru/dash/years                    1990-2020 → 1990–2020
 *   - ru/dash/centuries                XIX-XX → XIX–XX
 *   - ru/nbsp/year                     в 2022 → в\u00A02022
 *   - ru/nbsp/dayMonth                 3 марта → 3\u00A0марта
 *   - ru/nbsp/mln                      5 млн → 5\u00A0млн
 *   - ru/nbsp/initials                 А. Пушкин → А.\u00A0Пушкин
 *
 * Полный список всех правил (enabled + disabled by default):
 *   Typograf.getRules()  // static, returns rule metadata
 *
 * Отключено:
 *   - ru/other/phone-number — ломает формат «+7 (905) 772-88-00»,
 *     удаляет скобки и нормализует в свой формат
 *
 * Версия typograf запинена до 7.7.0 в package.json — любой апгрейд
 * требует перепроверки этого списка и getRules().
 */

const tpRu = new Typograf({
  locale: ['ru'],
  disableRule: ['ru/other/phone-number'],
});

const tpEn = new Typograf({
  locale: ['en-US'],
});

export function typografru(text: string): string {
  return tpRu.execute(text);
}

export function typografEn(text: string): string {
  return tpEn.execute(text);
}

export type Messages = Record<string, unknown>;

export function typografMessages<T extends Messages>(
  messages: T,
  locale: 'ru' | 'en',
): T {
  const fn = locale === 'ru' ? typografru : typografEn;
  return walk(messages, fn) as T;
}

function walk(value: unknown, fn: (s: string) => string): unknown {
  if (typeof value === 'string') return fn(value);
  if (Array.isArray(value)) return value.map((v) => walk(v, fn));
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = walk(v, fn);
    }
    return out;
  }
  return value;
}
