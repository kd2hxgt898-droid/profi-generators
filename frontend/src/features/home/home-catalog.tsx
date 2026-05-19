import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SegmentToggle } from '@/features/boutique/segment-toggle';
import { CollectionSection } from '@/features/boutique/collection-section';
import { useCollections, useProducts } from '@/api/hooks';
import { ROUTES } from '@/lib/constants';
import type { Segment } from '@/types/api';

const HOME_PREVIEW_LIMIT = 3;

export const HomeCatalog = (): JSX.Element => {
  const { t } = useTranslation();
  const [segment, setSegment] = useState<Segment>('home');
  const collectionsQuery = useCollections(segment);
  const productsQuery = useProducts({ segment });

  const collections = collectionsQuery.data?.items ?? [];
  const products = useMemo(() => productsQuery.data?.items ?? [], [productsQuery.data]);

  return (
    <section className="container space-y-12 py-20 md:py-28">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <Badge variant="outline" className="mx-auto text-xs uppercase tracking-[0.3em]">
          <Sparkles className="h-3 w-3" /> {t('homeCatalog.eyebrow')}
        </Badge>
        <h2 className="font-display text-balance text-3xl leading-tight md:text-5xl">
          {t('homeCatalog.title')}
        </h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">
          {t('homeCatalog.subtitle')}
        </p>
        <div className="pt-2">
          <SegmentToggle segment={segment} onChange={setSegment} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <div key={segment} className="space-y-12">
          {collections.map((collection) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              segment={segment}
              products={products}
              maxItems={HOME_PREVIEW_LIMIT}
            />
          ))}
        </div>
      </AnimatePresence>

      <div className="flex justify-center">
        <Button asChild variant="glass" size="lg">
          <Link to={ROUTES.boutique}>
            {t('homeCatalog.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
