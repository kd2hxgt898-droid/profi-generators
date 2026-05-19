import { useTranslation } from 'react-i18next';
import { Building2, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Segment } from '@/types/api';

type Props = {
  segment: Segment;
  onChange: (segment: Segment) => void;
};

export const SegmentToggle = ({ segment, onChange }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="glass mx-auto inline-flex items-center rounded-full p-1.5 shadow-glass">
      <button
        type="button"
        onClick={() => onChange('home')}
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300',
          segment === 'home'
            ? 'bg-gold-gradient text-navy-900 shadow-gold'
            : 'text-foreground/80 hover:text-foreground',
        )}
      >
        <Home className="h-4 w-4" />
        {t('boutique.home')}
      </button>
      <button
        type="button"
        onClick={() => onChange('business')}
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300',
          segment === 'business'
            ? 'bg-gold-gradient text-navy-900 shadow-gold'
            : 'text-foreground/80 hover:text-foreground',
        )}
      >
        <Building2 className="h-4 w-4" />
        {t('boutique.business')}
      </button>
    </div>
  );
};
