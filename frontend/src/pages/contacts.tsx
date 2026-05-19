import { useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Clock, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import { Meta } from '@/components/seo/meta';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/features/lead/lead-form';
import { useProducts } from '@/api/hooks';
import { ROUTES, SITE } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export const ContactsPage = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.resolvedLanguage === 'ru';
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const formCardRef = useRef<HTMLDivElement>(null);
  
  const { data: productsData } = useProducts();

  const selectedProduct = useMemo(() => {
    if (!productId || !productsData?.items.length) return undefined;
    return productsData.items.find((p) => p.id === productId);
  }, [productId, productsData?.items]);

  const leadComment = useMemo(() => {
    if (!productId) return undefined;
    if (selectedProduct) {
      return t('leadForm.boutiqueLeadComment', {
        name: selectedProduct.name,
        brand: selectedProduct.brand,
        kw: selectedProduct.power_kw,
        price: formatPrice(selectedProduct.price),
        id: selectedProduct.id,
      });
    }
    if (productsData) {
      return t('leadForm.boutiqueLeadCommentUnknownId', { id: productId });
    }
    return t('leadForm.boutiqueLeadCommentById', { id: productId });
  }, [productId, selectedProduct, productsData, t]);

  const leadSource = productId ? 'boutique' : 'contacts';

  useEffect(() => {
    if (!productId) return;
    formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [productId]);

  return (
    <>
      <Meta
        title={t('contacts.title')}
        description={t('contacts.subtitle')}
        path={ROUTES.contacts}
      />
      <section className="container space-y-6 py-12 md:py-20 text-center">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.3em]">
          <Sparkles className="h-3 w-3" /> Contacts
        </Badge>
        <h1 className="font-display text-4xl md:text-6xl">{t('contacts.title')}</h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">{t('contacts.subtitle')}</p>
      </section>

      <section className="container grid gap-6 pb-20 lg:grid-cols-12">
        <Card className="lg:col-span-5 border-border/40 bg-card/70 backdrop-blur">
          <CardContent className="space-y-6 p-8">
            <ContactRow
              icon={<MapPin className="h-5 w-5" />}
              title={t('contacts.addressLabel')}
              text={isRu ? SITE.address.ru : SITE.address.en}
            />
            <ContactRow
              icon={<Clock className="h-5 w-5" />}
              title={t('contacts.scheduleLabel')}
              text={isRu ? SITE.schedule.ru : SITE.schedule.en}
            />
            <ContactRow
              icon={<Phone className="h-5 w-5" />}
              title={t('contacts.phoneLabel')}
              text={
                <span className="space-y-1">
                  <a
                    className="block hover:text-primary"
                    href={`tel:${SITE.phonePrimary.replace(/\D/g, '')}`}
                  >
                    {SITE.phonePrimary}
                  </a>
                  <a
                    className="block hover:text-primary"
                    href={`tel:${SITE.phoneSecondary.replace(/\D/g, '')}`}
                  >
                    {SITE.phoneSecondary}
                  </a>
                </span>
              }
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <Button asChild variant="outline">
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
                  <Send className="h-4 w-4" /> {t('contacts.whatsapp')}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={SITE.telegram} target="_blank" rel="noreferrer">
                  <Send className="h-4 w-4" /> {t('contacts.telegram')}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card ref={formCardRef} className="lg:col-span-7 border-border/40 bg-card/70 backdrop-blur">
          <CardContent className="space-y-4 p-8">
            <h2 className="font-display text-2xl">
              {productId ? t('common.cta.buy') : t('common.cta.bookCall')}
            </h2>
            {selectedProduct ? (
              <p className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                {t('contacts.selectedProductHint', { name: selectedProduct.name })}
              </p>
            ) : null}
            <LeadForm
              key={productId ?? 'contacts'}
              source={leadSource}
              ctaLabel={productId ? t('common.cta.buy') : t('common.cta.bookCall')}
              comment={leadComment}
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-12">
          <Card className="overflow-hidden border-border/40 bg-card/40 backdrop-blur">
            <CardContent className="p-0">
              <div
                className="relative h-72 w-full bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/images/collections/datacenter.jpg)',
                }}
              >
                <div className="absolute inset-0 bg-navy-950/50" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="space-y-2 rounded-2xl bg-navy-950/70 px-6 py-4 text-white backdrop-blur">
                    <MapPin className="mx-auto h-6 w-6 text-primary" />
                    <p className="text-sm">{isRu ? SITE.address.ru : SITE.address.en}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary">Mock map preview</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

const ContactRow = ({
  icon,
  title,
  text,
}: {
  icon: JSX.Element;
  title: string;
  text: ReactNode;
}): JSX.Element => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
      {icon}
    </span>
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <p className="text-sm font-medium text-foreground">{text}</p>
    </div>
  </div>
);
