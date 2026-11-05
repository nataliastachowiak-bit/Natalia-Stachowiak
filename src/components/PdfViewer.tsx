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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [numPages, setNumPages] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasesRef = useRef<Map<number, HTMLCanvasElement>>(new Map());
  const renderTasksRef = useRef<Map<number, any>>(new Map());

  // CV_FILE is already base-path aware. Resolve it idempotently here.
  const safePdfUrl = encodeURI(decodeURI(resolveAssetUrl(pdfUrl).split('#')[0]));

  // Stage 1: load the document and mount the required canvas elements.
  // Never attempt rendering in this effect: React has not mounted the canvases yet.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPdfDocument(null);
    setNumPages(0);

    const loadingTask = pdfjsLib.getDocument({ url: safePdfUrl });
    loadingTask.promise.then(
      (pdf) => {
        if (cancelled) return;
        setNumPages(pdf.numPages);
        setPdfDocument(pdf);
        setLoading(false);
      },
      (err: any) => {
        if (cancelled) return;
        console.error('[PdfViewer] Could not load PDF:', err);
        setError(err?.message || 'PDF konnte nicht geladen werden.');
        setLoading(false);
        onError?.(err);
      }
    );

    return () => {
      cancelled = true;
      void loadingTask.destroy();
    };
  }, [safePdfUrl]);

  // Stage 2: render only after the new pages have committed to the DOM.
  // This eliminates the prior blank preview caused by missing canvas refs.
  useEffect(() => {
    if (!pdfDocument || !numPages || loading || error) return;

    let cancelled = false;
    renderTasksRef.current.forEach((task) => {
      try { task.cancel(); } catch {}
    });
    renderTasksRef.current.clear();

    const renderPages = async () => {
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        if (cancelled) return;
        try {
          const page = await pdfDocument.getPage(pageNum);
          if (cancelled) return;

          const canvas = canvasesRef.current.get(pageNum);
          if (!canvas) {
            throw new Error('PDF canvas not mounted for page ' + pageNum);
          }
          const context = canvas.getContext('2d');
          if (!context) throw new Error('PDF canvas context unavailable');

          const width = containerRef.current?.clientWidth || 800;
          const naturalWidth = page.getViewport({ scale: 1 }).width;
          const baseScale = Math.min(Math.max((width - 32) / naturalWidth, 0.45), 1.4);
          const scale = Math.max(baseScale * zoom, 0.45);
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const viewport = page.getViewport({ scale });

          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = Math.floor(viewport.width) + 'px';
          canvas.style.height = Math.floor(viewport.height) + 'px';
          context.setTransform(dpr, 0, 0, dpr, 0, 0);

          const task = page.render({ canvasContext: context, viewport });
          renderTasksRef.current.set(pageNum, task);
          await task.promise;
          renderTasksRef.current.delete(pageNum);
        } catch (err: any) {
          if (cancelled || err?.name === 'RenderingCancelledException') return;
          console.error('[PdfViewer] Could not render PDF page:', err);
          setError(err?.message || 'PDF-Seite konnte nicht angezeigt werden.');
          onError?.(err);
          return;
        }
      }
    };
    void renderPages();

    return () => {
      cancelled = true;
      renderTasksRef.current.forEach((task) => {
        try { task.cancel(); } catch {}
      });
      renderTasksRef.current.clear();
    };
  }, [pdfDocument, numPages, loading, error, zoom]);

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
          <a href={safePdfUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-[#C7A35A] underline hover:text-white">
            Dokument direkt als PDF öffnen
          </a>
        </div>
      )}

      <div className={`space-y-6 flex flex-col items-center w-full ${loading || error ? 'hidden' : ''}`}>
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
          <div key={pageNum} className="shadow-2xl rounded-xl overflow-hidden bg-white border border-[#C7A35A]/30">
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
