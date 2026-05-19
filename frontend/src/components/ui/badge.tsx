import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary/15 text-primary border border-primary/30',
        gold: 'bg-gold-gradient text-navy-900 shadow-gold border border-gold-300/50',
        outline: 'border border-foreground/20 text-foreground',
        muted: 'bg-muted text-muted-foreground',
        destructive: 'bg-destructive/15 text-destructive border border-destructive/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export const Badge = ({ className, variant, ...props }: BadgeProps): JSX.Element => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);
