import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Ctx = {
  hasActivePass: boolean;
  remainingMinutes: number;
  activatePass: (minutes: number) => void;
};

const UnlockCtx = createContext<Ctx>({
  hasActivePass: false,
  remainingMinutes: 0,
  activatePass: () => {}
});

export function UnlockProvider({ children }:{ children: React.ReactNode }) {
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [remainingMinutes, setRemainingMinutes] = useState(0);

  const activatePass = (minutes: number) => {
    const t = Date.now() + minutes * 60 * 1000;
    setExpiresAt(t);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!expiresAt) { setRemainingMinutes(0); return; }
      const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000 / 60));
      setRemainingMinutes(diff);
      if (diff <= 0) setExpiresAt(null);
    }, 1000 * 10);
    return () => clearInterval(id);
  }, [expiresAt]);

  const value = useMemo(() => ({
    hasActivePass: !!expiresAt && expiresAt > Date.now(),
    remainingMinutes,
    activatePass
  }), [expiresAt, remainingMinutes]);

  return <UnlockCtx.Provider value={value}>{children}</UnlockCtx.Provider>;
}

export function useUnlock() {
  return useContext(UnlockCtx);
}
