import React from 'react';
import { X, CheckCircle2, Calendar, Building, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface JourneyDetailModalProps {
  stationId: string | null;
  currentLang: Language;
  onClose: () => void;
}

export const JourneyDetailModal: React.FC<JourneyDetailModalProps> = ({
  stationId,
  currentLang,
  onClose,
}) => {
  if (!stationId) return null;

  const tJourney = translations[currentLang].journey;
  const station = tJourney.stations.find((s: any) => s.id === stationId);

  if (!station) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#C9A66B]/50 bg-[#080B09] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#C9A66B]/20 pb-5">
          <div>
            <span className="font-sans text-xs font-semibold tracking-widest text-[#C9A66B] uppercase">
              MEILENSTEIN · {station.title}
            </span>
            <h3 className="mt-1 font-serif text-2xl font-semibold text-[#F5F1E8] sm:text-3xl">
              {station.degree}
            </h3>
            {station.highlight && (
              <span className="mt-1 inline-block text-xs font-medium text-[#148B78]">
                {station.highlight}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#C9A66B]/30 p-1.5 text-[#B9C4BD] transition-colors hover:border-[#C9A66B] hover:bg-[#063F35] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-sm text-[#B9C4BD]">
          
          {/* Metadata chips */}
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2 rounded-lg border border-[#0B5A4D]/40 bg-[#063F35]/20 px-3 py-1.5 text-[#F5F1E8]">
              <Building className="h-3.5 w-3.5 text-[#C9A66B]" />
              <span>{station.institution}</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[#0B5A4D]/40 bg-[#063F35]/20 px-3 py-1.5 text-[#F5F1E8]">
              <Calendar className="h-3.5 w-3.5 text-[#C9A66B]" />
              <span>{station.period}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="mb-2 font-serif text-base font-semibold text-[#F5F1E8]">
              Profil & Schwerpunkt
            </h4>
            <p className="leading-relaxed">{station.desc}</p>
          </div>

          {/* Responsibilities */}
          {station.responsibilities && (
            <div>
              <h4 className="mb-2 font-serif text-base font-semibold text-[#F5F1E8]">
                Aufgaben & Methodischer Fokus
              </h4>
              <ul className="space-y-2">
                {station.responsibilities.map((resp: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#148B78] shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results / Learnings */}
          {station.results && (
            <div className="rounded-xl border border-[#C9A66B]/30 bg-[#063F35]/15 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-serif text-sm font-semibold text-[#C9A66B]">
                <CheckCircle2 className="h-4 w-4 text-[#148B78]" />
                Ergebnisse & Transfer ins Product Management
              </h4>
              <ul className="space-y-1.5">
                {station.results.map((res: string, idx: number) => (
                  <li key={idx} className="text-xs text-[#F5F1E8]/90">
                    • {res}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end border-t border-[#C9A66B]/20 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#C9A66B] bg-[#0B5A4D] px-6 py-2 text-xs font-semibold tracking-wider text-white transition-all hover:bg-[#148B78] uppercase"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
