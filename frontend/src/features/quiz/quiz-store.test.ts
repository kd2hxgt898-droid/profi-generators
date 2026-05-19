import { describe, expect, it, beforeEach } from 'vitest';
import { useQuizStore } from './quiz-store';

describe('quiz-store', () => {
  beforeEach(() => {
    useQuizStore.getState().reset();
  });

  it('starts at step 0 with empty answers', () => {
    const state = useQuizStore.getState();
    expect(state.step).toBe(0);
    expect(Object.keys(state.answers)).toHaveLength(0);
    expect(state.isComplete()).toBe(false);
  });

  it('advances and stores answer', () => {
    const { setAnswer, goNext } = useQuizStore.getState();
    setAnswer('object', 'home');
    goNext();
    const state = useQuizStore.getState();
    expect(state.answers.object).toBe('home');
    expect(state.step).toBe(1);
  });

  it('clamps backward step at 0', () => {
    useQuizStore.getState().goBack();
    expect(useQuizStore.getState().step).toBe(0);
  });

  it('treats only fully filled answers as complete', () => {
    const { setAnswer, asAnswers } = useQuizStore.getState();
    setAnswer('object', 'home');
    setAnswer('load', 'comfort');
    setAnswer('gas', 'mainline');
    setAnswer('neighbours', 'dense');
    setAnswer('placement', 'outside');
    setAnswer('start', 'auto');
    expect(useQuizStore.getState().isComplete()).toBe(true);
    expect(asAnswers()).toEqual({
      object: 'home',
      load: 'comfort',
      gas: 'mainline',
      neighbours: 'dense',
      placement: 'outside',
      start: 'auto',
    });
  });
});
