import { useEffect, useState } from 'react';

/**
 * Animates a number counting up from 0 to `end` over `duration` ms.
 * Only starts counting once `trigger` becomes true (pair with
 * useIntersectionAnimation so the count-up fires when scrolled into view).
 */
export function useCountUp(end, duration = 1500, trigger = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (startTimestamp === null) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, trigger]);

  return value;
}
