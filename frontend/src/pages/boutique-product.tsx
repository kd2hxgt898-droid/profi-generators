import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Meta } from '@/components/seo/meta';
import { ProductDetailView } from '@/features/boutique/product-detail-view';
import { ProductLandingView } from '@/features/boutique/product-landing-view';
import { useProducts } from '@/api/hooks';
import { boutiqueProductPath, ROUTES } from '@/lib/constants';

export const BoutiqueProductPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { productId: productIdParam } = useParams<{ productId: string }>();
  const productId = productIdParam ? decodeURIComponent(productIdParam) : '';

  const productsQuery = useProducts();
  const product = useMemo(() => {
    const items = productsQuery.data?.items ?? [];
    return items.find((p) => p.id === productId);
  }, [productsQuery.data?.items, productId]);

  const path = productId ? boutiqueProductPath(productId) : ROUTES.boutique;

  if (productsQuery.isLoading) {
    return (
      <div className="container py-20 text-center text-muted-foreground">
        {t('common.loading')}
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Meta title={t('boutique.productDetail.notFoundMetaTitle')} path={path} />
        <div className="container flex min-h-[50vh] flex-col items-center justify-center gap-6 py-20 text-center">
          <p className="text-muted-foreground">{t('boutique.productDetail.notFound')}</p>
          <Link
            to={ROUTES.boutique}
            className="text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4"
          >
            {t('boutique.productDetail.backToBoutique')}
          </Link>
        </div>
      </>
    );
  }

  const landing = product.landing;
  const metaTitle =
    landing !== undefined ? `${product.name} — ${landing.tagline}` : product.name;

  if (landing !== undefined) {
    return (
      <>
        <Meta
          title={metaTitle}
          description={product.short_description}
          path={path}
          image={product.image}
          type="article"
        />
        <div className="container max-w-6xl pt-6 md:pt-10">
          <Link
            to={ROUTES.boutique}
            className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            {t('boutique.productDetail.backToBoutique')}
          </Link>
        </div>
        <ProductLandingView product={product} landing={landing} />
      </>
    );
  }

  return (
    <>
      <Meta
        title={product.name}
        description={product.short_description}
        path={path}
        image={product.image}
        type="article"
      />
      <div className="container max-w-4xl py-8 md:py-14">
        <Link
          to={ROUTES.boutique}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          {t('boutique.productDetail.backToBoutique')}
        </Link>
        <ProductDetailView product={product} />
      </div>
    </>
  );
};
