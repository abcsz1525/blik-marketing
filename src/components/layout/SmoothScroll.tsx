'use client';

import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    let lenisInstance: import('lenis').default | null = null;

    (async () => {
      const Lenis = (await import('lenis')).default;
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      const raf_ = (time: number) => {
        lenisInstance?.raf(time);
        raf = requestAnimationFrame(raf_);
      };
      raf = requestAnimationFrame(raf_);
    })();

    return () => {
      cancelAnimationFrame(raf);
      lenisInstance?.destroy();
    };
  }, []);

  return null;
}
