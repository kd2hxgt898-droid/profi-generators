import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Meta } from '@/components/seo/meta';
import { Badge } from '@/components/ui/badge';
import { SegmentToggle } from '@/features/boutique/segment-toggle';
import { CollectionSection } from '@/features/boutique/collection-section';
import { NotFoundBlock } from '@/features/boutique/not-found-block';
import { useCollections, useProducts } from '@/api/hooks';
import { ROUTES } from '@/lib/constants';
import type { Segment } from '@/types/api';

export const BoutiquePage = (): JSX.Element => {
  const { t } = useTranslation();
  const [segment, setSegment] = useState<Segment>('home');
  const collectionsQuery = useCollections(segment);
  const productsQuery = useProducts({ segment });

  const collections = collectionsQuery.data?.items ?? [];
  const products = useMemo(() => productsQuery.data?.items ?? [], [productsQuery.data]);

  return (
    <>
      <Meta
        title={t('boutique.title')}
        description={t('boutique.subtitle')}
        path={ROUTES.boutique}
      />

      <section className="container space-y-8 py-12 md:py-20 text-center">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.3em]">
          <Sparkles className="h-3 w-3" /> Boutique
        </Badge>
        <h1 className="mx-auto max-w-3xl font-display text-balance text-4xl md:text-6xl">
          {t('boutique.title')}
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">{t('boutique.subtitle')}</p>
        <div>
          <SegmentToggle segment={segment} onChange={setSegment} />
        </div>
      </section>

      <section className="container space-y-16 pb-20">
        <AnimatePresence mode="wait">
          <div key={segment} className="space-y-16">
            {collections.map((collection) => (
              <CollectionSection
                key={collection.id}
                collection={collection}
                segment={segment}
                products={products}
              />
            ))}
          </div>
        </AnimatePresence>
        <NotFoundBlock />
      </section>
    </>
  );
};
