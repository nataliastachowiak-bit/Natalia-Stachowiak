/**
 * Resolves static asset paths correctly across both local dev (root `/`)
 * and GitHub Pages subdirectory deployment (e.g. `/Natalia-Stachowiak/`).
 */
export function resolveAssetUrl(url: string | undefined | null): string {
  if (!url) return '';
  // Remote URLs or data URIs remain untouched
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = url.startsWith('/') ? url.slice(1) : url;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Returns a safe asset URL for anchor links and previews.
 * On GitHub Pages, it returns the public absolute URL.
 * In development and AI Studio preview, it returns the relative URL to prevent
 * Cloud Run cross-origin IAM authentication redirects that cause connection errors.
 */
export function getAbsoluteAssetUrl(url: string | undefined | null): string {
  const resolved = resolveAssetUrl(url);
  if (!resolved) return '';
  if (resolved.startsWith('http://') || resolved.startsWith('https://')) {
    return resolved;
  }
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.hostname.includes('github.io')) {
      try {
        return new URL(resolved, window.location.origin).href;
      } catch {
        return resolved;
      }
    }
  }
  return resolved;
}
