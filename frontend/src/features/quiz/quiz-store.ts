import { create } from 'zustand';
import type { QuizAnswers } from '@/types/api';

export type QuizStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type QuizState = {
  step: QuizStep;
  answers: Partial<QuizAnswers>;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  goNext: () => void;
  goBack: () => void;
  goToStep: (step: QuizStep) => void;
  reset: () => void;
  isComplete: () => boolean;
  asAnswers: () => QuizAnswers | null;
};

const TOTAL_STEPS: QuizStep = 6;

export const useQuizStore = create<QuizState>((set, get) => ({
  step: 0,
  answers: {},
  setAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    })),
  goNext: () =>
    set((state) => ({
      step: Math.min(TOTAL_STEPS, state.step + 1) as QuizStep,
    })),
  goBack: () =>
    set((state) => ({
      step: Math.max(0, state.step - 1) as QuizStep,
    })),
  goToStep: (step) => set({ step }),
  reset: () => set({ step: 0, answers: {} }),
  isComplete: () => {
    const { answers } = get();
    return (
      answers.object !== undefined &&
      answers.load !== undefined &&
      answers.gas !== undefined &&
      answers.neighbours !== undefined &&
      answers.placement !== undefined &&
      answers.start !== undefined
    );
  },
  asAnswers: () => {
    const { answers } = get();
    if (
      answers.object &&
      answers.load &&
      answers.gas &&
      answers.neighbours &&
      answers.placement &&
      answers.start
    ) {
      return {
        object: answers.object,
        load: answers.load,
        gas: answers.gas,
        neighbours: answers.neighbours,
        placement: answers.placement,
        start: answers.start,
      };
    }
    return null;
  },
}));

export const TOTAL_QUIZ_STEPS = TOTAL_STEPS;
