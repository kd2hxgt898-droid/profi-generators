import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';
import { Meta } from '@/components/seo/meta';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';

export const AboutPage = (): JSX.Element => {
  const { t } = useTranslation();
  const metrics = (t('about.metrics', { returnObjects: true }) as Array<{
    value: string;
    label: string;
  }>);

  return (
    <>
      <Meta
        title={t('about.title')}
        description={t('about.subtitle')}
        path={ROUTES.about}
      />
      <section className="container space-y-6 py-12 md:py-20 text-center">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.3em]">
          <Sparkles className="h-3 w-3" /> Profi DNA
        </Badge>
        <h1 className="font-display text-4xl md:text-6xl">{t('about.title')}</h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">{t('about.subtitle')}</p>
      </section>

      <section className="container grid gap-4 pb-12 md:grid-cols-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <Card className="border-border/40 bg-card/60 text-center backdrop-blur">
              <CardContent className="space-y-2 p-6">
                <p className="font-display text-4xl text-primary">{metric.value}</p>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  {metric.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="container pb-20">
        <Card className="border-border/40 bg-card/60 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('about.description')}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="container pb-24">
        <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-navy-50 shadow-gold-lg">
          <CardContent className="grid gap-8 p-8 md:grid-cols-[auto,1fr] md:p-12">
            <img
              src="/images/avatars/kristovskiy.png"
              alt="Сергей Крестовский"
              className="h-48 w-48 rounded-2xl border border-primary/40 object-cover shadow-gold"
              loading="lazy"
            />
            <div className="space-y-3">
              <Badge variant="gold" className="uppercase tracking-[0.2em]">
                {t('about.caseTitle')}
              </Badge>
              <Quote className="h-8 w-8 text-primary" />
              <p className="font-display text-2xl leading-relaxed text-pretty md:text-3xl">
                «{t('about.caseText')}»
              </p>
              <p className="text-sm text-navy-100/70">
                Сергей Крестовский, музыкант группы Uma2rman
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
