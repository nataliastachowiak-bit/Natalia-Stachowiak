/**
 * Portfolio Publishing & Configuration
 *
 * Set IS_PUBLISHED to true to close/hide editing and uploading options for visitors
 * when sharing the portfolio publicly.
 * You can also toggle preview mode in local browser via URL param: ?edit=true or ?edit=false
 */
export const PORTFOLIO_CONFIG = {
  // Set to true to hide edit, upload, and media management buttons for public sharing
  IS_PUBLISHED: true,

  // Allows opening edit mode via URL parameter ?edit=true or ?admin=true
  ALLOW_EDIT_URL_OVERRIDE: true,
};

export function isEditModeActive(): boolean {
  if (typeof window === 'undefined') {
    return !PORTFOLIO_CONFIG.IS_PUBLISHED;
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (PORTFOLIO_CONFIG.ALLOW_EDIT_URL_OVERRIDE) {
    if (urlParams.get('edit') === 'true' || urlParams.get('admin') === 'true') {
      return true;
    }
    if (urlParams.get('edit') === 'false' || urlParams.get('preview') === 'true') {
      return false;
    }
  }

  return !PORTFOLIO_CONFIG.IS_PUBLISHED;
}
