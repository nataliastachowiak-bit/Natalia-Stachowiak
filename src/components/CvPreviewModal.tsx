import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../types';
import { PdfViewer } from './PdfViewer';
import { CV_FILE } from '../data/assetRegistry';
import { getAbsoluteAssetUrl } from '../utils/assetPath';

interface CvPreviewModalProps {
  isOpen: boolean;
  currentLang: Language;
  onClose: () => void;
}

export const CvPreviewModal: React.FC<CvPreviewModalProps> = ({
  isOpen,
  currentLang,
  onClose,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const absoluteCvUrl = getAbsoluteAssetUrl(CV_FILE);

  // Keyboard navigation: Escape to close, + / - to zoom, 0 to reset zoom
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        setZoom((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 2.0));
      } else if (e.key === '-' || e.key === '_') {
        setZoom((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.65));
      } else if (e.key === '0') {
        setZoom(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 2.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.65));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  const zoomPercent = Math.round(zoom * 100);

  const t = {
    de: {
      title: 'Lebenslauf — Natalia Stachowiak',
      badge: 'ORIGINAL-DOKUMENT · 2 SEITEN',
      download: 'CV herunterladen',
      openTab: 'In neuem Tab öffnen',
      close: 'Schließen (Esc)',
      zoomIn: 'Vergrößern (+)',
      zoomOut: 'Verkleinern (-)',
      zoomReset: 'Zoom zurücksetzen (0)',
      footerNote: 'Authentischer 2-seitiger grafischer Lebenslauf · Alle Qualifikationen & Case Studies vollständig enthalten',
    },
    en: {
      title: 'Curriculum Vitae — Natalia Stachowiak',
      badge: 'ORIGINAL DOCUMENT · 2 PAGES',
      download: 'Download CV',
      openTab: 'Open in new tab',
      close: 'Close (Esc)',
      zoomIn: 'Zoom in (+)',
      zoomOut: 'Zoom out (-)',
      zoomReset: 'Reset zoom (0)',
      footerNote: 'Authentic 2-page graphical CV · All qualifications & case studies fully included',
    },
    pl: {
      title: 'Życiorys — Natalia Stachowiak',
      badge: 'ORYGINALNY DOKUMENT · 2 STRONY',
      download: 'Pobierz CV',
      openTab: 'Otwórz w nowej karcie',
      close: 'Zamknij (Esc)',
      zoomIn: 'Powiększ (+)',
      zoomOut: 'Pomniejsz (-)',
      zoomReset: 'Resetuj powiększenie (0)',
      footerNote: 'Autentyczny 2-stronicowy życiorys graficzny · Wszystkie kwalifikacje i studia przypadków zachowane',
    },
  }[currentLang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col h-[95vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-[#C7A35A]/35 bg-[#101412] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        {/* Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C7A35A]/20 bg-[#080A09]/95 px-4 sm:px-6 py-3.5 backdrop-blur-md">
          {/* Document Title & Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#101412] border border-[#0F5C46]/50 text-[#C7A35A]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#148B78]" />
                <span className="font-sans text-[10px] font-bold tracking-widest text-[#C7A35A] uppercase truncate">
                  {t.badge}
                </span>
              </div>
              <h2 className="font-serif text-base sm:text-lg font-medium text-[#F4F1EA] truncate">
                {t.title}
              </h2>
            </div>
          </div>

          {/* Center / Right: Zoom Controls & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Zoom Controls */}
            <div className="flex items-center rounded-lg border border-[#C7A35A]/25 bg-[#101412] px-1 py-0.5 text-xs text-[#F4F1EA]">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.65}
                title={t.zoomOut}
                className="flex h-7 w-7 items-center justify-center rounded text-[#C7A35A] hover:bg-[#080A09] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label={t.zoomOut}
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleZoomReset}
                title={t.zoomReset}
                className="px-2 font-mono text-[11px] text-[#A9AEA9] hover:text-[#C7A35A]"
              >
                {zoomPercent}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 2.0}
                title={t.zoomIn}
                className="flex h-7 w-7 items-center justify-center rounded text-[#C7A35A] hover:bg-[#080A09] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label={t.zoomIn}
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleZoomReset}
                title={t.zoomReset}
                className="flex h-7 w-7 items-center justify-center rounded text-[#A9AEA9] hover:bg-[#080A09] hover:text-[#C7A35A]"
                aria-label={t.zoomReset}
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>

            {/* Open in New Tab (uses absolute URL to completely avoid iframe issues) */}
            <a
              href={absoluteCvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-[#C7A35A]/40 bg-transparent px-3.5 py-1.5 font-sans text-xs font-medium text-[#F4F1EA] transition-all hover:border-[#C7A35A] hover:bg-[#080A09] hover:text-[#C7A35A] uppercase"
              title={t.openTab}
            >
              <ExternalLink className="h-3.5 w-3.5 text-[#C7A35A]" />
              <span className="hidden sm:inline">{t.openTab}</span>
            </a>

            {/* Direct Download */}
            <a
              href={absoluteCvUrl}
              download="Natalia_Stachowiak_CV_grafisch.pdf"
              className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-4 py-1.5 font-sans text-xs font-semibold tracking-wider text-white shadow-md transition-all hover:bg-[#148B78] uppercase"
              title={t.download}
            >
              <Download className="h-3.5 w-3.5 text-[#C7A35A]" />
              <span className="hidden sm:inline">{t.download}</span>
              <span className="sm:hidden">CV</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C7A35A]/30 bg-[#080A09] text-[#A9AEA9] hover:border-[#C7A35A] hover:text-[#F4F1EA] transition-colors"
              aria-label={t.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Viewer Body */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto bg-[#080A09]/95 p-4 sm:p-6 flex flex-col items-center"
        >
          <div className="w-full flex flex-col items-center justify-center">
            <PdfViewer
              pdfUrl={CV_FILE}
              zoom={zoom}
              title={t.title}
            />
          </div>
        </div>

        {/* Footer info strip */}
        <div className="border-t border-[#C7A35A]/20 bg-[#080A09] px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] text-[#A9AEA9]">
          <span className="truncate">{t.footerNote}</span>
          <span className="text-[#C7A35A] shrink-0 ml-2 font-mono">PDF · 3.5 MB</span>
        </div>
      </div>
    </div>
  );
};
