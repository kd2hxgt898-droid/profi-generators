import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Phone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../theme-toggle';
import { ROUTES, SITE } from '@/lib/constants';
import { useBlackoutDemoUi } from '@/features/hero/blackout-demo-ui-context';
import { cn } from '@/lib/utils';

export const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const { isDimmingUi } = useBlackoutDemoUi();
  const location = useLocation();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links: ReadonlyArray<{ to: string; label: string }> = [
    { to: ROUTES.home, label: t('nav.home') },
    { to: ROUTES.boutique, label: t('nav.boutique') },
    { to: ROUTES.services, label: t('nav.services') },
    { to: ROUTES.about, label: t('nav.about') },
    { to: ROUTES.contacts, label: t('nav.contacts') },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-500',
        isDimmingUi && 'pointer-events-none opacity-[0.2]',
        scrolled
          ? 'border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-glass'
          : 'bg-transparent',
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link to={ROUTES.home} className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-navy-900 shadow-gold transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight">
              {t('brand.name')}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {t('brand.tagline')}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.home}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/80 hover:bg-foreground/5 hover:text-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phonePrimary.replace(/\D/g, '')}`}
            className="hidden items-center gap-2 rounded-full border border-primary/30 px-3 py-2 text-xs font-semibold tracking-wide text-primary hover:bg-primary/10 md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {SITE.phonePrimary}
          </a>
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex"
            aria-label={t('common.cta.pickGenerator')}
          >
            <Link to={ROUTES.quiz}>{t('nav.quiz')}</Link>
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-lg lg:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === ROUTES.home}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-4 py-3 text-sm font-medium',
                    isActive ? 'bg-primary/10 text-primary' : 'hover:bg-foreground/5',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button asChild className="mt-2">
              <Link to={ROUTES.quiz}>{t('nav.quiz')}</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
