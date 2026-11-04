/**
 * Resolves static asset paths correctly across both local dev (root `/`)
 * and GitHub Pages subdirectory deployment (e.g. `/Natalia-Stachowiak/`).
 * Fully idempotent: calling resolveAssetUrl multiple times will never double-prefix.
 */
export function resolveAssetUrl(url: string | undefined | null): string {
  if (!url) return '';
  // Remote URLs or data/blob URIs remain untouched
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const baseNoSlash = cleanBase.endsWith('/') ? cleanBase.slice(0, -1) : cleanBase;

  // If already prefixed with cleanBase (e.g. "/Natalia-Stachowiak/assets/..."), return as is
  if (url.startsWith(cleanBase)) {
    return url;
  }
  // If starts with base without trailing slash (e.g. "/Natalia-Stachowiak/...")
  if (baseNoSlash && (url === baseNoSlash || url.startsWith(`${baseNoSlash}/`))) {
    return url;
  }

  const pathWithoutLeadingSlash = url.startsWith('/') ? url.slice(1) : url;
  if (baseNoSlash && baseNoSlash.startsWith('/') && pathWithoutLeadingSlash.startsWith(baseNoSlash.slice(1) + '/')) {
    return `/${pathWithoutLeadingSlash}`;
  }

  return `${cleanBase}${pathWithoutLeadingSlash}`;
}

/**
 * Returns a safe absolute or relative asset URL for anchor links and downloads.
 * Uses window.location.origin to build a fully qualified URL on GitHub Pages,
 * ensuring target="_blank" and download attributes work reliably without 404s.
 */
export function getAbsoluteAssetUrl(url: string | undefined | null): string {
  if (!url) return '';
  const resolved = resolveAssetUrl(url);
  if (!resolved) return '';
  if (
    resolved.startsWith('http://') ||
    resolved.startsWith('https://') ||
    resolved.startsWith('blob:') ||
    resolved.startsWith('data:')
  ) {
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
