import { useCallback, useEffect, useRef, useState } from 'react';

type UseTimerOptions = {
  totalMs: number;
  onEnd: () => void;
};

export function useTimer({ totalMs, onEnd }: UseTimerOptions) {
  const [remainingMs, setRemainingMs] = useState(totalMs);
  const [isRunning, setIsRunning] = useState(false);
  const endTimeRef = useRef<number>(0);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const start = useCallback(() => {
    endTimeRef.current = Date.now() + totalMs;
    setRemainingMs(totalMs);
    setIsRunning(true);
  }, [totalMs]);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const remaining = endTimeRef.current - Date.now();
      if (remaining <= 0) {
        setRemainingMs(0);
        setIsRunning(false);
        onEndRef.current();
      } else {
        setRemainingMs(remaining);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning]);

  return { remainingMs, isRunning, start, stop };
}
