import { useSyncExternalStore } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

function subscribe(onStoreChange: () => void): () => void {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener('change', onStoreChange);
  return (): void => {
    mq.removeEventListener('change', onStoreChange);
  };
}

function getSnapshot(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/** Viewport ≤767px — совпадает с breakpoint `md` в Tailwind. */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
