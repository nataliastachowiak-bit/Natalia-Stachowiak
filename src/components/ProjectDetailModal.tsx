import React from 'react';
import { X, ExternalLink, Play, ArrowLeft, CheckCircle2, Sparkles, AlertCircle, Link as LinkIcon, Edit3, FileText, Download } from 'lucide-react';
import { Language, MediaAssets, ProjectData } from '../types';
import { translations } from '../data/translations';
import { getProjectActionLabel, getProjectUrl, getProjectLinkKey } from '../data/mediaConfig';
import { getLockedAsset } from '../data/assetRegistry';
import { MediaPlaceholder } from './MediaPlaceholder';

interface ProjectDetailModalProps {
  project: ProjectData | null;
  currentLang: Language;
  mediaAssets: MediaAssets;
  onClose: () => void;
  onUploadMedia: (key: string) => void;
  onEditProjectLink?: (project: ProjectData) => void;
  onOpenVideoModal?: () => void;
  isReadOnly?: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  currentLang,
  mediaAssets,
  onClose,
  onUploadMedia,
  onEditProjectLink,
  onOpenVideoModal,
  isReadOnly = false,
}) => {
  if (!project) return null;

  const tModal = translations[currentLang].modal;
  const fallbackImg = getLockedAsset(project.mediaKey);
  const currentImg = mediaAssets[project.mediaKey as keyof MediaAssets] || fallbackImg;
  const projectUrl = getProjectUrl(project.id, mediaAssets, project);
  const actionLabel = getProjectActionLabel(project.id, currentLang);

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/90 p-0 sm:p-4 backdrop-blur-xl animate-fadeIn">
      <div className="relative my-0 sm:my-8 w-full max-w-4xl min-h-screen sm:min-h-0 overflow-hidden rounded-none sm:rounded-2xl border-0 sm:border border-[#C9A66B]/40 bg-[#080B09] shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col">
        
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#C9A66B]/20 bg-[#080B09]/95 px-3.5 py-3 sm:px-6 sm:py-4 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="group flex min-h-[44px] items-center gap-2 sm:gap-2.5 font-sans text-xs font-semibold tracking-wider text-[#C7A35A] transition-colors hover:text-[#F4F1EA] uppercase py-1 px-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">{(tModal as any).backToPortfolioDesktop?.replace('← ── ', '') || tModal.back}</span>
            <span className="inline sm:hidden">{tModal.back}</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#C9A66B] bg-gradient-to-r from-[#0B5A4D] to-[#148B78] px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold text-white shadow-md hover:scale-105 hover:shadow-[0_0_15px_rgba(201,166,107,0.4)]"
              >
                <span className="max-w-[140px] sm:max-w-none truncate">{actionLabel}</span>
                <ExternalLink className="h-3 w-3 text-[#C9A66B] shrink-0" />
              </a>
            )}

            {!isReadOnly && (
              <button
                type="button"
                onClick={() => (onEditProjectLink ? onEditProjectLink(project) : onUploadMedia(getProjectLinkKey(project.id)))}
                className="hidden md:flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#C9A66B]/40 px-3.5 py-2 text-xs text-[#B9C4BD] hover:border-[#C9A66B] hover:text-[#C9A66B]"
                title="Projektlink anpassen"
              >
                <LinkIcon className="h-3 w-3 text-[#C9A66B]" />
                <span>Link anpassen</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#C9A66B]/30 text-[#B9C4BD] transition-colors hover:border-[#C9A66B] hover:bg-[#063F35] hover:text-white"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[calc(100vh-56px)] sm:max-h-[82vh] overflow-y-auto px-4 py-6 sm:px-10 sm:py-8">
          
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm font-bold tracking-widest text-[#C9A66B]">
                PROJEKT {project.number}
              </span>
              <span className="text-[#0B5A4D]">/</span>
              <span className="font-sans text-xs tracking-wider text-[#B9C4BD] uppercase">
                Case Study
              </span>
            </div>

            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#F5F1E8] sm:text-4xl md:text-5xl">
              {project.title}
            </h2>

            {project.projectTypeBadge && (
              <div className="mt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A66B]/50 bg-[#C9A66B]/15 px-3 py-1 text-xs font-semibold text-[#EAD8B1]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B]" />
                  {project.projectTypeBadge[currentLang] || project.projectTypeBadge.de}
                </span>
              </div>
            )}

            <p className="mt-2 font-sans text-base font-medium text-[#148B78] sm:text-lg">
              {project.subtitle}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-[#0B5A4D] bg-[#063F35]/40 px-3 py-1 text-xs font-medium text-[#F5F1E8]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Media Showcase Hero inside Case Study */}
          <div className="mb-8 overflow-hidden rounded-xl border border-[#C9A66B]/30 bg-[#063F35]/15 p-2">
            <MediaPlaceholder
              label={`${project.name} Medien Vorschau`}
              mediaKey={project.mediaKey}
              currentSrc={currentImg}
              aspectRatio="aspect-[16/9]"
              type={project.id === 'vinyl' ? 'vinyl' : project.id === 'du-bist-nicht-zu-viel' ? 'bookCover' : project.id === 'environix' ? 'environix' : 'generic'}
              onUploadClick={onUploadMedia}
              isReadOnly={isReadOnly}
            />

            {/* Special asset placeholders for Du bist nicht zu viel: Book cover & QR */}
            {project.id === 'du-bist-nicht-zu-viel' && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-1 text-xs font-semibold text-[#C9A66B]">ORIGINAL BUCHCOVER:</div>
                  <MediaPlaceholder
                    label="ORIGINAL BUCHCOVER"
                    mediaKey="bookCover"
                    currentSrc={mediaAssets.bookCover}
                    aspectRatio="aspect-[2/3]"
                    type="bookCover"
                    onUploadClick={onUploadMedia}
                    isReadOnly={isReadOnly}
                  />
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold text-[#C9A66B]">INSTAGRAM QR-CODE:</div>
                  <MediaPlaceholder
                    label="ORIGINAL INSTAGRAM QR-CODE"
                    mediaKey="instagramQr"
                    currentSrc={mediaAssets.instagramQr}
                    aspectRatio="aspect-square"
                    type="generic"
                    onUploadClick={onUploadMedia}
                    isReadOnly={isReadOnly}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Interactive Access Banner with Dynamic Link & PDF Download Support */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#C9A66B]/30 bg-gradient-to-r from-[#063F35]/40 to-[#080B09] p-4">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#C9A66B] uppercase">
                {project.pdfUrl ? 'Offizieller Projektbericht & Dokumentation:' : 'Interaktiver Zugang & Live-App:'}
              </span>
              <p className="text-xs text-[#B9C4BD]">
                {project.pdfUrl ? (
                  <>
                    Vollständiger IHK-Projektbericht hinterlegt:{' '}
                    <span className="font-mono text-[#F5F1E8]">{project.pdfFileName || 'IHK_Projektbericht.pdf'}</span> (67 Seiten, Methodik & B2B-Architektur)
                  </>
                ) : projectUrl ? (
                  <>
                    Aktiv verknüpft:{' '}
                    <span className="font-mono text-[#F5F1E8]">{projectUrl}</span>
                  </>
                ) : (
                  'Dieses Projekt existiert als Live-Anwendung / interaktiver Prototyp. Verlinkung jederzeit hinterlegen.'
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Dedicated PDF Download Button */}
              {project.pdfUrl && (
                <a
                  href={project.pdfUrl}
                  download={project.pdfFileName || 'eNvironix_AI_IHK_Projektbericht_Natalia_Stachowiak.pdf'}
                  className="flex items-center gap-2 rounded-full border border-[#C9A66B] bg-gradient-to-r from-[#0B5A4D] to-[#148B78] px-5 py-2.5 text-xs font-semibold tracking-wider text-white shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(201,166,107,0.4)] uppercase"
                >
                  <Download className="h-3.5 w-3.5 text-[#C9A66B]" />
                  <span>
                    {currentLang === 'de' ? 'IHK-Projektbericht herunterladen (PDF)' : currentLang === 'pl' ? 'Pobierz raport IHK (PDF)' : 'Download IHK Report (PDF)'}
                  </span>
                </a>
              )}

              {projectUrl ? (
                <>
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-[#C9A66B] bg-[#0B5A4D] px-5 py-2.5 text-xs font-semibold tracking-wider text-white shadow-lg transition-all hover:bg-[#148B78] uppercase"
                  >
                    <span>{actionLabel}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  {!isReadOnly && (
                    <button
                      type="button"
                      onClick={() => (onEditProjectLink ? onEditProjectLink(project) : onUploadMedia(getProjectLinkKey(project.id)))}
                      className="flex items-center gap-1.5 rounded-full border border-[#C9A66B]/40 bg-[#080B09] px-4 py-2 text-xs font-medium text-[#C9A66B] hover:border-[#C9A66B] hover:text-white"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Link ändern</span>
                    </button>
                  )}
                </>
              ) : (
                !isReadOnly && (
                  <button
                    type="button"
                    onClick={() => (onEditProjectLink ? onEditProjectLink(project) : onUploadMedia(getProjectLinkKey(project.id)))}
                    className="flex items-center gap-2 rounded-full border border-dashed border-[#C9A66B] bg-[#063F35]/40 px-5 py-2.5 text-xs font-semibold tracking-wider text-[#C9A66B] hover:bg-[#063F35] hover:text-white uppercase"
                  >
                    <LinkIcon className="h-3.5 w-3.5" />
                    <span>+ Projekt-Link / Live-URL hinzufügen</span>
                  </button>
                )
              )}

              {project.id === 'street-life' && onOpenVideoModal && (
                <button
                  type="button"
                  onClick={onOpenVideoModal}
                  className="flex items-center gap-2 rounded-full border border-[#C9A66B]/40 bg-[#063F35]/40 px-4 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#0B5A4D] uppercase"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Video ansehen</span>
                </button>
              )}
            </div>
          </div>

          {/* Structured Case Study Content */}
          <div className="space-y-8 text-sm leading-relaxed text-[#B9C4BD]">
            
            {/* Problem Statement */}
            <div className="border-l-2 border-[#C9A66B] pl-4">
              <h3 className="mb-2 font-serif text-xl font-semibold text-[#F5F1E8]">
                Problemstellung & Ausgangssituation
              </h3>
              <p>{project.caseStudy.problem[currentLang] || project.caseStudy.problem.de}</p>
            </div>

            {/* User Needs */}
            {project.caseStudy.userNeeds && (
              <div className="rounded-xl border border-[#0B5A4D]/60 bg-[#063F35]/25 p-5">
                <span className="font-sans text-xs font-bold tracking-widest text-[#C9A66B] uppercase">
                  {currentLang === 'de' ? 'Nutzerbedürfnisse & Research Insights' : currentLang === 'pl' ? 'Potrzeby użytkowników i wnioski z badań' : 'User Needs & Research Insights'}
                </span>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#F5F1E8]">
                  {project.caseStudy.userNeeds[currentLang] || project.caseStudy.userNeeds.de}
                </p>
              </div>
            )}

            {/* Hypotheses & Product Decisions */}
            {project.caseStudy.hypothesesAndDecisions && (
              <div className="rounded-xl border border-[#C9A66B]/30 bg-gradient-to-r from-[#063F35]/20 to-[#080B09] p-5">
                <span className="font-sans text-xs font-bold tracking-wider text-[#C9A66B] uppercase">
                  {currentLang === 'de' ? 'Hypothesen & Produktentscheidungen' : currentLang === 'pl' ? 'Hipotezy i decyzje produktowe' : 'Hypotheses & Product Decisions'}
                </span>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#F5F1E8]">
                  {project.caseStudy.hypothesesAndDecisions[currentLang] || project.caseStudy.hypothesesAndDecisions.de}
                </p>
              </div>
            )}

            {/* Research & JTBD (if available) */}
            {project.caseStudy.research && (
              <div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-[#F5F1E8]">
                  Research & User Discovery
                </h3>
                <p>{project.caseStudy.research[currentLang] || project.caseStudy.research.de}</p>
              </div>
            )}

            {project.caseStudy.jtbd && (
              <div className="rounded-xl border border-[#0B5A4D] bg-[#063F35]/20 p-5">
                <span className="font-sans text-xs font-bold tracking-widest text-[#C9A66B] uppercase">
                  Jobs To Be Done (JTBD)
                </span>
                <p className="mt-2 font-serif text-base italic text-[#F5F1E8]">
                  {project.caseStudy.jtbd[currentLang] || project.caseStudy.jtbd.de}
                </p>
              </div>
            )}

            {/* Pain Points */}
            {project.caseStudy.painPoints && (
              <div>
                <h3 className="mb-3 font-serif text-lg font-semibold text-[#F5F1E8]">
                  Identifizierte Nutzer-Pain-Points
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.caseStudy.painPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-[#C9A66B]/20 bg-[#080B09] p-3 text-xs"
                    >
                      <span className="font-bold text-[#C9A66B]">0{idx + 1}. </span>
                      <span>{pt[currentLang] || pt.de}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How Might We */}
            {project.caseStudy.howMightWe && (
              <div className="rounded-xl border border-[#C9A66B]/40 bg-gradient-to-r from-[#063F35]/30 to-[#080B09] p-5">
                <span className="font-sans text-xs font-bold tracking-wider text-[#C9A66B] uppercase">
                  How Might We Fragestellung:
                </span>
                <p className="mt-1 font-serif text-lg font-medium text-[#F5F1E8]">
                  {project.caseStudy.howMightWe[currentLang] || project.caseStudy.howMightWe.de}
                </p>
              </div>
            )}

            {/* Customer Journey / Experience Map (street.life) */}
            {project.caseStudy.customerJourney && (
              <div>
                <h3 className="mb-3 font-serif text-lg font-semibold text-[#F5F1E8]">
                  Customer Experience Journey
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.caseStudy.customerJourney.map((cj, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-[#0B5A4D] bg-[#063F35]/20 p-4"
                    >
                      <span className="font-sans text-xs font-bold tracking-wider text-[#C9A66B] uppercase">
                        {cj.step}
                      </span>
                      <p className="mt-2 text-xs leading-relaxed text-[#F5F1E8]/90">
                        {cj.desc[currentLang] || cj.desc.de}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Features (Vinyl, Dine-Ease, Du bist nicht zu viel) */}
            {project.caseStudy.coreFeatures && (
              <div>
                <h3 className="mb-3 font-serif text-lg font-semibold text-[#F5F1E8]">
                  Kernfeatures & Lösungsarchitektur
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.caseStudy.coreFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-[#C9A66B]/30 bg-[#063F35]/20 p-4"
                    >
                      <span className="font-sans text-xs font-bold tracking-wider text-[#C9A66B] uppercase">
                        {feat.title}
                      </span>
                      <p className="mt-2 text-xs leading-relaxed text-[#F5F1E8]/90">
                        {feat.desc[currentLang] || feat.desc.de}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Solution */}
            <div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-[#F5F1E8]">
                Lösungskonzept & Mehrwert
              </h3>
              <p>{project.caseStudy.solution[currentLang] || project.caseStudy.solution.de}</p>
            </div>

            {/* Learnings */}
            <div className="rounded-xl border border-[#C9A66B]/25 bg-gradient-to-r from-[#063F35]/30 to-[#080B09] p-5">
              <h3 className="mb-2 flex items-center gap-2 font-serif text-lg font-semibold text-[#C9A66B]">
                <CheckCircle2 className="h-5 w-5 text-[#148B78]" />
                Key Learnings & Product Takeaways
              </h3>
              <p className="text-xs sm:text-sm text-[#F5F1E8]">
                {project.caseStudy.learnings[currentLang] || project.caseStudy.learnings.de}
              </p>
            </div>

            {/* Success Metrics & Validation */}
            {project.caseStudy.successMetrics && (
              <div className="rounded-xl border border-[#148B78]/40 bg-[#063F35]/25 p-5">
                <h3 className="mb-2 flex items-center gap-2 font-serif text-base font-semibold text-[#148B78]">
                  <CheckCircle2 className="h-4 w-4 text-[#148B78]" />
                  {currentLang === 'de' ? 'Ziel-Metriken & Validierung' : currentLang === 'pl' ? 'Wskaźniki sukcesu i walidacja' : 'Target Metrics & Validation'}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#F5F1E8]">
                  {project.caseStudy.successMetrics[currentLang] || project.caseStudy.successMetrics.de}
                </p>
              </div>
            )}

            {/* Transparency Note */}
            {project.caseStudy.transparencyNote && (
              <div className="rounded-xl border border-[#C9A66B]/20 bg-[#080B09] p-4 text-xs text-[#8A9B90]">
                <div className="font-semibold text-[#C9A66B] uppercase tracking-wider mb-1 text-[11px]">
                  {currentLang === 'de' ? 'Transparenzhinweis zum Projektstatus' : currentLang === 'pl' ? 'Informacja o statusie projektu' : 'Project Status & Transparency Note'}
                </div>
                <p className="leading-relaxed">
                  {project.caseStudy.transparencyNote[currentLang] || project.caseStudy.transparencyNote.de}
                </p>
              </div>
            )}

          </div>

          {/* Bottom Close Button */}
          <div className="mt-10 flex justify-end border-t border-[#C9A66B]/20 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] items-center justify-center rounded-full border border-[#C9A66B] bg-gradient-to-r from-[#063F35] to-[#0B5A4D] px-7 py-3 font-sans text-xs font-semibold tracking-wider text-white shadow-lg transition-all hover:border-[#F5F1E8] uppercase"
            >
              {tModal.close}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
