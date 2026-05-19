import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone, Send, Zap } from 'lucide-react';
import { useBlackoutDemoUi } from '@/features/hero/blackout-demo-ui-context';
import { ROUTES, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const Footer = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const { isDimmingUi } = useBlackoutDemoUi();
  const isRu = i18n.resolvedLanguage === 'ru';

  return (
    <footer
      className={cn(
        'relative mt-24 border-t border-border/50 bg-navy-950 text-navy-100 transition-opacity duration-500',
        isDimmingUi && 'pointer-events-none opacity-[0.22]',
      )}
    >
      <div className="container grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-navy-900 shadow-gold">
              <Zap className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-2xl">{t('brand.name')}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-100/70">
            {t('footer.description')}
          </p>
        </div>

        <nav className="md:col-span-3">
          <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-primary/80">
            {t('nav.home')}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={ROUTES.boutique} className="hover:text-primary">
                {t('nav.boutique')}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.services} className="hover:text-primary">
                {t('nav.services')}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.quiz} className="hover:text-primary">
                {t('nav.quiz')}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.about} className="hover:text-primary">
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.faq} className="hover:text-primary">
                {t('nav.faq')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3 space-y-4 text-sm">
          <h3 className="text-xs uppercase tracking-[0.25em] text-primary/80">
            {t('contacts.phoneLabel')}
          </h3>
          <a
            href={`tel:${SITE.phonePrimary.replace(/\D/g, '')}`}
            className="flex items-center gap-2 hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            {SITE.phonePrimary}
          </a>
          <a
            href={`tel:${SITE.phoneSecondary.replace(/\D/g, '')}`}
            className="flex items-center gap-2 hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            {SITE.phoneSecondary}
          </a>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-primary"
          >
            <Send className="h-4 w-4 text-primary" />
            WhatsApp / Telegram
          </a>
        </div>

        <div className="md:col-span-2 space-y-3 text-sm">
          <h3 className="text-xs uppercase tracking-[0.25em] text-primary/80">
            {t('contacts.addressLabel')}
          </h3>
          <p className="flex gap-2 leading-relaxed text-navy-100/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{isRu ? SITE.address.ru : SITE.address.en}</span>
          </p>
          <p className="flex gap-2 leading-relaxed text-navy-100/80">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{isRu ? SITE.schedule.ru : SITE.schedule.en}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-100/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} {t('brand.name')}. {t('footer.rights')}.
          </p>
          <div className="flex items-center gap-4">
            <Link to={ROUTES.privacy} className="hover:text-primary">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
