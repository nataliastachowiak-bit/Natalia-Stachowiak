import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface BackToPortfolioProps {
  currentLang?: Language;
  to?: string;
  className?: string;
}

export const BackToPortfolio: React.FC<BackToPortfolioProps> = ({
  currentLang,
  to = '/',
  className = '',
}) => {
  // Dynamically resolve active language: prop -> localStorage -> HTML lang -> 'de'
  const activeLang: Language =
    currentLang ||
    (typeof window !== 'undefined'
      ? ((localStorage.getItem('natalia_portfolio_lang') as Language) ||
         (document.documentElement.lang as Language) ||
         'de')
      : 'de');

  const desktopLabels: Record<Language, string> = {
    de: 'ZURÜCK ZUM PORTFOLIO',
    en: 'BACK TO PORTFOLIO',
    pl: 'WRÓĆ DO PORTFOLIO',
  };

  const mobileLabels: Record<Language, string> = {
    de: 'ZURÜCK',
    en: 'BACK',
    pl: 'WRÓĆ',
  };

  const desktopText = desktopLabels[activeLang] || desktopLabels.de;
  const mobileText = mobileLabels[activeLang] || mobileLabels.de;

  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2.5 sm:gap-3 py-2 px-1 text-xs font-semibold uppercase text-[#C7A35A] hover:text-[#F4F1EA] transition-colors duration-300 focus:outline-none ${className}`}
      aria-label={desktopText}
    >
      {/* Gold arrow with subtle hover translation */}
      <ArrowLeft className="h-3.5 w-3.5 text-[#C7A35A] transition-transform duration-300 group-hover:-translate-x-1 shrink-0" />

      {/* Elegant gold horizontal rule line (desktop only) */}
      <span
        aria-hidden="true"
        className="hidden sm:inline-block h-px w-7 md:w-9 bg-[#C7A35A]/70 transition-all duration-300 group-hover:w-12 group-hover:bg-[#C7A35A]"
      />

      {/* Desktop label: ← ───── ZURÜCK ZUM PORTFOLIO / BACK TO PORTFOLIO / WRÓĆ DO PORTFOLIO */}
      <span className="hidden sm:inline font-sans text-xs font-semibold tracking-[0.2em] transition-colors duration-300">
        {desktopText}
      </span>

      {/* Mobile label: ← ZURÜCK / BACK / WRÓĆ */}
      <span className="inline sm:hidden font-sans text-xs font-semibold tracking-wider transition-colors duration-300">
        {mobileText}
      </span>
    </Link>
  );
};
