// Global type extensions for the browser runtime.
// This file must be a module (export {}) for `declare global` to take effect.

declare global {
  interface Window {
    /**
     * Google Tag Manager / GA4 / Yandex.Metrica dataLayer.
     * Populated by the respective analytics snippets when they load.
     * Optional — form submission handlers must null-check before pushing.
     */
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export {};
