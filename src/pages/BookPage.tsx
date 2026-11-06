import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import {
  LOCKED_ASSETS,
  PROJECT_BOOK_COVER,
} from '../data/assetRegistry';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { resolveAssetUrl } from '../utils/assetPath';

interface BookPageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
}

export const BookPage: React.FC<BookPageProps> = ({ currentLang, mediaAssets }) => {
  const bookCoverSrc = mediaAssets.bookCover || PROJECT_BOOK_COVER;
  const qrSrc = resolveAssetUrl('/assets/instagram_qr_scannable.svg');
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
              {currentLang === 'de'
                ? 'Buchprojekt – noch nicht veröffentlicht'
                : currentLang === 'pl'
                ? 'Projekt książkowy – jeszcze niewydany'
                : 'Book project – not yet published'}
            </span>
          </div>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#F4F1EA]">
            „Du bist nicht zu viel“{' '}
            <span className="font-sans text-xs sm:text-sm text-[#C7A35A] font-normal tracking-normal italic ml-3">
              {currentLang === 'de'
                ? 'Von der Idee zum eigenständigen Buchprojekt.'
                : currentLang === 'pl'
                ? 'Od pomysłu do autorskiego projektu książkowego.'
                : 'From idea to independent book project.'}
            </span>
          </h1>
        </div>

        {/* 2. Split Screen Editorial Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Original Book Cover + QR Code */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="relative max-w-[250px] sm:max-w-[290px] w-full rounded-2xl border border-[#C7A35A]/40 bg-[#101412] p-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:scale-[1.02]">
              <div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-[#080A09] flex items-center justify-center" style={{ aspectRatio: '2 / 3' }}>
                <img
                  src={bookCoverSrc}
                  alt="Du bist nicht zu viel — Original Buchcover"
                  loading="eager"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = PROJECT_BOOK_COVER;
                  }}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Instagram QR Code */}
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram-Profil öffnen: frau_en_power2026" className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-4 text-center flex flex-col items-center max-w-[190px] shadow-lg hover:border-[#C7A35A]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C7A35A]">
              <div className="h-36 w-36 rounded-xl bg-white p-2 border border-[#C7A35A]/30">
                <img
                  src={qrSrc}
                  alt="QR-Code: Instagram-Profil frau_en_power2026"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-sans text-[11px] font-bold text-[#C7A35A] uppercase tracking-wider mt-3">
                QR-Code
              </span>
              <span className="text-[10px] text-[#A9AEA9] mt-0.5">
                {currentLang === 'de' ? 'Direkt zu Instagram' : currentLang === 'pl' ? 'Przejdź do Instagrama' : 'Directly to Instagram'}
              </span>
            </a>
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
                ? '„Du bist nicht zu viel“ ist mein Buchprojekt über Dating, Situationships, Red Flags, Selbstwert und die Frage, was Frauen in Beziehungen wirklich wollen und nicht länger akzeptieren möchten. Mit Humor, Alltagsbeobachtungen und Selbstironie geht es nicht um Tricks, um einen Mann zu gewinnen, sondern um Klarheit über die eigenen Bedürfnisse und Grenzen.'
                : currentLang === 'pl'
                ? '„Du bist nicht zu viel” to mój autorski projekt książkowy o randkowaniu, situationships, czerwonych flagach, poczuciu własnej wartości i granicach w relacjach. Z humorem i autoironią pokazuje codzienne sytuacje, nie oferując sztuczek na zdobycie mężczyzny, lecz zachęcając do zrozumienia własnych potrzeb.'
                : '“Du bist nicht zu viel” is my independent book project about dating, situationships, red flags, self-worth and personal boundaries. With humour, candid everyday stories and self-irony, it explores what women want and need in relationships—not tricks for winning someone over.'}
            </p>

            <div className="rounded-2xl border border-[#0F5C46]/30 bg-[#101412] p-5 space-y-2">
              <span className="font-sans text-xs font-bold text-[#C7A35A] uppercase tracking-wider block">
                {currentLang === 'de'
                  ? 'VON DER IDEE ZUM EIGENSTÄNDIGEN BUCHPROJEKT:'
                  : currentLang === 'pl'
                  ? 'OD POMYSŁU DO AUTORSKIEGO PROJEKTU KSIĄŻKOWEGO:'
                  : 'FROM IDEA TO INDEPENDENT BOOK PROJECT:'}
              </span>
              <p className="text-xs sm:text-sm text-[#A9AEA9] leading-relaxed">
                {currentLang === 'de'
                  ? 'Eigenständige Buchkonzeption, Manuskriptentwicklung und Covergestaltung. Begleitend entsteht auf Instagram (@frau_en_power2026) ein Raum für Gedanken über Dating, Red Flags, Selbstwert, Humor und persönliche Grenzen – ohne unbelegte Reichweitenangaben.'
                  : currentLang === 'pl'
                  ? 'Autorska koncepcja książki, rozwój manuskryptu i projekt okładki. Na Instagramie (@frau_en_power2026) publikuję treści o randkowaniu, czerwonych flagach, poczuciu własnej wartości, humorze i osobistych granicach – bez niepotwierdzonych danych o liczbie obserwujących.'
                  : 'Independent book concept, manuscript development and cover design. On Instagram (@frau_en_power2026), I share reflections on dating, red flags, self-worth, humour and personal boundaries – without unverified audience figures.'}
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
              ? 'Buchprojekt & Community-Aufbau · Autorin & Projektinitiatorin'
              : currentLang === 'pl'
              ? 'Projekt książkowy i budowanie społeczności · Autorka i inicjatorka projektu'
              : 'Book project & community building · Author & project initiator'}
          </span>
          <span className="text-[#C7A35A]">
            {currentLang === 'de'
              ? 'Eigenständiges kreatives Projekt · Noch nicht veröffentlicht'
              : currentLang === 'pl'
              ? 'Autorski projekt kreatywny · Jeszcze niewydany'
              : 'Independent creative project · Not yet published'}
          </span>
        </div>
      </div>
    </PageTransition>
  );
};
