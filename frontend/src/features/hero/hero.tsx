import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HERO_HOUSE, ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HeroBackgroundCanvas } from '@/features/hero/hero-background-canvas';
import { CalmSwitch } from '@/features/hero/calm-switch';
import { createCalmSwitchAudio, type CalmSwitchAudio } from '@/features/hero/calm-switch-audio';

const AUTO_RESET_MS = 12_500;

export const Hero = (): JSX.Element => {
  const { t } = useTranslation();
  const prefersReduceMotion = useReducedMotion();

  const [powerOn, setPowerOn] = useState(false);
  const [showResetHint, setShowResetHint] = useState(false);

  const audioRef = useRef<CalmSwitchAudio | null>(null);
  const engageLockRef = useRef(false);
  const powerOnRef = useRef(false);

  useEffect(() => {
    powerOnRef.current = powerOn;
  }, [powerOn]);

  useEffect(() => {
    const a = createCalmSwitchAudio();
    audioRef.current = a;
    return () => {
      a.dispose();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!powerOn) {
      engageLockRef.current = false;
    }
  }, [powerOn]);

  useEffect(() => {
    if (!powerOn) return undefined;
    const id = window.setTimeout(() => {
      const a = audioRef.current;
      setPowerOn(false);
      setShowResetHint(true);
      a?.stopHum();
      a?.playVoltageDrop();
    }, AUTO_RESET_MS);
    return (): void => {
      window.clearTimeout(id);
    };
  }, [powerOn]);

  const primeAudio = useCallback(async (): Promise<void> => {
    const a = audioRef.current;
    if (!a) return;
    await a.resume();
  }, []);

  const handleCommitOn = useCallback((): void => {
    if (powerOn || engageLockRef.current) return;
    engageLockRef.current = true;
    const a = audioRef.current;
    void (async (): Promise<void> => {
      try {
        await a?.resume();
        a?.playClunk();
        a?.startHum();
        setPowerOn(true);
      } catch {
        engageLockRef.current = false;
      }
    })();
  }, [powerOn]);

  const crossFade = prefersReduceMotion ? 0.22 : 0.52;

  return (
    <section className="relative isolate min-h-[min(920px,94vh)] overflow-hidden">
      <h1 className="sr-only">
        {t('brand.name')} — {t('brand.tagline')}
      </h1>

      <HeroBackgroundCanvas src={HERO_HOUSE.dark} fit="cover" className="-z-20" />

      <motion.div
        className="absolute inset-0 -z-10 will-change-[opacity]"
        initial={false}
        animate={{ opacity: powerOn ? 1 : 0 }}
        transition={{ duration: crossFade, ease: 'easeInOut' }}
      >
        <HeroBackgroundCanvas src={HERO_HOUSE.light} fit="cover" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[6]"
        initial={false}
        animate={{ opacity: powerOn ? 1 : 0 }}
        transition={{ duration: crossFade * 0.95, ease: 'easeOut' }}
        style={{
          mixBlendMode: 'soft-light',
          backgroundImage: `radial-gradient(ellipse 44% 30% at 50% 36%, rgba(255,214,130,0.5) 0%, transparent 58%),
            radial-gradient(ellipse 36% 24% at 36% 42%, rgba(255,200,110,0.38) 0%, transparent 56%),
            radial-gradient(ellipse 38% 26% at 66% 34%, rgba(255,220,150,0.32) 0%, transparent 54%)`,
        }}
      />

      {!powerOn && !prefersReduceMotion ? (
        <div
          className="animate-moon-shimmer pointer-events-none absolute inset-0 -z-[7] bg-gradient-to-br from-slate-200/[0.07] via-transparent to-indigo-200/[0.06]"
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-t from-navy-950/88 via-navy-950/25 to-navy-950/35',
          powerOn && 'from-navy-950/72 via-navy-950/18',
        )}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute bottom-[13%] right-[5%] z-[2] md:bottom-[15%] md:right-[7%]"
        aria-hidden
      >
        <span
          className={cn(
            'block h-2.5 w-2.5 rounded-full',
            powerOn
              ? 'bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)]'
              : 'animate-pulse bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.95)]',
          )}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(920px,94vh)] max-w-2xl flex-col items-center justify-center px-4 py-24 md:py-28">
        <div className="w-full space-y-8 text-center">
          <p className="text-balance font-hero text-lg font-semibold leading-snug text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.85)] md:text-xl">
            {t('hero.calmSwitch.prompt')}
          </p>

          {showResetHint && !powerOn ? (
            <p className="animate-fade-in mx-auto max-w-lg text-balance bg-transparent px-4 py-3 text-base font-semibold leading-snug text-white md:px-5 md:py-3.5 [text-shadow:0_0_1px_rgba(0,0,0,0.9),0_1px_4px_rgba(0,0,0,0.85),0_2px_20px_rgba(0,0,0,0.65)]">
              {t('hero.calmSwitch.resetHint')}
            </p>
          ) : null}

          <CalmSwitch
            isOn={powerOn}
            onCommitOn={handleCommitOn}
            onPrimeAudio={() => {
              void primeAudio();
            }}
            offLabel={t('hero.calmSwitch.off')}
            onLabel={t('hero.calmSwitch.on')}
            swipeHint={t('hero.calmSwitch.swipeHint')}
            reduceMotion={prefersReduceMotion ?? false}
          />

          <AnimatePresence mode="wait">
            {powerOn ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: prefersReduceMotion ? 0.2 : 0.4 }}
                className="space-y-5 pt-2"
              >
                <p className="mx-auto max-w-md text-balance text-base font-medium leading-relaxed text-navy-50/95 [text-shadow:0_1px_18px_rgba(0,0,0,0.65)]">
                  {t('hero.calmSwitch.successLine')}
                </p>
                <p className="mx-auto max-w-md text-balance rounded-xl border border-primary/25 bg-navy-950/45 px-4 py-3 text-sm leading-snug text-amber-50/95 backdrop-blur-md">
                  {t('hero.calmSwitch.achievement')}
                </p>
                <div className="flex justify-center pt-1">
                  <Button
                    asChild
                    size="lg"
                    className="h-14 border border-primary/30 px-8 text-base shadow-gold"
                  >
                    <Link to={ROUTES.quiz}>
                      {t('hero.calmSwitch.cta')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
