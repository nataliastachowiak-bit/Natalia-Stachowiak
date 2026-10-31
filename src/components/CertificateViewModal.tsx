import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  FileCheck2,
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Upload,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { CertificateItem, Language } from '../types';
import { PdfViewer } from './PdfViewer';

interface CertificateViewModalProps {
  cert: CertificateItem | null;
  currentLang: Language;
  onClose: () => void;
  onCertUpdated?: (certId: string, newPdfUrl: string) => void;
}

export const CertificateViewModal: React.FC<CertificateViewModalProps> = ({
  cert: initialCert,
  currentLang,
  onClose,
  onCertUpdated,
}) => {
  const [cert, setCert] = useState<CertificateItem | null>(initialCert);
  const [copiedId, setCopiedId] = useState(false);
  const [displayMode, setDisplayMode] = useState<'pdf' | 'details'>('pdf');
  const [zoom, setZoom] = useState<number>(1);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [pdfLoadError, setPdfLoadError] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCert(initialCert);
    setPdfLoadError(false);
    setZoom(1);
  }, [initialCert]);

  // Keyboard navigation: Escape to close, + / - to zoom, 0 to reset zoom
  useEffect(() => {
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
  }, [onClose]);

  if (!cert) return null;

  const handleCopyId = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 2.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.65));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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
            certId: cert.id,
            pdfBase64: base64Data,
            fileName: file.name,
          }),
        });

        const data = await res.json();
        if (data.success && data.pdfUrl) {
          setIsUploading(false);
          setCert({
            ...cert,
            pdfUrl: data.pdfUrl,
          });
          setPdfLoadError(false);
          if (onCertUpdated) {
            onCertUpdated(cert.id, data.pdfUrl);
          }
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

  const zoomPercent = Math.round(zoom * 100);

  const hasValidPdf = Boolean(cert.pdfUrl && cert.isAuthentic !== false && !pdfLoadError);

  const t = {
    de: {
      eyebrowAvailable: 'ORIGINAL-DOKUMENT · ZERTIFIZIERTER NACHWEIS',
      eyebrowMissing: 'QUALIFIKATIONSDETAILS · ORIGINAL-PDF ERFORDERLICH',
      pdfView: 'PDF Ansicht',
      detailsView: 'Curriculum & Details',
      zoomIn: 'Vergrößern (+)',
      zoomOut: 'Verkleinern (-)',
      zoomReset: 'Originalgröße (100%)',
      close: 'Schließen',
      verifiedNoticeAvailable: 'Offiziell hinterlegtes Dokument im Portfolio von',
      verifiedNoticeMissing: 'Das authentische Original-PDF liegt für dieses Dokument noch nicht vor.',
      verifyOnline: 'Online verifizieren ↗',
      idCopied: 'Kopiert!',
      copyId: 'ID kopieren',
      skillsTitle: 'Erworbene Fähigkeiten & Ausbildungsinhalte',
      profileTitle: 'Kompetenzprofil & Kontext',
      issuerLabel: 'BILDUNGSTRÄGER / INSTITUT',
      dateLabel: 'AUSSTELLUNGSDATUM',
      signatoryLabel: 'UNTERZEICHNER / PRÜFER',
      refLabel: 'Zertifikat-ID / Referenz:',
      defaultSignatory: 'Offizielle Akkreditierungsstelle',
      officialDocAvailable: 'Offizielles Originaldokument:',
      officialDocMissing: 'Originaldatei ausstehend:',
      uploadPdf: 'Original-PDF hochladen',
      uploading: 'Lädt hoch...',
      replacePdf: 'PDF ersetzen / aktualisieren',
    },
    en: {
      eyebrowAvailable: 'ORIGINAL DOCUMENT · VERIFIED CREDENTIAL',
      eyebrowMissing: 'CREDENTIAL DETAILS · ORIGINAL PDF REQUIRED',
      pdfView: 'PDF View',
      detailsView: 'Curriculum & Details',
      zoomIn: 'Zoom In (+)',
      zoomOut: 'Zoom Out (-)',
      zoomReset: 'Reset Zoom (100%)',
      close: 'Close',
      verifiedNoticeAvailable: 'Official document deposited in the portfolio of',
      verifiedNoticeMissing: 'The authentic original PDF is not yet available for this credential.',
      verifyOnline: 'Verify Online ↗',
      idCopied: 'Copied!',
      copyId: 'Copy ID',
      skillsTitle: 'Skills Acquired & Curriculum',
      profileTitle: 'Competency Profile & Context',
      issuerLabel: 'ISSUING INSTITUTION',
      dateLabel: 'ISSUE DATE',
      signatoryLabel: 'SIGNATORY / EXAMINER',
      refLabel: 'Certificate ID / Reference:',
      defaultSignatory: 'Official Accreditation Board',
      officialDocAvailable: 'Official authentic document:',
      officialDocMissing: 'Original file pending:',
      uploadPdf: 'Upload Original PDF',
      uploading: 'Uploading...',
      replacePdf: 'Replace / Update PDF',
    },
    pl: {
      eyebrowAvailable: 'ORYGINALNY DOKUMENT · CERTYFIKAT',
      eyebrowMissing: 'SZCZEGÓŁY KWALIFIKACJI · WYMAGANY ORYGINALNY PLIK PDF',
      pdfView: 'Podgląd PDF',
      detailsView: 'Program & Szczegóły',
      zoomIn: 'Powiększ (+)',
      zoomOut: 'Pomniejsz (-)',
      zoomReset: 'Domyślny rozmiar (100%)',
      close: 'Zamknij',
      verifiedNoticeAvailable: 'Oficjalny dokument zdeponowany w portfolio',
      verifiedNoticeMissing: 'Oryginalny plik PDF nie został jeszcze zdeponowany.',
      verifyOnline: 'Zweryfikuj online ↗',
      idCopied: 'Skopiowano!',
      copyId: 'Kopiuj ID',
      skillsTitle: 'Nabyte umiejętności i zakres szkolenia',
      profileTitle: 'Profil kompetencji i kontekst',
      issuerLabel: 'INSTYTUCJA WYDAJĄCA',
      dateLabel: 'DATA WYDANIA',
      signatoryLabel: 'SYGNATARIUSZ / EGZAMINATOR',
      refLabel: 'ID certyfikatu / Referencja:',
      defaultSignatory: 'Oficjalna jednostka akredytująca',
      officialDocAvailable: 'Oficjalny oryginalny dokument:',
      officialDocMissing: 'Oczekiwanie na plik:',
      uploadPdf: 'Wgraj oryginalny PDF',
      uploading: 'Wgrywanie...',
      replacePdf: 'Zaktualizuj PDF',
    },
  }[currentLang];

  const titleText = cert.titleI18n?.[currentLang] || cert.title;
  const issuerText = cert.issuerI18n?.[currentLang] || cert.issuer;
  const focusText = cert.focusI18n?.[currentLang] || cert.focus;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4 md:p-6 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      {/* Hidden file input for authentic PDF uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className="relative my-4 sm:my-8 w-full max-w-5xl overflow-hidden rounded-2xl border border-[#C7A35A]/50 bg-[#080A09] p-3 sm:p-6 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#0F5C46]/25 blur-3xl" />

        {/* 1. Modal Topbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C7A35A]/20 pb-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0 max-w-xl">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-[#C7A35A] bg-[#101412] text-[#C7A35A] shrink-0">
              <Award className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-widest text-[#C7A35A] uppercase truncate">
                  {cert.docTypeLabel?.[currentLang] || cert.docTypeLabel?.de || (hasValidPdf ? t.eyebrowAvailable : t.eyebrowMissing)}
                </span>
                {cert.courseCode && (
                  <span className="rounded border border-[#C7A35A]/40 bg-[#101412] px-1.5 py-0.2 text-[10px] font-mono text-[#F4F1EA] shrink-0">
                    {cert.courseCode}
                  </span>
                )}
              </div>
              <h3
                id="cert-modal-title"
                className="mt-0.5 font-serif text-base sm:text-xl lg:text-2xl font-semibold text-[#F4F1EA] leading-tight truncate"
              >
                {titleText}
              </h3>
            </div>
          </div>

          {/* Topbar Controls */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-[#C7A35A]/30 bg-[#101412] p-1">
              <button
                type="button"
                onClick={() => setDisplayMode('pdf')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  displayMode === 'pdf'
                    ? 'border border-[#C7A35A]/60 bg-[#0F5C46] text-[#F4F1EA] shadow-sm'
                    : 'text-[#A9AEA9] hover:text-[#F4F1EA]'
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-[#C7A35A]" />
                <span className="hidden xs:inline">{t.pdfView}</span>
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('details')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  displayMode === 'details'
                    ? 'border border-[#C7A35A]/60 bg-[#0F5C46] text-[#F4F1EA] shadow-sm'
                    : 'text-[#A9AEA9] hover:text-[#F4F1EA]'
                }`}
              >
                <span className="hidden xs:inline">{t.detailsView}</span>
              </button>
            </div>

            {/* Direct Verify Link if available (e.g. Scrum.org) */}
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#C7A35A]/50 bg-[#101412] px-3 py-1.5 text-xs font-semibold text-[#C7A35A] hover:bg-[#0F5C46] hover:text-white transition-all uppercase tracking-wider shadow-sm"
                title="Verify Credential"
              >
                <span>{cert.verificationUrl.includes('scrum.org') ? 'Verify Credential' : t.verifyOnline}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-full border border-[#C7A35A]/40 bg-[#101412] p-2 text-[#A9AEA9] transition-colors hover:border-[#C7A35A] hover:bg-[#141A16] hover:text-white"
              aria-label={t.close}
              title={t.close}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 2. Modal Body */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1 text-sm text-[#A9AEA9] space-y-4">
          
          {/* DISPLAY MODE 1: ORIGINAL PDF VIEWER */}
          {displayMode === 'pdf' && (
            <div className="space-y-3">
              {/* PDF Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#C7A35A]/25 bg-[#101412] px-3 py-2 text-xs">
                <span className="flex items-center gap-1.5 text-[#148B78] font-medium text-[11px] sm:text-xs">
                  <FileCheck2 className="h-4 w-4 text-[#C7A35A] shrink-0" />
                  <span className="truncate">
                    {hasValidPdf ? t.officialDocAvailable : t.officialDocMissing}{' '}
                    <strong className="text-[#F4F1EA]">{issuerText}</strong>
                  </span>
                </span>

                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  {hasValidPdf && (
                    <div className="flex items-center gap-1 bg-[#080A09] border border-[#C7A35A]/30 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={handleZoomOut}
                        disabled={zoom <= 0.65}
                        title={t.zoomOut}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#0F5C46]/50 bg-[#101412] text-[#F4F1EA] hover:border-[#C7A35A] hover:bg-[#0F5C46] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label={t.zoomOut}
                      >
                        <ZoomOut className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleZoomReset}
                        title={t.zoomReset}
                        className="min-w-[42px] px-1 h-7 font-mono text-[11px] font-bold text-[#C7A35A] hover:text-white transition-colors text-center"
                        aria-label={t.zoomReset}
                      >
                        {zoomPercent}%
                      </button>

                      <button
                        type="button"
                        onClick={handleZoomIn}
                        disabled={zoom >= 2.0}
                        title={t.zoomIn}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#0F5C46]/50 bg-[#101412] text-[#F4F1EA] hover:border-[#C7A35A] hover:bg-[#0F5C46] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label={t.zoomIn}
                      >
                        <ZoomIn className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleZoomReset}
                        title={t.zoomReset}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#0F5C46]/50 bg-[#101412] text-[#A9AEA9] hover:text-[#C7A35A] hover:border-[#C7A35A] transition-all"
                        aria-label={t.zoomReset}
                      >
                        <RotateCcw className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* PDF Container with Scroll and Zoom */}
              <div
                ref={scrollContainerRef}
                className="relative w-full max-h-[64vh] sm:max-h-[68vh] overflow-x-auto overflow-y-auto rounded-2xl border border-[#C7A35A]/30 bg-[#050706] p-2 sm:p-4 shadow-inner touch-pan-x touch-pan-y"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {hasValidPdf ? (
                  <div className="mx-auto flex justify-center py-2">
                    <PdfViewer
                      pdfUrl={cert.pdfUrl!}
                      zoom={zoom}
                      title={titleText}
                      onError={() => setPdfLoadError(true)}
                    />
                  </div>
                ) : (
                  <div className="p-8 sm:p-14 text-center bg-[#0d120f] text-[#F4F1EA] rounded-xl border border-[#C7A35A]/30 my-4 max-w-2xl mx-auto space-y-4">
                    <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl border border-amber-500/50 bg-amber-950/40 text-amber-300">
                      <AlertCircle className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-sans text-xl font-bold text-[#F4F1EA]">
                        {currentLang === 'en'
                          ? 'Original PDF pending'
                          : currentLang === 'pl'
                          ? 'Oryginalny plik PDF oczekuje na przesłanie'
                          : 'Original-PDF noch nicht hinterlegt'}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] max-w-lg mx-auto mt-2 leading-relaxed">
                        {currentLang === 'en'
                          ? `The authentic PDF document for ${titleText} (${issuerText}) has not yet been deposited in the system. In accordance with official quality guidelines, no AI-generated replicas or placeholder images are displayed.`
                          : currentLang === 'pl'
                          ? `Oryginalny dokument PDF dla ${titleText} (${issuerText}) nie został jeszcze zdeponowany w systemie. Zgodnie z wytycznymi jakościowymi nie wyświetla się żadnych replik generowanych przez AI ani zastępczych grafik.`
                          : `Das originale PDF-Dokument für ${titleText} (${issuerText}) ist im System noch nicht hinterlegt. Gemäß offiziellen Qualitätsrichtlinien werden keine KI-generierten Nachbildungen oder Ersatzbilder angezeigt.`}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleUploadClick}
                        disabled={isUploading}
                        className="inline-flex items-center gap-2 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-6 py-2.5 text-xs font-semibold text-white uppercase tracking-wider hover:bg-[#148B78] transition-all shadow-md"
                      >
                        {isUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4 text-[#C7A35A]" />
                        )}
                        <span>{isUploading ? t.uploading : t.uploadPdf}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DISPLAY MODE 2: STRUCTURED METADATA */}
          {displayMode === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#0F5C46]/30 bg-[#101412] p-3.5">
                  <span className="font-sans text-[10px] font-bold text-[#C7A35A] uppercase tracking-wider block">
                    {t.issuerLabel}
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#F4F1EA] mt-1">
                    {issuerText}
                  </p>
                </div>
                <div className="rounded-xl border border-[#0F5C46]/30 bg-[#101412] p-3.5">
                  <span className="font-sans text-[10px] font-bold text-[#C7A35A] uppercase tracking-wider block">
                    {t.dateLabel}
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#F4F1EA] mt-1">
                    {cert.issueDate || cert.year}
                  </p>
                </div>
                <div className="rounded-xl border border-[#0F5C46]/30 bg-[#101412] p-3.5">
                  <span className="font-sans text-[10px] font-bold text-[#C7A35A] uppercase tracking-wider block">
                    {t.signatoryLabel}
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#F4F1EA] mt-1">
                    {cert.signatory || t.defaultSignatory}
                  </p>
                </div>
              </div>

              {cert.credentialId && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C7A35A]/25 bg-[#101412] p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#C7A35A] font-bold">
                      {t.refLabel}
                    </span>
                    <span className="font-mono text-xs text-[#F4F1EA] font-medium select-all">
                      {cert.credentialId}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyId(cert.credentialId!)}
                    className="flex items-center gap-1 text-xs text-[#148B78] hover:text-[#C7A35A] transition-colors"
                  >
                    {copiedId ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#148B78]" />
                        <span>{t.idCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{t.copyId}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Skills list */}
              {cert.skillsAcquired && cert.skillsAcquired.length > 0 && (
                <div className="rounded-xl border border-[#0F5C46]/40 bg-[#101412] p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C7A35A]">
                    <Sparkles className="h-4 w-4 text-[#148B78]" />
                    <span>{t.skillsTitle}</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {cert.skillsAcquired.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#F4F1EA]/90">
                        <CheckCircle2 className="h-4 w-4 text-[#148B78] shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description / Focus */}
              {focusText && (
                <div className="rounded-xl border border-[#C7A35A]/20 bg-[#101412] p-4 space-y-1.5">
                  <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#C7A35A]">
                    {t.profileTitle}
                  </span>
                  <p className="font-sans text-xs leading-relaxed text-[#A9AEA9] sm:text-sm">
                    {focusText}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Verification Link Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#0F5C46]/40 bg-[#101412] p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#148B78] shrink-0" />
              <p className="text-xs text-[#A9AEA9]">
                {hasValidPdf ? t.verifiedNoticeAvailable : t.verifiedNoticeMissing}{' '}
                <strong className="text-[#F4F1EA]">Natalia Stachowiak</strong>.
              </p>
            </div>

            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#148B78] shrink-0 uppercase tracking-wider shadow-sm"
              >
                <span>{cert.verificationUrl.includes('scrum.org') ? 'Verify Credential ↗' : t.verifyOnline}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

        </div>

        {/* 3. Modal Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#C7A35A]/20 pt-3.5 shrink-0">
          <span className="text-[11px] text-[#A9AEA9]">
            {issuerText} · {cert.year}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[38px] rounded-full border border-[#C7A35A] bg-[#0F5C46] px-6 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#148B78] uppercase transition-all shadow-sm"
            >
              {t.close}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
