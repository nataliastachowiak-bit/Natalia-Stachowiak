import React, { useState } from 'react';
import { Download, Menu, X, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onDownloadCvClick: () => void;
  onManageMediaClick: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onDownloadCvClick,
  onManageMediaClick,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang].nav;

  const navLinks = [
    { id: 'home', label: t.home, href: '#home' },
    { id: 'about', label: t.about, href: '#about' },
    { id: 'projects', label: t.projects, href: '#projects' },
    { id: 'product-thinking', label: t.productThinking, href: '#product-thinking' },
    { id: 'skills', label: t.skills, href: '#skills' },
    { id: 'certificates', label: t.certificates, href: '#certificates' },
    { id: 'contact', label: t.contact, href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#C9A66B]/15 bg-[#080B09]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Name */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, '#home')}
          className="group flex items-center gap-2"
        >
          <span className="font-serif text-lg font-medium tracking-[0.25em] text-[#F5F1E8] transition-colors group-hover:text-[#C9A66B] sm:text-xl">
            NATALIA STACHOWIAK
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`relative py-2 font-sans text-xs font-medium tracking-wider transition-colors duration-200 uppercase ${
                  isActive
                    ? 'text-[#C9A66B]'
                    : 'text-[#B9C4BD] hover:text-[#F5F1E8]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-[#0B5A4D] via-[#C9A66B] to-[#0B5A4D]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right side controls: Language switcher + CV Button */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Language Switcher */}
          <div className="flex items-center rounded-full border border-[#C9A66B]/30 bg-[#063F35]/20 p-1 text-xs">
            {(['de', 'en', 'pl'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wider transition-all duration-200 uppercase ${
                  currentLang === lang
                    ? 'bg-[#0B5A4D] text-[#F5F1E8] shadow-[0_0_10px_rgba(201,166,107,0.3)]'
                    : 'text-[#B9C4BD] hover:text-[#F5F1E8]'
                }`}
                aria-label={`Switch to ${lang}`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Media Manager quick trigger */}
          <button
            type="button"
            onClick={onManageMediaClick}
            title={t.manageAssets}
            className="flex items-center justify-center rounded-full border border-[#C9A66B]/30 p-2 text-[#C9A66B] transition-colors hover:bg-[#0B5A4D]/30 hover:text-white"
          >
            <ImageIcon className="h-4 w-4" />
          </button>

          {/* Download CV Button */}
          <button
            type="button"
            onClick={onDownloadCvClick}
            className="group flex items-center gap-2 rounded-full border border-[#C9A66B]/70 bg-gradient-to-r from-[#063F35] to-[#0B5A4D] px-4 py-2 font-sans text-xs font-semibold tracking-wider text-[#F5F1E8] shadow-[0_2px_15px_rgba(11,90,77,0.35)] transition-all duration-300 hover:border-[#C9A66B] hover:shadow-[0_0_20px_rgba(201,166,107,0.4)]"
          >
            <Download className="h-3.5 w-3.5 text-[#C9A66B] transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="whitespace-nowrap">{t.downloadCv}</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick Language switcher on mobile */}
          <div className="flex items-center rounded-full border border-[#C9A66B]/30 bg-[#063F35]/30 p-0.5 text-[11px]">
            {(['de', 'en', 'pl'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`rounded-full px-2 py-0.5 font-medium uppercase ${
                  currentLang === lang
                    ? 'bg-[#0B5A4D] text-[#F5F1E8]'
                    : 'text-[#B9C4BD]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#F5F1E8] hover:bg-[#063F35]/40"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#C9A66B]/20 bg-[#080B09]/95 px-6 pt-4 pb-6 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="font-sans text-sm font-medium tracking-wider text-[#F5F1E8] hover:text-[#C9A66B]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadCvClick();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#C9A66B] bg-[#0B5A4D] py-2.5 font-sans text-xs font-semibold tracking-wider text-[#F5F1E8]"
              >
                <Download className="h-4 w-4 text-[#C9A66B]" />
                <span>{t.downloadCv}</span>
              </button>
            </div>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onManageMediaClick();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#C9A66B]/40 bg-[#063F35]/30 py-2 font-sans text-xs text-[#C9A66B]"
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>{t.manageAssets}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
