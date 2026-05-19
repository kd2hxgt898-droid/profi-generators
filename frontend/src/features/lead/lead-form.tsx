import { useId, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Loader2, Send } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useSubmitLead } from '@/api/hooks';
import { ROUTES } from '@/lib/constants';
import { toast } from '@/components/ui/use-toast';
import { formatPhone } from '@/lib/utils';
import type { LeadInput } from '@/types/api';

type Source = LeadInput['source'];

type Props = {
  source: Source;
  ctaLabel?: string;
  comment?: string;
  onSubmitted?: () => void;
};

export const LeadForm = ({ source, ctaLabel, comment, onSubmitted }: Props): JSX.Element => {
  const { t } = useTranslation();
  const submitMutation = useSubmitLead();
  const nameId = useId();
  const phoneId = useId();
  const consentId = useId();

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('leadForm.invalidName')),
        phone: z
          .string()
          .min(10, t('leadForm.invalidPhone'))
          .refine((value) => value.replace(/\D/g, '').length >= 10, t('leadForm.invalidPhone')),
        consent: z.literal<true>(true, {
          errorMap: () => ({ message: t('leadForm.requireConsent') }),
        }),
      }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', consent: false as unknown as true },
    mode: 'onTouched',
  });

  const onValid = async (values: FormValues): Promise<void> => {
    try {
      await submitMutation.mutateAsync({
        name: values.name,
        phone: values.phone,
        source,
        comment,
        consent: true,
      });
      toast({
        title: t('leadForm.successTitle'),
        description: t('leadForm.successDescription'),
        variant: 'success',
      });
      reset();
      onSubmitted?.();
    } catch {
      toast({
        title: t('leadForm.errorTitle'),
        description: t('leadForm.errorDescription'),
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValid)}
      className="space-y-4"
      aria-busy={submitMutation.isPending}
    >
      <div className="space-y-1.5">
        <Label htmlFor={nameId}>{t('leadForm.name')}</Label>
        <Input
          id={nameId}
          placeholder={t('leadForm.name')}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          {...register('name')}
        />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={phoneId}>{t('leadForm.phone')}</Label>
        <Input
          id={phoneId}
          type="tel"
          inputMode="tel"
          placeholder={t('leadForm.phonePlaceholder')}
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register('phone', {
            onChange: (event) => {
              const value: string = event.target.value;
              if (value.length >= 11) {
                setValue('phone', formatPhone(value), { shouldValidate: true });
              }
            },
          })}
        />
        {errors.phone ? (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        ) : null}
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id={consentId}
          onCheckedChange={(checked) => {
            setValue('consent', (checked === true ? true : false) as unknown as true, {
              shouldValidate: true,
            });
          }}
          aria-invalid={Boolean(errors.consent)}
        />
        <Label htmlFor={consentId} className="text-xs leading-snug text-muted-foreground">
          <Trans
            i18nKey="leadForm.consent"
            components={{
              link: (
                <Link
                  to={ROUTES.privacy}
                  className="text-primary underline-offset-2 hover:underline"
                />
              ),
            }}
          >
            {t('leadForm.consent')}
          </Trans>{' '}
          <Link to={ROUTES.privacy} className="text-primary underline-offset-2 hover:underline">
            {t('common.privacyLink')}
          </Link>
          .
        </Label>
      </div>
      {errors.consent ? (
        <p className="text-xs text-destructive">{errors.consent.message}</p>
      ) : null}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={submitMutation.isPending || isSubmitSuccessful}
      >
        {submitMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {submitMutation.isPending
          ? t('leadForm.submitting')
          : (ctaLabel ?? t('leadForm.submit'))}
      </Button>
    </form>
  );
};
