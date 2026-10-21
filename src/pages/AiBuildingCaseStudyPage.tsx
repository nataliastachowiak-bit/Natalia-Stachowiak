import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Eye,
  X,
  MessageSquare,
  Sliders,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Share2,
  Building2,
  Leaf,
  Layers,
  HelpCircle,
  ShieldCheck,
  Compass,
  FileText,
} from 'lucide-react';
import { Language, MediaAssets } from '../types';
import {
  LOCKED_ASSETS,
  PROJECT_BUILDING_AI_IMAGE,
  PROJECT_BUILDING_AI_WORKFLOW,
} from '../data/assetRegistry';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { CaseStudyBottomNav } from '../components/CaseStudyBottomNav';

interface AiBuildingCaseStudyPageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
}

export const AiBuildingCaseStudyPage: React.FC<AiBuildingCaseStudyPageProps> = ({
  currentLang,
  mediaAssets,
}) => {
  const [activeImageModal, setActiveImageModal] = useState<{ src: string; title: string } | null>(null);

  const PROTOTYPE_URL = 'https://buldingaiconcept.lovable.app';

  const image1Src = mediaAssets.aiBuildingCover || mediaAssets.aiBuildingVision || mediaAssets.aiBuildingImage || PROJECT_BUILDING_AI_IMAGE;
  const image2Src = mediaAssets.aiBuildingWorkflow || mediaAssets.aiBuildingArchitecture || PROJECT_BUILDING_AI_WORKFLOW;

  const t = {
    de: {
      backLink: 'Zurück zu allen Projekten',
      label: 'INDEPENDENT PRODUCT CASE STUDY · 2026',
      title: 'AI BUILDING CONCEPT',
      subtitle: 'Generative AI for Early-Stage Building Configuration & Decision Support',
      mainQuestion: '„What if designing a building could start with a conversation?“',
      introP1:
        'AI Building Concept untersucht, wie Generative KI komplexe frühe Gebäudeanforderungen in strukturierte Parameter, vergleichbare Konzept-Szenarien und transparente Entscheidungsunterstützung transformieren kann.',
      introP2:
        'Das Konzept verbindet Conversational AI, Gebäudedaten, Nachhaltigkeit und Decision Intelligence, um eine intuitive Schnittstelle zwischen menschlichen Anforderungen und komplexen Gebäudeinformationen zu schaffen.',
      ctaButton: 'EXPLORE LIVE PROTOTYPE →',
      sec1Heading: '01 · IDEA & VISION',
      sec1VisualSub: '„From conversation to building intelligence.“',
      sec1Desc1:
        'AI Building Concept transformiert natürlichsprachliche Anforderungen in strukturierte Gebäudeparameter und vergleichbare Konzept-Szenarien.',
      sec1Desc2:
        'Ziel ist es nicht, Architekten oder Ingenieure zu ersetzen, sondern eine intelligente Decision-Support-Schicht zu schaffen, die komplexe Optionen verständlicher und vergleichbar macht.',
      sec1Expand: 'Visual vergrößern',
      sec2Statement: 'I translated the vision into a tangible AI product concept.',
      sec2Desc:
        'Der Prototyp übersetzt natürlichsprachliche Anforderungen in strukturierte Gebäudeparameter, generiert alternative Konzepte und schafft eine transparente Basis für Vergleiche und Entscheidungen.',
      sec2Flow: [
        { label: 'CONVERSE', desc: 'Anforderungen verstehen', icon: <MessageSquare className="h-4 w-4" /> },
        { label: 'STRUCTURE', desc: 'In Parameter übersetzen', icon: <Sliders className="h-4 w-4" /> },
        { label: 'GENERATE', desc: 'Konzeptvarianten erstellen', icon: <Sparkles className="h-4 w-4" /> },
        { label: 'COMPARE', desc: 'Optionen vergleichen', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'DECIDE', desc: 'Entscheidungen unterstützen', icon: <CheckCircle2 className="h-4 w-4" /> },
        { label: 'CONNECT', desc: 'Mit BIM & Building Twin verbinden', icon: <Share2 className="h-4 w-4" /> },
      ],
      sec3Heading: '02 · HOW THE PRODUCT WORKS',
      sec3Expand: 'Produktarchitektur vergrößern',
      sec3Steps: [
        {
          num: '01',
          title: 'Chat Input',
          desc: 'Natürlichsprachlicher Dialog zur intuitiven Erfassung von Standort, Fläche, Nutzung und Prioritäten.',
        },
        {
          num: '02',
          title: 'AI Processing',
          desc: 'Extrahiert und strukturiert Schlüsselanforderungen in verifizierbare Gebäudeparameter.',
        },
        {
          num: '03',
          title: 'Concept Generation',
          desc: 'Erzeugt alternative Gebäudeszenarien (Cost Efficient, Balanced, Low Carbon).',
        },
        {
          num: '04',
          title: 'Comparison',
          desc: 'Visueller und datengestützter Vergleich von Investitionskosten, Energie, CO₂ und Zirkularität.',
        },
        {
          num: '05',
          title: 'Decision Support',
          desc: 'Unterstützt die transparente Bewertung von Zielkonflikten mit datengestützter Begründung.',
        },
        {
          num: '06',
          title: 'Connection',
          desc: 'Konzeptioneller Datenexport in standardisierte BIM- und Building-Twin-Strukturen.',
        },
      ],
      sec4Heading: 'PRODUCT EXPERIENCE',
      sec4Subtitle: 'Kompakte Übersicht der zentralen Produktmodule',
      sec4Modules: [
        {
          title: 'AI BUILDING COPILOT',
          desc: 'Natürlichsprachliche Anforderungsanalyse mit intelligenten Rückfragen.',
          icon: <MessageSquare className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'SMART BUILDING BRIEF',
          desc: 'Transformiert Konversationen in strukturierte, editierbare Gebäudeparameter.',
          icon: <FileText className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'CONCEPT GENERATOR',
          desc: 'Generiert alternative Szenarien: Cost Efficient, Balanced und Low Carbon.',
          icon: <Sparkles className="h-4 w-4 text-[#C7A35A]" />,
        },
        {
          title: 'DECISION COMPASS',
          desc: 'Vergleicht wirtschaftliche, funktionale und nachhaltige Dimensionen transparent.',
          icon: <Compass className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'SUSTAINABILITY INTELLIGENCE',
          desc: 'Macht Energiebilanz, CO₂-Fußabdruck, Lebenszyklus und Zirkularität messbar.',
          icon: <Leaf className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'BUILDING TWIN PREVIEW',
          desc: 'Konzeptionelle Brücke von früher Entscheidungs-Intelligenz zu BIM-Strukturen.',
          icon: <Building2 className="h-4 w-4 text-[#C7A35A]" />,
        },
        {
          title: 'EXPLAINABLE AI',
          desc: 'Legt Annahmen, Datenherkunft und Argumentationsketten der KI transparent offen.',
          icon: <HelpCircle className="h-4 w-4 text-[#10B981]" />,
        },
      ],
      sec5Heading: 'MY ROLE',
      sec5Tags: [
        'Product Discovery',
        'Product Strategy',
        'AI Product Design',
        'UX Concept',
        'Prototyping',
        'Sustainability',
        'Decision Intelligence',
      ],
      sec5P1:
        'Ich habe die Fallstudie vom Problem-Framing und der Produkthypothese über Produktvision, MVP-Architektur und User Flow bis zum interaktiven KI-Prototyp entwickelt.',
      sec5P2:
        'Mein Fokus lag auf der Konzeption von KI als Entscheidungsunterstützungssystem – nicht darauf, fachliche Ingenieur- oder Architektenexpertise zu ersetzen.',
      sec5Quote:
        '„KI unterstützt Entscheidungen. Experten bleiben verantwortlich für ingenieurtechnische Beschlüsse.“',
      sec6Heading: 'PRODUCT THINKING',
      sec6Subtitle: 'Strukturierte Produkt-Hypothesen von der Problemidentifikation bis zur Vision',
      sec6Flow: [
        {
          tag: 'PROBLEM',
          text: 'Komplexe und fragmentierte Anforderungen in der frühen Projektphase führen zu Missverständnissen und späten Fehlentscheidungen.',
        },
        {
          tag: 'OPPORTUNITY',
          text: 'Conversational AI nutzen, um diffuse Sprach-Briefings in strukturierte Parameter zu übersetzen und Alternativen früh sichtbar zu machen.',
        },
        {
          tag: 'PRODUCT',
          text: 'AI Building Copilot + Smart Building Brief + Concept Generator + Decision Compass als integrierte Decision-Support-Plattform.',
        },
        {
          tag: 'VALUE HYPOTHESIS',
          text: 'Schnellere Anforderungsstrukturierung, klarerer Szenarienvergleich und transparentere Entscheidungsfindung vor der Detailplanung.',
        },
        {
          tag: 'FUTURE CONNECTION',
          text: 'BIM / Building Twin Integration + validierte Gebäudedaten + automatisierte Simulationsservices für nahtlosen Übergang in die Ausführung.',
        },
      ],
      closingHeadline: 'WHAT IF DESIGNING A BUILDING COULD START WITH A CONVERSATION?',
      closingSub: 'Erkunden Sie den interaktiven AI Building Concept Prototyp.',
      closingDisclaimer1: 'Independent Product Case Study · Natalia Stachowiak · AI & Digital Product Management · 2026',
      closingDisclaimer2:
        'Prototyp-Daten sind fiktive Demonstrationsdaten und stellen keine verifizierten ingenieurtechnischen Berechnungen dar.',
      navPrev: 'VORHERIGES PROJEKT: CIRCULARTWIN AI',
      navAll: 'ALLE PROJEKTE',
      navNext: 'NÄCHSTES PROJEKT: DINE-EASE',
      modalClose: 'Schließen',
    },
    en: {
      backLink: 'Back to all projects',
      label: 'INDEPENDENT PRODUCT CASE STUDY · 2026',
      title: 'AI BUILDING CONCEPT',
      subtitle: 'Generative AI for Early-Stage Building Configuration & Decision Support',
      mainQuestion: '“What if designing a building could start with a conversation?”',
      introP1:
        'AI Building Concept explores how Generative AI could transform complex early-stage building requirements into structured parameters, comparable concept scenarios and transparent decision support.',
      introP2:
        'The concept combines conversational AI, building data, sustainability and decision intelligence to create an intuitive interface between human requirements and complex building information.',
      ctaButton: 'EXPLORE LIVE PROTOTYPE →',
      sec1Heading: '01 · IDEA & VISION',
      sec1VisualSub: '“From conversation to building intelligence.”',
      sec1Desc1:
        'AI Building Concept transforms natural-language requirements into structured building parameters and comparable concept scenarios.',
      sec1Desc2:
        'The goal is not to replace architects or engineers, but to create an intelligent decision-support layer that makes complex options easier to understand and compare.',
      sec1Expand: 'Expand Visual',
      sec2Statement: 'I translated the vision into a tangible AI product concept.',
      sec2Desc:
        'The prototype transforms natural-language requirements into structured building parameters, generates alternative concepts and creates a transparent basis for comparison and decision-making.',
      sec2Flow: [
        { label: 'CONVERSE', desc: 'Understand requirements', icon: <MessageSquare className="h-4 w-4" /> },
        { label: 'STRUCTURE', desc: 'Translate into parameters', icon: <Sliders className="h-4 w-4" /> },
        { label: 'GENERATE', desc: 'Create concept variants', icon: <Sparkles className="h-4 w-4" /> },
        { label: 'COMPARE', desc: 'Evaluate options side-by-side', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'DECIDE', desc: 'Support transparent trade-offs', icon: <CheckCircle2 className="h-4 w-4" /> },
        { label: 'CONNECT', desc: 'Connect with BIM & Building Twin', icon: <Share2 className="h-4 w-4" /> },
      ],
      sec3Heading: '02 · HOW THE PRODUCT WORKS',
      sec3Expand: 'Expand Product Architecture',
      sec3Steps: [
        {
          num: '01',
          title: 'Chat Input',
          desc: 'Natural-language conversation capturing location, footprint, intended use and strategic priorities.',
        },
        {
          num: '02',
          title: 'AI Processing',
          desc: 'Extracts and structures key requirements into verifiable building parameters and boundary conditions.',
        },
        {
          num: '03',
          title: 'Concept Generation',
          desc: 'Creates multiple building scenarios such as Cost Efficient, Balanced, and Low Carbon.',
        },
        {
          num: '04',
          title: 'Comparison',
          desc: 'Visual and data-based comparison evaluating capital expenditures, energy ratings, and carbon impact.',
        },
        {
          num: '05',
          title: 'Decision Support',
          desc: 'Supports transparent evaluation of alternatives with clear reasoning behind recommendations.',
        },
        {
          num: '06',
          title: 'Connection',
          desc: 'Conceptual data pipeline connecting early decision intelligence to BIM and Building Twin models.',
        },
      ],
      sec4Heading: 'PRODUCT EXPERIENCE',
      sec4Subtitle: 'Clean overview of the seven core product modules',
      sec4Modules: [
        {
          title: 'AI BUILDING COPILOT',
          desc: 'Natural-language requirements and intelligent follow-up questions.',
          icon: <MessageSquare className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'SMART BUILDING BRIEF',
          desc: 'Transforms conversations into structured building parameters.',
          icon: <FileText className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'CONCEPT GENERATOR',
          desc: 'Creates alternative concept scenarios such as Cost Efficient, Balanced and Low Carbon.',
          icon: <Sparkles className="h-4 w-4 text-[#C7A35A]" />,
        },
        {
          title: 'DECISION COMPASS',
          desc: 'Compares economic, functional and sustainability-related dimensions.',
          icon: <Compass className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'SUSTAINABILITY INTELLIGENCE',
          desc: 'Makes energy, carbon, lifecycle and circularity considerations visible.',
          icon: <Leaf className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'BUILDING TWIN PREVIEW',
          desc: 'Conceptual connection between early decision intelligence and BIM / Building Twin structures.',
          icon: <Building2 className="h-4 w-4 text-[#C7A35A]" />,
        },
        {
          title: 'EXPLAINABLE AI',
          desc: 'Shows assumptions, data origin and reasoning behind AI-supported outputs.',
          icon: <HelpCircle className="h-4 w-4 text-[#10B981]" />,
        },
      ],
      sec5Heading: 'MY ROLE',
      sec5Tags: [
        'Product Discovery',
        'Product Strategy',
        'AI Product Design',
        'UX Concept',
        'Prototyping',
        'Sustainability',
        'Decision Intelligence',
      ],
      sec5P1:
        'I developed the case study from problem framing and product hypothesis through product vision, MVP architecture and user flow to an interactive AI prototype.',
      sec5P2:
        'My focus was on designing AI as a decision-support system rather than replacing professional engineering expertise.',
      sec5Quote:
        '“AI supports decisions. Experts remain responsible for engineering decisions.”',
      sec6Heading: 'PRODUCT THINKING',
      sec6Subtitle: 'Structured product hypotheses from problem validation to future integration',
      sec6Flow: [
        {
          tag: 'PROBLEM',
          text: 'Complex and fragmented early-stage building requirements lead to misalignment and costly downstream redesigns.',
        },
        {
          tag: 'OPPORTUNITY',
          text: 'Use conversational AI to structure diffuse requirements and make alternative trade-offs visible in minutes.',
        },
        {
          tag: 'PRODUCT',
          text: 'AI Building Copilot + Smart Building Brief + Concept Generator + Decision Compass as an integrated platform.',
        },
        {
          tag: 'VALUE HYPOTHESIS',
          text: 'Faster requirement structuring, clearer scenario comparison and more transparent early-stage decision support.',
        },
        {
          tag: 'FUTURE CONNECTION',
          text: 'BIM / Building Twin + validated building data + automated simulation services for continuity into engineering.',
        },
      ],
      closingHeadline: 'WHAT IF DESIGNING A BUILDING COULD START WITH A CONVERSATION?',
      closingSub: 'Explore the interactive AI Building Concept prototype.',
      closingDisclaimer1: 'Independent Product Case Study · Natalia Stachowiak · AI & Digital Product Management · 2026',
      closingDisclaimer2:
        'Prototype data is fictional demonstration data and does not represent verified engineering calculations.',
      navPrev: 'PREVIOUS PROJECT: CIRCULARTWIN AI',
      navAll: 'ALL PROJECTS',
      navNext: 'NEXT PROJECT: DINE-EASE',
      modalClose: 'Close',
    },
    pl: {
      backLink: 'Wróć do projektów',
      label: 'INDEPENDENT PRODUCT CASE STUDY · 2026',
      title: 'AI BUILDING CONCEPT',
      subtitle: 'Generative AI for Early-Stage Building Configuration & Decision Support',
      mainQuestion: '„What if designing a building could start with a conversation?”',
      introP1:
        'AI Building Concept bada, jak generatywne AI może przekształcić złożone wczesne wymagania projektowe w ustrukturyzowane parametry, porównywalne scenariusze i przejrzyste wsparcie decyzji.',
      introP2:
        'Koncepcja łączy AI konwersacyjne, dane budowlane, zrównoważony rozwój i inteligencję decyzyjną, tworząc intuicyjny interfejs między potrzebami człowieka a złożonymi informacjami budowlanymi.',
      ctaButton: 'EXPLORE LIVE PROTOTYPE →',
      sec1Heading: '01 · IDEA & VISION',
      sec1VisualSub: '„From conversation to building intelligence.”',
      sec1Desc1:
        'AI Building Concept przekształca wymagania w języku naturalnym w ustrukturyzowane parametry budowlane i porównywalne scenariusze.',
      sec1Desc2:
        'Celem nie jest zastąpienie architektów czy inżynierów, lecz stworzenie inteligentnej warstwy wsparcia decyzji ułatwiającej ocenę opcji.',
      sec1Expand: 'Powiększ grafikę',
      sec2Statement: 'I translated the vision into a tangible AI product concept.',
      sec2Desc:
        'Prototyp przekłada dialog na ustrukturyzowane parametry, generuje warianty koncepcyjne i tworzy przejrzystą podstawę do wyboru optymalnego rozwiązania.',
      sec2Flow: [
        { label: 'CONVERSE', desc: 'Zrozumienie wymagań', icon: <MessageSquare className="h-4 w-4" /> },
        { label: 'STRUCTURE', desc: 'Przekład na parametry', icon: <Sliders className="h-4 w-4" /> },
        { label: 'GENERATE', desc: 'Warianty koncepcyjne', icon: <Sparkles className="h-4 w-4" /> },
        { label: 'COMPARE', desc: 'Porównanie opcji', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'DECIDE', desc: 'Wsparcie decyzji', icon: <CheckCircle2 className="h-4 w-4" /> },
        { label: 'CONNECT', desc: 'Integracja z BIM & Twin', icon: <Share2 className="h-4 w-4" /> },
      ],
      sec3Heading: '02 · HOW THE PRODUCT WORKS',
      sec3Expand: 'Powiększ architekturę produktu',
      sec3Steps: [
        {
          num: '01',
          title: 'Chat Input',
          desc: 'Dialog w języku naturalnym precyzujący lokalizację, powierzchnię i cele projektowe.',
        },
        {
          num: '02',
          title: 'AI Processing',
          desc: 'Ekstrakcja i strukturyzacja kluczowych wymagań w zbiór parametrów brzegowych.',
        },
        {
          num: '03',
          title: 'Concept Generation',
          desc: 'Generowanie alternatywnych scenariuszy (Cost Efficient, Balanced, Low Carbon).',
        },
        {
          num: '04',
          title: 'Comparison',
          desc: 'Wizualne i numeryczne zestawienie kosztów, energii, CO₂ i elastyczności.',
        },
        {
          num: '05',
          title: 'Decision Support',
          desc: 'Przejrzyste uzasadnienie rekomendacji i analiza kompromisów projektowych.',
        },
        {
          num: '06',
          title: 'Connection',
          desc: 'Koncepcyjny eksport danych do środowisk BIM i cyfrowych bliźniaków budynków.',
        },
      ],
      sec4Heading: 'PRODUCT EXPERIENCE',
      sec4Subtitle: 'Przejrzyste zestawienie kluczowych modułów produktu',
      sec4Modules: [
        {
          title: 'AI BUILDING COPILOT',
          desc: 'Wymagania w języku naturalnym i inteligentne pytania doprecyzowujące.',
          icon: <MessageSquare className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'SMART BUILDING BRIEF',
          desc: 'Przekształca konwersację w ustrukturyzowany zbiór parametrów.',
          icon: <FileText className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'CONCEPT GENERATOR',
          desc: 'Generuje warianty: Cost Efficient, Balanced oraz Low Carbon.',
          icon: <Sparkles className="h-4 w-4 text-[#C7A35A]" />,
        },
        {
          title: 'DECISION COMPASS',
          desc: 'Wielokryterialne porównanie wymiarów ekonomicznych i środowiskowych.',
          icon: <Compass className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'SUSTAINABILITY INTELLIGENCE',
          desc: 'Uwidacznia zużycie energii, emisje CO₂, cykl życia i cyrkularność.',
          icon: <Leaf className="h-4 w-4 text-[#10B981]" />,
        },
        {
          title: 'BUILDING TWIN PREVIEW',
          desc: 'Pomost łączący wczesne decyzje z modelami BIM i Building Twin.',
          icon: <Building2 className="h-4 w-4 text-[#C7A35A]" />,
        },
        {
          title: 'EXPLAINABLE AI',
          desc: 'Transparentnie wskazuje założenia i źródła stojące za wnioskami AI.',
          icon: <HelpCircle className="h-4 w-4 text-[#10B981]" />,
        },
      ],
      sec5Heading: 'MY ROLE',
      sec5Tags: [
        'Product Discovery',
        'Product Strategy',
        'AI Product Design',
        'UX Concept',
        'Prototyping',
        'Sustainability',
        'Decision Intelligence',
      ],
      sec5P1:
        'Opracowałam studium przypadku od definicji problemu i hipotez po architekturę MVP, user flow i interaktywny prototyp AI.',
      sec5P2:
        'Moim celem było zaprojektowanie AI jako systemu wsparcia decyzji, a nie zastępowanie wiedzy inżynierów i architektów.',
      sec5Quote:
        '„AI wspiera decyzje. Eksperci pozostają odpowiedzialni za wybory inżynieryjne.”',
      sec6Heading: 'PRODUCT THINKING',
      sec6Subtitle: 'Ustrukturyzowane myślenie produktowe od problemu po wizję integracji',
      sec6Flow: [
        {
          tag: 'PROBLEM',
          text: 'Złożone i rozproszone wymagania na wczesnym etapie prowadzą do kosztownych zmian w fazie wykonawczej.',
        },
        {
          tag: 'OPPORTUNITY',
          text: 'Wykorzystanie konwersacyjnego AI do natychmiastowej strukturyzacji briefu i porównania wariantów.',
        },
        {
          tag: 'PRODUCT',
          text: 'AI Building Copilot + Smart Building Brief + Concept Generator + Decision Compass jako spójna platforma.',
        },
        {
          tag: 'VALUE HYPOTHESIS',
          text: 'Szybsza definicja założeń, przejrzyste zestawienie opcji i pewniejsze decyzje przed wejściem w projektowanie.',
        },
        {
          tag: 'FUTURE CONNECTION',
          text: 'Integracja z BIM / Building Twin + zweryfikowane dane + zautomatyzowane serwisy symulacyjne.',
        },
      ],
      closingHeadline: 'WHAT IF DESIGNING A BUILDING COULD START WITH A CONVERSATION?',
      closingSub: 'Przetestuj interaktywny prototyp AI Building Concept.',
      closingDisclaimer1: 'Independent Product Case Study · Natalia Stachowiak · AI & Digital Product Management · 2026',
      closingDisclaimer2:
        'Dane w prototypie są fikcyjnymi danymi demonstracyjnymi i nie stanowią zweryfikowanych obliczeń inżynieryjnych.',
      navPrev: 'POPRZEDNI PROJEKT: CIRCULARTWIN AI',
      navAll: 'WSZYSTKIE PROJEKTY',
      navNext: 'NASTĘPNY PROJEKT: DINE-EASE',
      modalClose: 'Zamknij',
    },
  }[currentLang];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#080A09] text-[#F4F1EA] selection:bg-[#0F5C46] selection:text-[#C7A35A] pb-20">
        
        {/* ================================================================ */}
        {/* CASE STUDY HERO                                                  */}
        {/* ================================================================ */}
        <header className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-8 sm:pt-14 pb-8">
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-72 w-[450px] rounded-full bg-[#10B981]/10 blur-[140px]" />
          <div className="pointer-events-none absolute top-16 right-10 h-64 w-64 rounded-full bg-[#C7A35A]/10 blur-[130px]" />

          {/* Breadcrumb Back Link */}
          <div className="relative z-10 mb-6">
            <BackToPortfolio currentLang={currentLang} />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Small Label */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase">
                {t.label}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4F1EA] leading-[1.05]">
                {t.title}
              </h1>
              <p className="font-serif text-2xl sm:text-3xl text-[#C7A35A] italic font-normal">
                {t.mainQuestion}
              </p>
              <p className="font-sans text-base sm:text-lg text-[#A9AEA9] font-medium max-w-3xl">
                {t.subtitle}
              </p>
            </div>

            {/* Short Introduction */}
            <div className="space-y-3 font-sans text-sm sm:text-base text-[#D1D5DB] max-w-3xl leading-relaxed">
              <p>{t.introP1}</p>
              <p>{t.introP2}</p>
            </div>

            {/* Prominent CTA to Live Prototype */}
            <div className="pt-2">
              <a
                href={PROTOTYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#0F5C46] px-7 py-3.5 font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#F4F1EA] uppercase shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:bg-[#10B981] hover:text-[#080A09] hover:shadow-[0_12px_40px_rgba(16,185,129,0.5)] transition-all duration-300"
              >
                <span>{t.ctaButton}</span>
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </header>

        {/* ================================================================ */}
        {/* SECTION 01 — IDEA & VISION                                       */}
        {/* Large, uncropped, aspect ratio preserved, with clean caption     */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto py-8 sm:py-12 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#C7A35A] tracking-wider uppercase">
                {t.sec1Heading}
              </span>
            </div>

            {/* Click-to-expand Full-Width Visual */}
            <div
              onClick={() =>
                setActiveImageModal({
                  src: image1Src,
                  title: 'AI Building Concept — Idea & Vision',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#148B78]/40 bg-[#101412] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#10B981] transition-all duration-300"
            >
              <img
                src={image1Src}
                alt="AI Building Concept — Idea & Vision: From conversation to building intelligence"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PROJECT_BUILDING_AI_IMAGE;
                }}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Expand Hint */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-[#080A09]/85 px-3.5 py-1.5 text-xs font-medium text-[#F4F1EA] backdrop-blur-md transition-colors group-hover:border-[#10B981]">
                <Eye className="h-3.5 w-3.5 text-[#10B981]" />
                <span>{t.sec1Expand}</span>
              </div>
            </div>

            {/* Content directly below visual */}
            <div className="max-w-4xl mx-auto text-center space-y-2 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F4F1EA] font-normal italic">
                {t.sec1VisualSub}
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                {t.sec1Desc1}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] leading-relaxed">
                {t.sec1Desc2}
              </p>
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 02 — FROM IDEA TO PRODUCT                                */}
        {/* Transition statement & minimal 6-stage product flow              */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-8 text-center">
            
            <div className="space-y-3 max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F1EA] font-normal leading-tight">
                {t.sec2Statement}
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                {t.sec2Desc}
              </p>
            </div>

            {/* 6-Stage Minimal Flow: CONVERSE → STRUCTURE → GENERATE → COMPARE → DECIDE → CONNECT */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
              {t.sec2Flow.map((step, idx) => (
                <div
                  key={step.label}
                  className="rounded-xl border border-[#0F5C46]/40 bg-[#101412] p-3.5 text-center space-y-1.5 hover:border-[#10B981]/50 transition-colors"
                >
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0F5C46]/30 text-[#10B981] border border-[#10B981]/30 mx-auto">
                    {step.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#F4F1EA] block tracking-wider">
                    {step.label}
                  </span>
                  <span className="font-sans text-[11px] text-[#A9AEA9] block leading-tight">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 03 — HOW THE PRODUCT WORKS                               */}
        {/* Large uncropped visual & 6 consistent stages                     */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#C7A35A] tracking-wider uppercase">
                {t.sec3Heading}
              </span>
            </div>

            {/* Click-to-expand Architecture Visual */}
            <div
              onClick={() =>
                setActiveImageModal({
                  src: image2Src,
                  title: 'AI Building Concept — How the Product Works',
                })
              }
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#148B78]/40 bg-[#101412] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#10B981] transition-all duration-300"
            >
              <img
                src={image2Src}
                alt="AI Building Concept — How the product is built: from conversation to data-driven building concepts"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PROJECT_BUILDING_AI_WORKFLOW;
                }}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Expand Hint */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-[#080A09]/85 px-3.5 py-1.5 text-xs font-medium text-[#F4F1EA] backdrop-blur-md transition-colors group-hover:border-[#10B981]">
                <Eye className="h-3.5 w-3.5 text-[#10B981]" />
                <span>{t.sec3Expand}</span>
              </div>
            </div>

            {/* Consistent 6 Steps Grid (01 to 06) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 max-w-6xl mx-auto">
              {t.sec3Steps.map((step) => (
                <div
                  key={step.num}
                  className="rounded-xl border border-[#0F5C46]/35 bg-[#101412]/80 p-4 space-y-1.5 hover:border-[#10B981]/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#10B981]">{step.num}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-medium text-[#F4F1EA]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-[#D1D5DB] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 04 — PRODUCT EXPERIENCE                                  */}
        {/* Clean overview of the 7 core modules (compact, not huge cards)   */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            
            <div className="text-center space-y-1">
              <span className="font-mono text-xs font-bold text-[#C7A35A] tracking-wider uppercase block">
                {t.sec4Heading}
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#A9AEA9]">
                {t.sec4Subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {t.sec4Modules.map((mod) => (
                <div
                  key={mod.title}
                  className="rounded-xl border border-[#0F5C46]/35 bg-[#101412] p-4 space-y-2 hover:border-[#C7A35A]/60 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {mod.icon}
                    <h3 className="font-mono text-xs font-bold text-[#F4F1EA] tracking-wider uppercase truncate">
                      {mod.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-[#D1D5DB] leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 05 — MY ROLE                                             */}
        {/* Role tags, descriptive narrative and prominent decision quote    */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase">
                {t.sec5Heading}
              </span>
            </div>

            {/* Highlight tags */}
            <div className="flex flex-wrap gap-2 text-xs">
              {t.sec5Tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[#0F5C46]/50 bg-[#101412] px-3 py-1 font-mono text-[11px] font-semibold text-[#10B981]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Narrative text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#D1D5DB] leading-relaxed pt-2">
              <p>{t.sec5P1}</p>
              <p>{t.sec5P2}</p>
            </div>

            {/* Prominent highlighted quote */}
            <div className="rounded-2xl border border-[#10B981]/50 bg-gradient-to-r from-[#0F5C46]/30 via-[#101412] to-[#080A09] p-6 sm:p-8 shadow-[0_10px_35px_rgba(16,185,129,0.15)] text-center">
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F4F1EA] font-normal leading-snug">
                {t.sec5Quote}
              </blockquote>
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 06 — PRODUCT THINKING                                    */}
        {/* Problem → Opportunity → Product → Value Hypothesis → Future      */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-10 sm:py-14 border-t border-[#C7A35A]/15">
          <div className="space-y-6">
            
            <div className="text-center space-y-1">
              <span className="font-mono text-xs font-bold text-[#C7A35A] tracking-wider uppercase block">
                {t.sec6Heading}
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#A9AEA9]">
                {t.sec6Subtitle}
              </p>
            </div>

            {/* Sequential Hypothesis Chain */}
            <div className="space-y-3 max-w-4xl mx-auto pt-2">
              {t.sec6Flow.map((item, idx) => (
                <React.Fragment key={item.tag}>
                  {idx > 0 && (
                    <div className="flex justify-center py-0.5">
                      <span className="font-mono text-xs text-[#10B981]">↓</span>
                    </div>
                  )}
                  <div className="rounded-xl border border-[#0F5C46]/40 bg-[#101412] p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="rounded bg-[#0F5C46]/30 border border-[#10B981]/40 px-2.5 py-1 font-mono text-[10px] font-bold text-[#10B981] uppercase tracking-wider shrink-0 text-center sm:w-36">
                      {item.tag}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>

          </div>
        </section>

        {/* ================================================================ */}
        {/* FINAL CLOSING CTA SECTION                                        */}
        {/* ================================================================ */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-14 pb-10 text-center space-y-6 border-t border-[#C7A35A]/15">
          
          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F1EA] font-normal tracking-tight max-w-3xl mx-auto leading-tight">
              {t.closingHeadline}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#D1D5DB]">
              {t.closingSub}
            </p>
          </div>

          <div>
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#0F5C46] px-8 py-4 font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#F4F1EA] uppercase shadow-[0_10px_35px_rgba(16,185,129,0.35)] hover:bg-[#10B981] hover:text-[#080A09] hover:shadow-[0_15px_45px_rgba(16,185,129,0.55)] transition-all duration-300"
            >
              <span>{t.ctaButton}</span>
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="pt-4 space-y-1 text-xs text-[#A9AEA9]">
            <p className="font-medium text-[#C7A35A]">{t.closingDisclaimer1}</p>
            <p className="text-[11px] max-w-xl mx-auto leading-relaxed">{t.closingDisclaimer2}</p>
          </div>

        </section>

        {/* ================================================================ */}
        {/* PROJECT NAVIGATION FOOTER                                        */}
        {/* ================================================================ */}
        <CaseStudyBottomNav
          currentLang={currentLang}
          allProjectsUrl="/projects"
          nextProjectUrl="/projects/circulartwin-ai"
          nextProjectTitle="CIRCULARTWIN AI"
          prevProjectUrl="/projects/circulartwin-ai"
          prevProjectTitle="CIRCULARTWIN AI"
        />

        {/* ================================================================ */}
        {/* FULLSCREEN LIGHTBOX MODAL FOR CASE STUDY VISUALS                 */}
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
