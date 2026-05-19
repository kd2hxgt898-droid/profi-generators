import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import type { CollectionId, CollectionScenario, Product, Segment } from '@/types/api';

type Props = {
  collection: CollectionScenario;
  segment: Segment;
  products: ReadonlyArray<Product>;
  maxItems?: number;
};

export const CollectionSection = ({ collection, segment, products, maxItems }: Props): JSX.Element => {
  const { t } = useTranslation();

  const filtered = products.filter(
    (product) => product.collection === collection.id && product.segment === segment,
  );
  const items = typeof maxItems === 'number' ? filtered.slice(0, maxItems) : filtered;

  if (items.length === 0) {
    return <></>;
  }

  return (
    <motion.section
      key={collection.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-border/40 shadow-glass"
        style={{ minHeight: 220 }}
      >
        <img
          src={collection.background}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/55 to-navy-950/10" />
        <div className="relative flex flex-col gap-3 p-8 md:flex-row md:items-end md:justify-between md:p-12">
          <div className="space-y-2">
            {collection.badge ? (
              <Badge variant="gold" className="uppercase tracking-[0.2em]">
                {collection.badge}
              </Badge>
            ) : null}
            <h3 className="font-display text-3xl text-white md:text-5xl">
              {t(`collections.${segment === 'home' ? 'home' : 'business'}.${asCollectionKey(collection.id)}.name`)}
            </h3>
            <p className="max-w-2xl text-pretty text-base text-navy-100/85 md:text-lg">
              «{t(
                `collections.${segment === 'home' ? 'home' : 'business'}.${asCollectionKey(collection.id)}.promise`,
              )}»
            </p>
            <p className="text-sm text-navy-100/70">
              {t(
                `collections.${segment === 'home' ? 'home' : 'business'}.${asCollectionKey(collection.id)}.scenario`,
              )}
            </p>
          </div>
          <div
            className={cn(
              'glass flex items-center gap-2 self-start rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-white',
            )}
          >
            <ArrowRight className="h-3 w-3" />
            {items.length} {t('boutique.inCollection')}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((product, idx) => (
          <ProductCard key={product.id} product={product} delay={idx * 0.05} />
        ))}
      </div>
    </motion.section>
  );
};

const asCollectionKey = (
  id: CollectionId,
): 'country' | 'comfort' | 'fortress' | 'retail' | 'production' | 'datacenter' => id;
