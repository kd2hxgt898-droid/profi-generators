import {
  Cpu,
  Flame,
  Lightbulb,
  Refrigerator,
  Server,
  Snowflake,
  Tv,
  Utensils,
  Wifi,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SVGProps } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type SvgIcon = LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element);

/** Вода и насос — отдельная иконка насоса (в lucide нет Pump). */
const WaterPumpIcon = ({ className, ...props }: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className={className}
    {...props}
  >
    <path d="M12 3v3.5" />
    <path d="M8.5 6.5h7a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1Z" />
    <path d="M16.5 12H19a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1.5" />
    <path d="M5 12h3.5" />
    <path d="M20 14h1" />
    <path d="M11 14h2" />
  </svg>
);

const ICONS: Record<string, SvgIcon> = {
  light: Lightbulb,
  cold: Refrigerator,
  water: WaterPumpIcon,
  heat: Flame,
  wifi: Wifi,
  kitchen: Utensils,
  tv: Tv,
  ac: Snowflake,
  pos: Cpu,
  machine: Wrench,
  server: Server,
};

type Props = {
  items: ReadonlyArray<string>;
  className?: string;
};

export const CoverageIcons = ({ items, className }: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn('flex flex-wrap gap-1.5', className)}>
        {items.map((key) => {
          const Icon = ICONS[key] ?? Lightbulb;
          const label = t(`boutique.coverageItems.${key}`, { defaultValue: key });
          const hint = t(`boutique.coverageHints.${key}`, { defaultValue: label });
          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary',
                    'transition-colors hover:border-primary/45 hover:bg-primary/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  )}
                  aria-label={hint}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">{hint}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};
