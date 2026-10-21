import React from 'react';
import { ArrowUpRight, ExternalLink, Play, Sparkles, Link as LinkIcon, Edit3, FileText, Download } from 'lucide-react';
import { Language, MediaAssets, ProjectData } from '../types';
import { translations } from '../data/translations';
import { PROJECTS } from '../data/portfolioData';
import { getProjectActionLabel, getProjectUrl, getProjectLinkKey } from '../data/mediaConfig';
import { getLockedAsset } from '../data/assetRegistry';
import { MediaPlaceholder } from './MediaPlaceholder';

interface SelectedWorkProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onSelectProject: (project: ProjectData) => void;
  onUploadMedia: (key: string) => void;
  onEditProjectLink?: (project: ProjectData) => void;
  onOpenVideoModal?: () => void;
  isReadOnly?: boolean;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  currentLang,
  mediaAssets,
  onSelectProject,
  onUploadMedia,
  onEditProjectLink,
  onOpenVideoModal,
  isReadOnly = false,
}) => {
  const t = translations[currentLang].selectedWork;

  const getPlaceholderLabel = (id: string): string => {
    switch (id) {
      case 'gain':
        return 'GAIN SCREENSHOT';
      case 'street-life':
        return 'STREET.LIFE PROJEKTBILD';
      case 'vinyl':
        return 'VINYL APP SCREENSHOT';
      case 'dine-ease':
        return 'DINE-EASE SCREENSHOT';
      case 'du-bist-nicht-zu-viel':
        return 'ORIGINAL BUCHCOVER';
      case 'environix':
        return 'ENVIRONIX AI B2B PLATTFORM';
      default:
        return 'PROJEKTBILD';
    }
  };

  const getPlaceholderType = (id: string) => {
    if (id === 'du-bist-nicht-zu-viel') return 'bookCover';
    if (id === 'vinyl') return 'vinyl';
    if (id === 'environix') return 'environix';
    return 'generic';
  };

  return (
    <section id="projects" className="relative bg-[#080B09] py-16 sm:py-24">
      {/* Decorative ambient subtle glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[400px] w-[900px] rounded-full bg-[#063F35]/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Title & Subline */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#C9A66B]/20 pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B]" />
              <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
                {t.label}
              </span>
            </div>
            <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#F5F1E8] sm:text-4xl md:text-5xl">
              Real Problems. <span className="italic text-[#C9A66B]">Bold Solutions.</span>
            </h2>
          </div>

          <div className="flex max-w-md flex-col items-start gap-3 text-left lg:items-end lg:text-right">
            <p className="font-sans text-xs leading-relaxed text-[#B9C4BD] sm:text-sm">
              {t.subline}
            </p>
            <a
              href="#projects"
              className="group inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wider text-[#C9A66B] transition-colors hover:text-[#F5F1E8] uppercase"
            >
              <span>{t.viewAll}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* 6 Projects Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            const fallbackImg = getLockedAsset(project.mediaKey);
            const currentImg = mediaAssets[project.mediaKey as keyof MediaAssets] || fallbackImg;
            const placeholderLabel = getPlaceholderLabel(project.id);
            const placeholderType = getPlaceholderType(project.id);
            const projectUrl = getProjectUrl(project.id, mediaAssets, project);
            const actionLabel = getProjectActionLabel(project.id, currentLang);
            const badgeText = project.projectTypeBadge?.[currentLang] || project.projectTypeBadge?.de;

            return (
              <article
                key={project.id}
                id={project.id === 'du-bist-nicht-zu-viel' ? 'book' : `project-${project.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#C9A66B]/25 bg-gradient-to-b from-[#063F35]/15 via-[#080B09] to-[#080B09] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A66B]/80 hover:shadow-[0_10px_30px_rgba(11,90,77,0.3)]"
              >
                <div>
                  {/* Card Header: Project Number & Live Status / PDF Badge */}
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="font-serif text-xs font-bold tracking-widest text-[#C9A66B]">
                      {project.number}
                    </span>
                    {project.pdfUrl ? (
                      <span className="text-[10px] tracking-wider text-[#C9A66B] uppercase font-semibold flex items-center gap-1">
                        <FileText className="h-3 w-3 text-[#C9A66B]" />
                        IHK Report (PDF)
                      </span>
                    ) : projectUrl ? (
                      <span className="text-[10px] tracking-wider text-[#148B78] uppercase font-semibold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#148B78] animate-pulse" />
                        Live
                      </span>
                    ) : (
                      <span className="text-[10px] tracking-wider text-[#8A9B90] uppercase font-medium">
                        Concept
                      </span>
                    )}
                  </div>

                  {/* Project Media Thumbnail or Labeled Placeholder */}
                  <div className="mb-3.5">
                    <MediaPlaceholder
                      label={placeholderLabel}
                      mediaKey={project.mediaKey}
                      currentSrc={currentImg}
                      aspectRatio="aspect-[16/10]"
                      type={placeholderType}
                      objectFit={project.id === 'du-bist-nicht-zu-viel' ? 'contain' : 'cover'}
                      onUploadClick={onUploadMedia}
                      isReadOnly={isReadOnly}
                    />
                  </div>

                  {/* Project Type Badge (Prototype vs Concept vs Live Product) */}
                  {badgeText && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1 rounded border border-[#C9A66B]/30 bg-[#063F35]/40 px-2 py-0.5 text-[9.5px] font-medium tracking-wide text-[#EAD8B1]">
                        <span className="h-1 w-1 rounded-full bg-[#C9A66B]" />
                        <span className="truncate">{badgeText}</span>
                      </span>
                    </div>
                  )}

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-base sm:text-lg font-semibold leading-snug text-[#F5F1E8] transition-colors group-hover:text-[#C9A66B]">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-serif text-xs italic text-[#C9A66B]">
                    {project.subtitle}
                  </p>

                  {/* Concise Description */}
                  <p className="mt-2.5 line-clamp-3 font-sans text-xs leading-relaxed text-[#B9C4BD]">
                    {project.description[currentLang]}
                  </p>

                  {/* Skill / Method Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded border border-[#0B5A4D]/50 bg-[#063F35]/30 px-1.5 py-0.5 text-[10px] font-medium text-[#B9C4BD]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-4 border-t border-[#C9A66B]/15 pt-3">
                  <div className="flex flex-col gap-2.5">
                    {/* View Case Study Button: Touch-friendly with min-h-[44px] */}
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="group/btn flex min-h-[44px] items-center justify-between rounded-lg border border-[#148B78]/40 bg-[#063F35]/30 px-3.5 py-2.5 font-sans text-xs font-semibold tracking-wider text-[#148B78] transition-all hover:border-[#C9A66B] hover:bg-[#0B5A4D]/40 hover:text-[#F5F1E8] active:scale-98"
                    >
                      <span className="uppercase">{t.viewCaseStudy}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-[#C9A66B]" />
                    </button>

                    {/* Dedicated PDF Download for eNvironix / Projects with PDF */}
                    {project.pdfUrl && (
                      <div className="flex min-h-[44px] items-center justify-between gap-1 rounded-lg border border-[#C9A66B]/60 bg-gradient-to-r from-[#063F35]/60 to-[#0B5A4D]/40 px-3 py-2">
                        <a
                          href={project.pdfUrl}
                          download={project.pdfFileName || 'eNvironix_AI_IHK_Bericht_Natalia_Stachowiak.pdf'}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F1E8] hover:text-[#C9A66B] truncate"
                          title="Original IHK-Projektbericht als PDF herunterladen"
                        >
                          <Download className="h-4 w-4 text-[#C9A66B] shrink-0" />
                          <span className="truncate">
                            {currentLang === 'de' ? 'IHK-BERICHT (PDF)' : currentLang === 'pl' ? 'RAPORT IHK (PDF)' : 'IHK REPORT (PDF)'}
                          </span>
                        </a>
                        <span className="text-[10px] font-mono text-[#C9A66B]/80 px-1">67 S.</span>
                      </div>
                    )}

                    {/* Project Live Link Row */}
                    {projectUrl ? (
                      <div className="flex min-h-[44px] items-center justify-between gap-1.5 rounded-lg border border-[#C9A66B]/50 bg-gradient-to-r from-[#063F35]/50 to-[#0B5A4D]/30 p-1 transition-all hover:border-[#C9A66B] hover:shadow-[0_0_15px_rgba(20,139,120,0.25)]">
                        <a
                          href={projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 min-h-[40px] items-center justify-between gap-2 rounded-md bg-[#0B5A4D]/80 px-3 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#148B78] truncate"
                          title={projectUrl}
                        >
                          <span className="truncate">{actionLabel}</span>
                          <ExternalLink className="h-3.5 w-3.5 text-[#C9A66B] shrink-0" />
                        </a>
                        {!isReadOnly && (
                          <button
                            type="button"
                            onClick={() => (onEditProjectLink ? onEditProjectLink(project) : onUploadMedia(getProjectLinkKey(project.id)))}
                            title="Link bearbeiten"
                            className="text-[#B9C4BD] hover:text-[#C9A66B] p-2 min-h-[40px] min-w-[40px] flex items-center justify-center"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ) : (
                      !isReadOnly && (
                        <button
                          type="button"
                          onClick={() => (onEditProjectLink ? onEditProjectLink(project) : onUploadMedia(getProjectLinkKey(project.id)))}
                          className="flex min-h-[44px] items-center justify-between rounded-lg border border-dashed border-[#C9A66B]/40 bg-[#063F35]/15 px-3 py-2 text-xs font-medium text-[#B9C4BD] hover:border-[#C9A66B] hover:text-[#C9A66B] transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <LinkIcon className="h-3.5 w-3.5 text-[#C9A66B]" />
                            <span>+ Link hinzufügen</span>
                          </span>
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      )
                    )}

                    {/* street.life Video Preview Option */}
                    {project.id === 'street-life' && onOpenVideoModal && (
                      <button
                        type="button"
                        onClick={onOpenVideoModal}
                        className="flex min-h-[44px] items-center justify-between rounded-lg border border-[#C9A66B]/20 bg-[#063F35]/20 px-3.5 py-2 text-xs font-semibold text-[#B9C4BD] hover:text-[#C9A66B] hover:border-[#C9A66B]/50 transition-colors"
                      >
                        <span>VIDEO ANSEHEN</span>
                        <Play className="h-3.5 w-3.5 text-[#C9A66B]" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
