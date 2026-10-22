import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Compass,
  Workflow,
  Cpu,
  FileText,
  Eye,
  ShieldCheck,
  Award,
  ExternalLink,
  ChevronDown,
  ChevronsUpDown,
  Search,
  X,
  SearchX,
} from 'lucide-react';
import { CertificateItem, Language } from '../types';
import { CERTIFICATES, ACADEMIC_CERTIFICATES } from '../data/portfolioData';
import { CertificateViewModal } from '../components/CertificateViewModal';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';

interface CertificatesPageProps {
  currentLang: Language;
}

type CategoryId = 'academic' | 'product' | 'agile' | 'ai';

interface CategoryDefinition {
  id: CategoryId;
  icon: React.ComponentType<{ className?: string }>;
  title: { de: string; en: string; pl: string };
  subtitle: { de: string; en: string; pl: string };
  items: CertificateItem[];
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ currentLang }) => {
  // Search query state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Track accordion expand/collapse per category
  const [expandedCategories, setExpandedCategories] = useState<Record<CategoryId, boolean>>({
    academic: false,
    product: false,
    agile: false,
    ai: false,
  });

  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  const t = {
    de: {
      eyebrow: 'OFFIZIELLE NACHWEISE & QUALIFIKATIONEN',
      title: 'Zertifikate & Qualifikationen',
      subtitle:
        'Vier gleichwertige Kompetenzbereiche: Akademische Abschlüsse, digitales Produktmanagement, agile Methoden und moderne KI-Technologien.',
      searchPlaceholder:
        'Zertifikate durchsuchen (z. B. Scrum, AI Act, ISO, Chemie, edX, Product)...',
      credentialsLabel: 'Nachweise',
      viewCert: 'Zertifikat ansehen',
      verifyOnline: 'Verify Credential',
      expandAll: 'Alle aufklappen',
      collapseAll: 'Alle schließen',
      officialDoc: 'Originaldokument hinterlegt',
      pendingDoc: 'Original-PDF noch nicht hinterlegt',
      searchMatches: (count: number) =>
        count === 1 ? '1 Nachweis gefunden' : `${count} Nachweise gefunden`,
      noResultsTitle: 'Keine Zertifikate gefunden',
      noResultsDesc: (q: string) =>
        `Für den Suchbegriff „${q}“ wurde kein passendes Zertifikat gefunden.`,
      clearSearch: 'Suche zurücksetzen',
      trustNotice:
        'Alle 21 Dokumente sind originalgetreu als PDF hinterlegt und durch die jeweiligen Universitäten, Institute und Zertifizierungsstellen verifiziert.',
      trustPartners:
        'Adam-Mickiewicz-Universität Posen · Scrum.org · TrainMiC · Europäischer Sozialfonds · Franklin IAS · Pioneer People · AI CHAMPIONS',
    },
    en: {
      eyebrow: 'OFFICIAL CREDENTIALS & QUALIFICATIONS',
      title: 'Certificates & Qualifications',
      subtitle:
        'Four core pillars: Academic university degrees, digital product leadership, agile frameworks, and artificial intelligence.',
      searchPlaceholder:
        'Search certificates (e.g. Scrum, AI Act, ISO, Chemistry, edX, Product)...',
      credentialsLabel: 'Credentials',
      viewCert: 'View Certificate',
      verifyOnline: 'Verify Credential',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All',
      officialDoc: 'Original document deposited',
      pendingDoc: 'Original PDF pending',
      searchMatches: (count: number) =>
        count === 1 ? '1 credential found' : `${count} credentials found`,
      noResultsTitle: 'No certificates found',
      noResultsDesc: (q: string) =>
        `No certificates found matching "${q}".`,
      clearSearch: 'Clear search',
      trustNotice:
        'All 21 qualification documents are authentically deposited as PDFs and verified by the respective universities, institutes, and accreditation boards.',
      trustPartners:
        'Adam Mickiewicz University Poznań · Scrum.org · TrainMiC · European Social Fund · Franklin IAS · Pioneer People · AI CHAMPIONS',
    },
    pl: {
      eyebrow: 'OFICJALNE DOKUMENTY I KWALIFIKACJE',
      title: 'Certyfikaty i kwalifikacje',
      subtitle:
        'Cztery filary kompetencji: Dyplomy akademickie, zarządzanie produktami cyfrowymi, metody zwinne oraz technologie AI.',
      searchPlaceholder:
        'Szukaj certyfikatów (np. Scrum, AI Act, ISO, Chemia, edX, Product)...',
      credentialsLabel: 'Certyfikaty',
      viewCert: 'Zobacz certyfikat',
      verifyOnline: 'Verify Credential',
      expandAll: 'Rozwiń wszystko',
      collapseAll: 'Zwiń wszystko',
      officialDoc: 'Oryginalny dokument zdeponowany',
      pendingDoc: 'Oryginalny plik PDF oczekuje na przesłanie',
      searchMatches: (count: number) =>
        count === 1 ? 'Znaleziono 1 certyfikat' : `Znaleziono ${count} certyfikatów`,
      noResultsTitle: 'Nie znaleziono certyfikatów',
      noResultsDesc: (q: string) =>
        `Brak wyników dla hasła „${q}”.`,
      clearSearch: 'Wyczyść wyszukiwanie',
      trustNotice:
        'Wszystkie 21 dokumentów jest dostępnych w postaci oryginalnych plików PDF z potwierdzeniem odpowiednich instytucji.',
      trustPartners:
        'Uniwersytet im. Adama Mickiewicza w Poznaniu · Scrum.org · TrainMiC · Europejski Fundusz Społeczny · Franklin IAS · Pioneer People · AI CHAMPIONS',
    },
  }[currentLang];

  // Helper for chronological sorting within categories
  const parseDateForSorting = (cert: CertificateItem): number => {
    if (cert.status === 'IN_PROGRESS') return 9999999999999;
    if (cert.issueDate) {
      const matchDotted = cert.issueDate.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
      if (matchDotted) {
        const [, day, month, year] = matchDotted;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).getTime();
      }
      const monthsDe: Record<string, number> = {
        januar: 0, februar: 1, märz: 2, maerz: 2, april: 3, mai: 4, juni: 5,
        juli: 6, august: 7, september: 8, oktober: 9, november: 10, dezember: 11,
      };
      const matchWords = cert.issueDate.match(/(\d{1,2})\.\s*([A-Za-zäöüÄÖÜ]+)\s*(\d{4})/);
      if (matchWords) {
        const [, day, monthName, year] = matchWords;
        const m = monthsDe[monthName.toLowerCase()] ?? 0;
        return new Date(parseInt(year), m, parseInt(day)).getTime();
      }
    }
    return parseInt(cert.year) ? new Date(parseInt(cert.year), 0, 1).getTime() : 0;
  };

  // 4 Gleichwertige Kategorien
  const rawCategories: CategoryDefinition[] = useMemo(
    () => [
      {
        id: 'academic',
        icon: GraduationCap,
        title: {
          de: '1. Akademische Abschlüsse & Fachqualifikationen',
          en: '1. Academic Degrees & Specialist Qualifications',
          pl: '1. Dyplomy akademickie i kwalifikacje zawodowe',
        },
        subtitle: {
          de: 'Naturwissenschaftliches Magisterdiplom Chemie, Postgraduales Studium Umweltschutz, ISO 14001 Auditor, Umweltkompensation, GIS & Messtechnik',
          en: 'Five-year university degree, Postgraduate Environmental Protection studies, ISO 14001 Auditor, Ecological Mitigation, GIS & Metrology',
          pl: '5-letnie studia magisterskie UAM, podyplomowe studia ochrony środowiska, audytor ISO 14001, kompensacja przyrodnicza, GIS i metrologia',
        },
        items: [...ACADEMIC_CERTIFICATES],
      },
      {
        id: 'product',
        icon: Compass,
        title: {
          de: '2. Product & Innovation Management',
          en: '2. Product & Innovation Management',
          pl: '2. Zarządzanie produktem i innowacjami',
        },
        subtitle: {
          de: 'IT- & Softwareberatung, Design Thinking Zertifikatsprogramm, Product Design, Prototyping & User Testing (ENES608.3)',
          en: 'IT & Software Advisory, Design Thinking Professional Certificate, Product Design, Prototyping & User Testing (ENES608.3)',
          pl: 'Doradztwo IT i oprogramowania, program certyfikacyjny Design Thinking, prototypowanie i testy z użytkownikami',
        },
        items: CERTIFICATES.filter((c) =>
          ['cert-pm-program', 'cert-dt', 'cert-product-design'].includes(c.id)
        ).sort((a, b) => parseDateForSorting(b) - parseDateForSorting(a)),
      },
      {
        id: 'agile',
        icon: Workflow,
        title: {
          de: '3. Agile & Scrum',
          en: '3. Agile & Scrum',
          pl: '3. Agile i Scrum',
        },
        subtitle: {
          de: 'Professional Scrum Product Owner I (Scrum.org), Professional Scrum Master I (Scrum.org), Product Owner Intensive, Applied Scrum, Agile Innovation',
          en: 'Professional Scrum Product Owner I (Scrum.org), Professional Scrum Master I (Scrum.org), Product Owner Intensive, Applied Scrum, Agile Innovation',
          pl: 'Professional Scrum Product Owner I (Scrum.org), Professional Scrum Master I (Scrum.org), Product Owner Intensive, Applied Scrum, innowacje zwinne',
        },
        items: CERTIFICATES.filter((c) =>
          [
            'cert-pspo-1',
            'cert-psm-1',
            'cert-product-owner-intensive',
            'cert-applied-scrum',
            'cert-agile-inn',
            'cert-agile-foundation',
            'cert-scrum-master',
            'cert-agile-foundation-fias',
          ].includes(c.id)
        ).sort((a, b) => parseDateForSorting(b) - parseDateForSorting(a)),
      },
      {
        id: 'ai',
        icon: Cpu,
        title: {
          de: '4. AI & Digital Technologies',
          en: '4. AI & Digital Technologies',
          pl: '4. Sztuczna inteligencja i technologie cyfrowe',
        },
        subtitle: {
          de: 'EU AI Act Zertifikat (AI CHAMPIONS GmbH), KI-Kompetenz im Berufsalltag, KI-Grundlagenkurs & IHK Akademie Digital',
          en: 'EU AI Act Certificate (AI Champions GmbH), AI Professional Literacy, AI Fundamentals & IHK AI Compact',
          pl: 'Certyfikat Aktu o AI (AI Champions GmbH), kompetencje AI w pracy, kurs podstawowy i IHK AI Kompakt',
        },
        items: CERTIFICATES.filter((c) =>
          ['cert-eu-ai-act-2026', 'cert-ki-kompetenz', 'cert-ai-grundlagen', 'cert-ai-kompakt'].includes(c.id)
        ).sort((a, b) => parseDateForSorting(b) - parseDateForSorting(a)),
      },
    ],
    []
  );

  const totalCertificatesCount = useMemo(
    () => rawCategories.reduce((sum, cat) => sum + cat.items.length, 0),
    [rawCategories]
  );

  // Search filter logic across all categories
  const isSearching = searchQuery.trim().length > 0;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const categoriesWithFilteredItems = useMemo(() => {
    return rawCategories.map((cat) => {
      if (!isSearching) {
        return {
          ...cat,
          filteredItems: cat.items,
          totalCount: cat.items.length,
          matchCount: cat.items.length,
        };
      }

      const filtered = cat.items.filter((cert) => {
        // Match against title (multilingual)
        const inTitle =
          cert.title.toLowerCase().includes(normalizedQuery) ||
          (cert.titleI18n?.de && cert.titleI18n.de.toLowerCase().includes(normalizedQuery)) ||
          (cert.titleI18n?.en && cert.titleI18n.en.toLowerCase().includes(normalizedQuery)) ||
          (cert.titleI18n?.pl && cert.titleI18n.pl.toLowerCase().includes(normalizedQuery));

        // Match against issuer
        const inIssuer =
          cert.issuer.toLowerCase().includes(normalizedQuery) ||
          (cert.issuerI18n?.de && cert.issuerI18n.de.toLowerCase().includes(normalizedQuery)) ||
          (cert.issuerI18n?.en && cert.issuerI18n.en.toLowerCase().includes(normalizedQuery)) ||
          (cert.issuerI18n?.pl && cert.issuerI18n.pl.toLowerCase().includes(normalizedQuery));

        // Match against focus / keywords
        const inFocus =
          (cert.focus && cert.focus.toLowerCase().includes(normalizedQuery)) ||
          (cert.focusI18n?.de && cert.focusI18n.de.toLowerCase().includes(normalizedQuery)) ||
          (cert.focusI18n?.en && cert.focusI18n.en.toLowerCase().includes(normalizedQuery)) ||
          (cert.focusI18n?.pl && cert.focusI18n.pl.toLowerCase().includes(normalizedQuery));

        return inTitle || inIssuer || inFocus;
      });

      return {
        ...cat,
        filteredItems: filtered,
        totalCount: cat.items.length,
        matchCount: filtered.length,
      };
    });
  }, [rawCategories, isSearching, normalizedQuery]);

  const totalMatchesCount = useMemo(() => {
    return categoriesWithFilteredItems.reduce((sum, cat) => sum + cat.matchCount, 0);
  }, [categoriesWithFilteredItems]);

  const toggleCategory = (id: CategoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const areAllExpanded = Object.values(expandedCategories).every(Boolean);

  const toggleAll = () => {
    const nextState = !areAllExpanded;
    setExpandedCategories({
      academic: nextState,
      product: nextState,
      agile: nextState,
      ai: nextState,
    });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <PageTransition>
      <div className="relative w-full flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
        {/* Subtle Ambient Background */}
        <div className="pointer-events-none absolute top-20 right-1/4 h-96 w-96 rounded-full bg-[#0F5C46]/15 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-20 left-1/4 h-80 w-80 rounded-full bg-[#C7A35A]/10 blur-[150px]" />

        {/* Top Back to Portfolio */}
        <div className="relative z-10 mb-4 sm:mb-6">
          <BackToPortfolio currentLang={currentLang} />
        </div>

        {/* Page Header */}
        <div className="relative z-10 border-b border-[#C7A35A]/20 pb-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
                  {t.eyebrow}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#F4F1EA]">
                {t.title}
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* Global Summary Badge & Expand/Collapse Toggle */}
            <div className="flex items-center gap-3 self-start lg:self-end">
              <span className="rounded-full border border-[#C7A35A]/30 bg-[#101412] px-4 py-2 font-sans text-xs font-semibold text-[#F4F1EA]">
                {totalCertificatesCount} {t.credentialsLabel} gesamt
              </span>
              <button
                type="button"
                onClick={toggleAll}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#0F5C46] bg-[#0F5C46]/25 px-4 py-2 font-sans text-xs font-semibold text-[#F4F1EA] hover:border-[#C7A35A] hover:bg-[#0F5C46] hover:text-white transition-all uppercase tracking-wider"
              >
                <ChevronsUpDown className="h-3.5 w-3.5 text-[#C7A35A]" />
                <span>{areAllExpanded ? t.collapseAll : t.expandAll}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Search Bar */}
        <div className="relative z-10 mb-8">
          <div className="relative flex items-center w-full rounded-2xl border border-[#C7A35A]/35 bg-[#101412] shadow-lg px-4 py-3 sm:py-3.5 transition-all duration-200 focus-within:border-[#C7A35A] focus-within:shadow-[0_0_20px_rgba(199,163,90,0.2)]">
            <Search className="h-5 w-5 text-[#C7A35A] shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent font-sans text-xs sm:text-sm text-[#F4F1EA] placeholder-[#A9AEA9]/60 focus:outline-none"
            />
            {isSearching && (
              <div className="flex items-center gap-2.5 shrink-0 ml-2">
                <span className="hidden xs:inline-flex items-center rounded-full border border-[#0F5C46] bg-[#0F5C46]/40 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-[#C7A35A]">
                  {t.searchMatches(totalMatchesCount)}
                </span>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label={t.clearSearch}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#141A16] border border-[#C7A35A]/30 text-[#A9AEA9] hover:text-white hover:border-[#C7A35A] transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Empty State when Search Yields Zero Matches */}
        {isSearching && totalMatchesCount === 0 && (
          <div className="relative z-10 rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-8 sm:p-12 text-center my-6 max-w-xl mx-auto space-y-4">
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl border border-[#C7A35A]/35 bg-[#063F35]/40 text-[#C7A35A]">
              <SearchX className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-[#F4F1EA]">
                {t.noResultsTitle}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] mt-1.5">
                {t.noResultsDesc(searchQuery)}
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={handleClearSearch}
                className="inline-flex items-center gap-2 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-5 py-2 font-sans text-xs font-semibold text-white uppercase tracking-wider hover:bg-[#148B78] transition-all shadow-md"
              >
                <X className="h-3.5 w-3.5" />
                <span>{t.clearSearch}</span>
              </button>
            </div>
          </div>
        )}

        {/* Die 4 Gleichwertigen Kategorie-Karten im Accordion-System */}
        <div className="relative z-10 space-y-4 sm:space-y-5">
          {categoriesWithFilteredItems.map((cat) => {
            const Icon = cat.icon;
            // During active search: automatically expand categories with matches, collapse empty ones
            const isExpanded = isSearching
              ? cat.matchCount > 0
              : Boolean(expandedCategories[cat.id]);

            const displayCount = isSearching
              ? `${cat.matchCount} / ${cat.totalCount}`
              : `${cat.totalCount}`;

            return (
              <div
                key={cat.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-[#C7A35A]/70 bg-[#101412] shadow-[0_8px_30px_rgba(15,92,70,0.25)]'
                    : isSearching && cat.matchCount === 0
                    ? 'border-[#0F5C46]/20 bg-[#101412]/50 opacity-60'
                    : 'border-[#0F5C46]/40 bg-[#101412]/90 hover:border-[#C7A35A]/50 hover:bg-[#141A16]'
                }`}
              >
                {/* 1. Kompakte Kategorie-Karten-Kopfzeile */}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors focus:outline-none focus:ring-1 focus:ring-[#C7A35A]"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Kleines, elegantes Kategorie-Symbol */}
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-[#C7A35A]/35 bg-[#063F35]/40 text-[#C7A35A] shrink-0 shadow-inner">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#C7A35A]" />
                    </div>

                    {/* Kategoriename & Subtitle */}
                    <div className="min-w-0">
                      <h2 className="font-sans text-base sm:text-lg md:text-xl font-bold text-[#F4F1EA] tracking-tight">
                        {cat.title[currentLang]}
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] mt-0.5 line-clamp-1">
                        {cat.subtitle[currentLang]}
                      </p>
                    </div>
                  </div>

                  {/* Rechts: Tatsächliche Anzahl zugeordneter Nachweise + Chevron */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider ${
                        isSearching && cat.matchCount > 0
                          ? 'border-[#C7A35A] bg-[#C7A35A]/20 text-[#C7A35A]'
                          : 'border-[#C7A35A]/40 bg-[#0F5C46]/30 text-[#C7A35A]'
                      }`}
                    >
                      {displayCount} {t.credentialsLabel}
                    </span>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#C7A35A]/25 bg-[#080B09] text-[#C7A35A] transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 bg-[#0F5C46] text-white' : ''
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </button>

                {/* 2. Aufklappbare Liste der gefilterten Zertifikatstitel */}
                {isExpanded && cat.filteredItems.length > 0 && (
                  <div className="border-t border-[#0F5C46]/30 bg-[#080B09]/80 p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cat.filteredItems.map((cert) => {
                        const titleText = cert.titleI18n?.[currentLang] || cert.title;
                        const issuerText = cert.issuerI18n?.[currentLang] || cert.issuer;
                        const focusText = cert.focusI18n?.[currentLang] || cert.focus;

                        return (
                          <div
                            key={cert.id}
                            className="group flex flex-col justify-between rounded-xl border border-[#0F5C46]/35 bg-[#101412] p-4 sm:p-5 transition-all duration-200 hover:border-[#C7A35A]/70 hover:bg-[#141A16] shadow-sm"
                          >
                            <div>
                              {/* Top Bar: Kleines neutrales PDF-Symbol + Ausstellungsdatum/Jahr */}
                              <div className="flex items-center justify-between gap-2 mb-2.5">
                                <span className="inline-flex items-center gap-1 rounded border border-[#C7A35A]/35 bg-[#0F5C46]/25 px-2 py-0.5 font-sans text-[10px] font-bold text-[#C7A35A]">
                                  <FileText className="h-3 w-3" />
                                  PDF
                                </span>
                                <span className="font-sans text-xs font-bold text-[#C7A35A]">
                                  {cert.issueDate || cert.year}
                                </span>
                              </div>

                              {/* Zertifikatstitel in Arial */}
                              <h3 className="font-sans text-base sm:text-lg font-semibold leading-snug text-[#F4F1EA] group-hover:text-[#C7A35A] transition-colors">
                                {titleText}
                              </h3>

                              {/* Ausstellende Organisation */}
                              <div className="mt-2 flex items-center gap-1.5 font-sans text-xs text-[#148B78]">
                                <Award className="h-3.5 w-3.5 text-[#C7A35A] shrink-0" />
                                <span className="truncate">{issuerText}</span>
                              </div>

                              {/* Fokus / Inhalte */}
                              {focusText && (
                                <p className="mt-2.5 font-sans text-xs leading-relaxed text-[#A9AEA9] line-clamp-2 border-t border-[#C7A35A]/15 pt-2">
                                  {focusText}
                                </p>
                              )}
                            </div>

                            {/* Aktion: Erst beim Klick auf „Zertifikat ansehen“ öffnet sich das PDF */}
                            <div className="mt-4 pt-3 border-t border-[#C7A35A]/15 flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1 font-sans text-[11px] text-[#148B78]">
                                <ShieldCheck className="h-3.5 w-3.5 text-[#C7A35A]" />
                                <span className="truncate">
                                  {cert.pdfUrl ? t.officialDoc : t.pendingDoc}
                                </span>
                              </span>

                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setActiveCert(cert)}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-[#0F5C46] bg-[#0F5C46]/30 px-3.5 py-1.5 font-sans text-xs font-semibold text-[#F4F1EA] hover:border-[#C7A35A] hover:bg-[#0F5C46] hover:text-white transition-all uppercase tracking-wider group/view shadow-sm"
                                  title={t.viewCert}
                                >
                                  <Eye className="h-3.5 w-3.5 text-[#C7A35A] shrink-0" />
                                  <span>{t.viewCert}</span>
                                  <span className="text-[#C7A35A] group-hover/view:translate-x-0.5 transition-transform">
                                    →
                                  </span>
                                </button>

                                {cert.verificationUrl && (
                                  <a
                                    href={cert.verificationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-full border border-[#C7A35A]/40 bg-[#101412] px-2.5 py-1.5 font-sans text-xs font-semibold text-[#C7A35A] hover:border-[#C7A35A] hover:bg-[#C7A35A]/15 hover:text-white transition-all uppercase tracking-wider"
                                    title="Verify Credential"
                                  >
                                    <span className="text-[10px]">Verify</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Bar */}
        <div className="relative z-10 border-t border-[#C7A35A]/20 pt-6 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-[#A9AEA9]">
          <div className="flex items-center gap-2 text-[#148B78]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#C7A35A]" />
            <span>{t.trustNotice}</span>
          </div>
          <span className="text-[#C7A35A] text-center md:text-right font-medium">
            {t.trustPartners}
          </span>
        </div>

        {/* Certificate Viewer Modal: Öffnet das unveränderte Original-PDF erst nach Klick */}
        {activeCert && (
          <CertificateViewModal
            cert={activeCert}
            currentLang={currentLang}
            onClose={() => setActiveCert(null)}
          />
        )}
      </div>
    </PageTransition>
  );
};
