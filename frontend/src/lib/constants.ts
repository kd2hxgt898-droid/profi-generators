export const SITE = {
  name: 'PROFFI',
  brand: 'PROFFI',
  domain: 'profi-generator.ru',
  phonePrimary: '+7 (977) 305-99-39',
  phoneSecondary: '+7 (495) 979-55-75',
  whatsapp: 'https://wa.me/79773059939',
  telegram: 'https://t.me/profigenerator',
  address: {
    ru: 'Россия, г. Зеленоград, ул. Логвиненко, к.1401, офис 105',
    en: 'Russia, Zelenograd, Logvinenko st., 1401, office 105',
  },
  schedule: {
    ru: 'Ежедневно с 9:00 до 21:00',
    en: 'Daily 9:00 — 21:00',
  },
  founded: 2013,
} as const;

export const ROUTES = {
  home: '/',
  boutique: '/boutique',
  services: '/services',
  about: '/about',
  faq: '/faq',
  contacts: '/contacts',
  quiz: '/quiz',
  privacy: '/privacy',
} as const;

/** Страница карточки товара: `/boutique/{id}` */
export function boutiqueProductPath(productId: string): string {
  return `${ROUTES.boutique}/${encodeURIComponent(productId)}`;
}

/** Hero: два слоя PNG (тёмный / светлый). На мобильных — уменьшенные копии (≤2048px). */
export const HERO_HOUSE = {
  dark: '/images/hero/dark03.png',
  light: '/images/hero/house-light-1.png',
  darkMobile: '/images/hero/dark03-mobile.png',
  lightMobile: '/images/hero/house-light-mobile.png',
} as const;
