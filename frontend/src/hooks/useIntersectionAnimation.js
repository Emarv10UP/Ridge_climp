import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref to attach to an element and a boolean that flips to true
 * once that element enters the viewport. Used to trigger stagger-fade-up
 * animations on section cards as they scroll into view.
 */
export function useIntersectionAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}
