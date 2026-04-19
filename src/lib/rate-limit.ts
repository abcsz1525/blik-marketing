/**
 * In-memory rate limiter for API routes.
 *
 * Designed for Railway single-instance deployment. Not suitable for
 * multi-instance (each instance has its own Map — limits are per-instance).
 *
 * Storage: Map<IP, timestamps[]>, pruned periodically.
 * HMR-safe via globalThis singleton (dev-mode module re-execution
 * won't spawn orphan cleanup intervals).
 */

const WINDOW_MS = 60_000;                    // 1 minute
const MAX_REQUESTS = 5;                      // per IP per window
const CLEANUP_INTERVAL_MS = 5 * 60_000;      // 5 minutes

declare global {
  // eslint-disable-next-line no-var
  var __blikRateLimitStore: Map<string, number[]> | undefined;
  // eslint-disable-next-line no-var
  var __blikRateLimitCleanup: NodeJS.Timeout | undefined;
}

const store: Map<string, number[]> =
  globalThis.__blikRateLimitStore ?? new Map();
globalThis.__blikRateLimitStore = store;

// Periodic cleanup — removes entries whose all timestamps have aged out.
// Guarded against HMR re-execution.
if (!globalThis.__blikRateLimitCleanup) {
  globalThis.__blikRateLimitCleanup = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of store.entries()) {
      const recent = timestamps.filter((t) => now - t < WINDOW_MS);
      if (recent.length === 0) {
        store.delete(ip);
      } else {
        store.set(ip, recent);
      }
    }
  }, CLEANUP_INTERVAL_MS);
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const timestamps = store.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0];
    const retryAfter = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return { allowed: false, retryAfter };
  }

  recent.push(now);
  store.set(ip, recent);
  return { allowed: true };
}
