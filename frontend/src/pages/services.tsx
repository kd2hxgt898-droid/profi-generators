import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Headphones,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Meta } from '@/components/seo/meta';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

const ICONS: ReadonlyArray<LucideIcon> = [
  Briefcase,
  Zap,
  ShieldCheck,
  Wrench,
  Headphones,
  Truck,
];

export const ServicesPage = (): JSX.Element => {
  const { t } = useTranslation();
  const items = (t('services.items', { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>);

  return (
    <>
      <Meta
        title={t('services.title')}
        description={t('services.subtitle')}
        path={ROUTES.services}
      />
      <section className="container space-y-8 py-12 md:py-20 text-center">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.3em]">
          <Sparkles className="h-3 w-3" /> Profi services
        </Badge>
        <h1 className="font-display text-4xl md:text-6xl">{t('services.title')}</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">{t('services.subtitle')}</p>
      </section>

      <section className="container grid gap-5 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => {
          const Icon = ICONS[idx] ?? Sparkles;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <Card className="h-full border-border/40 bg-card/70 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-gold">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </section>

      <section className="container pb-24">
        <Card className="overflow-hidden border-primary/40 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-navy-50 shadow-gold-lg">
          <CardContent className="grid gap-6 p-10 md:grid-cols-[1fr,auto] md:items-center">
            <div className="space-y-3">
              <Badge variant="gold" className="uppercase tracking-[0.2em]">B2B</Badge>
              <h3 className="font-display text-3xl md:text-4xl text-white">
                Энергоаудит для бизнеса бесплатно
              </h3>
              <p className="max-w-xl text-base text-navy-100/85">
                Запросите выезд инженера: проверим щитовое оборудование, оценим пусковые токи и
                подберём решение под ваш ритейл, производство или дата-центр.
              </p>
            </div>
            <Button asChild size="xl">
              <Link to={ROUTES.contacts}>
                {t('common.cta.requestB2B')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
