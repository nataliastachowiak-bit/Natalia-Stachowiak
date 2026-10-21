import React, { useState } from 'react';
import {
  FlaskConical,
  Leaf,
  Briefcase,
  Palette,
  Cpu,
  Target,
  Mail,
  Linkedin,
  ArrowRight,
  BookOpen,
  Users,
  RefreshCw,
  Sparkles,
  Upload,
  ChevronDown,
} from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { translations } from '../data/translations';
import { BotanicalDecoration } from './BotanicalDecoration';
import { LOCKED_ASSETS, ABOUT_IMAGE } from '../data/assetRegistry';

interface AboutSectionProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onSelectJourneyStation: (stationId: string) => void;
  onUploadMedia: (key: string) => void;
  onExploreSkillsClick: () => void;
  isReadOnly?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  currentLang,
  mediaAssets,
  onSelectJourneyStation,
  onUploadMedia,
  onExploreSkillsClick,
  isReadOnly = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [portraitError, setPortraitError] = useState(false);

  // Respect user uploaded portrait with fallback to canonical ABOUT_IMAGE
  const userAboutImg = mediaAssets.aboutPortrait || mediaAssets.aboutPhoto || mediaAssets.aboutImage;
  const aboutImageSrc = (!portraitError && userAboutImg && userAboutImg.trim() !== '')
    ? userAboutImg
    : ABOUT_IMAGE;

  React.useEffect(() => {
    setPortraitError(false);
  }, [mediaAssets.aboutPortrait]);

  const tAbout = translations[currentLang].about;
  const tJourney = translations[currentLang].journey;
  const tSkills = translations[currentLang].skills;
  const tContact = translations[currentLang].contact;

  // Station Icons mapper
  const getStationIcon = (id: string) => {
    switch (id) {
      case 'chemistry':
        return <FlaskConical className="h-4 w-4 text-[#148B78]" />;
      case 'environmental':
        return <Leaf className="h-4 w-4 text-[#148B78]" />;
      case 'business':
        return <Briefcase className="h-4 w-4 text-[#C7A35A]" />;
      case 'design':
        return <Palette className="h-4 w-4 text-[#148B78]" />;
      case 'digital':
        return <Cpu className="h-4 w-4 text-[#148B78]" />;
      case 'product':
        return <Target className="h-4 w-4 text-[#C7A35A]" />;
      default:
        return <Sparkles className="h-4 w-4 text-[#148B78]" />;
    }
  };

  return (
    <section
      id="about"
      className="relative w-full border-b border-[#C7A35A]/15 bg-[#080A09] py-16 lg:py-20 overflow-hidden"
    >
      {/* Botanical Foliage on bottom right */}
      <BotanicalDecoration position="bottom-right" />

      {/* Atmospheric Background Ambient Glows */}
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-[#101412]/30 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* The Exact Concentrated Bento Grid matching the screenshot */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* COLUMN 1: Portrait with French Bulldog (Col-span 4 on LG) */}
          <div className="lg:col-span-4 max-w-[280px] sm:max-w-sm mx-auto w-full lg:max-w-none">
            <div className="group relative overflow-hidden rounded-2xl border border-[#C7A35A]/40 bg-gradient-to-b from-[#101412]/40 via-[#080A09] to-[#080A09] p-2 shadow-[0_15px_35px_rgba(6,63,53,0.4)] transition-all duration-300 hover:border-[#C7A35A] hover:shadow-[0_0_30px_rgba(201,166,107,0.3)]">
              {aboutImageSrc && !portraitError ? (
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl" style={{ aspectRatio: '3 / 4' }}>
                  <img
                    src={aboutImageSrc}
                    alt="Natalia mit Bulldogge"
                    onError={() => setPortraitError(true)}
                    className="h-full w-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A09] via-transparent to-transparent opacity-40" />
                  
                  {!isReadOnly && (
                    <button
                      type="button"
                      onClick={() => onUploadMedia('aboutPortrait')}
                      className="absolute bottom-3 right-3 flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#080A09]/90 px-3.5 py-2 text-xs font-medium text-[#C7A35A] shadow-lg backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0F5C46] hover:text-white"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Bild ändern</span>
                    </button>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (!isReadOnly) onUploadMedia('aboutPortrait');
                  }}
                  className={`flex aspect-[3/4] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#C7A35A]/50 bg-gradient-to-b from-[#101412]/30 to-[#080A09] p-6 text-center transition-all ${
                    isReadOnly ? 'cursor-default' : 'cursor-pointer hover:bg-[#101412]/40'
                  }`}
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C7A35A] bg-[#0F5C46]/40 text-[#C7A35A] shadow-[0_0_15px_rgba(201,166,107,0.25)]">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <p className="font-sans text-xs font-bold tracking-widest text-[#F4F1EA] uppercase">
                    NATALIA STACHOWIAK
                  </p>
                  <p className="mt-2 text-[11px] leading-snug text-[#A9AEA9]">
                    Wissenschaft · Digital Product Management · Umweltökonomie
                  </p>
                  {!isReadOnly && (
                    <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-[#C7A35A]/50 bg-[#0F5C46]/30 px-3 py-1 text-[11px] font-medium text-[#C7A35A]">
                      Hier klicken zum Hochladen
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: Authentic Bio Text & Interactive Accordion (Col-span 4 on LG) */}
          <div className="flex flex-col justify-between lg:col-span-4 lg:pr-2">
            <div>
              {/* Section Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
                <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
                  {tAbout.label}
                </span>
                {tAbout.taglineBadge && (
                  <span className="rounded-full border border-[#C7A35A]/40 bg-[#101412]/40 px-2.5 py-0.5 font-sans text-[11px] font-medium tracking-wider text-[#F4F1EA]">
                    {tAbout.taglineBadge}
                  </span>
                )}
              </div>

              {/* Headline */}
              <h2 className="mt-3 font-serif text-2xl font-normal leading-snug tracking-tight text-[#F4F1EA] sm:text-3xl">
                {tAbout.headline}
              </h2>

              {/* Core Visible Bio Content */}
              <div className="mt-5 space-y-3.5 font-sans text-xs leading-relaxed text-[#A9AEA9] sm:text-sm">
                <p>{tAbout.p1}</p>
                <p>{tAbout.p2}</p>
                <p>{tAbout.p3}</p>
              </div>

              {/* Interactive Accordion for Expanded Content */}
              <div
                id="about-bio-accordion"
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[950px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0 pointer-events-none'
                }`}
                aria-hidden={!isExpanded}
              >
                <div className="space-y-3.5 border-t border-[#C7A35A]/20 pt-4 font-sans text-xs leading-relaxed text-[#A9AEA9] sm:text-sm">
                  <p>{tAbout.accordionP1}</p>
                  <p>{tAbout.accordionP2}</p>
                  {tAbout.accordionP3 && <p>{tAbout.accordionP3}</p>}
                  {tAbout.accordionP4 && <p>{tAbout.accordionP4}</p>}
                  <div className="mt-4 rounded-lg border border-[#C7A35A]/20 bg-[#101412]/20 p-3">
                    <p className="font-serif text-sm font-medium tracking-wide text-[#F4F1EA]">
                      {tAbout.accordionTagline1}
                    </p>
                    <p className="font-serif text-sm italic text-[#C7A35A]">
                      {tAbout.accordionTagline2}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Read More / Read Less Accordion Toggle Button */}
            <div className="mt-6 pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls="about-bio-accordion"
                className="group inline-flex items-center gap-2 rounded-full border border-[#148B78]/40 bg-[#101412]/25 px-4 py-2 font-sans text-xs font-semibold tracking-wider text-[#148B78] shadow-sm transition-all duration-300 hover:border-[#C7A35A] hover:bg-[#101412]/50 hover:text-[#C7A35A] focus:outline-none focus:ring-2 focus:ring-[#C7A35A]/50"
              >
                <span>
                  {isExpanded
                    ? (currentLang === 'de' ? 'Weniger anzeigen ↑' : tAbout.readLess)
                    : (currentLang === 'de' ? 'Mehr über mich lesen ↓' : tAbout.readMore)}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#C7A35A] transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 text-[#C7A35A]' : 'rotate-0 group-hover:translate-y-0.5'
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* COLUMN 3: MY JOURNEY (Interactive Timeline) (Col-span 2 on LG) */}
          <div className="relative lg:col-span-2 lg:border-l lg:border-[#C7A35A]/20 lg:pl-5">
            <div className="mb-4">
              <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
                {tJourney.label}
              </span>
              <p className="mt-0.5 text-[10px] text-[#A9AEA9]">
                {tJourney.subtitle}
              </p>
            </div>

            {/* The Connected Vertical Timeline */}
            <div className="relative pl-6 space-y-5">
              {/* Connecting Vertical Emerald Line */}
              <div className="absolute top-2 bottom-2 left-[11px] w-[1.5px] bg-gradient-to-b from-[#148B78] via-[#0F5C46] to-[#C7A35A]" />

              {tJourney.stations.map((st: any) => {
                const isFinal = st.id === 'product';
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => onSelectJourneyStation(st.id)}
                    className="group relative flex w-full flex-col text-left transition-all hover:translate-x-1"
                  >
                    {/* Timeline Node Icon Circle */}
                    <div
                      className={`absolute -left-6 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border bg-[#080A09] transition-all duration-300 ${
                        isFinal
                          ? 'border-[#C7A35A] shadow-[0_0_10px_rgba(201,166,107,0.4)] group-hover:bg-[#C7A35A]/20'
                          : 'border-[#0F5C46] group-hover:border-[#148B78] group-hover:bg-[#101412]'
                      }`}
                    >
                      {getStationIcon(st.id)}
                    </div>

                    {/* Milestone Title */}
                    <span
                      className={`font-sans text-xs font-bold tracking-wider uppercase transition-colors ${
                        isFinal
                          ? 'text-[#C7A35A] group-hover:text-white'
                          : 'text-[#F4F1EA] group-hover:text-[#C7A35A]'
                      }`}
                    >
                      {st.title}
                    </span>

                    {/* Degree / Role description */}
                    <span className="text-[11px] text-[#A9AEA9] transition-colors group-hover:text-[#F4F1EA]">
                      {st.degree}
                    </span>

                    {/* Special status highlight for Product Management */}
                    {isFinal && (
                      <span className="mt-0.5 text-[10px] font-medium text-[#148B78]">
                        Meine nächste große Etappe
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Handwritten script quote below Journey */}
            <div className="mt-8 pt-4 border-t border-[#C7A35A]/15">
              <p className="font-['Caveat',cursive] text-base leading-snug text-[#C7A35A]/90">
                My background is interdisciplinary –
                <span className="block">and that is what I bring into Product Management.</span>
                <span className="block mt-1 text-lg text-center">♡</span>
              </p>
            </div>
          </div>

          {/* COLUMN 4: MY SKILLS & CONTACT (Col-span 2 on LG) */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-2 lg:border-l lg:border-[#C7A35A]/20 lg:pl-5">
            
            {/* MY SKILLS Preview */}
            <div>
              <div className="mb-4">
                <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
                  {tSkills.title}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="group flex w-full items-center gap-2.5 text-left transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#0F5C46] bg-[#101412]/30 text-[#148B78] group-hover:border-[#C7A35A] group-hover:text-[#C7A35A]">
                    <BookOpen className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans text-xs font-medium text-[#F4F1EA] group-hover:text-[#C7A35A]">
                    Product Management
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="group flex w-full items-center gap-2.5 text-left transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#0F5C46] bg-[#101412]/30 text-[#148B78] group-hover:border-[#C7A35A] group-hover:text-[#C7A35A]">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans text-xs font-medium text-[#F4F1EA] group-hover:text-[#C7A35A]">
                    User Experience & Research
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="group flex w-full items-center gap-2.5 text-left transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#0F5C46] bg-[#101412]/30 text-[#148B78] group-hover:border-[#C7A35A] group-hover:text-[#C7A35A]">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans text-xs font-medium text-[#F4F1EA] group-hover:text-[#C7A35A]">
                    Agile & Scrum
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="group flex w-full items-center gap-2.5 text-left transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#0F5C46] bg-[#101412]/30 text-[#148B78] group-hover:border-[#C7A35A] group-hover:text-[#C7A35A]">
                    <Cpu className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans text-xs font-medium text-[#F4F1EA] group-hover:text-[#C7A35A]">
                    AI & Digital Innovation
                  </span>
                </button>
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="text-[11px] font-semibold text-[#148B78] hover:text-[#C7A35A] uppercase tracking-wider"
                >
                  Alle Skills ansehen →
                </button>
              </div>
            </div>

            {/* CONTACT Preview */}
            <div className="border-t border-[#C7A35A]/20 pt-5">
              <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
                {tContact.label}
              </span>

              <div className="mt-3 space-y-2.5">
                <a
                  href={`mailto:${tContact.emailAddress}`}
                  className="group flex items-center gap-2.5 text-xs text-[#F4F1EA] hover:text-[#C7A35A]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C7A35A]/40 bg-[#0F5C46]/20 text-[#C7A35A] group-hover:bg-[#0F5C46] group-hover:text-white">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <span className="truncate">{tContact.emailAddress}</span>
                </a>

                <a
                  href={mediaAssets.linkedinUrl || 'https://www.linkedin.com/in/natalia-stachowiak-0a8449306'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-xs text-[#F4F1EA] hover:text-[#C7A35A]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C7A35A]/40 bg-[#0F5C46]/20 text-[#C7A35A] group-hover:bg-[#0F5C46] group-hover:text-white">
                    <Linkedin className="h-3.5 w-3.5" />
                  </div>
                  <span>{tContact.linkedin}</span>
                </a>
              </div>

              {/* Handwritten "Let's connect ↗" script accent matching the screenshot */}
              <div className="mt-5 text-right font-['Caveat',cursive] text-2xl font-semibold text-[#C7A35A] rotate-[-5deg]">
                {tContact.scriptConnect}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
