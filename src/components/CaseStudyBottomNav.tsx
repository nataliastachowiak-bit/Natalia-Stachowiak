import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface CaseStudyBottomNavProps {
  currentLang?: Language;
  allProjectsUrl?: string;
  nextProjectUrl?: string;
  nextProjectTitle?: string;
  prevProjectUrl?: string;
  prevProjectTitle?: string;
  className?: string;
}

export const CaseStudyBottomNav: React.FC<CaseStudyBottomNavProps> = ({
  currentLang,
  allProjectsUrl = '/projects',
  nextProjectUrl,
  nextProjectTitle,
  prevProjectUrl,
  prevProjectTitle,
  className = '',
}) => {
  const activeLang: Language =
    currentLang ||
    (typeof window !== 'undefined'
      ? ((localStorage.getItem('natalia_portfolio_lang') as Language) ||
         (document.documentElement.lang as Language) ||
         'de')
      : 'de');

  const allCaseStudiesLabels: Record<Language, string> = {
    de: 'ALLE CASE STUDIES',
    en: 'ALL CASE STUDIES',
    pl: 'WSZYSTKIE CASE STUDIES',
  };

  const nextProjectLabels: Record<Language, string> = {
    de: 'NÄCHSTES PROJEKT',
    en: 'NEXT PROJECT',
    pl: 'NASTĘPNY PROJEKT',
  };

  const prevProjectLabels: Record<Language, string> = {
    de: 'VORHERIGES PROJEKT',
    en: 'PREVIOUS PROJECT',
    pl: 'POPRZEDNI PROJEKT',
  };

  const allCaseStudiesText = allCaseStudiesLabels[activeLang] || allCaseStudiesLabels.de;
  const nextProjectText = nextProjectLabels[activeLang] || nextProjectLabels.de;
  const prevProjectText = prevProjectLabels[activeLang] || prevProjectLabels.de;

  return (
    <nav
      aria-label="Case Study Navigation"
      className={`relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-8 pb-14 border-t border-[#C7A35A]/15 ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-xs font-sans font-semibold uppercase tracking-wider">
        {/* Left: ← ALLE CASE STUDIES / ALL CASE STUDIES / WSZYSTKIE CASE STUDIES */}
        <Link
          to={allProjectsUrl}
          className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#C7A35A]/40 bg-[#101412] px-6 py-3 text-[#F4F1EA] hover:bg-[#0F5C46] hover:border-[#C7A35A] hover:text-white transition-all duration-300 w-full sm:w-auto justify-center"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#C7A35A] transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="tracking-[0.15em] font-sans">
            {allCaseStudiesText}
          </span>
        </Link>

        {/* Optional Previous link if present and on large screens */}
        {prevProjectUrl && (
          <Link
            to={prevProjectUrl}
            className="group hidden lg:inline-flex items-center gap-2 text-xs text-[#A9AEA9] hover:text-[#C7A35A] transition-colors"
          >
            <ArrowLeft className="h-3 w-3 text-[#C7A35A]/70" />
            <span className="text-[11px] tracking-wider text-[#A9AEA9]/80 font-normal">
              {prevProjectText}
              {prevProjectTitle ? `: ${prevProjectTitle}` : ''}
            </span>
          </Link>
        )}

        {/* Right: NÄCHSTES PROJEKT → / NEXT PROJECT → / NASTĘPNY PROJEKT → */}
        {nextProjectUrl ? (
          <Link
            to={nextProjectUrl}
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#C7A35A]/60 bg-[#0F5C46] px-6 py-3 text-[#F4F1EA] hover:bg-[#148B78] hover:border-[#C7A35A] transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <span className="tracking-[0.15em] font-sans">
              {nextProjectText}
              {nextProjectTitle ? ` · ${nextProjectTitle}` : ''}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#C7A35A] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ) : (
          <Link
            to={allProjectsUrl}
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#C7A35A]/60 bg-[#0F5C46] px-6 py-3 text-[#F4F1EA] hover:bg-[#148B78] hover:border-[#C7A35A] transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <span className="tracking-[0.15em] font-sans">
              {nextProjectText}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#C7A35A] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </nav>
  );
};
