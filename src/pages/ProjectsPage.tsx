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

type ProjectFilter = 'all' | 'prototype' | 'concept';

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
  const getProjectStage = (id: string): { type: 'prototype' | 'concept'; label: { de: string; en: string; pl: string }; color: string } => {
    switch (id) {
      case 'environix':
        return {
          type: 'prototype',
          label: {
            de: 'Interaktive Demo · Konzept',
            en: 'Interactive Demo · Concept',
            pl: 'Interaktywne demo · Koncepcja',
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
                ? 'Branchenübergreifende Fallstudien aus Product Discovery, UX und KI. Konzept, Demonstrator und validierte Erkenntnisse werden ausdrücklich unterschieden.'
                : currentLang === 'pl'
                ? 'Studia przypadków z różnych branż: Product Discovery, UX i AI. Koncepcje, demonstratory i potwierdzone wyniki są wyraźnie rozróżnione.'
                : 'Cross-industry case studies spanning product discovery, UX and AI. Concepts, demonstrators and validated findings are clearly distinguished.'}
            </p>
          </div>
        </div>

        {/* FEATURED CASE STUDY: ResourceLoop AI – Circular Renovation */}
        <section id="resourceloop" className="scroll-mt-24 relative z-10 rounded-2xl border border-[#C7A35A]/50 bg-gradient-to-b from-[#0F5C46]/20 via-[#101412] to-[#080A09] p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#D6B15E] bg-[#D6B15E]/10 px-3 py-1 text-[10px] font-bold text-[#D6B15E] uppercase tracking-wider">Featured Case Study</span>
                <span className="rounded-full border border-[#0F5C46] bg-[#080A09] px-3 py-1 text-[10px] font-medium text-[#10B981] uppercase tracking-wider">
                  {currentLang === 'de' ? 'IHK-Projekt · Konzept & Demonstrator' : currentLang === 'pl' ? 'Projekt IHK · koncepcja i demonstrator' : 'IHK Project · Concept & Demonstrator'}
                </span>
              </div>
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">ResourceLoop AI</h2>
                <p className="mt-1 text-sm sm:text-base font-medium text-[#D6B15E]">
                  {currentLang === 'de' ? 'Scan-to-Decision für zirkuläre Gebäudesanierung' : currentLang === 'pl' ? 'Scan-to-Decision dla cyrkularnej renowacji budynków' : 'Scan-to-Decision for Circular Building Renovation'}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[#D1D5DB]">
                {currentLang === 'de'
                  ? 'Problem: Ob ein bestehendes Bauteil erhalten, repariert, wiederverwendet, aufgearbeitet oder recycelt werden sollte, ist bei unvollständigen Material-, Zustands- und Umweltdaten schwer nachvollziehbar.'
                  : currentLang === 'pl'
                  ? 'Problem: Bez pełnych danych o materiale, stanie i wpływie na środowisko trudno uzasadnić decyzję o zachowaniu, naprawie, ponownym wykorzystaniu, odnowieniu lub recyklingu elementu budynku.'
                  : 'Problem: Decisions to retain, repair, reuse, refurbish or recycle an existing building component are difficult to justify when material, condition and environmental evidence is incomplete.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09]/70 p-4">
                  <span className="font-mono text-[10px] text-[#10B981] font-bold uppercase">01 · Discovery</span>
                  <h3 className="mt-1 text-sm font-medium text-[#F4F1EA]">{currentLang === 'de' ? 'Problem verstehen' : currentLang === 'pl' ? 'Zrozumieć problem' : 'Understand the problem'}</h3>
                  <p className="mt-1 text-xs text-[#A9AEA9]">{currentLang === 'de' ? 'Stakeholdergespräche, Pain Points und offene Annahmen dokumentieren.' : currentLang === 'pl' ? 'Rozmowy z interesariuszami, problemy i otwarte założenia.' : 'Stakeholder conversations, pain points and explicit open assumptions.'}</p>
                </div>
                <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09]/70 p-4">
                  <span className="font-mono text-[10px] text-[#10B981] font-bold uppercase">02 · MVP</span>
                  <h3 className="mt-1 text-sm font-medium text-[#F4F1EA]">{currentLang === 'de' ? 'Fassadenelement als Beispiel' : currentLang === 'pl' ? 'Przykład: element elewacji' : 'Façade component use case'}</h3>
                  <p className="mt-1 text-xs text-[#A9AEA9]">{currentLang === 'de' ? 'Aluminium-Bauteil, Evidenzerfassung und transparenter Szenarienvergleich.' : currentLang === 'pl' ? 'Element aluminiowy, zbieranie dowodów i porównanie scenariuszy.' : 'Aluminium component, evidence capture and transparent scenario comparison.'}</p>
                </div>
                <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09]/70 p-4">
                  <span className="font-mono text-[10px] text-[#D6B15E] font-bold uppercase">03 · Decision</span>
                  <h3 className="mt-1 text-sm font-medium text-[#F4F1EA]">{currentLang === 'de' ? 'Entscheidung statt KI-Behauptung' : currentLang === 'pl' ? 'Decyzje oparte na dowodach' : 'Evidence-based decisions'}</h3>
                  <p className="mt-1 text-xs text-[#A9AEA9]">{currentLang === 'de' ? 'Technische, ökologische und wirtschaftliche Kriterien; Datenlücken sichtbar.' : currentLang === 'pl' ? 'Kryteria techniczne, środowiskowe i ekonomiczne oraz luki w danych.' : 'Technical, environmental and economic criteria, with data gaps visible.'}</p>
                </div>
              </div>
              <div className="rounded-xl border border-[#C7A35A]/30 bg-[#080A09]/85 p-4">
                <p className="text-xs leading-relaxed text-[#D1D5DB]">
                  <strong className="text-[#D6B15E]">{currentLang === 'de' ? 'Verlässlichkeit des Scanners: ' : currentLang === 'pl' ? 'Wiarygodność skanera: ' : 'Scanner reliability: '}</strong>
                  {currentLang === 'de'
                    ? 'Fotos können sichtbare Merkmale dokumentieren und Rückfragen auslösen. Materialzusammensetzung, verdeckte Schäden, Schadstoffe, Einbaujahr, Tragfähigkeit und Restlebensdauer gelten ohne zusätzliche Belege ausdrücklich als unbekannt.'
                    : currentLang === 'pl'
                    ? 'Zdjęcia dokumentują widoczne cechy i pytania uzupełniające. Skład materiału, ukryte uszkodzenia, substancje szkodliwe, wiek, nośność i żywotność wymagają dodatkowych dowodów.'
                    : 'Photos can capture visible features and trigger follow-up questions. Composition, hidden defects, hazardous materials, age, structural safety and remaining life require independent evidence.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://scan-to-sure-decision.lovable.app/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center rounded-full bg-[#0F5C46] px-5 py-2.5 text-xs font-semibold text-[#F4F1EA] hover:bg-[#148B78]">
                  {currentLang === 'de' ? 'Scanner-Demo öffnen ↗' : currentLang === 'pl' ? 'Otwórz demonstrator ↗' : 'Open scanner demo ↗'}
                </a>
                <button type="button" onClick={() => setResourceLoopExpanded(!resourceLoopExpanded)} className="min-h-[44px] rounded-full border border-[#C7A35A]/50 px-5 py-2.5 text-xs font-semibold text-[#D6B15E] hover:border-[#D6B15E]">
                  {currentLang === 'de' ? (resourceLoopExpanded ? 'Methodik schließen' : 'Methodik & Scope ansehen') : currentLang === 'pl' ? (resourceLoopExpanded ? 'Zamknij metodę' : 'Metoda i zakres') : (resourceLoopExpanded ? 'Close methodology' : 'Methodology & scope')}
                </button>
              </div>
              {resourceLoopExpanded && (
                <div className="rounded-xl border border-[#0F5C46]/35 bg-[#0C120F] p-4 space-y-3 text-xs leading-relaxed text-[#D1D5DB]">
                  <p><strong className="text-[#D6B15E]">Problem Discovery:</strong> {currentLang === 'de' ? 'Stakeholdergespräche und Problemhypothesen; Erkenntnisse und offene Annahmen getrennt dokumentieren.' : currentLang === 'pl' ? 'Rozmowy z interesariuszami i hipotezy; oddzielenie wniosków od założeń.' : 'Stakeholder conversations and problem hypotheses; findings are separated from assumptions.'}</p>
                  <p><strong className="text-[#D6B15E]">Solution Discovery:</strong> {currentLang === 'de' ? 'Optionen KEEP, REPAIR/REUSE, REFURBISH, REMANUFACTURE und RECYCLE vergleichen.' : currentLang === 'pl' ? 'Porównanie KEEP, REPAIR/REUSE, REFURBISH, REMANUFACTURE i RECYCLE.' : 'Compare KEEP, REPAIR/REUSE, REFURBISH, REMANUFACTURE and RECYCLE.'}</p>
                  <p><strong className="text-[#D6B15E]">Status:</strong> {currentLang === 'de' ? 'Konzept und interaktiver Demonstrator. Keine produktive Diagnostik und keine nachgewiesenen CO₂-Einsparungen; Validierung läuft.' : currentLang === 'pl' ? 'Koncepcja i interaktywny demonstrator; bez zweryfikowanych oszczędności CO₂. Walidacja trwa.' : 'Concept and interactive demonstrator, not production diagnostics; no verified CO₂ savings are claimed. Validation remains ongoing.'}</p>
                </div>
              )}
            </div>
            <div className="lg:col-span-4 space-y-4">
              <button type="button" onClick={() => setSelectedModalImage({ src: mediaAssets.resourceLoopImage || PROJECT_RESOURCELOOP_IMAGE, title: 'ResourceLoop AI · Concept' })} className="w-full overflow-hidden rounded-xl border border-[#C7A35A]/40 bg-[#080A09] text-left">
                <img src={mediaAssets.resourceLoopImage || PROJECT_RESOURCELOOP_IMAGE} alt="ResourceLoop AI – Konzeptgrafik" loading="lazy" className="aspect-[16/11] w-full object-cover" />
                <span className="block px-3 py-2 text-xs text-[#D6B15E]">{currentLang === 'de' ? 'Konzeptgrafik vergrößern' : currentLang === 'pl' ? 'Powiększ grafikę' : 'Enlarge concept image'}</span>
              </button>
              <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09]/80 p-4 text-xs leading-relaxed text-[#D1D5DB]">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#D6B15E]">Product scope</span>
                <p className="mt-2">{currentLang === 'de' ? 'Bau & Sanierung · Aluminium-Fassadenelement · KI-gestützte Entscheidungsunterstützung' : currentLang === 'pl' ? 'Budownictwo i renowacja · element aluminiowy · wspomaganie decyzji AI' : 'Building renovation · aluminium façade component · AI-assisted decision support'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FILTER BAR: Distinguish demonstrated prototypes from concepts; no production deployments claimed */}
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
