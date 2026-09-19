import React, { useState } from 'react';
import { Award, Clock, CheckCircle2, Eye, ShieldCheck, Sparkles, LayoutList, LayoutGrid } from 'lucide-react';
import { CertificateCategory, CertificateItem, Language } from '../types';
import { translations } from '../data/translations';
import { CERTIFICATES } from '../data/portfolioData';

interface CertificatesSectionProps {
  currentLang: Language;
  onViewCertificate: (cert: CertificateItem) => void;
  // Kept optional for backward compatibility if callers pass it
  mediaAssets?: any;
  onUploadMedia?: (key: string) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  currentLang,
  onViewCertificate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const t = translations[currentLang].certificates;

  const categories = [
    { id: 'ALL', label: t.all || 'Alle' },
    { id: 'PRODUCT_MANAGEMENT', label: t.pm || 'Product Management' },
    { id: 'AGILE_SCRUM', label: t.agile || 'Agile & Scrum' },
    { id: 'DESIGN_THINKING', label: t.designThinking || 'Design Thinking' },
    { id: 'AI', label: t.ai || 'Künstliche Intelligenz' },
  ];

  const filteredCerts = activeCategory === 'ALL'
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === activeCategory);

  const getCategoryBadgeLabel = (cat: CertificateCategory) => {
    switch (cat) {
      case 'PRODUCT_MANAGEMENT':
        return 'Product Management';
      case 'AGILE_SCRUM':
        return 'Agile & Scrum';
      case 'DESIGN_THINKING':
        return 'Design Thinking';
      case 'AI':
        return 'KI & Innovation';
      default:
        return 'Qualifikation';
    }
  };

  return (
    <section
      id="certificates"
      className="relative w-full border-b border-[#C9A66B]/15 bg-[#080B09] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B]" />
            <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
              {t.label}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F5F1E8]">
            Always learning. <span className="italic text-[#C9A66B]">Always building.</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#B9C4BD]">
            {t.subline}
          </p>
        </div>

        {/* Filter Controls & View Toggle Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#C9A66B]/15 pb-5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {categories.map((cat) => {
              const count = cat.id === 'ALL' 
                ? CERTIFICATES.length 
                : CERTIFICATES.filter(c => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 uppercase flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? 'border border-[#C9A66B] bg-[#0B5A4D] text-[#F5F1E8] shadow-[0_0_15px_rgba(201,166,107,0.3)]'
                      : 'border border-[#C9A66B]/20 bg-[#063F35]/20 text-[#B9C4BD] hover:border-[#C9A66B]/50 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.id ? 'bg-[#063F35] text-[#C9A66B]' : 'bg-[#080B09] text-[#B9C4BD]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: List vs Grid */}
          <div className="flex items-center gap-1 rounded-full border border-[#C9A66B]/30 bg-[#063F35]/20 p-1">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#0B5A4D] text-[#F5F1E8] shadow-sm'
                  : 'text-[#B9C4BD] hover:text-white'
              }`}
              title="Listenansicht"
            >
              <LayoutList className="h-3.5 w-3.5" />
              <span>Liste</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#0B5A4D] text-[#F5F1E8] shadow-sm'
                  : 'text-[#B9C4BD] hover:text-white'
              }`}
              title="Kachelansicht"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Kacheln</span>
            </button>
          </div>
        </div>

        {/* Certificate Content Display */}
        {viewMode === 'list' ? (
          /* Structured List View */
          <div className="space-y-3">
            {filteredCerts.map((cert) => {
              const isInProgress = cert.status === 'IN_PROGRESS';

              return (
                <div
                  key={cert.id}
                  onClick={() => onViewCertificate(cert)}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-[#C9A66B]/25 bg-gradient-to-r from-[#063F35]/15 via-[#080B09] to-[#080B09] p-4 sm:p-5 transition-all duration-300 hover:border-[#C9A66B] hover:bg-[#063F35]/25 cursor-pointer"
                >
                  {/* Left Column: Category Pill + Title + Issuer */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <span className="rounded-full border border-[#C9A66B]/30 bg-[#063F35]/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#C9A66B]">
                        {getCategoryBadgeLabel(cert.category)}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs text-[#148B78]">
                        <Award className="h-3.5 w-3.5 text-[#C9A66B]" />
                        <span>{cert.issuer}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-semibold text-[#F5F1E8] transition-colors group-hover:text-[#C9A66B]">
                      {cert.title}
                    </h3>

                    {cert.focus && (
                      <p className="mt-1.5 text-xs text-[#B9C4BD] line-clamp-2">
                        <span className="text-[#C9A66B]/80 font-medium">Schwerpunkte:</span> {cert.focus}
                      </p>
                    )}
                  </div>

                  {/* Right Column: Status & View Action */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#C9A66B]/15">
                    {isInProgress ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#C9A66B] bg-[#C9A66B]/15 px-3 py-1 text-[11px] font-bold text-[#C9A66B] uppercase">
                        <Clock className="h-3.5 w-3.5" />
                        {currentLang === 'en'
                          ? `In Progress · ${cert.year}`
                          : currentLang === 'pl'
                          ? `W toku · ${cert.year}`
                          : `In Weiterbildung · ${cert.year}`}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#0B5A4D] bg-[#063F35]/30 px-3 py-1 text-[11px] font-medium text-[#148B78] uppercase">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {currentLang === 'en'
                          ? `Completed · ${cert.year}`
                          : currentLang === 'pl'
                          ? `Ukończone · ${cert.year}`
                          : `Abgeschlossen · ${cert.year}`}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewCertificate(cert);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A66B]/30 px-3 py-1 text-xs text-[#C9A66B] transition-colors hover:border-[#C9A66B] hover:bg-[#063F35] hover:text-white"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Details</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Cards Grid View (No Upload UI) */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCerts.map((cert) => {
              const isInProgress = cert.status === 'IN_PROGRESS';

              return (
                <div
                  key={cert.id}
                  onClick={() => onViewCertificate(cert)}
                  className="group relative flex flex-col justify-between rounded-xl border border-[#C9A66B]/25 bg-gradient-to-b from-[#063F35]/20 via-[#080B09] to-[#080B09] p-5 transition-all duration-300 hover:border-[#C9A66B] hover:shadow-[0_10px_25px_rgba(11,90,77,0.25)] cursor-pointer"
                >
                  <div>
                    {/* Top Bar with Issuer & Status */}
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="rounded-full border border-[#C9A66B]/30 bg-[#063F35]/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#C9A66B]">
                        {getCategoryBadgeLabel(cert.category)}
                      </span>

                      {isInProgress ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#C9A66B] bg-[#C9A66B]/15 px-2 py-0.5 text-[10px] font-bold text-[#C9A66B] uppercase">
                          <Clock className="h-3 w-3" />
                          IN PROGRESS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#0B5A4D] bg-[#063F35]/30 px-2 py-0.5 text-[10px] font-medium text-[#148B78] uppercase">
                          <CheckCircle2 className="h-3 w-3" />
                          {cert.year}
                        </span>
                      )}
                    </div>

                    {/* Certificate Title */}
                    <h3 className="font-serif text-base font-semibold leading-snug text-[#F5F1E8] transition-colors group-hover:text-[#C9A66B]">
                      {cert.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-xs text-[#148B78]">
                      <Award className="h-3.5 w-3.5 text-[#C9A66B]" />
                      <span>{cert.issuer}</span>
                    </div>

                    {cert.focus && (
                      <p className="mt-3 text-xs leading-relaxed text-[#B9C4BD] line-clamp-3 border-t border-[#C9A66B]/15 pt-2.5">
                        <span className="text-[#C9A66B]/80 font-medium">Fokus:</span> {cert.focus}
                      </p>
                    )}
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-5 flex items-center justify-between border-t border-[#C9A66B]/15 pt-3">
                    <div className="flex items-center gap-1 text-[11px] text-[#148B78]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Verifizierte Weiterbildung</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewCertificate(cert);
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A66B] transition-colors hover:text-white"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
