import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { TOTAL_QUIZ_STEPS, useQuizStore } from './quiz-store';
import { QuizQuestion } from './quiz-question';
import type { QuizOption } from './quiz-question';
import { DecibelScale } from './decibel-scale';
import { QuizResult } from './quiz-result';
import type { QuizAnswers } from '@/types/api';
import { useQuizRecommend } from '@/api/hooks';

const OBJECTS: ReadonlyArray<QuizOption<QuizAnswers['object']>> = [
  { value: 'home', labelKey: 'home', hintKey: 'home' },
  { value: 'business', labelKey: 'business', hintKey: 'business' },
  { value: 'industry', labelKey: 'industry', hintKey: 'industry' },
];
const LOADS: ReadonlyArray<QuizOption<QuizAnswers['load']>> = [
  { value: 'minimum', labelKey: 'minimum', hintKey: 'minimum' },
  { value: 'comfort', labelKey: 'comfort', hintKey: 'comfort' },
  { value: 'maximum', labelKey: 'maximum', hintKey: 'maximum' },
];
const GAS: ReadonlyArray<QuizOption<QuizAnswers['gas']>> = [
  { value: 'none', labelKey: 'none', hintKey: 'none' },
  { value: 'mainline', labelKey: 'mainline', hintKey: 'mainline' },
  { value: 'tank', labelKey: 'tank', hintKey: 'tank' },
];
const NEIGHBOURS: ReadonlyArray<QuizOption<QuizAnswers['neighbours']>> = [
  { value: 'dense', labelKey: 'dense', hintKey: 'dense' },
  { value: 'industrial', labelKey: 'industrial', hintKey: 'industrial' },
  { value: 'spacious', labelKey: 'spacious', hintKey: 'spacious' },
];
const PLACEMENTS: ReadonlyArray<QuizOption<QuizAnswers['placement']>> = [
  { value: 'outside', labelKey: 'outside', hintKey: 'outside' },
  { value: 'inside', labelKey: 'inside', hintKey: 'inside' },
  { value: 'shed', labelKey: 'shed', hintKey: 'shed' },
  { value: 'consult', labelKey: 'consult', hintKey: 'consult' },
];
const STARTS: ReadonlyArray<QuizOption<QuizAnswers['start']>> = [
  { value: 'remote', labelKey: 'remote', hintKey: 'remote' },
  { value: 'manual', labelKey: 'manual', hintKey: 'manual' },
  { value: 'auto', labelKey: 'auto', hintKey: 'auto' },
];

export const QuizMachine = (): JSX.Element => {
  const { t } = useTranslation();
  const { step, answers, setAnswer, goNext, goBack, reset, asAnswers } = useQuizStore();
  const recommendMutation = useQuizRecommend();
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (step === TOTAL_QUIZ_STEPS && !submitted) {
      const completed = asAnswers();
      if (completed) {
        recommendMutation
          .mutateAsync(completed)
          .then(() => setSubmitted(true))
          .catch(() => setSubmitted(true));
      }
    }
  }, [step, submitted, asAnswers, recommendMutation]);

  if (step === TOTAL_QUIZ_STEPS) {
    return (
      <QuizResult
        loading={recommendMutation.isPending}
        note={recommendMutation.data?.note}
        onRestart={() => {
          reset();
          setSubmitted(false);
          recommendMutation.reset();
        }}
      />
    );
  }

  const progressPercent = (step / TOTAL_QUIZ_STEPS) * 100;
  const canNext = isAnsweredForStep(step, answers);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>{t('quiz.progress', { current: step + 1, total: TOTAL_QUIZ_STEPS })}</span>
          <span className="text-primary">{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} />
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {step === 0 ? (
          <QuizQuestion
            questionKey="q1"
            options={OBJECTS}
            value={answers.object}
            onSelect={(value) => setAnswer('object', value)}
          />
        ) : null}
        {step === 1 ? (
          <QuizQuestion
            questionKey="q2"
            options={LOADS}
            value={answers.load}
            onSelect={(value) => setAnswer('load', value)}
          />
        ) : null}
        {step === 2 ? (
          <QuizQuestion
            questionKey="q3"
            options={GAS}
            value={answers.gas}
            onSelect={(value) => setAnswer('gas', value)}
          />
        ) : null}
        {step === 3 ? (
          <QuizQuestion
            questionKey="q4"
            options={NEIGHBOURS}
            value={answers.neighbours}
            onSelect={(value) => setAnswer('neighbours', value)}
            extra={<DecibelScale />}
          />
        ) : null}
        {step === 4 ? (
          <QuizQuestion
            questionKey="q5"
            options={PLACEMENTS}
            value={answers.placement}
            onSelect={(value) => setAnswer('placement', value)}
          />
        ) : null}
        {step === 5 ? (
          <QuizQuestion
            questionKey="q6"
            options={STARTS}
            value={answers.start}
            onSelect={(value) => setAnswer('start', value)}
            extra={<KristovskyHint />}
          />
        ) : null}
      </motion.div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={goBack} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4" />
          {t('common.cta.back')}
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button onClick={goNext} disabled={!canNext} size="lg">
            {t('common.cta.next')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const KristovskyHint = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-navy-900 to-navy-800 text-navy-50">
      <CardContent className="flex items-start gap-3 p-4">
        <img
          src="/images/avatars/kristovskiy.png"
          alt="Сергей Крестовский"
          className="h-10 w-10 rounded-full border border-primary/40 object-cover"
          loading="lazy"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-primary">
            <Star className="h-3 w-3" fill="currentColor" />
            <span className="uppercase tracking-[0.2em]">Uma2rman</span>
          </div>
          <p className="text-sm leading-relaxed text-navy-100/85">
            {t('quiz.result.socialProof')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const isAnsweredForStep = (step: number, answers: Partial<QuizAnswers>): boolean => {
  switch (step) {
    case 0:
      return answers.object !== undefined;
    case 1:
      return answers.load !== undefined;
    case 2:
      return answers.gas !== undefined;
    case 3:
      return answers.neighbours !== undefined;
    case 4:
      return answers.placement !== undefined;
    case 5:
      return answers.start !== undefined;
    default:
      return false;
  }
};
