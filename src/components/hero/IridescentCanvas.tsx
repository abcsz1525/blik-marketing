'use client';

/**
 * Iridescent backdrop — Hybrid CSS / WebGL.
 *
 * Critical-path strategy for premium LCP/TBT:
 *  1. SSR renders ONLY the CSS `iri-surface` fallback — zero JS cost.
 *  2. After `window.load` and 1500ms of idle, AND only if the hero
 *     section is still intersecting the viewport, the heavy Three.js
 *     scene is dynamically imported and mounted on top of the CSS fallback.
 *  3. WebGL is skipped entirely on reduced-motion, no-WebGL devices,
 *     and very small viewports (< 480px) — saves bandwidth on phones.
 *  4. Once mounted, the Three.js Canvas is paused (frameloop="never")
 *     when the container scrolls ~100px past the viewport. Saves GPU
 *     and battery — matters especially for mobile (UI-audit NICE-TO-HAVE I).
 *
 * This keeps the Three.js chunk OUT of the initial bundle for the
 * first paint, dropping TBT and LCP on slow devices.
 */
import { useEffect, useRef, useState, type ComponentType } from 'react';

interface Props {
  className?: string;
}

interface SceneProps {
  isVisible?: boolean;
}

export function IridescentCanvas({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null);
  // Starts false — IntersectionObserver corrects synchronously on observe().
  // Covers AboutPhilosophy (below-fold section) correctly; hero-contexts
  // flip to true well before the fade-in animation reveals the canvas.
  const [isVisible, setIsVisible] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mountedRef.current) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) return;

    // Respect tiny viewports — iridescent CSS fallback is enough.
    if (window.innerWidth < 480) return;

    // WebGL capability check
    try {
      const test = document.createElement('canvas');
      const ctx = test.getContext('webgl2') || test.getContext('webgl');
      if (!ctx) return;
    } catch {
      return;
    }

    let scheduled = 0;

    const mount = () => {
      if (mountedRef.current) return;
      // Only mount when the container is in viewport — saves work
      // for users that scroll past the hero before idle fires.
      if (
        containerRef.current &&
        'IntersectionObserver' in window
      ) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.bottom < 0) return;
      }
      mountedRef.current = true;
      import('./IridescentScene').then((mod) => {
        setScene(() => mod.default);
      });
    };

    const start = () => {
      // Wait 1500ms after load before pulling in Three.js so all
      // critical paint and font work has finished.
      const idle =
        typeof window.requestIdleCallback === 'function'
          ? (cb: () => void) =>
              window.requestIdleCallback(cb, { timeout: 2500 })
          : (cb: () => void) => setTimeout(cb, 1500);
      scheduled = window.setTimeout(() => idle(mount), 1500);
    };

    if (document.readyState === 'complete') {
      start();
    } else {
      window.addEventListener('load', start, { once: true });
    }

    return () => {
      if (scheduled) clearTimeout(scheduled);
      window.removeEventListener('load', start);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { rootMargin: '100px 0px', threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className ?? ''}`}
      aria-hidden
    >
      {/* Always-on CSS iridescent fallback (paints in <1ms) */}
      <div className="iri-surface absolute inset-0" />
      {/* WebGL layer — overlays once mounted */}
      {Scene && (
        <div className="absolute inset-0 animate-[fadein_900ms_ease-out_forwards] opacity-0">
          <Scene isVisible={isVisible} />
        </div>
      )}
    </div>
  );
}
