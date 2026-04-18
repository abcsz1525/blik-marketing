export interface TeamMember {
  id: string;
  name: { ru: string; en: string };
  roleKey: string;
  focus?: { ru: string; en: string };
}

export const TEAM: TeamMember[] = [
  {
    id: 'elena-danilina',
    name: { ru: 'Елена Данилина', en: 'Elena Danilina' },
    roleKey: 'founder',
    focus: {
      ru: 'Стратегия, ключевые клиенты, партнёрства',
      en: 'Strategy, key clients, partnerships',
    },
  },
  {
    id: 'managing',
    name: { ru: 'Анна Воронцова', en: 'Anna Vorontsova' },
    roleKey: 'managing',
    focus: {
      ru: 'Операционное управление агентством',
      en: 'Agency operations',
    },
  },
  {
    id: 'creative',
    name: { ru: 'Артём Соколовский', en: 'Artem Sokolovskiy' },
    roleKey: 'creative',
    focus: {
      ru: 'Креативные концепции и визуал',
      en: 'Creative concepts and visual',
    },
  },
  {
    id: 'brand',
    name: { ru: 'Мария Левина', en: 'Maria Levina' },
    roleKey: 'brand',
    focus: {
      ru: 'Платформа бренда и tone of voice',
      en: 'Brand platform and tone of voice',
    },
  },
  {
    id: 'design',
    name: { ru: 'Дмитрий Красный', en: 'Dmitry Krasny' },
    roleKey: 'design',
    focus: { ru: 'Айдентика и дизайн-системы', en: 'Identity and design systems' },
  },
  {
    id: 'copy',
    name: { ru: 'Александра Пименова', en: 'Alexandra Pimenova' },
    roleKey: 'copy',
    focus: { ru: 'Копирайтинг и редактура', en: 'Copywriting and editorial' },
  },
  {
    id: 'smm',
    name: { ru: 'Ирина Беляева', en: 'Irina Belyaeva' },
    roleKey: 'smm',
    focus: { ru: 'Соцсети и репутация', en: 'Social and reputation' },
  },
  {
    id: 'pr',
    name: { ru: 'Ксения Атанасова', en: 'Ksenia Atanasova' },
    roleKey: 'pr',
    focus: { ru: 'СМИ, спецпроекты, амбассадоры', en: 'Media, specials, ambassadors' },
  },
  {
    id: 'projects',
    name: { ru: 'Тимур Рамазанов', en: 'Timur Ramazanov' },
    roleKey: 'projects',
    focus: { ru: 'Сроки, бюджеты, команды', en: 'Timelines, budgets, teams' },
  },
  {
    id: 'research',
    name: { ru: 'Полина Зверева', en: 'Polina Zvereva' },
    roleKey: 'research',
    focus: { ru: 'Рынок, сегменты, ЦА', en: 'Market, segments, audiences' },
  },
  {
    id: 'motion',
    name: { ru: 'Глеб Сухов', en: 'Gleb Sukhov' },
    roleKey: 'motion',
    focus: { ru: 'Видео, motion, 3D', en: 'Video, motion, 3D' },
  },
  {
    id: 'client',
    name: { ru: 'Вероника Лапина', en: 'Veronika Lapina' },
    roleKey: 'client',
    focus: { ru: 'Клиентский сервис и развитие', en: 'Client service and growth' },
  },
];
