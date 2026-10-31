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
  Download,
  ArrowRight,
  X,
  CheckCircle2,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import { Language } from '../types';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { CV_FILE } from '../data/assetRegistry';
import { getAbsoluteAssetUrl } from '../utils/assetPath';

interface JourneyPageProps {
  currentLang: Language;
}

interface CareerStage {
  id: string;
  num: string;
  headline: string;
  actionVerb: string;
  title: string;
  shortDesc: string;
  keyStrengths: string[];
  allCompetencies: string[];
  extendedDetails: string;
  pmTransfer: string;
  focusBadge?: string;
}

export const JourneyPage: React.FC<JourneyPageProps> = ({ currentLang: initialLang }) => {
  // Synchronized language state with localStorage persistence
  const [activeLang, setActiveLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('natalia_portfolio_lang');
      if (saved === 'de' || saved === 'en' || saved === 'pl') {
        return saved as Language;
      }
    }
    return initialLang || 'de';
  });

  useEffect(() => {
    setActiveLang(initialLang);
  }, [initialLang]);

  // Modal deep-dive state
  const [detailModalStage, setDetailModalStage] = useState<CareerStage | null>(null);

  // Keyboard navigation for closing modal with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && detailModalStage) {
        setDetailModalStage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [detailModalStage]);

  const handleLanguageSwitch = (newLang: Language) => {
    setActiveLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('natalia_portfolio_lang', newLang);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const contentByLang: Record<
    Language,
    {
      eyebrow: string;
      headlinePart1: string;
      headlinePart2: string;
      subheadline: string;
      certButton: string;
      downloadCvText: string;
      closeModal: string;
      viewCertificatesText: string;
      detailsButtonText: string;
      timelineTitle: string;
      modalSubtitle: string;
      modalCompetenciesHeader: string;
      modalTransferHeader: string;
      modalDetailsHeader: string;
      closingStatementPart1: string;
      closingStatementPart2: string;
      closingStatementPart3: string;
      stages: CareerStage[];
    }
  > = {
    de: {
      eyebrow: 'MY JOURNEY',
      headlinePart1: 'Unterschiedliche Disziplinen.',
      headlinePart2: 'Eine Richtung.',
      subheadline:
        'Von Naturwissenschaft und Umweltschutz zu digitalen Produkten und künstlicher Intelligenz.',
      certButton: 'Zertifikate',
      downloadCvText: 'CV herunterladen',
      closeModal: 'Schließen',
      viewCertificatesText: 'Zugehörige Zertifikate ansehen',
      detailsButtonText: 'Details anzeigen',
      timelineTitle: 'CHRONOLOGISCHER WEG',
      modalSubtitle: 'Wie diese Disziplin mein heutiges Profil im IT- & KI-Produktmanagement prägt',
      modalCompetenciesHeader: 'KERNKOMPETENZEN & METHODEN',
      modalTransferHeader: 'BEITRAG ZUM IT- & KI-PRODUKTMANAGEMENT',
      modalDetailsHeader: 'FACHLICHER HINTERGRUND & PRAXIS',
      closingStatementPart1: 'Wissenschaftlich fundiert.',
      closingStatementPart2: 'Für Menschen gedacht.',
      closingStatementPart3: 'Für Wirkung entwickelt.',
      stages: [
        {
          id: 'science',
          num: '01',
          headline: 'NATURWISSENSCHAFT',
          actionVerb: 'Analysieren',
          title: 'M.Sc. Chemie',
          shortDesc:
            'Wissenschaftliches Denken wurde zum Fundament meines methodischen Ansatzes für komplexe Herausforderungen.',
          keyStrengths: [
            'Analytisches & empirisches Denken',
            'Hypothesenformulierung & Testreihen',
            'Evidenzbasierte Entscheidungsfindung',
          ],
          allCompetencies: [
            'Analytisches & empirisches Denken',
            'Hypothesenformulierung & Versuchsreihen',
            'Quantitative Dateninterpretation',
            'Evidenzbasierte Entscheidungsfindung',
          ],
          extendedDetails:
            'Das Masterstudium der Chemie lehrte mich, hochkomplexe Phänomene in empirische Modelle zu zerlegen, Versuchsreihen rigoros zu testen und Entscheidungen stets auf verifizierte Daten statt auf Annahmen zu stützen.',
          pmTransfer:
            'Im Produktmanagement: Saubere Problemisolierung, Formulierung messbarer Hypothesen und zielgerichtete quantitative Analytics zur systematischen Validierung von Produktannahmen.',
        },
        {
          id: 'environment',
          num: '02',
          headline: 'UMWELT & NACHHALTIGKEIT',
          actionVerb: 'Verstehen',
          title: 'Umweltmanagement & Nachhaltigkeit',
          shortDesc:
            'Anwendung naturwissenschaftlicher und analytischer Methoden auf Umweltwirkungen, Compliance, Ressourceneffizienz und nachhaltige Prozesse.',
          keyStrengths: [
            'Life Cycle Assessment (LCA)',
            'Umweltverträglichkeitsprüfung (UVP)',
            'Compliance & ISO 14001',
          ],
          allCompetencies: [
            'Umweltverträglichkeitsprüfung (UVP)',
            'Life Cycle Assessment (LCA)',
            'Umweltmanagement & Stoffkreisläufe',
            'Compliance & ISO 14001',
            'Ressourceneffizienz & Kreislaufwirtschaft',
          ],
          extendedDetails:
            'Postgraduale Vertiefung und praktische Tätigkeit im Umweltschutz: Stoffkreisläufe, Umweltverträglichkeitsprüfungen (UVP), Life Cycle Assessments (LCA), Genehmigungsverfahren, regulatorische Anforderungen und die systematische Abwägung technischer Machbarkeit gegen ökologische Verantwortung.',
          pmTransfer:
            'Systemisches Denken: Jede Funktion in einer Software ist Teil eines vernetzten Ökosystems mit Abhängigkeiten und Schnittstellen. Datenbasierte Ökobilanzierung und Compliance-Modelle lassen sich direkt auf digitale ESG- und Produkt-Passport-Architekturen übertragen.',
        },
        {
          id: 'business',
          num: '03',
          headline: 'UNTERNEHMERTUM',
          actionVerb: 'Entscheiden',
          title: 'Unternehmerische Ownership',
          shortDesc:
            'Verantwortung in fundierte Entscheidungen übersetzen und verstehen, wie Kundenwert und Business zusammenwirken.',
          keyStrengths: [
            'Customer Discovery & Feedback',
            'Wirtschaftlichkeit, Pricing & P&L',
            'Pragmatische Priorisierung & Trade-offs',
          ],
          allCompetencies: [
            'Customer Discovery & Kundeninterviews',
            'Wirtschaftlichkeit, Pricing & P&L',
            'Volle Ergebnis- & Budgetverantwortung',
            'Pragmatische Priorisierung & Trade-offs',
          ],
          extendedDetails:
            'Eigenverantwortliche unternehmerische Tätigkeit mit voller Budget-, Marketing- und Ergebnisverantwortung. Direkter Kundenkontakt und die tägliche Realität von Angebot, Nachfrage und Wirtschaftlichkeit.',
          pmTransfer:
            'Unternehmerisches Gespür: Ein Produkt ist erst dann erfolgreich, wenn es echten Kundenwert stiftet und gleichzeitig ökonomisch tragfähig ist. Konsequenter Fokus auf Business Value und messbaren ROI.',
        },
        {
          id: 'digital',
          num: '04',
          headline: 'DIGITALE TRANSFORMATION',
          actionVerb: 'Verändern',
          title: 'Digital Transformation Managerin (IHK)',
          shortDesc:
            'Fachdomänen mit moderner Technologie, Cloud-Workflows und KI-Potenzialen verbinden.',
          keyStrengths: [
            'Digitale Strategie & Roadmaps',
            'KI- & Prozessautomatisierung',
            'Cloud- & Schnittstellen-Workflows',
          ],
          allCompetencies: [
            'Digitale Strategie & Roadmap-Design',
            'KI-Prozessautomatisierung',
            'Cloud- & Schnittstellen-Workflows (APIs)',
            'Agiles Change Management & Enablement',
          ],
          extendedDetails:
            'IHK-Zertifizierung und Praxisprojekte: Übersetzung gewachsener Geschäftsabläufe in moderne digitale Workflows, Evaluierung von KI-Potenzialen und Etablierung agiler Arbeitsmethoden zur Beschleunigung von Entwicklungsprozessen.',
          pmTransfer:
            'Die Brücke zwischen Fachbereich und IT: Technologie dort gezielt einsetzen, wo sie Reibungsverluste beseitigt, Silos aufbricht und Skalierbarkeit ermöglicht.',
        },
        {
          id: 'product',
          num: '05',
          headline: 'PRODUKTMANAGEMENT',
          actionVerb: 'Gestalten',
          title: 'IT-Produktmanagement',
          shortDesc:
            'Komplexe Probleme in nutzerzentrierte, testbare und skalierbare digitale Produkte übersetzen.',
          keyStrengths: [
            'Product Discovery & User Research',
            'User Journeys & Wireframing',
            'MVP-Prototyping & Validierung',
          ],
          allCompetencies: [
            'Product Discovery & Nutzertests',
            'User Journeys & Wireframing',
            'MVP-Prototyping & Hypothesenvalidierung',
            'Agile Sprints, Backlog & Roadmap-Governance',
          ],
          extendedDetails:
            'Fokussierte IT-Produktkonzeption: Problem Discovery, Nutzertests, User Stories, Backlog Governance, Sprint-Begleitung und Prototyping mit modernen No-Code- & Webtechnologien.',
          pmTransfer:
            'End-to-End Product Craft: Vom tiefen Nutzerverständnis über schnelle Prototypen-Validierung bis zur skalierbaren Produktarchitektur in agilen Teams.',
        },
        {
          id: 'ai',
          num: '06',
          headline: 'AI & INNOVATION',
          actionVerb: 'Wirkung schaffen',
          title: 'Konvergenz aller Disziplinen',
          shortDesc:
            'Wissenschaft, Umwelt, Business und Produkt bündeln, um intelligente digitale Lösungen zu entwickeln.',
          keyStrengths: [
            'KI-Produktstrategie & Discovery',
            'Schnittstelle Fachdomäne & KI-Engineering',
            'Wirkungsorientierte Produktkonzeption',
          ],
          allCompetencies: [
            'KI-gestützte Produktstrategie & Discovery',
            'Schnittstelle Fachdomäne & KI-Engineering',
            'Ethische & regulatorische KI-Standards (EU AI Act)',
            'Wirkungsorientierte Produktkonzeption',
            'Datenbasierte Erfolgsmessung (KPIs & OKRs)',
          ],
          extendedDetails:
            'Die Konvergenz aller Disziplinen: Die analytische Tiefe der Chemie, das vernetzte Systemdenken der Umweltwissenschaften, die pragmatische Umsetzungsstärke des Unternehmertums und moderne Product-Management-Frameworks verschmelzen zu einem einzigartigen Profil für die Gestaltung intelligenter KI- & Softwareprodukte.',
          pmTransfer:
            'Wettbewerbsvorteil: Komplexe Fachdomänen mühelos verstehen, mit Software-Ingenieuren und Data Scientists auf Augenhöhe sprechen und zukunftsfähige KI-Produkte auf die Straße bringen.',
          focusBadge: 'FOKUS',
        },
      ],
    },
    en: {
      eyebrow: 'MY JOURNEY',
      headlinePart1: 'Different disciplines.',
      headlinePart2: 'One direction.',
      subheadline:
        'From science and environmental protection to digital products and artificial intelligence.',
      certButton: 'Certificates',
      downloadCvText: 'Download CV',
      closeModal: 'Close',
      viewCertificatesText: 'View associated certificates',
      detailsButtonText: 'View details',
      timelineTitle: 'CHRONOLOGICAL PATH',
      modalSubtitle: 'How this discipline shapes my modern IT & AI Product Management profile',
      modalCompetenciesHeader: 'CORE COMPETENCIES & METHODS',
      modalTransferHeader: 'IMPACT ON IT & AI PRODUCT MANAGEMENT',
      modalDetailsHeader: 'BACKGROUND & APPLIED PRACTICE',
      closingStatementPart1: 'Powered by science.',
      closingStatementPart2: 'Designed for people.',
      closingStatementPart3: 'Built for impact.',
      stages: [
        {
          id: 'science',
          num: '01',
          headline: 'NATURAL SCIENCES',
          actionVerb: 'Analyze',
          title: 'M.Sc. Chemistry',
          shortDesc:
            'Scientific thinking became the foundation of how I approach complex, multidimensional challenges.',
          keyStrengths: [
            'Analytical & empirical thinking',
            'Hypothesis testing & experiments',
            'Evidence-based decision-making',
          ],
          allCompetencies: [
            'Analytical & empirical thinking',
            'Hypothesis testing & iterative validation',
            'Quantitative data interpretation',
            'Evidence-based decision-making',
          ],
          extendedDetails:
            'My Master of Science in Chemistry trained me to deconstruct intricate physical phenomena into verifiable models, run iterative experiments, and ground all judgments in empirical proof rather than assumptions.',
          pmTransfer:
            'In Product Management: Rigorous root-cause isolation, testable hypothesis construction, and decisive quantitative product analytics to systematically validate product assumptions.',
        },
        {
          id: 'environment',
          num: '02',
          headline: 'ENVIRONMENT & SUSTAINABILITY',
          actionVerb: 'Understand',
          title: 'Environmental Management & Sustainability',
          shortDesc:
            'Applying scientific and analytical methods to environmental impacts, compliance, resource efficiency, and sustainable processes.',
          keyStrengths: [
            'Life Cycle Assessment (LCA)',
            'Environmental Impact Assessment (EIA)',
            'Compliance & ISO 14001',
          ],
          allCompetencies: [
            'Environmental Impact Assessment (EIA)',
            'Life Cycle Assessment (LCA)',
            'Environmental management & material loops',
            'Compliance & ISO 14001',
            'Resource efficiency & circular economy',
          ],
          extendedDetails:
            'Postgraduate study and applied execution in environmental protection: material cycles, Environmental Impact Assessments (EIA), Life Cycle Assessments (LCA), permitting procedures, regulatory compliance, and balancing technical feasibility with ecological responsibility.',
          pmTransfer:
            'Holistic Systems Thinking: Recognizing that every software feature ripples through an interconnected technical, operational, and organizational ecosystem. Translating environmental impact metrics directly into digital ESG and Product Passport architectures.',
        },
        {
          id: 'business',
          num: '03',
          headline: 'ENTREPRENEURSHIP',
          actionVerb: 'Decide',
          title: 'Entrepreneurial Ownership',
          shortDesc:
            'Translating responsibility into decisive action and understanding how customer value and commercial reality connect.',
          keyStrengths: [
            'Customer Discovery & Feedback',
            'Commercial viability & P&L',
            'Pragmatic prioritization & trade-offs',
          ],
          allCompetencies: [
            'Customer discovery & user interviews',
            'Commercial viability & P&L governance',
            'Full budget and outcome ownership',
            'Pragmatic prioritization & trade-offs',
          ],
          extendedDetails:
            'Direct entrepreneurial leadership with full accountability across budgets, marketing, customer discovery, and P&L. Translating personal initiative into sustainable business outcomes.',
          pmTransfer:
            'Commercial Pragmatism: A digital product succeeds only when genuine user utility converges with clear financial viability and unit economics. Relentless focus on customer value and measurable ROI.',
        },
        {
          id: 'digital',
          num: '04',
          headline: 'DIGITAL TRANSFORMATION',
          actionVerb: 'Transform',
          title: 'Digital Transformation Manager (IHK)',
          shortDesc:
            'Connecting domain expertise with modern technology, cloud workflows, and applied AI potential.',
          keyStrengths: [
            'Digital strategy & roadmaps',
            'AI & process automation',
            'Cloud & API integrations',
          ],
          allCompetencies: [
            'Digital strategy & roadmap design',
            'AI process automation',
            'Cloud & interface workflows (APIs)',
            'Agile change management & enablement',
          ],
          extendedDetails:
            'Formal IHK certification and applied transformation: Translating traditional operating workflows into cloud toolchains, evaluating artificial intelligence opportunities, and championing agile frameworks.',
          pmTransfer:
            'The Human-Tech Bridge: Deploying emerging technologies specifically where they eliminate friction, streamline cross-functional handoffs, and unlock operational scale.',
        },
        {
          id: 'product',
          num: '05',
          headline: 'PRODUCT MANAGEMENT',
          actionVerb: 'Shape',
          title: 'IT Product Management',
          shortDesc:
            'Translating complex challenges into user-centered, testable, and scalable digital products.',
          keyStrengths: [
            'Product Discovery & User Research',
            'User Journeys & Wireframing',
            'MVP Prototyping & Validation',
          ],
          allCompetencies: [
            'Product discovery & user testing',
            'User journeys & wireframing',
            'MVP prototyping & hypothesis validation',
            'Agile sprints, backlog & roadmap governance',
          ],
          extendedDetails:
            'Structured digital product craft: Problem validation, user interviews, backlog grooming, cross-functional sprints, user stories, and interactive prototype testing with modern web technologies.',
          pmTransfer:
            'End-to-End Craftsmanship: From uncovering genuine customer pain points to rapid prototype iteration and roadmap governance in cross-functional teams.',
        },
        {
          id: 'ai',
          num: '06',
          headline: 'AI & INNOVATION',
          actionVerb: 'Create Impact',
          title: 'Convergence of All Disciplines',
          shortDesc:
            'Uniting science, environmental thinking, commercial acumen, and product craft to build intelligent solutions.',
          keyStrengths: [
            'AI-driven product strategy',
            'Domain & AI engineering bridge',
            'Impact-oriented product delivery',
          ],
          allCompetencies: [
            'AI-driven product strategy & discovery',
            'Domain & AI engineering bridge',
            'Ethical & regulatory AI standards (EU AI Act)',
            'Impact-driven product delivery',
            'Data-based success metrics (KPIs & OKRs)',
          ],
          extendedDetails:
            'The convergence of all prior paths: Scientific empirical discipline, complex ecosystem thinking, commercial customer ownership, and agile product design fuse into a high-leverage profile built to shape modern AI & software applications.',
          pmTransfer:
            'Unique Competitive Advantage: Navigating complex technical and regulatory domains effortlessly, collaborating with engineering peers as equals, and shipping intelligent software.',
          focusBadge: 'FOCUS',
        },
      ],
    },
    pl: {
      eyebrow: 'MY JOURNEY',
      headlinePart1: 'Różne dyscypliny.',
      headlinePart2: 'Jeden kierunek.',
      subheadline:
        'Od nauk ścisłych i ochrony środowiska po produkty cyfrowe i sztuczną inteligencję.',
      certButton: 'Certyfikaty',
      downloadCvText: 'Pobierz CV',
      closeModal: 'Zamknij',
      viewCertificatesText: 'Zobacz powiązane certyfikaty',
      detailsButtonText: 'Szczegóły',
      timelineTitle: 'ŚCIEŻKA ROZWOJU',
      modalSubtitle: 'Jak ta dyscyplina kształtuje mój profil w zarządzaniu produktami IT i AI',
      modalCompetenciesHeader: 'KLUCZOWE KOMPETENCJE I METODY',
      modalTransferHeader: 'WPŁYW NA ZARZĄDZANIE PRODUKTAMI IT & AI',
      modalDetailsHeader: 'TŁO DZIEDZINOWE I PRAKTYKA',
      closingStatementPart1: 'Oparte na nauce.',
      closingStatementPart2: 'Tworzone dla ludzi.',
      closingStatementPart3: 'Rozwijane z myślą o realnym wpływie.',
      stages: [
        {
          id: 'science',
          num: '01',
          headline: 'NAUKI ŚCISŁE',
          actionVerb: 'Analizować',
          title: 'M.Sc. Chemia',
          shortDesc:
            'Myślenie naukowe stało się fundamentem mojego podejścia do rozwiązywania złożonych problemów.',
          keyStrengths: [
            'Myślenie analityczne i empiryczne',
            'Formułowanie hipotez i testowanie',
            'Decyzje oparte na faktach',
          ],
          allCompetencies: [
            'Myślenie analityczne i empiryczne',
            'Formułowanie hipotez i serie testów',
            'Interpretacja danych ilościowych',
            'Decyzje oparte na faktach',
          ],
          extendedDetails:
            'Studia magisterskie z chemii nauczyły mnie dekomponować złożone zjawiska na modele empiryczne, przeprowadzać rygorystyczne testy i podejmować decyzje w oparciu o fakty.',
          pmTransfer:
            'W zarządzaniu produktem: precyzyjna diagnoza problemu, formułowanie mierzalnych hipotez oraz analityka ilościowa.',
        },
        {
          id: 'environment',
          num: '02',
          headline: 'ŚRODOWISKO I ZRÓWNOWAŻONY ROZWÓJ',
          actionVerb: 'Rozumieć',
          title: 'Zarządzanie środowiskowe i zrównoważony rozwój',
          shortDesc:
            'Wykorzystanie naukowego podejścia do oceny wpływu na środowisko, zgodności regulacyjnej i efektywności zasobów.',
          keyStrengths: [
            'Ocena cyklu życia (LCA)',
            'Ocena oddziaływania na środowisko (OOŚ)',
            'Zgodność i ISO 14001',
          ],
          allCompetencies: [
            'Ocena oddziaływania na środowisko (OOŚ)',
            'Ocena cyklu życia (LCA)',
            'Zarządzanie środowiskowe i obieg zamknięty',
            'Zgodność i ISO 14001',
            'Efektywność zasobów i gospodarka cyrkularna',
          ],
          extendedDetails:
            'Studia podyplomowe i praktyka w ochronie środowiska: oceny oddziaływania na środowisko (OOŚ), oceny cyklu życia (LCA), obieg zamknięty, procedury zgodności regulacyjnej i normy ISO 14001.',
          pmTransfer:
            'Myślenie systemowe: każda funkcja oprogramowania jest elementem większego ekosystemu ze złożonymi współzależnościami. Doświadczenie w OOŚ i LCA przekłada się bezpośrednio na cyfrowe paszporty produktów i moduły compliance ESG.',
        },
        {
          id: 'business',
          num: '03',
          headline: 'PRZEDSIĘBIORCZOŚĆ',
          actionVerb: 'Decydować',
          title: 'Odpowiedzialność biznesowa',
          shortDesc:
            'Przekładanie odpowiedzialności na decyzje oraz zrozumienie wartości dla klienta i realiów rynkowych.',
          keyStrengths: [
            'Customer Discovery i feedback klientów',
            'Rentowność i P&L',
            'Priorytetyzacja i kompromisy',
          ],
          allCompetencies: [
            'Customer Discovery i wywiady z użytkownikami',
            'Rentowność i P&L',
            'Pełna odpowiedzialność za budżet i wyniki',
            'Priorytetyzacja i kompromisy',
          ],
          extendedDetails:
            'Samodzielne prowadzenie działalności z pełną odpowiedzialnością za budżet, relacje z klientami i rentowność.',
          pmTransfer:
            'Pragmatyzm biznesowy: produkt cyfrowy ma sens tylko wtedy, gdy realnie rozwiązuje problem klienta i przynosi mierzalną wartość.',
        },
        {
          id: 'digital',
          num: '04',
          headline: 'TRANSFORMACJA CYFROWA',
          actionVerb: 'Przekształcać',
          title: 'Digital Transformation Manager (IHK)',
          shortDesc:
            'Łączenie wiedzy dziedzinowej z nowoczesną technologią, procesami chmurowymi i potencjałem AI.',
          keyStrengths: [
            'Strategia cyfrowa i Roadmapy',
            'AI i automatyzacja procesów',
            'Integracje Cloud i API',
          ],
          allCompetencies: [
            'Strategia cyfrowa i projektowanie roadmap',
            'AI i automatyzacja procesów',
            'Integracje Cloud i API',
            'Zwinne zarządzanie zmianą',
          ],
          extendedDetails:
            'Certyfikacja IHK i projekty transformacyjne: modernizacja procesów, wdrażanie narzędzi cyfrowych i adaptacja AI.',
          pmTransfer:
            'Pomost człowiek–technologia: wdrażanie innowacji tam, gdzie faktycznie usuwają bariery operacyjne i budują skalę.',
        },
        {
          id: 'product',
          num: '05',
          headline: 'ZARZĄDZANIE PRODUKTEM',
          actionVerb: 'Tworzyć',
          title: 'Zarządzanie Produktami IT',
          shortDesc:
            'Przekształcanie złożonych wyzwań w zorientowane na użytkownika, skalowalne produkty cyfrowe.',
          keyStrengths: [
            'Product Discovery i badania użytkowników',
            'Ścieżki użytkownika i wireframing',
            'Prototypowanie MVP i walidacja',
          ],
          allCompetencies: [
            'Product Discovery i badania użytkowników',
            'Ścieżki użytkownika (User Journeys) i wireframing',
            'Prototypowanie MVP i walidacja hipotez',
            'Zwinne sprinty, backlog i roadmapy',
          ],
          extendedDetails:
            'Strukturalny warsztat zarządzania produktem: wywiady z użytkownikami, priorytetyzacja backlogu, User Stories i prototypowanie.',
          pmTransfer:
            'End-to-End Product Craft: od odkrycia problemu przez szybkie prototypy po stabilne zarządzanie cyklem życia produktu.',
        },
        {
          id: 'ai',
          num: '06',
          headline: 'AI I INNOWACJE',
          actionVerb: 'Budować wpływ',
          title: 'Punkt zbieżny wszystkich dyscyplin',
          shortDesc:
            'Łączę naukę, środowisko, biznes i produkt, tworząc inteligentne rozwiązania cyfrowe o realnym wpływie.',
          keyStrengths: [
            'Strategia produktów AI i Discovery',
            'Most między wiedzą dziedzinową a inżynierią AI',
            'Koncepcja produktów zorientowana na wpływ',
          ],
          allCompetencies: [
            'Strategia produktów opartych na AI i Discovery',
            'Most między wiedzą dziedzinową a inżynierią AI',
            'Standardy etyczne i regulacyjne AI (EU AI Act)',
            'Koncepcja produktów zorientowana na wpływ',
            'Mierniki sukcesu oparte na danych (KPI i OKR)',
          ],
          extendedDetails:
            'Punkt zbieżny całej drogi: empiryczna dyscyplina chemii, myślenie systemowe, odpowiedzialność biznesowa i nowoczesne ramy produktowe.',
          pmTransfer:
            'Przewaga rynkowa: swoboda w poruszaniu się po złożonych domenach technicznych i skupienie na realnym wpływie.',
          focusBadge: 'CEL',
        },
      ],
    },
  };

  const t = contentByLang[activeLang] || contentByLang.de;

  const getStageIcon = (id: string) => {
    switch (id) {
      case 'science':
        return <FlaskConical className="h-4 w-4 text-[#10B981]" />;
      case 'environment':
        return <Leaf className="h-4 w-4 text-[#10B981]" />;
      case 'business':
        return <Users className="h-4 w-4 text-[#10B981]" />;
      case 'digital':
        return <Cpu className="h-4 w-4 text-[#10B981]" />;
      case 'product':
        return <Box className="h-4 w-4 text-[#10B981]" />;
      case 'ai':
        return <Brain className="h-4 w-4 text-[#D6B15E]" />;
      default:
        return <Layers className="h-4 w-4 text-[#10B981]" />;
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-x-hidden bg-[#080A09] text-[#F4F1EA] selection:bg-[#0F5C46] selection:text-[#D6B15E] flex flex-col justify-between">
        {/* Subtle, restrained ambient background elements — no harsh glow or neon bleed */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-[#0F5C46]/10 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[#D6B15E]/5 blur-[80px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex-grow flex flex-col justify-between space-y-6 sm:space-y-8">
          
          {/* ============================================================ */}
          {/* 1. TOP HEADER & UNIFIED UTILITY BAR (No duplicates)          */}
          {/* ============================================================ */}
          <header className="w-full space-y-3 sm:space-y-4">
            
            {/* Top Utility Bar: Back to Portfolio | Language Switcher | CV & Certificates */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#0F5C46]/25">
              
              {/* Left: Back to Portfolio */}
              <div className="flex items-center gap-2">
                <BackToPortfolio currentLang={activeLang} className="!py-0 text-[11px]" />
              </div>

              {/* Center: Language Switcher (DE / EN / PL) */}
              <nav aria-label="Language selector" className="inline-flex items-center rounded-md border border-[#0F5C46]/40 bg-[#0C120F] p-0.5">
                {(['de', 'en', 'pl'] as Language[]).map((lang) => {
                  const isActive = activeLang === lang;
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleLanguageSwitch(lang)}
                      className={`px-2.5 py-0.5 text-[11px] font-mono font-bold tracking-wider uppercase transition-all rounded ${
                        isActive
                          ? 'bg-[#0F5C46] text-[#D6B15E] shadow-sm'
                          : 'text-[#A9AEA9] hover:text-[#F4F1EA]'
                      }`}
                      aria-pressed={isActive}
                    >
                      {lang.toUpperCase()}
                    </button>
                  );
                })}
              </nav>

              {/* Right: CV Download & Certificates link */}
              <div className="flex items-center gap-4 text-xs font-mono tracking-wider uppercase">
                <a
                  href={getAbsoluteAssetUrl(CV_FILE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Natalia_Stachowiak_CV_grafisch.pdf"
                  className="inline-flex items-center gap-1.5 text-[#D1D5DB] hover:text-[#D6B15E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6B15E]"
                >
                  <Download className="h-3.5 w-3.5 text-[#D6B15E]" />
                  <span>{t.downloadCvText}</span>
                </a>
                <span className="text-[#0F5C46]/50">|</span>
                <Link
                  to="/certificates"
                  className="inline-flex items-center gap-1.5 text-[#D1D5DB] hover:text-[#10B981] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#10B981]"
                >
                  <Award className="h-3.5 w-3.5 text-[#10B981]" />
                  <span>{t.certButton}</span>
                </Link>
              </div>

            </div>

            {/* Headline and Narrative Subtitle */}
            <div className="max-w-4xl space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#D6B15E] uppercase">
                  {t.eyebrow}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#F4F1EA] leading-tight">
                <span>{t.headlinePart1} </span>
                <span className="text-[#10B981]">{t.headlinePart2}</span>
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] leading-relaxed max-w-3xl">
                {t.subheadline}
              </p>
            </div>

          </header>

          {/* ============================================================ */}
          {/* 2. SIX MILESTONE CARDS                                        */}
          {/* Desktop: 6 cards in 1 row (xl:grid-cols-6)                   */}
          {/* Tablet: 2 or 3 columns (md:grid-cols-2 lg:grid-cols-3)      */}
          {/* Mobile: 1 column (grid-cols-1)                               */}
          {/* NO truncation, NO ellipsis, max 3 key strengths              */}
          {/* ============================================================ */}
          <main className="w-full flex-grow flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 xl:gap-3 items-stretch w-full">
              {t.stages.map((stage) => {
                const isNow = stage.id === 'ai';

                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setDetailModalStage(stage)}
                    className={`group relative text-left w-full h-full rounded-xl p-4 sm:p-4 flex flex-col justify-between transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B15E] ${
                      isNow
                        ? 'bg-[#0E1713] border border-[#D6B15E]/40 hover:border-[#D6B15E] shadow-lg shadow-black/40'
                        : 'bg-[#0C120F] border border-[#0F5C46]/35 hover:border-[#10B981]/50 hover:bg-[#0E1612]'
                    }`}
                  >
                    
                    {/* Top Meta: Stage Number, Action Verb & Icon */}
                    <div className="space-y-3 w-full">
                      
                      <div className="flex items-center justify-between gap-2 border-b border-[#0F5C46]/20 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-xs font-bold tracking-wider ${
                              isNow ? 'text-[#D6B15E]' : 'text-[#10B981]'
                            }`}
                          >
                            {stage.num}
                          </span>
                          <span className="text-[#0F5C46]/40 text-xs">/</span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#A9AEA9] group-hover:text-[#F4F1EA] transition-colors">
                            {stage.actionVerb}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {stage.focusBadge && (
                            <span className="rounded bg-[#D6B15E]/20 text-[#D6B15E] border border-[#D6B15E]/40 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider">
                              {stage.focusBadge}
                            </span>
                          )}
                          <div className="p-1 rounded bg-[#080A09] border border-[#0F5C46]/30">
                            {getStageIcon(stage.id)}
                          </div>
                        </div>
                      </div>

                      {/* Headings: Complete text, never truncated */}
                      <div className="space-y-1">
                        <h2 className="font-serif text-sm sm:text-base font-semibold text-[#F4F1EA] tracking-tight leading-snug">
                          {stage.headline}
                        </h2>
                        <p className="font-sans text-xs font-medium text-[#D6B15E] leading-snug">
                          {stage.title}
                        </p>
                      </div>

                      {/* Short Summary: Full text, never truncated with ellipses */}
                      <p className="font-sans text-xs text-[#A9AEA9] leading-relaxed">
                        {stage.shortDesc}
                      </p>

                    </div>

                    {/* Middle: Max 3 Key Strengths (Clean, zero-pill typography) */}
                    <div className="pt-3 my-2 w-full border-t border-[#0F5C46]/20 flex-grow">
                      <ul className="space-y-1.5 text-[11px] text-[#D1D5DB] font-sans">
                        {stage.keyStrengths.map((str) => (
                          <li key={str} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-[#10B981] select-none text-[10px] mt-0.5">▪</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom: Dedicated Interactive Action Affordance (Aligned & Zero Overlap) */}
                    <div className="mt-auto pt-3 border-t border-[#0F5C46]/20 flex items-center justify-between gap-2 w-full min-w-0">
                      <span className="text-[#10B981] font-semibold text-[10px] font-mono tracking-wider uppercase truncate min-w-0">
                        {stage.actionVerb}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase text-[#A9AEA9] group-hover:text-[#D6B15E] transition-colors shrink-0 whitespace-nowrap pl-1">
                        <span>{t.detailsButtonText}</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </span>
                    </div>

                  </button>
                );
              })}
            </div>
          </main>

          {/* ============================================================ */}
          {/* 3. PROGRESSION TIMELINE & PRESERVED CLOSING STATEMENT         */}
          {/* ============================================================ */}
          <footer className="w-full space-y-3 pt-2">
            
            {/* Chronological progression sequence */}
            <div className="w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 rounded-lg border border-[#0F5C46]/30 bg-[#0C120F] px-3 sm:px-5 py-2">
              <span className="font-mono text-[9px] text-[#A9AEA9] uppercase tracking-wider mr-1 hidden sm:inline">
                {t.timelineTitle}:
              </span>
              {t.stages.map((stage, idx) => (
                <React.Fragment key={stage.id}>
                  {idx > 0 && (
                    <span className="text-[#0F5C46]/60 font-mono text-[10px]" aria-hidden="true">
                      →
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setDetailModalStage(stage)}
                    className={`font-mono text-[10px] font-bold tracking-wider uppercase transition-colors hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6B15E] rounded px-1 ${
                      stage.id === 'ai' ? 'text-[#D6B15E]' : 'text-[#D1D5DB] hover:text-[#10B981]'
                    }`}
                  >
                    {stage.num} {stage.actionVerb}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Preserved Closing Statement */}
            <div className="text-center pt-1">
              <p className="font-serif text-sm sm:text-base lg:text-lg text-[#F4F1EA] tracking-tight">
                <span className="text-[#10B981] font-medium">{t.closingStatementPart1} </span>
                <span className="text-[#F4F1EA] font-normal">{t.closingStatementPart2} </span>
                <span className="text-[#D6B15E] font-medium">{t.closingStatementPart3}</span>
              </p>
            </div>

          </footer>

        </div>

        {/* ============================================================ */}
        {/* 4. ACCESSIBLE INTERACTIVE STAGE DETAIL PANEL (Modal)         */}
        {/* Shows the complete authentic factual data with no cutoffs    */}
        {/* ============================================================ */}
        {detailModalStage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#080A09]/80 backdrop-blur-md animate-in fade-in duration-150"
            onClick={() => setDetailModalStage(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-stage-title"
          >
            <div
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#0F5C46]/50 bg-[#0C120F] p-5 sm:p-7 shadow-2xl shadow-black/80 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setDetailModalStage(null)}
                className="absolute top-4 right-4 rounded-lg p-1.5 text-[#A9AEA9] hover:bg-[#080A09] hover:text-[#F4F1EA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B15E]"
                aria-label={t.closeModal}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Stage Identity */}
              <div className="space-y-1.5 pr-8">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#10B981]">
                  <span>{detailModalStage.num}</span>
                  <span className="text-[#0F5C46]">/</span>
                  <span>{detailModalStage.actionVerb}</span>
                  {detailModalStage.focusBadge && (
                    <span className="rounded bg-[#D6B15E]/20 text-[#D6B15E] border border-[#D6B15E]/40 px-1.5 py-0.2 text-[9px]">
                      {detailModalStage.focusBadge}
                    </span>
                  )}
                </div>
                <h2 id="modal-stage-title" className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">
                  {detailModalStage.headline}
                </h2>
                <p className="font-sans text-xs sm:text-sm font-semibold text-[#D6B15E]">
                  {detailModalStage.title}
                </p>
                <p className="font-sans text-xs text-[#A9AEA9] leading-relaxed pt-1">
                  {detailModalStage.shortDesc}
                </p>
              </div>

              {/* Complete Competencies & Methods */}
              <div className="rounded-xl border border-[#0F5C46]/35 bg-[#080A09] p-4 space-y-2.5">
                <span className="font-mono text-[10px] font-bold text-[#D6B15E] uppercase tracking-wider block">
                  {t.modalCompetenciesHeader}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {detailModalStage.allCompetencies.map((skill) => (
                    <div key={skill} className="flex items-start gap-2 text-xs text-[#D1D5DB] leading-snug">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extended Details / Factual Background */}
              {detailModalStage.extendedDetails && (
                <div className="rounded-xl border border-[#0F5C46]/30 bg-[#080A09] p-4 text-xs text-[#D1D5DB] leading-relaxed space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-[#D6B15E] uppercase tracking-wider block">
                    {t.modalDetailsHeader}
                  </span>
                  <p>{detailModalStage.extendedDetails}</p>
                </div>
              )}

              {/* Contribution to IT & AI Product Management */}
              {detailModalStage.pmTransfer && (
                <div className="rounded-xl border border-[#10B981]/30 bg-[#0F5C46]/15 p-4 text-xs text-[#F4F1EA] leading-relaxed space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[#10B981] uppercase tracking-wider block">
                    {t.modalTransferHeader}
                  </span>
                  <p>{detailModalStage.pmTransfer}</p>
                </div>
              )}

              {/* Modal Footer: Link to Certificates and Close button */}
              <div className="pt-2 flex items-center justify-between border-t border-[#0F5C46]/30">
                <Link
                  to="/certificates"
                  onClick={() => setDetailModalStage(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D6B15E] hover:text-[#F4F1EA] uppercase tracking-wider transition-colors"
                >
                  <Award className="h-4 w-4" />
                  <span>{t.viewCertificatesText}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
                <button
                  type="button"
                  onClick={() => setDetailModalStage(null)}
                  className="rounded-lg bg-[#0F5C46] px-4 py-1.5 font-sans text-xs font-semibold text-[#F4F1EA] hover:bg-[#10B981] transition-colors uppercase"
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
