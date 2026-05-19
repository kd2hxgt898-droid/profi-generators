import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export const HERO_BG_OFF_SRC = '/images/hero/hero-off.png' as const;
export const HERO_BG_ON_SRC = '/images/hero/hero-on.png' as const;

/** Совпадает с tailwind navy.950 — фон при fit contain */
const FILL_NIGHT = '#04060F';

function canvasBackingDpr(): number {
  const raw = window.devicePixelRatio ?? 1;
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
}

type Props = {
  src: string;
  className?: string;
  /** contain — весь кадр виден; cover — заполнить область (возможна обрезка) */
  fit?: 'cover' | 'contain';
};

/**
 * Фон hero в &lt;canvas&gt;: без лишнего object-fit в CSS.
 * Размер буфера = CSS-область × devicePixelRatio (полное качество на Retina).
 */
export const HeroBackgroundCanvas = ({
  src,
  className,
  fit = 'contain',
}: Props): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let cancelled = false;

    const draw = (): void => {
      if (cancelled) return;
      const img = imageRef.current;
      if (!img?.complete || img.naturalWidth === 0) return;

      const rect = container.getBoundingClientRect();
      const dpr = canvasBackingDpr();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale =
        fit === 'cover' ? Math.max(w / iw, h / ih) : Math.min(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;

      if (fit === 'contain') {
        ctx.fillStyle = FILL_NIGHT;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const img = new Image();
    img.decoding = 'async';
    imageRef.current = img;
    const onLoad = (): void => {
      if (cancelled) return;
      draw();
    };
    img.addEventListener('load', onLoad);
    img.src = src;

    const ro = new ResizeObserver(() => {
      if (cancelled) return;
      draw();
    });
    ro.observe(container);

    const onWin = (): void => {
      if (cancelled) return;
      draw();
    };
    window.addEventListener('resize', onWin);

    return () => {
      cancelled = true;
      img.removeEventListener('load', onLoad);
      ro.disconnect();
      window.removeEventListener('resize', onWin);
      imageRef.current = null;
    };
  }, [src, fit]);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 bg-navy-950', className)}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
