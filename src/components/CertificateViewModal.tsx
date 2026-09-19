import React from 'react';
import { X, Award, CheckCircle2, Clock, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { CertificateItem, Language } from '../types';

interface CertificateViewModalProps {
  cert: CertificateItem | null;
  currentLang: Language;
  onClose: () => void;
}

export const CertificateViewModal: React.FC<CertificateViewModalProps> = ({
  cert,
  currentLang,
  onClose,
}) => {
  if (!cert) return null;

  const isInProgress = cert.status === 'IN_PROGRESS';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative my-8 w-full max-w-xl overflow-hidden rounded-2xl border border-[#C9A66B]/50 bg-[#080B09] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#C9A66B]/20 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A66B] bg-[#063F35]/40 text-[#C9A66B]">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="font-sans text-xs font-semibold tracking-widest text-[#C9A66B] uppercase">
                QUALIFIKATION & WEITERBILDUNG
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#F5F1E8]">
                {cert.title}
              </h3>
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

        {/* Certificate Information */}
        <div className="mt-6 space-y-6">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-[#0B5A4D]/40 bg-[#063F35]/20 p-4">
            <div>
              <span className="text-xs text-[#148B78] uppercase font-semibold">Ausstellende Organisation</span>
              <p className="mt-1 font-serif text-base text-[#F5F1E8]">{cert.issuer}</p>
            </div>

            <div>
              <span className="text-xs text-[#148B78] uppercase font-semibold">Status & Abschluss</span>
              <div className="mt-1">
                {isInProgress ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A66B]">
                    <Clock className="h-3.5 w-3.5" />
                    {currentLang === 'en'
                      ? `In Progress (${cert.year})`
                      : currentLang === 'pl'
                      ? `W toku (${cert.year})`
                      : `In Weiterbildung (${cert.year})`}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#148B78]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {currentLang === 'en'
                      ? `Successfully completed (${cert.year})`
                      : currentLang === 'pl'
                      ? `Pomyślnie ukończone (${cert.year})`
                      : `Erfolgreich abgeschlossen (${cert.year})`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Focus Competencies */}
          {cert.focus && (
            <div className="rounded-xl border border-[#C9A66B]/20 bg-[#080B09] p-4">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#C9A66B]">
                <Sparkles className="h-4 w-4" />
                <span>Schwerpunkte & Fachkompetenzen</span>
              </div>
              <p className="font-sans text-xs leading-relaxed text-[#B9C4BD] sm:text-sm">
                {cert.focus}
              </p>
            </div>
          )}

          {/* Verification Badge Notice */}
          <div className="flex items-center gap-3 rounded-xl border border-[#148B78]/30 bg-[#063F35]/15 p-4 text-xs text-[#B9C4BD]">
            <ShieldCheck className="h-5 w-5 text-[#148B78] shrink-0" />
            <span>
              Bestandteil des Qualifikationsprofils von Natalia Stachowiak im Bereich digitales Produktmanagement, Agilität und KI-gestützte Transformation.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end border-t border-[#C9A66B]/20 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#C9A66B] bg-[#0B5A4D] px-6 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#148B78] uppercase transition-colors"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
