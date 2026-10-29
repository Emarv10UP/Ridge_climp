import { useEffect, useState } from 'react';

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used to switch the navbar from transparent-on-hero to solid-on-scroll.
 */
export function useScrollNavbar(threshold = 80) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
