import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  X,
  Info,
  Sparkles,
  ShieldCheck,
  Brain,
  Scale,
  Target,
  BarChart3,
  Layers,
} from 'lucide-react';
import { Language, MediaAssets } from '../types';
import {
  LOCKED_ASSETS,
  PROJECT_CIRCULAR_AI_IMAGE,
  CIRCULARTWIN_FUNKTIONEN,
  CIRCULARTWIN_IMPACT,
} from '../data/assetRegistry';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { CaseStudyBottomNav } from '../components/CaseStudyBottomNav';

interface CircularTwinCaseStudyPageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
}

export const CircularTwinCaseStudyPage: React.FC<CircularTwinCaseStudyPageProps> = ({
  currentLang,
  mediaAssets,
}) => {
  const [activeImageModal, setActiveImageModal] = useState<{ src: string; title: string } | null>(null);

  // EXACTLY 3 OFFICIAL CIRCULARTWIN AI VISUALS (Respect user assigned media with canonical fallback):
  // 01 — VISION: From Product Passport to Product Intelligence
  const image1VisionSrc = mediaAssets.circularTwinVision || mediaAssets.circularTwinCover || mediaAssets.circularTwinImage || PROJECT_CIRCULAR_AI_IMAGE;

  // 02 — PRODUCT ARCHITECTURE: Eight Connected Intelligence Modules
  const image2ArchitectureSrc = mediaAssets.circularTwinFunktionen || CIRCULARTWIN_FUNKTIONEN;

  // 03 — IMPACT: From Product Data to Circular Decisions across Building Lifecycle
  const image3ImpactSrc = mediaAssets.circularTwinImpact || mediaAssets.circularTwinExperience || CIRCULARTWIN_IMPACT;

  const content = {
    de: {
      backLink: 'Zurück zu allen Projekten',
      caseStudyBadge: 'PRODUKT-CASE-STUDY · 2026',
      heroTitle: 'CircularTwin AI',
      heroSubline: 'From Product Passport to Product Intelligence.',
      heroSublineDe: 'Von Produktdaten zu zirkulären Entscheidungen.',
      heroSubtitle: 'Heute verstehen. Morgen simulieren. Entscheiden für eine zirkuläre Zukunft.',
      tags: ['KI & Product Intelligence', 'Kreislaufwirtschaft', 'Digitale Transformation', 'Entscheidungsunterstützung'],
      disclaimer: {
        title: 'Transparenzhinweis & Kontext',
        p1: 'Konzeptstudie entwickelt im Rahmen meines Projekts zum Digital Transformation Manager (IHK).',
        p2: 'Schüco International KG dient als konzeptioneller Referenzfall auf Basis öffentlich zugänglicher Informationen. Kein offizielles Schüco-Produkt. Alle Prototyp-, Kosten-, CO₂e- und Prozesswerte sind fiktive Demonstrationsdaten.',
      },
      image1: {
        captionTitle: 'Vision — From Product Passport to Product Intelligence',
        captionSub: 'Die Transformation von statischen Produktpässen zu vernetzter Produkt-Intelligenz.',
        modalTitle: 'CircularTwin AI — Vision',
        expand: 'Visual vergrößern',
      },
      challenge: {
        tag: '01 · DIE HERAUSFORDERUNG',
        headingPart1: 'Digitale Daten existieren bereits.',
        headingPart2: 'Entscheidungs-Intelligenz fehlt noch.',
        p1: 'Produkt-, Material-, Umwelt- und Compliance-Informationen liegen heute verteilt in getrennten Systemen, statischen PDFs und Abteilungssilos vor. Doch digitale Daten allein führen nicht automatisch zu einer transparenten zirkulären Entscheidung.',
        prompt: 'Komplexe Abwägungen wie:',
        options: ['REPAIR', 'REFURBISH', 'REUSE', 'RECYCLE', 'REPLACE'],
        p2: 'erfordern die gleichzeitige Betrachtung technischer Machbarkeit, ökologischer CO₂e-Wirkung, regulatorischer Auflagen und wirtschaftlicher Lebenszykluskosten in einem gemeinsamen Entscheidungsraum.',
      },
      hypothesis: {
        tag: '02 · DIE PRODUKTHYPOTHESE',
        quote: '„Wenn Produkt-, Material-, Umwelt- und Compliance-Daten in einer Product-Intelligence-Plattform zusammengeführt und durch regelbasierte Validierung sowie KI-Analysen gestützt werden, lassen sich zirkuläre Entscheidungen effizienter, transparenter und fundierter vorbereiten.“',
        steps: ['DATEN', 'KONTEXT', 'INTELLIGENZ', 'ENTSCHEIDUNG'],
      },
      image2: {
        tag: '03 · PRODUKTARCHITEKTUR',
        heading: 'Wie CircularTwin AI funktioniert',
        subtitle: 'Acht vernetzte Module bilden das Fundament der Product-Intelligence-Plattform.',
        captionTitle: 'Product Architecture — Eight connected intelligence modules',
        captionSub: '01 Product Twin · 02 Product DNA · 03 Data Trust Layer · 04 Material Intelligence · 05 Circular Decision Compass · 06 CircularTwin Copilot · 07 Decision Memory · 08 Material Bank',
        modalTitle: 'CircularTwin AI — Produktarchitektur',
        expand: 'Architektur vergrößern',
      },
      intelligence: {
        tag: '04 · ENTSCHEIDUNGSLOGIK & GOVERNANCE',
        heading: 'Verantwortungsvolle KI & Human-in-the-Loop',
        modules: [
          {
            num: '01',
            title: 'Data Trust Layer',
            desc: 'Regelbasierte Qualitätsfilter prüfen Datenvollständigkeit und Compliance-Integrität, bevor KI-Schlussfolgerungen greifen.',
          },
          {
            num: '02',
            title: 'Circular Decision Compass',
            desc: 'Multikriterieller Abgleich technischer Machbarkeit, CO₂e-Vermeidung, Restwert und Lebenszyklusverlängerung.',
          },
          {
            num: '03',
            title: 'Decision Memory & Learning',
            desc: 'Jede getroffene Entscheidung fließt in das organisationale Gedächtnis ein, um künftige Szenarien noch treffsicherer zu simulieren.',
          },
        ],
      },
      value: {
        tag: '05 · MEHRWERT',
        heading: 'Wirtschaftlicher & ökologischer Mehrwert',
        pillars: [
          {
            title: 'Ökologie & ESG',
            desc: 'Messbare Scope-3-Reduktion, nachweisbare Rezyklatquoten und transparente Rohstoffkreisläufe für fundierte Nachhaltigkeitsberichte.',
          },
          {
            title: 'Compliance & Sicherheit',
            desc: 'Frühzeitige Konformität mit EU-Ökodesign-Vorgaben, digitalem Produktpass (DPP) und Lieferkettengesetzen.',
          },
          {
            title: 'Wirtschaftlichkeit',
            desc: 'Optimierung von Restwerten, Reduktion von Entsorgungskosten und Etablierung zukunftsfähiger Materialbanken im Gebäudebestand.',
          },
        ],
      },
      image3: {
        tag: '06 · WIRKUNG IM LEBENSZYKLUS',
        heading: 'Zirkuläre Entscheidungen im gesamten Lebenszyklus',
        subtitle: 'Von Rohstoffen und Produktion über Nutzung und Rücknahme bis zur Wiederverwertung.',
        captionTitle: 'From product data to circular decisions across the building lifecycle',
        captionSub: 'Product Data → Intelligence → Circular Decisions → Business & Environmental Impact',
        modalTitle: 'CircularTwin AI — Wirkung im Lebenszyklus',
        expand: 'Wirkungs-Visual vergrößern',
      },
      learnings: {
        tag: '07 · PRODUCT MANAGEMENT LEARNINGS',
        quotePart1: '„Die wahre Chance liegt nicht im nächsten statischen Produktpass.',
        quotePart2: 'Sie liegt in der Intelligenzschicht, die Menschen hilft zu entscheiden, was als Nächstes geschehen soll.“',
        roleTitle: 'Meine Rolle & Vorgehensweise',
        roleText: 'End-to-End-Produktkonzeption: Problemvalidierung mit Fachexperten, Formulierung der Hypothesen, Strukturierung der Datenarchitektur, Erstellung von User Journeys und Gestaltung der MVP-Funktionsmatrix.',
      },
      nav: {
        prev: 'VORHERIGES PROJEKT',
        all: 'ALLE PROJEKTE',
        next: 'NÄCHSTES PROJEKT',
      },
      modal: {
        close: 'Schließen',
      },
    },
    en: {
      backLink: 'Back to all projects',
      caseStudyBadge: 'PRODUCT CASE STUDY · 2026',
      heroTitle: 'CircularTwin AI',
      heroSubline: 'From Product Passport to Product Intelligence.',
      heroSublineDe: 'From Product Data to Circular Decisions.',
      heroSubtitle: 'Understand today. Simulate tomorrow. Decide for a circular future.',
      tags: ['AI & Product Intelligence', 'Circular Economy', 'Digital Transformation', 'Decision Support'],
      disclaimer: {
        title: 'Transparency Notice & Context',
        p1: 'Conceptual study developed as part of my graduation project for Digital Transformation Manager (IHK).',
        p2: 'Schüco International KG serves as a conceptual reference benchmark based on publicly available information. Not an official Schüco product. All prototype, cost, CO₂e, and process values are fictional demonstration data.',
      },
      image1: {
        captionTitle: 'Vision — From Product Passport to Product Intelligence',
        captionSub: 'The core transformation from static product passports into connected product intelligence.',
        modalTitle: 'CircularTwin AI — Vision',
        expand: 'Expand Visual',
      },
      challenge: {
        tag: '01 · THE CHALLENGE',
        headingPart1: 'Digital data exists.',
        headingPart2: 'Decision intelligence is still missing.',
        p1: 'Product, material, environmental, and compliance information exist across fragmented databases, static PDF documents, and departmental silos. Yet raw digital data alone does not produce actionable circular decisions.',
        prompt: 'Complex trade-offs such as:',
        options: ['REPAIR', 'REFURBISH', 'REUSE', 'RECYCLE', 'REPLACE'],
        p2: 'require technical feasibility, lifecycle CO₂e impact, regulatory requirements, and economic returns to be evaluated simultaneously in one environment.',
      },
      hypothesis: {
        tag: '02 · THE PRODUCT HYPOTHESIS',
        quote: '“If product, material, environmental, and compliance data are combined in one Product Intelligence layer and supported by rule-based validation and AI analysis, circular decisions can be prepared more efficiently, transparently, and data-driven.”',
        steps: ['DATA', 'CONTEXT', 'INTELLIGENCE', 'DECISION'],
      },
      image2: {
        tag: '03 · PRODUCT ARCHITECTURE',
        heading: 'How CircularTwin AI works',
        subtitle: 'Eight connected modules form the structural backbone of the Product Intelligence platform.',
        captionTitle: 'Product Architecture — Eight connected intelligence modules',
        captionSub: '01 Product Twin · 02 Product DNA · 03 Data Trust Layer · 04 Material Intelligence · 05 Circular Decision Compass · 06 CircularTwin Copilot · 07 Decision Memory · 08 Material Bank',
        modalTitle: 'CircularTwin AI — Product Architecture',
        expand: 'Expand Architecture',
      },
      intelligence: {
        tag: '04 · DECISION LOGIC & GOVERNANCE',
        heading: 'Responsible AI & Human-in-the-Loop',
        modules: [
          {
            num: '01',
            title: 'Data Trust Layer',
            desc: 'Deterministic rule-based filters validate data completeness and compliance integrity before triggering any AI reasoning.',
          },
          {
            num: '02',
            title: 'Circular Decision Compass',
            desc: 'Multi-criteria comparison evaluating engineering feasibility, carbon reduction, residual value, and lifetime extension.',
          },
          {
            num: '03',
            title: 'Decision Memory & Learning',
            desc: 'Every completed decision enriches organizational memory to improve future scenario accuracy and circular matching.',
          },
        ],
      },
      value: {
        tag: '05 · BUSINESS & ENVIRONMENTAL VALUE',
        heading: 'Measurable Impact across the Lifecycle',
        pillars: [
          {
            title: 'Ecology & ESG',
            desc: 'Measurable Scope 3 emissions reduction, verified recyclate quotas, and auditable material flows for ESG disclosures.',
          },
          {
            title: 'Compliance & Certainty',
            desc: 'Proactive alignment with EU Ecodesign directives, Digital Product Passports (DPP), and supply chain due diligence laws.',
          },
          {
            title: 'Economic Value',
            desc: 'Optimizing residual asset values, mitigating disposal expenditures, and turning standing building stock into material banks.',
          },
        ],
      },
      image3: {
        tag: '06 · LIFECYCLE APPLICATION',
        heading: 'Circular Decisions across the Building Lifecycle',
        subtitle: 'Connecting raw materials, manufacturing, occupancy, reverse logistics, and high-grade recycling.',
        captionTitle: 'From product data to circular decisions across the building lifecycle',
        captionSub: 'Product Data → Intelligence → Circular Decisions → Business & Environmental Impact',
        modalTitle: 'CircularTwin AI — Lifecycle Application',
        expand: 'Expand Lifecycle Visual',
      },
      learnings: {
        tag: '07 · PRODUCT MANAGEMENT LEARNINGS',
        quotePart1: '“The real opportunity is not another static product passport.',
        quotePart2: 'It is the intelligence layer that helps people decide what should happen next.”',
        roleTitle: 'My Role & Approach',
        roleText: 'End-to-End Product Design: Problem discovery with industry stakeholders, hypothesis formulation, data architecture structuring, user journey mapping, and scoping the core MVP functional matrix.',
      },
      nav: {
        prev: 'PREVIOUS PROJECT',
        all: 'ALL PROJECTS',
        next: 'NEXT PROJECT',
      },
      modal: {
        close: 'Close',
      },
    },
    pl: {
      backLink: 'Wróć do projektów',
      caseStudyBadge: 'CASE STUDY PRODUKTU · 2026',
      heroTitle: 'CircularTwin AI',
      heroSubline: 'From Product Passport to Product Intelligence.',
      heroSublineDe: 'Od danych produktu do decyzji cyrkularnych.',
      heroSubtitle: 'Rozumieć dziś. Symulować jutro. Decydować dla zrównoważonej przyszłości.',
      tags: ['AI & Product Intelligence', 'Gospodarka Cyrkularna', 'Transformacja Cyfrowa', 'Wsparcie Decyzji'],
      disclaimer: {
        title: 'Nota informacyjna i kontekst',
        p1: 'Studium koncepcyjne opracowane w ramach mojego projektu certyfikacyjnego Digital Transformation Manager (IHK).',
        p2: 'Schüco International KG służy jako koncepcyjne studium przypadku na bazie publicznie dostępnych materiałów. Projekt nie stanowi oficjalnego produktu firmy Schüco. Wszelkie wartości kosztowe, emisyjne i procesowe to fikcyjne dane demonstracyjne.',
      },
      image1: {
        captionTitle: 'Vision — From Product Passport to Product Intelligence',
        captionSub: 'Transformacja ze statycznych paszportów produktów w połączoną inteligencję produktową.',
        modalTitle: 'CircularTwin AI — Wizja',
        expand: 'Powiększ grafikę',
      },
      challenge: {
        tag: '01 · WYZWANIE',
        headingPart1: 'Dane cyfrowe już istnieją.',
        headingPart2: 'Brakuje inteligencji decyzyjnej.',
        p1: 'Informacje o produktach, surowcach, bilansie środowiskowym i zgodności prawnej są dziś rozproszone w osobnych systemach, plikach PDF i silosach organizacyjnych. Same dane cyfrowe nie przekładają się jednak automatycznie na trafną decyzję cyrkularną.',
        prompt: 'Złożone scenariusze wyboru, takie jak:',
        options: ['REPAIR', 'REFURBISH', 'REUSE', 'RECYCLE', 'REPLACE'],
        p2: 'wymagają jednoczesnej oceny wykonalności technicznej, redukcji CO₂e, zgodności z normami oraz opłacalności ekonomicznej w jednym zintegrowanym środowisku.',
      },
      hypothesis: {
        tag: '02 · HIPOTEZA PRODUKTOWA',
        quote: '„Gdy dane o produkcie, surowcach, środowisku i zgodności zostaną zintegrowane w jednej warstwie Product Intelligence i poparte weryfikacją regułową oraz analityką AI, decyzje cyrkularne można podejmować szybciej, przejrzyściej i w oparciu o rzetelne dane.”',
        steps: ['DANE', 'KONTEKST', 'INTELIGENCJA', 'DECYZJA'],
      },
      image2: {
        tag: '03 · ARCHITEKTURA PRODUKTU',
        heading: 'Jak działa CircularTwin AI',
        subtitle: 'Osiem powiązanych modułów tworzy fundament platformy Product Intelligence.',
        captionTitle: 'Product Architecture — Eight connected intelligence modules',
        captionSub: '01 Product Twin · 02 Product DNA · 03 Data Trust Layer · 04 Material Intelligence · 05 Circular Decision Compass · 06 CircularTwin Copilot · 07 Decision Memory · 08 Material Bank',
        modalTitle: 'CircularTwin AI — Architektura produktu',
        expand: 'Powiększ architekturę',
      },
      intelligence: {
        tag: '04 · LOGIKA DECYZYJNA I ETYKA',
        heading: 'Odpowiedzialne AI & Human-in-the-Loop',
        modules: [
          {
            num: '01',
            title: 'Data Trust Layer',
            desc: 'Deterministyczne filtry regułowe sprawdzają kompletność danych i wymogi prawne przed uruchomieniem wnioskowania AI.',
          },
          {
            num: '02',
            title: 'Circular Decision Compass',
            desc: 'Wielokryterialne porównanie wykonalności inżynieryjnej, redukcji emisji CO₂e, wartości rezydualnej i przedłużenia cyklu życia.',
          },
          {
            num: '03',
            title: 'Decision Memory & Learning',
            desc: 'Każda podjęta decyzja zasila pamięć organizacyjną, stale doskonaląc dokładność przyszłych symulacji.',
          },
        ],
      },
      value: {
        tag: '05 · WARTOŚĆ BIZNESOWA I ŚRODOWISKOWA',
        heading: 'Wymierny wpływ w całym cyklu życia',
        pillars: [
          {
            title: 'Ekologia & ESG',
            desc: 'Mierzalna redukcja emisji Scope 3, potwierdzone poziomy recyklingu i przejrzyste obiegi surowców dla raportowania ESG.',
          },
          {
            title: 'Zgodność & Bezpieczeństwo',
            desc: 'Wczesne dostosowanie do unijnych norm ekoprojektu, Cyfrowego Paszportu Produktu (DPP) i należytej staranności w łańcuchu dostaw.',
          },
          {
            title: 'Efektywność ekonomiczna',
            desc: 'Maksymalizacja wartości rezydualnej, obniżenie kosztów utylizacji i tworzenie banków materiałów z istniejących zasobów.',
          },
        ],
      },
      image3: {
        tag: '06 · ZASTOSOWANIE W CYKLU ŻYCIA',
        heading: 'Decyzje cyrkularne w całym cyklu życia budynku',
        subtitle: 'Od surowców i produkcji po użytkowanie, zwrot i powtórne przetworzenie materiałów.',
        captionTitle: 'From product data to circular decisions across the building lifecycle',
        captionSub: 'Product Data → Intelligence → Circular Decisions → Business & Environmental Impact',
        modalTitle: 'CircularTwin AI — Wpływ w cyklu życia',
        expand: 'Powiększ grafikę cyklu życia',
      },
      learnings: {
        tag: '07 · WNIOSKI PRODUKTOWE',
        quotePart1: '„Prawdziwa szansa nie tkwi w stworzeniu kolejnego statycznego paszportu produktu.',
        quotePart2: 'Kryje się w warstwie inteligencji, która pomaga ludziom zdecydować, co powinno wydarzyć się w następnym kroku.”',
        roleTitle: 'Moja rola i podejście',
        roleText: 'Kompleksowe projektowanie produktu: odkrywanie problemu z ekspertami, formułowanie hipotez, strukturyzacja architektury danych, mapowanie ścieżek użytkowników i definicja zakresu MVP.',
      },
      nav: {
        prev: 'POPRZEDNI PROJEKT',
        all: 'WSZYSTKIE PROJEKTY',
        next: 'NASTĘPNY PROJEKT',
      },
      modal: {
        close: 'Zamknij',
      },
    },
  }[currentLang];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#080A09] text-[#F4F1EA] selection:bg-[#0F5C46] selection:text-[#C7A35A] pb-20">
        
        {/* ================================================================ */}
        {/* 1. HERO / INTRODUCTION                                           */}
        {/* ================================================================ */}
        <header className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-8 sm:pt-14 pb-8">
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-72 w-[450px] rounded-full bg-[#10B981]/10 blur-[140px]" />
          <div className="pointer-events-none absolute top-16 right-10 h-64 w-64 rounded-full bg-[#C7A35A]/10 blur-[130px]" />

          {/* Breadcrumb Back Link */}
          <div className="relative z-10 mb-6">
            <BackToPortfolio currentLang={currentLang} />
          </div>

          <div className="relative z-10 space-y-5">
            {/* Case Study Badge */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase">
                {content.caseStudyBadge}
              </span>
            </div>

            {/* Main Title & Subtitles */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4F1EA] leading-[1.05]">
                {content.heroTitle}
              </h1>
              <p className="font-serif text-2xl sm:text-3xl text-[#C7A35A] italic font-normal">
                {content.heroSubline}
              </p>
              <p className="font-sans text-base sm:text-lg text-[#A9AEA9] font-medium">
                {content.heroSublineDe}
              </p>
            </div>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base text-[#D1D5DB] max-w-3xl leading-relaxed">
              {content.heroSubtitle}
            </p>

            {/* Typographic Tags */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#F4F1EA] pt-1">
              {content.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  {idx > 0 && <span className="text-[#148B78]" aria-hidden="true">·</span>}
                  <span className={idx === 0 ? 'text-[#C7A35A] font-semibold' : 'text-[#D1D5DB]'}>{tag}</span>
                </React.Fragment>
              ))}
            </div>

            {/* Transparent Project Disclaimer */}
            <div className="pt-2 max-w-4xl">
              <div className="rounded-xl border border-[#C7A35A]/30 bg-[#101412] p-4 text-xs text-[#D1D5DB] leading-relaxed space-y-1">
                <div className="flex items-center gap-2 text-[#C7A35A] font-semibold text-[11px] uppercase tracking-wider">
                  <Info className="h-3.5 w-3.5 shrink-0 text-[#C7A35A]" />
                  <span>{content.disclaimer.title}</span>
                </div>
                <p>{content.disclaimer.p1}</p>
                <p className="text-[#A9AEA9]">{content.disclaimer.p2}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================ */}
        {/* 2. IMAGE 1 — HERO / PROJECT VISION                               */}
        {/* Aspect ratio 16/7, large, clear, with elegant caption             */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto py-6 sm:py-10">
          <div className="space-y-3">
            
            {/* Click-to-expand Hero Vision Visual */}
            <div
              onClick={() =>
                setActiveImageModal({
                  src: image1VisionSrc,
                  title: content.image1.modalTitle,
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#148B78]/40 bg-[#101412] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#10B981] transition-all duration-300"
            >
              <img
                src={image1VisionSrc}
                alt="CircularTwin AI Vision — From Product Passport to Product Intelligence"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PROJECT_CIRCULAR_AI_IMAGE;
                }}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Expand Hint */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-[#080A09]/85 px-3.5 py-1 text-xs font-medium text-[#F4F1EA] backdrop-blur-md transition-colors group-hover:border-[#10B981]">
                <Eye className="h-3.5 w-3.5 text-[#10B981]" />
                <span>{content.image1.expand}</span>
              </div>
            </div>

            {/* Required Caption Underneath */}
            <div className="text-center space-y-0.5 pt-1">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#C7A35A] uppercase block">
                {content.image1.captionTitle}
              </span>
              <p className="font-serif text-xs sm:text-sm text-[#A9AEA9] italic">
                {content.image1.captionSub}
              </p>
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. PROBLEM / CHALLENGE                                            */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#C7A35A] block mb-2">{content.challenge.tag}</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F4F1EA] tracking-tight">
                {content.challenge.headingPart1} <br />
                <span className="italic text-[#C7A35A]">{content.challenge.headingPart2}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base leading-relaxed text-[#D1D5DB]">
              <p>{content.challenge.p1}</p>
              <div>
                <p className="text-[#F4F1EA] font-medium mb-2.5">
                  {content.challenge.prompt}
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono font-semibold">
                  {content.challenge.options.map((action) => (
                    <span key={action} className="rounded-lg border border-[#148B78]/50 bg-[#101412] px-3 py-1.5 text-[#C7A35A]">
                      {action}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#A9AEA9] mt-3">
                  {content.challenge.p2}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. PRODUCT CONCEPT & HYPOTHESIS                                  */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            <span className="font-mono text-xs font-bold text-[#C7A35A] block">{content.hypothesis.tag}</span>
            
            <div className="rounded-2xl border border-[#C7A35A]/40 bg-[#101412] p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F4F1EA] font-normal leading-relaxed">
                {content.hypothesis.quote}
              </h2>

              {/* Sequential Flow */}
              <div className="mt-8 pt-6 border-t border-[#C7A35A]/15 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm font-bold">
                <span className="text-[#D1D5DB]">{content.hypothesis.steps[0]}</span>
                <span className="text-[#148B78]">→</span>
                <span className="text-[#F4F1EA]">{content.hypothesis.steps[1]}</span>
                <span className="text-[#148B78]">→</span>
                <span className="text-[#C7A35A]">{content.hypothesis.steps[2]}</span>
                <span className="text-[#C7A35A]">→</span>
                <span className="rounded-lg bg-[#0F5C46] px-4 py-1.5 text-[#F4F1EA] border border-[#10B981]/50">
                  {content.hypothesis.steps[3]}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 5. IMAGE 2 — PRODUCT / FUNCTION ARCHITECTURE (8 MODULES)          */}
        {/* Uncropped, full width, height: auto, object-fit: contain         */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-5">
            
            <div className="max-w-4xl mx-auto text-center space-y-1.5">
              <span className="font-mono text-xs font-bold text-[#C7A35A] tracking-wider uppercase block">
                {content.image2.tag}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F4F1EA] tracking-tight">
                {content.image2.heading}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#D1D5DB] max-w-2xl mx-auto leading-relaxed">
                {content.image2.subtitle}
              </p>
            </div>

            {/* Click-to-expand Architecture Visual */}
            <div
              onClick={() =>
                setActiveImageModal({
                  src: image2ArchitectureSrc,
                  title: content.image2.modalTitle,
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#148B78]/40 bg-[#101412] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#10B981] transition-all duration-300"
            >
              <img
                src={image2ArchitectureSrc}
                alt="CircularTwin AI Product Architecture — Eight connected intelligence modules"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = CIRCULARTWIN_FUNKTIONEN;
                }}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Expand Hint */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-[#080A09]/85 px-3.5 py-1 text-xs font-medium text-[#F4F1EA] backdrop-blur-md transition-colors group-hover:border-[#10B981]">
                <Eye className="h-3.5 w-3.5 text-[#10B981]" />
                <span>{content.image2.expand}</span>
              </div>
            </div>

            {/* Required Caption */}
            <div className="text-center space-y-1 pt-1 max-w-4xl mx-auto">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#C7A35A] uppercase block">
                {content.image2.captionTitle}
              </span>
              <p className="font-sans text-xs text-[#A9AEA9]">
                {content.image2.captionSub}
              </p>
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. PRODUCT INTELLIGENCE / AI & DECISION LOGIC                    */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#C7A35A] block mb-2">{content.intelligence.tag}</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F1EA]">
                {content.intelligence.heading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {content.intelligence.modules.map((mod) => (
                <div
                  key={mod.num}
                  className="rounded-xl border border-[#0F5C46]/40 bg-[#101412] p-5 space-y-2 hover:border-[#10B981]/50 transition-colors"
                >
                  <span className="font-mono text-xs font-bold text-[#10B981]">{mod.num}</span>
                  <h3 className="font-serif text-base font-medium text-[#F4F1EA]">{mod.title}</h3>
                  <p className="font-sans text-xs text-[#D1D5DB] leading-relaxed">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 7. BUSINESS & ENVIRONMENTAL VALUE                                */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#C7A35A] block mb-2">{content.value.tag}</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F1EA]">
                {content.value.heading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {content.value.pillars.map((pil) => (
                <div
                  key={pil.title}
                  className="rounded-xl border border-[#C7A35A]/30 bg-[#101412] p-5 space-y-2 hover:border-[#C7A35A]/60 transition-colors"
                >
                  <h3 className="font-serif text-base font-medium text-[#C7A35A]">{pil.title}</h3>
                  <p className="font-sans text-xs text-[#D1D5DB] leading-relaxed">{pil.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 8. IMAGE 3 — CIRCULAR VALUE / APPLICATION IN LIFECYCLE           */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-5">
            
            <div className="max-w-4xl mx-auto text-center space-y-1.5">
              <span className="font-mono text-xs font-bold text-[#C7A35A] tracking-wider uppercase block">
                {content.image3.tag}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F4F1EA] tracking-tight">
                {content.image3.heading}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#D1D5DB] max-w-2xl mx-auto leading-relaxed">
                {content.image3.subtitle}
              </p>
            </div>

            {/* Click-to-expand Lifecycle Visual */}
            <div
              onClick={() =>
                setActiveImageModal({
                  src: image3ImpactSrc,
                  title: content.image3.modalTitle,
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#148B78]/40 bg-[#101412] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#10B981] transition-all duration-300"
            >
              <img
                src={image3ImpactSrc}
                alt="From product data to circular decisions across the building lifecycle"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = CIRCULARTWIN_IMPACT;
                }}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Expand Hint */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-[#080A09]/85 px-3.5 py-1 text-xs font-medium text-[#F4F1EA] backdrop-blur-md transition-colors group-hover:border-[#10B981]">
                <Eye className="h-3.5 w-3.5 text-[#10B981]" />
                <span>{content.image3.expand}</span>
              </div>
            </div>

            {/* Required Caption */}
            <div className="text-center space-y-1 pt-1 max-w-4xl mx-auto">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#C7A35A] uppercase block">
                {content.image3.captionTitle}
              </span>
              <p className="font-serif text-xs sm:text-sm text-[#A9AEA9] italic">
                {content.image3.captionSub}
              </p>
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* 9. PRODUCT MANAGEMENT LEARNINGS & METHODS                        */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            <span className="font-mono text-xs font-bold text-[#C7A35A] block">{content.learnings.tag}</span>

            <div className="rounded-2xl border border-[#0F5C46]/50 bg-gradient-to-br from-[#101412] to-[#080A09] p-6 sm:p-10 shadow-2xl space-y-4">
              <blockquote className="font-serif text-xl sm:text-2xl text-[#F4F1EA] leading-relaxed">
                <span>{content.learnings.quotePart1} </span>
                <span className="text-[#10B981] font-medium">{content.learnings.quotePart2}</span>
              </blockquote>
              
              <div className="pt-4 border-t border-[#0F5C46]/30 space-y-1 text-xs sm:text-sm text-[#D1D5DB]">
                <h3 className="font-sans font-semibold text-[#C7A35A] uppercase tracking-wider text-xs">
                  {content.learnings.roleTitle}
                </h3>
                <p className="leading-relaxed">
                  {content.learnings.roleText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 10. PROJECT NAVIGATION FOOTER                                    */}
        {/* ================================================================ */}
        <CaseStudyBottomNav
          currentLang={currentLang}
          allProjectsUrl="/projects"
          nextProjectUrl="/projects/ai-building-concept"
          nextProjectTitle="AI BUILDING CONCEPT"
          prevProjectUrl="/projects/gain"
          prevProjectTitle="GAIN"
        />

        {/* ================================================================ */}
        {/* FULLSCREEN LIGHTBOX MODAL FOR EACH OF THE 3 IMAGES               */}
        {/* ================================================================ */}
        {activeImageModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080A09]/92 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveImageModal(null)}
          >
            <div
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveImageModal(null)}
                className="absolute -top-10 right-0 sm:top-2 sm:right-2 z-10 rounded-full bg-[#080A09]/80 border border-[#C7A35A]/50 p-2 text-[#F4F1EA] hover:bg-[#101412] hover:text-[#C7A35A] transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <img
                src={activeImageModal.src}
                alt={activeImageModal.title}
                className="max-h-[85vh] w-auto max-w-full rounded-xl border border-[#0F5C46]/50 shadow-2xl object-contain"
              />

              <div className="pt-2 text-center">
                <span className="font-mono text-xs text-[#C7A35A] uppercase tracking-wider">
                  {activeImageModal.title}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
};
