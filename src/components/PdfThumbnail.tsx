import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileText, Upload, AlertCircle, Loader2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

interface PdfThumbnailProps {
  pdfUrl?: string;
  certId: string;
  title: string;
  issuer?: string;
  className?: string;
  aspectRatio?: string;
  onUploadSuccess?: (certId: string, newUrl: string) => void;
  showUploadTrigger?: boolean;
}

export const PdfThumbnail: React.FC<PdfThumbnailProps> = ({
  pdfUrl,
  certId,
  title,
  issuer,
  className = '',
  aspectRatio = 'aspect-[1.3/1]',
  onUploadSuccess,
  showUploadTrigger = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [renderSuccess, setRenderSuccess] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    if (!pdfUrl) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    setRenderSuccess(false);

    const cleanBaseUrl = pdfUrl.split('#')[0];
    const safeUrl = encodeURI(decodeURI(cleanBaseUrl));

    const loadPdfPage = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: safeUrl,
          cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        const page = await pdf.getPage(1);
        if (isCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Render at high resolution for sharp preview
        const viewport = page.getViewport({ scale: 1 });
        const targetWidth = canvas.parentElement?.clientWidth || 360;
        const scale = Math.max((targetWidth / viewport.width) * 1.5, 1.2);
        const scaledViewport = page.getViewport({ scale });

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
          canvas: canvas,
        };

        await page.render(renderContext).promise;

        if (!isCancelled) {
          setLoading(false);
          setRenderSuccess(true);
        }
      } catch (err) {
        if (!isCancelled) {
          console.warn(`[PdfThumbnail] Could not render page 1 for ${certId} (${pdfUrl}):`, err);
          setLoading(false);
          setError(true);
        }
      }
    };

    loadPdfPage();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl, certId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Bitte wählen Sie ein authentisches PDF-Dokument aus (.pdf).');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const res = await fetch('/api/certificates/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            certId,
            pdfBase64: base64Data,
            fileName: file.name,
          }),
        });

        const data = await res.json();
        if (data.success && data.pdfUrl) {
          setIsUploading(false);
          if (onUploadSuccess) {
            onUploadSuccess(certId, data.pdfUrl);
          }
          // Force reload of current canvas
          window.location.reload();
        } else {
          setIsUploading(false);
          alert(data.error || 'Fehler beim Hochladen des Zertifikats');
        }
      };
      reader.readAsDataURL(file);
    } catch (uploadErr) {
      console.error('Upload error:', uploadErr);
      setIsUploading(false);
      alert('Fehler bei der Dateiübertragung.');
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-[#C7A35A]/25 bg-[#080A09] ${aspectRatio} flex items-center justify-center group/thumb ${className}`}
    >
      {/* Hidden file input for uploading authentic PDF */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Actual rendered page 1 canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
          renderSuccess ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
        }`}
      />

      {/* Loading State */}
      {loading && !renderSuccess && (
        <div className="flex flex-col items-center justify-center p-4 text-center text-[#A9AEA9] space-y-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#C7A35A]" />
          <span className="text-[10px] tracking-wider uppercase">Original-Dokument lädt...</span>
        </div>
      )}

      {/* Fallback state when PDF is unavailable or error */}
      {error && !renderSuccess && !loading && (
        <div className="flex flex-col items-center justify-center p-4 text-center text-[#A9AEA9] space-y-2.5 w-full h-full bg-[#101412]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C7A35A]/40 bg-[#080A09] text-[#C7A35A]">
            <FileText className="h-5 w-5" />
          </div>
          <div className="space-y-0.5 max-w-[85%]">
            <span className="block text-[11px] font-semibold text-[#F4F1EA] truncate">
              {title}
            </span>
            {issuer && (
              <span className="block text-[9px] text-[#148B78] uppercase tracking-wider truncate">
                {issuer}
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded border border-amber-500/40 bg-amber-950/30 px-2 py-0.5 text-[9px] font-medium text-amber-300 mt-1">
              <AlertCircle className="h-2.5 w-2.5" />
              Original-PDF ausstehend
            </span>
          </div>

          <button
            type="button"
            onClick={triggerUpload}
            disabled={isUploading}
            className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-3 py-1 text-[10px] font-semibold text-white uppercase tracking-wider hover:bg-[#148B78] transition-all shadow-sm"
          >
            {isUploading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Upload className="h-3 w-3 text-[#C7A35A]" />
            )}
            <span>{isUploading ? 'Lädt hoch...' : 'PDF hochladen'}</span>
          </button>
        </div>
      )}

      {/* Subtle overlay on hover with option to replace or view */}
      {renderSuccess && showUploadTrigger && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
          <button
            type="button"
            onClick={triggerUpload}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#C7A35A] bg-[#101412]/90 px-3 py-1.5 text-[10px] font-semibold text-[#F4F1EA] hover:bg-[#0F5C46] hover:text-white transition-all uppercase tracking-wider shadow-md backdrop-blur-xs"
            title="Authentisches Original-PDF ersetzen/aktualisieren"
          >
            <Upload className="h-3 w-3 text-[#C7A35A]" />
            <span>PDF aktualisieren</span>
          </button>
        </div>
      )}
    </div>
  );
};
