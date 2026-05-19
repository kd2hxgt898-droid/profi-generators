import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div className={cn('animate-pulse rounded-xl bg-muted/60', className)} {...props} />
);
