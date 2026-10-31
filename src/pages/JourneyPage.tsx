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
          {/* Desktop: 3 columns with 2 rows (lg:grid-cols-3)              */}
          {/* Tablet: 2 columns (sm:grid-cols-2)                           */}
          {/* Mobile: 1 column (grid-cols-1)                               */}
          {/* Fließtext 15-16px, Title 18-20px, Full-width button, NO cutoffs */}
          {/* ============================================================ */}
          <main className="w-full flex-grow py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch w-full">
              {t.stages.map((stage) => {
                const isNow = stage.id === 'ai';

                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setDetailModalStage(stage)}
                    className={`group relative text-left w-full h-full rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A35A] ${
                      isNow
                        ? 'bg-gradient-to-b from-[#101914] to-[#0C120F] border border-[#C7A35A]/50 hover:border-[#C7A35A] shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                        : 'bg-[#101412] border border-[#0F5C46]/35 hover:border-[#C7A35A]/50 hover:bg-[#0E1512] shadow-md'
                    }`}
                  >
                    
                    {/* Top Meta: Stage Number, Action Verb & Icon */}
                    <div className="space-y-4 w-full">
                      
                      <div className="flex items-center justify-between gap-3 border-b border-[#0F5C46]/25 pb-3.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`font-mono text-sm sm:text-base font-bold tracking-wider ${
                              isNow ? 'text-[#C7A35A]' : 'text-[#148B78]'
                            }`}
                          >
                            {stage.num}
                          </span>
                          <span className="text-[#0F5C46]/40 text-sm">/</span>
                          <span className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-[#C7A35A] font-semibold">
                            {stage.actionVerb}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {stage.focusBadge && (
                            <span className="rounded bg-[#C7A35A]/15 text-[#C7A35A] border border-[#C7A35A]/40 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                              {stage.focusBadge}
                            </span>
                          )}
                          <div className="p-2 rounded-lg bg-[#080A09] border border-[#0F5C46]/40">
                            {getStageIcon(stage.id)}
                          </div>
                        </div>
                      </div>

                      {/* Headings: 18-20px title, 13-14px label, complete text, never truncated */}
                      <div className="space-y-1.5">
                        <h2 className="font-serif text-[19px] sm:text-xl font-normal text-[#F4F1EA] tracking-wide leading-snug break-words">
                          {stage.headline}
                        </h2>
                        <p className="font-sans text-[13px] sm:text-sm font-medium text-[#C7A35A] leading-normal break-words">
                          {stage.title}
                        </p>
                      </div>

                      {/* Short Summary: 15-16px body copy, generous line-height, high contrast */}
                      <p className="font-sans text-[15px] sm:text-base text-[#D1D5DB] leading-relaxed break-words">
                        {stage.shortDesc}
                      </p>

                    </div>

                    {/* Middle: Key Strengths (Clean, readable 14-15px typography) */}
                    <div className="pt-4 my-4 w-full border-t border-[#0F5C46]/25 flex-grow">
                      <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-[#E5E7EB] font-sans">
                        {stage.keyStrengths.map((str) => (
                          <li key={str} className="flex items-start gap-2.5 leading-snug break-words">
                            <span className="text-[#148B78] select-none text-xs mt-1 shrink-0">▪</span>
                            <span className="leading-relaxed">{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom: Full-Width Prominent "Details anzeigen →" Button (No truncated labels) */}
                    <div className="mt-auto pt-4 border-t border-[#0F5C46]/25 w-full">
                      <div className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#C7A35A]/35 bg-[#0F5C46]/20 py-2.5 px-4 font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#F4F1EA] group-hover:bg-[#0F5C46] group-hover:border-[#C7A35A] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(15,92,70,0.4)] transition-all uppercase cursor-pointer">
                        <span>{t.detailsButtonText}</span>
                        <ArrowRight className="h-4 w-4 text-[#C7A35A] group-hover:text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                  </button>
                );
              })}
            </div>
          </main>

          {/* ============================================================ */}
          {/* 3. PROGRESSION TIMELINE & PRESERVED CLOSING STATEMENT         */}
          {/* ============================================================ */}
          <footer className="w-full space-y-4 pt-4">
            
            {/* Chronological progression sequence (fully legible on all devices, wraps naturally) */}
            <div className="w-full rounded-xl border border-[#0F5C46]/35 bg-[#101412] p-4 sm:p-5 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap text-center sm:text-left">
                <span className="font-mono text-xs font-bold tracking-widest text-[#C7A35A] uppercase shrink-0">
                  {t.timelineTitle}:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {t.stages.map((stage, idx) => (
                    <React.Fragment key={stage.id}>
                      {idx > 0 && (
                        <span className="text-[#C7A35A]/50 font-mono text-xs select-none" aria-hidden="true">
                          →
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setDetailModalStage(stage)}
                        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs sm:text-[13px] font-bold tracking-wide uppercase transition-all border ${
                          stage.id === 'ai'
                            ? 'border-[#C7A35A]/60 bg-[#0F5C46]/30 text-[#C7A35A] shadow-sm'
                            : 'border-[#0F5C46]/30 bg-[#080A09] text-[#E5E7EB] hover:border-[#C7A35A] hover:text-[#C7A35A]'
                        } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A35A]`}
                      >
                        <span className="text-[#C7A35A]">{stage.num}</span>
                        <span>{stage.actionVerb}</span>
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Preserved Closing Statement */}
            <div className="text-center pt-2">
              <p className="font-serif text-base sm:text-lg lg:text-xl text-[#F4F1EA] tracking-tight">
                <span className="text-[#148B78] font-medium">{t.closingStatementPart1} </span>
                <span className="text-[#F4F1EA] font-normal">{t.closingStatementPart2} </span>
                <span className="text-[#C7A35A] font-medium">{t.closingStatementPart3}</span>
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
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#C7A35A]/35 bg-[#101412] p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setDetailModalStage(null)}
                className="absolute top-4 right-4 rounded-lg p-2 text-[#A9AEA9] hover:bg-[#080A09] hover:text-[#F4F1EA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A35A]"
                aria-label={t.closeModal}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Stage Identity */}
              <div className="space-y-2 pr-8">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-[#148B78]">
                  <span>{detailModalStage.num}</span>
                  <span className="text-[#0F5C46]">/</span>
                  <span className="text-[#C7A35A]">{detailModalStage.actionVerb}</span>
                  {detailModalStage.focusBadge && (
                    <span className="rounded bg-[#C7A35A]/20 text-[#C7A35A] border border-[#C7A35A]/40 px-2 py-0.5 text-[10px] font-bold">
                      {detailModalStage.focusBadge}
                    </span>
                  )}
                </div>
                <h2 id="modal-stage-title" className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F1EA] tracking-wide">
                  {detailModalStage.headline}
                </h2>
                <p className="font-sans text-sm sm:text-base font-semibold text-[#C7A35A]">
                  {detailModalStage.title}
                </p>
                <p className="font-sans text-sm sm:text-base text-[#D1D5DB] leading-relaxed pt-1">
                  {detailModalStage.shortDesc}
                </p>
              </div>

              {/* Complete Competencies & Methods */}
              <div className="rounded-xl border border-[#0F5C46]/35 bg-[#080A09] p-5 space-y-3">
                <span className="font-mono text-xs font-bold text-[#C7A35A] uppercase tracking-wider block">
                  {t.modalCompetenciesHeader}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {detailModalStage.allCompetencies.map((skill) => (
                    <div key={skill} className="flex items-start gap-2.5 text-sm text-[#E5E7EB] leading-snug">
                      <CheckCircle2 className="h-4 w-4 text-[#148B78] shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extended Details / Factual Background */}
              {detailModalStage.extendedDetails && (
                <div className="rounded-xl border border-[#0F5C46]/30 bg-[#080A09] p-5 text-sm text-[#D1D5DB] leading-relaxed space-y-2">
                  <span className="font-mono text-xs font-bold text-[#C7A35A] uppercase tracking-wider block">
                    {t.modalDetailsHeader}
                  </span>
                  <p className="leading-relaxed">{detailModalStage.extendedDetails}</p>
                </div>
              )}

              {/* Contribution to IT & AI Product Management */}
              {detailModalStage.pmTransfer && (
                <div className="rounded-xl border border-[#148B78]/40 bg-[#0F5C46]/20 p-5 text-sm text-[#F4F1EA] leading-relaxed space-y-2">
                  <span className="font-mono text-xs font-bold text-[#148B78] uppercase tracking-wider block">
                    {t.modalTransferHeader}
                  </span>
                  <p className="leading-relaxed">{detailModalStage.pmTransfer}</p>
                </div>
              )}

              {/* Modal Footer: Link to Certificates and Close button */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#0F5C46]/30">
                <Link
                  to="/certificates"
                  onClick={() => setDetailModalStage(null)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#C7A35A] hover:text-[#F4F1EA] uppercase tracking-wider transition-colors"
                >
                  <Award className="h-4 w-4" />
                  <span>{t.viewCertificatesText}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setDetailModalStage(null)}
                  className="rounded-lg bg-[#0F5C46] px-5 py-2 font-sans text-xs sm:text-sm font-semibold text-[#F4F1EA] hover:bg-[#148B78] transition-colors uppercase cursor-pointer"
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
