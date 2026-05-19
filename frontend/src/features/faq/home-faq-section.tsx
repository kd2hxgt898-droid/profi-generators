import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useFaq } from '@/api/hooks';
import { FaqAccordion } from './faq-accordion';

export const HomeFaqSection = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { data } = useFaq();
  const items = data?.items ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="container pb-24 pt-4 md:pt-8" aria-labelledby="home-faq-heading">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.3em]">
          <Sparkles className="h-3 w-3" /> {t('faq.eyebrow')}
        </Badge>
        <h2 id="home-faq-heading" className="font-display mt-4 text-3xl md:text-5xl">
          {t('faq.title')}
        </h2>
        <p className="mt-3 text-base text-muted-foreground">{t('faq.subtitle')}</p>
      </div>
      <div className="mx-auto max-w-3xl">
        <FaqAccordion items={items} />
      </div>
    </section>
  );
};
