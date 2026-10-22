import React, { useState } from 'react';
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
} from 'lucide-react';
import { CertificateItem, Language } from '../types';
import { CERTIFICATES, ACADEMIC_CERTIFICATES } from '../data/portfolioData';

interface CertificatesSectionProps {
  currentLang: Language;
  onViewCertificate: (cert: CertificateItem) => void;
  // Kept optional for backward compatibility
  mediaAssets?: any;
  onUploadMedia?: (key: string) => void;
}

type CategoryId = 'academic' | 'product' | 'agile' | 'ai';

interface CategoryDefinition {
  id: CategoryId;
  icon: React.ComponentType<{ className?: string }>;
  title: { de: string; en: string; pl: string };
  subtitle: { de: string; en: string; pl: string };
  items: CertificateItem[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  currentLang,
  onViewCertificate,
}) => {
  // Initially all 4 category cards are compact (collapsed)
  const [expandedCategories, setExpandedCategories] = useState<Record<CategoryId, boolean>>({
    academic: false,
    product: false,
    agile: false,
    ai: false,
  });

  const t = {
    de: {
      label: 'ZERTIFIKATE & QUALIFIKATIONEN',
      headline: 'Always learning.',
      headlineAccent: 'Always building.',
      subline:
        'Vier gleichwertige Kompetenzbereiche: Akademische Abschlüsse, digitales Produktmanagement, agile Methoden und moderne KI-Technologien.',
      credentialsLabel: 'Nachweise',
      viewCert: 'Zertifikat ansehen',
      verifyOnline: 'Verify Credential',
      expandAll: 'Alle aufklappen',
      collapseAll: 'Alle schließen',
      officialDoc: 'Originaldokument hinterlegt',
      pendingDoc: 'Original-PDF noch nicht hinterlegt',
    },
    en: {
      label: 'CERTIFICATES & QUALIFICATIONS',
      headline: 'Always learning.',
      headlineAccent: 'Always building.',
      subline:
        'Four core pillars: Academic university degrees, digital product leadership, agile frameworks, and artificial intelligence.',
      credentialsLabel: 'Credentials',
      viewCert: 'View Certificate',
      verifyOnline: 'Verify Credential',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All',
      officialDoc: 'Original document deposited',
      pendingDoc: 'Original PDF pending',
    },
    pl: {
      label: 'CERTYFIKATY I KWALIFIKACJE',
      headline: 'Always learning.',
      headlineAccent: 'Always building.',
      subline:
        'Cztery filary kompetencji: Dyplomy akademickie, zarządzanie produktami cyfrowymi, metody zwinne oraz technologie AI.',
      credentialsLabel: 'Certyfikaty',
      viewCert: 'Zobacz certyfikat',
      verifyOnline: 'Verify Credential',
      expandAll: 'Rozwiń wszystko',
      collapseAll: 'Zwiń wszystko',
      officialDoc: 'Oryginalny dokument zdeponowany',
      pendingDoc: 'Oryginalny plik PDF oczekuje na przesłanie',
    },
  }[currentLang];

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
  const categories: CategoryDefinition[] = [
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
        en: 'Five-year university degree, Postgraduate Environmental Protection studies, ISO 14001 Auditor, Mitigation, GIS & Metrology',
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
  ];

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

  return (
    <section
      id="certificates"
      className="relative w-full border-b border-[#C9A66B]/15 bg-[#080B09] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B]" />
            <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
              {t.label}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F5F1E8]">
            {t.headline} <span className="italic text-[#C9A66B]">{t.headlineAccent}</span>
          </h2>

          <p className="mt-3 font-sans text-xs sm:text-sm text-[#B9C4BD]">
            {t.subline}
          </p>
        </div>

        {/* Global Expand/Collapse Helper Bar */}
        <div className="mb-6 flex items-center justify-between border-b border-[#C9A66B]/15 pb-4">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C9A66B]">
            4 Gleichwertige Kategorien
          </span>

          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0F5C46] bg-[#0F5C46]/25 px-4 py-1.5 font-sans text-xs font-semibold text-[#F4F1EA] hover:border-[#C7A35A] hover:bg-[#0F5C46] hover:text-white transition-all uppercase tracking-wider"
          >
            <ChevronsUpDown className="h-3.5 w-3.5 text-[#C9A66B]" />
            <span>{areAllExpanded ? t.collapseAll : t.expandAll}</span>
          </button>
        </div>

        {/* Die 4 Kategorie-Karten im Accordion-System */}
        <div className="space-y-4 sm:space-y-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isExpanded = Boolean(expandedCategories[cat.id]);
            const count = cat.items.length;

            return (
              <div
                key={cat.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-[#C7A35A]/70 bg-[#101412] shadow-[0_8px_30px_rgba(15,92,70,0.25)]'
                    : 'border-[#0F5C46]/40 bg-[#101412]/90 hover:border-[#C7A35A]/50 hover:bg-[#141A16]'
                }`}
              >
                {/* 1. Kompakte Kategorie-Karte (Klick öffnet Kategorie) */}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors focus:outline-none focus:ring-1 focus:ring-[#C7A35A]"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-[#C7A35A]/35 bg-[#063F35]/40 text-[#C7A35A] shrink-0 shadow-inner">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#C7A35A]" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-sans text-base sm:text-lg md:text-xl font-bold text-[#F4F1EA] tracking-tight">
                        {cat.title[currentLang]}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#A9AEA9] mt-0.5 line-clamp-1">
                        {cat.subtitle[currentLang]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="inline-flex items-center rounded-full border border-[#C7A35A]/40 bg-[#0F5C46]/30 px-3 py-1 font-sans text-xs font-bold text-[#C7A35A] uppercase tracking-wider">
                      {count} {t.credentialsLabel}
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

                {/* 2. Aufklappbare Liste der Zertifikate */}
                {isExpanded && (
                  <div className="border-t border-[#0F5C46]/30 bg-[#080B09]/80 p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cat.items.map((cert) => {
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
                              <h4 className="font-sans text-base sm:text-lg font-semibold leading-snug text-[#F4F1EA] group-hover:text-[#C7A35A] transition-colors">
                                {titleText}
                              </h4>

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
                                  onClick={() => onViewCertificate(cert)}
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
      </div>
    </section>
  );
};
