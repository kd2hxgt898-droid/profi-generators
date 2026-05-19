import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Meta } from '@/components/seo/meta';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { QuizMachine } from '@/features/quiz/quiz-machine';
import { ROUTES } from '@/lib/constants';

export const QuizPage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Meta
        title={t('quiz.pageTitle')}
        description={t('quiz.pageSubtitle')}
        path={ROUTES.quiz}
      />
      <section className="container max-w-4xl space-y-8 py-12 md:py-20">
        <header className="space-y-3 text-center">
          <Badge variant="outline" className="text-xs uppercase tracking-[0.3em]">
            <Sparkles className="h-3 w-3" /> {t('quiz.badge')}
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl">{t('quiz.pageTitle')}</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">{t('quiz.pageSubtitle')}</p>
        </header>
        <Card className="border-border/50 bg-card/70 backdrop-blur">
          <CardContent className="p-6 md:p-10">
            <QuizMachine />
          </CardContent>
        </Card>
      </section>
    </>
  );
};
