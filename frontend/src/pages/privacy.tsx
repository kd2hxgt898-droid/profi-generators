import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Meta } from '@/components/seo/meta';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES, SITE } from '@/lib/constants';

export const PrivacyPage = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.resolvedLanguage === 'ru';

  return (
    <>
      <Meta
        title={t('privacy.title')}
        description={t('privacy.subtitle')}
        path={ROUTES.privacy}
      />
      <section className="container space-y-6 py-12 md:py-20 text-center">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.3em]">
          <Sparkles className="h-3 w-3" /> Privacy
        </Badge>
        <h1 className="font-display text-4xl md:text-5xl">{t('privacy.title')}</h1>
        <p className="text-muted-foreground">{t('privacy.subtitle')}</p>
      </section>

      <section className="container max-w-3xl pb-24">
        <Card className="border-border/40 bg-card/70 backdrop-blur">
          <CardContent className="prose prose-invert max-w-none space-y-4 p-8 text-foreground">
            <p>
              {isRu
                ? 'Настоящая Политика описывает, как ООО «Профи генераторы» обрабатывает персональные данные пользователей сайта. Отправляя любую форму на сайте, вы соглашаетесь с условиями данной Политики.'
                : 'This Policy describes how Profi Generators LLC processes personal data of website visitors. By submitting any form on the website you agree to the Policy.'}
            </p>
            <h3>{isRu ? 'Какие данные мы собираем' : 'What data we collect'}</h3>
            <ul>
              <li>{isRu ? 'Имя и контактный номер телефона' : 'Name and contact phone number'}</li>
              <li>
                {isRu
                  ? 'Идентификаторы устройства и cookies'
                  : 'Device identifiers and cookies'}
              </li>
              <li>
                {isRu
                  ? 'Источник перехода и страница, на которой оставлена заявка'
                  : 'Referring page and the page where the form was submitted'}
              </li>
            </ul>
            <h3>{isRu ? 'Цели обработки' : 'Purposes of processing'}</h3>
            <ul>
              <li>
                {isRu
                  ? 'Обратная связь по заявке и подбор оборудования'
                  : 'Following up on the request and equipment selection'}
              </li>
              <li>
                {isRu
                  ? 'Подготовка договора, доставки и монтажа'
                  : 'Preparing contract, delivery and installation'}
              </li>
            </ul>
            <h3>{isRu ? 'Контакты' : 'Contacts'}</h3>
            <p>
              {isRu ? SITE.address.ru : SITE.address.en}
              <br />
              {SITE.phonePrimary} • {SITE.phoneSecondary}
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
