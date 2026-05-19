import { useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type ToastVariant = 'default' | 'success' | 'destructive';

type ToastItem = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number;
};

let listeners: Array<(toasts: ToastItem[]) => void> = [];
let memoryState: ToastItem[] = [];

const dispatch = (next: ToastItem[]): void => {
  memoryState = next;
  listeners.forEach((listener) => listener(memoryState));
};

export const toast = (options: Omit<ToastItem, 'id'>): string => {
  const id = Math.random().toString(36).slice(2, 11);
  const newToast: ToastItem = { id, duration: 4000, ...options };
  dispatch([...memoryState, newToast]);
  return id;
};

export const dismissToast = (id: string): void => {
  dispatch(memoryState.filter((toast) => toast.id !== id));
};

export const useToast = (): {
  toasts: ToastItem[];
  toast: typeof toast;
  dismiss: typeof dismissToast;
} => {
  const [toasts, setToasts] = useState<ToastItem[]>(memoryState);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((listener) => listener !== setToasts);
    };
  }, []);

  const dismiss = useCallback((id: string) => dismissToast(id), []);

  return { toasts, toast, dismiss };
};
