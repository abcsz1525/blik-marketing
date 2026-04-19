export type ServiceId =
  | 'research'
  | 'positioning'
  | 'design'
  | 'smm'
  | 'pr'
  | 'crisis';

export interface Service {
  id: ServiceId;
  number: string;
  slug: string;
  color: string;
  deliverables: string[];
  deliverablesEn: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'research',
    number: '01',
    slug: 'research',
    color: '#D8D4FF',
    deliverables: [
      'Качественные и количественные исследования',
      'Аудит рынка, конкурентов и ценообразования',
      'Сегментация ЦА и портреты аудиторий',
      'Стратегия выхода на рынок',
      'Дорожная карта и OKR-план на 12 месяцев',
    ],
    deliverablesEn: [
      'Qualitative and quantitative research',
      'Market, competitor and pricing audit',
      'Audience segmentation and personas',
      'Go-to-market strategy',
      '12-month roadmap and OKR plan',
    ],
  },
  {
    id: 'positioning',
    number: '02',
    slug: 'positioning',
    color: '#FFD8E4',
    deliverables: [
      'Бренд-платформа: миссия, ценности, атрибуты',
      'Архетип и позиционирование',
      'Tone of voice и ключевые месседжи',
      'Коммуникационная матрица по сегментам',
      'Гайд для команды и партнёров',
    ],
    deliverablesEn: [
      'Brand platform: mission, values, attributes',
      'Archetype and positioning',
      'Tone of voice and key messages',
      'Communication matrix per segment',
      'Internal guide for team and partners',
    ],
  },
  {
    id: 'design',
    number: '03',
    slug: 'design',
    color: '#CFF5E5',
    deliverables: [
      'Логотип и фирменный стиль',
      'Брендбук и digital guidelines',
      'Упаковка и мерч',
      'Landing pages и промо-сайты',
      'Креативы для рекламы и SMM',
    ],
    deliverablesEn: [
      'Logo and identity system',
      'Brand book and digital guidelines',
      'Packaging and merchandise',
      'Landing pages and promo sites',
      'Creatives for ads and social',
    ],
  },
  {
    id: 'smm',
    number: '04',
    slug: 'social',
    color: '#FFE3CF',
    deliverables: [
      'Контент-стратегия и редполитика',
      'Продакшн: фото, видео, графика',
      'Комьюнити-менеджмент и ORM',
      'Блогеры и амбассадоры',
      'SERM и оптимизация выдачи',
    ],
    deliverablesEn: [
      'Content strategy and editorial',
      'Production: photo, video, graphics',
      'Community management and ORM',
      'Influencers and ambassadors',
      'SERM and search reputation',
    ],
  },
  {
    id: 'pr',
    number: '05',
    slug: 'pr',
    color: '#CFE8FF',
    deliverables: [
      'Медиа-стратегия и календарь публикаций',
      'Подготовка пресс-релизов и колонок',
      'Организация мероприятий и PR-активаций',
      'Звёзды и эксперты',
      'Партнёрские спецпроекты в СМИ',
    ],
    deliverablesEn: [
      'Media strategy and editorial calendar',
      'Press releases and op-eds',
      'Events and PR activations',
      'Celebrities and expert engagement',
      'Partnership specials in the media',
    ],
  },
  {
    id: 'crisis',
    number: '06',
    slug: 'crisis',
    color: '#E8D8FF',
    deliverables: [
      'Диагностика репутационного кризиса',
      'План коммуникаций и распределение ролей',
      'Системный рефрейминг бренда',
      'Восстановление каналов трафика',
      'Долгосрочный план роста',
    ],
    deliverablesEn: [
      'Reputation crisis diagnosis',
      'Comms plan and role distribution',
      'Systemic brand reframing',
      'Traffic channel recovery',
      'Long-term growth plan',
    ],
  },
];
