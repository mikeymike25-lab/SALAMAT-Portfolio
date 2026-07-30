import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element enters the viewport and trigger scroll reveal animation.
 * On mobile devices (< 768px), elements are immediately visible to prevent touch-scroll paint delays.
 * @param {Object} options - IntersectionObserver options (threshold, rootMargin, triggerOnce)
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -20px 0px', triggerOnce = true } = options;
  const ref = useRef(null);

  // On mobile screens (< 768px), default to visible immediately for instant touch rendering
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isVisible, setIsVisible] = useState(isMobile);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

export default useScrollReveal;
