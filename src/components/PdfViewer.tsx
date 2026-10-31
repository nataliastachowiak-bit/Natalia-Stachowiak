import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Loader2, AlertCircle } from 'lucide-react';

import { resolveAssetUrl } from '../utils/assetPath';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = resolveAssetUrl('/pdf.worker.min.js');
}

interface PdfViewerProps {
  pdfUrl: string;
  zoom: number;
  title: string;
  onError?: (err: any) => void;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  zoom,
  title,
  onError,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasesRef = useRef<Map<number, HTMLCanvasElement>>(new Map());
  const renderTasksRef = useRef<Map<number, any>>(new Map());

  // Clean URL: resolve base, strip hash, decode, and encode safely
  const resolvedUrl = resolveAssetUrl(pdfUrl);
  const cleanBaseUrl = resolvedUrl.split('#')[0];
  const safePdfUrl = encodeURI(decodeURI(cleanBaseUrl));

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    const loadDocument = async () => {
      try {
        // Cancel any pending page render tasks
        renderTasksRef.current.forEach((task) => {
          try {
            task.cancel();
          } catch {}
        });
        renderTasksRef.current.clear();

        const loadingTask = pdfjsLib.getDocument({
          url: safePdfUrl,
          cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        setNumPages(pdf.numPages);
        setLoading(false);

        // Render all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (isCancelled) break;
          const page = await pdf.getPage(pageNum);
          if (isCancelled) break;

          const canvas = canvasesRef.current.get(pageNum);
          if (!canvas) continue;

          const context = canvas.getContext('2d');
          if (!context) continue;

          // Determine target container width for responsive scaling
          const containerWidth = containerRef.current?.clientWidth || 800;
          const unscaledViewport = page.getViewport({ scale: 1 });

          // Base fit width calculation with margin
          const baseScale = Math.min((containerWidth - 32) / unscaledViewport.width, 1.4);
          const finalScale = Math.max(baseScale * zoom, 0.45);

          // High-DPI support
          const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
          const viewport = page.getViewport({ scale: finalScale });

          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          context.setTransform(dpr, 0, 0, dpr, 0, 0);

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          const renderTask = page.render(renderContext);
          renderTasksRef.current.set(pageNum, renderTask);

          try {
            await renderTask.promise;
          } catch (renderErr: any) {
            if (renderErr?.name !== 'RenderingCancelledException') {
              console.warn(`[PdfViewer] Page ${pageNum} render error:`, renderErr);
            }
          }
        }
      } catch (err: any) {
        if (!isCancelled) {
          console.error('[PdfViewer] Error loading PDF:', err);
          setError(err?.message || 'PDF konnte nicht geladen werden.');
          if (onError) onError(err);
          setLoading(false);
        }
      }
    };

    loadDocument();

    return () => {
      isCancelled = true;
      renderTasksRef.current.forEach((task) => {
        try {
          task.cancel();
        } catch {}
      });
      renderTasksRef.current.clear();
    };
  }, [safePdfUrl, zoom]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 text-[#C7A35A]">
          <Loader2 className="h-8 w-8 animate-spin mb-3 text-[#148B78]" />
          <span className="text-xs uppercase tracking-wider text-[#A9AEA9]">
            Lade Original-Dokument ({title})...
          </span>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center p-8 bg-[#141A16] rounded-xl border border-red-500/40 text-red-200 max-w-md my-4">
          <AlertCircle className="h-8 w-8 text-red-400 mb-2" />
          <p className="text-xs font-semibold text-center mb-2">{error}</p>
          <a
            href={safePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#C7A35A] underline hover:text-white"
          >
            Dokument in neuem Fenster öffnen ↗
          </a>
        </div>
      )}

      <div className={`space-y-6 flex flex-col items-center w-full ${loading ? 'hidden' : 'block'}`}>
        {Array.from({ length: numPages || 1 }, (_, i) => i + 1).map((pageNum) => (
          <div
            key={pageNum}
            className="shadow-2xl rounded-xl overflow-hidden bg-white border border-[#C7A35A]/30 transition-all duration-150"
          >
            <canvas
              ref={(el) => {
                if (el) canvasesRef.current.set(pageNum, el);
                else canvasesRef.current.delete(pageNum);
              }}
              className="block max-w-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
