import React from 'react';
import { X, Download, FileText, Upload, CheckCircle2, GraduationCap, Briefcase } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { translations } from '../data/translations';

interface CvModalProps {
  isOpen: boolean;
  currentLang: Language;
  mediaAssets: MediaAssets;
  onClose: () => void;
  onUploadCv: (key: string) => void;
}

export const CvModal: React.FC<CvModalProps> = ({
  isOpen,
  currentLang,
  mediaAssets,
  onClose,
  onUploadCv,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLang];
  const hasCvFile = Boolean(mediaAssets.cvPdfUrl);

  const handleDownload = () => {
    if (hasCvFile && mediaAssets.cvPdfUrl) {
      const link = document.createElement('a');
      link.href = mediaAssets.cvPdfUrl;
      link.download = 'Lebenslauf_Natalia_Stachowiak.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Trigger browser print/pdf generation of the current CV profile
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative my-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-[#C9A66B]/50 bg-[#080B09] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#C9A66B]/20 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A66B] bg-[#063F35]/40 text-[#C9A66B]">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#F5F1E8]">
                Curriculum Vitae
              </h3>
              <p className="font-sans text-xs text-[#148B78] uppercase tracking-wider">
                Natalia Stachowiak · Product Manager & Digital Transformation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#C9A66B]/30 p-1.5 text-[#B9C4BD] transition-colors hover:border-[#C9A66B] hover:bg-[#063F35] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="mt-6 space-y-6 max-h-[65vh] overflow-y-auto pr-2 text-sm text-[#B9C4BD]">
          
          {/* Status Box */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#C9A66B]/30 bg-[#063F35]/20 p-4">
            <div>
              <span className="font-sans text-xs font-bold text-[#C9A66B] uppercase tracking-wider">
                Dokumenten-Status:
              </span>
              <p className="text-xs text-[#F5F1E8]">
                {hasCvFile
                  ? 'Ihr persönliches CV-Dokument ist hochgeladen und bereit zum Download.'
                  : 'Aktuelle digitale Übersicht aktiviert. Sie können Ihr offizielles PDF-Dokument jederzeit hochladen.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onUploadCv('cvPdfUrl')}
                className="flex items-center gap-1.5 rounded-full border border-[#C9A66B]/60 bg-[#080B09] px-4 py-2 text-xs font-medium text-[#C9A66B] hover:bg-[#063F35] hover:text-white"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>{hasCvFile ? 'PDF ersetzen' : 'PDF hochladen'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-full border border-[#C9A66B] bg-[#0B5A4D] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[#148B78]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{hasCvFile ? 'PDF herunterladen' : 'Drucken / PDF'}</span>
              </button>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="rounded-xl border border-[#0B5A4D]/40 bg-[#080B09] p-5">
            <h4 className="font-serif text-lg font-semibold text-[#F5F1E8]">
              Profilübersicht
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-[#B9C4BD]">
              {t.about.p1} {t.about.p2}
            </p>
          </div>

          {/* Key Competencies */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#C9A66B]">
              Kernkompetenzen
            </h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 rounded-lg border border-[#0B5A4D]/30 bg-[#063F35]/15 p-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#148B78] shrink-0" />
                <span>Product Discovery, JTBD, User Research & Interviews</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#0B5A4D]/30 bg-[#063F35]/15 p-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#148B78] shrink-0" />
                <span>Agile Frameworks (Scrum, Sprint Backlog, User Stories)</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#0B5A4D]/30 bg-[#063F35]/15 p-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#148B78] shrink-0" />
                <span>KI-Produktkonzepte & Prompt Engineering</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#0B5A4D]/30 bg-[#063F35]/15 p-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#148B78] shrink-0" />
                <span>Interdisziplinäre Führung, Sprachen: DE, EN, PL</span>
              </div>
            </div>
          </div>

          {/* Education Summary */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#C9A66B]">
              Ausbildung & Abschlüsse
            </h4>
            <div className="mt-3 space-y-2 text-xs">
              <div className="rounded-lg border border-[#0B5A4D]/30 p-3">
                <span className="font-semibold text-[#F5F1E8]">Master of Science in Chemie</span>
                <p className="text-[#148B78]">Adam-Mickiewicz-Universität Posen</p>
              </div>
              <div className="rounded-lg border border-[#0B5A4D]/30 p-3">
                <span className="font-semibold text-[#F5F1E8]">Postgraduales Studium im Umweltschutz</span>
                <p className="text-[#148B78]">Wirtschaftsuniversität Breslau (WSB)</p>
              </div>
              <div className="rounded-lg border border-[#C9A66B]/40 bg-[#063F35]/20 p-3">
                <span className="font-semibold text-[#F5F1E8]">Digital Product Management & Transformation</span>
                <p className="text-[#C9A66B]">Fortlaufende Weiterbildung (bis 2027 / In Progress)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-[#C9A66B]/20 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#C9A66B] bg-[#0B5A4D] px-6 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#148B78] uppercase"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
