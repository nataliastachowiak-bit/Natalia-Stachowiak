import { MediaAssets } from '../types';
import { LOCKED_ASSETS, PROJECT_BOOK_COVER } from './assetRegistry';

export const DEFAULT_MEDIA: MediaAssets = {
  heroPortrait: LOCKED_ASSETS.heroPortrait,
  aboutPortrait: LOCKED_ASSETS.aboutPortrait,
  gainImage: LOCKED_ASSETS.gainImage,
  gainAppUrl: 'https://natflixgain.base44.app',
  streetLifeImage: LOCKED_ASSETS.streetLifeImage,
  streetLifeVideo: '',
  streetLifeVideoUrl: '',
  streetLifeAppUrl: '',
  fanPulsePrototypeUrl: '',
  vinylImage: LOCKED_ASSETS.vinylImage,
  vinylAppUrl: '',
  dineEaseImage: LOCKED_ASSETS.dineEaseImage,
  dineEaseAppUrl: '',
  dineEasePrototypeUrl: '',
  duBistNichtZuVielUrl: 'https://www.instagram.com/frau_en_power2026/',
  environixImage: LOCKED_ASSETS.environixImage,
  environixAppUrl: 'https://ai.studio/apps/044b2856-5805-4816-81ca-30e7e20fa3dd?fullscreenApplet=true',
  bookCover: LOCKED_ASSETS.bookCover,
  instagramQr: LOCKED_ASSETS.instagramQr,
  circularTwinImage: LOCKED_ASSETS.circularTwinImage,
  circularTwinCover: LOCKED_ASSETS.circularTwinCover,
  circularTwinVision: LOCKED_ASSETS.circularTwinVision,
  circularTwinFunktionen: LOCKED_ASSETS.circularTwinFunktionen,
  circularTwinImpact: LOCKED_ASSETS.circularTwinImpact,
  circularTwinExperience: LOCKED_ASSETS.circularTwinExperience,
  resourceLoopCover: LOCKED_ASSETS.resourceLoopCover,
  resourceLoopImage: LOCKED_ASSETS.resourceLoopImage,
  resourceLoopVision: LOCKED_ASSETS.resourceLoopVision,
  aiBuildingCover: LOCKED_ASSETS.aiBuildingCover,
  aiBuildingVision: LOCKED_ASSETS.aiBuildingVision,
  aiBuildingWorkflow: LOCKED_ASSETS.aiBuildingWorkflow,
  aiBuildingArchitecture: LOCKED_ASSETS.aiBuildingArchitecture,
  aiBuildingAppUrl: 'https://buldingaiconcept.lovable.app',
  cvPdfUrl: '',
  cvPage1: '',
  cvPage2: '',
  certDt: '',
  certAgileInn: '',
  certScrumMaster: '',
  certAgileFound: '',
  certAiKompakt: '',
  certAiGrundlagen: '',
  certProdDesign: '',
  certAppliedScrum: '',
  certPmProgress: '',
  linkedinUrl: 'https://www.linkedin.com/in/natalia-stachowiak-0a8449306',
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
    case 'environix':
      return 'environixAppUrl';
    case 'ai-building-concept':
    case 'ai-building':
      return 'aiBuildingAppUrl';
    default:
      return `project_link_${projectId}`;
  }
}

/**
 * Returns the effective URL for a project, taking into account user custom links and sensible defaults.
 */
export function getProjectUrl(projectId: string, assets: MediaAssets, project?: { externalAppUrl?: string; prototypeUrl?: string }): string {
  switch (projectId) {
    case 'gain':
      return assets.gainAppUrl || project?.externalAppUrl || 'https://natflixgain.base44.app';
    case 'street-life':
      return assets.streetLifeAppUrl || assets.fanPulsePrototypeUrl || project?.prototypeUrl || '';
    case 'vinyl':
      return assets.vinylAppUrl || project?.prototypeUrl || '';
    case 'dine-ease':
      return assets.dineEaseAppUrl || assets.dineEasePrototypeUrl || project?.prototypeUrl || '';
    case 'du-bist-nicht-zu-viel':
      return assets.duBistNichtZuVielUrl || project?.externalAppUrl || 'https://www.instagram.com/frau_en_power2026/';
    case 'environix':
      return assets.environixAppUrl || project?.externalAppUrl || 'https://ai.studio/apps/044b2856-5805-4816-81ca-30e7e20fa3dd?fullscreenApplet=true';
    case 'ai-building-concept':
    case 'ai-building':
      return assets.aiBuildingAppUrl || project?.externalAppUrl || project?.prototypeUrl || 'https://buldingaiconcept.lovable.app';
    default:
      return (assets[`project_link_${projectId}`] as string) || project?.externalAppUrl || '';
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
    case 'environix':
      return lang === 'pl' ? 'OTWÓRZ ENVIRONIX AI' : lang === 'en' ? 'OPEN ENVIRONIX AI' : 'ENVIRONIX AI ÖFFNEN';
    case 'ai-building-concept':
    case 'ai-building':
      return lang === 'pl' ? 'LIVE PROTOTYP' : lang === 'en' ? 'EXPLORE PROTOTYPE' : 'LIVE-PROTOTYP ÖFFNEN';
    default:
      return lang === 'pl' ? 'OTWÓRZ PROJEKT' : lang === 'en' ? 'OPEN PROJECT' : 'PROJEKT ÖFFNEN';
  }
}

const STORAGE_KEY = 'natalia_portfolio_media_meta_v3';
const LEGACY_STORAGE_KEY = 'natalia_portfolio_media_assets_v2';

export function getInitialMediaAssets(): MediaAssets {
  if (typeof window === 'undefined') return { ...DEFAULT_MEDIA, ...LOCKED_ASSETS };
  try {
    // Clean up legacy oversized storage key if present
    if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const merged: MediaAssets = { ...DEFAULT_MEDIA, ...LOCKED_ASSETS };
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'string' && v.trim() !== '' && !v.startsWith('blob:')) {
          (merged as any)[k] = v;
        }
      }
      // Always enforce authentic locked book cover
      merged.bookCover = PROJECT_BOOK_COVER;
      return merged;
    }
  } catch (e) {
    console.warn('Could not read saved media from localStorage', e);
  }
  return { ...DEFAULT_MEDIA, ...LOCKED_ASSETS };
}

export function saveMediaAssets(assets: MediaAssets): void {
  if (typeof window === 'undefined') return;
  try {
    const safeMeta: Record<string, string> = {};
    for (const [k, v] of Object.entries(assets)) {
      if (typeof v === 'string' && v.trim() !== '') {
        // Skip base64 strings larger than 300KB to stay well clear of 5MB localStorage quota; IndexedDB stores full size
        if (v.startsWith('data:') && v.length > 300000) {
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
