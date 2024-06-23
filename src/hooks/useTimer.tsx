import React from "react";

function useTimer(
  timerRef: React.MutableRefObject<ReturnType<typeof setInterval> | undefined>
) {
  function startTimer(fn: Function, delay: number) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    fn();
    timerRef.current = setInterval(() => {
      fn();
    }, delay);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }

  return { startTimer, stopTimer };
}

export default useTimer;
