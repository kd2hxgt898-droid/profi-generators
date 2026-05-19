import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { Hero } from '@/features/hero/hero';
import { KristovskyRibbon } from '@/features/social-proof/kristovsky-ribbon';
import { UspGrid } from '@/features/usp/usp-grid';
import { HomeCatalog } from '@/features/home/home-catalog';
import { Testimonials } from '@/features/testimonials/testimonials';
import { HomeFaqSection } from '@/features/faq/home-faq-section';
import { useFaq } from '@/api/hooks';
import { Meta } from '@/components/seo/meta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES, SITE, HERO_HOUSE } from '@/lib/constants';

export const HomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const { data: faqData } = useFaq();
  const faqItems = faqData?.items;

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://profi-generators.ru/#organization',
    name: t('brand.name'),
    description: t('hero.subtitle'),
    image: `https://profi-generators.ru${HERO_HOUSE.light}`,
    telephone: SITE.phonePrimary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Логвиненко, к.1401, офис 105',
      addressLocality: 'Зеленоград',
      addressRegion: 'Москва',
      postalCode: '124489',
      addressCountry: 'RU',
    },
    foundingDate: '2013',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  };

  const faqJsonLd = useMemo((): Record<string, unknown> | null => {
    if (!faqItems?.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }, [faqItems]);

  const homeJsonLd = faqJsonLd ? [orgJsonLd, faqJsonLd] : orgJsonLd;

  const steps = (t('steps.items', { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>);

  return (
    <>
      <Meta
        title={t('brand.name')}
        description={t('hero.subtitle')}
        path={ROUTES.home}
        jsonLd={homeJsonLd}
      />
      <Hero />
      <KristovskyRibbon />
      <UspGrid />
      <HomeCatalog />

      <section className="relative overflow-hidden border-y border-border/40 bg-card/40 py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="outline" className="text-xs uppercase tracking-[0.3em]">
              <Sparkles className="h-3 w-3" /> {t('steps.eyebrow')}
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl">{t('steps.title')}</h2>
            <p className="text-base text-muted-foreground">
              Никаких сюрпризов в смете и сроках. Прозрачная коммуникация на каждом этапе и опытные
              инженерные бригады с 2013 года.
            </p>
            <Button asChild>
              <Link to={ROUTES.quiz}>
                {t('common.cta.pickGenerator')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="lg:col-span-7 grid gap-4 md:grid-cols-3">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Card className="h-full border-border/40 bg-background/60">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-navy-900 font-bold">
                      {idx + 1}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="container pb-24">
        <Card className="overflow-hidden border-primary/40 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-navy-50 shadow-gold-lg">
          <CardContent className="grid gap-8 p-8 md:grid-cols-[1fr,auto] md:p-12">
            <div className="space-y-4">
              <Quote className="h-8 w-8 text-primary" />
              <h3 className="font-display text-3xl text-white md:text-4xl">
                Не уверены, какое решение нужно? Пройдите квиз — получите расчёт за 60 секунд.
              </h3>
              <p className="max-w-xl text-base text-navy-100/80">
                Мы соберём 3 готовых сценария «под ключ»: эконом, оптимальный и премиум. Бесплатно,
                без обязательств. После контакта пришлём в мессенджер чек-лист «7 фатальных ошибок».
              </p>
            </div>
            <div className="flex flex-col gap-3 self-end md:items-end">
              <Button asChild size="xl" className="animate-pulse-gold">
                <Link to={ROUTES.quiz}>
                  <ShieldCheck className="h-5 w-5" />
                  {t('common.cta.pickGenerator')}
                </Link>
              </Button>
              <Button
                asChild
                variant="glass"
                size="lg"
                className="border-white/35 bg-white/15 text-white shadow-md backdrop-blur-md hover:bg-white/25 hover:text-white [&_svg]:text-primary"
              >
                <Link to={ROUTES.boutique}>
                  <Wrench className="h-4 w-4" />
                  {t('nav.boutique')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <HomeFaqSection />
    </>
  );
};
