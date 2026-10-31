import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Compass, Info, CheckCircle2, Eye, X } from 'lucide-react';
import { Language, MediaAssets, ProjectData } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { getProjectPath } from '../utils/projectRoutes';
import { getLockedAsset, PROJECT_CIRCULAR_AI_IMAGE, PROJECT_RESOURCELOOP_IMAGE } from '../data/assetRegistry';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';

interface ProjectsPageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onUploadMedia?: (key: string) => void;
  onEditProjectLink?: (project: ProjectData) => void;
  isReadOnly?: boolean;
}

type ProjectFilter = 'all' | 'implemented' | 'prototype' | 'concept';

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  currentLang,
  mediaAssets,
  isReadOnly = false,
}) => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('all');
  const [resourceLoopExpanded, setResourceLoopExpanded] = useState<boolean>(false);
  const [selectedModalImage, setSelectedModalImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    if (window.location.hash === '#resourceloop') {
      const el = document.getElementById('resourceloop');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120);
      }
    }
  }, []);

  // Selected work projects (excluding personal book which has dedicated /book route)
  const caseStudies = PROJECTS.filter((p) => p.id !== 'du-bist-nicht-zu-viel');

  // Classification helper to clearly distinguish concept work, prototypes, and implemented solutions
  const getProjectStage = (id: string): { type: 'implemented' | 'prototype' | 'concept'; label: { de: string; en: string; pl: string }; color: string } => {
    switch (id) {
      case 'environix':
        return {
          type: 'implemented',
          label: {
            de: 'Implementierte Lösung · Live-App',
            en: 'Implemented Solution · Live App',
            pl: 'Wdrożone rozwiązanie · Aplikacja live',
          },
          color: 'text-[#10B981] border-[#10B981]/40 bg-[#063F35]/30',
        };
      case 'ai-building-concept':
      case 'gain':
        return {
          type: 'prototype',
          label: {
            de: 'Interaktiver Prototyp',
            en: 'Interactive Prototype',
            pl: 'Interaktywny prototyp',
          },
          color: 'text-[#D6B15E] border-[#D6B15E]/40 bg-[#141A16]',
        };
      default:
        return {
          type: 'concept',
          label: {
            de: 'Konzeptstudie & Spezifikation',
            en: 'Concept Study & Spec',
            pl: 'Studium koncepcyjne i specyfikacja',
          },
          color: 'text-[#C7A35A] border-[#C7A35A]/35 bg-[#101412]',
        };
    }
  };

  const filteredProjects = caseStudies.filter((p) => {
    if (selectedFilter === 'all') return true;
    const stage = getProjectStage(p.id);
    return stage.type === selectedFilter;
  });

  return (
    <PageTransition>
      <div className="relative w-full flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12 space-y-10 sm:space-y-12">
        {/* Subtle Ambient Background Accent */}
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-[#0F5C46]/15 blur-[160px]" />

        {/* Top Back to Portfolio */}
        <div className="relative z-10 mb-2 sm:mb-4">
          <BackToPortfolio currentLang={currentLang} />
        </div>

        {/* Section Header */}
        <div className="relative z-10 border-b border-[#C7A35A]/15 pb-6">
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

        {/* ============================================================ */}
        {/* PROMINENT FEATURED CASE STUDY: ResourceLoop AI               */}
        {/* Strictly using ONLY verified project data already in project */}
        {/* ============================================================ */}
        <section id="resourceloop" className="scroll-mt-24 relative z-10 rounded-2xl border border-[#C7A35A]/50 bg-gradient-to-b from-[#0F5C46]/20 via-[#101412] to-[#080A09] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.7)] transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D6B15E] bg-[#D6B15E]/15 px-3 py-1 font-mono text-[10px] font-bold text-[#D6B15E] uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 text-[#D6B15E]" />
                  FEATURED CASE STUDY
                </span>
                <span className="rounded-full border border-[#0F5C46] bg-[#080A09] px-3 py-1 font-mono text-[10px] font-medium text-[#10B981] uppercase tracking-wider">
                  {currentLang === 'de' ? 'Konzeptstudie & Systemarchitektur' : currentLang === 'pl' ? 'Studium koncepcyjne i architektura' : 'Concept Study & System Architecture'}
                </span>
                <span className="rounded-full border border-[#C7A35A]/30 bg-[#080A09] px-3 py-1 font-mono text-[10px] font-medium text-[#A9AEA9] uppercase tracking-wider">
                  AI · Circular Economy · Chemistry
                </span>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F4F1EA] tracking-tight">
                  ResourceLoop AI
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#D6B15E] font-medium mt-1">
                  {currentLang === 'de'
                    ? 'Geschlossene Stoffkreisläufe & industrielle Ressourcen-Intelligenz'
                    : currentLang === 'pl'
                    ? 'Zamknięte obiegi materiałowe i inteligencja zasobów przemysłowych'
                    : 'Closed-Loop Industrial Resource Intelligence & Circular Decision Support'}
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                {currentLang === 'de'
                  ? 'ResourceLoop AI verbindet naturwissenschaftliche Stoffstromanalysen (M.Sc. Chemie) und betriebliche Umweltstandards (Umweltschutzstudium & ISO 14001) mit modernen digitalen Produktmanagement-Methoden: Wie können industrielle Nebenströme und Materialverluste systematisch erfasst, bewertet und in zirkuläre Kaskaden rückgeführt werden?'
                  : currentLang === 'pl'
                  ? 'ResourceLoop AI łączy naukową analizę przepływu materiałów (mgr chemii) i standardy środowiskowe (ochrona środowiska, ISO 14001) z metodyką Product Managementu: jak systematycznie identyfikować odpady przemysłowe i przekształcać je w wartościowe surowce cyrkularne?'
                  : 'ResourceLoop AI bridges scientific material flow analysis (M.Sc. Chemistry) and environmental compliance standards (Environmental Protection, ISO 14001) with modern digital product management: systematically identifying industrial side-streams and redirecting them into closed-loop cascades.'}
              </p>

              {/* Verified Domain Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09]/70 p-3">
                  <span className="font-mono text-[10px] font-bold text-[#10B981] uppercase block">01 · Science</span>
                  <span className="text-xs text-[#F4F1EA] font-medium block mt-0.5">
                    {currentLang === 'de' ? 'Chemische Stoffstromanalyse' : currentLang === 'pl' ? 'Analiza chemiczna surowców' : 'Chemical Stream Analysis'}
                  </span>
                  <p className="text-[11px] text-[#A9AEA9] mt-1 leading-snug">
                    {currentLang === 'de' ? 'Fundiertes Verständnis von Reaktionen, Nebenprodukten und Reinheitsgraden.' : currentLang === 'pl' ? 'Zrozumienie reakcji, produktów ubocznych i czystości.' : 'Deep understanding of reactions, by-products, and purity thresholds.'}
                  </p>
                </div>
                <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09]/70 p-3">
                  <span className="font-mono text-[10px] font-bold text-[#10B981] uppercase block">02 · Environment</span>
                  <span className="text-xs text-[#F4F1EA] font-medium block mt-0.5">
                    {currentLang === 'de' ? 'LCA & ISO 14001 Compliance' : currentLang === 'pl' ? 'LCA i zgodność ISO 14001' : 'LCA & ISO 14001 Compliance'}
                  </span>
                  <p className="text-[11px] text-[#A9AEA9] mt-1 leading-snug">
                    {currentLang === 'de' ? 'Ökobilanzen, gesetzliche Berichterstattung und nachvollziehbarer Ressourcenschutz.' : currentLang === 'pl' ? 'Bilans ekologiczny, raportowanie i ochrona zasobów.' : 'Life-cycle assessments, regulatory reporting, and resource conservation.'}
                  </p>
                </div>
                <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09]/70 p-3">
                  <span className="font-mono text-[10px] font-bold text-[#D6B15E] uppercase block">03 · Product Mindset</span>
                  <span className="text-xs text-[#F4F1EA] font-medium block mt-0.5">
                    {currentLang === 'de' ? 'Decision Intelligence Schicht' : currentLang === 'pl' ? 'Warstwa inteligencji decyzyjnej' : 'Decision Intelligence Layer'}
                  </span>
                  <p className="text-[11px] text-[#A9AEA9] mt-1 leading-snug">
                    {currentLang === 'de' ? 'Von isolierten Datenpunkten zu umsetzbaren Empfehlungen für Betriebsleiter.' : currentLang === 'pl' ? 'Od surowych danych do konkretnych decyzji zarządczych.' : 'From raw measurements to transparent, verifiable operational decisions.'}
                  </p>
                </div>
              </div>

              {/* Strictly Verified Data & Clear Placeholder Notice */}
              <div className="rounded-xl border border-[#C7A35A]/30 bg-[#080A09]/90 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#D6B15E] shrink-0" />
                  <span className="font-mono text-[11px] font-bold tracking-wider text-[#D6B15E] uppercase">
                    {currentLang === 'de' ? 'Transparenzhinweis & Status' : currentLang === 'pl' ? 'Nota transparentności i status' : 'Transparency Notice & Status'}
                  </span>
                </div>
                <p className="text-xs text-[#D1D5DB] leading-relaxed">
                  {currentLang === 'de' ? (
                    <>
                      <strong className="text-[#F4F1EA]">Status:</strong> Konzeptionelle Systemarchitektur & Prozessentwurf auf Basis verifizierter akademischer und beruflicher Qualifikationen (M.Sc. Chemie, Umweltschutz, IHK Digital Transformation).
                    </>
                  ) : currentLang === 'pl' ? (
                    <>
                      <strong className="text-[#F4F1EA]">Status:</strong> Architektura koncepcyjna i projekt procesów oparty na zweryfikowanych kwalifikacjach akademickich i zawodowych (mgr chemii, ochrona środowiska, IHK).
                    </>
                  ) : (
                    <>
                      <strong className="text-[#F4F1EA]">Status:</strong> Conceptual systems architecture and workflow design grounded in verified academic and domain qualifications (M.Sc. Chemistry, Environmental Protection, IHK).
                    </>
                  )}
                </p>
                <div className="p-2.5 rounded-lg border border-[#0F5C46]/35 bg-[#0C120F] text-[11px] font-mono text-[#A9AEA9]">
                  {currentLang === 'de'
                    ? '[Verifizierte Felddaten, Laborreihen & Nutzerinterviews: In Vorbereitung / Dokumentation im Rahmen der nächsten Entwicklungsphase]'
                    : currentLang === 'pl'
                    ? '[Zweryfikowane dane terenowe, próby laboratoryjne i wywiady: W przygotowaniu / dokumentacja w kolejnej fazie rozwojowej]'
                    : '[Verified field validation, empirical test series & user interviews: Pending / In preparation as part of the next development phase]'}
                </div>
              </div>

              {/* Expand Details Trigger */}
              <div>
                <button
                  type="button"
                  onClick={() => setResourceLoopExpanded(!resourceLoopExpanded)}
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#D6B15E] hover:text-[#F4F1EA] transition-colors uppercase"
                >
                  <span>
                    {resourceLoopExpanded
                      ? (currentLang === 'de' ? 'Systemdetails schließen ↑' : currentLang === 'pl' ? 'Zwiń szczegóły systemu ↑' : 'Collapse system details ↑')
                      : (currentLang === 'de' ? 'Systemarchitektur & 4-Stufen-Workflow ansehen ↓' : currentLang === 'pl' ? 'Zobacz architekturę systemu i 4 etapy ↓' : 'View system architecture & 4-stage workflow ↓')}
                  </span>
                </button>

                {resourceLoopExpanded && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#0F5C46]/30 text-xs text-[#D1D5DB] animate-fadeIn">
                    <div className="p-3 rounded-lg border border-[#0F5C46]/30 bg-[#0C120F] space-y-1">
                      <span className="font-mono text-[10px] text-[#10B981] font-bold uppercase">Stufe 1 · Erfassung</span>
                      <p className="text-[11px] text-[#A9AEA9]">
                        Strukturierte Erfassung von Rohstoffen, Frischwasser, chemischen Einsatzstoffen und Prozess-Emissionen ohne manuelle Medienbrüche.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border border-[#0F5C46]/30 bg-[#0C120F] space-y-1">
                      <span className="font-mono text-[10px] text-[#10B981] font-bold uppercase">Stufe 2 · KI-Kaskadenanalyse</span>
                      <p className="text-[11px] text-[#A9AEA9]">
                        Algorithmische Identifikation von Kaskadennutzungen: Welche Nebenströme können als Sekundärrohstoff in nachgelagerten Prozessen wiederverwendet werden?
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border border-[#0F5C46]/30 bg-[#0C120F] space-y-1">
                      <span className="font-mono text-[10px] text-[#D6B15E] font-bold uppercase">Stufe 3 · Decision Compass</span>
                      <p className="text-[11px] text-[#A9AEA9]">
                        Abwägung von Wirtschaftlichkeit, CO₂-Einsparung und technischer Machbarkeit vor operativen Beschlüssen im Werk.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border border-[#0F5C46]/30 bg-[#0C120F] space-y-1">
                      <span className="font-mono text-[10px] text-[#D6B15E] font-bold uppercase">Stufe 4 · ESG & CSRD Audit-Export</span>
                      <p className="text-[11px] text-[#A9AEA9]">
                        Automatisierte Generierung prüffähiger Nachweise für ISO 14001 Audits und europäische Nachhaltigkeitsberichte.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Meta Column */}
            <div className="lg:col-span-4 space-y-4">
              <div
                onClick={() => setSelectedModalImage({
                  src: mediaAssets.resourceLoopImage || PROJECT_RESOURCELOOP_IMAGE,
                  title: 'ResourceLoop AI — Closed-Loop Material & Industrial Resource Intelligence'
                })}
                className="group/img cursor-pointer relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-[#C7A35A]/40 bg-[#080A09] shadow-lg transition-all hover:border-[#D6B15E]"
                title={currentLang === 'de' ? 'Infografik im Vollbild ansehen' : currentLang === 'pl' ? 'Powiększ infografikę' : 'Click to view full infographic'}
              >
                <img
                  src={mediaAssets.resourceLoopImage || PROJECT_RESOURCELOOP_IMAGE}
                  alt="ResourceLoop AI Concept Architecture"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-center sm:text-left flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#D6B15E] uppercase tracking-wider block">
                      Product Architecture Diagram
                    </span>
                    <span className="text-xs font-serif text-[#F4F1EA]">
                      ResourceLoop AI · Closed Loop
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded bg-[#080A09]/85 px-2 py-1 text-[10px] font-mono text-[#C7A35A] border border-[#C7A35A]/30 backdrop-blur-sm">
                    <Eye className="h-3 w-3" />
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09]/80 p-3.5 space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-[#A9AEA9] uppercase tracking-wider block">
                  {currentLang === 'de' ? 'FACHLICHE ZUORDNUNG' : currentLang === 'pl' ? 'KLASYFIKACJA' : 'PROJECT TAXONOMY'}
                </span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-[#A9AEA9]">
                    <span>Kategorie:</span>
                    <span className="text-[#F4F1EA] font-medium">B2B Circular Intelligence</span>
                  </div>
                  <div className="flex justify-between text-[#A9AEA9]">
                    <span>Reifegrad:</span>
                    <span className="text-[#D6B15E] font-medium">Konzeptstudie & Systemdesign</span>
                  </div>
                  <div className="flex justify-between text-[#A9AEA9]">
                    <span>Methodik:</span>
                    <span className="text-[#10B981] font-medium">LCA · JTBD · AI Decision Logic</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* FILTER BAR: Clearly distinguish Implemented / Prototypes / Concepts */}
        {/* ============================================================ */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#C7A35A]/15">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#A9AEA9] uppercase tracking-wider hidden sm:inline">
              {currentLang === 'de' ? 'Filter nach Reifegrad:' : currentLang === 'pl' ? 'Filtruj wg statusu:' : 'Filter by maturity:'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#0F5C46] text-[#F4F1EA] border border-[#C7A35A]/60 shadow-sm'
                  : 'bg-[#101412] text-[#A9AEA9] border border-[#0F5C46]/30 hover:text-[#F4F1EA]'
              }`}
            >
              {currentLang === 'de' ? 'Alle Projekte' : currentLang === 'pl' ? 'Wszystkie projekty' : 'All Projects'} ({caseStudies.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('implemented')}
              className={`rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all ${
                selectedFilter === 'implemented'
                  ? 'bg-[#0F5C46] text-[#F4F1EA] border border-[#10B981] shadow-sm'
                  : 'bg-[#101412] text-[#A9AEA9] border border-[#0F5C46]/30 hover:text-[#10B981]'
              }`}
            >
              ● {currentLang === 'de' ? 'Implementierte Lösungen' : currentLang === 'pl' ? 'Wdrożone rozwiązania' : 'Implemented Solutions'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('prototype')}
              className={`rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all ${
                selectedFilter === 'prototype'
                  ? 'bg-[#0F5C46] text-[#F4F1EA] border border-[#D6B15E] shadow-sm'
                  : 'bg-[#101412] text-[#A9AEA9] border border-[#0F5C46]/30 hover:text-[#D6B15E]'
              }`}
            >
              ● {currentLang === 'de' ? 'Interaktive Prototypen' : currentLang === 'pl' ? 'Prototypy interaktywne' : 'Interactive Prototypes'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('concept')}
              className={`rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all ${
                selectedFilter === 'concept'
                  ? 'bg-[#0F5C46] text-[#F4F1EA] border border-[#C7A35A] shadow-sm'
                  : 'bg-[#101412] text-[#A9AEA9] border border-[#0F5C46]/30 hover:text-[#C7A35A]'
              }`}
            >
              ● {currentLang === 'de' ? 'Konzeptstudien' : currentLang === 'pl' ? 'Koncepcje i specyfikacje' : 'Concept Studies'}
            </button>
          </div>
        </div>

        {/* Projects Grid: 2-3 per row on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((p) => {
            const fallbackImg = getLockedAsset(p.mediaKey);
            const imgSrc = mediaAssets[p.mediaKey as keyof MediaAssets] || fallbackImg;
            const stage = getProjectStage(p.id);

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
                    {/* Project Maturity Badge */}
                    <div className={`absolute top-2.5 right-2.5 rounded px-2 py-0.5 text-[9px] font-mono font-semibold backdrop-blur-sm border uppercase tracking-wider ${stage.color}`}>
                      {stage.label[currentLang]}
                    </div>
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

        {/* High-Resolution Diagram Modal */}
        {selectedModalImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedModalImage(null)}
          >
            <div
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center bg-[#080A09] rounded-2xl border border-[#C7A35A]/50 p-3 sm:p-5 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between pb-3 border-b border-[#C7A35A]/20 px-2">
                <span className="font-serif text-sm sm:text-base text-[#F4F1EA] truncate">
                  {selectedModalImage.title}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedModalImage(null)}
                  className="rounded-full p-1.5 text-[#A9AEA9] hover:text-[#F4F1EA] hover:bg-[#141A16] transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative w-full overflow-auto max-h-[82vh] flex items-center justify-center p-2">
                <img
                  src={selectedModalImage.src}
                  alt={selectedModalImage.title}
                  className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
