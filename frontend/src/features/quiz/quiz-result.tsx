import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { LeadForm } from '@/features/lead/lead-form';

type Props = {
  loading: boolean;
  note?: string;
  onRestart: () => void;
};

export const QuizResult = ({ loading, note, onRestart }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState<boolean>(false);

  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge variant="gold" className="uppercase tracking-[0.2em]">
          <Sparkles className="h-3 w-3" /> {t('quiz.result.title')}
        </Badge>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">{t('quiz.result.subtitle')}</h2>
        {note ? <p className="mt-2 text-sm text-muted-foreground">{note}</p> : null}
      </div>

      {loading ? (
        <Skeleton className="mx-auto h-80 max-w-2xl rounded-2xl" />
      ) : (
        <Card className="mx-auto max-w-2xl border-border/50">
          <CardHeader>
            <CardTitle>{t('quiz.result.formTitle')}</CardTitle>
            <p className="text-sm text-muted-foreground">{t('quiz.result.formSubtitle')}</p>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <SuccessState />
            ) : (
              <LeadForm
                source="quiz"
                ctaLabel={t('common.cta.getCalculation')}
                onSubmitted={() => setSubmitted(true)}
              />
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button variant="ghost" size="sm" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          {t('quiz.result.restart')}
        </Button>
      </div>
    </div>
  );
};

const SuccessState = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
      <h4 className="font-display text-2xl">{t('quiz.result.successTitle')}</h4>
      <p className="text-sm text-muted-foreground">{t('quiz.result.successText')}</p>
    </div>
  );
};
