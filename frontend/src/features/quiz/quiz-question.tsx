import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type QuizOption<T extends string> = {
  value: T;
  labelKey: string;
  hintKey: string;
};

type Props<T extends string> = {
  questionKey: string;
  options: ReadonlyArray<QuizOption<T>>;
  value: T | undefined;
  onSelect: (value: T) => void;
  extra?: JSX.Element;
};

export const QuizQuestion = <T extends string>({
  questionKey,
  options,
  value,
  onSelect,
  extra,
}: Props<T>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-3xl md:text-4xl">
          {t(`quiz.questions.${questionKey}.title`)}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(`quiz.questions.${questionKey}.helper`)}
        </p>
      </div>

      <div className="grid gap-3">
        {options.map((option, idx) => {
          const isActive = value === option.value;
          return (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'group rounded-2xl border p-5 text-left transition-all duration-200',
                isActive
                  ? 'border-primary bg-primary/10 shadow-gold'
                  : 'border-border/60 bg-card/60 hover:border-primary/50 hover:bg-primary/5',
              )}
            >
              <div className="flex items-start gap-4">
                <span
                  className={cn(
                    'mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors',
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground group-hover:border-primary',
                  )}
                >
                  {idx + 1}
                </span>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-foreground">
                    {t(`quiz.questions.${questionKey}.options.${option.labelKey}.label`)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(`quiz.questions.${questionKey}.options.${option.labelKey}.hint`)}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {extra}

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex items-start gap-3 p-4">
          <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-navy-900">
            <Lightbulb className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {t('quiz.microTip')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t(`quiz.questions.${questionKey}.tip`)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
