export type FuelType = 'petrol' | 'diesel' | 'gas' | 'turnkey';
export type Segment = 'home' | 'business';
export type CollectionId =
  | 'country'
  | 'comfort'
  | 'fortress'
  | 'retail'
  | 'production'
  | 'datacenter';

/** Контент лендинга товара (структурированная выжимка из паспорта / маркетинга). */
export type ProductLandingBenefit = {
  title: string;
  body: string;
};

export type ProductLandingFact = {
  label: string;
  value: string;
};

export type ProductLandingSpecRow = {
  label: string;
  value: string;
};

export type ProductLanding = {
  tagline: string;
  intro: string;
  benefits_heading: string;
  benefits: ReadonlyArray<ProductLandingBenefit>;
  power_section_title: string;
  power_intro: string;
  power_items: ReadonlyArray<string>;
  quick_facts_heading: string;
  quick_facts: ReadonlyArray<ProductLandingFact>;
  audience: string;
  kit_heading: string;
  kit: string;
  kit_note?: string;
  specs_heading: string;
  specs_excluded: string;
  specs_intro: string;
  specs_table: ReadonlyArray<ProductLandingSpecRow>;
  /** Уровень шума по паспорту (дБ) — для сноски рядом с витринным SilenceMeter */
  passport_noise_db?: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  fuel: FuelType;
  collection: CollectionId;
  segment: Segment;
  price: number;
  power_kw: number;
  phases: 1 | 3;
  silence_level: 1 | 2 | 3;
  badges: ReadonlyArray<string>;
  coverage: ReadonlyArray<string>;
  image: string;
  short_description: string;
  highlights: ReadonlyArray<string>;
  start_type: 'manual' | 'electric' | 'auto';
  enclosure: 'open' | 'silent' | 'all-weather';
  warranty_years: number;
  landing?: ProductLanding;
};

export type CollectionScenario = {
  id: CollectionId;
  segment: Segment;
  background: string;
  badge?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  short: string;
  text: string;
  audio_url: string;
  avatar?: string;
  featured: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type QuizAnswers = {
  object: 'home' | 'business' | 'industry';
  load: 'minimum' | 'comfort' | 'maximum';
  gas: 'none' | 'mainline' | 'tank';
  neighbours: 'dense' | 'industrial' | 'spacious';
  placement: 'outside' | 'inside' | 'shed' | 'consult';
  start: 'remote' | 'manual' | 'auto';
};

export type QuizRecommendation = {
  id: string;
  title: string;
  fuel: FuelType;
  power_kw: number;
  enclosure: 'open' | 'silent' | 'all-weather';
  start_type: 'manual' | 'electric' | 'auto';
  total_price: number;
  highlights: ReadonlyArray<string>;
};

export type LeadInput = {
  name: string;
  phone: string;
  source: 'quiz' | 'hero' | 'boutique' | 'contacts' | 'not_found';
  comment?: string;
  consent: true;
};

export type LeadResponse = {
  id: string;
  status: 'accepted';
  created_at: string;
};
