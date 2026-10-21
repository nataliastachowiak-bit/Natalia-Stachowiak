import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Language, MediaAssets, ProjectData } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { getProjectPath } from '../utils/projectRoutes';
import { getLockedAsset } from '../data/assetRegistry';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';

interface ProjectsPageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onUploadMedia?: (key: string) => void;
  onEditProjectLink?: (project: ProjectData) => void;
  isReadOnly?: boolean;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  currentLang,
  mediaAssets,
  isReadOnly = false,
}) => {
  const navigate = useNavigate();

  // Selected work projects (excluding personal book which has dedicated /book route)
  const caseStudies = PROJECTS.filter((p) => p.id !== 'du-bist-nicht-zu-viel');

  return (
    <PageTransition>
      <div className="relative w-full flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
        {/* Subtle Ambient Background Accent */}
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-[#0F5C46]/15 blur-[160px]" />

        {/* Top Back to Portfolio */}
        <div className="relative z-10 mb-4 sm:mb-6">
          <BackToPortfolio currentLang={currentLang} />
        </div>

        {/* Section Header */}
        <div className="relative z-10 border-b border-[#C7A35A]/15 pb-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
                  SELECTED WORK
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#F4F1EA]">
                Real Problems. <span className="italic text-[#C7A35A]">Bold Solutions.</span>
              </h1>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] max-w-md md:text-right leading-relaxed">
              {currentLang === 'de'
                ? 'Ausgewählte Fallstudien von der Problem-Discovery bis zum validierten Prototyp. Jedes Projekt demonstriert nutzerzentrierte Methoden und datengestützte Entscheidungen.'
                : currentLang === 'pl'
                ? 'Wybrane studia przypadków od odkrycia problemu po zwalidowany prototyp. Każdy projekt prezentuje metodykę zorientowaną na użytkownika i decyzje oparte na danych.'
                : 'Selected case studies from problem discovery to validated prototype, showcasing user-centered methodologies and data-driven decisions.'}
            </p>
          </div>
        </div>

        {/* Projects Grid: 2-3 per row on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {caseStudies.map((p) => {
            const fallbackImg = getLockedAsset(p.mediaKey);
            const imgSrc = mediaAssets[p.mediaKey as keyof MediaAssets] || fallbackImg;
            const isVinyl = p.id === 'vinyl';

            return (
              <div
                key={p.id}
                onClick={() => navigate(getProjectPath(p))}
                className="group cursor-pointer rounded-2xl border border-[#0F5C46]/30 bg-[#101412] p-4 transition-all duration-300 hover:border-[#C7A35A] hover:bg-[#141A16] flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Image with uniform aspect ratio */}
                  <div
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#C7A35A]/20 bg-[#080A09]"
                    style={{ aspectRatio: '16 / 10' }}
                  >
                    <img
                      src={imgSrc}
                      alt={p.name}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = getLockedAsset(p.mediaKey);
                      }}
                      className={`h-full w-full ${p.id === 'du-bist-nicht-zu-viel' ? 'object-contain p-2' : 'object-cover object-center'} transition-transform duration-500 group-hover:scale-105`}
                    />
                    <div className="absolute top-2.5 left-2.5 rounded bg-[#080A09]/85 px-2.5 py-0.5 text-xs font-mono font-bold text-[#C7A35A] backdrop-blur-sm border border-[#C7A35A]/20">
                      {p.number.startsWith('0') ? p.number : `0${p.number}`}
                    </div>

                    {isVinyl && (
                      <div className="absolute top-2.5 right-2.5 rounded bg-[#080A09]/90 px-2 py-0.5 text-[9px] font-sans font-semibold text-[#C7A35A] backdrop-blur-sm border border-[#C7A35A]/30 uppercase tracking-wider">
                        {currentLang === 'de' ? 'Eigenständiges Konzept' : currentLang === 'pl' ? 'Niezależna koncepcja' : 'Standalone Concept'}
                      </div>
                    )}
                    {p.id === 'environix' && (
                      <div className="absolute top-2.5 right-2.5 rounded bg-[#080A09]/90 px-2 py-0.5 text-[9px] font-sans font-semibold text-[#10B981] backdrop-blur-sm border border-[#0F5C46]/50 uppercase tracking-wider">
                        Environmental AI
                      </div>
                    )}
                    {p.id === 'street-life' && (
                      <div className="absolute top-2.5 right-2.5 rounded bg-[#080A09]/90 px-2 py-0.5 text-[9px] font-sans font-semibold text-[#C7A35A] backdrop-blur-sm border border-[#C7A35A]/30 uppercase tracking-wider">
                        Event Experience
                      </div>
                    )}
                    {p.id === 'circulartwin-ai' && (
                      <div className="absolute top-2.5 right-2.5 rounded bg-[#080A09]/90 px-2 py-0.5 text-[9px] font-sans font-semibold text-[#148B78] backdrop-blur-sm border border-[#0F5C46]/50 uppercase tracking-wider">
                        Product Intelligence
                      </div>
                    )}
                    {p.id === 'ai-building-concept' && (
                      <div className="absolute top-2.5 right-2.5 rounded bg-[#080A09]/90 px-2 py-0.5 text-[9px] font-sans font-semibold text-[#10B981] backdrop-blur-sm border border-[#10B981]/40 uppercase tracking-wider">
                        AI Decision Support
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-4">
                    {p.category && (
                      <span className="font-sans text-[9px] font-bold tracking-widest text-[#C7A35A] uppercase block mb-1 truncate">
                        {p.category}
                      </span>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#F4F1EA] group-hover:text-[#C7A35A] transition-colors truncate">
                        {p.name}
                      </h3>
                      <span className="font-mono text-xs text-[#A9AEA9] group-hover:text-[#C7A35A] transition-colors">
                        {p.number.startsWith('0') ? p.number : `0${p.number}`}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#C7A35A] mt-0.5 truncate">
                      {p.subtitle}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="mt-2.5 text-xs leading-relaxed text-[#A9AEA9] line-clamp-3">
                    {p.description[currentLang] || p.description.de}
                  </p>

                  {/* 2-4 Small Tags */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5 text-[10px]">
                    {p.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded border border-[#0F5C46]/40 bg-[#080A09]/80 px-2.5 py-0.5 text-[#A9AEA9]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="mt-5 pt-3.5 border-t border-[#C7A35A]/15 flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold tracking-wider text-[#C7A35A] uppercase group-hover:text-[#F4F1EA] transition-colors">
                    {currentLang === 'de' ? 'CASE STUDY ANSEHEN →' : currentLang === 'pl' ? 'ZOBACZ CASE STUDY →' : 'VIEW CASE STUDY →'}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#C7A35A] transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="relative z-10 border-t border-[#C7A35A]/15 pt-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A9AEA9]">
          <span>
            {currentLang === 'de'
              ? 'VINYL AI ist ein eigenständiges Produktkonzept · Alle Fallstudien basieren auf realen PM-Methoden'
              : currentLang === 'pl'
              ? 'VINYL AI jest niezależną koncepcją produktową · Wszystkie studia przypadków opierają się na metodykach PM'
              : 'VINYL AI is an independent product concept · All case studies are grounded in structured PM frameworks'}
          </span>
          <span className="text-[#C7A35A]">Problem Discovery · User Research · MVP · Prototyping</span>
        </div>
      </div>
    </PageTransition>
  );
};
