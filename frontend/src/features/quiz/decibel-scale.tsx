import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Headphones, Volume1, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  playDecibelPreview,
  resumeDecibelAudio,
  stopDecibelPreview,
} from '@/features/quiz/decibel-preview-audio';

export const DecibelScale = (): JSX.Element => {
  const { t } = useTranslation();

  useEffect(() => {
    return (): void => {
      stopDecibelPreview();
    };
  }, []);

  return (
    <div className="grid gap-4 rounded-2xl border border-primary/15 bg-card/60 p-5 backdrop-blur md:grid-cols-2">
      <DecibelRow
        intensity={0.95}
        value={85}
        label={t('quiz.decibels.raw')}
        compare={t('quiz.decibels.rawCompare')}
        tone="loud"
        playLabel={t('quiz.decibels.playSample')}
      />
      <DecibelRow
        intensity={0.55}
        value={55}
        label={t('quiz.decibels.cased')}
        compare={t('quiz.decibels.casedCompare')}
        tone="quiet"
        playLabel={t('quiz.decibels.playSample')}
      />
    </div>
  );
};

const DecibelRow = ({
  intensity,
  value,
  label,
  compare,
  tone,
  playLabel,
}: {
  intensity: number;
  value: number;
  label: string;
  compare: string;
  tone: 'loud' | 'quiet';
  playLabel: string;
}): JSX.Element => {
  const Icon = tone === 'loud' ? Volume2 : Volume1;

  return (
    <div className="space-y-2 rounded-xl border border-border/40 bg-background/40 p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
        <span className={tone === 'loud' ? 'text-destructive' : 'text-primary'}>
          <Icon className="mr-1 inline h-4 w-4" /> {label}
        </span>
        <span className="font-mono text-base font-semibold">{value} дБ</span>
      </div>
      <div className="relative h-4 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${intensity * 100}%` }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className={
            tone === 'loud'
              ? 'h-full rounded-full bg-gradient-to-r from-destructive/60 via-destructive to-destructive'
              : 'h-full rounded-full bg-gold-gradient'
          }
        />
        <div
          aria-hidden
          className="absolute inset-0 flex items-center"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0 2px, transparent 2px 12px)',
          }}
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="min-w-0 flex-1 text-sm text-muted-foreground">{compare}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 gap-1.5 border-primary/25 text-xs font-semibold uppercase tracking-wide"
          aria-label={`${playLabel}: ${label}`}
          onClick={() => {
            void (async (): Promise<void> => {
              await resumeDecibelAudio();
              playDecibelPreview(tone);
            })();
          }}
        >
          <Headphones className="h-3.5 w-3.5" aria-hidden />
          {playLabel}
        </Button>
      </div>
    </div>
  );
};
