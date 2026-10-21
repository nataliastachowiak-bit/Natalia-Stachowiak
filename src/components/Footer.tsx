import React from 'react';
import { Language } from '../types';
import { CV_FILE } from '../data/assetRegistry';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  return (
    <footer className="w-full border-t border-[#C7A35A]/15 bg-[#080A09] py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-[#A9AEA9] shrink-0">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-serif font-medium text-[#F4F1EA] tracking-wider">NATALIA STACHOWIAK</span>
          <span className="text-[#C7A35A]/50">·</span>
          <span className="text-[#0F5C46] font-medium">
            {currentLang === 'de' ? 'Angehende IT-Produktmanagerin' : currentLang === 'pl' ? 'IT & AI Product Manager' : 'Aspiring IT Product Manager'}
          </span>
          <span className="text-[#C7A35A]/50 hidden md:inline">·</span>
          <span className="hidden md:inline text-[10px] text-[#A9AEA9]">Turning problems into products</span>
        </div>

        <div className="flex items-center gap-4 text-[10px] text-[#A9AEA9]">
          <span className="hidden sm:inline">
            {currentLang === 'de' ? 'VINYL AI · Eigenständiges Konzept' : currentLang === 'pl' ? 'VINYL AI · Niezależna koncepcja' : 'VINYL AI · Standalone Concept'}
          </span>
          <a
            href="https://www.linkedin.com/in/natalia-stachowiak-0a8449306"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C7A35A] transition-colors font-medium text-[#C7A35A]/80 hover:text-[#C7A35A]"
          >
            LINKEDIN ↗
          </a>
          <a
            href={CV_FILE}
            target="_blank"
            rel="noopener noreferrer"
            download="Natalia_Stachowiak_CV_grafisch_FINAL_2026.pdf"
            className="hover:text-[#C7A35A] transition-colors"
          >
            CV HERUNTERLADEN ↓
          </a>
          <span>© {new Date().getFullYear()} {currentLang === 'de' ? 'Alle Rechte vorbehalten.' : currentLang === 'pl' ? 'Wszelkie prawa zastrzeżone.' : 'All rights reserved.'}</span>
        </div>
      </div>
    </footer>
  );
};
