import React from 'react';
import { ArrowRight, Sparkles, Upload } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { translations } from '../data/translations';
import { BotanicalDecoration } from './BotanicalDecoration';

interface HeroProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onUploadMedia: (key: string) => void;
  onExploreWorkClick: () => void;
  onAboutMeClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  mediaAssets,
  onUploadMedia,
  onExploreWorkClick,
  onAboutMeClick,
}) => {
  const t = translations[currentLang].hero;

  return (
    <section
      id="home"
      className="relative min-h-[85vh] w-full overflow-hidden border-b border-[#C9A66B]/10 bg-[#080B09] py-12 lg:py-20"
    >
      {/* Botanical Decorative Foliage */}
      <BotanicalDecoration position="top-left" />

      {/* Atmospheric Radial Glows */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#0B5A4D]/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-10 h-72 w-72 rounded-full bg-[#063F35]/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT SIDE: Prominent Portrait in Gold Frame with Emerald Glow (5 Cols on LG, Order 1) */}
          <div className="order-1 relative flex items-center justify-center lg:col-span-5 lg:order-1">
            {/* Very subtle emerald glow behind photo */}
            <div
              className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-b from-[#0B5A4D]/35 via-[#063F35]/25 to-transparent blur-2xl"
              aria-hidden="true"
            />

            {/* Portrait Container with Elegant Gold Frame */}
            <div className="group relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl border border-[#C9A66B]/50 bg-gradient-to-b from-[#063F35]/30 via-[#080B09] to-[#080B09] p-2 sm:p-2.5 shadow-[0_15px_45px_rgba(6,63,53,0.45)] transition-all duration-500 hover:border-[#C9A66B] hover:shadow-[0_0_35px_rgba(201,166,107,0.35)]">
              {mediaAssets.heroPortrait ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#080B09]">
                  <img
                    src={mediaAssets.heroPortrait}
                    alt="Natalia Stachowiak"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle blend vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B09]/40 via-transparent to-transparent opacity-50" />

                  {/* Upload button on hover */}
                  <button
                    type="button"
                    onClick={() => onUploadMedia('heroPortrait')}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-[#C9A66B]/40 bg-[#080B09]/90 px-3 py-1.5 text-xs font-medium text-[#C9A66B] shadow-lg backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0B5A4D] hover:text-white"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Bild ändern</span>
                  </button>
                </div>
              ) : (
                /* Elegant clearly labeled portrait placeholder */
                <div
                  onClick={() => onUploadMedia('heroPortrait')}
                  className="flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#C9A66B]/50 bg-gradient-to-b from-[#063F35]/25 to-[#080B09] p-6 text-center transition-all duration-300 hover:bg-[#063F35]/35"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A66B] bg-[#0B5A4D]/40 text-[#C9A66B] shadow-[0_0_15px_rgba(201,166,107,0.25)] transition-transform duration-300 group-hover:scale-110">
                    <Upload className="h-6 w-6" />
                  </div>

                  <p className="font-sans text-xs font-bold tracking-widest text-[#F5F1E8] uppercase">
                    {t.portraitPlaceholder}
                  </p>

                  <p className="mt-2 max-w-[220px] text-[11px] leading-snug text-[#B9C4BD]">
                    {t.portraitNote}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-[#C9A66B]/50 bg-[#0B5A4D]/30 px-3 py-1 text-[11px] font-medium text-[#C9A66B]">
                    <Sparkles className="h-3 w-3" />
                    Hier klicken zum Hochladen
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Hero Typography & Actions (7 Cols on LG, Order 2) */}
          <div className="order-2 flex flex-col items-start lg:col-span-7 lg:order-2 lg:pl-4">
            {/* Small eyebrow label */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A66B]/30 bg-[#063F35]/25 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B] animate-pulse" />
              <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-[#C9A66B] uppercase">
                {t.roleLabel || 'NATALIA STACHOWIAK · DIGITAL PRODUCT MANAGEMENT'}
              </span>
            </div>

            {/* Large editorial serif headline with italic gold second line */}
            <h1 className="font-serif text-5xl leading-[1.08] font-normal tracking-tight text-[#F5F1E8] sm:text-6xl md:text-7xl">
              Turning problems
              <span className="block italic text-[#C9A66B]">into products.</span>
            </h1>

            {/* Supporting line */}
            <div className="mt-4 flex items-center gap-2 font-sans text-sm font-medium tracking-wide text-[#148B78] sm:text-base">
              <span>Digital Products</span>
              <span className="text-[#C9A66B] font-bold">·</span>
              <span>AI</span>
              <span className="text-[#C9A66B] font-bold">·</span>
              <span>Innovation</span>
            </div>

            {/* Generously spaced description paragraphs */}
            <div className="mt-6 max-w-xl space-y-3 font-sans text-base leading-relaxed text-[#B9C4BD] sm:text-lg">
              {t.description.split('\n\n').map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary: Emerald with Gold Accents */}
              <button
                type="button"
                onClick={onExploreWorkClick}
                className="group flex items-center gap-2.5 rounded-full border border-[#C9A66B] bg-gradient-to-r from-[#0B5A4D] to-[#063F35] px-7 py-3.5 font-sans text-xs font-semibold tracking-wider text-[#F5F1E8] shadow-[0_4px_20px_rgba(11,90,77,0.4)] transition-all duration-300 hover:scale-[1.02] hover:border-[#F5F1E8] hover:shadow-[0_0_25px_rgba(201,166,107,0.5)] uppercase"
              >
                <span>{t.exploreWork}</span>
              </button>

              {/* Secondary: Elegant Gold Frame */}
              <button
                type="button"
                onClick={onAboutMeClick}
                className="group flex items-center gap-2 rounded-full border border-[#C9A66B] bg-[#080B09]/80 px-6 py-3.5 font-sans text-xs font-medium tracking-wider text-[#F5F1E8] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#F5F1E8] hover:bg-[#063F35]/30 uppercase"
              >
                <span>{t.aboutMe}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
