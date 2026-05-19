import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Snowflake, Sparkles, Star, Wrench, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import { boutiqueProductPath } from '@/lib/constants';
import { CoverageIcons } from './coverage-icons';
import { SilenceMeter } from './silence-meter';
import type { Product } from '@/types/api';

const BADGE_ICON: Record<string, LucideIcon> = {
  hit: Sparkles,
  kristovsky: Star,
  silent: Sparkles,
  coldproof: Snowflake,
  turnkey: Wrench,
  compact: Sparkles,
  'best-value': Award,
};

const BADGE_VARIANT: Record<string, 'default' | 'gold' | 'outline' | 'muted'> = {
  hit: 'gold',
  kristovsky: 'gold',
  silent: 'default',
  coldproof: 'outline',
  turnkey: 'default',
  compact: 'outline',
  'best-value': 'outline',
};

type Props = {
  product: Product;
  delay?: number;
};

export const ProductCard = ({ product, delay = 0 }: Props): JSX.Element => {
  const { t } = useTranslation();
  const detailHref = boutiqueProductPath(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={detailHref}
        className={cn(
          'block rounded-2xl no-underline outline-none ring-offset-background',
          'transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        <Card
          className={cn(
            'group flex h-full cursor-pointer flex-col overflow-hidden border-border/50 bg-card/70 backdrop-blur transition-all duration-300',
            'hover:-translate-y-1 hover:border-primary/40 hover:shadow-gold',
          )}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {product.badges.slice(0, 3).map((badge) => {
                const Icon = BADGE_ICON[badge] ?? Sparkles;
                const label = t(
                  `badges.${badge === 'kristovsky' ? 'kristovsky' : badge === 'turnkey' ? 'turnkey' : badge === 'silent' ? 'silent' : badge === 'coldproof' ? 'coldproof' : 'hit'}`,
                  {
                    defaultValue: badge,
                  },
                );
                return (
                  <Badge key={badge} variant={BADGE_VARIANT[badge] ?? 'default'}>
                    <Icon className="h-3 w-3" />
                    {label}
                  </Badge>
                );
              })}
            </div>
            <div className="absolute bottom-3 right-3">
              <SilenceMeter level={product.silence_level} />
            </div>
          </div>
          <CardContent className="flex flex-1 flex-col gap-3 p-5">
            <header className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {product.brand} • {product.power_kw} кВт
                </p>
                <h3 className="font-display text-xl font-semibold leading-tight text-card-foreground">
                  {product.name}
                </h3>
              </div>
              <p className="whitespace-nowrap text-right font-semibold text-primary">
                {formatPrice(product.price)}
              </p>
            </header>

            <p className="text-sm leading-relaxed text-muted-foreground">{product.short_description}</p>

            <span className="inline-flex w-fit text-left text-xs font-semibold uppercase tracking-[0.18em] text-primary underline decoration-primary/35 underline-offset-4">
              {t('boutique.productDetail.specsHeading')} →
            </span>

            <div className="mt-1">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t('boutique.coverage')}
              </p>
              <CoverageIcons items={product.coverage} />
            </div>

            <Button asChild className="pointer-events-none mt-auto w-full" variant="default" tabIndex={-1}>
              <span>
                {t('common.cta.buy')}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
