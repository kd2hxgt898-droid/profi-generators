import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Pause, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const KristovskyRibbon = (): JSX.Element => {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState<boolean>(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className="border-y border-primary/15 bg-navy-950/85"
    >
      <div className="container flex flex-col items-center justify-between gap-5 py-5 md:flex-row md:gap-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="/images/avatars/kristovskiy.png"
              alt="Сергей Крестовский"
              className="h-14 w-14 rounded-full border-2 border-primary/60 object-cover"
              loading="lazy"
            />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-gradient text-navy-900 shadow-gold">
              <Star className="h-3.5 w-3.5" fill="currentColor" />
            </span>
          </div>
          <div className="space-y-0.5">
            <p className="font-display text-lg leading-tight text-white">
              {t('ribbon.line1')}{' '}
              <span className="text-gold-gradient italic">{t('ribbon.line2')}</span>
            </p>
            <p className="text-sm text-navy-100/80">{t('ribbon.line3')}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-primary/40 text-white hover:bg-primary/10"
          onClick={() => setPlaying((v) => !v)}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {t('ribbon.listen')}
        </Button>
      </div>
    </motion.section>
  );
};
