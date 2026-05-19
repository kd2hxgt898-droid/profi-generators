/* eslint-disable react-refresh/only-export-components -- module exports context provider + consumer hook */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

type BlackoutDemoUiContextValue = {
  isDimmingUi: boolean;
  setDimmingUi: Dispatch<SetStateAction<boolean>>;
};

const BlackoutDemoUiContext = createContext<BlackoutDemoUiContextValue | null>(null);

export const BlackoutDemoUiProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isDimmingUi, setDimmingUi] = useState(false);
  const value = useMemo(() => ({ isDimmingUi, setDimmingUi }), [isDimmingUi]);
  return (
    <BlackoutDemoUiContext.Provider value={value}>{children}</BlackoutDemoUiContext.Provider>
  );
};

export const useBlackoutDemoUi = (): BlackoutDemoUiContextValue => {
  const ctx = useContext(BlackoutDemoUiContext);
  const noop = useCallback(() => {}, []);
  if (!ctx) {
    return { isDimmingUi: false, setDimmingUi: noop };
  }
  return ctx;
};
