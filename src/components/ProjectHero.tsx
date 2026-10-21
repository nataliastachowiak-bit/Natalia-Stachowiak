import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Download, Play, Edit3 } from 'lucide-react';
import { Language, MediaAssets, ProjectData } from '../types';
import { getProjectActionLabel, getProjectUrl } from '../data/mediaConfig';
import { getLockedAsset } from '../data/assetRegistry';
import { MediaPlaceholder } from './MediaPlaceholder';
import { BackToPortfolio } from './BackToPortfolio';

interface ProjectHeroProps {
  project: ProjectData;
  currentLang: Language;
  mediaAssets: MediaAssets;
  onUploadMedia?: (key: string) => void;
  onEditProjectLink?: (project: ProjectData) => void;
  onOpenVideoModal?: () => void;
  isReadOnly?: boolean;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({
  project,
  currentLang,
  mediaAssets,
  onUploadMedia,
  onEditProjectLink,
  onOpenVideoModal,
  isReadOnly = false,
}) => {
  const fallbackImg = getLockedAsset(project.mediaKey);
  const currentImg = mediaAssets[project.mediaKey as keyof MediaAssets] || fallbackImg;
  const projectUrl = getProjectUrl(project.id, mediaAssets, project);
  const actionLabel = getProjectActionLabel(project.id, currentLang);
  const badgeText = project.projectTypeBadge?.[currentLang] || project.projectTypeBadge?.de;

  return (
    <div className="relative border-b border-[#C7A35A]/15 bg-[#080A09] pt-8 pb-12 sm:pb-16">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-[#0F5C46]/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb: Back to Portfolio */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <BackToPortfolio currentLang={currentLang} />

          <span className="font-mono text-xs font-bold tracking-widest text-[#C7A35A]/80">
            0{project.number} / CASE STUDY
          </span>
        </div>

        {/* Project Meta & Heading */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="font-mono text-xs font-bold tracking-widest text-[#C7A35A]">
              PROJEKT {project.number}
            </span>
            <span className="text-[#0F5C46]">/</span>
            {badgeText && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C7A35A]/40 bg-[#101412] px-3 py-0.5 text-xs font-semibold text-[#F4F1EA]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
                {badgeText}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl font-normal tracking-tight text-[#F4F1EA] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12]">
            {project.title}
          </h1>

          <p className="mt-3 font-serif text-lg sm:text-xl font-normal italic text-[#C7A35A]">
            {project.subtitle}
          </p>

          <p className="mt-4 max-w-3xl font-sans text-sm sm:text-base leading-relaxed text-[#A9AEA9]">
            {project.description[currentLang] || project.description.de}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full border border-[#0F5C46]/40 bg-[#101412] px-3.5 py-1 text-xs font-medium text-[#F4F1EA]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Live App / PDF Access Action Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#C7A35A]/30 bg-[#101412] p-4 sm:p-5">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#C7A35A] uppercase">
              {project.pdfUrl
                ? (currentLang === 'de' ? 'Offizieller Projektbericht & Dokumentation:' : currentLang === 'pl' ? 'Oficjalny raport projektowy i dokumentacja:' : 'Official Project Report & Documentation:')
                : (currentLang === 'de' ? 'Interaktiver Zugang & Live-App:' : currentLang === 'pl' ? 'Interaktywny dostęp i aplikacja na żywo:' : 'Interactive Access & Live App:')}
            </span>
            <p className="text-xs text-[#A9AEA9] mt-0.5">
              {project.pdfUrl ? (
                <>
                  {currentLang === 'de'
                    ? 'Vollständiger IHK-Projektbericht hinterlegt: '
                    : currentLang === 'pl'
                    ? 'Pełny raport projektowy IHK: '
                    : 'Complete official IHK project report available: '}
                  <span className="font-mono text-[#F4F1EA]">{project.pdfFileName || 'IHK_Projektbericht.pdf'}</span>{' '}
                  ({currentLang === 'de' ? '67 Seiten, Methodik & B2B-Architektur' : currentLang === 'pl' ? '67 stron, metodyka i architektura B2B' : '67 pages, methodology & B2B architecture'})
                </>
              ) : projectUrl ? (
                <>
                  {currentLang === 'de' ? 'Aktiv verknüpft: ' : currentLang === 'pl' ? 'Aktywny link: ' : 'Active link: '}
                  <span className="font-mono text-[#F4F1EA] break-all">{projectUrl}</span>
                </>
              ) : (
                currentLang === 'de'
                  ? 'Dieses Projekt existiert als interaktives Konzept / Prototyp.'
                  : currentLang === 'pl'
                  ? 'Ten projekt istnieje jako interaktywna koncepcja i prototyp.'
                  : 'This project exists as an interactive concept / prototype.'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Dedicated PDF Download Button */}
            {project.pdfUrl && (
              <a
                href={project.pdfUrl}
                download={project.pdfFileName || 'eNvironix_AI_IHK_Projektbericht_Natalia_Stachowiak.pdf'}
                className="flex min-h-[44px] items-center gap-2 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-5 py-2.5 text-xs font-semibold tracking-wider text-white shadow-lg transition-all hover:bg-[#148B78] uppercase"
              >
                <Download className="h-4 w-4 text-[#C7A35A]" />
                <span>
                  {currentLang === 'de' ? 'IHK-Projektbericht (PDF)' : currentLang === 'pl' ? 'Pobierz raport IHK (PDF)' : 'Download IHK Report (PDF)'}
                </span>
              </a>
            )}

            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-2 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-5 py-2.5 text-xs font-semibold tracking-wider text-white shadow-lg transition-all hover:bg-[#148B78] uppercase"
              >
                <span>{actionLabel}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {project.id === 'street-life' && onOpenVideoModal && (
              <button
                type="button"
                onClick={onOpenVideoModal}
                className="flex min-h-[44px] items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-[#101412] px-5 py-2.5 text-xs font-semibold tracking-wider text-white hover:bg-[#141A16] uppercase"
              >
                <Play className="h-4 w-4 text-[#C7A35A]" />
                <span>
                  {currentLang === 'de' ? 'Video ansehen' : currentLang === 'pl' ? 'Obejrzyj wideo' : 'Watch Video'}
                </span>
              </button>
            )}

            {!isReadOnly && onEditProjectLink && (
              <button
                type="button"
                onClick={() => onEditProjectLink(project)}
                className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#C7A35A]/40 bg-[#080A09] px-4 py-2 text-xs font-medium text-[#C7A35A] hover:border-[#C7A35A] hover:text-white"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>{currentLang === 'de' ? 'Link bearbeiten' : currentLang === 'pl' ? 'Edytuj link' : 'Edit link'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Showcase Media Image */}
        <div className="overflow-hidden rounded-2xl border border-[#C7A35A]/30 bg-[#101412] p-2 sm:p-3 shadow-2xl">
          <MediaPlaceholder
            label={`${project.name} ${currentLang === 'de' ? 'Vorschau' : currentLang === 'pl' ? 'Podgląd' : 'Preview'}`}
            mediaKey={project.mediaKey}
            currentSrc={currentImg}
            aspectRatio="aspect-[16/9]"
            type={project.id === 'vinyl' ? 'vinyl' : project.id === 'du-bist-nicht-zu-viel' ? 'bookCover' : project.id === 'environix' ? 'environix' : 'generic'}
            objectFit={project.id === 'du-bist-nicht-zu-viel' ? 'contain' : 'cover'}
            onUploadClick={onUploadMedia}
            isReadOnly={isReadOnly}
          />
        </div>
      </div>
    </div>
  );
};
