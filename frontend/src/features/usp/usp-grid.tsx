import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type UspItem = {
  title: string;
  text: string;
};

export const UspGrid = (): JSX.Element => {
  const { t } = useTranslation();
  const items = t('usp.items', { returnObjects: true }) as UspItem[];
  const subtitle = t('usp.subtitle').trim();

  return (
    <section className="container py-20 md:py-28">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">{t('usp.eyebrow')}</p>
        <h2 className="font-display text-balance text-3xl leading-tight md:text-4xl lg:text-[2.75rem]">
          {t('usp.title')}
        </h2>
        {subtitle ? (
          <p className="mt-4 text-base text-muted-foreground">{t('usp.subtitle')}</p>
        ) : null}
      </div>

      <ul className="mx-auto grid max-w-5xl list-none gap-6 md:grid-cols-2 md:gap-8">
        {items.map((item, idx) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className="flex gap-4 rounded-2xl border border-border/40 bg-card/50 p-5 backdrop-blur md:gap-5 md:p-6"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-navy-900 shadow-gold md:h-11 md:w-11"
              aria-hidden
            >
              <Check className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
            </span>
            <div className="space-y-1.5 pt-0.5">
              <h3 className="font-display text-lg font-semibold leading-snug md:text-xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{item.text}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
