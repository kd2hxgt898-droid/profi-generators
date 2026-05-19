import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  playSilenceLevelPreview,
  resumeSilencePreviewAudio,
  stopSilenceLevelPreview,
} from '@/features/boutique/silence-level-preview-audio';

type Props = {
  level: 1 | 2 | 3;
  className?: string;
  /** Кнопка короткого синтетического превью (Web Audio). */
  playable?: boolean;
};

export const SilenceMeter = ({ level, className, playable = false }: Props): JSX.Element => {
  const { t } = useTranslation();
  const icons = [VolumeX, Volume1, Volume2];
  const label = t('boutique.silenceMeter.ariaLevel', { level });

  useEffect(() => {
    return (): void => {
      stopSilenceLevelPreview();
    };
  }, []);

  const meterIcons = (
    <>
      {icons.map((Icon, i) => {
        const active = i + 1 <= 4 - level;
        return (
          <Icon
            key={i}
            className={cn(
              'h-4 w-4 transition-colors',
              active ? 'text-primary' : 'text-muted-foreground/30',
            )}
            strokeWidth={active ? 2.4 : 1.6}
          />
        );
      })}
    </>
  );

  if (!playable) {
    return (
      <div className={cn('flex items-center gap-1', className)} aria-label={label}>
        {meterIcons}
      </div>
    );
  }

  const play = (): void => {
    void (async (): Promise<void> => {
      await resumeSilencePreviewAudio();
      playSilenceLevelPreview(level);
    })();
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3',
        className,
      )}
    >
      <div className="flex items-center gap-1" aria-label={label}>
        {meterIcons}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 w-fit shrink-0 gap-1.5 text-xs"
        onClick={play}
      >
        <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
        {t('boutique.silenceListen')}
      </Button>
    </div>
  );
};
