/**
 * CENTRAL IMMUTABLE ASSET REGISTRY
 *
 * ALL PORTFOLIO IMAGES ARE STRICTLY LOCKED AND PERMANENTLY ASSIGNED.
 * These images have been approved by Natalia Stachowiak and must NEVER be
 * regenerated, replaced, randomized, substituted, or changed under any circumstance
 * (page refresh, reopening, preview, publishing, sharing, cross-device, cross-browser, new session).
 *
 * The SAME content image remains assigned to the SAME section on Desktop, Tablet and Mobile.
 * Changing language (DE / EN / PL) never changes any image assignment.
 */

// Explicit, immutable single source of truth for all section images:
export const HOME_MAIN_IMAGE = '/assets/hero_portrait.jpg';
export const ABOUT_IMAGE = '/assets/about_portrait.jpg';
export const CV_FILE = '/assets/Natalia_Stachowiak_CV_grafisch_FINAL_2026.pdf';
export const PROJECT_ENVIRONIX_IMAGE = '/assets/environix_preview.jpg';
export const PROJECT_BUILDING_AI_IMAGE = '/assets/ai_building_vision.png';
export const PROJECT_BUILDING_AI_WORKFLOW = '/assets/ai_building_workflow.png';
export const PROJECT_STREETLIFE_IMAGE = '/assets/streetlife_mockup.jpg';
export const PROJECT_CIRCULAR_AI_IMAGE = '/assets/circulartwin_vision.png';
export const CIRCULARTWIN_FUNKTIONEN = '/assets/circulartwin_funktionen.png';
export const CIRCULARTWIN_IMPACT = '/assets/circulartwin_impact.png';
export const PROJECT_GAIN_IMAGE = '/assets/gain_mockup.jpg';
export const PROJECT_VINYL_IMAGE = '/assets/vinyl_mockup.jpg';
export const PROJECT_DINEEASE_IMAGE = '/assets/dineease_mockup.jpg';
export const PROJECT_BOOK_COVER = '/assets/book_cover.jpg';
export const PROJECT_BOOK_INSTAGRAM_QR = '/assets/instagram_qr.jpg';
export const JOURNEY_LANDSCAPE_IMAGE = '/assets/my_journey_landscape.jpg';

// 09 EcoMargin AI (Dedicated namespace - completely separated from existing assets)
export const PROJECT_ECOMARGIN_IMAGE = '/assets/ecomargin_cover.svg';
export const ECOMARGIN_COVER = '/assets/ecomargin_cover.svg';
export const ECOMARGIN_HERO = '/assets/ecomargin_cover.svg';
export const ECOMARGIN_PROBLEM = '/assets/ecomargin_problem.svg';
export const ECOMARGIN_FLOW = '/assets/ecomargin_flow.svg';
export const ECOMARGIN_PROTOTYPE = '/assets/ecomargin_prototype.svg';

export const LOCKED_ASSETS = {
  // Canonical Identifiers
  homeMainImage: HOME_MAIN_IMAGE,
  aboutImage: ABOUT_IMAGE,
  cvFile: CV_FILE,

  // Personal Photographs (Strictly Approved & Locked)
  profilePhoto: HOME_MAIN_IMAGE,
  aboutPhoto: ABOUT_IMAGE,
  heroPortrait: HOME_MAIN_IMAGE,
  aboutPortrait: ABOUT_IMAGE,

  // Project Visuals & Case Studies (Permanently Assigned)
  // 01 eNvironix AI
  environixCover: PROJECT_ENVIRONIX_IMAGE,
  environixImage: PROJECT_ENVIRONIX_IMAGE,

  // 02 Building AI Concept
  aiBuildingCover: PROJECT_BUILDING_AI_IMAGE,
  aiBuildingVision: PROJECT_BUILDING_AI_IMAGE,
  aiBuildingWorkflow: PROJECT_BUILDING_AI_WORKFLOW,
  aiBuildingArchitecture: PROJECT_BUILDING_AI_WORKFLOW,

  // 03 Street.life / FanPulse
  streetlifeCover: PROJECT_STREETLIFE_IMAGE,
  streetLifeImage: PROJECT_STREETLIFE_IMAGE,

  // 04 CircularTwin AI (Vision = Cover & Primary Thumbnail, Funktionen = Architecture, Impact = Lifecycle)
  circularTwinCover: PROJECT_CIRCULAR_AI_IMAGE,
  circularTwinImage: PROJECT_CIRCULAR_AI_IMAGE,
  circularTwinVision: PROJECT_CIRCULAR_AI_IMAGE,
  circularTwinFunktionen: CIRCULARTWIN_FUNKTIONEN,
  circularTwinImpact: CIRCULARTWIN_IMPACT,
  circularTwinExperience: CIRCULARTWIN_IMPACT,

  // 05 GAIN (Netflix Discovery)
  gainCover: PROJECT_GAIN_IMAGE,
  gainImage: PROJECT_GAIN_IMAGE,

  // 06 Vinyl (AI Event Support)
  vinylCover: PROJECT_VINYL_IMAGE,
  vinylImage: PROJECT_VINYL_IMAGE,

  // 07 Dine-Ease (Smart Shift Scheduling)
  dineeaseCover: PROJECT_DINEEASE_IMAGE,
  dineEaseImage: PROJECT_DINEEASE_IMAGE,

  // 08 Du bist nicht zu viel (Published Book & Community)
  bookCover: PROJECT_BOOK_COVER,
  instagramQr: PROJECT_BOOK_INSTAGRAM_QR,

  // 09 EcoMargin AI (Restaurant Decision Intelligence)
  ecomarginCover: PROJECT_ECOMARGIN_IMAGE,
  ecomarginImage: PROJECT_ECOMARGIN_IMAGE,
  ecomarginHero: ECOMARGIN_HERO,
  ecomarginProblem: ECOMARGIN_PROBLEM,
  ecomarginFlow: ECOMARGIN_FLOW,
  ecomarginPrototype: ECOMARGIN_PROTOTYPE,

  // Panoramic Journey Visual
  journeyLandscape: JOURNEY_LANDSCAPE_IMAGE,
} as const;

export type LockedAssetKey = keyof typeof LOCKED_ASSETS;

/**
 * Returns the permanent, locked static image URL for any section or key.
 * Strictly resolves to the exact approved static asset.
 * No ambiguous fuzzy pattern matching or dynamic replacements.
 */
export function getLockedAsset(key: string): string {
  if (!key) return '';
  const cleanKey = key.trim();
  if (cleanKey in LOCKED_ASSETS) {
    return LOCKED_ASSETS[cleanKey as LockedAssetKey];
  }

  // Exact identifier switch to prevent any accidental cross-swapping
  switch (cleanKey.toLowerCase()) {
    case 'home':
    case 'hero':
    case 'heroportrait':
    case 'homemainimage':
    case 'profilephoto':
      return HOME_MAIN_IMAGE;

    case 'about':
    case 'aboutportrait':
    case 'aboutimage':
    case 'aboutphoto':
      return ABOUT_IMAGE;

    case 'environix':
    case 'environiximage':
    case 'environixcover':
      return PROJECT_ENVIRONIX_IMAGE;

    case 'ai-building':
    case 'ai-building-concept':
    case 'building':
    case 'aibuildingcover':
    case 'aibuildingvision':
      return PROJECT_BUILDING_AI_IMAGE;

    case 'aibuildingworkflow':
    case 'aibuildingarchitecture':
      return PROJECT_BUILDING_AI_WORKFLOW;

    case 'street-life':
    case 'streetlife':
    case 'fanpulse':
    case 'streetlifeimage':
    case 'streetlifecover':
      return PROJECT_STREETLIFE_IMAGE;

    case 'circulartwin':
    case 'circulartwin-ai':
    case 'circular-twin':
    case 'circulartwincover':
    case 'circulartwinimage':
    case 'circulartwinvision':
      return PROJECT_CIRCULAR_AI_IMAGE;

    case 'circulartwinfunktionen':
    case 'ct_funktionen':
    case 'ct-funktionen':
      return CIRCULARTWIN_FUNKTIONEN;

    case 'circulartwinimpact':
    case 'circulartwinexperience':
      return CIRCULARTWIN_IMPACT;

    case 'gain':
    case 'gainimage':
    case 'gaincover':
      return PROJECT_GAIN_IMAGE;

    case 'vinyl':
    case 'vinylimage':
    case 'vinylcover':
      return PROJECT_VINYL_IMAGE;

    case 'dine-ease':
    case 'dineease':
    case 'dineeaseimage':
    case 'dineeasecover':
      return PROJECT_DINEEASE_IMAGE;

    case 'ecomargin':
    case 'ecomargin-ai':
    case 'project_ecomargin':
    case 'ecomargincover':
    case 'ecomarginimage':
      return PROJECT_ECOMARGIN_IMAGE;

    case 'ecomarginhero':
      return ECOMARGIN_HERO;

    case 'ecomarginproblem':
      return ECOMARGIN_PROBLEM;

    case 'ecomarginflow':
      return ECOMARGIN_FLOW;

    case 'ecomarginprototype':
      return ECOMARGIN_PROTOTYPE;

    case 'book':
    case 'bookcover':
    case 'du-bist-nicht-zu-viel':
      return PROJECT_BOOK_COVER;

    case 'instagramqr':
    case 'instagram_qr':
    case 'qr':
      return PROJECT_BOOK_INSTAGRAM_QR;

    case 'journey':
    case 'journeylandscape':
    case 'my_journey_landscape':
      return JOURNEY_LANDSCAPE_IMAGE;

    case 'cv':
    case 'cvfile':
    case 'cvpdf':
      return CV_FILE;

    default:
      return '';
  }
}
