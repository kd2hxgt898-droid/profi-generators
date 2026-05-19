import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LeadForm } from '@/features/lead/lead-form';

export const NotFoundBlock = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-16"
    >
      <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-navy-50 shadow-gold-lg">
        <CardContent className="grid items-stretch gap-0 p-0 lg:grid-cols-12">
          <div className="lg:col-span-5 relative">
            <img
              src="/images/avatars/avatar-engineer.jpg"
              alt={t('boutique.notFound.engineerName')}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 space-y-1 text-white">
              <Badge variant="gold">{t('boutique.notFound.engineerRole')}</Badge>
              <p className="font-display text-2xl">{t('boutique.notFound.engineerName')}</p>
            </div>
          </div>
          <div className="lg:col-span-7 p-8 md:p-12">
            <h3 className="font-display text-3xl text-white md:text-4xl">
              {t('boutique.notFound.title')}
            </h3>
            <p className="mt-3 max-w-xl text-base text-navy-100/85 md:text-lg">
              {t('boutique.notFound.text')}
            </p>
            <div className="mt-6">
              <LeadForm
                source="not_found"
                ctaLabel={t('boutique.notFound.cta')}
                comment="Бутик: «Не нашли свою модель»"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};
