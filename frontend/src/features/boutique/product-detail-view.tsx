import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/api';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { CoverageIcons } from './coverage-icons';
import { SilenceMeter } from './silence-meter';

const SpecRow = ({ label, value }: { label: string; value: ReactNode }): JSX.Element => (
  <div className="flex justify-between gap-4 border-b border-border/50 py-2.5 text-sm last:border-b-0">
    <span className="shrink-0 text-muted-foreground">{label}</span>
    <span className="max-w-[60%] text-right font-medium leading-snug">{value}</span>
  </div>
);

type Props = {
  product: Product;
};

export const ProductDetailView = ({ product }: Props): JSX.Element => {
  const { t } = useTranslation();
  const fuel = t(`boutique.productDetail.fuelTypes.${product.fuel}`);
  const start = t(`boutique.productDetail.startTypes.${product.start_type}`);
  const enclosure = t(`boutique.productDetail.enclosureTypes.${product.enclosure}`);
  const phases =
    product.phases === 3
      ? t('boutique.productDetail.phases3')
      : t('boutique.productDetail.phases1');
  const power = `${product.power_kw} ${t('boutique.productDetail.kW')}`;
  const silenceHint = t('boutique.productDetail.silenceHint', { level: product.silence_level });
  const warranty = t('boutique.productDetail.warrantyYears', { count: product.warranty_years });

  return (
    <article className="overflow-hidden rounded-2xl border border-border/50 bg-card/70 shadow-glass backdrop-blur">
      <div className="p-6 pb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</p>
        <h1 className="mt-2 text-pretty font-display text-2xl md:text-3xl">{product.name}</h1>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {product.short_description}
        </p>
        <p className="mt-3 text-xl font-semibold text-primary">{formatPrice(product.price)}</p>
      </div>

      <div className="grid gap-6 border-t border-border/50 px-6 py-5 md:grid-cols-[1fr,1.1fr] md:items-start">
        <div className="overflow-hidden rounded-xl border border-border/40 bg-muted/20">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {t('boutique.productDetail.specsHeading')}
          </h2>
          <div>
            <SpecRow label={t('boutique.productDetail.power')} value={power} />
            <SpecRow label={t('boutique.productDetail.phases')} value={phases} />
            <SpecRow label={t('boutique.productDetail.fuel')} value={fuel} />
            <SpecRow label={t('boutique.productDetail.start')} value={start} />
            <SpecRow label={t('boutique.productDetail.enclosure')} value={enclosure} />
            <SpecRow label={t('boutique.productDetail.warranty')} value={warranty} />
            <SpecRow
              label={t('boutique.productDetail.silence')}
              value={
                <span className="inline-flex flex-col items-end gap-1.5">
                  <span className="text-xs font-normal text-muted-foreground">{silenceHint}</span>
                  <SilenceMeter level={product.silence_level} />
                </span>
              }
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 px-6 py-5">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {t('boutique.coverage')}
        </h2>
        <CoverageIcons items={product.coverage} />
      </div>

      <div className="border-t border-border/50 px-6 py-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {t('boutique.productDetail.highlights')}
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          {product.highlights.map((item) => (
            <li key={item} className="text-pretty">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <footer className="border-t border-border/50 p-6">
        <Button asChild className="w-full sm:w-auto" size="lg">
          <Link to={`${ROUTES.contacts}?product=${encodeURIComponent(product.id)}`}>
            {t('boutique.productDetail.orderCta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </footer>
    </article>
  );
};
