import { strict as assert } from 'node:assert';
import { typografru, typografEn, typografMessages } from './typograf.ts';

const NBSP = '\u00A0';

// 1. NBSP после коротких слов
assert.ok(
  typografru('в Москве').includes(`в${NBSP}Москве`),
  '"в Москве" должно получить NBSP после "в"',
);

// 2. Ёлочки для русских кавычек
assert.equal(
  typografru('цитата "Блик"'),
  'цитата «Блик»',
  'Прямые кавычки должны стать «ёлочками»',
);

// 3. Троеточие → символ hellip
assert.equal(typografru('да...'), 'да…', '"..." должно стать "…"');

// 4. Hyphen → em-dash в предложениях
assert.ok(
  typografru('Москва - столица').includes('—'),
  'Отдельный дефис в предложении должен стать em-dash',
);

// 5. Телефон с скобками НЕ должен меняться
assert.equal(
  typografru('+7 (905) 772-88-00'),
  '+7 (905) 772-88-00',
  'Человеческий формат телефона должен быть неприкосновенным',
);

// 6. Бренды и аббревиатуры не трогаем
for (const brand of [
  'D.Holt',
  'P&G',
  'MLN Beauty',
  'PR-кампания',
  'SMM & ORM',
  'Well-Being',
]) {
  assert.equal(
    typografru(brand),
    brand,
    `"${brand}" должен остаться неизменным`,
  );
}

// 7. Числа с "+" (метрики "3+", "40+") не меняются
for (const metric of ['3+', '40+', '17+', '12']) {
  assert.equal(
    typografru(metric),
    metric,
    `"${metric}" должно остаться неизменным`,
  );
}

// 8. Рекурсивный обход: typografMessages работает на вложенных объектах
const nested = {
  hero: {
    title: 'Бренд виден там, где его',
    subtitle: 'в Москве',
    tags: ['с 2022', 'в России'],
  },
  count: 42,
  flag: true,
};
const processed = typografMessages(nested, 'ru') as typeof nested;
assert.equal(
  processed.hero.subtitle,
  `в${NBSP}Москве`,
  'typografMessages должно обрабатывать вложенные строки',
);
assert.equal(
  processed.hero.tags[0],
  `с${NBSP}2022`,
  'typografMessages должно обрабатывать строки в массивах',
);
assert.equal(processed.count, 42, 'Числа не должны меняться');
assert.equal(processed.flag, true, 'Bool не должны меняться');

// 9. EN — кудрявые кавычки
const en = typografEn('it\'s "important" text');
assert.ok(
  en.includes('\u2018') || en.includes('\u2019'),
  'Английский апостроф должен стать curly (\u2018 или \u2019)',
);
assert.ok(
  en.includes('\u201C') && en.includes('\u201D'),
  'Английские двойные кавычки должны стать curly (\u201C\u201D)',
);

console.log('✓ All typograf tests passed (9 groups, 17+ assertions)');
