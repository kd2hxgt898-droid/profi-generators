import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Pause, Play, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTestimonials } from '@/api/hooks';
import { cn } from '@/lib/utils';

export const Testimonials = (): JSX.Element => {
  const { t } = useTranslation();
  const { data } = useTestimonials();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const items = data?.items ?? [];
  const featured = items.find((item) => item.featured) ?? items[0];
  const others = items.filter((item) => item.id !== featured?.id);

  return (
    <section className="container py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">{t('testimonials.eyebrow')}</p>
        <h2 className="font-display text-4xl md:text-5xl">{t('testimonials.title')}</h2>
        <p className="mt-4 text-base text-muted-foreground">{t('testimonials.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {featured ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <Card className="relative h-full overflow-hidden border-primary/30 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-navy-50 shadow-gold-lg">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 80% 20%, rgba(212,162,76,0.5), transparent 60%)',
                }}
              />
              <CardContent className="grid gap-6 p-8 md:grid-cols-[auto,1fr] md:p-10">
                <div className="flex items-start gap-4">
                  {featured.avatar ? (
                    <img
                      src={featured.avatar}
                      alt={featured.name}
                      className="h-32 w-28 shrink-0 rounded-2xl border border-primary/40 object-contain object-center bg-navy-950/50 shadow-gold"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div>
                  <Quote className="h-8 w-8 text-primary" />
                  <p className="mt-3 font-display text-xl leading-relaxed text-pretty md:text-2xl">
                    «{featured.text}»
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold">{featured.name}</p>
                      <p className="text-sm text-navy-100/70">{featured.role}</p>
                      <div className="mt-1 flex items-center gap-1 text-primary">
                        {Array.from({ length: featured.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <AudioPlayer
                      isPlaying={playingId === featured.id}
                      label={t('testimonials.audioMock')}
                      onToggle={() =>
                        setPlayingId((current) => (current === featured.id ? null : featured.id))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}

        <div className="grid gap-4 lg:col-span-5 lg:grid-cols-1">
          {others.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
            >
              <Card className="h-full border-border/40 bg-card/60 backdrop-blur">
                <CardContent className="flex h-full gap-4 p-6">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-14 w-14 shrink-0 rounded-full border border-border object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="flex flex-col">
                    <p className="text-sm leading-relaxed text-pretty">«{item.short}»</p>
                    <div className="mt-auto pt-3">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AudioPlayer = ({
  isPlaying,
  label,
  onToggle,
}: {
  isPlaying: boolean;
  label: string;
  onToggle: () => void;
}): JSX.Element => (
  <div className="flex items-center gap-3 rounded-full border border-primary/30 bg-navy-950/50 px-3 py-2">
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="h-9 w-9 rounded-full bg-gold-gradient text-navy-900 hover:bg-gold-gradient hover:opacity-90"
      aria-label={label}
    >
      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
    <div className="flex flex-col text-left">
      <span className="text-xs uppercase tracking-[0.2em] text-primary/80">{label}</span>
      <div className="flex h-3 items-center gap-0.5">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'inline-block w-0.5 rounded-full bg-primary/60 transition-transform duration-500',
              isPlaying ? 'animate-pulse' : '',
            )}
            style={{
              height: `${20 + Math.sin(i * 0.7) * 40}%`,
              animationDelay: `${i * 80}ms`,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);
