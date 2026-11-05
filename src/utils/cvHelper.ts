import { getAbsoluteAssetUrl } from './assetPath';
import { CV_FILE } from '../data/assetRegistry';

/**
 * Download the original approved graphical CV.
 * Use a native same-origin anchor rather than async fetch/Blob:
 * this avoids returning an HTML error page disguised as a PDF,
 * popup blockers and Blob URL timing problems.
 */
export function downloadCvDocument(
  filename: string = 'Natalia_Stachowiak_CV.pdf'
): void {
  const url = getAbsoluteAssetUrl(CV_FILE);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Open the original PDF in a new tab using its canonical public URL. */
export function openCvInNewTab(): void {
  const url = getAbsoluteAssetUrl(CV_FILE);
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
}
