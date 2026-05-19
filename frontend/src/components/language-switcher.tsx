import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { SUPPORTED_LANGUAGES, type Language } from '@/i18n';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export const LanguageSwitcher = ({ className }: Props): JSX.Element => {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? 'ru') as Language;

  const next: Language = current === 'ru' ? 'en' : 'ru';
  const target = SUPPORTED_LANGUAGES.find((l) => l.code === next);

  const onClick = (): void => {
    void i18n.changeLanguage(next);
  };

  return (
    <Button
      variant="glass"
      size="sm"
      onClick={onClick}
      aria-label={`Change language to ${target?.label}`}
      className={cn('gap-2', className)}
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-semibold tracking-widest">{target?.flag ?? 'EN'}</span>
    </Button>
  );
};
