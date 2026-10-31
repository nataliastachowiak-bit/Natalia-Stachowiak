import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Upload } from 'lucide-react';
import { Language, MediaAssets, ProjectData } from '../types';
import { LOCKED_ASSETS, HOME_MAIN_IMAGE, NATALIA_BUSINESS_PORTRAIT, getLockedAsset } from '../data/assetRegistry';
import { PROJECTS } from '../data/portfolioData';
import { getProjectPath } from '../utils/projectRoutes';
import { PageTransition } from '../components/PageTransition';

interface HomePageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onUploadMedia?: (key: string) => void;
  onEditProjectLink?: (project: ProjectData) => void;
  isReadOnly?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  mediaAssets,
  onUploadMedia,
  isReadOnly = false,
}) => {
  const navigate = useNavigate();

  // Authentic original business portrait (black hair, black blazer, white top, green background) across desktop & mobile
  const portraitSrc = (mediaAssets.heroPortrait && !mediaAssets.heroPortrait.includes('hero_portrait.jpg'))
    ? mediaAssets.heroPortrait
    : NATALIA_BUSINESS_PORTRAIT;
  const desktopPortraitSrc = portraitSrc;
  const mobilePortraitSrc = portraitSrc;
  // Curate top 4 primary selected projects (01 eNvironix AI, 02 Building AI Concept, 03 Street.life, 04 CircularTwin AI)
  const previewProjects = PROJECTS.slice(0, 4);

  const t = {
    de: {
      subLocation: 'Bielefeld · Digitales Produktmanagement',
      badge: 'DIGITAL PRODUCT MANAGEMENT · AI INNOVATION · SUSTAINABILITY',
      headlinePart1: 'Turning problems',
      headlinePart2: 'into products.',
      description: 'Ich verbinde wissenschaftliche Analyse, unternehmerische Erfahrung und digitales Produktmanagement. Mein Fokus liegt auf nutzerzentrierten, datenbasierten und nachhaltigen Lösungen – von der Problemvalidierung bis zum Produktkonzept.',
      ctaWork: 'MEINE PROJEKTE ENTDECKEN →',
      ctaAbout: 'ÜBER MICH',
      selectedWorkBadge: 'AUSGEWÄHLTE PRODUKTE',
      selectedWorkTitle: 'Ausgewählte Produkte & Fallstudien',
      viewAll: 'Alle Fallstudien ansehen',
      viewCaseStudy: 'CASE STUDY ANSEHEN →',
      journeyEyebrow: 'MY JOURNEY',
      journeyTitle: 'Different disciplines. One direction.',
      journeySubtitle: 'Von Naturwissenschaft und Umweltschutz zu digitalen Produkten und KI.',
      journeyCta: 'MEINE JOURNEY ENTDECKEN →',
    },
    en: {
      subLocation: 'Bielefeld · Digital Product Management',
      badge: 'DIGITAL PRODUCT MANAGEMENT · AI INNOVATION · SUSTAINABILITY',
      headlinePart1: 'Turning problems',
      headlinePart2: 'into products.',
      description: 'I connect scientific analysis, entrepreneurial experience, and digital product management. My focus is on user-centered, data-driven, and sustainable solutions – from problem validation to product concept.',
      ctaWork: 'VIEW MY WORK →',
      ctaAbout: 'ABOUT ME',
      selectedWorkBadge: 'SELECTED PRODUCTS',
      selectedWorkTitle: 'Selected Products & Case Studies',
      viewAll: 'View all case studies',
      viewCaseStudy: 'VIEW CASE STUDY →',
      journeyEyebrow: 'MY JOURNEY',
      journeyTitle: 'Different disciplines. One direction.',
      journeySubtitle: 'From science and environmental expertise to digital products and AI.',
      journeyCta: 'EXPLORE MY JOURNEY →',
    },
    pl: {
      subLocation: 'Bielefeld · Cyfrowe Zarządzanie Produktem',
      badge: 'DIGITAL PRODUCT MANAGEMENT · AI INNOVATION · SUSTAINABILITY',
      headlinePart1: 'Turning problems',
      headlinePart2: 'into products.',
      description: 'Łączę analizę naukową, doświadczenie przedsiębiorcze i zarządzanie produktami cyfrowymi. Koncentruję się na rozwiązaniach zorientowanych na użytkownika, opartych na danych i zrównoważonych – od walidacji problemu po koncepcję produktu.',
      ctaWork: 'ODKRYJ MOJE PROJEKTY →',
      ctaAbout: 'O MNIE',
      selectedWorkBadge: 'WYBRANE PRODUKTY',
      selectedWorkTitle: 'Wybrane produkty i studia przypadków',
      viewAll: 'Zobacz wszystkie case studies',
      viewCaseStudy: 'ZOBACZ CASE STUDY →',
      journeyEyebrow: 'MY JOURNEY',
      journeyTitle: 'Different disciplines. One direction.',
      journeySubtitle: 'Od nauk ścisłych i ochrony środowiska do produktów cyfrowych i AI.',
      journeyCta: 'POZNAJ MOJĄ DROGĘ →',
    },
  }[currentLang];

  return (
    <PageTransition>
      <div className="relative w-full flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-14 space-y-16 sm:space-y-24">
        {/* Subtle Ambient Background Accents */}
        <div className="pointer-events-none absolute top-20 left-1/4 -translate-x-1/2 h-96 w-96 rounded-full bg-[#0F5C46]/15 blur-[160px]" />
        <div className="pointer-events-none absolute top-40 right-1/4 h-96 w-96 rounded-full bg-[#C7A35A]/10 blur-[160px]" />

        {/* 1. HERO SECTION: Image Left, Messaging Right */}
        <section className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Original Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] w-full">
              {/* Elegant Frame with subtle gold accent */}
              <div
                className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#C7A35A]/40 bg-[#101412] shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                style={{ aspectRatio: '3 / 4' }}
              >
                <picture>
                  {/* Desktop viewports (min-width: 1024px): retain existing desktop portrait assignment */}
                  <source media="(min-width: 1024px)" srcSet={desktopPortraitSrc} />
                  {/* Mobile & tablet viewports: authentic business portrait */}
                  <img
                    src={mobilePortraitSrc}
                    alt="Natalia Stachowiak"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = mobilePortraitSrc;
                    }}
                    className="h-full w-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A09]/80 via-transparent to-transparent" />
                
                {/* Optional change image button on hover when editable */}
                {!isReadOnly && onUploadMedia && (
                  <button
                    type="button"
                    onClick={() => onUploadMedia('heroPortrait')}
                    className="absolute top-3 right-3 flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#C7A35A]/50 bg-[#080A09]/90 px-3 py-1.5 text-xs font-medium text-[#C7A35A] shadow-lg backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0F5C46] hover:text-white z-20"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Bild ändern</span>
                  </button>
                )}

                {/* Subtle Name Tag */}
                <div className="absolute bottom-4 left-4 right-4 text-center sm:text-left">
                  <span className="font-serif text-base font-medium text-[#F4F1EA] block">Natalia Stachowiak</span>
                  <span className="font-sans text-[11px] text-[#C7A35A] tracking-wider uppercase">{t.subLocation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase block">
                  {t.badge}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F4F1EA] leading-[1.05]">
                {t.headlinePart1} <br />
                <span className="italic text-[#C7A35A]">{t.headlinePart2}</span>
              </h1>
            </div>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#A9AEA9] max-w-xl">
              {t.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/projects"
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-[#0F5C46] px-7 py-3 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] transition-all duration-300 hover:bg-[#148B78] hover:shadow-[0_0_20px_rgba(15,92,70,0.4)] uppercase"
              >
                <span>{t.ctaWork}</span>
              </Link>

              <Link
                to="/about"
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full border border-[#C7A35A]/50 bg-transparent px-7 py-3 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] transition-all duration-300 hover:border-[#C7A35A] hover:bg-[#101412] uppercase"
              >
                <span>{t.ctaAbout}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. SELECTED WORK PREVIEW */}
        <section className="relative z-10 border-t border-[#C7A35A]/15 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
                  {t.selectedWorkBadge}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F4F1EA] tracking-tight">
                {t.selectedWorkTitle}
              </h2>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wider text-[#C7A35A] hover:text-[#F4F1EA] transition-colors uppercase"
            >
              <span>{t.viewAll}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Primary Selected Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewProjects.map((p) => {
              const fallbackImg = getLockedAsset(p.mediaKey);
              const imgSrc = mediaAssets[p.mediaKey as keyof MediaAssets] || fallbackImg;

              return (
                <div
                  key={p.id}
                  onClick={() => navigate(getProjectPath(p))}
                  className="group cursor-pointer rounded-2xl border border-[#0F5C46]/30 bg-[#101412] p-4 transition-all duration-300 hover:border-[#C7A35A] hover:bg-[#141A16] flex flex-col justify-between shadow-[0_6px_25px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#C7A35A]/20 bg-[#080A09]"
                      style={{ aspectRatio: '16 / 10' }}
                    >
                      <img
                        src={imgSrc}
                        alt={p.name}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = fallbackImg;
                        }}
                        className={`h-full w-full ${p.id === 'du-bist-nicht-zu-viel' ? 'object-contain p-2' : 'object-cover object-center'} transition-transform duration-500 group-hover:scale-105`}
                      />
                      <div className="absolute top-2.5 left-2.5 rounded bg-[#080A09]/85 px-2 py-0.5 text-xs font-mono font-bold text-[#C7A35A] border border-[#C7A35A]/20">
                        {p.number.startsWith('0') ? p.number : `0${p.number}`}
                      </div>
                    </div>

                    <div className="mt-3.5">
                      <h3 className="font-serif text-lg font-medium text-[#F4F1EA] group-hover:text-[#C7A35A] transition-colors truncate">
                        {p.name}
                      </h3>
                      <p className="font-sans text-xs text-[#C7A35A] mt-0.5 line-clamp-2">
                        {p.subtitle}
                      </p>

                      {/* Key Competencies Tags */}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {p.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded border border-[#0F5C46]/50 bg-[#063F35]/30 px-1.5 py-0.5 text-[9px] font-mono font-medium text-[#B9C4BD]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="mt-2 text-xs text-[#A9AEA9] line-clamp-2 leading-relaxed">
                        {p.description[currentLang] || p.description.de}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#C7A35A]/15 flex items-center justify-between text-xs font-semibold text-[#C7A35A] group-hover:text-[#F4F1EA] uppercase">
                    <span>{t.viewCaseStudy}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </PageTransition>
  );
};
