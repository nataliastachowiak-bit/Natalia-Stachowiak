import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Download } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { CV_FILE } from '../data/assetRegistry';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onManageMediaClick?: () => void;
  isReadOnly?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[currentLang].nav;

  // Automatically close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Primary Desktop Navigation: Home, About, My Journey, Projects, Certificates, Contact (Book removed from top bar)
  const desktopNavLinks = [
    { path: '/', label: t.home || 'Home', id: 'home' },
    { path: '/about', label: t.about || 'About', id: 'about' },
    { path: '/journey', label: t.journey || 'My Journey', id: 'journey' },
    { path: '/projects', label: t.projects || 'Projects', id: 'projects' },
    { path: '/certificates', label: t.certificates || 'Certificates', id: 'certificates' },
    { path: '/contact', label: t.contact || 'Contact', id: 'contact' },
  ];

  // Mobile Drawer Navigation (Includes all destinations, with Book preserved)
  const mobileNavLinks = [
    { path: '/', label: t.home || 'Home', id: 'home' },
    { path: '/about', label: t.about || 'About', id: 'about' },
    { path: '/journey', label: t.journey || 'My Journey', id: 'journey' },
    { path: '/projects', label: t.projects || 'Projects', id: 'projects' },
    { path: '/certificates', label: t.certificates || 'Certificates', id: 'certificates' },
    { path: '/book', label: t.book || 'Book', id: 'book' },
    { path: '/contact', label: t.contact || 'Contact', id: 'contact' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#C7A35A]/15 bg-[#080A09]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* LEFT ZONE: Brand Name (Never truncated, never wrapped, priority breathing room) */}
        {/* ========================================================================= */}
        <div className="flex items-center shrink-0 min-w-fit pr-4 sm:pr-6 lg:pr-8">
          <Link
            to="/"
            className="group flex items-center py-1"
            title="Natalia Stachowiak — Home"
          >
            <span className="font-serif text-sm sm:text-base md:text-lg xl:text-xl font-medium tracking-[0.16em] text-[#F4F1EA] transition-colors group-hover:text-[#C7A35A] whitespace-nowrap select-none">
              NATALIA STACHOWIAK
            </span>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* CENTER ZONE: Primary Main Navigation (Desktop >= 1280px)                 */}
        {/* Clean, balanced, centered: Home | About | My Journey | Projects | Certificates | Contact */}
        {/* ========================================================================= */}
        <nav className="hidden xl:flex items-center justify-center gap-5 2xl:gap-7 flex-1 mx-2">
          {desktopNavLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.id}
                to={link.path}
                className={`relative py-1.5 font-sans text-xs font-medium tracking-wider transition-colors duration-200 uppercase whitespace-nowrap ${
                  active
                    ? 'text-[#C7A35A]'
                    : 'text-[#A9AEA9] hover:text-[#F4F1EA]'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#C7A35A]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ========================================================================= */}
        {/* RIGHT ZONE: Desktop Controls (Desktop >= 1280px)                          */}
        {/* Essential actions only: DE | EN | PL  +  LinkedIn  +  CV                 */}
        {/* ========================================================================= */}
        <div className="hidden xl:flex items-center gap-3 shrink-0 pl-2">
          {/* Elegant Language Switcher: DE | EN | PL */}
          <div className="flex items-center rounded-full border border-[#C7A35A]/30 bg-[#101412] px-2 py-1 text-xs font-mono tracking-wider shadow-inner">
            <button
              type="button"
              onClick={() => onLanguageChange('de')}
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase transition-all duration-200 ${
                currentLang === 'de'
                  ? 'bg-[#0F5C46] text-[#F4F1EA] shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'text-[#A9AEA9] hover:text-[#F4F1EA]'
              }`}
              aria-label="Deutsch"
            >
              DE
            </button>
            <span className="text-[#C7A35A]/30 mx-1 select-none text-[10px]">|</span>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase transition-all duration-200 ${
                currentLang === 'en'
                  ? 'bg-[#0F5C46] text-[#F4F1EA] shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'text-[#A9AEA9] hover:text-[#F4F1EA]'
              }`}
              aria-label="English"
            >
              EN
            </button>
            <span className="text-[#C7A35A]/30 mx-1 select-none text-[10px]">|</span>
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase transition-all duration-200 ${
                currentLang === 'pl'
                  ? 'bg-[#0F5C46] text-[#F4F1EA] shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'text-[#A9AEA9] hover:text-[#F4F1EA]'
              }`}
              aria-label="Polski"
            >
              PL
            </button>
          </div>

          {/* LinkedIn Profile */}
          <a
            href="https://www.linkedin.com/in/natalia-stachowiak-0a8449306"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="flex items-center justify-center rounded-full border border-[#C7A35A]/30 p-2 text-[#C7A35A] transition-colors hover:border-[#C7A35A] hover:bg-[#0F5C46]/30 hover:text-white"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          {/* Compact Elegant Emerald/Gold CV Button */}
          <a
            href={CV_FILE}
            target="_blank"
            rel="noopener noreferrer"
            download="Natalia_Stachowiak_CV_grafisch_FINAL_2026.pdf"
            className="group flex min-h-[34px] items-center gap-1.5 rounded-full border border-[#C7A35A]/70 bg-[#0F5C46] px-3.5 py-1.5 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] transition-all duration-300 hover:border-[#C7A35A] hover:bg-[#148B78] uppercase shadow-sm shrink-0 whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5 text-[#C7A35A] transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="whitespace-nowrap">CV</span>
          </a>
        </div>

        {/* ========================================================================= */}
        {/* TABLET & MOBILE ZONE (< 1280px / xl:hidden)                              */}
        {/* Switch early to compact mode: never crowd, never truncate name           */}
        {/* Tablet: Language + LinkedIn + CV + Hamburger                              */}
        {/* Mobile: Language + Hamburger                                              */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 sm:gap-3 xl:hidden shrink-0">
          {/* Language Switcher for Tablet & Mobile Header */}
          <div className="flex items-center rounded-full border border-[#C7A35A]/30 bg-[#101412] px-1.5 sm:px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-mono">
            {(['de', 'en', 'pl'] as Language[]).map((lang, idx) => (
              <React.Fragment key={lang}>
                {idx > 0 && <span className="text-[#C7A35A]/30 mx-0.5 sm:mx-1 select-none text-[9px] sm:text-[10px]">|</span>}
                <button
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`rounded-full px-1.5 sm:px-2 py-0.5 font-semibold uppercase transition-colors ${
                    currentLang === lang
                      ? 'bg-[#0F5C46] text-[#F4F1EA] shadow-sm'
                      : 'text-[#A9AEA9] hover:text-[#F4F1EA]'
                  }`}
                  aria-label={`Switch to ${lang}`}
                >
                  {lang}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Tablet Only: LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/natalia-stachowiak-0a8449306"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="hidden md:flex items-center justify-center rounded-full border border-[#C7A35A]/30 p-2 text-[#C7A35A] transition-colors hover:border-[#C7A35A] hover:bg-[#0F5C46]/30 hover:text-white"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>

          {/* Tablet Only: Compact CV Button */}
          <a
            href={CV_FILE}
            target="_blank"
            rel="noopener noreferrer"
            download="Natalia_Stachowiak_CV_grafisch_FINAL_2026.pdf"
            className="hidden md:flex min-h-[32px] items-center gap-1.5 rounded-full border border-[#C7A35A]/70 bg-[#0F5C46] px-3 py-1 font-sans text-[11px] font-semibold tracking-wider text-[#F4F1EA] transition-all hover:border-[#C7A35A] hover:bg-[#148B78] uppercase shadow-sm shrink-0 whitespace-nowrap"
          >
            <Download className="h-3 w-3 text-[#C7A35A]" />
            <span>CV</span>
          </a>

          {/* Elegant Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg text-[#F4F1EA] hover:bg-[#101412] active:scale-95 transition-colors border border-transparent hover:border-[#C7A35A]/20"
            aria-label="Navigation umschalten"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#C7A35A]" />
            ) : (
              <Menu className="h-6 w-6 text-[#C7A35A]" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET DRAWER MENU OVERLAY (< 1280px / xl:hidden)                */}
      {/* Complete navigation destinations + language + LinkedIn + CV              */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm xl:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-50 border-b border-[#C7A35A]/20 bg-[#080A09]/98 px-5 pt-3 pb-6 backdrop-blur-xl xl:hidden shadow-2xl animate-fadeIn">
            
            {/* Language Switcher inside Drawer */}
            <div className="mb-4 pb-3 border-b border-[#C7A35A]/20 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#A9AEA9] uppercase tracking-wider">
                Language / Sprache:
              </span>
              <div className="flex items-center rounded-full border border-[#C7A35A]/40 bg-[#101412] px-2 py-1 text-xs font-mono">
                {(['de', 'en', 'pl'] as Language[]).map((lang, idx) => (
                  <React.Fragment key={lang}>
                    {idx > 0 && <span className="text-[#C7A35A]/30 mx-1 select-none text-[10px]">|</span>}
                    <button
                      type="button"
                      onClick={() => onLanguageChange(lang)}
                      className={`rounded-full px-3 py-1 font-semibold uppercase transition-all ${
                        currentLang === lang
                          ? 'bg-[#0F5C46] text-[#F4F1EA] shadow-sm'
                          : 'text-[#A9AEA9] hover:text-[#F4F1EA]'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Navigation Destinations */}
            <nav className="flex flex-col space-y-1.5">
              {mobileNavLinks.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-[44px] items-center justify-between rounded-lg px-4 py-2.5 font-sans text-sm font-medium tracking-wider uppercase transition-colors ${
                      active
                        ? 'bg-[#0F5C46]/30 text-[#C7A35A]'
                        : 'text-[#F4F1EA] hover:bg-[#101412] hover:text-[#C7A35A]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-[#C7A35A]" />}
                  </Link>
                );
              })}

              {/* Primary Actions: Download CV + LinkedIn */}
              <div className="pt-3 flex flex-col gap-2">
                <a
                  href={CV_FILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Natalia_Stachowiak_CV_grafisch_FINAL_2026.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#C7A35A] bg-[#0F5C46] py-3 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] shadow-md active:scale-98 uppercase transition-colors hover:bg-[#148B78]"
                >
                  <Download className="h-4 w-4 text-[#C7A35A]" />
                  <span>CV herunterladen</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/natalia-stachowiak-0a8449306"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#C7A35A]/60 bg-[#101412] py-3 font-sans text-xs font-semibold tracking-wider text-[#C7A35A] hover:text-white uppercase transition-colors hover:border-[#C7A35A]"
                >
                  <Linkedin className="h-4 w-4 text-[#C7A35A]" />
                  <span>LinkedIn Profil ↗</span>
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
