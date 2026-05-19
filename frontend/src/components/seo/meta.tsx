import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { HERO_HOUSE } from '@/lib/constants';

type Props = {
  title: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | ReadonlyArray<Record<string, unknown>>;
  image?: string;
};

const SITE_URL = 'https://profi-generators.ru';

export const Meta = ({
  title,
  description,
  path = '/',
  type = 'website',
  jsonLd,
  image = HERO_HOUSE.light,
}: Props): JSX.Element => {
  const { i18n, t } = useTranslation();
  const locale = i18n.resolvedLanguage === 'en' ? 'en_US' : 'ru_RU';
  const url = `${SITE_URL}${path}`;
  const siteName = t('brand.name');
  const fullTitle =
    title === siteName ? `${siteName} — ${t('brand.tagline')}` : `${title} — ${siteName}`;
  const ogImage = `${SITE_URL}${image}`;

  return (
    <Helmet>
      <html lang={i18n.resolvedLanguage} />
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="ru" href={`${SITE_URL}${path}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={ogImage} />

      {jsonLd
        ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((block, idx) => (
            <script key={idx} type="application/ld+json">
              {JSON.stringify(block)}
            </script>
          ))
        : null}
    </Helmet>
  );
};
