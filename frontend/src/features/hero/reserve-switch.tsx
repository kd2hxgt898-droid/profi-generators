import { useId, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Power, RadioTower, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type UiPhase = 'default' | 'post_demo';

type Props = {
  on: boolean;
  onChange: (next: boolean) => void;
  uiPhase?: UiPhase;
  demoCountdownActive?: boolean;
  countdownSeconds?: number | null;
};

const TRACK_WIDTH = 232;
const HANDLE_SIZE = 60;
const HANDLE_INSET = 6;
const HANDLE_TRAVEL = TRACK_WIDTH - HANDLE_SIZE - HANDLE_INSET * 2;

const BlackoutCountdownPanel = ({
  countdownSeconds,
  onChange,
}: {
  countdownSeconds: number;
  onChange: (next: boolean) => void;
}): JSX.Element => {
  const { t } = useTranslation();
  const labelId = useId();
  const launchId = useId();

  return (
    <div
      className={cn(
        'glass relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-primary/35 px-7 pb-7 pt-8 text-white shadow-gold-lg backdrop-blur-xl',
        'ring-1 ring-primary/25 shadow-[0_0_60px_rgba(242,198,116,0.22)]',
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(100% 80% at 20% 0%, rgba(212,162,76,0.2), transparent 55%), radial-gradient(80% 60% at 100% 100%, rgba(212,162,76,0.12), transparent 50%)',
        }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <p
          id={labelId}
          className="text-[10px] font-semibold uppercase tracking-[0.36em] text-primary"
        >
          {t('hero.lever.eyebrow')}
        </p>
        <span className="flex items-center gap-1.5 rounded-full border border-primary/45 bg-primary/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-gold" aria-hidden />
          {t('hero.lever.statusCountdown')}
        </span>
      </div>

      <h2 className="relative mt-4 font-hero text-[1.35rem] font-semibold uppercase leading-tight tracking-wide text-white md:text-2xl">
        {t('hero.lever.blackoutDetected')}
      </h2>
      <p className="relative mt-2 text-sm text-navy-100/80">{t('hero.lever.autoStartIn')}</p>

      <div className="relative mx-auto mt-8 flex w-full max-w-[308px] justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="absolute h-[4.5rem] w-[17.5rem] rounded-full border border-primary/45 animate-blackout-ring [animation-delay:0ms]"
            aria-hidden
          />
          <span
            className="absolute h-[4.5rem] w-[17.5rem] rounded-full border border-primary/35 animate-blackout-ring [animation-delay:700ms]"
            aria-hidden
          />
          <span
            className="absolute h-[4.5rem] w-[17.5rem] rounded-full border border-primary/25 animate-blackout-ring [animation-delay:1400ms]"
            aria-hidden
          />
        </div>

        <div
          className="relative flex h-[4.25rem] w-full overflow-hidden rounded-full border-2 border-primary/50 bg-navy-950/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          role="group"
          aria-labelledby={labelId}
        >
          <button
            type="button"
            id={launchId}
            className={cn(
              'flex shrink-0 items-center justify-center gap-2 bg-gold-gradient px-5 text-xs font-bold uppercase tracking-[0.2em] text-navy-900',
              'transition-transform hover:brightness-110 active:scale-[0.98]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
            )}
            onClick={() => onChange(true)}
            aria-label={t('hero.lever.launchShort')}
          >
            <Zap className="h-5 w-5 shrink-0" strokeWidth={2.6} />
            {t('hero.lever.launchShort')}
          </button>
          <div className="flex flex-1 items-center justify-center tabular-nums">
            <span className="font-display text-2xl font-bold tracking-tight text-white md:text-[1.75rem]">
              {countdownSeconds}
              <span className="text-lg font-semibold text-primary/90">s</span>
            </span>
          </div>
        </div>
      </div>

      <p className="relative mt-6 text-left text-[11px] leading-relaxed text-navy-100/50">
        {t('hero.lever.countdownFooterEn')}
      </p>
    </div>
  );
};

export const ReserveSwitch = ({
  on,
  onChange,
  uiPhase = 'default',
  demoCountdownActive = false,
  countdownSeconds = null,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [dragging, setDragging] = useState<boolean>(false);
  const dragStartX = useRef<number | null>(null);
  const dragMoved = useRef<boolean>(false);
  const trackId = useId();
  const labelId = useId();

  if (demoCountdownActive && countdownSeconds !== null && countdownSeconds > 0) {
    return <BlackoutCountdownPanel countdownSeconds={countdownSeconds} onChange={onChange} />;
  }

  const handleClick = (): void => {
    if (dragMoved.current) {
      dragMoved.current = false;
      return;
    }
    onChange(!on);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>): void => {
    dragStartX.current = event.clientX;
    dragMoved.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>): void => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    if (Math.abs(delta) > 6) dragMoved.current = true;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>): void => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);

    if (Math.abs(delta) > 24) {
      const next = delta > 0;
      if (next !== on) onChange(next);
    }
  };

  return (
    <div
      className={cn(
        'glass relative w-full max-w-[420px] overflow-hidden rounded-3xl px-6 pb-6 pt-7 text-white shadow-gold-lg backdrop-blur-xl transition-shadow duration-300',
        on ? 'border-primary/40' : 'border-destructive/30',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-700',
          on ? 'opacity-100' : 'opacity-30',
        )}
        style={{
          background:
            'radial-gradient(120% 80% at 80% 50%, rgba(212,162,76,0.28), transparent 60%)',
        }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <p
          id={labelId}
          className="text-[10px] font-semibold uppercase tracking-[0.34em] text-primary/85"
        >
          {t('hero.lever.eyebrow')}
        </p>
        <span
          className={cn(
            'flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
            on
              ? 'border-primary/40 bg-primary/15 text-primary'
              : 'border-destructive/40 bg-destructive/10 text-destructive',
          )}
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              on ? 'bg-primary shadow-gold' : 'bg-destructive',
            )}
            aria-hidden
          />
          {on
            ? uiPhase === 'post_demo'
              ? t('hero.lever.statusPostDemo')
              : t('hero.lever.statusOn')
            : t('hero.lever.statusOff')}
        </span>
      </div>

      <p className="relative mt-3 font-hero text-xl font-medium text-white">
        <AnimatePresence mode="wait">
          <motion.span
            key={on ? (uiPhase === 'post_demo' ? 'q-post' : 'q-on') : 'q-off'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {on
              ? uiPhase === 'post_demo'
                ? t('hero.lever.questionPostDemo')
                : t('hero.lever.questionRestored')
              : t('hero.lever.questionBlackout')}
          </motion.span>
        </AnimatePresence>
      </p>

      <div className="relative mt-5 flex flex-col items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-labelledby={labelId}
          aria-describedby={trackId}
          onClick={handleClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className={cn(
            'group relative flex h-[72px] items-center rounded-full border-2 border-white/10 transition-colors duration-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
            on ? 'bg-navy-950/80 shadow-gold' : 'bg-navy-950/85 shadow-inner',
          )}
          style={{ width: TRACK_WIDTH, cursor: dragging ? 'grabbing' : 'grab' }}
        >
          <span id={trackId} className="sr-only">
            {on
              ? uiPhase === 'post_demo'
                ? t('hero.lever.statusPostDemo')
                : t('hero.lever.statusOn')
              : t('hero.lever.statusOff')}
          </span>

          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 flex w-1/2 items-center justify-start pl-5 text-[11px] font-bold uppercase tracking-[0.28em] transition-colors duration-300"
            style={{ color: on ? 'rgba(255,255,255,0.42)' : 'rgba(248,113,113,0.85)' }}
          >
            {t('hero.lever.gridShort')}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 flex w-1/2 items-center justify-end pr-5 text-[11px] font-bold uppercase tracking-[0.28em] transition-colors duration-300"
            style={{ color: on ? 'rgba(242,198,116,0.95)' : 'rgba(255,255,255,0.42)' }}
          >
            {t('hero.lever.profiShort')}
          </span>

          <motion.span
            aria-hidden
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-navy-900',
              on
                ? 'bg-gold-gradient shadow-gold-lg'
                : 'bg-gradient-to-br from-destructive/90 to-destructive/70 text-white',
            )}
            style={{
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
              left: HANDLE_INSET,
            }}
            animate={{ x: on ? HANDLE_TRAVEL : 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          >
            {on ? (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full"
                animate={{ opacity: [0.55, 0.95, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 36px 10px rgba(242,198,116,0.55)' }}
              />
            ) : null}

            <AnimatePresence mode="wait">
              {on ? (
                <motion.span
                  key={uiPhase === 'post_demo' ? 'tower' : 'zap'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10"
                >
                  {uiPhase === 'post_demo' ? (
                    <RadioTower className="h-6 w-6" strokeWidth={2.6} />
                  ) : (
                    <Zap className="h-6 w-6" strokeWidth={2.6} />
                  )}
                </motion.span>
              ) : (
                <motion.span
                  key="power"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10"
                >
                  <Power className="h-6 w-6" strokeWidth={2.6} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        </button>

        <p className="text-[11px] uppercase tracking-[0.32em] text-navy-100/65">
          {on && uiPhase === 'post_demo' ? t('hero.lever.dragHintPostDemo') : t('hero.lever.dragHint')}
        </p>
      </div>

      <div className="relative mt-4 min-h-[44px] text-sm leading-relaxed text-navy-100/85">
        <AnimatePresence mode="wait">
          <motion.p
            key={on ? (uiPhase === 'post_demo' ? 'hint-post' : 'hint-on') : 'hint-off'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {on
              ? uiPhase === 'post_demo'
                ? t('hero.lever.hintPostDemo')
                : t('hero.lever.hintRestored')
              : t('hero.lever.hintBlackout')}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
