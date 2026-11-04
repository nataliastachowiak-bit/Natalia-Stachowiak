import { resolveAssetUrl, getAbsoluteAssetUrl } from './assetPath';
import { CV_FILE } from '../data/assetRegistry';

/**
 * Trigger direct, clean download of the authentic 2-page CV PDF.
 * Uses fetch + Blob to guarantee that:
 * 1. The iframe never navigates
 * 2. No redirects to aistudio.google.com or Cloud Run authentication occur
 * 3. The file is cleanly saved to the user's system as Natalia_Stachowiak_CV.pdf
 */
export async function downloadCvDocument(
  filename: string = 'Natalia_Stachowiak_CV.pdf'
): Promise<void> {
  const url = resolveAssetUrl(CV_FILE);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 15000);
  } catch (err) {
    console.warn('[CV] Blob download failed, falling back to direct anchor:', err);
    const directUrl = getAbsoluteAssetUrl(CV_FILE);
    const a = document.createElement('a');
    a.href = directUrl;
    a.download = filename;
    a.target = '_self';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

/**
 * Opens the CV PDF in a fresh browser tab using an in-memory Blob URL or direct URL.
 */
export async function openCvInNewTab(): Promise<void> {
  const url = resolveAssetUrl(CV_FILE);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(
      new Blob([blob], { type: 'application/pdf' })
    );
    window.open(blobUrl, '_blank', 'noopener,noreferrer');
  } catch (err) {
    console.warn('[CV] Blob preview failed, falling back to direct URL:', err);
    const directUrl = getAbsoluteAssetUrl(CV_FILE);
    window.open(directUrl, '_blank', 'noopener,noreferrer');
  }
}
