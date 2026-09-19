import React from 'react';
import { ArrowUpRight, ExternalLink, Play, Sparkles, Link as LinkIcon, Edit3 } from 'lucide-react';
import { Language, MediaAssets, ProjectData } from '../types';
import { translations } from '../data/translations';
import { PROJECTS } from '../data/portfolioData';
import { getProjectActionLabel, getProjectUrl, getProjectLinkKey } from '../data/mediaConfig';
import { MediaPlaceholder } from './MediaPlaceholder';

interface SelectedWorkProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onSelectProject: (project: ProjectData) => void;
  onUploadMedia: (key: string) => void;
  onEditProjectLink?: (project: ProjectData) => void;
  onOpenVideoModal?: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  currentLang,
  mediaAssets,
  onSelectProject,
  onUploadMedia,
  onEditProjectLink,
  onOpenVideoModal,
}) => {
  const t = translations[currentLang].selectedWork;

  const getPlaceholderLabel = (id: string): string => {
    switch (id) {
      case 'gain':
        return 'GAIN SCREENSHOT HOCHLADEN';
      case 'street-life':
        return 'STREET.LIFE PROJEKTBILD HOCHLADEN';
      case 'vinyl':
        return 'VINYL APP SCREENSHOT HOCHLADEN';
      case 'dine-ease':
        return 'DINE-EASE SCREENSHOT HOCHLADEN';
      case 'du-bist-nicht-zu-viel':
        return 'ORIGINAL BUCHCOVER HOCHLADEN';
      default:
        return 'BILD HOCHLADEN';
    }
  };

  const getPlaceholderType = (id: string) => {
    if (id === 'du-bist-nicht-zu-viel') return 'bookCover';
    if (id === 'vinyl') return 'vinyl';
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

        {/* 5 Project Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3.5">
          {PROJECTS.map((project) => {
            const currentImg = mediaAssets[project.mediaKey];
            const placeholderLabel = getPlaceholderLabel(project.id);
            const placeholderType = getPlaceholderType(project.id);
            const projectUrl = getProjectUrl(project.id, mediaAssets);
            const actionLabel = getProjectActionLabel(project.id, currentLang);
            const badgeText = project.projectTypeBadge?.[currentLang] || project.projectTypeBadge?.de;

            return (
              <article
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#C9A66B]/20 bg-gradient-to-b from-[#063F35]/15 via-[#080B09] to-[#080B09] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A66B]/80 hover:shadow-[0_10px_30px_rgba(11,90,77,0.3)]"
              >
                <div>
                  {/* Card Header: Project Number & Live Status */}
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-serif text-xs font-bold tracking-widest text-[#C9A66B]">
                      {project.number}
                    </span>
                    {projectUrl ? (
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
                  <div className="mb-3">
                    <MediaPlaceholder
                      label={placeholderLabel}
                      mediaKey={project.mediaKey}
                      currentSrc={currentImg}
                      aspectRatio="aspect-16/10"
                      type={placeholderType}
                      onUploadClick={onUploadMedia}
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
                  <h3 className="font-serif text-base font-semibold leading-snug text-[#F5F1E8] transition-colors group-hover:text-[#C9A66B] sm:text-lg">
                    {project.title}
                  </h3>

                  <p className="mt-1.5 line-clamp-2 font-sans text-xs leading-relaxed text-[#B9C4BD]">
                    {project.subtitle}
                  </p>

                  {/* Skill / Method Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, idx) => (
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
                  <div className="flex flex-col gap-2">
                    {/* View Case Study Button */}
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="group/btn flex items-center justify-between font-sans text-xs font-semibold tracking-wide text-[#148B78] transition-colors hover:text-[#C9A66B]"
                    >
                      <span className="uppercase">{t.viewCaseStudy}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    {/* Project Live Link Row */}
                    {projectUrl ? (
                      <div className="flex items-center justify-between gap-1 rounded-lg border border-[#C9A66B]/30 bg-[#063F35]/25 px-2 py-1.5">
                        <a
                          href={projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[11px] font-semibold text-[#C9A66B] hover:text-[#F5F1E8] truncate"
                          title={projectUrl}
                        >
                          <span className="truncate">{actionLabel}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                        <button
                          type="button"
                          onClick={() => (onEditProjectLink ? onEditProjectLink(project) : onUploadMedia(getProjectLinkKey(project.id)))}
                          title="Link bearbeiten"
                          className="text-[#B9C4BD] hover:text-[#C9A66B] p-0.5"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => (onEditProjectLink ? onEditProjectLink(project) : onUploadMedia(getProjectLinkKey(project.id)))}
                        className="flex items-center justify-between rounded-lg border border-dashed border-[#C9A66B]/40 bg-[#063F35]/15 px-2 py-1 text-[10px] font-medium text-[#B9C4BD] hover:border-[#C9A66B] hover:text-[#C9A66B] transition-colors"
                      >
                        <span className="flex items-center gap-1">
                          <LinkIcon className="h-3 w-3 text-[#C9A66B]" />
                          <span>+ Link hinzufügen</span>
                        </span>
                        <ArrowUpRight className="h-2.5 w-2.5" />
                      </button>
                    )}

                    {/* street.life Video Preview Option */}
                    {project.id === 'street-life' && onOpenVideoModal && (
                      <button
                        type="button"
                        onClick={onOpenVideoModal}
                        className="flex items-center justify-between text-[11px] text-[#B9C4BD] hover:text-[#C9A66B] transition-colors"
                      >
                        <span>VIDEO ANSEHEN</span>
                        <Play className="h-3 w-3" />
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
