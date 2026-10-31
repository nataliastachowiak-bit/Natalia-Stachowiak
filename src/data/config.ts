/**
 * Portfolio Publishing & Configuration
 *
 * Strictly configured for public production release on GitHub Pages:
 * - Public read-only mode is permanently active.
 * - Editing, uploading, and debug override parameters (?edit=true / ?admin=true) are disabled.
 */
export const PORTFOLIO_CONFIG = {
  // Set to true: hide edit, upload, and media management buttons for public visitors
  IS_PUBLISHED: true,

  // Set to false: disallow URL overrides in public deployment
  ALLOW_EDIT_URL_OVERRIDE: false,
};

export function isEditModeActive(): boolean {
  // Always strictly read-only for public deployment
  return false;
}

