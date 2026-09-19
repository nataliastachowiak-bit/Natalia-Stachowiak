import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Compass } from 'lucide-react';

interface PersonalMottoBannerProps {
  currentLang: Language;
}

export const PersonalMottoBanner: React.FC<PersonalMottoBannerProps> = ({ currentLang }) => {
  const tMotto = translations[currentLang].motto;

  if (!tMotto) return null;

  return (
    <div className="relative w-full border-y border-[#C9A66B]/15 bg-gradient-to-r from-[#080B09] via-[#063F35]/20 to-[#080B09] py-8 sm:py-10 overflow-hidden">
      {/* Subtle emerald atmospheric background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-96 rounded-full bg-[#0B5A4D]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Subtle decorative emblem */}
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A66B]/50" />
          <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#C9A66B] uppercase flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-[#C9A66B]" />
            {tMotto.label}
          </span>
          <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A66B]/50" />
        </div>

        {/* The Personal Motto Quote */}
        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal leading-snug tracking-tight text-[#F5F1E8]">
          <span className="text-[#C9A66B]/60 mr-1 font-serif text-2xl sm:text-3xl">„</span>
          <span>{tMotto.quoteLine1}</span>{' '}
          <span className="italic text-[#C9A66B]">{tMotto.quoteLine2}</span>
          <span className="text-[#C9A66B]/60 ml-1 font-serif text-2xl sm:text-3xl">“</span>
        </blockquote>

        {/* Supporting subtext */}
        <p className="mt-2.5 max-w-2xl mx-auto font-sans text-xs sm:text-sm text-[#B9C4BD] tracking-wide">
          {tMotto.subtext}
        </p>
      </div>
    </div>
  );
};
