import React, { useRef, useState } from 'react';
import { Award, ChevronDown, ChevronLeft, ChevronRight, Disc3, ExternalLink, Eye, FileText, ShieldCheck } from 'lucide-react';
import type { CertificateItem, Language } from '../types';
import './CertificateVinylShelf.css';

type VinylCategory = {
  id: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  icon: React.ComponentType<{ className?: string }>;
  filteredItems: CertificateItem[];
  totalCount: number;
  matchCount: number;
};

interface CertificateVinylShelfProps {
  categories: VinylCategory[];
  currentLang: Language;
  isSearching: boolean;
  onSelect: (certificate: CertificateItem) => void;
}

const ui = {
  de: {
    heading: 'THE CREDENTIAL COLLECTION',
    intro: 'Sechs Bereiche. Ein einziges Vinyl-Regal. Wähle ein Cover, um die Qualifikationen und ihre Nachweise zu entdecken.',
    edition: 'COLLECTION / 2026',
    select: 'Sammlung öffnen',
    close: 'Sammlung schließen',
    all: 'Zertifikate der Sammlung',
    certificates: 'Nachweise',
    pdf: 'Original-PDF ansehen',
    details: 'Details ansehen',
    verify: 'Beim Aussteller prüfen',
    pending: 'Original-PDF nicht hinterlegt',
    complete: 'Abgeschlossen',
    progress: 'In Weiterbildung',
    results: 'Suchtreffer',
    hint: 'Cover auswählen',
    scrollPrev: 'Regal nach links bewegen',
    scrollNext: 'Regal nach rechts bewegen',
  },
  en: {
    heading: 'THE CREDENTIAL COLLECTION',
    intro: 'Six categories. One vinyl shelf. Select a cover to explore credentials and evidence.',
    edition: 'COLLECTION / 2026',
    select: 'Open collection',
    close: 'Close collection',
    all: 'Credentials in this collection',
    certificates: 'credentials',
    pdf: 'View original PDF',
    details: 'View details',
    verify: 'Verify with issuer',
    pending: 'Original PDF not available',
    complete: 'Completed',
    progress: 'In progress',
    results: 'Search matches',
    hint: 'Select a cover',
    scrollPrev: 'Scroll shelf left',
    scrollNext: 'Scroll shelf right',
  },
  pl: {
    heading: 'THE CREDENTIAL COLLECTION',
    intro: 'Sześć obszarów. Jedna półka z płytami. Wybierz okładkę, aby zobaczyć kwalifikacje i dokumenty.',
    edition: 'COLLECTION / 2026',
    select: 'Otwórz kolekcję',
    close: 'Zamknij kolekcję',
    all: 'Certyfikaty w kolekcji',
    certificates: 'certyfikatów',
    pdf: 'Zobacz oryginalny PDF',
    details: 'Zobacz szczegóły',
    verify: 'Weryfikacja u wystawcy',
    pending: 'Brak oryginalnego PDF',
    complete: 'Ukończono',
    progress: 'W trakcie',
    results: 'Wyniki wyszukiwania',
    hint: 'Wybierz okładkę',
    scrollPrev: 'Przewiń półkę w lewo',
    scrollNext: 'Przewiń półkę w prawo',
  },
};

// The featured selection deliberately reuses the same original certificate objects.
// It is an editorial overview, not a seventh qualification category.
const featuredIds = [
  'cert-pspo-1',
  'cert-psm-1',
  'cert-hp-ai-strategy',
  'cert-microsoft-ai-foundations',
  'cert-product-design',
  'cert-agile-inn',
] as const;

const coverWords: Record<string, Record<Language, [string, string]>> = {
  featured: { de: ['CORE', 'CREDENTIALS'], en: ['CORE', 'CREDENTIALS'], pl: ['KLUCZOWE', 'KWALIFIKACJE'] },
  academic: { de: ['SCIENCE', '& EXPERTISE'], en: ['SCIENCE', '& EXPERTISE'], pl: ['NAUKA', '& WIEDZA'] },
  product: { de: ['PRODUCT', '& INNOVATION'], en: ['PRODUCT', '& INNOVATION'], pl: ['PRODUKT', '& INNOWACJE'] },
  agile: { de: ['AGILE', '& SCRUM'], en: ['AGILE', '& SCRUM'], pl: ['AGILE', '& SCRUM'] },
  ai: { de: ['AI', '& DIGITAL'], en: ['AI', '& DIGITAL'], pl: ['AI', '& DIGITAL'] },
  language: { de: ['LANGUAGE', '& CULTURE'], en: ['LANGUAGE', '& CULTURE'], pl: ['JĘZYKI', '& KULTURA'] },
};

const Cover: React.FC<{
  category: VinylCategory;
  currentLang: Language;
  number: number;
  selected: boolean;
  onClick: () => void;
  isSearching: boolean;
}> = ({ category, currentLang, number, selected, onClick, isSearching }) => {
  const Icon = category.icon;
  const t = ui[currentLang];
  const cover = coverWords[category.id]?.[currentLang] || ['CREDENTIAL', 'COLLECTION'];
  const name = category.title[currentLang].replace(/^\d+\.\s*/, '');

  return (
    <div className="edition-album">
      <button
        type="button"
        className={'edition-album-button' + (selected ? ' edition-album-button--selected' : '')}
        aria-expanded={selected}
        aria-controls={'edition-collection-details'}
        aria-label={selected ? t.close + ': ' + name : t.select + ': ' + name}
        onClick={onClick}
      >
        <span className={'edition-album-art edition-album-art--' + category.id}>
          <span className="edition-album-paper" aria-hidden="true" />
          <span className="edition-album-vinyl" aria-hidden="true"><span /></span>
          <span className="edition-album-topline">
            <span>NATALIA STACHOWIAK</span>
            <span>{String(number).padStart(2, '0')}/06</span>
          </span>
          <span className="edition-album-decoration" aria-hidden="true">
            <span className="edition-album-decoration-ring" />
            <Icon className="edition-album-decoration-icon" />
          </span>
          <span className="edition-album-main-title">
            <span>{cover[0]}</span>
            <span>{cover[1]}</span>
          </span>
          <span className="edition-album-bottomline">
            <span>{t.edition}</span>
            <Disc3 size={17} strokeWidth={1.35} aria-hidden="true" />
          </span>
        </span>
        <span className="edition-album-caption">
          <span className="edition-album-category">{name}</span>
          <span className="edition-album-count">
            {isSearching ? category.matchCount + '/' + category.totalCount : category.totalCount} {t.certificates}
            <ChevronDown size={15} className={selected ? 'edition-chevron--up' : ''} aria-hidden="true" />
          </span>
        </span>
      </button>
    </div>
  );
};

export const CertificateVinylShelf: React.FC<CertificateVinylShelfProps> = ({
  categories, currentLang, isSearching, onSelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const t = ui[currentLang];
  // Search across all five source groups; keep six covers visible even when searching.
  const selectedFeatured = featuredIds
    .map(id => categories.flatMap(category => category.filteredItems).find(cert => cert.id === id))
    .filter((cert): cert is CertificateItem => Boolean(cert));
  const featured: VinylCategory = {
    id: 'featured',
    title: { de: 'Kernqualifikationen', en: 'Key Credentials', pl: 'Kluczowe kwalifikacje' },
    subtitle: {
      de: 'Ausgewählte Nachweise für Digital Product, Agile, KI & Innovation',
      en: 'Selected credentials for Digital Product, Agile, AI & Innovation',
      pl: 'Wybrane kwalifikacje: Digital Product, Agile, AI i innowacje',
    },
    icon: Award,
    filteredItems: selectedFeatured,
    totalCount: featuredIds.length,
    matchCount: selectedFeatured.length,
  };
  const visibleCategories: VinylCategory[] = [featured, ...categories];
  const activeCategories = isSearching && !selectedCategory
    ? visibleCategories.filter(category => category.matchCount > 0)
    : visibleCategories.filter(category => category.id === selectedCategory);
  const scrollShelf = (direction: number) => {
    const el = shelfRef.current;
    if (el) el.scrollBy({ left: el.clientWidth * 0.7 * direction, behavior: 'smooth' });
  };

  const toggleCategory = (id: string) => {
    setSelectedCategory(previous => previous === id ? null : id);
  };

  const renderCover = (category: VinylCategory) => (
    <Cover
      key={category.id}
      category={category}
      currentLang={currentLang}
      number={visibleCategories.findIndex(item => item.id === category.id) + 1}
      selected={selectedCategory === category.id}
      onClick={() => toggleCategory(category.id)}
      isSearching={isSearching}
    />
  );

  return (
    <section className="edition-collection relative z-10" aria-label={t.heading}>
      <div className="edition-collection-header">
        <div>
          <p className="edition-collection-eyebrow">{t.heading}</p>
          <h2 className="edition-collection-quote">
            {currentLang === 'de'
              ? 'Hier spielt die Musik.'
              : currentLang === 'pl'
                ? 'Tutaj gra muzyka.'
                : 'This is where the music plays.'}
          </h2>
          <p className="edition-collection-quote-subtitle">
            {currentLang === 'de'
              ? 'Und jede Qualifikation bringt ihren eigenen Sound mit.'
              : currentLang === 'pl'
                ? 'A każda kwalifikacja wnosi własne brzmienie.'
                : 'And every qualification brings its own sound.'}
          </p>
          <p className="edition-collection-intro">{t.intro}</p>
        </div>
        <span className="edition-collection-hint"><Disc3 size={16} aria-hidden="true" /> {t.hint}</span>
      </div>

      {/* Exactly one physical shelf with six category covers. On narrow screens
          the same shelf scrolls horizontally; it never becomes a second shelf. */}
      <div className="edition-display" aria-label={t.heading}>
        <div className="edition-shelf-scroll" ref={shelfRef} role="region" tabIndex={0} aria-label={t.heading}>
          <div className="edition-shelf-albums">
            {visibleCategories.map(renderCover)}
          </div>
        </div>
        <div className="edition-shelf-plank" aria-hidden="true" />
      </div>
      <div className="edition-shelf-controls">
        <span>01 — 06</span>
        <div>
          <button type="button" onClick={() => scrollShelf(-1)} aria-label={t.scrollPrev} title={t.scrollPrev}>
            <ChevronLeft size={17} />
          </button>
          <button type="button" onClick={() => scrollShelf(1)} aria-label={t.scrollNext} title={t.scrollNext}>
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {activeCategories.length > 0 && (
        <div id="edition-collection-details" className="edition-details" role="region" aria-live="polite">
          {activeCategories.map(category => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="edition-detail-section">
                <div className="edition-details-heading">
                  <span className="edition-details-icon"><Icon className="h-6 w-6" /></span>
                  <div>
                    <p className="edition-details-kicker">{isSearching ? t.results : t.all}</p>
                    <h3>{category.title[currentLang].replace(/^\d+\.\s*/, '')}</h3>
                  </div>
                  {selectedCategory && (
                    <button
                      type="button"
                      className="edition-details-close"
                      onClick={() => setSelectedCategory(null)}
                      aria-label={t.close}
                    >
                      {t.close} <ChevronDown size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>
                <div className="edition-details-grid">
                  {category.filteredItems.map((cert) => {
                    const hasPdf = Boolean(cert.pdfUrl && cert.isAuthentic !== false);
                    const isInProgress = cert.status === 'IN_PROGRESS';
                    const certTitle = cert.titleI18n?.[currentLang] || cert.title;
                    const issuer = cert.issuerI18n?.[currentLang] || cert.issuer;
                    return (
                      <div key={cert.id} className="edition-cert-item">
                        <div className="edition-cert-top">
                          <span className="edition-cert-icon"><Award size={17} aria-hidden="true" /></span>
                          <span className="edition-cert-year">{cert.issueDate || cert.year}</span>
                        </div>
                        <h4>{certTitle}</h4>
                        <p className="edition-cert-issuer">{issuer}</p>
                        <div className="edition-cert-footer">
                          <span className="edition-cert-status">
                            {isInProgress ? t.progress : t.complete}
                          </span>
                          <div className="edition-cert-actions">
                            <button type="button" onClick={() => onSelect(cert)}>
                              {hasPdf ? <FileText size={15} /> : <Eye size={15} />}
                              {hasPdf ? t.pdf : t.details}
                            </button>
                            {cert.verificationUrl && (
                              <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" title={t.verify} aria-label={t.verify + ': ' + certTitle}>
                                <ExternalLink size={16} aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="edition-collection-footnote">
        <ShieldCheck size={15} aria-hidden="true" />
        {currentLang === 'de'
          ? 'Originaldokumente und Online-Prüflinks sind nur dort verfügbar, wo sie tatsächlich hinterlegt sind.'
          : currentLang === 'pl'
            ? 'Oryginalne dokumenty i linki weryfikacyjne są dostępne wyłącznie tam, gdzie zostały udostępnione.'
            : 'Original documents and official verification links are available only when provided.'}
      </p>
    </section>
  );
};
