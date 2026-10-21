import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  Leaf,
  Users,
  Cpu,
  Box,
  Brain,
  Award,
  Sparkles,
  ArrowRight,
  Target,
  X,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { Language } from '../types';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { JOURNEY_LANDSCAPE_IMAGE, CV_FILE } from '../data/assetRegistry';

interface JourneyPageProps {
  currentLang: Language;
}

export const JourneyPage: React.FC<JourneyPageProps> = ({
  currentLang,
}) => {
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);
  const [isPathDrawn, setIsPathDrawn] = useState(false);
  const [detailModalStage, setDetailModalStage] = useState<any | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPathDrawn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const t = {
    de: {
      eyebrow: 'MY JOURNEY',
      headlinePart1: 'Unterschiedliche Disziplinen.',
      headlinePart2: 'Eine Richtung.',
      subheadline: 'Von Naturwissenschaft und Umweltschutz zu digitalen Produkten und KI.',
      certButton: 'ZERTIFIKATE →',
      closeModal: 'Schließen',
      stageLabelNow: 'NOW',
      formula: 'SCIENCE × ENVIRONMENT × BUSINESS × PRODUCT × AI',
      nextChapterLabel: 'Mein nächstes Kapitel:',
      nextChapterValue: 'KI- & IT-Produktmanagement',
      builtForImpactBadge: 'BUILT FOR IMPACT',
      impactEndpointLabel: 'WIRKUNG ●',
      closingStatementPart1: 'Wissenschaftlich ',
      closingStatementScience: 'fundiert.',
      closingStatementPart2: ' Für Menschen ',
      closingStatementPeople: 'gedacht.',
      closingStatementPart3: ' Für ',
      closingStatementImpact: 'Wirkung entwickelt.',
      detailModalSubtitle: 'Wie diese Disziplin mein heutiges Profil im IT- & KI-Produktmanagement prägt',
      modalPmTransferHeader: 'BEITRAG ZUM IT- & KI-PRODUKTMANAGEMENT',
      modalCompetenciesHeader: 'KERNKOMPETENZEN & METHODEN',
      stages: [
        {
          id: 'science',
          num: '01',
          headline: 'NATURWISSENSCHAFT',
          title: 'M.Sc. Chemie',
          shortDesc: 'Wissenschaftliches Denken wurde zum Fundament meines Ansatzes für komplexe Probleme.',
          skills: [
            'Analytisches Denken',
            'Forschung & Hypothesentests',
            'Dateninterpretation',
            'Evidenzbasierte Entscheidungen',
          ],
          keyword: 'ANALYSIEREN',
          extendedDetails:
            'Das Masterstudium der Chemie lehrte mich, komplexe Phänomene in empirische Modelle zu zerlegen, Versuchsreihen rigoros zu testen und Entscheidungen stets auf verifizierte Daten statt auf Bauchgefühl zu stützen.',
          pmTransfer:
            'Im Produktmanagement: Saubere Problemisolierung, Formulierung messbarer Hypothesen und zielgerichtete Quantitative Analytics.',
        },
        {
          id: 'environment',
          num: '02',
          headline: 'UMWELTSCHUTZ',
          title: 'Umweltmanagement & Nachhaltigkeit',
          shortDesc:
            'Anwendung naturwissenschaftlicher und analytischer Methoden auf Umweltwirkungen, Compliance, Ressourceneffizienz und nachhaltige Entscheidungsprozesse.',
          skillsHighlight: 'UVP / LCA / COMPLIANCE',
          skills: [
            'Umweltverträglichkeitsprüfung (UVP)',
            'Life Cycle Assessment (LCA)',
            'Umweltmanagement',
            'Compliance & ISO 14001',
            'Ressourceneffizienz & Kreislaufwirtschaft',
          ],
          keyword: 'VERSTEHEN',
          extendedDetails:
            'Postgraduale Vertiefung und praktische Tätigkeit im Umweltschutz: Stoffkreisläufe, Umweltverträglichkeitsprüfungen (UVP), Life Cycle Assessments (LCA), Genehmigungsverfahren, regulatorische Anforderungen und die Abwägung technischer Machbarkeit gegen ökologische Verantwortung.',
          pmTransfer:
            'Systemisches Denken: Jede Funktion in einer Software ist Teil eines vernetzten Ökosystems mit Abhängigkeiten und Schnittstellen. Datenbasierte Ökobilanzierung und Compliance-Modelle lassen sich direkt auf digitale ESG- und Produkt-Passport-Architekturen übertragen.',
        },
        {
          id: 'business',
          num: '03',
          headline: 'UNTERNEHMERTUM',
          title: 'Unternehmerische Ownership',
          shortDesc:
            'Verantwortung in Entscheidungen übersetzen und verstehen, wie Kundenwert und Business zusammenwirken.',
          skills: [
            'Customer Discovery',
            'Wirtschaftlichkeit & P&L',
            'Volle Eigenverantwortung',
            'Priorisierung & Trade-offs',
          ],
          keyword: 'ENTSCHEIDEN',
          extendedDetails:
            'Eigenverantwortliche unternehmerische Tätigkeit mit voller Budget-, Marketing- und Ergebnisverantwortung. Direkter Kundenkontakt und die tägliche Realität von Angebot, Nachfrage und Wirtschaftlichkeit.',
          pmTransfer:
            'Unternehmerisches Gespür: Ein Produkt ist erst dann erfolgreich, wenn es echten Kundenwert stiftet und gleichzeitig ökonomisch tragfähig ist.',
        },
        {
          id: 'digital',
          num: '04',
          headline: 'DIGITALE TRANSFORMATION',
          title: 'Digital Transformation Managerin (IHK)',
          shortDesc:
            'Fachdomänen mit moderner Technologie, Cloud-Workflows und KI-Potenzialen verbinden.',
          skills: [
            'Digitale Strategie',
            'KI-Prozessautomatisierung',
            'Cloud- & Schnittstellen-Workflows',
            'Agiles Change Management',
          ],
          keyword: 'TRANSFORMIEREN',
          extendedDetails:
            'Zertifizierung und Praxisprojekte: Übersetzung gewachsener Geschäftsabläufe in moderne digitale Workflows, Evaluierung von KI-Potenzialen und Etablierung agiler Arbeitsmethoden.',
          pmTransfer:
            'Die Brücke zwischen Fachbereich und IT: Technologie dort gezielt einsetzen, wo sie Reibungsverluste beseitigt und Skalierbarkeit ermöglicht.',
        },
        {
          id: 'product',
          num: '05',
          headline: 'PRODUKTMANAGEMENT',
          title: 'IT-Produktmanagement',
          shortDesc:
            'Komplexe Probleme in nutzerzentrierte, testbare und skalierbare digitale Produkte übersetzen.',
          skills: [
            'Product Discovery & Research',
            'User Journeys & Wireframing',
            'MVP-Prototyping & Validierung',
            'Agile Sprints & Roadmaps',
          ],
          keyword: 'GESTALTEN',
          extendedDetails:
            'Fokussierte IT-Produktkonzeption: Problem Discovery, Nutzertests, User Stories, Backlog Governance, Sprint-Begleitung und Prototyping mit modernen No-Code- & Webtechnologien.',
          pmTransfer:
            'End-to-End Product Craft: Vom tiefen Nutzerverständnis über schnelle Prototypen-Validierung bis zur skalierbaren Produktarchitektur.',
        },
        {
          id: 'ai',
          num: '06',
          headline: 'KI & IT-PRODUKTMANAGEMENT',
          title: 'Hier läuft alles zusammen.',
          shortDesc:
            'Wissenschaft, Umwelt, Business und Produkt bündeln, um intelligente digitale Lösungen zu entwickeln.',
          skillsHighlight: 'SCIENCE × ENVIRONMENT × BUSINESS × PRODUCT × AI',
          callout: 'Mein nächstes Kapitel: KI- & IT-Produktmanagement',
          keyword: 'WIRKUNG',
          extendedDetails:
            'Die Konvergenz aller Disziplinen: Die analytische Tiefe der Chemie, das vernetzte Systemdenken der Umweltwissenschaften, die pragmatische Umsetzungsstärke des Unternehmertums und moderne Product-Management-Frameworks verschmelzen zu einem einzigartigen Profil für die Gestaltung intelligenter KI- & Softwareprodukte.',
          pmTransfer:
            'Wettbewerbsvorteil: Komplexe Fachdomänen mühelos verstehen, mit Software-Ingenieuren auf Augenhöhe sprechen und zukunftsfähige KI-Produkte auf die Straße bringen.',
        },
      ],
    },
    en: {
      eyebrow: 'MY JOURNEY',
      headlinePart1: 'Different disciplines.',
      headlinePart2: 'One direction.',
      subheadline: 'From science and environmental expertise to digital products and AI.',
      certButton: 'CERTIFICATES →',
      closeModal: 'Close',
      stageLabelNow: 'NOW',
      formula: 'SCIENCE × ENVIRONMENT × BUSINESS × PRODUCT × AI',
      nextChapterLabel: 'My next chapter:',
      nextChapterValue: 'AI & IT Product Management',
      builtForImpactBadge: 'BUILT FOR IMPACT',
      impactEndpointLabel: 'IMPACT ●',
      closingStatementPart1: 'Powered by ',
      closingStatementScience: 'Science.',
      closingStatementPart2: ' Inspired by ',
      closingStatementPeople: 'People.',
      closingStatementPart3: ' Built for ',
      closingStatementImpact: 'Impact.',
      detailModalSubtitle: 'How this discipline shapes my modern IT & AI Product Management profile',
      modalPmTransferHeader: 'IMPACT ON IT & AI PRODUCT MANAGEMENT',
      modalCompetenciesHeader: 'CORE COMPETENCIES & METHODS',
      stages: [
        {
          id: 'science',
          num: '01',
          headline: 'SCIENCE',
          title: 'M.Sc. Chemistry',
          shortDesc: 'Scientific thinking became the foundation of how I approach complex problems.',
          skills: [
            'Analytical Thinking',
            'Research & Testing',
            'Data Interpretation',
            'Evidence-Based Decisions',
          ],
          keyword: 'ANALYZE',
          extendedDetails:
            'My Master of Science in Chemistry trained me to deconstruct intricate physical phenomena into verifiable models, run iterative experiments, and ground all judgments in empirical proof rather than intuition.',
          pmTransfer:
            'In Product Management: Rigorous root-cause isolation, testable hypothesis construction, and decisive quantitative product analytics.',
        },
        {
          id: 'environment',
          num: '02',
          headline: 'ENVIRONMENTAL PROTECTION',
          title: 'Environmental Management & Sustainability',
          shortDesc:
            'Applying scientific and analytical thinking to environmental impact, compliance, resource efficiency and sustainable decision-making.',
          skillsHighlight: 'EIA / LCA / COMPLIANCE',
          skills: [
            'Environmental Impact Assessment (EIA)',
            'Life Cycle Assessment (LCA)',
            'Environmental Management',
            'Compliance & ISO 14001',
            'Resource Efficiency & Circularity',
          ],
          keyword: 'UNDERSTAND',
          extendedDetails:
            'Postgraduate study and practical execution in environmental assessment: material lifecycles, Environmental Impact Assessments (EIA), Life Cycle Assessments (LCA), regulatory compliance mandates, and ISO 14001 standards.',
          pmTransfer:
            'Holistic Systems Thinking: Recognizing that every software feature ripples through an interconnected technical, operational, and organizational ecosystem. Translating environmental impact metrics directly into digital ESG and Product Passport architectures.',
        },
        {
          id: 'business',
          num: '03',
          headline: 'ENTREPRENEURIAL EXPERIENCE',
          title: 'Entrepreneurial Ownership',
          shortDesc:
            'Turning responsibility into decisions and understanding how customer value and business reality connect.',
          skills: [
            'Customer Discovery',
            'Business Viability & P&L',
            'Full Ownership & Agency',
            'Prioritization & Trade-offs',
          ],
          keyword: 'DECIDE',
          extendedDetails:
            'Direct entrepreneurial leadership with full accountability across budgets, marketing, customer discovery, and P&L. Translating personal initiative into sustainable business outcomes.',
          pmTransfer:
            'Commercial Pragmatism: A digital product succeeds only when genuine user utility converges with clear financial viability and unit economics.',
        },
        {
          id: 'digital',
          num: '04',
          headline: 'DIGITAL TRANSFORMATION',
          title: 'Digital Transformation Manager (IHK)',
          shortDesc:
            'Connecting domain expertise with modern technology, cloud workflows and AI potentials.',
          skills: [
            'Digital Strategy',
            'AI & Process Automation',
            'Cloud & API Workflows',
            'Agile Change Management',
          ],
          keyword: 'TRANSFORM',
          extendedDetails:
            'Formal certification and applied transformation: Translating traditional operating workflows into cloud toolchains, evaluating artificial intelligence opportunities, and championing agile frameworks.',
          pmTransfer:
            'The Human-Tech Bridge: Deploying emerging technologies specifically where they eliminate friction, streamline cross-functional handoffs, and unlock scale.',
        },
        {
          id: 'product',
          num: '05',
          headline: 'PRODUCT MANAGEMENT',
          title: 'IT Product Management',
          shortDesc:
            'Turning complex problems into user-centered, testable and scalable digital products.',
          skills: [
            'Product Discovery & Research',
            'User Journeys & Wireframing',
            'MVP Prototyping & Validation',
            'Agile Sprints & Roadmaps',
          ],
          keyword: 'BUILD',
          extendedDetails:
            'Structured digital product craft: Problem validation, user interviews, backlog grooming, cross-functional sprints, user stories, and interactive prototype testing.',
          pmTransfer:
            'End-to-End Craftsmanship: From uncovering genuine customer pain points to rapid prototype iteration and roadmap governance.',
        },
        {
          id: 'ai',
          num: '06',
          headline: 'AI & IT PRODUCT MANAGEMENT',
          title: 'Where everything connects.',
          shortDesc:
            'Combining science, environment, business and product to build intelligent digital solutions.',
          skillsHighlight: 'SCIENCE × ENVIRONMENT × BUSINESS × PRODUCT × AI',
          callout: 'My next chapter: AI & IT Product Management',
          keyword: 'IMPACT',
          extendedDetails:
            'The convergence of all prior paths: Scientific empirical discipline, complex ecosystem thinking, commercial customer ownership, and agile product design fuse into a high-leverage profile built to shape modern AI & software applications.',
          pmTransfer:
            'Unique Competitive Advantage: Navigating complex technical and regulatory domains effortlessly, collaborating with engineering peers as equals, and shipping intelligent software.',
        },
      ],
    },
    pl: {
      eyebrow: 'MY JOURNEY',
      headlinePart1: 'Różne dyscypliny.',
      headlinePart2: 'Jeden kierunek.',
      subheadline: 'Od nauk ścisłych i ochrony środowiska po produkty cyfrowe i sztuczną inteligencję.',
      certButton: 'CERTYFIKATY →',
      closeModal: 'Zamknij',
      stageLabelNow: 'NOW',
      formula: 'SCIENCE × ENVIRONMENT × BUSINESS × PRODUCT × AI',
      nextChapterLabel: 'Mój kolejny rozdział:',
      nextChapterValue: 'Zarządzanie produktami AI & IT',
      builtForImpactBadge: 'BUILT FOR IMPACT',
      impactEndpointLabel: 'WPŁYW ●',
      closingStatementPart1: 'Oparte na ',
      closingStatementScience: 'nauce.',
      closingStatementPart2: ' Inspirowane ',
      closingStatementPeople: 'ludźmi.',
      closingStatementPart3: ' Tworzone z myślą o ',
      closingStatementImpact: 'realnym wpływie.',
      detailModalSubtitle: 'Jak ta dyscyplina kształtuje mój profil w zarządzaniu produktami IT i AI',
      modalPmTransferHeader: 'WPŁYW NA ZARZĄDZANIE PRODUKTAMI IT & AI',
      modalCompetenciesHeader: 'KLUCZOWE KOMPETENCJE I METODY',
      stages: [
        {
          id: 'science',
          num: '01',
          headline: 'NAUKA',
          title: 'M.Sc. Chemia',
          shortDesc:
            'Myślenie naukowe stało się fundamentem mojego podejścia do rozwiązywania złożonych problemów.',
          skills: [
            'Myślenie analityczne',
            'Badania i testowanie hipotez',
            'Interpretacja danych',
            'Decyzje oparte na faktach',
          ],
          keyword: 'ANALIZOWAĆ',
          extendedDetails:
            'Studia magisterskie z chemii nauczyły mnie dekomponować złożone zjawiska na modele empiryczne, przeprowadzać rygorystyczne testy i podejmować decyzje w oparciu o fakty.',
          pmTransfer:
            'W zarządzaniu produktem: precyzyjna diagnoza problemu, formułowanie mierzalnych hipotez oraz analityka ilościowa.',
        },
        {
          id: 'environment',
          num: '02',
          headline: 'OCHRONA ŚRODOWISKA',
          title: 'Zarządzanie środowiskowe i zrównoważony rozwój',
          shortDesc:
            'Wykorzystanie naukowego i analitycznego podejścia do oceny wpływu na środowisko, zgodności, efektywności zasobów i zrównoważonego podejmowania decyzji.',
          skillsHighlight: 'OOŚ / LCA / COMPLIANCE',
          skills: [
            'Ocena oddziaływania na środowisko (OOŚ)',
            'Ocena cyklu życia (LCA)',
            'Zarządzanie środowiskowe',
            'Zgodność i ISO 14001',
            'Efektywność zasobów i gospodarka o obiegu zamkniętym',
          ],
          keyword: 'ZROZUMIEĆ',
          extendedDetails:
            'Studia podyplomowe i praktyka w ochronie środowiska: oceny oddziaływania na środowisko (OOŚ), oceny cyklu życia (LCA), obieg zamknięty, procedury zgodności regulacyjnej i normy ISO 14001.',
          pmTransfer:
            'Myślenie systemowe: każda funkcja oprogramowania jest elementem większego ekosystemu ze złożonymi współzależnościami. Doświadczenie w OOŚ i LCA przekłada się bezpośrednio na cyfrowe paszporty produktów i moduły compliance ESG.',
        },
        {
          id: 'business',
          num: '03',
          headline: 'PRZEDSIĘBIORCZOŚĆ',
          title: 'Odpowiedzialność biznesowa',
          shortDesc:
            'Przekładanie odpowiedzialności na decyzje oraz zrozumienie wartości dla klienta i realiów rynkowych.',
          skills: [
            'Customer Discovery',
            'Rentowność i P&L',
            'Pełna odpowiedzialność (Ownership)',
            'Priorytetyzacja i kompromisy',
          ],
          keyword: 'DECYDOWAĆ',
          extendedDetails:
            'Samodzielne prowadzenie działalności z pełną odpowiedzialnością za budżet, relacje z klientami i rentowność.',
          pmTransfer:
            'Pragmatyzm biznesowy: produkt cyfrowy ma sens tylko wtedy, gdy realnie rozwiązuje problem klienta i przynosi mierzalną wartość.',
        },
        {
          id: 'digital',
          num: '04',
          headline: 'TRANSFORMACJA CYFROWA',
          title: 'Digital Transformation Manager (IHK)',
          shortDesc:
            'Łączenie wiedzy dziedzinowej z nowoczesną technologią, procesami chmurowymi i potencjałem AI.',
          skills: [
            'Strategia cyfrowa',
            'AI i automatyzacja procesów',
            'Integracje Cloud i API',
            'Zwinne zarządzanie zmianą',
          ],
          keyword: 'TRANSFORMOWAĆ',
          extendedDetails:
            'Certyfikacja IHK i projekty transformacyjne: modernizacja procesów, wdrażanie narzędzi cyfrowych i adaptacja AI.',
          pmTransfer:
            'Pomost człowiek–technologia: wdrażanie innowacji tam, gdzie faktycznie usuwają bariery operacyjne i budują skalę.',
        },
        {
          id: 'product',
          num: '05',
          headline: 'ZARZĄDZANIE PRODUKTEM',
          title: 'Zarządzanie Produktami IT',
          shortDesc:
            'Przekształcanie złożonych wyzwań w zorientowane na użytkownika, skalowalne produkty cyfrowe.',
          skills: [
            'Product Discovery i Research',
            'Ścieżki użytkownika (User Journeys)',
            'Prototypowanie MVP i walidacja',
            'Zwinne sprinty i Roadmapy',
          ],
          keyword: 'TWORZYĆ',
          extendedDetails:
            'Strukturalny warsztat zarządzania produktem: wywiady z użytkownikami, priorytetyzacja backlogu, User Stories i prototypowanie.',
          pmTransfer:
            'End-to-End Product Craft: od odkrycia problemu przez szybkie prototypy po stabilne zarządzanie cyklem życia produktu.',
        },
        {
          id: 'ai',
          num: '06',
          headline: 'ZARZĄDZANIE PRODUKTAMI AI & IT',
          title: 'Punkt, w którym wszystko się łączy.',
          shortDesc:
            'Łączę naukę, środowisko, biznes i produkt, tworząc inteligentne rozwiązania cyfrowe.',
          skillsHighlight: 'SCIENCE × ENVIRONMENT × BUSINESS × PRODUCT × AI',
          callout: 'Mój kolejny rozdział: Zarządzanie produktami AI & IT',
          keyword: 'WPŁYW',
          extendedDetails:
            'Punkt zbieżny całej drogi: empiryczna dyscyplina chemii, myślenie systemowe, odpowiedzialność biznesowa i nowoczesne ramy produktowe.',
          pmTransfer:
            'Przewaga rynkowa: swoboda w poruszaniu się po złożonych domenach technicznych i skupienie na realnym wpływie.',
        },
      ],
    },
  }[currentLang];

  const getNodeIcon = (id: string, isHighlighted: boolean) => {
    switch (id) {
      case 'science':
        return (
          <FlaskConical
            className={`h-4 w-4 transition-transform duration-300 ${
              isHighlighted ? 'scale-110 text-[#10B981]' : 'text-[#F4F1EA]'
            }`}
          />
        );
      case 'environment':
        return (
          <Leaf
            className={`h-4 w-4 transition-transform duration-300 ${
              isHighlighted ? 'scale-110 text-[#10B981]' : 'text-[#F4F1EA]'
            }`}
          />
        );
      case 'business':
        return (
          <Users
            className={`h-4 w-4 transition-transform duration-300 ${
              isHighlighted ? 'scale-110 text-[#10B981]' : 'text-[#F4F1EA]'
            }`}
          />
        );
      case 'digital':
        return (
          <Cpu
            className={`h-4 w-4 transition-transform duration-300 ${
              isHighlighted ? 'scale-110 text-[#10B981]' : 'text-[#F4F1EA]'
            }`}
          />
        );
      case 'product':
        return (
          <Box
            className={`h-4 w-4 transition-transform duration-300 ${
              isHighlighted ? 'scale-110 text-[#10B981]' : 'text-[#F4F1EA]'
            }`}
          />
        );
      case 'ai':
        return (
          <Brain
            className={`h-5 w-5 transition-transform duration-300 ${
              isHighlighted ? 'scale-115 text-[#D6B15E]' : 'text-[#10B981]'
            }`}
          />
        );
      default:
        return <Sparkles className="h-4 w-4 text-[#10B981]" />;
    }
  };

  // The complete continuous path connecting 01 to 06 in the empty visual clearance around the icons,
  // then curving right and down along the outer margin into the gold IMPACT endpoint
  const fullBackbonePath =
    'M 100 28 C 160 28, 240 26, 300 28 C 360 28, 440 30, 500 28 C 560 28, 640 26, 700 28 C 760 28, 840 30, 900 28 C 960 28, 1040 27, 1100 28 C 1145 28, 1175 38, 1184 65 C 1188 95, 1188 180, 1188 260 C 1188 305, 1188 330, 1188 350';

  return (
    <PageTransition>
      {/* 
        ========================================================================
        EXACT 3-ZONE DESKTOP STRUCTURE
        Strictly fits inside ONE viewport on desktop (calc(100vh - 3.5rem))
        Continuous Flowing Journey Line: Emerald -> Green/Gold -> Warm Gold -> Curved Downward
        ========================================================================
      */}
      <div className="relative w-full h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] overflow-hidden bg-[#080A09] text-[#F4F1EA] selection:bg-[#0F5C46] selection:text-[#D6B15E] flex flex-col justify-between">
        
        {/* Subtle Ambient Background Light */}
        <div className="pointer-events-none absolute top-4 left-1/4 -translate-x-1/2 h-64 w-64 rounded-full bg-[#10B981]/8 blur-[120px]" />
        <div className="pointer-events-none absolute top-8 right-1/4 h-64 w-64 rounded-full bg-[#D6B15E]/10 blur-[120px]" />

        {/* ============================================================ */}
        {/* ZONE 1 — HEADER (Max approx 18-20vh)                         */}
        {/* ============================================================ */}
        <header className="relative z-20 h-[18vh] max-h-[18vh] min-h-[85px] px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex flex-col justify-center text-center shrink-0">
          
          {/* Top micro eyebrow & action links */}
          <div className="flex items-center justify-between gap-4 mb-1 max-w-4xl mx-auto w-full border-b border-[#D6B15E]/20 pb-1">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <BackToPortfolio currentLang={currentLang} className="!py-0 text-[10px]" />
              <span className="hidden sm:inline-block text-[#D6B15E]/30">·</span>
              <div className="hidden sm:flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#D6B15E] uppercase">
                  {t.eyebrow}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-sans tracking-wider uppercase text-[#D1D5DB]">
              <a
                href={CV_FILE}
                target="_blank"
                rel="noopener noreferrer"
                download="Natalia_Stachowiak_CV_grafisch_FINAL_2026.pdf"
                className="group flex items-center gap-1.5 text-[#D1D5DB] hover:text-[#D6B15E] transition-colors focus:outline-none"
              >
                <Download className="h-3 w-3 text-[#D6B15E]" />
                <span className="underline-offset-4 group-hover:underline">
                  CV herunterladen
                </span>
              </a>
              <Link
                to="/certificates"
                className="group flex items-center gap-1.5 text-[#D1D5DB] hover:text-[#10B981] transition-colors"
              >
                <Award className="h-3 w-3 text-[#10B981]" />
                <span className="underline-offset-4 group-hover:underline">
                  {t.certButton}
                </span>
              </Link>
            </div>
          </div>

          {/* Large centered headline */}
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight leading-tight">
            <span className="text-[#F4F1EA]">{t.headlinePart1} </span>
            <span className="text-[#10B981] drop-shadow-[0_0_15px_rgba(16,185,129,0.35)]">
              {t.headlinePart2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] max-w-2xl mx-auto leading-relaxed mt-0.5 line-clamp-1">
            {t.subheadline}
          </p>
        </header>

        {/* ============================================================ */}
        {/* ZONE 2 — SIX-COLUMN JOURNEY (Approx 58-60vh)                 */}
        {/* ONE unified horizontal composition with continuous background */}
        {/* 01 | 02 | 03 | 04 | 05 | 06 visible simultaneously           */}
        {/* ============================================================ */}
        <section className="relative z-10 h-[62vh] max-h-[62vh] min-h-[350px] w-full max-w-[1720px] mx-auto px-2 sm:px-4 flex flex-col justify-center my-auto overflow-x-auto sm:overflow-x-visible">
          
          {/* Unified Container with continuous background */}
          <div className="relative w-full min-w-[860px] sm:min-w-full h-full rounded-2xl border border-[#0F5C46]/35 bg-[#080A09] overflow-hidden flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
            
            {/* Cinematic Background spanning all 6 columns */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src={JOURNEY_LANDSCAPE_IMAGE}
                alt="Continuous Career Evolution"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = JOURNEY_LANDSCAPE_IMAGE;
                }}
                className="w-full h-full object-cover object-center filter brightness-[0.52] contrast-[1.15]"
              />
              {/* Strong Dark Overlays to ensure high text contrast */}
              <div className="absolute inset-0 bg-[#080A09]/75 backdrop-blur-[1px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#080A09]/90 via-[#080A09]/60 to-[#080A09]/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080A09]/95 via-transparent to-[#080A09]/95" />
            </div>

            {/* Continuous Elegant Journey Path (SVG) through all 6 columns, continuing right and curving downward into GOLD */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1200 400"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Evolution from EMERALD -> GREEN+GOLD -> WARM GOLD */}
                <linearGradient id="journeyBackboneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                  <stop offset="28%" stopColor="#10B981" stopOpacity="1" />
                  <stop offset="52%" stopColor="#148B78" stopOpacity="1" />
                  <stop offset="70%" stopColor="#C7A35A" stopOpacity="1" />
                  <stop offset="84%" stopColor="#D6B15E" stopOpacity="1" />
                  <stop offset="100%" stopColor="#E8D39A" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="convergenceFilamentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#148B78" stopOpacity="0.1" />
                  <stop offset="65%" stopColor="#10B981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D6B15E" stopOpacity="0.8" />
                </linearGradient>

                <filter id="emeraldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="goldGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Convergence Filaments into Node 06 (positioned in empty visual space at top Y=10 to Y=26, away from all text) */}
              <path
                d="M 100 24 C 350 10, 800 10, 1100 24"
                fill="none"
                stroke="url(#convergenceFilamentGrad)"
                strokeWidth="1.1"
                strokeDasharray="4 4"
                opacity={isPathDrawn ? 0.45 : 0}
                className="transition-opacity duration-1000"
              />
              <path
                d="M 300 24 C 500 12, 850 12, 1100 24"
                fill="none"
                stroke="url(#convergenceFilamentGrad)"
                strokeWidth="1.1"
                strokeDasharray="3 3"
                opacity={isPathDrawn ? 0.5 : 0}
                className="transition-opacity duration-1000 delay-100"
              />
              <path
                d="M 500 25 C 700 14, 900 14, 1100 25"
                fill="none"
                stroke="url(#convergenceFilamentGrad)"
                strokeWidth="1.1"
                strokeDasharray="4 3"
                opacity={isPathDrawn ? 0.55 : 0}
                className="transition-opacity duration-1000 delay-200"
              />
              <path
                d="M 700 25 C 850 16, 980 16, 1100 25"
                fill="none"
                stroke="url(#convergenceFilamentGrad)"
                strokeWidth="1.2"
                opacity={isPathDrawn ? 0.6 : 0}
                className="transition-opacity duration-1000 delay-300"
              />
              <path
                d="M 900 26 C 970 20, 1030 20, 1100 26"
                fill="none"
                stroke="url(#convergenceFilamentGrad)"
                strokeWidth="1.3"
                opacity={isPathDrawn ? 0.65 : 0}
                className="transition-opacity duration-1000 delay-400"
              />

              {/* Main Organic Backbone Line: 01 ── 02 ── 03 ── 04 ── 05 ── 06 ──╮
                                                                                   │
                                                                                   ● IMPACT */}
              <path
                d={fullBackbonePath}
                fill="none"
                stroke="url(#journeyBackboneGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#emeraldGlowFilter)"
                style={{
                  strokeDasharray: 1600,
                  strokeDashoffset: isPathDrawn ? 0 : 1600,
                  transition: 'stroke-dashoffset 2.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />

              {/* Final Illuminated Gold Endpoint: Connected to BUILT FOR IMPACT */}
              {isPathDrawn && (
                <g className="transition-opacity duration-700 delay-1000">
                  {/* Subtle ping pulse */}
                  <circle
                    cx="1188"
                    cy="350"
                    r="9"
                    fill="none"
                    stroke="#D6B15E"
                    strokeWidth="1"
                    opacity="0.5"
                    className="animate-ping"
                  />
                  {/* Outer glowing halo */}
                  <circle
                    cx="1188"
                    cy="350"
                    r="5.5"
                    fill="#D6B15E"
                    filter="url(#goldGlowFilter)"
                  />
                  {/* Core white-gold light */}
                  <circle cx="1188" cy="350" r="2.5" fill="#FFF8E7" />
                  
                  {/* Subtle micro label in SVG */}
                  <text
                    x="1176"
                    y="374"
                    textAnchor="end"
                    fill="#E8D39A"
                    fontSize="8.5"
                    fontWeight="bold"
                    letterSpacing="0.12em"
                    className="font-mono uppercase opacity-90 select-none"
                  >
                    {t.impactEndpointLabel}
                  </text>
                </g>
              )}

              {/* Traveling Light Pulse moving through all disciplines to the final gold endpoint */}
              {isPathDrawn && (
                <circle r="3.5" fill="#E8D39A" filter="url(#goldGlowFilter)">
                  <animateMotion
                    path={fullBackbonePath}
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </svg>

            {/* THE SIX-COLUMN GRID (01 | 02 | 03 | 04 | 05 | 06 side-by-side) */}
            <div className="relative z-20 grid grid-cols-6 divide-x divide-[#0F5C46]/25 w-full h-full p-2 sm:p-3 items-stretch">
              {t.stages.map((stage) => {
                const isNow = stage.id === 'ai';
                const isHovered = hoveredStageId === stage.id;

                return (
                  <div
                    key={stage.id}
                    onMouseEnter={() => setHoveredStageId(stage.id)}
                    onMouseLeave={() => setHoveredStageId(null)}
                    onClick={() => setDetailModalStage(stage)}
                    className={`group relative px-2 xl:px-3 py-1.5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      isHovered ? 'bg-[#101412]/50' : 'bg-transparent'
                    }`}
                  >
                    
                    {/* TOP SECTION: Node & Headlines */}
                    <div className="space-y-1">
                      
                      {/* Node on the connecting line - Exactly centered at icon level over the Journey line */}
                      <div className="flex justify-center items-center h-8 sm:h-9 relative z-20">
                        <div
                          className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
                            isNow
                              ? 'h-9 w-9 bg-[#080A09] border-2 border-[#D6B15E] shadow-[0_0_18px_rgba(214,177,94,0.6)] group-hover:scale-110'
                              : isHovered
                              ? 'h-8 w-8 bg-[#080A09] border-2 border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.7)] scale-105'
                              : 'h-8 w-8 bg-[#080A09] border border-[#0F5C46]/80 shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:border-[#10B981]'
                          }`}
                        >
                          {isNow && (
                            <div className="absolute -inset-1 rounded-full border border-[#D6B15E]/50 animate-ping pointer-events-none" />
                          )}
                          {getNodeIcon(stage.id, isHovered)}
                        </div>
                      </div>

                      {/* Content Section - Strictly below the Journey line, completely readable */}
                      <div className="relative z-30 pt-1 space-y-1">
                        {/* Stage Number & Badge */}
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`font-mono text-xs font-bold tracking-wider ${
                              isNow ? 'text-[#D6B15E]' : 'text-[#10B981]'
                            }`}
                          >
                            {stage.num}
                          </span>
                          {isNow && (
                            <span className="rounded bg-[#D6B15E] px-1 py-0.2 font-mono text-[8px] font-bold text-[#080A09] uppercase tracking-wider">
                              {t.stageLabelNow}
                            </span>
                          )}
                        </div>

                        {/* Stage Headline & Role Title */}
                        <div>
                          <h2 className="font-serif text-xs xl:text-[13px] font-semibold text-[#F4F1EA] tracking-tight leading-snug line-clamp-1">
                            {stage.headline}
                          </h2>
                          {stage.title && (
                            <p className="font-sans text-[10px] xl:text-[11px] font-medium text-[#D6B15E] leading-tight line-clamp-1 mt-0.5">
                              {stage.title}
                            </p>
                          )}
                        </div>

                        {/* Short Description */}
                        <p className="font-sans text-[10px] xl:text-[11px] text-[#A9AEA9] leading-tight line-clamp-2">
                          {stage.shortDesc}
                        </p>

                        {/* Skills highlight for Environment or AI */}
                        {stage.skillsHighlight && (
                          <div className="pt-0.5">
                            <span className="font-mono text-[9px] font-bold text-[#10B981] uppercase tracking-wider block truncate">
                              {stage.skillsHighlight}
                            </span>
                          </div>
                        )}

                        {/* Compact Skill Lines */}
                        {stage.skills && (
                          <div className="space-y-0.5 pt-1">
                            {stage.skills.map((skill: string) => (
                              <div
                                key={skill}
                                className="flex items-center gap-1.5 text-[9px] xl:text-[10px] text-[#D1D5DB] leading-tight truncate"
                              >
                                <span className="h-1 w-1 rounded-full bg-[#10B981]/70 shrink-0" />
                                <span className="truncate">{skill}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Column 6 Callout: Next chapter */}
                        {stage.callout && (
                          <div className="pt-1">
                            <div className="rounded border border-[#D6B15E]/50 bg-[#101412]/80 px-1.5 py-1 text-[9px] xl:text-[10px] text-[#F4F1EA] flex items-center gap-1.5">
                              <Target className="h-3 w-3 text-[#D6B15E] shrink-0" />
                              <span className="font-sans font-medium truncate">{stage.callout}</span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* BOTTOM SECTION: Keyword (ANALYSIEREN / VERSTEHEN / etc.) */}
                    <div className="pt-1.5 border-t border-[#0F5C46]/20 flex items-center justify-between">
                      <span
                        className={`font-mono text-[9px] xl:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                          isNow ? 'text-[#D6B15E]' : 'text-[#10B981]'
                        }`}
                      >
                        {stage.keyword}
                      </span>
                      <ArrowRight className="h-2.5 w-2.5 text-[#A9AEA9] group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* ZONE 3 — BOTTOM (Approx 15-18vh)                             */}
        {/* Progression bar and final micro-statement connected to GOLD  */}
        {/* ============================================================ */}
        <footer className="relative z-20 h-[16vh] max-h-[16vh] min-h-[75px] px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col justify-center text-center shrink-0 space-y-1.5">
          
          {/* Progression Bar: ANALYSIEREN → VERSTEHEN → ENTSCHEIDEN → TRANSFORMIEREN → GESTALTEN → WIRKUNG */}
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-3 rounded-lg border border-[#0F5C46]/40 bg-[#101412]/90 px-3 sm:px-6 py-1.5 backdrop-blur-md shadow-md mx-auto">
            {[
              { keyword: t.stages[0].keyword, id: 'science' },
              { keyword: t.stages[1].keyword, id: 'environment' },
              { keyword: t.stages[2].keyword, id: 'business' },
              { keyword: t.stages[3].keyword, id: 'digital' },
              { keyword: t.stages[4].keyword, id: 'product' },
              { keyword: t.stages[5].keyword, id: 'ai' },
            ].map((step, idx) => (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <span className="text-[#10B981]/50 font-mono text-[9px] sm:text-[10px]" aria-hidden="true">
                    →
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const st = t.stages.find((s) => s.id === step.id);
                    if (st) setDetailModalStage(st);
                  }}
                  className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase transition-colors ${
                    step.id === 'ai'
                      ? 'text-[#D6B15E] hover:underline'
                      : 'text-[#D1D5DB] hover:text-[#10B981]'
                  }`}
                >
                  {step.keyword}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Micro-statement: Powered by Science. Inspired by People. Built for Impact. */}
          <h2 className="font-serif text-base sm:text-lg lg:text-xl text-[#F4F1EA] font-normal tracking-tight">
            <span>{t.closingStatementPart1}</span>
            <span className="text-[#10B981] font-medium drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]">
              {t.closingStatementScience}
            </span>
            <span>{t.closingStatementPart2}</span>
            <span className="text-[#F4F1EA] font-medium">
              {t.closingStatementPeople}
            </span>
            <span>{t.closingStatementPart3}</span>
            <span className="text-[#D6B15E] font-medium drop-shadow-[0_0_14px_rgba(214,177,94,0.45)]">
              {t.closingStatementImpact}
            </span>
          </h2>

        </footer>

        {/* ============================================================ */}
        {/* INTERACTIVE STAGE DETAIL MODAL (Deep dive on demand)         */}
        {/* ============================================================ */}
        {detailModalStage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080A09]/85 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setDetailModalStage(null)}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl border border-[#D6B15E]/50 bg-[#101412] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setDetailModalStage(null)}
                className="absolute top-4 right-4 rounded-full p-1.5 text-[#A9AEA9] hover:bg-[#080A09] hover:text-[#F4F1EA] transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] tracking-wider uppercase">
                  <span>{detailModalStage.num}</span>
                  <span>·</span>
                  <span>{detailModalStage.keyword}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">
                  {detailModalStage.headline}
                </h3>
                {detailModalStage.title && (
                  <p className="font-sans text-xs font-semibold text-[#D6B15E]">
                    {detailModalStage.title}
                  </p>
                )}
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                {detailModalStage.shortDesc}
              </p>

              {/* Competencies list in modal */}
              {detailModalStage.skills && (
                <div className="rounded-xl border border-[#D6B15E]/25 bg-[#080A09] p-3.5 space-y-2">
                  <span className="font-mono text-[9px] font-bold text-[#D6B15E] uppercase tracking-wider block">
                    {t.modalCompetenciesHeader}
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {detailModalStage.skills.map((skill: string) => (
                      <div key={skill} className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detailModalStage.extendedDetails && (
                <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09] p-3.5 text-xs text-[#D1D5DB] leading-relaxed space-y-1.5">
                  <span className="font-mono text-[9px] font-bold text-[#D6B15E] uppercase tracking-wider block">
                    {t.detailModalSubtitle}
                  </span>
                  <p>{detailModalStage.extendedDetails}</p>
                </div>
              )}

              {detailModalStage.pmTransfer && (
                <div className="rounded-xl border border-[#10B981]/40 bg-[#0F5C46]/20 p-3.5 text-xs text-[#F4F1EA] leading-relaxed">
                  <span className="font-mono text-[9px] font-bold text-[#10B981] uppercase tracking-wider block mb-1">
                    {t.modalPmTransferHeader}
                  </span>
                  <p>{detailModalStage.pmTransfer}</p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-[#0F5C46]/30">
                <Link
                  to="/certificates"
                  onClick={() => setDetailModalStage(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B15E] hover:text-[#F4F1EA] uppercase tracking-wider transition-colors"
                >
                  <Award className="h-4 w-4" />
                  <span>{t.certButton}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setDetailModalStage(null)}
                  className="rounded-full bg-[#0F5C46] px-4 py-1.5 font-sans text-xs font-semibold text-[#F4F1EA] hover:bg-[#10B981] transition-colors uppercase"
                >
                  {t.closeModal}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
};
