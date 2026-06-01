import React, { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type ReplayGateContextValue = {
  replayRequired: boolean;
  requireReplay: () => void;
  clearReplayRequirement: () => void;
};

const ReplayGateContext = createContext<ReplayGateContextValue | null>(null);

export function ReplayGateProvider({ children }: PropsWithChildren) {
  const [replayRequired, setReplayRequired] = useState(false);

  const value = useMemo<ReplayGateContextValue>(
    () => ({
      replayRequired,
      requireReplay: () => setReplayRequired(true),
      clearReplayRequirement: () => setReplayRequired(false),
    }),
    [replayRequired],
  );

  return <ReplayGateContext.Provider value={value}>{children}</ReplayGateContext.Provider>;
}

export function useReplayGate() {
  const context = useContext(ReplayGateContext);

  if (context == null) {
    throw new Error('useReplayGate must be used within ReplayGateProvider');
  }

  return context;
}
