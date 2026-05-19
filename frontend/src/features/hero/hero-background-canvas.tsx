import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export const HERO_BG_OFF_SRC = '/images/hero/hero-off.png' as const;
export const HERO_BG_ON_SRC = '/images/hero/hero-on.png' as const;

/** Совпадает с tailwind navy.950 — фон при fit contain */
const FILL_NIGHT = '#04060F';

/** iOS / Android: лимит стороны bitmap и canvas при высоком DPR */
const MAX_CANVAS_DPR = 2;
const MAX_SOURCE_SIDE = 4096;

function canvasBackingDpr(): number {
  const raw = window.devicePixelRatio ?? 1;
  const dpr = Number.isFinite(raw) && raw > 0 ? raw : 1;
  return Math.min(dpr, MAX_CANVAS_DPR);
}

type Props = {
  src: string;
  className?: string;
  /** contain — весь кадр виден; cover — заполнить область (возможна обрезка) */
  fit?: 'cover' | 'contain';
  /** На мобильных: нативный &lt;img&gt; вместо canvas (меньше риск OOM). */
  preferNativeImage?: boolean;
  /** Слой стал видимым — перерисовать (Safari не всегда обновляет canvas в opacity:0). */
  active?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
};

/**
 * Фон hero: canvas (desktop) или &lt;img&gt; (mobile).
 * Размер буфера canvas = CSS-область × min(DPR, 2).
 */
export const HeroBackgroundCanvas = ({
  src,
  className,
  fit = 'contain',
  preferNativeImage = false,
  active = true,
  fetchPriority = 'auto',
}: Props): JSX.Element => {
  if (preferNativeImage) {
    return (
      <img
        src={src}
        alt=""
        decoding="async"
        fetchPriority={fetchPriority}
        className={cn('absolute inset-0 h-full w-full object-cover', className)}
        aria-hidden
      />
    );
  }

  return (
    <HeroBackgroundCanvasLayer
      src={src}
      className={className}
      fit={fit}
      active={active}
    />
  );
};

type LayerProps = {
  src: string;
  className?: string;
  fit: 'cover' | 'contain';
  active: boolean;
};

function HeroBackgroundCanvasLayer({
  src,
  className,
  fit,
  active,
}: LayerProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const scaledBitmapRef = useRef<HTMLCanvasElement | null>(null);
  const drawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let cancelled = false;

    const resolveDrawSource = (): CanvasImageSource | null => {
      const img = imageRef.current;
      if (!img?.complete || img.naturalWidth === 0) return null;

      const maxSide = Math.max(img.naturalWidth, img.naturalHeight);
      if (maxSide <= MAX_SOURCE_SIDE) return img;

      const scale = MAX_SOURCE_SIDE / maxSide;
      const sw = Math.max(1, Math.round(img.naturalWidth * scale));
      const sh = Math.max(1, Math.round(img.naturalHeight * scale));

      let scaled = scaledBitmapRef.current;
      if (!scaled || scaled.width !== sw || scaled.height !== sh) {
        scaled = document.createElement('canvas');
        scaled.width = sw;
        scaled.height = sh;
        scaledBitmapRef.current = scaled;
      }
      const sctx = scaled.getContext('2d');
      if (!sctx) return img;
      sctx.clearRect(0, 0, sw, sh);
      sctx.drawImage(img, 0, 0, sw, sh);
      return scaled;
    };

    const draw = (): void => {
      if (cancelled) return;
      const source = resolveDrawSource();
      if (!source) return;

      const rect = container.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;

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

      const iw =
        source instanceof HTMLImageElement
          ? source.naturalWidth
          : source instanceof HTMLCanvasElement
            ? source.width
            : 0;
      const ih =
        source instanceof HTMLImageElement
          ? source.naturalHeight
          : source instanceof HTMLCanvasElement
            ? source.height
            : 0;
      if (iw === 0 || ih === 0) return;
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

      ctx.drawImage(source, dx, dy, dw, dh);
    };

    drawRef.current = draw;

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
      scaledBitmapRef.current = null;
      drawRef.current = null;
    };
  }, [src, fit]);

  useEffect(() => {
    if (!active) return;
    drawRef.current?.();
  }, [active]);

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
}



