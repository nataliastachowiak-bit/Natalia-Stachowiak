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
  TrendingDown,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FlaskConical,
  Leaf,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { Language, MediaAssets } from '../types';
import {
  PROJECT_ECOMARGIN_IMAGE,
  ECOMARGIN_HERO,
  ECOMARGIN_PROBLEM,
  ECOMARGIN_FLOW,
  ECOMARGIN_PROTOTYPE,
} from '../data/assetRegistry';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { CaseStudyBottomNav } from '../components/CaseStudyBottomNav';
import { getPreviousProject, getNextProject, getProjectPath } from '../utils/projectRoutes';

interface EcoMarginCaseStudyPageProps {
  currentLang: Language;
  mediaAssets?: MediaAssets;
}

export const EcoMarginCaseStudyPage: React.FC<EcoMarginCaseStudyPageProps> = ({
  currentLang,
  mediaAssets,
}) => {
  const [activeImageModal, setActiveImageModal] = useState<{ src: string; title: string } | null>(null);

  // Dedicated EcoMargin asset namespace — completely isolated from existing project images
  const heroImageSrc = mediaAssets?.ecomarginHero || mediaAssets?.ecomarginCover || ECOMARGIN_HERO;
  const problemImageSrc = mediaAssets?.ecomarginProblem || ECOMARGIN_PROBLEM;
  const flowImageSrc = mediaAssets?.ecomarginFlow || ECOMARGIN_FLOW;
  const prototypeImageSrc = mediaAssets?.ecomarginPrototype || ECOMARGIN_PROTOTYPE;

  const prevProject = getPreviousProject('ecomargin-ai');
  const nextProject = getNextProject('ecomargin-ai');

  const content = {
    de: {
      backLink: 'Zurück zu allen Projekten',
      badge: 'AI · DATA · PRODUCT MANAGEMENT',
      title: 'EcoMargin AI',
      subtitle: 'Restaurant Decision Intelligence',
      mainStatement: 'See the leak. Understand the cause. Test the decision. Measure the impact.',
      mainStatementLines: [
        'Leckstellen erkennen.',
        'Ursachen verstehen.',
        'Entscheidungen testen.',
        'Wirkung messen.',
      ],
      positioning: 'Von Betriebsdaten zu besseren Entscheidungen.',
      summary:
        'EcoMargin AI untersucht, wie kleine Gastronomiebetriebe mithilfe von KI vermeidbare Kosten- und Ressourcenverluste erkennen, mögliche Ursachen verstehen und daraus konkrete, messbare Maßnahmen ableiten können.',

      // 01 The Challenge
      challengeTag: '01 · DIE HERAUSFORDERUNG',
      challengeHeadline: 'Kleine Verluste. Große Wirkung.',
      challengeText1:
        'Kleine Gastronomiebetriebe — von Cafés über Bistros bis zu inhabergeführten Restaurants — arbeiten unter permanentem Kosten- und Zeitdruck bei gleichzeitig schmalen Margen.',
      challengeText2:
        'Relevante operative Informationen existieren meist bereits, liegen jedoch stark fragmentiert in getrennten Silos:',
      challengeSilos: [
        { label: 'Umsatz & Kasse (POS)', desc: 'Tagesumsätze, Bon-Daten, Stornoquoten' },
        { label: 'Einkauf & Rechnungen', desc: 'Schwankende Lieferantenpreise, Gebindegrößen' },
        { label: 'Wareneinsatz (Food Cost)', desc: 'Theoretische vs. reale Rezepturkosten' },
        { label: 'Lebensmittelabfälle', desc: 'Überproduktion, Rüstabfall, Tellerreste' },
        { label: 'Personal & Schichten', desc: 'Dienstpläne, Stoßzeiten, Überbesetzung' },
        { label: 'Energie & Wasser', desc: 'Kühlketten, Spitzenlasten, Geräteverbrauch' },
      ],
      challengeHighlightTitle: 'DATA ≠ DECISION',
      challengeHighlightDesc:
        'Die Hürde im Gastronomiealltag ist nicht das Fehlen von Daten. Die eigentliche Hürde ist die Übersetzung vorhandener Daten in handlungsorientierte, überprüfbare Entscheidungen. Genau in dieser Lücke liegt die Produktchance.',

      // 02 Product Question
      questionTag: '02 · ZENTRALE PRODUKTFRAGE',
      questionQuote:
        '„Wie können wir verstreute Betriebsdaten in konkrete, verständliche und messbare Entscheidungen übersetzen?“',

      // 03 Discovery
      discoveryTag: '03 · PRODUCT DISCOVERY',
      discoveryHeadline: 'Methodisches Vorgehen im Produktmanagement',
      discoverySteps: [
        'ANNÄHERUNG & HYPOTHESEN',
        'ZIELGRUPPEN-RESEARCH',
        'PROZESS- & DATENVERSTÄNDNIS',
        'MUSTERERKENNUNG',
        'PROBLEM-DEFINITION',
        'PRODUKTCHANCE',
      ],
      discoveryMethods: [
        {
          name: 'Qualitative Interviews',
          why: 'Verständnis des realen Arbeitsalltags von Inhabern und Küchenchefs sowie der Schmerzpunkte bei der Schichtvorbereitung.',
        },
        {
          name: 'Desk & Benchmark Research',
          why: 'Analyse bestehender Gastro-Kassensysteme, ERPs und Bestandssoftware hinsichtlich ihrer Usability und Lücken.',
        },
        {
          name: 'Competitive Landscape Analysis',
          why: 'Identifikation der Lücke im Markt: Bestehende Tools visualisieren Vergangenheitswerte, leiten Betreiber jedoch nicht zu Entscheidungen an.',
        },
        {
          name: 'Affinity Mapping',
          why: 'Strukturierte Clusterung beobachteter Verlustursachen in Wareneinsatz-, Planungs- und Geräteineffizienzen.',
        },
        {
          name: 'Operational Day-in-the-Life',
          why: 'Mapping der Zeitpunkte am Tag, an denen Betreiber disponieren, zubereiten und am ehesten für Entscheidungshilfen empfänglich sind.',
        },
        {
          name: 'How Might We & Priorisierung',
          why: 'Fokussierung auf hochfrequente, vermeidbare Verluste mit kurzen Feedback-Zyklen für ein schlankes MVP.',
        },
      ],

      // User Research
      researchTag: 'ZIELGRUPPE & RESEARCH-FOKUS',
      researchStatus: 'Laufende Untersuchung · Zu validierende Hypothesen',
      researchAudience: 'Kleine Gastronomiebetriebe: Cafés, Bistros, kleine Restaurants',
      researchRoles: 'Inhaber, Betriebsleiter, Küchenchefs',
      researchQuestionsTitle: 'Zentrale Forschungsfragen:',
      researchQuestions: [
        'Wo entstehen im hektischen Tagesgeschäft unerwartete Kostenabweichungen?',
        'Wie werden Einkaufs- und Vorbereitungsmengen aktuell kalkuliert (Bauchgefühl vs. System)?',
        'Wie und wann werden Lebensmittelabfälle im laufenden Betrieb überhaupt bemerkt?',
        'Welche Datenquellen stehen Betreibern heute realistisch zur Verfügung?',
        'In welchem Umfang fließen Ressourcenkosten (Strom, Wasser) in Rezeptkalkulationen ein?',
        'Wie überprüfen Betreiber heute, ob eine eingeleitete Optimierungsmaßnahme erfolgreich war?',
      ],

      // 04 Insights
      insightTag: '04 · ERKENNTNIS-STRUKTUR',
      insightHeadline: 'Evidence → Insight → Product Decision',
      insightSub: 'Klare Trennung zwischen tatsächlicher Evidenz, abgeleiteten Erkenntnissen und Produktentscheidungen.',
      insightsList: [
        {
          num: '01',
          title: 'Fragmentierte Systeme verschleiern schleichende Verluste',
          evidence: 'Kassenbons, Lieferantenrechnungen und Abfalltonnen sind getrennte Inseln. Betreiber bemerken Margenschwund oft erst Wochen später in der BWA.',
          decision: 'EcoMargin AI korreliert Umsatz- und Wareneinsatzsignale kontinuierlich und tagesaktuell, anstatt auf Monatsabschlüsse zu warten.',
        },
        {
          num: '02',
          title: 'Die Angst vor Ausverkäufen treibt Überproduktion',
          evidence: 'Küchenteams bereiten oft großzügige Sicherheitspolster vor, um zur Mittagsspitze keine Kernartikel streichen („86en“) zu müssen.',
          decision: 'Empfehlungen dürfen keine starren Sparvorgaben sein, sondern müssen dynamische Sicherheitspuffer und Risiko-Transparenz bieten.',
        },
        {
          num: '03',
          title: 'Generische Dashboards lösen keine Verhaltensänderung aus',
          evidence: 'Betreiber haben im Servicebetrieb weder Zeit noch Motivation, komplexe Diagramme und Pivot-Tabellen zu analysieren.',
          decision: 'Ersetzung passiver Diagramme durch proaktive, mundgerechte Entscheidungsvorschläge mit klarem Vorher/Nachher-Test.',
        },
      ],

      // 05 Product Opportunity
      opportunityTag: '05 · PRODUKTCHANCE',
      opportunityHeadline: 'Kein weiteres Dashboard. Ein Entscheidungssystem.',
      opportunityText:
        'Klassische Gastronomie-Software zeigt Diagramme der Vergangenheit. EcoMargin AI begleitet den Betreiber durch eine aktive, lernende Entscheidungsschleife:',
      opportunityLoop: ['Signal', 'Verständnis', 'Entscheidung', 'Experiment', 'Evidenz'],

      // 06 How it works
      workflowTag: '06 · FUNKTIONSWEISE',
      workflowHeadline: 'Der 6-stufige Entscheidungs-Loop',
      workflowSub: 'Vom unbemerkten Verlust zur messbaren, dauerhaften Optimierung.',
      workflowSteps: [
        { step: 'DETECT', title: 'Erkennen', question: 'Wo verliere ich Geld oder Ressourcen?' },
        { step: 'UNDERSTAND', title: 'Verstehen', question: 'Was könnten die plausiblen Ursachen sein?' },
        { step: 'SIMULATE', title: 'Simulieren', question: 'Was passiert, wenn ich etwas verändere?' },
        { step: 'EXPERIMENT', title: 'Testen', question: 'Wie kann ich die Anpassung risikofrei testen?' },
        { step: 'MEASURE', title: 'Messen', question: 'Hat es funktioniert? Vorher vs. Nachher.' },
        { step: 'LEARN', title: 'Lernen', question: 'Was behalten, anpassen oder stoppen wir?' },
      ],
      featuresTitle: 'Die 6 Kernfunktionen von EcoMargin AI:',
      features: [
        {
          name: 'Profit & Resource Leak Detection',
          desc: 'Identifiziert ungewöhnliche Muster und schleichende Margenverluste über Waren-, Kassen- und Abfalldaten.',
        },
        {
          name: 'AI Root-Cause Hypotheses',
          desc: 'Schlägt plausible Ursachenerklärungen vor — transparent als testbare Hypothesen ausgewiesen, niemals als unumstößliche Fakten.',
        },
        {
          name: 'What-if Decision Lab',
          desc: 'Ermöglicht das virtuelle Durchspielen alternativer Handlungsoptionen und Trade-offs vor der betrieblichen Umsetzung.',
        },
        {
          name: 'AI Experiment Manager',
          desc: 'Verwandelt eine Handlungsempfehlung in einen klar umrissenen, zeitlich befristeten Testlauf im Restaurantbetrieb.',
        },
        {
          name: 'Before / After Measurement',
          desc: 'Vergleicht Kosten, Ausschuss und Kennzahlen vor und nach der Maßnahme auf Basis realer betrieblicher Evidenz.',
        },
        {
          name: 'Decision Memory',
          desc: 'Speichert ab, was ausprobiert wurde, welche Ergebnisse eintraten und welche Standards dauerhaft beibehalten werden.',
        },
      ],

      // 07 Example Scenario
      exampleTag: '07 · BEISPIEL-SZENARIO',
      exampleBadge: 'Illustratives Szenario · Nicht als validiertes Geschäftsergebnis deklariert',
      exampleTitle: 'Eine Entscheidung in 60 Sekunden verstanden',
      exampleSteps: [
        { label: 'SIGNAL', title: 'Kostenabweichung entdeckt', desc: 'Wareneinsatz für Kategorie B (Backwaren & Frischzubereitung) steigt unerwartet um +8,4 % über den Benchmark.' },
        { label: 'AI HYPOTHESE', title: 'Wetterabhängiger Puffer', desc: 'Mögliche Überproduktion an regnerischen Wochentagen bei gleichbleibend fixen Vorbereitungsmengen.' },
        { label: 'WHAT-IF', title: 'Simulation alternativer Charge', desc: 'Was ändert sich, wenn die Morgen-Charge um 15 % gesenkt und bei Bedarf um 12:30 Uhr frisch nachproduziert wird?' },
        { label: 'EXPERIMENT', title: '10-Tage-Testlauf', desc: 'Test der angepassten Vorbereitungsmenge jeweils von Dienstag bis Donnerstag.' },
        { label: 'MESSUNG', title: 'Vorher / Nachher-Vergleich', desc: '18,2 % weniger Ausschuss, ca. 72 € wöchentliche Einsparung, 0 Ausverkäufe („Stock-outs“) bei Gästen.' },
        { label: 'ENTSCHEIDUNG', title: 'Standard etablieren', desc: 'Anpassung wird als fester Standard (SOP) ins Entscheidungsgedächtnis übernommen.' },
      ],

      // 08 Value
      valueTag: '08 · WIRTSCHAFT & RESSOURCEN',
      valueHeadline: 'Eine Entscheidung. Zwei Perspektiven.',
      valueSub: 'Ökonomischer Mehrwert und Ressourcenschonung sind keine getrennten Welten, sondern verstärken sich gegenseitig.',
      businessTitle: 'Wirtschaftlicher Wert (Business)',
      businessPoints: [
        'Transparenz über verdeckte Margen-Lecks',
        'Fundierte, datengestützte Einkaufs- und Vorbereitungsentscheidungen',
        'Reduktion vermeidbarer Ausgaben im Wareneinsatz',
        'Strukturierte, risikoarme Testläufe vor dauerhaften Änderungen',
      ],
      resourceTitle: 'Ressourcen-Wirkung (Resource)',
      resourcePoints: [
        'Messbare Vermeidung von organischem Lebensmittelabfall',
        'Effizientere Auslastung von Kühl- und Küchengeräten',
        'Geringerer indirekter Wasser- und Energie-Fußabdruck',
        'Beitrag zu nachhaltiger, ressourcenschonender Gastronomie',
      ],

      // 09 Responsible AI
      responsibleTag: '09 · VERANTWORTUNGSVOLLE KI',
      responsibleHeadline: 'KI soll Entscheidungen unterstützen — nicht Gewissheit vortäuschen.',
      responsiblePrinciples: [
        { title: 'Trennung von Daten und Hypothese', desc: 'Gemessene Fakten (z. B. Umsatzrückgang) werden optisch strikt von KI-Erklärungen getrennt.' },
        { title: 'Keine falschen Tatsachen', desc: 'KI-Vorschläge werden stets als testbare Vermutungen formuliert, niemals als unumstößliche Wahrheiten.' },
        { title: 'Sichtbarkeit fehlender Daten', desc: 'Unvollständige Datenbasen oder Unsicherheiten werden transparent offengelegt, statt sie zu kaschieren.' },
        { title: 'Offenlegung von Annahmen', desc: 'What-If-Szenarien zeigen explizit, auf welchen Modell-Annahmen ihre Schätzungen beruhen.' },
        { title: 'Keine Scheingenauigkeit', desc: 'Keine Nachkommastellen-Akrobatik, die eine mathematische Präzision suggeriert, die im Gastro-Alltag nicht existiert.' },
        { title: 'Evidenzbasierte Erfolgsmessung', desc: 'Eine Maßnahme gilt erst dann als „erfolgreich“, wenn Vorher/Nachher-Daten den Effekt belegen.' },
      ],

      // 10 My Role
      roleTag: '10 · MEINE ROLLE',
      roleHeadline: 'Ganzheitliche Produktführung von Discovery bis Konzept',
      roleItems: [
        'Product Discovery',
        'Problem Framing',
        'User Research & Interviews',
        'Competitive Research',
        'Customer Journey & Service Mapping',
        'Product Concept & System Design',
        'MVP Scoping & Priorisierung',
        'AI Interaction Concept',
        'What-If Workflow Prototyping',
        'Validation & Experiment Design',
        'KPI & Metriken-Framework',
        'Produkt-Roadmap',
      ],

      // 11 Personal synthesis
      personalTag: '11 · PERSÖNLICHE SYNTHESE',
      personalHeadline: 'Was dieses Projekt persönlich macht',
      personalText:
        'EcoMargin AI ist die logische Schnittmenge meines gesamten beruflichen und akademischen Werdegangs: Wissenschaftliche Präzision trifft auf Umweltkompetenz und digitale Produktführung.',
      pillarScienceTitle: 'WISSENSCHAFT',
      pillarScienceDesc: 'Hypothese · Experiment · Messung · Empirische Evidenz',
      pillarEnvTitle: 'UMWELTKOMPETENZ',
      pillarEnvDesc: 'Ressourcen · Effizienz · Stoffströme · Vermeidung von Verschwendung',
      pillarPmTitle: 'PRODUKTMANAGEMENT',
      pillarPmDesc: 'Nutzerbedürfnisse · Entscheidungen · Usability · Skalierbares Digitalprodukt',
      pillarResult: 'ECOMARGIN AI',

      // 12 Next validation
      nextTag: '12 · NÄCHSTE SCHRITTE',
      nextHeadline: 'Was ich als Nächstes validieren würde',
      nextSub: 'Reifes Produktmanagement zeichnet sich dadurch aus, offene Fragen ehrlich zu benennen statt fertige Antworten vorzutäuschen.',
      nextQuestions: [
        'Welche Kosten-Leckstellen treten in der Praxis häufig und schwerwiegend genug auf, um eine Software-Nutzung dauerhaft zu rechtfertigen?',
        'Welche Betriebsdaten sind in kleinen Gastronomien realistisch verfügbar, ohne dass Mitarbeiter manuellen Erfassungsaufwand leisten müssen?',
        'Welche Form von Empfehlungen erzeugt ausreichend wahrgenommenen Mehrwert, um eingespielte Küchenroutinen tatsächlich zu verändern?',
        'Wie viel Erklärbarkeit und Kontext benötigt ein Betreiber, um einer KI-Hypothese zu vertrauen?',
        'Welcher Teil des 6-Schritte-Workflows stiftet im initialen MVP den schnellsten spürbaren Nutzen?',
      ],

      // Final statement
      finalQuote1: 'Mehr Daten führen nicht automatisch zu besseren Entscheidungen.',
      finalQuote2: 'Gute Produkte können genau diese Lücke schließen.',
      expandVisual: 'Visualisierung vergrößern',
    },
    en: {
      backLink: 'Back to all projects',
      badge: 'AI · DATA · PRODUCT MANAGEMENT',
      title: 'EcoMargin AI',
      subtitle: 'Restaurant Decision Intelligence',
      mainStatement: 'See the leak. Understand the cause. Test the decision. Measure the impact.',
      mainStatementLines: [
        'See the leak.',
        'Understand the cause.',
        'Test the decision.',
        'Measure the impact.',
      ],
      positioning: 'From operational data to better decisions.',
      summary:
        'EcoMargin AI explores how AI can help small hospitality businesses identify avoidable cost and resource losses, understand possible causes and turn insights into measurable operational actions.',

      // 01 The Challenge
      challengeTag: '01 · THE CHALLENGE',
      challengeHeadline: 'Small losses. Big impact.',
      challengeText1:
        'Small hospitality businesses — from cafés and bistros to independent restaurants — operate under intense cost and time pressure with tight operating margins.',
      challengeText2:
        'Critical operational information typically exists, but is fragmented across disconnected silos:',
      challengeSilos: [
        { label: 'Sales & POS', desc: 'Daily revenue, item mixes, order cancellations' },
        { label: 'Purchasing & Invoices', desc: 'Fluctuating wholesale prices, bulk pack sizes' },
        { label: 'Food Cost', desc: 'Theoretical vs. actual recipe cost variances' },
        { label: 'Food Waste', desc: 'Prep scrap, spoilage, plate leftovers' },
        { label: 'Labor & Scheduling', desc: 'Shift rosters, peak staffing, rush misalignments' },
        { label: 'Energy & Utilities', desc: 'Cold storage, appliances, water usage' },
      ],
      challengeHighlightTitle: 'DATA ≠ DECISION',
      challengeHighlightDesc:
        'The core challenge in hospitality is not collecting more data. The real challenge is turning existing data into useful, validated decisions. The product opportunity lies between them.',

      // 02 Product Question
      questionTag: '02 · CORE PRODUCT QUESTION',
      questionQuote:
        '“How might we turn fragmented operational data into concrete, understandable and measurable decisions?”',

      // 03 Discovery
      discoveryTag: '03 · PRODUCT DISCOVERY',
      discoveryHeadline: 'Structured Product Management Approach',
      discoverySteps: [
        'ASSUMPTIONS',
        'USER RESEARCH',
        'DATA & PROCESS UNDERSTANDING',
        'PATTERNS',
        'PROBLEM DEFINITION',
        'PRODUCT OPPORTUNITY',
      ],
      discoveryMethods: [
        {
          name: 'Qualitative Interviews',
          why: 'Uncovering the day-to-day realities of owners and head chefs and identifying where operational friction truly occurs.',
        },
        {
          name: 'Desk & Benchmark Research',
          why: 'Auditing existing restaurant POS, ERP, and inventory software landscape for usability gaps.',
        },
        {
          name: 'Competitive Landscape Analysis',
          why: 'Identifying the white space: existing tools report past figures, but fail to guide operators toward actionable decisions.',
        },
        {
          name: 'Affinity Mapping',
          why: 'Clustering qualitative feedback into recurring cost-leak, planning, and equipment inefficiency categories.',
        },
        {
          name: 'Operational Day-in-the-Life',
          why: 'Mapping decision moments when managers order, prep, and are most receptive to decision support.',
        },
        {
          name: 'How Might We & Prioritization',
          why: 'Focusing on high-frequency avoidable losses with fast operational feedback loops for MVP scoping.',
        },
      ],

      // User Research
      researchTag: 'TARGET AUDIENCE & RESEARCH FOCUS',
      researchStatus: 'Research in progress · Hypotheses to validate',
      researchAudience: 'Small hospitality businesses: Cafés, Bistros, Independent Restaurants',
      researchRoles: 'Owners, Operations Managers, Kitchen Managers',
      researchQuestionsTitle: 'Core Research Inquiries:',
      researchQuestions: [
        'Where do unexpected cost variances arise during hectic daily operations?',
        'How are purchasing and preparation quantities currently determined (gut feel vs. systems)?',
        'How is food waste currently noticed and monitored?',
        'Which operational data is realistically accessible to operators today?',
        'How are utility resources (energy, water) factored into recipe costs?',
        'How do managers currently verify whether an operational improvement was effective?',
      ],

      // 04 Insights
      insightTag: '04 · INSIGHT STRUCTURE',
      insightHeadline: 'Evidence → Insight → Product Decision',
      insightSub: 'Clear, honest distinction between empirical evidence, insights, and resulting product decisions.',
      insightsList: [
        {
          num: '01',
          title: 'Fragmented systems hide cumulative loss',
          evidence: 'POS tickets, supplier invoices, and scrap bins live in isolated silos. Operators only spot margin erosion weeks later in accounting statements.',
          decision: 'EcoMargin AI continuously correlates sales against food cost and scrap signals daily rather than waiting for monthly reports.',
        },
        {
          num: '02',
          title: 'Fear of stock-outs drives systemic overproduction',
          evidence: 'Kitchen teams prep buffer portions to avoid 86ing popular dishes during lunch rushes.',
          decision: 'Decision guidance must provide dynamic safety buffers and risk transparency rather than rigid cost-cutting commands.',
        },
        {
          num: '03',
          title: 'Generic dashboards fail to trigger operational action',
          evidence: 'Managers have neither time nor inclination to parse complex analytics charts during busy service hours.',
          decision: 'Replace passive dashboards with proactive, bite-sized decision prompts and concrete what-if simulations.',
        },
      ],

      // 05 Product Opportunity
      opportunityTag: '05 · PRODUCT OPPORTUNITY',
      opportunityHeadline: 'Not another dashboard. A decision system.',
      opportunityText:
        'Conventional restaurant software shows graphs of the past. EcoMargin AI guides operators through an active, compounding decision loop:',
      opportunityLoop: ['Signal', 'Understanding', 'Decision', 'Experiment', 'Evidence'],

      // 06 How it works
      workflowTag: '06 · HOW ECOMARGIN WORKS',
      workflowHeadline: 'The 6-Step Decision Loop',
      workflowSub: 'From unnoticed loss to measurable, lasting operational improvement.',
      workflowSteps: [
        { step: 'DETECT', title: 'Detect', question: 'Where am I losing money or resources?' },
        { step: 'UNDERSTAND', title: 'Understand', question: 'What might be causing the leak?' },
        { step: 'SIMULATE', title: 'Simulate', question: 'What could happen if I change something?' },
        { step: 'EXPERIMENT', title: 'Experiment', question: 'How can I test the change safely?' },
        { step: 'MEASURE', title: 'Measure', question: 'Did it work? Before vs. After.' },
        { step: 'LEARN', title: 'Learn', question: 'What should we keep, adjust, or stop?' },
      ],
      featuresTitle: 'The 6 Core Functions of EcoMargin AI:',
      features: [
        {
          name: 'Profit & Resource Leak Detection',
          desc: 'Identifies unusual anomalies and gradual margin/resource losses across sales, inventory, and prep waste.',
        },
        {
          name: 'AI Root-Cause Hypotheses',
          desc: 'Suggests plausible operational explanations — transparently labeled as hypotheses, never as undisputed facts.',
        },
        {
          name: 'What-if Decision Lab',
          desc: 'Allows operators to explore alternative actions and cost/waste trade-offs virtually before changing kitchen routines.',
        },
        {
          name: 'AI Experiment Manager',
          desc: 'Transforms a recommendation into a time-boxed, well-defined, and measurable operational field experiment.',
        },
        {
          name: 'Before / After Measurement',
          desc: 'Directly compares cost, organic waste, and KPIs before and after the action based on concrete operational evidence.',
        },
        {
          name: 'Decision Memory',
          desc: 'Retains institutional knowledge: what was tried, what resulted, and which operational practices should become standard.',
        },
      ],

      // 07 Example Scenario
      exampleTag: '07 · EXAMPLE DECISION',
      exampleBadge: 'Illustrative Scenario · Not presented as validated business outcome',
      exampleTitle: 'A decision understood in 60 seconds',
      exampleSteps: [
        { label: 'SIGNAL', title: 'Cost anomaly detected', desc: 'Food cost for Category B (Bakery & Fresh Prep) spikes +8.4% above historical trend.' },
        { label: 'AI HYPOTHESIS', title: 'Weather-related over-prep', desc: 'Possible overproduction on rainy weekdays due to fixed batch prep despite lower walk-in foot traffic.' },
        { label: 'WHAT-IF', title: 'Simulation of batch adjustment', desc: 'What if morning prep batch is reduced by 15%, backed by an on-demand 12:30 PM fresh top-up prep protocol?' },
        { label: 'EXPERIMENT', title: '10-day test run', desc: 'Testing the adjusted prep schedule for Tuesday through Thursday shifts.' },
        { label: 'MEASUREMENT', title: 'Before / after comparison', desc: '18.2% less food waste, ~€72 weekly savings, 0 stock-out complaints recorded.' },
        { label: 'DECISION', title: 'Establish new standard', desc: 'Adopt protocol into standard operating procedures (SOP) via Decision Memory.' },
      ],

      // 08 Value
      valueTag: '08 · BUSINESS + RESOURCE VALUE',
      valueHeadline: 'One decision. Two perspectives.',
      valueSub: 'Economic value and resource impact are not conflicting worlds; they reinforce each other.',
      businessTitle: 'Business Value',
      businessPoints: [
        'Transparency over hidden margin leaks',
        'Data-backed purchasing and preparation decisions',
        'Reduced avoidable food cost losses',
        'Structured, low-risk operational testing before permanent changes',
      ],
      resourceTitle: 'Resource Impact',
      resourcePoints: [
        'Measurable reduction in avoidable organic food waste',
        'More efficient utilization of refrigeration and prep appliances',
        'Lower indirect water and energy footprint across supply chain',
        'Contribution to sustainable, circular hospitality practices',
      ],

      // 09 Responsible AI
      responsibleTag: '09 · RESPONSIBLE AI',
      responsibleHeadline: 'AI should support decisions — not pretend certainty.',
      responsiblePrinciples: [
        { title: 'Separation of Data and Hypothesis', desc: 'Empirical data findings are visually separated from AI-generated explanations.' },
        { title: 'No False Certainty', desc: 'AI recommendations are always framed as testable hypotheses, never as proven causes.' },
        { title: 'Visibility of Missing Data', desc: 'Incomplete datasets or statistical uncertainties remain prominently visible.' },
        { title: 'Transparency of Assumptions', desc: 'What-if scenarios clearly disclose the baseline model assumptions behind their estimates.' },
        { title: 'No False Precision', desc: 'No spurious decimal places suggesting precision that does not exist in fast-paced restaurant operations.' },
        { title: 'Evidence-Based Verification', desc: 'An action is only labeled successful when concrete before/after evidence validates the outcome.' },
      ],

      // 10 My Role
      roleTag: '10 · MY ROLE',
      roleHeadline: 'End-to-end Product Leadership from Discovery to Concept',
      roleItems: [
        'Product Discovery',
        'Problem Framing',
        'User Research & Interviews',
        'Competitive Research',
        'Customer Journey & Service Mapping',
        'Product Concept & Systems Design',
        'MVP Scoping & Prioritization',
        'AI Interaction Concept',
        'What-If Workflow Prototyping',
        'Validation & Experiment Design',
        'KPI & Metrics Framework',
        'Product Roadmap',
      ],

      // 11 Personal synthesis
      personalTag: '11 · WHAT MAKES THIS PROJECT PERSONAL',
      personalHeadline: 'What makes this project personal',
      personalText:
        'EcoMargin AI represents the natural synthesis of my interdisciplinary background: Scientific rigor meets environmental sustainability and modern digital product management.',
      pillarScienceTitle: 'SCIENCE',
      pillarScienceDesc: 'Hypothesis · Experiment · Measurement · Empirical Evidence',
      pillarEnvTitle: 'ENVIRONMENTAL EXPERTISE',
      pillarEnvDesc: 'Resources · Efficiency · Material Flows · Waste Prevention',
      pillarPmTitle: 'PRODUCT MANAGEMENT',
      pillarPmDesc: 'User Needs · Decisions · Usability · Scalable Digital Product',
      pillarResult: 'ECOMARGIN AI',

      // 12 Next validation
      nextTag: '12 · NEXT VALIDATION',
      nextHeadline: 'What I would validate next',
      nextSub: 'Mature Product Management is characterized by transparently naming open validation questions rather than feigning complete certainty.',
      nextQuestions: [
        'Which cost leak occurs frequently and severely enough to sustain long-term software adoption?',
        'Which operational data is realistically accessible in small hospitality venues without manual data-entry overhead?',
        'Which recommendation framing creates enough perceived value to genuinely alter established kitchen routines?',
        'How much explainability and context do operators need to trust an AI hypothesis?',
        'Which segment of the 6-step loop delivers the fastest tangible value in an initial MVP?',
      ],

      // Final statement
      finalQuote1: 'Better data doesn’t automatically create better decisions.',
      finalQuote2: 'Better products can.',
      expandVisual: 'Expand visual',
    },
    pl: {
      backLink: 'Powrót do wszystkich projektów',
      badge: 'AI · DATA · PRODUCT MANAGEMENT',
      title: 'EcoMargin AI',
      subtitle: 'Restaurant Decision Intelligence',
      mainStatement: 'See the leak. Understand the cause. Test the decision. Measure the impact.',
      mainStatementLines: [
        'Zauważ wyciek.',
        'Zrozum przyczynę.',
        'Przetestuj decyzję.',
        'Zmierz rezultat.',
      ],
      positioning: 'Od danych operacyjnych do lepszych decyzji.',
      summary:
        'EcoMargin AI bada, jak sztuczna inteligencja może pomóc małym przedsiębiorstwom gastronomicznym identyfikować straty kosztowe i zasobowe, rozumieć przyczyny i przekładać wnioski na wymierne działania operacyjne.',

      // 01 The Challenge
      challengeTag: '01 · WYZWANIE',
      challengeHeadline: 'Małe straty. Wielki wpływ.',
      challengeText1:
        'Małe lokale gastronomiczne (kawiarnie, bistra, małe restauracje) funkcjonują pod silną presją kosztów i czasu przy niskich marżach operacyjnych.',
      challengeText2:
        'Istotne dane operacyjne zazwyczaj już istnieją, ale są rozproszone w odrębnych silosach:',
      challengeSilos: [
        { label: 'Sprzedaż & POS', desc: 'Przychody, pozycje w menu, anulacje' },
        { label: 'Zakupy & Faktury', desc: 'Zmienne ceny surowców, wielkości opakowań' },
        { label: 'Food Cost', desc: 'Różnice między recepturami a rzeczywistym zużyciem' },
        { label: 'Odpady i straty', desc: 'Nadprodukcja, straty obróbki, resztki' },
        { label: 'Personel & Grafiki', desc: 'Obsada zmian, godziny szczytu' },
        { label: 'Media & Energia', desc: 'Chłodnictwo, sprzęt kuchenny, woda' },
      ],
      challengeHighlightTitle: 'DATA ≠ DECISION',
      challengeHighlightDesc:
        'Wyzwanie w gastronomii nie polega na zbieraniu większej ilości danych. Rzeczywistym wyzwaniem jest przekształcanie posiadanych danych w użyteczne decyzje. Przestrzeń pomiędzy nimi to szansa produktowa.',

      // 02 Product Question
      questionTag: '02 · KLUCZOWE PYTANIE PRODUKTOWE',
      questionQuote:
        '„Jak możemy przekształcić rozproszone dane operacyjne w konkretne, zrozumiałe i mierzalne decyzje?”',

      // 03 Discovery
      discoveryTag: '03 · PRODUCT DISCOVERY',
      discoveryHeadline: 'Metodyczne podejście w Product Management',
      discoverySteps: [
        'ZAŁOŻENIA',
        'RESEARCH UŻYTKOWNIKÓW',
        'ZROZUMIENIE PROCESÓW I DANYCH',
        'WZORCE',
        'DEFINICJA PROBLEMU',
        'SZANSA PRODUKTOWA',
      ],
      discoveryMethods: [
        {
          name: 'Wywiady jakościowe',
          why: 'Zrozumienie codziennej pracy właścicieli i szefów kuchni oraz punktów tarcia podczas przygotowań.',
        },
        {
          name: 'Desk & Benchmark Research',
          why: 'Analiza rynku systemów POS, ERP i magazynowych dla gastronomii pod kątem luk użyteczności.',
        },
        {
          name: 'Analiza konkurencji',
          why: 'Wskazanie luki: obecne narzędzia raportują przeszłość, ale nie wspierają podejmowania decyzji.',
        },
        {
          name: 'Affinity Mapping',
          why: 'Kategoryzacja zaobserwowanych przyczyn strat w obszarach zakupów, planowania i energii.',
        },
        {
          name: 'Customer Journey & Dzień pracy',
          why: 'Mapowanie momentów, w których menedżerowie podejmują decyzje zakupowe i przygotowawcze.',
        },
        {
          name: 'How Might We & Priorytetyzacja',
          why: 'Skupienie się na powtarzalnych stratach z szybką pętlą informacji zwrotnej dla zakresu MVP.',
        },
      ],

      // User Research
      researchTag: 'GRUPA DOCELOWA & OBSZAR BADAWCZY',
      researchStatus: 'Badania w toku · Hipotezy do weryfikacji',
      researchAudience: 'Mała gastronomia: Kawiarnie, bistra, małe restauracje',
      researchRoles: 'Właściciele, menedżerowie operacyjni, szefowie kuchni',
      researchQuestionsTitle: 'Kluczowe pytania badawcze:',
      researchQuestions: [
        'Gdzie w codziennym pośpiechu powstają nieoczekiwane odchylenia kosztowe?',
        'Jak podejmowane są decyzje o zakupach i partiach przygotowań (intuicja vs. system)?',
        'W jaki sposób i kiedy zauważane jest marnotrawstwo żywności?',
        'Jakie dane są dziś rzeczywiście dostępne dla menedżerów?',
        'W jakim stopniu koszty mediów (prąd, woda) są uwzględniane w kalkulacjach?',
        'Jak oceniana jest skuteczność wprowadzanych zmian operacyjnych?',
      ],

      // 04 Insights
      insightTag: '04 · STRUKTURA WNIOSKÓW',
      insightHeadline: 'Evidence → Insight → Product Decision',
      insightSub: 'Wyraźne rozróżnienie między faktami, wnioskami a decyzjami produktowymi.',
      insightsList: [
        {
          num: '01',
          title: 'Rozproszone systemy ukrywają narastające straty',
          evidence: 'Paragony, faktury i odpady to odrębne silosy. Właściciele zauważają spadek marży dopiero po miesiącu w księgowości.',
          decision: 'EcoMargin AI łączy sygnały sprzedaży i zużycia surowców w czasie rzeczywistym zamiast czekać na zestawienia miesięczne.',
        },
        {
          num: '02',
          title: 'Obawa przed brakami w menu napędza nadprodukcję',
          evidence: 'Kuchnia przygotowuje nadmierne bufory, aby uniknąć braku dań w porze szczytu obiadowego.',
          decision: 'Rekomendacje muszą uwzględniać dynamiczne bufory bezpieczeństwa i transparentność ryzyka zamiast sztywnego cięcia kosztów.',
        },
        {
          num: '03',
          title: 'Standardowe dashboardy nie wywołują zmian zachowań',
          evidence: 'W ferworze serwisu menedżerowie nie mają czasu ani motywacji do analizy skomplikowanych wykresów analitycznych.',
          decision: 'Zastąpienie pasywnych wykresów konkretnymi podpowiedziami decyzyjnymi i symulacjami what-if.',
        },
      ],

      // 05 Product Opportunity
      opportunityTag: '05 · SZANSA PRODUKTOWA',
      opportunityHeadline: 'Nie kolejny dashboard. System podejmowania decyzji.',
      opportunityText:
        'Tradycyjne oprogramowanie gastronomiczne pokazuje wykresy z przeszłości. EcoMargin AI prowadzi użytkownika przez aktywną pętlę decyzyjną:',
      opportunityLoop: ['Sygnał', 'Zrozumienie', 'Decyzja', 'Eksperyment', 'Dowód'],

      // 06 How it works
      workflowTag: '06 · JAK DZIAŁA ECOMARGIN AI',
      workflowHeadline: '6-etapowa pętla decyzyjna',
      workflowSub: 'Od niezauważonej straty do mierzalnej, trwałej poprawy operacyjnej.',
      workflowSteps: [
        { step: 'DETECT', title: 'Wykryj', question: 'Gdzie tracę pieniądze lub zasoby?' },
        { step: 'UNDERSTAND', title: 'Zrozum', question: 'Co może być przyczyną problemu?' },
        { step: 'SIMULATE', title: 'Symuluj', question: 'Co się stanie, jeśli zmienię parametry?' },
        { step: 'EXPERIMENT', title: 'Przetestuj', question: 'Jak mogę bezpiecznie sprawdzić zmianę?' },
        { step: 'MEASURE', title: 'Zmierz', question: 'Czy to zadziałało? Porównanie przed i po.' },
        { step: 'LEARN', title: 'Ucz się', question: 'Co zachować, zmodyfikować lub zatrzymać?' },
      ],
      featuresTitle: '6 kluczowych funkcji EcoMargin AI:',
      features: [
        {
          name: 'Profit & Resource Leak Detection',
          desc: 'Wykrywa nietypowe wzorce i ukryte straty marży w danych sprzedaży i odpadów.',
        },
        {
          name: 'AI Root-Cause Hypotheses',
          desc: 'Proponuje prawdopodobne przyczyny — przejrzyście oznaczone jako hipotezy do weryfikacji, a nie bezwzględne fakty.',
        },
        {
          name: 'What-if Decision Lab',
          desc: 'Umożliwia wirtualne testowanie alternatywnych decyzji przed wprowadzeniem zmian w kuchni.',
        },
        {
          name: 'AI Experiment Manager',
          desc: 'Przekształca rekomendację w ograniczony czasowo, precyzyjnie określony i mierzalny test operacyjny.',
        },
        {
          name: 'Before / After Measurement',
          desc: 'Porównuje koszty, odpady i wskaźniki przed i po wdrożeniu na podstawie twardych danych.',
        },
        {
          name: 'Decision Memory',
          desc: 'Zachowuje wiedzę organizacji: co przetestowano, jakie były rezultaty i które standardy wdrożyć na stałe.',
        },
      ],

      // 07 Example Scenario
      exampleTag: '07 · PRZYKŁAD DECYZJI',
      exampleBadge: 'Scenariusz ilustracyjny · Nie stanowi zweryfikowanego wyniku biznesowego',
      exampleTitle: 'Decyzja zrozumiana w 60 sekund',
      exampleSteps: [
        { label: 'SYGNAŁ', title: 'Wykryto anomalię kosztową', desc: 'Food cost dla kategorii B (wypieki i świeże półprodukty) rośnie o +8,4 % powyżej normy.' },
        { label: 'HIPOTEZA AI', title: 'Wpływ deszczowych dni', desc: 'Możliwa nadprodukcja w deszczowe dni robocze przy stałych, niezmiennych wielkościach partii.' },
        { label: 'WHAT-IF', title: 'Symulacja mniejszej partii', desc: 'Co jeśli zmniejszymy partię poranną o 15 % z opcją szybkiego przygotowania świeżej partii o 12:30?' },
        { label: 'EKSPERYMENT', title: '10-dniowy test', desc: 'Przetestowanie dostosowanego harmonogramu od wtorku do czwartku.' },
        { label: 'POMIAR', title: 'Porównanie przed i po', desc: '18,2 % mniej odpadów, ok. 72 € oszczędności tygodniowo, 0 braków dań dla gości.' },
        { label: 'DECYZJA', title: 'Wdrożenie standardu', desc: 'Zapisanie nowego protokołu jako stałego standardu operacyjnego (SOP) w pamięci decyzji.' },
      ],

      // 08 Value
      valueTag: '08 · BIZNES I ŚRODOWISKO',
      valueHeadline: 'Jedna decyzja. Dwie perspektywy.',
      valueSub: 'Wartość ekonomiczna i ochrona zasobów wzajemnie się wzmacniają.',
      businessTitle: 'Wartość biznesowa',
      businessPoints: [
        'Przejrzystość ukrytych wycieków marży',
        'Trafniejsze decyzje zakupowe i przygotowawcze oparte na danych',
        'Zmniejszenie niepotrzebnych strat w kosztach surowców',
        'Ustrukturyzowane, bezpieczne testy przed trwałymi zmianami',
      ],
      resourceTitle: 'Ochrona zasobów',
      resourcePoints: [
        'Mierzalna redukcja marnotrawstwa żywności',
        'Efektywniejsze wykorzystanie urządzeń chłodniczych i kuchennych',
        'Mniejszy ślad węglowy, wodny i energetyczny w łańcuchu dostaw',
        'Wkład w zrównoważoną i cyrkularną gastronomię',
      ],

      // 09 Responsible AI
      responsibleTag: '09 · ODPOWIEDZIALNE AI',
      responsibleHeadline: 'Sztuczna inteligencja ma wspierać decyzje — nie udawać pewności.',
      responsiblePrinciples: [
        { title: 'Rozdzielenie danych i hipotez', desc: 'Twarde dane liczbowe są wizualnie oddzielone od wyjaśnień generowanych przez AI.' },
        { title: 'Brak fałszywej pewności', desc: 'Sugestie AI są zawsze formułowane jako hipotezy do testu, nigdy jako bezdyskusyjne fakty.' },
        { title: 'Widoczność brakujących danych', desc: 'Niepełne dane i niepewności są jasno eksponowane, a nie ukrywane.' },
        { title: 'Przejrzystość założeń', desc: 'Scenariusze what-if wyraźnie wskazują przyjęte założenia modelowe.' },
        { title: 'Brak pozornej precyzji', desc: 'Unikanie sztucznej dokładności do miejsc po przecinku, która nie ma pokrycia w realiach lokalu.' },
        { title: 'Dowody przed deklaracją sukcesu', desc: 'Działanie uznaje się za skuteczne dopiero wtedy, gdy potwierdzą to dane przed i po.' },
      ],

      // 10 My Role
      roleTag: '10 · MOJA ROLA',
      roleHeadline: 'Kompleksowe przywództwo produktowe od Discovery po Koncepcję',
      roleItems: [
        'Product Discovery',
        'Problem Framing',
        'User Research & Wywiady',
        'Badanie konkurencji',
        'Customer Journey & Service Mapping',
        'Koncepcja produktu & Projekt systemu',
        'Zakres MVP & Priorytetyzacja',
        'AI Interaction Concept',
        'Prototypowanie what-if',
        'Projektowanie walidacji i testów',
        'Framework KPI i metryk',
        'Roadmapa produktu',
      ],

      // 11 Personal synthesis
      personalTag: '11 · CO CZYNI TEN PROJEKT OSOBISTYM',
      personalHeadline: 'Co czyni ten projekt osobistym',
      personalText:
        'EcoMargin AI to bezpośrednia synteza mojego wykształcenia i doświadczenia: Ścisła metodologia naukowa łączy się ze specjalizacją środowiskową i cyfrowym product managementem.',
      pillarScienceTitle: 'NAUKA',
      pillarScienceDesc: 'Hipoteza · Eksperyment · Pomiar · Empiryczny dowód',
      pillarEnvTitle: 'OCHRONA ŚRODOWISKA',
      pillarEnvDesc: 'Zasoby · Efektywność · Obiegi materiałowe · Redukcja strat',
      pillarPmTitle: 'PRODUCT MANAGEMENT',
      pillarPmDesc: 'Potrzeby użytkowników · Decyzje · Użyteczność · Skalowalny produkt cyfrowy',
      pillarResult: 'ECOMARGIN AI',

      // 12 Next validation
      nextTag: '12 · CO WALIDOWAŁABYM DALEJ',
      nextHeadline: 'Co walidowałabym jako następne',
      nextSub: 'Dojrzały Product Management otwarcie wskazuje pytania wymagające empirycznej walidacji, zamiast udawać kompletny sukces.',
      nextQuestions: [
        'Które straty kosztowe występują na tyle często i dotkliwie, by uzasadnić wdrożenie oprogramowania?',
        'Które dane operacyjne są realistycznie dostępne w małych lokalach bez konieczności ręcznego wprowadzania?',
        'Jaki sposób formułowania rekomendacji daje wystarczającą wartość, by realnie zmienić nawyki kuchenne?',
        'Jakiego poziomu wyjaśnialności potrzebuje menedżer, by zaufać hipotezie wygenerowanej przez AI?',
        'Która część 6-etapowej pętli decyzyjnej przynosi najszybszą odczuwalną wartość w początkowym MVP?',
      ],

      // Final statement
      finalQuote1: 'Lepsze dane nie prowadzą automatycznie do lepszych decyzji.',
      finalQuote2: 'Dobre produkty potrafią tę lukę wypełnić.',
      expandVisual: 'Powiększ grafikę',
    },
  }[currentLang];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#080A09] text-[#F4F1EA] selection:bg-[#0F5C46] selection:text-[#C7A35A] pb-20">
        
        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* Premium dark hero, selective emerald & gold accents, concise statement   */}
        {/* ========================================================================= */}
        <header className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-8 sm:pt-14 pb-8 sm:pb-12">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-72 w-[450px] rounded-full bg-[#10B981]/10 blur-[140px]" />
          <div className="pointer-events-none absolute top-16 right-10 h-64 w-64 rounded-full bg-[#C7A35A]/10 blur-[130px]" />

          {/* Breadcrumb Back Link & Case Study Number */}
          <div className="relative z-10 mb-6 flex items-center justify-between">
            <BackToPortfolio currentLang={currentLang} />
            <span className="font-mono text-xs font-bold tracking-widest text-[#C7A35A]/80">
              08 / CASE STUDY
            </span>
          </div>

          <div className="relative z-10 space-y-6">
            {/* Small Label */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase">
                PROJEKT 08 · {content.badge}
              </span>
            </div>

            {/* Headline & Subtitle */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4F1EA] leading-[1.05]">
                {content.title}
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-[#C7A35A] italic">
                {content.subtitle}
              </p>
            </div>

            {/* Main Statement Box: See the leak. Understand the cause. Test the decision. Measure the impact. */}
            <div className="rounded-2xl border border-[#C7A35A]/30 bg-[#101412] p-5 sm:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.85)] max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 font-mono text-sm sm:text-base font-semibold text-[#F4F1EA]">
                {content.mainStatementLines.map((line, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 pt-4 border-t border-[#C7A35A]/15 font-sans text-xs sm:text-sm text-[#A9AEA9] leading-relaxed">
                {content.summary}
              </p>
            </div>

            {/* Disclaimer & Transparency Note */}
            <div className="pt-1 max-w-3xl">
              <div className="rounded-xl border border-[#0F5C46]/40 bg-[#080A09]/90 p-3.5 text-xs text-[#A9AEA9] flex items-start gap-2.5">
                <Info className="h-4 w-4 shrink-0 text-[#10B981] mt-0.5" />
                <p>
                  {currentLang === 'de'
                    ? 'Portfolio-Fallstudie zur Produktkonzeption. Ergebnisse basieren auf methodischer Problemanalyse und strukturierten Hypothesen — keine unvalidierten Erfolgsversprechen.'
                    : currentLang === 'pl'
                    ? 'Studium przypadku product managementu. Wyniki opierają się na metodycznej analizie problemu i ustrukturyzowanych hipotezach — bez niezweryfikowanych obietnic.'
                    : 'Product Management portfolio case study. Insights stem from methodical problem discovery and structured hypotheses — no unvalidated claims.'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* HERO VISUAL PLACEHOLDER: [ECOMARGIN_HERO]                                 */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto py-4 sm:py-8">
          <div
            onClick={() =>
              setActiveImageModal({
                src: heroImageSrc,
                title: 'EcoMargin AI — Hero Overview',
              })
            }
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#148B78]/40 bg-[#101412] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#10B981] transition-all duration-300 aspect-[16/10] sm:aspect-[16/9]"
          >
            <img
              src={heroImageSrc}
              alt="EcoMargin AI Hero Visual"
              loading="eager"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = ECOMARGIN_HERO;
              }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/60 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-[#080A09]/85 px-3.5 py-1 text-xs font-medium text-[#F4F1EA] backdrop-blur-md">
              <Eye className="h-3.5 w-3.5 text-[#10B981]" />
              <span>{content.expandVisual}</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 01 — THE CHALLENGE                                                        */}
        {/* Small losses. Big impact. Fragmented data silos. DATA ≠ DECISION          */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase block">
              {content.challengeTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.challengeHeadline}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#D1D5DB] leading-relaxed max-w-3xl">
              {content.challengeText1}
            </p>
          </div>

          {/* 6 Fragmented Silos Grid */}
          <div className="space-y-3">
            <p className="font-mono text-xs text-[#A9AEA9] uppercase tracking-wider">
              {content.challengeText2}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {content.challengeSilos.map((silo, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#C7A35A]/20 bg-[#101412] p-4 space-y-1 hover:border-[#C7A35A]/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#C7A35A] font-bold">0{idx + 1}</span>
                    <span className="font-sans text-sm font-semibold text-[#F4F1EA]">{silo.label}</span>
                  </div>
                  <p className="font-sans text-xs text-[#A9AEA9]">{silo.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: Problem Graphic [ECOMARGIN_PROBLEM] */}
          <div
            onClick={() =>
              setActiveImageModal({
                src: problemImageSrc,
                title: 'Data Silos vs. Decision System',
              })
            }
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#C7A35A]/25 bg-[#101412] p-2 hover:border-[#C7A35A] transition-all"
          >
            <img
              src={problemImageSrc}
              alt="Fragmented Silos vs Decision System"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = ECOMARGIN_PROBLEM;
              }}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          {/* Highlighting DATA != DECISION */}
          <div className="rounded-2xl border border-[#C7A35A]/40 bg-gradient-to-r from-[#101412] via-[#0D1813] to-[#101412] p-6 sm:p-8 text-center space-y-3 shadow-lg">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#C7A35A] tracking-wider block">
              {content.challengeHighlightTitle}
            </span>
            <p className="font-serif text-base sm:text-lg text-[#F4F1EA] max-w-2xl mx-auto italic leading-relaxed">
              {content.challengeHighlightDesc}
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 02 — CORE PRODUCT QUESTION                                                */}
        {/* Strong breakout visual separator                                          */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-10 sm:py-14">
          <div className="rounded-3xl border-2 border-[#10B981]/40 bg-[#0A110D] p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-[#10B981]/15 blur-[80px]" />
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#10B981] uppercase block mb-3">
              {content.questionTag}
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F1EA] leading-snug font-normal max-w-3xl mx-auto">
              {content.questionQuote}
            </blockquote>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 03 — PRODUCT DISCOVERY & USER RESEARCH                                    */}
        {/* Discovery process + Research focus                                        */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-10">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase block">
              {content.discoveryTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.discoveryHeadline}
            </h2>
          </div>

          {/* Linear PM Process Bar */}
          <div className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-5 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[700px] gap-2 font-mono text-xs font-semibold">
              {content.discoverySteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-3 py-1.5 rounded-lg bg-[#080A09] border border-[#C7A35A]/30 text-[#C7A35A] text-center whitespace-nowrap">
                    {step}
                  </div>
                  {idx < content.discoverySteps.length - 1 && (
                    <span className="text-[#10B981] font-bold">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Method Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.discoveryMethods.map((m, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#C7A35A]/20 bg-[#101412] p-5 space-y-2 hover:border-[#10B981]/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
                  <h3 className="font-sans text-sm font-bold text-[#F4F1EA] uppercase tracking-wider">
                    {m.name}
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#A9AEA9] leading-relaxed">
                  {m.why}
                </p>
              </div>
            ))}
          </div>

          {/* Research Focus Box (Clearly labeled "Research in progress") */}
          <div className="rounded-2xl border border-[#C7A35A]/30 bg-[#0B100D] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#C7A35A]/20">
              <span className="font-mono text-xs font-bold text-[#C7A35A] tracking-wider uppercase">
                {content.researchTag}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F59E0B]/50 bg-[#F59E0B]/10 px-3 py-0.5 text-xs font-mono font-medium text-[#F59E0B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                {content.researchStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#10B981] font-mono font-bold uppercase tracking-wider">Zielgruppe / Segmente:</span>
                <p className="text-[#F4F1EA]">{content.researchAudience}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#10B981] font-mono font-bold uppercase tracking-wider">Relevante Rollen:</span>
                <p className="text-[#F4F1EA]">{content.researchRoles}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="font-sans text-xs font-bold text-[#F4F1EA] uppercase tracking-wider block">
                {content.researchQuestionsTitle}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {content.researchQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D1D5DB] leading-relaxed">
                    <span className="font-mono text-[#C7A35A] font-bold shrink-0 mt-0.5">•</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 04 — THE INSIGHT                                                          */}
        {/* Evidence -> Insight -> Product Decision                                   */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase block">
              {content.insightTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.insightHeadline}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A9AEA9]">
              {content.insightSub}
            </p>
          </div>

          <div className="space-y-4">
            {content.insightsList.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-6 space-y-4 hover:border-[#10B981]/60 transition-all shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#C7A35A] px-2.5 py-1 rounded bg-[#080A09] border border-[#C7A35A]/30">
                    INSIGHT {item.num}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-[#F4F1EA]">
                    {item.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#C7A35A]/15 text-xs">
                  <div className="space-y-1 bg-[#080A09]/60 p-3.5 rounded-xl border border-red-500/20">
                    <span className="font-mono text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                      BEWEISLAGE / BEOBACHTUNG (EVIDENCE):
                    </span>
                    <p className="text-[#D1D5DB] leading-relaxed">{item.evidence}</p>
                  </div>
                  <div className="space-y-1 bg-[#080A09]/60 p-3.5 rounded-xl border border-[#10B981]/30">
                    <span className="font-mono text-[11px] font-bold text-[#10B981] uppercase tracking-wider block">
                      PRODUKTENTSCHEIDUNG (PRODUCT IMPLICATION):
                    </span>
                    <p className="text-[#D1D5DB] leading-relaxed">{item.decision}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 05 — PRODUCT OPPORTUNITY                                                  */}
        {/* Not another dashboard. A decision system.                                 */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-6">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase block">
              {content.opportunityTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.opportunityHeadline}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#D1D5DB] leading-relaxed max-w-3xl">
              {content.opportunityText}
            </p>
          </div>

          {/* Loop visualization bar */}
          <div className="rounded-2xl border border-[#C7A35A]/30 bg-[#101412] p-6">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs font-bold text-center">
              {content.opportunityLoop.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="rounded-full border border-[#10B981]/40 bg-[#0F5C46]/20 px-4 py-1.5 text-[#10B981] tracking-wider">
                    {item.toUpperCase()}
                  </span>
                  {idx < content.opportunityLoop.length - 1 && (
                    <span className="text-[#C7A35A] font-sans">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 06 — HOW ECOMARGIN WORKS (MAIN VISUAL)                                     */}
        {/* Detect -> Understand -> Simulate -> Experiment -> Measure -> Learn         */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-10">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#10B981] uppercase block">
              {content.workflowTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4F1EA]">
              {content.workflowHeadline}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A9AEA9]">
              {content.workflowSub}
            </p>
          </div>

          {/* Main Visual Image Flow [ECOMARGIN_FLOW] */}
          <div
            onClick={() =>
              setActiveImageModal({
                src: flowImageSrc,
                title: 'EcoMargin AI 6-Step Decision Loop',
              })
            }
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#10B981]/40 bg-[#101412] p-2 hover:border-[#10B981] transition-all shadow-xl"
          >
            <img
              src={flowImageSrc}
              alt="EcoMargin AI Decision Loop Flow"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = ECOMARGIN_FLOW;
              }}
              className="w-full h-auto object-contain rounded-xl"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-[#080A09]/85 px-3.5 py-1 text-xs font-medium text-[#F4F1EA] backdrop-blur-md">
              <Eye className="h-3.5 w-3.5 text-[#10B981]" />
              <span>{content.expandVisual}</span>
            </div>
          </div>

          {/* 6 Step Interactive Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.workflowSteps.map((ws, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#C7A35A]/25 bg-[#101412] p-5 space-y-2 hover:border-[#C7A35A] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#10B981]">
                    0{idx + 1} · {ws.step}
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#C7A35A]">
                    {ws.title}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#D1D5DB] italic">
                  „{ws.question}“
                </p>
              </div>
            ))}
          </div>

          {/* Connected Product Functions Grid */}
          <div className="space-y-4 pt-6">
            <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA] text-center">
              {content.featuresTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#0F5C46]/35 bg-[#0C120F] p-5 space-y-2 hover:border-[#10B981] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                    <h4 className="font-sans text-xs font-bold text-[#F4F1EA] uppercase tracking-wider">
                      {feat.name}
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-[#A9AEA9] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prototype Console Mock [ECOMARGIN_PROTOTYPE] */}
          <div
            onClick={() =>
              setActiveImageModal({
                src: prototypeImageSrc,
                title: 'EcoMargin AI — Interactive Console Prototype',
              })
            }
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#C7A35A]/30 bg-[#101412] p-2 hover:border-[#C7A35A] transition-all shadow-xl"
          >
            <img
              src={prototypeImageSrc}
              alt="EcoMargin AI Prototype Console"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = ECOMARGIN_PROTOTYPE;
              }}
              className="w-full h-auto object-contain rounded-xl"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-[#080A09]/85 px-3.5 py-1 text-xs font-medium text-[#F4F1EA] backdrop-blur-md">
              <Eye className="h-3.5 w-3.5 text-[#10B981]" />
              <span>{content.expandVisual}</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 07 — EXAMPLE DECISION (ILLUSTRATIVE SCENARIO)                             */}
        {/* Clearly labeled as illustrative, not validated business claim             */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-8">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase">
                {content.exampleTag}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C7A35A]/40 bg-[#101412] px-3 py-0.5 text-[11px] font-mono text-[#C7A35A]">
                <Info className="h-3 w-3 text-[#C7A35A]" />
                {content.exampleBadge}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.exampleTitle}
            </h2>
          </div>

          {/* Sequential 6-Step Storytelling Container */}
          <div className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.exampleSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#C7A35A]/20 bg-[#080A09] p-4 space-y-1.5 hover:border-[#10B981]/50 transition-colors"
                >
                  <span className="font-mono text-[10px] font-bold text-[#10B981] px-2 py-0.5 rounded bg-[#0F5C46]/20 uppercase">
                    {step.label}
                  </span>
                  <h3 className="font-serif text-sm font-semibold text-[#F4F1EA] pt-1">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-[#A9AEA9] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 08 — BUSINESS + RESOURCE VALUE                                            */}
        {/* One decision. Two perspectives.                                           */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-8">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase block">
              {content.valueTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.valueHeadline}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A9AEA9]">
              {content.valueSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Side */}
            <div className="rounded-2xl border border-[#C7A35A]/40 bg-[#101412] p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#C7A35A]/20">
                <Briefcase className="h-5 w-5 text-[#C7A35A]" />
                <h3 className="font-serif text-lg font-bold text-[#F4F1EA]">
                  {content.businessTitle}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D1D5DB]">
                {content.businessPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C7A35A] mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resource Side */}
            <div className="rounded-2xl border border-[#0F5C46]/50 bg-[#0C1410] p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#0F5C46]/30">
                <Leaf className="h-5 w-5 text-[#10B981]" />
                <h3 className="font-serif text-lg font-bold text-[#F4F1EA]">
                  {content.resourceTitle}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D1D5DB]">
                {content.resourcePoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981] mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 09 — RESPONSIBLE AI                                                       */}
        {/* AI should support decisions — not pretend certainty.                      */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#10B981] uppercase block">
              {content.responsibleTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.responsibleHeadline}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.responsiblePrinciples.map((p, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#C7A35A]/25 bg-[#101412] p-5 space-y-2 hover:border-[#C7A35A] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#10B981] shrink-0" />
                  <h3 className="font-sans text-xs font-bold text-[#F4F1EA] uppercase tracking-wider">
                    {p.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#A9AEA9] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10 — MY ROLE                                                              */}
        {/* Editorial layout of Product Management responsibilities                   */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase block">
              {content.roleTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.roleHeadline}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {content.roleItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[#C7A35A]/20 bg-[#080A09] p-3 text-center hover:border-[#10B981] transition-colors"
                >
                  <span className="font-sans text-xs font-medium text-[#D1D5DB] block">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11 — WHAT MAKES THIS PROJECT PERSONAL                                     */}
        {/* Science + Environmental Expertise + Product Management = EcoMargin AI     */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-8">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase block">
              {content.personalTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.personalHeadline}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] leading-relaxed">
              {content.personalText}
            </p>
          </div>

          <div className="rounded-2xl border border-[#C7A35A]/30 bg-[#0E1411] p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center text-center">
              {/* Pillar 1: Science */}
              <div className="md:col-span-2 rounded-xl border border-[#C7A35A]/30 bg-[#101412] p-5 space-y-2">
                <FlaskConical className="h-6 w-6 text-[#C7A35A] mx-auto" />
                <h3 className="font-mono text-xs font-bold text-[#C7A35A] tracking-wider uppercase">
                  {content.pillarScienceTitle}
                </h3>
                <p className="font-sans text-xs text-[#A9AEA9]">
                  {content.pillarScienceDesc}
                </p>
              </div>

              <div className="md:col-span-1 text-2xl font-mono text-[#10B981] font-bold">
                +
              </div>

              {/* Pillar 2: Environmental */}
              <div className="md:col-span-2 rounded-xl border border-[#0F5C46]/50 bg-[#101412] p-5 space-y-2">
                <Leaf className="h-6 w-6 text-[#10B981] mx-auto" />
                <h3 className="font-mono text-xs font-bold text-[#10B981] tracking-wider uppercase">
                  {content.pillarEnvTitle}
                </h3>
                <p className="font-sans text-xs text-[#A9AEA9]">
                  {content.pillarEnvDesc}
                </p>
              </div>

              <div className="md:col-span-1 text-2xl font-mono text-[#10B981] font-bold">
                +
              </div>

              {/* Pillar 3: Product Management */}
              <div className="md:col-span-2 rounded-xl border border-[#C7A35A]/30 bg-[#101412] p-5 space-y-2">
                <Brain className="h-6 w-6 text-[#C7A35A] mx-auto" />
                <h3 className="font-mono text-xs font-bold text-[#C7A35A] tracking-wider uppercase">
                  {content.pillarPmTitle}
                </h3>
                <p className="font-sans text-xs text-[#A9AEA9]">
                  {content.pillarPmDesc}
                </p>
              </div>
            </div>

            {/* Equals Result Box */}
            <div className="mt-8 pt-6 border-t border-[#C7A35A]/20 text-center">
              <span className="font-mono text-xs font-bold text-[#A9AEA9] uppercase tracking-wider block mb-2">
                = ERGEBNIS &amp; PERSPEKTIVE:
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F1EA] tracking-wider">
                {content.pillarResult}
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 12 — NEXT VALIDATION                                                      */}
        {/* Honest, mature Product Management validation questions                    */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 border-t border-[#C7A35A]/15 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C7A35A] uppercase block">
              {content.nextTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              {content.nextHeadline}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A9AEA9]">
              {content.nextSub}
            </p>
          </div>

          <div className="space-y-3">
            {content.nextQuestions.map((q, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#0F5C46]/30 bg-[#101412] p-4 flex items-start gap-3 text-xs sm:text-sm text-[#D1D5DB]"
              >
                <HelpCircle className="h-4 w-4 text-[#C7A35A] shrink-0 mt-0.5" />
                <p className="leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL STATEMENT & NAVIGATION                                              */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-14 sm:py-20 text-center space-y-6">
          <div className="space-y-2">
            <p className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
              {content.finalQuote1}
            </p>
            <p className="font-serif text-2xl sm:text-3xl text-[#C7A35A] italic">
              {content.finalQuote2}
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-6 py-3 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] transition-all hover:bg-[#148B78] uppercase shadow-md"
            >
              <ArrowLeft className="h-4 w-4 text-[#C7A35A]" />
              <span>{content.backLink}</span>
            </Link>
          </div>
        </section>

        {/* Bottom Case Study Cycler (Prev / Next) */}
        <CaseStudyBottomNav
          currentLang={currentLang}
          allProjectsUrl="/projects"
          prevProjectUrl={getProjectPath(prevProject)}
          prevProjectTitle={prevProject.name}
          nextProjectUrl={getProjectPath(nextProject)}
          nextProjectTitle={nextProject.name}
        />

        {/* Image Modal for Detail Inspection */}
        {activeImageModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fadeIn"
            onClick={() => setActiveImageModal(null)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl border border-[#C7A35A]/50 bg-[#080A09] p-3 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 px-2 border-b border-[#C7A35A]/20">
                <span className="font-serif text-sm font-semibold text-[#F4F1EA]">
                  {activeImageModal.title}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveImageModal(null)}
                  className="rounded-full p-1.5 text-[#C7A35A] hover:bg-[#101412] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-3 flex-1 overflow-auto flex items-center justify-center bg-[#050706] rounded-xl p-2">
                <img
                  src={activeImageModal.src}
                  alt={activeImageModal.title}
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
