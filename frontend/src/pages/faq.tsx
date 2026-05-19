import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Meta } from '@/components/seo/meta';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants';
import { useFaq } from '@/api/hooks';
import { FaqAccordion } from '@/features/faq/faq-accordion';

export const FaqPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { data } = useFaq();
  const items = data?.items ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Meta
        title={t('faq.title')}
        description={t('faq.subtitle')}
        path={ROUTES.faq}
        jsonLd={jsonLd}
      />
      <section className="container space-y-6 py-12 md:py-20 text-center">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.3em]">
          <Sparkles className="h-3 w-3" /> {t('faq.eyebrow')}
        </Badge>
        <h1 className="font-display text-4xl md:text-6xl">{t('faq.title')}</h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">{t('faq.subtitle')}</p>
      </section>

      <section className="container max-w-3xl pb-24">
        <FaqAccordion items={items} />
      </section>
    </>
  );
};
