import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Home } from 'lucide-react';
import { Meta } from '@/components/seo/meta';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

export const NotFoundPage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <Meta title="404" description="Страница не найдена" path="/404" />
      <section className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <p className="font-display text-7xl text-primary md:text-9xl">404</p>
        <h1 className="font-display text-3xl">Страница не найдена</h1>
        <p className="max-w-md text-muted-foreground">
          Возможно, вы перешли по устаревшей ссылке. Возвращайтесь на главную или подберите
          генератор за 60 секунд.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="outline">
            <Link to={ROUTES.home}>
              <ArrowLeft className="h-4 w-4" />
              {t('nav.home')}
            </Link>
          </Button>
          <Button asChild>
            <Link to={ROUTES.quiz}>
              <Home className="h-4 w-4" />
              {t('nav.quiz')}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};
