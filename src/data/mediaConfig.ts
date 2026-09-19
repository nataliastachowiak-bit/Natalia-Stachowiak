import { MediaAssets } from '../types';

export const DEFAULT_MEDIA: MediaAssets = {
  heroPortrait: '',
  aboutPortrait: '',
  gainImage: '',
  gainAppUrl: 'https://natflixgain.base44.app',
  streetLifeImage: '',
  streetLifeVideo: '',
  streetLifeVideoUrl: '',
  streetLifeAppUrl: '',
  fanPulsePrototypeUrl: '',
  vinylImage: '',
  vinylAppUrl: '',
  dineEaseImage: '',
  dineEaseAppUrl: '',
  dineEasePrototypeUrl: '',
  duBistNichtZuVielUrl: 'https://www.instagram.com/frau_en_power2026/',
  bookCover: '',
  instagramQr: '',
  cvFile: '',
  cvPdfUrl: '',
  certDt: '',
  certAgileInn: '',
  certScrumMaster: '',
  certAgileFound: '',
  certAiKompakt: '',
  certAiGrundlagen: '',
  certProdDesign: '',
  certAppliedScrum: '',
  certPmProgress: '',
  linkedinUrl: 'https://www.linkedin.com/in/natalia-stachowiak-pm',
};

/**
 * Returns the media key associated with a project's live URL.
 */
export function getProjectLinkKey(projectId: string): string {
  switch (projectId) {
    case 'gain':
      return 'gainAppUrl';
    case 'street-life':
      return 'streetLifeAppUrl';
    case 'vinyl':
      return 'vinylAppUrl';
    case 'dine-ease':
      return 'dineEaseAppUrl';
    case 'du-bist-nicht-zu-viel':
      return 'duBistNichtZuVielUrl';
    default:
      return `project_link_${projectId}`;
  }
}

/**
 * Returns the effective URL for a project, taking into account user custom links and sensible defaults.
 */
export function getProjectUrl(projectId: string, assets: MediaAssets): string {
  switch (projectId) {
    case 'gain':
      return assets.gainAppUrl || 'https://natflixgain.base44.app';
    case 'street-life':
      return assets.streetLifeAppUrl || assets.fanPulsePrototypeUrl || '';
    case 'vinyl':
      return assets.vinylAppUrl || '';
    case 'dine-ease':
      return assets.dineEaseAppUrl || assets.dineEasePrototypeUrl || '';
    case 'du-bist-nicht-zu-viel':
      return assets.duBistNichtZuVielUrl || 'https://www.instagram.com/frau_en_power2026/';
    default:
      return (assets[`project_link_${projectId}`] as string) || '';
  }
}

/**
 * Returns a friendly action label for opening a project link.
 */
export function getProjectActionLabel(projectId: string, lang: 'de' | 'en' | 'pl' = 'de'): string {
  switch (projectId) {
    case 'gain':
      return lang === 'pl' ? 'OTWÓRZ GAIN APP' : lang === 'en' ? 'OPEN GAIN APP' : 'GAIN APP ÖFFNEN';
    case 'street-life':
      return lang === 'pl' ? 'PROTOTYP / APP' : lang === 'en' ? 'PROTOTYPE / APP' : 'PROTOTYP / APP';
    case 'vinyl':
      return lang === 'pl' ? 'OTWÓRZ VINYL APP' : lang === 'en' ? 'OPEN VINYL APP' : 'VINYL APP ÖFFNEN';
    case 'dine-ease':
      return lang === 'pl' ? 'OTWÓRZ DINE-EASE' : lang === 'en' ? 'OPEN DINE-EASE' : 'DINE-EASE ÖFFNEN';
    case 'du-bist-nicht-zu-viel':
      return lang === 'pl' ? 'INSTAGRAM / PROJEKT' : lang === 'en' ? 'INSTAGRAM / PROJECT' : 'INSTAGRAM / PROJEKT';
    default:
      return lang === 'pl' ? 'OTWÓRZ PROJEKT' : lang === 'en' ? 'OPEN PROJECT' : 'PROJEKT ÖFFNEN';
  }
}

const STORAGE_KEY = 'natalia_portfolio_media_meta_v3';
const LEGACY_STORAGE_KEY = 'natalia_portfolio_media_assets_v2';

export function getInitialMediaAssets(): MediaAssets {
  if (typeof window === 'undefined') return DEFAULT_MEDIA;
  try {
    // Clean up legacy oversized storage key if present
    if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_MEDIA, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read saved media from localStorage', e);
  }
  return DEFAULT_MEDIA;
}

export function saveMediaAssets(assets: MediaAssets): void {
  if (typeof window === 'undefined') return;
  try {
    // Only store lightweight string values (URLs, small markers) in localStorage
    // Large base64 data URLs (>100KB) are handled safely via IndexedDB
    const safeMeta: Record<string, string> = {};
    for (const [k, v] of Object.entries(assets)) {
      if (typeof v === 'string') {
        if (v.startsWith('data:') && v.length > 50000) {
          // Large base64 payload - keep in state and IndexedDB, omit from localStorage
          continue;
        }
        safeMeta[k] = v;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeMeta));
  } catch (e) {
    // Gracefully handle any quota limitation without breaking user session
    console.warn('Storage quota reached for localStorage, relying on IndexedDB/state:', e);
  }
}

export function resetMediaAssets(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (e) {
    console.warn('Could not reset media in localStorage', e);
  }
}

// Backwards compatibility aliases
export const getStoredMedia = getInitialMediaAssets;
export const saveStoredMedia = (assets: Partial<MediaAssets>): MediaAssets => {
  const current = getInitialMediaAssets();
  const updated: MediaAssets = { ...current };
  (Object.keys(assets) as Array<keyof MediaAssets>).forEach((k) => {
    const val = assets[k];
    if (typeof val === 'string') {
      updated[k] = val;
    }
  });
  saveMediaAssets(updated);
  return updated;
};
