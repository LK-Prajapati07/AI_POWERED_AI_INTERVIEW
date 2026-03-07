import { useEffect, useRef, useState, useCallback } from "react";

export const useCountdown = (initialTime = 60, onComplete, key) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const intervalRef = useRef(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();

          if (!completedRef.current) {
            completedRef.current = true;
            onCompleteRef.current?.();
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }, [clear]);

  const pause = useCallback(() => {
    clear();
  }, [clear]);

  const reset = useCallback(
    (newTime = initialTime) => {
      clear();
      completedRef.current = false;
      setTimeLeft(newTime);
    },
    [initialTime, clear]
  );

  useEffect(() => {
    reset(initialTime);
    start();

    return clear;
  }, [initialTime, key, reset, start, clear]);

  return {
    timeLeft,
    start,
    pause,
    reset,
  };
};