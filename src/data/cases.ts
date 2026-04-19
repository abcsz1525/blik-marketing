import type { ServiceId } from './services';

export interface CaseMetric {
  value: string;
  label: { ru: string; en: string };
}

export interface CaseStudy {
  slug: string;
  year: number;
  client: { ru: string; en: string };
  title: { ru: string; en: string };
  industryId: string;
  serviceIds: ServiceId[];
  primaryService: ServiceId;
  summary: { ru: string; en: string };
  task: { ru: string; en: string };
  solution: { ru: string; en: string };
  deliverables: { ru: string[]; en: string[] };
  metrics: CaseMetric[];
  tags?: string[];
  accent: string;
  featured?: boolean;
}

export const CASES: CaseStudy[] = [
  {
    slug: 'arlight',
    year: 2025,
    client: { ru: 'Arlight', en: 'Arlight' },
    title: {
      ru: 'Комплексное исследование лидера рынка светотехники',
      en: 'Comprehensive research for a lighting market leader',
    },
    industryId: 'lighting',
    serviceIds: ['research'],
    primaryService: 'research',
    summary: {
      ru: 'Изучили текущую ситуацию и потенциальный рынок Индии, проанализировали подходы к продвижению конкурентов и поняли, кто именно относится к целевой аудитории.',
      en: 'Audited the current state and India market opportunity, analysed competitor approaches and defined who really belongs to the target audience.',
    },
    task: {
      ru: 'Понять, на каких сегментах Arlight может расти быстрее конкурентов, и как перестроить коммуникацию, чтобы не терять премиум-заказчиков.',
      en: 'Understand where Arlight can outpace competitors and how to re-tune communications so the premium buyer stays in the funnel.',
    },
    solution: {
      ru: 'Провели анализ статистических рыночных показателей в пяти категориях освещения, оценили присутствие и коммуникации конкурентов, отобрали и провели 30 глубинных интервью с разными сегментами ЦА, построили матрицу позиционирования.',
      en: 'Reviewed market statistics across five lighting categories, mapped competitor presence, ran 30 in-depth interviews with audience segments and built a positioning matrix.',
    },
    deliverables: {
      ru: [
        'Аудит статистических рыночных показателей в 5 категориях',
        'Анализ присутствия и коммуникаций конкурентов',
        'Отбор респондентов и 30 глубинных интервью',
        'Матрица позиционирования и разработка рекомендаций',
      ],
      en: [
        'Market statistics audit across 5 categories',
        'Competitor presence and communications analysis',
        'Respondent screening and 30 in-depth interviews',
        'Positioning matrix and strategic recommendations',
      ],
    },
    metrics: [
      { value: '3', label: { ru: 'приоритетных сегмента для роста', en: 'priority growth segments' } },
      { value: '+25%', label: { ru: 'рост сегмента LED-лент', en: 'LED strip segment growth' } },
      { value: '+22%', label: { ru: 'рост сегмента диммеров', en: 'dimmer segment growth' } },
      { value: '+18%', label: { ru: 'рост продаж премиум-ламп в DIY-сетях', en: 'premium lamp sales in DIY retail' } },
    ],
    accent: '#FFE3CF',
    featured: true,
  },
  {
    slug: 'davai',
    year: 2024,
    client: { ru: 'Давай', en: 'Davai' },
    title: {
      ru: 'Стратегия продвижения сервиса российского туризма',
      en: 'Go-to-market strategy for a Russian travel service',
    },
    industryId: 'it-app',
    serviceIds: ['research', 'positioning'],
    primaryService: 'research',
    summary: {
      ru: 'Изучили состояние внутреннего туризма и выстроили стратегию запуска сервиса планирования путешествий, претендовавшего стать заменой Booking.com.',
      en: 'Mapped the state of Russian domestic travel and defined the launch strategy for a booking service positioned as a local Booking.com replacement.',
    },
    task: {
      ru: 'Найти свободную нишу и спроектировать маркетинговую стратегию для сервиса бронирования, выходящего на рынок после ухода международных игроков.',
      en: 'Find the whitespace and design a go-to-market for a booking service launching after international players exited.',
    },
    solution: {
      ru: 'Проанализировали статистические показатели внутреннего туризма и их изменения за год, оценили позиционирование и продвижение туристических онлайн-сервисов, отобрали и провели глубинные интервью с сегментами ЦА, построили медиамикс и партнёрскую программу.',
      en: 'Analysed domestic travel statistics and year-over-year dynamics, reviewed positioning of competitor services, ran in-depth interviews across segments and designed the media mix and partnership model.',
    },
    deliverables: {
      ru: [
        'Анализ статистики внутреннего туризма',
        'Аудит онлайн-сервисов по бронированию',
        'Глубинные интервью с сегментами ЦА',
        'Стратегия продвижения и серия активаций к запуску',
        'Партнёрская программа с агентствами и инфлюенсерами',
      ],
      en: [
        'Domestic travel statistics analysis',
        'Audit of online booking services',
        'In-depth interviews across audience segments',
        'Launch strategy and activations plan',
        'Partnership programme with agencies and influencers',
      ],
    },
    metrics: [
      { value: '40%', label: { ru: 'свободной ниши после ухода зарубежных игроков', en: 'whitespace after international exits' } },
      { value: '60%', label: { ru: 'mobile digital в медиамиксе', en: 'mobile digital in the media mix' } },
      { value: '25–40', label: { ru: 'ядро ЦА: миллениалы', en: 'core audience: millennials' } },
      { value: '20', label: { ru: 'частных отелей в партнёрской программе', en: 'private hotels onboarded' } },
    ],
    accent: '#CFE8FF',
    featured: true,
  },
  {
    slug: 'holt',
    year: 2024,
    client: { ru: 'D.Holt', en: 'D.Holt' },
    title: {
      ru: 'Позиционирование нового бренда премиальных шин',
      en: 'Positioning for a new premium tyre brand',
    },
    industryId: 'auto',
    serviceIds: ['positioning'],
    primaryService: 'positioning',
    summary: {
      ru: 'Изучили актуальный рынок РФ, собрали портрет премиального покупателя и построили платформу позиционирования нового игрока в сегменте шин и аксессуаров.',
      en: 'Studied the Russian market, profiled the premium buyer and built a positioning platform for a new entrant in tyres and accessories.',
    },
    task: {
      ru: 'Создать бренд-платформу для нового игрока на рынке шин, в среде, где премиальность плохо коммуницируется напрямую.',
      en: 'Build a brand platform for a new player in a market where premiumness rarely communicates bluntly.',
    },
    solution: {
      ru: 'Разработали бренд-платформу на архетипе «Искатель приключений»: пирамида бренда, миссия, ценности, атрибуты. Коммуникация запланирована в lifestyle-каналах — путешествия, охота, техника.',
      en: 'Designed a brand platform built on the Explorer archetype: brand pyramid, mission, values, attributes. Communications are planned through lifestyle channels — travel, outdoor, technology.',
    },
    deliverables: {
      ru: [
        'Анализ рынка шин и аксессуаров в РФ',
        'Разработка позиционирования и философии бренда',
        'Анализ конкурентов в премиум-сегменте',
        'Глубинные интервью с разными сегментами ЦА',
        'Подбор каналов и матрица месседжей',
      ],
      en: [
        'Russian tyres and accessories market review',
        'Positioning and brand philosophy',
        'Premium competitor mapping',
        'In-depth interviews across segments',
        'Channel selection and message matrix',
      ],
    },
    metrics: [
      { value: '2.5M', label: { ru: 'целевой аудитории в lifestyle-каналах', en: 'lifestyle audience reached' } },
      { value: '12 → 92', label: { ru: 'рост узнаваемости за 6 месяцев', en: 'awareness growth in 6 months' } },
      { value: 'Drive & Status', label: { ru: 'инсайт ЦА: безопасность как ключ, но драйв важен', en: 'audience insight: safety is key, drive matters' } },
    ],
    accent: '#D8D4FF',
    featured: true,
  },
  {
    slug: 'cyberdom',
    year: 2024,
    client: { ru: 'Кибердом', en: 'Cyberdom' },
    title: {
      ru: 'Бренд сообщества кибербеза с конверсией 15%',
      en: 'Cybersecurity community brand with 15% conversion',
    },
    industryId: 'it-app',
    serviceIds: ['design', 'positioning'],
    primaryService: 'design',
    summary: {
      ru: 'С нуля разработали бренд-платформу и фирменный стиль закрытого клуба топ-менеджеров и владельцев компаний в сфере кибербезопасности.',
      en: 'Built the brand platform and identity from scratch for an invite-only club of top executives in cybersecurity.',
    },
    task: {
      ru: 'Создать премиальный бренд закрытого клуба, который моментально считывается как «свой» для профи киберотрасли.',
      en: 'Design a premium brand for an invite-only club that instantly reads as insider to cybersecurity professionals.',
    },
    solution: {
      ru: 'Подобрали фирменные шрифты, визуальный стиль и философию бренда. Разработали посадочную страницу с таймером, систему навигации для мероприятий и бренд-буки.',
      en: 'Selected typography, visual style and brand philosophy. Delivered a landing page with a countdown, a navigation system for events and complete brand books.',
    },
    deliverables: {
      ru: [
        'Фирменные шрифты и бренд-платформа',
        'Мониторинг и разработка матрицы коммуникации',
        'Редизайн навигации и дизайн рекламы',
        'Создание бренд-буков, логотипа и спецпроектов',
      ],
      en: [
        'Typography and brand platform',
        'Communication matrix and monitoring',
        'Navigation redesign and ad creatives',
        'Brand books, logo and specials',
      ],
    },
    metrics: [
      { value: '15%', label: { ru: 'конверсия посадочной (средняя по рынку 3–5%)', en: 'landing conversion (market avg 3–5%)' } },
      { value: '3', label: { ru: 'ивента с фирменной навигацией', en: 'events rolled out with the navigation system' } },
      { value: 'Premium', label: { ru: 'считываемость бренда у ядра ЦА', en: 'brand read by the core audience' } },
    ],
    accent: '#E3FF7A',
    featured: true,
  },
  {
    slug: 'mln-beauty',
    year: 2024,
    client: { ru: 'MLN Beauty', en: 'MLN Beauty' },
    title: {
      ru: 'Брендинг косметики блогера Миланы Стар',
      en: 'Cosmetics branding for influencer Milana Star',
    },
    industryId: 'fashion-beauty',
    serviceIds: ['design'],
    primaryService: 'design',
    summary: {
      ru: 'Создали с нуля визуальную концепцию и фирменный стиль для бренда косметики MLN Beauty — от логотипа и упаковки до готового брендбука.',
      en: 'Built MLN Beauty from scratch — visual concept, identity and full brand book, from logo to packaging.',
    },
    task: {
      ru: 'Разработать премиальный beauty-бренд инфлюенсера, который сохраняет её личность, но считывается как самостоятельная категория.',
      en: "Design a premium beauty brand of an influencer that keeps her personality yet reads as an independent category.",
    },
    solution: {
      ru: 'Подобрали фирменные шрифты и палитру, предложили пять вариантов логотипа и согласовали финальный. Разработали дизайн упаковки и финальный брендбук.',
      en: 'Selected typography and palette, presented five logo options and aligned the final one. Delivered packaging design and complete brand book.',
    },
    deliverables: {
      ru: [
        '5 вариантов логотипа с презентациями',
        'Фирменный стиль: шрифты, цвета, паттерны',
        'Дизайн упаковки и нанесение стиля',
        'Готовый брендбук',
      ],
      en: [
        '5 logo options with presentations',
        'Identity: typography, colours, patterns',
        'Packaging design and style application',
        'Final brand book',
      ],
    },
    metrics: [
      { value: '5', label: { ru: 'вариантов логотипа', en: 'logo options' } },
      { value: '100%', label: { ru: 'сохранение tone of voice блогера', en: 'of the influencer tone of voice preserved' } },
      { value: 'Premium', label: { ru: 'уровень считываемости в категории', en: 'premium read in the category' } },
    ],
    accent: '#FFD8E4',
  },
  {
    slug: 'ladies-lounge',
    year: 2024,
    client: { ru: 'The Ladies Lounge', en: 'The Ladies Lounge' },
    title: {
      ru: 'Бренд для женского комьюнити',
      en: 'Brand for a women\u2019s community',
    },
    industryId: 'fashion-beauty',
    serviceIds: ['design', 'smm'],
    primaryService: 'design',
    summary: {
      ru: 'Создали визуальную концепцию и фирменный стиль для закрытого женского клуба The Ladies Lounge, включая контентную систему для соцсетей.',
      en: 'Designed visual concept and identity for the invite-only women\u2019s club The Ladies Lounge, with a full social content system.',
    },
    task: {
      ru: 'Сделать бренд, в котором уважение, приватность и игривость считываются одновременно.',
      en: 'Create a brand where respect, privacy and playfulness read at the same time.',
    },
    solution: {
      ru: 'Разработали три варианта логотипа, предложили фирменную гамму и паттерны, собрали визуальные шаблоны для соцсетей.',
      en: 'Delivered three logo options, selected palette and patterns, built a visual template system for social.',
    },
    deliverables: {
      ru: [
        '3 варианта логотипа',
        'Фирменный стиль: шрифты, цвета, паттерны',
        'Единый визуальный стиль для соцсетей',
        'Визуальное сопровождение и консультации после запуска',
      ],
      en: [
        '3 logo options',
        'Identity: typography, palette, patterns',
        'Social visual system',
        'Post-launch visual support',
      ],
    },
    metrics: [
      { value: '3', label: { ru: 'варианта логотипа', en: 'logo options' } },
      { value: 'Full stack', label: { ru: 'комплект шаблонов для постов, историй и афиш', en: 'templates for posts, stories and posters' } },
    ],
    accent: '#FFD8E4',
  },
  {
    slug: 'cherni',
    year: 2024,
    client: { ru: 'Cherni', en: 'Cherni' },
    title: {
      ru: 'Бренд атласных мешочков Cherni',
      en: 'Brand identity for Cherni satin pouches',
    },
    industryId: 'fashion-beauty',
    serviceIds: ['design'],
    primaryService: 'design',
    summary: {
      ru: 'Разработали фирменный стиль и упаковку для бренда премиальных атласных мешочков, в двух языковых вариантах.',
      en: 'Designed identity and packaging for a premium satin pouches brand in two language variants.',
    },
    task: {
      ru: 'Создать сдержанно-женственный бренд, который одинаково работает на российском и международном рынках.',
      en: 'Build a restrained feminine brand that works equally in Russia and internationally.',
    },
    solution: {
      ru: 'Разработали логотип в двух вариантах (русский и латиница), фирменные шрифты, цвета, паттерны и упаковку. Продумали открытки для заказов.',
      en: 'Designed a bilingual logo (Cyrillic + Latin), typography, palette, patterns and packaging. Added thank-you cards for orders.',
    },
    deliverables: {
      ru: [
        'Логотип в 2 вариациях',
        'Фирменный стиль: шрифты, цвета, паттерны',
        'Упаковка и открытки',
      ],
      en: [
        'Logo in 2 versions',
        'Identity: typography, palette, patterns',
        'Packaging and notes',
      ],
    },
    metrics: [
      { value: '2', label: { ru: 'языковые вариации логотипа', en: 'bilingual logo versions' } },
    ],
    accent: '#3B2E2E',
  },
  {
    slug: 'oriflame',
    year: 2024,
    client: { ru: 'Oriflame', en: 'Oriflame' },
    title: {
      ru: 'Продвижение новой концепции бренда Oriflame',
      en: 'Launching the new Oriflame brand concept',
    },
    industryId: 'fashion-beauty',
    serviceIds: ['smm'],
    primaryService: 'smm',
    summary: {
      ru: 'Охватили новую аудиторию и подняли лояльность к бренду в онлайн-пространстве за счёт обновлённого Well-Being позиционирования.',
      en: 'Reached a new audience and lifted loyalty in online spaces with the refreshed Well-Being positioning.',
    },
    task: {
      ru: 'Переключить восприятие бренда с классической дистрибьюторской модели на современный Well-Being бренд.',
      en: 'Shift brand perception from a classic distributor model to a modern Well-Being brand.',
    },
    solution: {
      ru: 'Провели анализ быстрорастущих конкурентов, построили контент-матрицу для соцсетей, разработали рубрикатор косметики под все продукты категории, составили портрет обновлённой ЦА и подключили инфлюенсеров с совокупной аудиторией 5 млн.',
      en: 'Audited fast-growing competitors, mapped a content matrix, built a product rubricator, profiled the renewed audience and onboarded influencers with 5M reach.',
    },
    deliverables: {
      ru: [
        'Анализ быстрорастущих конкурентов',
        'Контент-матрица и рубрикатор косметики',
        'Портрет обновлённой целевой аудитории',
        'Подбор инфлюенсеров и управление кампанией',
      ],
      en: [
        'Fast-growing competitor audit',
        'Content matrix and product rubricator',
        'Updated audience profile',
        'Influencer onboarding and campaign management',
      ],
    },
    metrics: [
      { value: '+72%', label: { ru: 'рост доли позитивных упоминаний', en: 'positive mentions growth' } },
      { value: '45%', label: { ru: 'доля позитивных упоминаний к концу полугодия', en: 'positive mentions share at six months' } },
      { value: '1.5 → 2.2%', label: { ru: 'вовлечённость (ERR)', en: 'engagement (ERR)' } },
      { value: '42 → 38', label: { ru: 'средний возраст подписчика (лет)', en: 'avg follower age (years)' } },
      { value: '15', label: { ru: 'инфлюенсеров с суммарной ЦА 5 млн', en: 'influencers reaching a combined 5M' } },
    ],
    accent: '#FFE3CF',
    featured: true,
  },
  {
    slug: 'liysan-utyasheva-carmen',
    year: 2024,
    client: { ru: 'Ляйсан Утяшева', en: 'Liysan Utyasheva' },
    title: {
      ru: 'PR-кампания танцевального шоу Ляйсан Утяшевой',
      en: 'PR campaign for Liysan Utyasheva\u2019s dance show',
    },
    industryId: 'fashion-beauty',
    serviceIds: ['pr'],
    primaryService: 'pr',
    summary: {
      ru: 'Полностью сопроводили новый танцевальный проект CARMEN — продвижение и максимальные охваты в Москве и Санкт-Петербурге.',
      en: 'Ran end-to-end support for the new CARMEN dance project — reach, turnout and editorial impact in Moscow and St Petersburg.',
    },
    task: {
      ru: 'Обеспечить заполняемость залов 90%+ и федеральные публикации в премиальных СМИ.',
      en: 'Deliver 90%+ venue occupancy and federal premium media coverage.',
    },
    solution: {
      ru: 'Провели скоординированную PR-кампанию: размещения в РИА, Интерфакс, Москва24; организовали пиар-мероприятия в Москве и Европе; подготовили контент-план социальных сетей; согласовали партнёров и спонсоров.',
      en: 'Ran a coordinated PR campaign: placements in RIA, Interfax, Moscow24; PR events in Moscow and Europe; social content plan; partner and sponsor alignment.',
    },
    deliverables: {
      ru: [
        'Проведение PR-кампании в рамках гастролей 2024',
        'Организация мероприятий в Москве и Европе',
        'Написание пресс-релизов и контроль публикаций',
        'Контент-план и активность в соцсетях',
        'Поиск и коммуникация с партнёрами и спонсорами',
      ],
      en: [
        'PR campaign for the 2024 tour',
        'Events in Moscow and Europe',
        'Press releases and placement control',
        'Social content plan and activations',
        'Partner and sponsor acquisition',
      ],
    },
    metrics: [
      { value: '50+', label: { ru: 'публикаций в федеральных СМИ', en: 'placements in federal media' } },
      { value: '15M', label: { ru: 'совокупный охват, чел.', en: 'combined reach' } },
      { value: '90%', label: { ru: 'заполняемость залов в Москве и Санкт-Петербурге', en: 'venue occupancy in Moscow and SPb' } },
      { value: '+10%', label: { ru: 'прирост подписчиков в Instagram* за кампанию', en: 'Instagram* growth during the campaign' } },
    ],
    tags: ['CARMEN', '2024 Tour'],
    accent: '#D8D4FF',
    featured: true,
  },
  {
    slug: 'derzkaya-gotovka',
    year: 2024,
    client: { ru: 'Дерзкая готовка', en: 'Derzkaya Gotovka' },
    title: {
      ru: 'Съёмки кулинарного шоу с Никитой Кологривым',
      en: 'Cooking show production with Nikita Kologrivy',
    },
    industryId: 'horeca',
    serviceIds: ['pr', 'smm'],
    primaryService: 'pr',
    summary: {
      ru: 'Полное сопровождение съёмочного процесса и постпродакшна кулинарного шоу-интервью с приглашёнными знаменитостями.',
      en: 'End-to-end production and post-production support for a cooking interview show with celebrity guests.',
    },
    task: {
      ru: 'Выстроить регулярный выпуск шоу и сделать его окупаемым через спонсоров и партнёров.',
      en: 'Build a regular release cadence and make the show commercially sustainable through sponsors and partners.',
    },
    solution: {
      ru: 'Ведение коммуникации с брендами и организациями, координация съёмочных дней, кураторство монтажа и ведение соцсетей проекта.',
      en: 'Brand and venue coordination, shoot management, editorial oversight of post-production and project social.',
    },
    deliverables: {
      ru: [
        'Организация площадок под формат шоу',
        'Координация съёмочного процесса',
        'Создание медиаплана, контента и видеообзоров',
        'Кураторство монтажа и отбора финального материала',
      ],
      en: [
        'Venue and format set-up',
        'On-set coordination',
        'Media plan, content and video recaps',
        'Editorial and final cut oversight',
      ],
    },
    metrics: [
      { value: '~1M', label: { ru: 'просмотров на выпуск на YouTube', en: 'views per YouTube episode' } },
      { value: '+150K', label: { ru: 'новых подписчиков проекта', en: 'new project followers' } },
      { value: '3', label: { ru: 'постоянных спонсора и партнёра', en: 'recurring sponsors' } },
    ],
    tags: ['Никита Кологривый', 'YouTube'],
    accent: '#F2F0EC',
  },
  {
    slug: 'stolplit',
    year: 2025,
    client: { ru: 'Столплит', en: 'Stolplit' },
    title: {
      ru: 'Антикризисное управление и системный маркетинг',
      en: 'Crisis management and systemic marketing',
    },
    industryId: 'furniture',
    serviceIds: ['crisis'],
    primaryService: 'crisis',
    summary: {
      ru: 'В экстремальном режиме восстановили полный маркетинговый стек федерального бренда мебели и остановили отток доли рынка.',
      en: 'Rebuilt the full marketing stack of a federal furniture brand under crisis conditions and stopped market share erosion.',
    },
    task: {
      ru: 'В сжатые сроки запустить рекламу, наладить партнёрский и поставочный контур и стабилизировать продажи до периода высокого сезона.',
      en: 'Launch paid media quickly, rebuild supplier and partner operations and stabilise sales before peak season.',
    },
    solution: {
      ru: 'Аудит текущего состояния, разработка антикризисной стратегии и запуск актуальной рекламы по тематическим акциям. Разработка дизайн-материалов под все направления. Переговоры с партнёрами и подрядчиками, выстраивание единой корпоративной политики.',
      en: 'Current state audit, crisis-response strategy and the launch of themed promo campaigns. Design system across all channels. Partner and contractor negotiations and a single corporate policy across outlets.',
    },
    deliverables: {
      ru: [
        'Разработка антикризисной стратегии',
        'Запуск актуальной рекламы по тематическим акциям',
        'Разработка дизайн-материалов и финансовой политики',
        'Переговоры с партнёрами и подрядчиками',
        'Размещения офлайн и настройка выдачи',
      ],
      en: [
        'Crisis strategy',
        'Themed promo campaign launches',
        'Design system and financial policy',
        'Partner and contractor negotiations',
        'Offline placements and SERP fixes',
      ],
    },
    metrics: [
      { value: '-29%', label: { ru: 'стоимость подписчика VK Ads (фев→дек 2025)', en: 'VK Ads CPF (Feb→Dec 2025)' } },
      { value: '-21%', label: { ru: 'стоимость клика в Дзен', en: 'Dzen CPC reduction' } },
      { value: '400+', label: { ru: 'постов и 50+ рилсов за 4 месяца', en: 'posts and 50+ reels in 4 months' } },
      { value: '100+', label: { ru: 'баннеров и комплекты готовой продукции', en: 'banners and ready-to-print kits' } },
    ],
    tags: ['Антикриз', 'Федеральная сеть'],
    accent: '#E8D8B8',
    featured: true,
  },
];

export const FEATURED_CASES = CASES.filter((c) => c.featured);
