import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import {
  LOCKED_ASSETS,
  PROJECT_BOOK_COVER,
  PROJECT_BOOK_INSTAGRAM_QR,
} from '../data/assetRegistry';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';

interface BookPageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
}

export const BookPage: React.FC<BookPageProps> = ({ currentLang, mediaAssets }) => {
  const bookCoverSrc = mediaAssets.bookCover || PROJECT_BOOK_COVER;
  const qrSrc = mediaAssets.instagramQr || PROJECT_BOOK_INSTAGRAM_QR;
  const instagramUrl = 'https://www.instagram.com/frau_en_power2026/';

  return (
    <PageTransition>
      <div className="relative w-full flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-14 space-y-12">
        {/* Subtle Ambient Background Accent */}
        <div className="pointer-events-none absolute top-20 right-1/4 h-96 w-96 rounded-full bg-[#0F5C46]/15 blur-[160px]" />
        <div className="pointer-events-none absolute bottom-20 left-1/4 h-80 w-80 rounded-full bg-[#C7A35A]/10 blur-[150px]" />

        {/* Top Back to Portfolio */}
        <div className="relative z-10 mb-4 sm:mb-6">
          <BackToPortfolio currentLang={currentLang} />
        </div>

        {/* 1. Header */}
        <div className="relative z-10 border-b border-[#C7A35A]/15 pb-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
              {currentLang === 'de' ? 'VERÖFFENTLICHTES BUCH' : currentLang === 'pl' ? 'WYDANA KSIĄŻKA' : 'PUBLISHED BOOK & COMMUNITY'}
            </span>
          </div>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#F4F1EA]">
            „Du bist nicht zu viel“{' '}
            <span className="font-sans text-xs sm:text-sm text-[#C7A35A] font-normal tracking-normal italic ml-3">
              {currentLang === 'de'
                ? 'Von der Idee zum publizierten Produkt.'
                : currentLang === 'pl'
                ? 'Od pomysłu do wydanego produktu.'
                : 'From idea to published product.'}
            </span>
          </h1>
        </div>

        {/* 2. Split Screen Editorial Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Original Book Cover + QR Code */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="relative max-w-[220px] sm:max-w-[260px] w-full rounded-2xl border border-[#C7A35A]/40 bg-[#101412] p-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.85)]">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#080A09] flex items-center justify-center" style={{ aspectRatio: '3 / 4' }}>
                <img
                  src={bookCoverSrc}
                  alt="Du bist nicht zu viel — Buchcover"
                  loading="eager"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = PROJECT_BOOK_COVER;
                  }}
                  className="h-full w-full object-contain p-1"
                />
              </div>
            </div>

            {/* Instagram QR Code */}
            <div className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-4 text-center flex flex-col items-center max-w-[170px] shadow-lg">
              <div className="h-24 w-24 overflow-hidden rounded-xl bg-white p-1.5 border border-[#C7A35A]/30">
                <img
                  src={qrSrc}
                  alt="Instagram QR-Code"
                  loading="eager"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = PROJECT_BOOK_INSTAGRAM_QR;
                  }}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-sans text-[11px] font-bold text-[#C7A35A] uppercase tracking-wider mt-3">
                QR-Code
              </span>
              <span className="text-[10px] text-[#A9AEA9] mt-0.5">
                {currentLang === 'de' ? 'Direkt zu Instagram' : currentLang === 'pl' ? 'Przejdź do Instagrama' : 'Directly to Instagram'}
              </span>
            </div>
          </div>

          {/* Right: Editorial Narrative & Community Link */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#148B78] uppercase tracking-wider block">
                {currentLang === 'de'
                  ? 'Autorin & Projektinitiatorin: Natalia Stachowiak'
                  : currentLang === 'pl'
                  ? 'Autorka i inicjatorka projektu: Natalia Stachowiak'
                  : 'Author & Project Initiator: Natalia Stachowiak'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] font-normal leading-tight">
                {currentLang === 'de'
                  ? 'Mut zur eigenen Stärke und emotionalen Klarheit.'
                  : currentLang === 'pl'
                  ? 'Odwaga do własnej siły i emocjonalnej jasności.'
                  : 'Courage for authentic strength and emotional clarity.'}
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#A9AEA9]">
              {currentLang === 'de'
                ? '„Du bist nicht zu viel“ ist ein ermutigender Ratgeber für persönliche Entwicklung, Selbstwert und Authentizität. Das Buch entstand aus der Vision, komplexe psychologische Dynamiken in klare, alltagstaugliche Reflexionen zu übersetzen.'
                : currentLang === 'pl'
                ? '„Du bist nicht zu viel” to poradnik osobistego rozwoju, poczucia własnej wartości i autentyczności. Książka powstała z wizji przełożenia złożonych dynamik psychologicznych na jasne, codzienne refleksje.'
                : '„Du bist nicht zu viel“ is an empowering guide for personal growth, self-worth, and authenticity, translating psychological dynamics into practical reflections.'}
            </p>

            <div className="rounded-2xl border border-[#0F5C46]/30 bg-[#101412] p-5 space-y-2">
              <span className="font-sans text-xs font-bold text-[#C7A35A] uppercase tracking-wider block">
                {currentLang === 'de'
                  ? 'VON DER IDEE ZUM PUBLIZIERTEN PRODUKT:'
                  : currentLang === 'pl'
                  ? 'OD POMYSŁU DO WYDANEGO PRODUKTU:'
                  : 'FROM IDEA TO PUBLISHED PRODUCT:'}
              </span>
              <p className="text-xs sm:text-sm text-[#A9AEA9] leading-relaxed">
                {currentLang === 'de'
                  ? 'Konzeption, Manuskriptentwicklung, Covergestaltung, Veröffentlichung und der organische Aufbau einer engagierten Instagram-Community mit über 1.000 Followern.'
                  : currentLang === 'pl'
                  ? 'Koncepcja, manuskrypt, projekt okładki, publikacja oraz organiczny rozwój zaangażowanej społeczności na Instagramie (ponad 1000 obserwujących).'
                  : 'Concept, manuscript drafting, cover design, independent publication, and organic growth of an engaged Instagram community with 1,000+ followers.'}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-[#0F5C46] px-7 py-3 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] hover:bg-[#148B78] hover:shadow-[0_0_20px_rgba(15,92,70,0.4)] transition-all uppercase"
              >
                <Instagram className="h-4 w-4 text-[#C7A35A]" />
                <span>Instagram Community (@frau_en_power2026) ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Bottom Note */}
        <div className="relative z-10 border-t border-[#C7A35A]/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A9AEA9]">
          <span>
            {currentLang === 'de'
              ? 'Veröffentlichtes Werk & Community-Aufbau · Autorin & Projektinitiatorin'
              : currentLang === 'pl'
              ? 'Wydana książka i budowanie społeczności · Autorka i inicjatorka projektu'
              : 'Published work & community building · Author & project initiator'}
          </span>
          <span className="text-[#C7A35A]">
            {currentLang === 'de' ? 'Eigenständiges kreatives Projekt' : currentLang === 'pl' ? 'Autorski projekt kreatywny' : 'Independent creative project'}
          </span>
        </div>
      </div>
    </PageTransition>
  );
};
