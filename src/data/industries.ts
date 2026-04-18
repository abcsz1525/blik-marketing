export interface Industry {
  id: string;
  ru: string;
  en: string;
  clients: string[];
  accent: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'real-estate',
    ru: 'Недвижимость',
    en: 'Real Estate',
    clients: ['A101', 'Pioneer', 'Alber Blanc', 'Миллениум парк', 'Лазурный берег', 'Красная стрела', 'Суперметалл', 'Family Nest'],
    accent: '#E8D8B8',
  },
  {
    id: 'fashion-beauty',
    ru: 'Мода и бьюти',
    en: 'Fashion & Beauty',
    clients: ['Choupette', 'Oriflame', 'MLN beauty', 'The Ladies Lounge'],
    accent: '#FFD8E4',
  },
  {
    id: 'horeca',
    ru: 'HoReCa',
    en: 'HoReCa',
    clients: ['My-My', 'WasabiSushi', 'Izbushka'],
    accent: '#F2F0EC',
  },
  {
    id: 'it-app',
    ru: 'IT & App',
    en: 'IT & App',
    clients: ['Яндекс', 'Кибердом', 'Drivee'],
    accent: '#D8D4FF',
  },
  {
    id: 'fmcg',
    ru: 'FMCG',
    en: 'FMCG',
    clients: ['MARS', 'P&G', 'LIQUIDS'],
    accent: '#FFE3CF',
  },
  {
    id: 'pharma',
    ru: 'Фармацевтика',
    en: 'Pharma',
    clients: ['Novartis', 'Orzax', 'Merck'],
    accent: '#CFF5E5',
  },
  {
    id: 'auto',
    ru: 'Авто',
    en: 'Automotive',
    clients: ['Continental', 'Gislaved', 'Holt'],
    accent: '#CFE8FF',
  },
];
