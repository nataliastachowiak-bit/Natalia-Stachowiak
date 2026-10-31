import React from 'react';
import { Sparkles, Upload } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { translations } from '../data/translations';
import { BotanicalDecoration } from './BotanicalDecoration';
import { LOCKED_ASSETS, HOME_MAIN_IMAGE, NATALIA_BUSINESS_PORTRAIT } from '../data/assetRegistry';

interface HeroProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onUploadMedia: (key: string) => void;
  onExploreWorkClick: () => void;
  onAboutMeClick: () => void;
  isReadOnly?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  mediaAssets,
  onUploadMedia,
  onExploreWorkClick,
  onAboutMeClick,
  isReadOnly = false,
}) => {
  const t = translations[currentLang].hero;
  const [portraitError, setPortraitError] = React.useState(false);

  // Respect user uploaded portrait with fallback to canonical NATALIA_BUSINESS_PORTRAIT
  const userPortrait = mediaAssets.heroPortrait || mediaAssets.profilePhoto || mediaAssets.homeMainImage;
  const heroImageSrc = (!portraitError && userPortrait && userPortrait.trim() !== '' && !userPortrait.includes('hero_portrait.jpg'))
    ? userPortrait
    : NATALIA_BUSINESS_PORTRAIT;

  React.useEffect(() => {
    setPortraitError(false);
  }, [mediaAssets.heroPortrait]);

  return (
    <section
      id="home"
      className="relative min-h-[85vh] w-full overflow-hidden border-b border-[#C9A66B]/10 bg-[#080B09] py-8 sm:py-14 lg:py-20"
    >
      {/* Botanical Decorative Foliage */}
      <BotanicalDecoration position="top-left" />

      {/* Atmospheric Radial Glows */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-[#0B5A4D]/25 blur-[90px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-4 sm:left-10 h-48 sm:h-72 w-48 sm:w-72 rounded-full bg-[#063F35]/30 blur-[70px] sm:blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* 1. Mobile & Desktop: Profile Image First on Mobile (Order 1 on Mobile, Order 1 on LG) */}
          <div className="order-1 relative flex items-center justify-center lg:col-span-5">
            {/* Very subtle emerald glow behind photo */}
            <div
              className="pointer-events-none absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-b from-[#0B5A4D]/35 via-[#063F35]/25 to-transparent blur-xl sm:blur-2xl"
              aria-hidden="true"
            />

            {/* Portrait Container with Elegant Gold Frame */}
            <div className="group relative w-full max-w-[260px] sm:max-w-sm md:max-w-md overflow-hidden rounded-2xl border border-[#C9A66B]/50 bg-gradient-to-b from-[#063F35]/30 via-[#080B09] to-[#080B09] p-2 sm:p-2.5 shadow-[0_15px_45px_rgba(6,63,53,0.45)] transition-all duration-500 hover:border-[#C9A66B] hover:shadow-[0_0_35px_rgba(201,166,107,0.35)]">
              {heroImageSrc && !portraitError ? (
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#080B09]" style={{ aspectRatio: '3 / 4' }}>
                  {/* Stable responsive configuration: object-cover with top intentional position so face & head are never cut off */}
                  <picture>
                    <source media="(min-width: 1024px)" srcSet={heroImageSrc} />
                    <img
                      src={heroImageSrc}
                      alt="Natalia Stachowiak"
                      loading="eager"
                      onError={() => setPortraitError(true)}
                      className="h-full w-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
                  {/* Subtle blend vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B09]/40 via-transparent to-transparent opacity-50" />

                  {/* Upload button on hover */}
                  {!isReadOnly && (
                    <button
                      type="button"
                      onClick={() => onUploadMedia('heroPortrait')}
                      className="absolute bottom-3 right-3 flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#C9A66B]/40 bg-[#080B09]/90 px-3.5 py-2 text-xs font-medium text-[#C9A66B] shadow-lg backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0B5A4D] hover:text-white"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Bild ändern</span>
                    </button>
                  )}
                </div>
              ) : (
                /* Elegant clearly labeled portrait placeholder */
                <div
                  onClick={() => {
                    if (!isReadOnly) onUploadMedia('heroPortrait');
                  }}
                  className={`flex aspect-[4/5] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#C9A66B]/50 bg-gradient-to-b from-[#063F35]/25 to-[#080B09] p-6 text-center transition-all duration-300 ${
                    isReadOnly ? 'cursor-default' : 'cursor-pointer hover:bg-[#063F35]/35'
                  }`}
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A66B] bg-[#0B5A4D]/40 text-[#C9A66B] shadow-[0_0_15px_rgba(201,166,107,0.25)] transition-transform duration-300 group-hover:scale-110">
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <p className="font-sans text-xs font-bold tracking-widest text-[#F5F1E8] uppercase">
                    NATALIA STACHOWIAK
                  </p>

                  <p className="mt-2 max-w-[220px] text-[11px] leading-snug text-[#B9C4BD]">
                    Digital Product Management · AI & Environmental Transformation
                  </p>

                  {!isReadOnly && (
                    <span className="mt-4 inline-flex min-h-[44px] items-center gap-1 rounded-full border border-[#C9A66B]/50 bg-[#0B5A4D]/30 px-4 py-2 text-xs font-medium text-[#C9A66B]">
                      <Upload className="h-3.5 w-3.5" />
                      Hier klicken zum Hochladen
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 2. Hero Typography & Actions (Order 2 on Mobile, Order 2 on LG) */}
          {/* Mobile Flow: Name -> Professional Role -> Main Statement -> CTA Buttons */}
          <div className="order-2 flex flex-col items-center sm:items-start text-center sm:text-left lg:col-span-7 lg:pl-4">
            
            {/* Name + Professional Role Badge */}
            <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A66B]/30 bg-[#063F35]/25 px-3.5 py-1.5 sm:px-4 sm:py-1.5 backdrop-blur-sm max-w-full">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#C9A66B] animate-pulse" />
              <span className="font-sans text-[12px] sm:text-[13px] font-semibold tracking-[0.18em] text-[#C9A66B] uppercase truncate">
                {t.roleLabel || 'DIGITAL PRODUCT MANAGEMENT · AI INNOVATION · SUSTAINABILITY'}
              </span>
            </div>

            {/* Main Statement: H1 (34-42px on mobile, responsive) */}
            <h1 className="font-serif text-[34px] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] sm:leading-[1.08] font-normal tracking-tight text-[#F5F1E8]">
              Turning problems
              <span className="block italic text-[#C9A66B]">into products.</span>
            </h1>

            {/* Professional Role / Focus Areas */}
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 font-sans text-xs sm:text-sm md:text-base font-medium tracking-wide text-[#148B78]">
              <span>Digital Products</span>
              <span className="text-[#C9A66B] font-bold">·</span>
              <span>AI</span>
              <span className="text-[#C9A66B] font-bold">·</span>
              <span>Innovation</span>
            </div>

            {/* Generously spaced description paragraphs */}
            <div className="mt-4 sm:mt-6 max-w-xl space-y-2.5 sm:space-y-3 font-sans text-sm sm:text-base md:text-lg leading-relaxed text-[#B9C4BD]">
              {t.description.split('\n\n').map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* CTA Buttons: Touch-friendly with minimum 44px height */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Primary: Emerald with Gold Accents */}
              <button
                type="button"
                onClick={onExploreWorkClick}
                className="group flex min-h-[44px] items-center justify-center gap-2.5 rounded-full border border-[#C9A66B] bg-gradient-to-r from-[#0B5A4D] to-[#063F35] px-6 sm:px-7 py-3 sm:py-3.5 font-sans text-xs font-semibold tracking-wider text-[#F5F1E8] shadow-[0_4px_20px_rgba(11,90,77,0.4)] transition-all duration-300 hover:scale-[1.02] hover:border-[#F5F1E8] hover:shadow-[0_0_25px_rgba(201,166,107,0.5)] active:scale-98 uppercase"
              >
                <span>{t.exploreWork}</span>
              </button>

              {/* Secondary: Elegant Gold Frame */}
              <button
                type="button"
                onClick={onAboutMeClick}
                className="group flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C9A66B] bg-[#080B09]/80 px-6 py-3 sm:py-3.5 font-sans text-xs font-medium tracking-wider text-[#F5F1E8] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#F5F1E8] hover:bg-[#063F35]/30 active:scale-98 uppercase"
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
