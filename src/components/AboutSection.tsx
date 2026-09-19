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

interface AboutSectionProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onSelectJourneyStation: (stationId: string) => void;
  onUploadMedia: (key: string) => void;
  onExploreSkillsClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  currentLang,
  mediaAssets,
  onSelectJourneyStation,
  onUploadMedia,
  onExploreSkillsClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
        return <Briefcase className="h-4 w-4 text-[#C9A66B]" />;
      case 'design':
        return <Palette className="h-4 w-4 text-[#148B78]" />;
      case 'digital':
        return <Cpu className="h-4 w-4 text-[#148B78]" />;
      case 'product':
        return <Target className="h-4 w-4 text-[#C9A66B]" />;
      default:
        return <Sparkles className="h-4 w-4 text-[#148B78]" />;
    }
  };

  return (
    <section
      id="about"
      className="relative w-full border-b border-[#C9A66B]/15 bg-[#080B09] py-16 lg:py-20 overflow-hidden"
    >
      {/* Botanical Foliage on bottom right */}
      <BotanicalDecoration position="bottom-right" />

      {/* Atmospheric Background Ambient Glows */}
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-[#063F35]/30 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* The Exact Concentrated Bento Grid matching the screenshot */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* COLUMN 1: Portrait with French Bulldog (Col-span 4 on LG) */}
          <div className="lg:col-span-4">
            <div className="group relative overflow-hidden rounded-2xl border border-[#C9A66B]/40 bg-gradient-to-b from-[#063F35]/40 via-[#080B09] to-[#080B09] p-2 shadow-[0_15px_35px_rgba(6,63,53,0.4)] transition-all duration-300 hover:border-[#C9A66B] hover:shadow-[0_0_30px_rgba(201,166,107,0.3)]">
              {mediaAssets.aboutPortrait ? (
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                  <img
                    src={mediaAssets.aboutPortrait}
                    alt="Natalia mit Bulldogge"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B09] via-transparent to-transparent opacity-40" />
                  
                  <button
                    type="button"
                    onClick={() => onUploadMedia('aboutPortrait')}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[#080B09]/90 px-3 py-1.5 text-xs font-medium text-[#C9A66B] shadow-lg backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0B5A4D] hover:text-white"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Bild ändern</span>
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => onUploadMedia('aboutPortrait')}
                  className="flex aspect-[3/4] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#C9A66B]/50 bg-gradient-to-b from-[#063F35]/30 to-[#080B09] p-6 text-center transition-all hover:bg-[#063F35]/40"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A66B] bg-[#0B5A4D]/40 text-[#C9A66B] shadow-[0_0_15px_rgba(201,166,107,0.25)]">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="font-sans text-xs font-bold tracking-widest text-[#F5F1E8] uppercase">
                    {tAbout.portraitPlaceholder}
                  </p>
                  <p className="mt-2 text-[11px] leading-snug text-[#B9C4BD]">
                    Authentisches Foto von Natalia mit französischer Bulldogge
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-[#C9A66B]/50 bg-[#0B5A4D]/30 px-3 py-1 text-[11px] font-medium text-[#C9A66B]">
                    Hier klicken zum Hochladen
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: Authentic Bio Text & Interactive Accordion (Col-span 4 on LG) */}
          <div className="flex flex-col justify-between lg:col-span-4 lg:pr-2">
            <div>
              {/* Section Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B]" />
                <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
                  {tAbout.label}
                </span>
                {tAbout.taglineBadge && (
                  <span className="rounded-full border border-[#C9A66B]/40 bg-[#063F35]/40 px-2.5 py-0.5 font-sans text-[11px] font-medium tracking-wider text-[#F5F1E8]">
                    {tAbout.taglineBadge}
                  </span>
                )}
              </div>

              {/* Headline */}
              <h2 className="mt-3 font-serif text-2xl font-normal leading-snug tracking-tight text-[#F5F1E8] sm:text-3xl">
                {tAbout.headline}
              </h2>

              {/* Core Visible Bio Content */}
              <div className="mt-5 space-y-3.5 font-sans text-xs leading-relaxed text-[#B9C4BD] sm:text-sm">
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
                <div className="space-y-3.5 border-t border-[#C9A66B]/20 pt-4 font-sans text-xs leading-relaxed text-[#B9C4BD] sm:text-sm">
                  <p>{tAbout.accordionP1}</p>
                  <p>{tAbout.accordionP2}</p>
                  {tAbout.accordionP3 && <p>{tAbout.accordionP3}</p>}
                  {tAbout.accordionP4 && <p>{tAbout.accordionP4}</p>}
                  <div className="mt-4 rounded-lg border border-[#C9A66B]/20 bg-[#063F35]/20 p-3">
                    <p className="font-serif text-sm font-medium tracking-wide text-[#F5F1E8]">
                      {tAbout.accordionTagline1}
                    </p>
                    <p className="font-serif text-sm italic text-[#C9A66B]">
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
                className="group inline-flex items-center gap-2 rounded-full border border-[#148B78]/40 bg-[#063F35]/25 px-4 py-2 font-sans text-xs font-semibold tracking-wider text-[#148B78] shadow-sm transition-all duration-300 hover:border-[#C9A66B] hover:bg-[#063F35]/50 hover:text-[#C9A66B] focus:outline-none focus:ring-2 focus:ring-[#C9A66B]/50"
              >
                <span>
                  {isExpanded
                    ? (currentLang === 'de' ? 'Weniger anzeigen ↑' : tAbout.readLess)
                    : (currentLang === 'de' ? 'Mehr über mich lesen ↓' : tAbout.readMore)}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#C9A66B] transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 text-[#C9A66B]' : 'rotate-0 group-hover:translate-y-0.5'
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* COLUMN 3: MY JOURNEY (Interactive Timeline) (Col-span 2 on LG) */}
          <div className="relative lg:col-span-2 lg:border-l lg:border-[#C9A66B]/20 lg:pl-5">
            <div className="mb-4">
              <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
                {tJourney.label}
              </span>
              <p className="mt-0.5 text-[10px] text-[#B9C4BD]">
                {tJourney.subtitle}
              </p>
            </div>

            {/* The Connected Vertical Timeline */}
            <div className="relative pl-6 space-y-5">
              {/* Connecting Vertical Emerald Line */}
              <div className="absolute top-2 bottom-2 left-[11px] w-[1.5px] bg-gradient-to-b from-[#148B78] via-[#0B5A4D] to-[#C9A66B]" />

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
                      className={`absolute -left-6 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border bg-[#080B09] transition-all duration-300 ${
                        isFinal
                          ? 'border-[#C9A66B] shadow-[0_0_10px_rgba(201,166,107,0.4)] group-hover:bg-[#C9A66B]/20'
                          : 'border-[#0B5A4D] group-hover:border-[#148B78] group-hover:bg-[#063F35]'
                      }`}
                    >
                      {getStationIcon(st.id)}
                    </div>

                    {/* Milestone Title */}
                    <span
                      className={`font-sans text-xs font-bold tracking-wider uppercase transition-colors ${
                        isFinal
                          ? 'text-[#C9A66B] group-hover:text-white'
                          : 'text-[#F5F1E8] group-hover:text-[#C9A66B]'
                      }`}
                    >
                      {st.title}
                    </span>

                    {/* Degree / Role description */}
                    <span className="text-[11px] text-[#B9C4BD] transition-colors group-hover:text-[#F5F1E8]">
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
            <div className="mt-8 pt-4 border-t border-[#C9A66B]/15">
              <p className="font-['Caveat',cursive] text-base leading-snug text-[#C9A66B]/90">
                My background is interdisciplinary –
                <span className="block">and that is what I bring into Product Management.</span>
                <span className="block mt-1 text-lg text-center">♡</span>
              </p>
            </div>
          </div>

          {/* COLUMN 4: MY SKILLS & CONTACT (Col-span 2 on LG) */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-2 lg:border-l lg:border-[#C9A66B]/20 lg:pl-5">
            
            {/* MY SKILLS Preview */}
            <div>
              <div className="mb-4">
                <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
                  {tSkills.title}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="group flex w-full items-center gap-2.5 text-left transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#0B5A4D] bg-[#063F35]/30 text-[#148B78] group-hover:border-[#C9A66B] group-hover:text-[#C9A66B]">
                    <BookOpen className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans text-xs font-medium text-[#F5F1E8] group-hover:text-[#C9A66B]">
                    Product Management
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="group flex w-full items-center gap-2.5 text-left transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#0B5A4D] bg-[#063F35]/30 text-[#148B78] group-hover:border-[#C9A66B] group-hover:text-[#C9A66B]">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans text-xs font-medium text-[#F5F1E8] group-hover:text-[#C9A66B]">
                    User Experience & Research
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="group flex w-full items-center gap-2.5 text-left transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#0B5A4D] bg-[#063F35]/30 text-[#148B78] group-hover:border-[#C9A66B] group-hover:text-[#C9A66B]">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans text-xs font-medium text-[#F5F1E8] group-hover:text-[#C9A66B]">
                    Agile & Scrum
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="group flex w-full items-center gap-2.5 text-left transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#0B5A4D] bg-[#063F35]/30 text-[#148B78] group-hover:border-[#C9A66B] group-hover:text-[#C9A66B]">
                    <Cpu className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-sans text-xs font-medium text-[#F5F1E8] group-hover:text-[#C9A66B]">
                    AI & Digital Innovation
                  </span>
                </button>
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={onExploreSkillsClick}
                  className="text-[11px] font-semibold text-[#148B78] hover:text-[#C9A66B] uppercase tracking-wider"
                >
                  Alle Skills ansehen →
                </button>
              </div>
            </div>

            {/* CONTACT Preview */}
            <div className="border-t border-[#C9A66B]/20 pt-5">
              <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
                {tContact.label}
              </span>

              <div className="mt-3 space-y-2.5">
                <a
                  href={`mailto:${tContact.emailAddress}`}
                  className="group flex items-center gap-2.5 text-xs text-[#F5F1E8] hover:text-[#C9A66B]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C9A66B]/40 bg-[#0B5A4D]/20 text-[#C9A66B] group-hover:bg-[#0B5A4D] group-hover:text-white">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <span className="truncate">{tContact.emailAddress}</span>
                </a>

                <a
                  href={mediaAssets.linkedinUrl || 'https://www.linkedin.com/in/natalia-stachowiak-pm'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-xs text-[#F5F1E8] hover:text-[#C9A66B]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C9A66B]/40 bg-[#0B5A4D]/20 text-[#C9A66B] group-hover:bg-[#0B5A4D] group-hover:text-white">
                    <Linkedin className="h-3.5 w-3.5" />
                  </div>
                  <span>{tContact.linkedin}</span>
                </a>
              </div>

              {/* Handwritten "Let's connect ↗" script accent matching the screenshot */}
              <div className="mt-5 text-right font-['Caveat',cursive] text-2xl font-semibold text-[#C9A66B] rotate-[-5deg]">
                {tContact.scriptConnect}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
