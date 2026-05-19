import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

const TRACK_W = 300;
const TRACK_H = 74;
const PAD = 7;
const KNOB = 60;

type Props = {
  isOn: boolean;
  onCommitOn: () => void;
  onPrimeAudio: () => void;
  offLabel: string;
  onLabel: string;
  swipeHint: string;
  reduceMotion: boolean;
};

export function CalmSwitch({
  isOn,
  onCommitOn,
  onPrimeAudio,
  offLabel,
  onLabel,
  swipeHint,
  reduceMotion,
}: Props): JSX.Element {
  const maxX = TRACK_W - KNOB - PAD * 2;
  const x = useMotionValue(0);

  useEffect(() => {
    const target = isOn ? maxX : 0;
    const controls = animate(x, target, {
      ...(reduceMotion
        ? { type: 'tween' as const, duration: 0.2, ease: 'easeOut' }
        : { type: 'spring' as const, stiffness: 420, damping: 34 }),
    });
    return (): void => {
      controls.stop();
    };
  }, [isOn, maxX, reduceMotion, x]);

  const handleDragEnd = (): void => {
    if (isOn) return;
    const threshold = maxX * 0.42;
    if (x.get() >= threshold) {
      onCommitOn();
    } else {
      void animate(x, 0, {
        ...(reduceMotion
          ? { type: 'tween' as const, duration: 0.18 }
          : { type: 'spring' as const, stiffness: 400, damping: 30 }),
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="max-w-xs text-center text-xs text-navy-100/80 md:hidden">{swipeHint}</p>
      <div
        className="relative touch-pan-y"
        style={{ width: TRACK_W, height: TRACK_H }}
        onPointerDown={() => {
          onPrimeAudio();
        }}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full border-2 border-navy-600/90',
            'bg-gradient-to-b from-navy-700/95 via-navy-900/98 to-navy-950',
            'shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] ring-1 ring-white/10',
          )}
          aria-hidden
        />
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold tracking-[0.2em] text-white/40 md:left-4">
          {offLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold tracking-[0.2em] text-emerald-400/45 md:right-4">
          {onLabel}
        </span>

        <motion.button
          type="button"
          tabIndex={0}
          aria-pressed={isOn}
          aria-label={`${offLabel} — ${onLabel}`}
          disabled={isOn}
          drag={isOn ? false : 'x'}
          dragConstraints={{ left: 0, right: maxX }}
          dragElastic={0.05}
          dragMomentum={false}
          style={{
            x,
            width: KNOB,
            height: KNOB,
            top: PAD,
            left: PAD,
            touchAction: isOn ? 'auto' : 'none',
          }}
          className={cn(
            'absolute flex items-center justify-center rounded-full border-2 shadow-xl outline-none',
            'border-amber-200/35 bg-gradient-to-b from-amber-50 to-amber-200/95',
            'cursor-grab shadow-black/40 active:cursor-grabbing',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
            isOn &&
              'cursor-default border-emerald-300/55 from-emerald-50 to-emerald-200/90 shadow-[0_0_28px_rgba(52,211,153,0.35)]',
          )}
          onPointerDown={() => {
            onPrimeAudio();
          }}
          onTap={() => {
            if (!isOn) {
              onPrimeAudio();
              onCommitOn();
            }
          }}
          onKeyDown={(e) => {
            if (isOn) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPrimeAudio();
              onCommitOn();
            }
          }}
          onDragEnd={handleDragEnd}
        >
          <span className="h-5 w-5 rounded-full bg-gradient-to-br from-white/60 to-amber-400/40 shadow-inner" />
        </motion.button>
      </div>
    </div>
  );
}
