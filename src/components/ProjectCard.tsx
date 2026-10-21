import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Download, FileText, Link as LinkIcon, Edit3 } from 'lucide-react';
import { Language, MediaAssets, ProjectData } from '../types';
import { translations } from '../data/translations';
import { getProjectActionLabel, getProjectUrl, getProjectLinkKey } from '../data/mediaConfig';
import { getLockedAsset } from '../data/assetRegistry';
import { MediaPlaceholder } from './MediaPlaceholder';
import { getProjectPath } from '../utils/projectRoutes';

interface ProjectCardProps {
  project: ProjectData;
  currentLang: Language;
  mediaAssets: MediaAssets;
  onUploadMedia?: (key: string) => void;
  onEditProjectLink?: (project: ProjectData) => void;
  isReadOnly?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  currentLang,
  mediaAssets,
  onUploadMedia,
  onEditProjectLink,
  isReadOnly = false,
}) => {
  const t = translations[currentLang].selectedWork;
  const fallbackImg = getLockedAsset(project.mediaKey);
  const currentImg = mediaAssets[project.mediaKey as keyof MediaAssets] || fallbackImg;
  const projectUrl = getProjectUrl(project.id, mediaAssets, project);
  const actionLabel = getProjectActionLabel(project.id, currentLang);
  const badgeText = project.projectTypeBadge?.[currentLang] || project.projectTypeBadge?.de;
  const caseStudyPath = getProjectPath(project);

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
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#C7A35A]/25 bg-gradient-to-b from-[#101412]/15 via-[#080B09] to-[#080B09] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C7A35A]/80 hover:shadow-[0_10px_30px_rgba(11,90,77,0.3)]">
      <div>
        {/* Card Header: Project Number & Status */}
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-serif text-xs font-bold tracking-widest text-[#C7A35A]">
            {project.number}
          </span>
          {project.pdfUrl ? (
            <span className="text-[10px] tracking-wider text-[#C7A35A] uppercase font-semibold flex items-center gap-1">
              <FileText className="h-3 w-3 text-[#C7A35A]" />
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

        {/* Project Media Thumbnail */}
        <Link to={caseStudyPath} className="block mb-3.5 group/img overflow-hidden rounded-lg">
          <MediaPlaceholder
            label={getPlaceholderLabel(project.id)}
            mediaKey={project.mediaKey}
            currentSrc={currentImg}
            aspectRatio="aspect-[16/10]"
            type={getPlaceholderType(project.id)}
            objectFit={project.id === 'du-bist-nicht-zu-viel' ? 'contain' : 'cover'}
            onUploadClick={onUploadMedia}
            isReadOnly={isReadOnly}
          />
        </Link>

        {/* Project Type Badge */}
        {badgeText && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 rounded border border-[#C7A35A]/30 bg-[#101412]/40 px-2 py-0.5 text-[9.5px] font-medium tracking-wide text-[#EAD8B1]">
              <span className="h-1 w-1 rounded-full bg-[#C7A35A]" />
              <span className="truncate">{badgeText}</span>
            </span>
          </div>
        )}

        {/* Title & Subtitle */}
        <Link to={caseStudyPath} className="block group/title">
          <h3 className="font-serif text-base sm:text-lg font-semibold leading-snug text-[#F4F1EA] transition-colors group-hover/title:text-[#C7A35A]">
            {project.title}
          </h3>
          <p className="mt-1 font-serif text-xs italic text-[#C7A35A]">
            {project.subtitle}
          </p>
        </Link>

        {/* Concise Description */}
        <p className="mt-2.5 line-clamp-3 font-sans text-xs leading-relaxed text-[#A9AEA9]">
          {project.description[currentLang] || project.description.de}
        </p>

        {/* Skill / Method Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="rounded border border-[#0F5C46]/50 bg-[#101412]/30 px-1.5 py-0.5 text-[10px] font-medium text-[#A9AEA9]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-4 border-t border-[#C7A35A]/15 pt-3">
        <div className="flex flex-col gap-2.5">
          {/* VIEW CASE STUDY Button - Navigates to dedicated page */}
          <Link
            to={caseStudyPath}
            className="group/btn flex min-h-[44px] items-center justify-between rounded-lg border border-[#148B78]/40 bg-[#101412]/30 px-3.5 py-2.5 font-sans text-xs font-semibold tracking-wider text-[#148B78] transition-all hover:border-[#C7A35A] hover:bg-[#0F5C46]/40 hover:text-[#F4F1EA] active:scale-98"
          >
            <span className="uppercase">{t.viewCaseStudy}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-[#C7A35A]" />
          </Link>

          {/* Dedicated PDF Download if present */}
          {project.pdfUrl && (
            <div className="flex min-h-[44px] items-center justify-between gap-1 rounded-lg border border-[#C7A35A]/60 bg-gradient-to-r from-[#101412]/60 to-[#0F5C46]/40 px-3 py-2">
              <a
                href={project.pdfUrl}
                download={project.pdfFileName || 'eNvironix_AI_IHK_Bericht_Natalia_Stachowiak.pdf'}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#F4F1EA] hover:text-[#C7A35A] truncate"
                title="Original IHK-Projektbericht als PDF herunterladen"
              >
                <Download className="h-4 w-4 text-[#C7A35A] shrink-0" />
                <span className="truncate">
                  {currentLang === 'de' ? 'IHK-BERICHT (PDF)' : currentLang === 'pl' ? 'RAPORT IHK (PDF)' : 'IHK REPORT (PDF)'}
                </span>
              </a>
              <span className="text-[10px] font-mono text-[#C7A35A]/80 px-1">67 S.</span>
            </div>
          )}

          {/* Project Live Link Row */}
          {projectUrl ? (
            <div className="flex min-h-[44px] items-center justify-between gap-1.5 rounded-lg border border-[#C7A35A]/50 bg-gradient-to-r from-[#101412]/50 to-[#0F5C46]/30 p-1 transition-all hover:border-[#C7A35A] hover:shadow-[0_0_15px_rgba(20,139,120,0.25)]">
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 min-h-[40px] items-center justify-between gap-2 rounded-md bg-[#0F5C46]/80 px-3 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#148B78] truncate"
                title={projectUrl}
              >
                <span className="truncate">{actionLabel}</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#C7A35A] shrink-0" />
              </a>
              {!isReadOnly && onEditProjectLink && (
                <button
                  type="button"
                  onClick={() => onEditProjectLink(project)}
                  title="Link bearbeiten"
                  className="text-[#A9AEA9] hover:text-[#C7A35A] p-2 min-h-[40px] min-w-[40px] flex items-center justify-center"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ) : (
            !isReadOnly && onEditProjectLink && (
              <button
                type="button"
                onClick={() => onEditProjectLink(project)}
                className="flex min-h-[44px] items-center justify-between rounded-lg border border-dashed border-[#C7A35A]/40 bg-[#101412]/15 px-3 py-2 text-xs font-medium text-[#A9AEA9] hover:border-[#C7A35A] hover:text-[#C7A35A] transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <LinkIcon className="h-3.5 w-3.5 text-[#C7A35A]" />
                  <span>+ Link hinzufügen</span>
                </span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );
};
