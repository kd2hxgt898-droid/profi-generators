import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  CheckCircle2,
  Package,
  Sparkle,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import type { Product, ProductLanding } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatPrice } from '@/lib/utils';
import { ROUTES, SITE } from '@/lib/constants';
import { CoverageIcons } from './coverage-icons';
import { SilenceMeter } from './silence-meter';

const telHref = `tel:+${SITE.phonePrimary.replace(/\D/g, '')}`;

type Props = {
  product: Product;
  landing: ProductLanding;
};

const CtaRow = ({
  productId,
  className,
  orderLabel,
  phoneLabel,
}: {
  productId: string;
  className?: string;
  orderLabel: string;
  phoneLabel: string;
}): JSX.Element => (
  <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap', className)}>
    <Button asChild size="lg" className="bg-gold-gradient text-navy-900 shadow-gold hover:shadow-gold-lg">
      <Link to={`${ROUTES.contacts}?product=${encodeURIComponent(productId)}`}>
        {orderLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
    <Button asChild size="lg" variant="outline">
      <a href={telHref}>{phoneLabel}</a>
    </Button>
  </div>
);

export const ProductLandingView = ({ product, landing }: Props): JSX.Element => {
  const { t } = useTranslation();
  const orderCta = t('boutique.productDetail.orderCta');

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-navy-950/90 via-background to-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(248, 196, 113, 0.35), transparent),
              radial-gradient(ellipse 60% 40% at 100% 30%, rgba(129, 140, 248, 0.12), transparent)`,
          }}
        />
        <div className="container relative max-w-6xl py-14 md:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                <Sparkle className="h-3.5 w-3.5" aria-hidden />
                {product.brand}
              </div>
              <h1 className="text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="text-lg font-medium text-primary md:text-xl">{landing.tagline}</p>
              <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg">
                {landing.intro}
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-end">
                <p className="font-display text-3xl font-semibold text-foreground md:text-4xl">
                  {formatPrice(product.price)}
                </p>
                <CtaRow
                  productId={product.id}
                  className="justify-center lg:justify-start"
                  orderLabel={orderCta}
                  phoneLabel={SITE.phonePrimary}
                />
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/5 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 shadow-2xl ring-1 ring-white/5 backdrop-blur-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[4/3] w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border/30 bg-muted/25 py-16 md:py-20">
        <div className="container max-w-6xl">
          <h2 className="mb-10 text-center font-display text-3xl font-semibold md:text-4xl">
            {landing.benefits_heading}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {landing.benefits.map((b) => (
              <Card
                key={b.title}
                className="border-border/50 bg-card/80 shadow-glass backdrop-blur transition-shadow hover:border-primary/30 hover:shadow-md"
              >
                <CardContent className="space-y-3 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Zap className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug">{b.title}</h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Power scenario */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl">
          <h2 className="mb-4 text-center font-display text-3xl font-semibold md:text-4xl">
            {landing.power_section_title}
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-muted-foreground md:text-lg">
            {landing.power_intro}
          </p>
          <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {landing.power_items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/60 px-4 py-3 backdrop-blur"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="text-sm font-medium leading-snug md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-y border-border/30 bg-muted/20 py-16 md:py-20">
        <div className="container max-w-6xl">
          <h2 className="mb-10 text-center font-display text-3xl font-semibold md:text-4xl">
            {landing.quick_facts_heading}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {landing.quick_facts.map((f) => (
              <Card key={f.label} className="border-border/50 bg-card/90">
                <CardContent className="space-y-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {f.label}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audience + kit */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-border/50 bg-card/70 shadow-glass backdrop-blur">
              <CardContent className="space-y-4 p-8">
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-5 w-5" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                    {t('boutique.productLanding.audienceEyebrow')}
                  </span>
                </div>
                <p className="text-pretty leading-relaxed text-muted-foreground">{landing.audience}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/70 shadow-glass backdrop-blur">
              <CardContent className="space-y-4 p-8">
                <div className="flex items-center gap-2 text-primary">
                  <Package className="h-5 w-5" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                    {landing.kit_heading}
                  </span>
                </div>
                <p className="leading-relaxed text-foreground">{landing.kit}</p>
                {landing.kit_note ? (
                  <p className="text-pretty border-l-2 border-amber-500/60 pl-4 text-sm text-muted-foreground">
                    {landing.kit_note}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Витринные блоки */}
      <section className="border-t border-border/30 bg-muted/15 py-14 md:py-16">
        <div className="container max-w-6xl space-y-8">
          <div className="grid gap-10 md:grid-cols-[1fr,1fr] md:items-start">
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {t('boutique.coverage')}
              </h2>
              <CoverageIcons items={product.coverage} />
            </div>
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {t('boutique.silence')}
              </h2>
              <SilenceMeter level={product.silence_level} playable />
              <p className="mt-2 text-xs text-muted-foreground">
                {landing.passport_noise_db !== undefined
                  ? t('boutique.productLanding.passportNoiseNoteDb', {
                      db: landing.passport_noise_db,
                    })
                  : t('boutique.productLanding.passportNoiseNote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Wrench className="h-5 w-5" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  {t('boutique.productLanding.passportBadge')}
                </span>
              </div>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">{landing.specs_heading}</h2>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
                {landing.specs_intro}
              </p>
            </div>
          </div>

          <div
            role="note"
            className="rounded-2xl border border-amber-500/35 bg-amber-500/10 px-5 py-4 text-sm leading-relaxed text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-50"
          >
            {landing.specs_excluded}
          </div>

          <Card className="overflow-hidden border-border/50 bg-card/80 shadow-glass backdrop-blur">
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {landing.specs_table.map((row, i) => (
                  <div
                    key={`${row.label}-${i}`}
                    className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className="text-sm font-medium leading-snug sm:max-w-[55%] sm:text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/40 bg-gradient-to-b from-primary/10 via-background to-background py-16 md:py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            {t('boutique.productLanding.finalTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t('boutique.productLanding.finalBody', { name: product.name })}
          </p>
          <CtaRow
            productId={product.id}
            className="mt-8 justify-center"
            orderLabel={orderCta}
            phoneLabel={SITE.phonePrimary}
          />
        </div>
      </section>
    </div>
  );
};
