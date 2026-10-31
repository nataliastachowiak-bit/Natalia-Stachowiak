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
 * Returns a fully qualified absolute URL with origin protocol and host.
 * This ensures that opening links with target="_blank" from inside an iframe
 * (such as within Google AI Studio preview) will never incorrectly resolve
 * to aistudio.google.com, but rather to the actual app host or GitHub Pages domain.
 */
export function getAbsoluteAssetUrl(url: string | undefined | null): string {
  const resolved = resolveAssetUrl(url);
  if (!resolved) return '';
  if (resolved.startsWith('http://') || resolved.startsWith('https://')) {
    return resolved;
  }
  if (typeof window !== 'undefined' && window.location) {
    try {
      return new URL(resolved, window.location.origin).href;
    } catch {
      return resolved;
    }
  }
  return resolved;
}
