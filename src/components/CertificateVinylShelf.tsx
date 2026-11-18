import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, FileCheck2, Disc3 } from 'lucide-react';
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
    collection: 'THE CREDENTIAL COLLECTION',
    intro: 'Meine Qualifikationen – wie eine Plattensammlung. Entdecke die fünf Themenregale und öffne ein Cover für den Originalnachweis oder weitere Details.',
    item: 'Nachweise',
    completed: 'Abgeschlossen',
    progress: 'In Weiterbildung',
    pdf: 'PDF vorhanden',
    detail: 'Details',
    verify: 'Online verifizieren',
    open: 'Zertifikat öffnen',
    previous: 'Im Regal zurückblättern',
    next: 'Im Regal weiterblättern',
    search: 'Treffer',
    issue: 'AUSGABE',
  },
  en: {
    collection: 'THE CREDENTIAL COLLECTION',
    intro: 'My qualifications, presented as a record collection. Explore five shelves and select a cover to view an original credential or more details.',
    item: 'credentials',
    completed: 'Completed',
    progress: 'In progress',
    pdf: 'PDF available',
    detail: 'Details',
    verify: 'Verify online',
    open: 'Open certificate',
    previous: 'Scroll shelf left',
    next: 'Scroll shelf right',
    search: 'matches',
    issue: 'EDITION',
  },
  pl: {
    collection: 'THE CREDENTIAL COLLECTION',
    intro: 'Moje kwalifikacje niczym kolekcja płyt. Przeglądaj pięć półek i wybierz okładkę, aby zobaczyć oryginalny dokument lub szczegóły.',
    item: 'dokumentów',
    completed: 'Ukończono',
    progress: 'W trakcie',
    pdf: 'PDF dostępny',
    detail: 'Szczegóły',
    verify: 'Weryfikuj online',
    open: 'Otwórz certyfikat',
    previous: 'Przewiń półkę w lewo',
    next: 'Przewiń półkę w prawo',
    search: 'wyników',
    issue: 'WYDANIE',
  },
};

export const CertificateVinylShelf: React.FC<CertificateVinylShelfProps> = ({
  categories,
  currentLang,
  isSearching,
  onSelect,
}) => {
  const shelves = useRef<Record<string, HTMLDivElement | null>>({});
  const t = ui[currentLang];
  const visibleCategories = categories.filter((category) => !isSearching || category.matchCount > 0);

  const scrollShelf = (id: string, direction: number) => {
    const target = shelves.current[id];
    if (!target) return;
    target.scrollBy({ left: direction * Math.min(540, target.clientWidth * 0.85), behavior: 'smooth' });
  };

  return (
    <section className="vinyl-gallery relative z-10" aria-label={t.collection}>
      <div className="vinyl-gallery-intro">
        <div className="vinyl-gallery-intro-icon" aria-hidden="true"><Disc3 size={24} strokeWidth={1.5} /></div>
        <div>
          <p className="vinyl-gallery-kicker">{t.collection}</p>
          <p className="vinyl-gallery-description">{t.intro}</p>
        </div>
      </div>

      <div className="vinyl-gallery-shelves">
        {visibleCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          const title = category.title[currentLang].replace(/^\d+\.\s*/, '');
          return (
            <div className="vinyl-category" key={category.id}>
              <div className="vinyl-category-header">
                <div className="vinyl-category-heading">
                  <span className="vinyl-side-number" aria-hidden="true">
                    {String(categoryIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="vinyl-heading-icon" aria-hidden="true"><Icon className="h-5 w-5" /></span>
                  <div className="vinyl-heading-copy">
                    <h2>{title}</h2>
                    <p>{category.subtitle[currentLang]}</p>
                  </div>
                </div>
                <div className="vinyl-shelf-tools">
                  <span className="vinyl-count">
                    {isSearching ? category.matchCount + '/' + category.totalCount : category.totalCount} {isSearching ? t.search : t.item}
                  </span>
                  {category.filteredItems.length > 1 && (
                    <div className="vinyl-arrows">
                      <button type="button" aria-label={t.previous + ' – ' + title} onClick={() => scrollShelf(category.id, -1)}>
                        <ChevronLeft size={18} aria-hidden="true" />
                      </button>
                      <button type="button" aria-label={t.next + ' – ' + title} onClick={() => scrollShelf(category.id, 1)}>
                        <ChevronRight size={18} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="vinyl-shelf">
                <div
                  className="vinyl-shelf-scroll"
                  ref={(el) => { shelves.current[category.id] = el; }}
                  role="region"
                  aria-label={title}
                  tabIndex={0}
                >
                  <div className="vinyl-shelf-track">
                    {category.filteredItems.map((cert, index) => {
                      const certificateTitle = cert.titleI18n?.[currentLang] || cert.title;
                      const issuer = cert.issuerI18n?.[currentLang] || cert.issuer;
                      const pdfAvailable = Boolean(cert.pdfUrl && cert.isAuthentic !== false);
                      const isInProgress = cert.status === 'IN_PROGRESS';

                      return (
                        <div className="vinyl-album" key={cert.id}>
                          <button
                            type="button"
                            className="vinyl-album-button"
                            onClick={() => onSelect(cert)}
                            aria-label={t.open + ': ' + certificateTitle}
                            title={certificateTitle}
                          >
                            <span className="vinyl-record" aria-hidden="true">
                              <span className="vinyl-record-center" />
                            </span>
                            <span className={'vinyl-sleeve vinyl-sleeve--' + category.id}>
                              <span className="vinyl-sleeve-top">
                                <span className="vinyl-sleeve-index">{t.issue} / {String(index + 1).padStart(2, '0')}</span>
                                <Icon className="vinyl-sleeve-symbol" aria-hidden="true" />
                              </span>
                              <span className="vinyl-sleeve-art" aria-hidden="true">
                                <span className="vinyl-sleeve-ring" />
                                <span className="vinyl-sleeve-ring vinyl-sleeve-ring--small" />
                              </span>
                              <span className="vinyl-sleeve-bottom">
                                <span className="vinyl-sleeve-title">{certificateTitle}</span>
                                <span className="vinyl-sleeve-issuer">{issuer}</span>
                              </span>
                              <span className="vinyl-sleeve-spine" aria-hidden="true" />
                            </span>
                            <span className="vinyl-album-meta">
                              <span className="vinyl-album-year">{cert.issueDate || cert.year}</span>
                              <span className="vinyl-album-open"><Eye size={14} aria-hidden="true" /> {t.open}</span>
                            </span>
                          </button>
                          <div className="vinyl-album-foot">
                            <span className={'vinyl-album-status' + (isInProgress ? ' vinyl-album-status--progress' : '')}>
                              {isInProgress ? t.progress : pdfAvailable ? t.pdf : t.detail}
                            </span>
                            {cert.verificationUrl && !isInProgress && (
                              <a
                                href={cert.verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t.verify + ': ' + certificateTitle}
                                title={t.verify}
                                className="vinyl-album-verify"
                              >
                                <ExternalLink size={14} aria-hidden="true" />
                              </a>
                            )}
                            {pdfAvailable && <FileCheck2 size={13} aria-hidden="true" className="vinyl-album-pdf-mark" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="vinyl-shelf-lip" aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
