# БЛИК МАРКЕТИНГ — База знаний проекта

> Этот файл — единый источник правды для всех контекстных окон Claude.
> Обновляется по ходу разработки. Последнее обновление: **2026-04-18**

---

## 1. О проекте

- **Клиент:** Блик Маркетинг — маркетинговое агентство полного цикла (осн. 2022, Москва)
- **Домен:** blik-marketing.ru
- **Контакт:** Данилина Елена, itsdanilina@yandex.ru, +7 905 772 88 00
- **Тип:** Корпоративный сайт с нуля (ребрендинг), 5 страниц
- **Языки:** RU + EN (оба сразу, lang switcher в шапке)
- **Цель:** Генерация B2B-заявок (KPI: 2/мес), имидж премиального агентства
- **Целевое действие:** отправка формы обратной связи
- **ЦА:** ЛПР в компаниях: недвижимость, мода/бьюти, HoReCa, IT/App, FMCG, фарма, авто. Средний чек от 300 000 ₽

---

## 2. Стек технологий

| Слой | Технология |
|------|-----------|
| Фреймворк | Next.js 16 (App Router, Turbopack) |
| Язык | TypeScript (strict) |
| Стили | Tailwind CSS v4 (CSS-first config, `@theme` в globals.css) |
| Анимации | Framer Motion + CSS transitions |
| Hero WebGL | Three.js + @react-three/fiber (иридесцентный шейдер) |
| Скролл | Lenis (smooth scroll) |
| Формы | react-hook-form + Zod |
| i18n | next-intl v4 (файлы: `messages/ru.json`, `messages/en.json`) |
| Роутинг | `src/app/[locale]/...` — locale prefix в URL |
| CMS | Sanity (запланирована, пока хардкод в `src/data/`) |
| Деплой | Vercel (запланирован) |
| Порт dev | `3400` (`next dev --turbo`) |

---

## 3. Структура файлов

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              # Главная
│   │   ├── services/page.tsx     # Услуги
│   │   ├── portfolio/page.tsx    # Портфолио (список)
│   │   ├── portfolio/[slug]/page.tsx  # Кейс (детальная)
│   │   ├── about/page.tsx        # О нас
│   │   ├── contacts/page.tsx     # Контакты
│   │   └── layout.tsx            # Layout с Header/Footer
│   ├── api/contact/route.ts      # API формы обратной связи
│   ├── globals.css               # Дизайн-токены (@theme), компоненты
│   ├── layout.tsx                # Root layout (шрифты, meta)
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── hero/          # Hero-секция: Hero.tsx, IridescentCanvas.tsx, IridescentScene.tsx
│   ├── layout/        # Header, Footer, PageTransition, SmoothScroll
│   ├── pages/         # Компоненты страниц (AboutHero, CaseBody, TeamGrid и т.д.)
│   ├── sections/      # Секции главной (AboutIntro, ServicesGrid, CasesSlider, WhyUs, ContactForm/Section, IndustriesMarquee)
│   └── ui/            # Button, Logo, SectionHeader
├── data/              # Захардкоженные данные (cases.ts, industries.ts, services.ts, team.ts)
├── cms/schemas.ts     # Схемы для будущего Sanity
├── i18n/              # routing.ts, request.ts
├── lib/               # fonts.ts, utils.ts
└── middleware.ts       # next-intl middleware
messages/
├── ru.json
└── en.json
```

---

## 4. Дизайн-система

### Шрифты
- **Заголовки (display):** Cormorant Garamond (заменяет SovMod до получения лицензии)
  - CSS: `var(--font-display)` / класс `font-display`
- **Тело (sans):** Manrope (заменяет Adapta Text до получения лицензии)
  - CSS: `var(--font-sans)` / класс `font-sans`
- **Целевые шрифты клиента:** SovMod (логотип + заголовки), Adapta Text (тело) — ждём веб-лицензии

### Цвета
- Фон: `#FFFFFF` (background), `#F8F7F5` (surface), `#F2F0EC` (surface-2)
- Текст: `#1A1A1A` (ink), `#888888` (ink-muted), `#B8B5B0` (ink-subtle)
- Линии: `rgba(26,26,26, 0.08)` (line), `0.16` (line-strong)
- Иридесцентные: rose `#FFD8E4`, lavender `#D8D4FF`, mint `#CFF5E5`, peach `#FFE3CF`, sky `#CFE8FF`

### Ключевые CSS-классы
- `.container-site` — макс. 1440px, адаптивные паддинги
- `.display-xl / .display-lg / .display-md` — крупная типографика
- `.eyebrow` — мелкий uppercase подзаголовок
- `.iri-surface` — анимированный иридесцентный фон
- `.iri-text` — градиентный текст (насыщенные тона: розовый→лавандовый→мятный→персик)
- `.iri-edge` — иридесцентная рамка (pseudo-element)
- `.reveal` / `.reveal.is-visible` — анимация появления при скролле
- `.marquee-track` — бесконечная прокрутка

### Анимации (принципы)
- Fade + slide-up при появлении секций (0.4–0.6s)
- Hero: WebGL Three.js иридесцентный шейдер
- Hover на карточках: лёгкое свечение
- Плавные переходы между страницами (PageTransition)
- **НЕ использовать:** тяжёлый параллакс, перегруженные анимации, автовоспроизводимое видео

---

## 5. Страницы (по ТЗ)

### 5.1 Главная (`/`)
- [x] Hero: заголовок + подзаголовок + CTA + WebGL-блики
- [x] AboutIntro: краткий блок «О нас»
- [x] ServicesGrid: 4 направления БЛИК
- [x] CasesSlider: слайдер кейсов
- [x] IndustriesMarquee: отрасли бегущей строкой
- [x] WhyUs: цифры / «почему мы»
- [x] ContactSection: форма заявки
- [x] Footer

### 5.2 Услуги (`/services`)
- [x] ServicesHero
- [x] ServicesList: карточки — Стратегия, Брендинг, Коммуникации, Креатив
- [ ] CTA в конце

### 5.3 Портфолио (`/portfolio`)
- [x] PortfolioHero
- [x] PortfolioGrid
- [x] Детальная страница кейса (`/portfolio/[slug]`): CaseHero, CaseBody, NextCase

### 5.4 О нас (`/about`)
- [x] AboutHero
- [x] AboutStory: история, миссия
- [x] AboutPhilosophy: модель БЛИК
- [x] TeamGrid: 12 человек
- [ ] CTA

### 5.5 Контакты (`/contacts`)
- [x] ContactsHero
- [x] ContactsDetails
- [x] ContactForm: Имя, Компания, Email/Телефон, Комментарий
- [ ] Антиспам: honeypot или reCAPTCHA v3

---

## 6. Кейсы (портфолио) — данные из презентации клиента

### 6 направлений услуг:
1. **Исследования и стратегии** — Arlight, сервис «Давай»
2. **Позиционирование** — D.Holt (премиальные шины)
3. **Дизайн и креатив** — Кибердом, MLN Beauty, The Ladies Lounge, Cherni
4. **SMM & ORM** — Oriflame
5. **Пиар и медиа** — Ляйсан Утяшева / Carmen, шоу «Дерзкая готовка»
6. **Антикризисное управление** — Столплит

### Отрасли:
- Недвижимость: А101, Pioneer, Alber Blanc, Миллениум парк, Лазурный берег, Красная стрела, Суперметалл, Family Nest
- Мода и бьюти: Choupette, Oriflame, MLN Beauty, The Ladies Lounge
- HoReCa: My-My, WasabiSushi, Izbushka
- IT & App: Яндекс, Кибердом, Drivee
- FMCG: MARS, P&G, LIQUIDS
- Фармацевтика: Novartis, Orzax, Merck
- Авто: Continental, Gislavеd, Holt
- Ещё более 10 различных отраслей

---

## 7. Известные баги и правки

| # | Статус | Описание | Дата |
|---|--------|----------|------|
| 1 | ✅ Исправлено | `.iri-text` «преломлённый в деталях» — пастельные цвета сливались с белым фоном. Заменены на насыщенные (#D46B8A, #7B6FD4, #4DAA7D, #D48A4D) | 2026-04-16 |
| 2 | ⚠️ Известно | Первая загрузка dev-сервера ~37 сек (Turbopack cold start). Повторные — мгновенно. На продакшне (build) такой проблемы не будет | 2026-04-16 |
| 3 | ✅ Исправлено | Большое белое пространство между тёмным `ContactSection` и `Footer` на главной — убран `mt-40` у `Footer` | 2026-04-18 |
| 4 | ✅ Исправлено | Пустота под карточками на `/contacts` — уменьшили `py` в `ContactsDetails` (`py-32` → `py-20`) | 2026-04-18 |
| 5 | ✅ Исправлено | Большие отступы в `/services` (hero → блок 01, и под блоком 06) — уменьшили `pb` в `ServicesHero`, `py` в `ServicesList` | 2026-04-18 |
| 6 | ⚠️ Важно | 11 из 12 членов команды в `src/data/team.ts` — **фейковые плейсхолдеры**. Реальная только **Елена Данилина**. Перед выкаткой в прод нужен настоящий список от клиента | 2026-04-18 |

---

## 8. Что ещё не сделано / ожидает от клиента

| # | Задача | Ждём от клиента? |
|---|--------|-----------------|
| 1 | Логотип SVG | Да — пришлют позже |
| 2 | Шрифты SovMod + Adapta Text (веб-лицензия) | Да — пока Cormorant Garamond + Manrope |
| 3 | Email для приёма заявок формы | Да — пришлют позже |
| 4 | Ключи Яндекс.Метрика, GA4, reCAPTCHA v3 | Да — аналитики раньше не было |
| 5 | Перевод текстов на EN | Да — ответственность клиента |
| 6 | Имена + роли + фото реальных 12 человек команды | **Да — критично перед продом.** Сейчас 11 плейсхолдеров в `team.ts` |
| 7 | Материалы кейсов: обложки 16:9 ≥1920px, галереи 4–8 визуалов, описания «Задача→Решение→Результат» | Частично есть (презентация), нужна адаптация |
| 8 | Интеграция Sanity CMS | Нет — делаем после утверждения дизайна |
| 9 | Антиспам (honeypot / reCAPTCHA v3) | Нет — реализуем при получении ключей |
| 10 | Продакшн-домен `blik-marketing.ru` → Railway | Совместно с клиентом |

---

## 9. Принятые решения

1. **Design-in-code** вместо Figma — клиент согласовал (2026-04-16)
2. **WebGL/Three.js** для hero-анимации бликов — клиент выбрал максимальный уровень
3. **Next.js + Sanity CMS** — стек выбран под премиальность и удобство клиента
4. **Cormorant Garamond + Manrope** как временные замены SovMod / Adapta Text
5. **Порт 3400** для dev-сервера

---

## 10. Команды

```bash
# Разработка
cd "/Users/andybrandycandy/Desktop/ВАЙБ/blick"
npm run dev          # localhost:3400

# Сборка
npm run build
npm run start

# Проверки
npm run lint
npm run typecheck
```

---

## 11. Контекст для новых окон

При открытии нового контекстного окна Claude:
1. Прочитай этот файл `CLAUDE.md` первым делом
2. Прочитай `ТЗ_Блик_Маркетинг.md` для полного ТЗ
3. Проверь раздел «Известные баги» перед любыми правками
4. Проверь раздел «Что ещё не сделано» для понимания текущего статуса
5. Dev-сервер: `npm run dev` на порту 3400

---

## 12. GitHub & деплой

- **Репозиторий:** https://github.com/abcsz1525/blik-marketing (public)
- **Owner:** `abcsz1525` (email `abcsz1525@gmail.com`)
- **Локальный git config:** `user.name=abcsz1525`, `user.email=abcsz1525@gmail.com` (только для этого репо)
- **Ветка по умолчанию:** `main`
- **Деплой:** Railway — подключен к репозиторию через веб-интерфейс (auto-deploy по push в `main`)
- **Env vars на Railway:**
  - `NEXT_PUBLIC_SITE_URL=https://blik-marketing.ru`
  - `CONTACT_EMAIL=placeholder@blik-marketing.ru` (временно — ждём реальный email)
- **Локальный `.env.local`** (в `.gitignore`) содержит те же переменные.
- **Команды:**
  ```bash
  git status
  git push         # триггерит redeploy на Railway
  gh repo view --web
  ```

---

## 13. Статус на 2026-04-18 (конец дня)

Что сделано сегодня:
- Настроен git, выдан PAT, создан публичный репозиторий на GitHub.
- Инициализирован первый коммит со всей кодовой базой.
- Подключен Railway (auto-deploy из `main`).
- Исправлены вертикальные отступы: главная, услуги (hero и блок 06), контакты.

Следующая сессия — кандидаты для работы:
- Антиспам-honeypot в `ContactForm` (без reCAPTCHA, т.к. ключей нет).
- CTA в конце `/services` и `/about` (помечены `[ ]` в разделе 5).
- Проверка мобильных адаптаций всех страниц.
- После получения реальных данных команды — замена плейсхолдеров в `src/data/team.ts`.
