import React from 'react';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  return (
    <footer className="w-full border-t border-[#C9A66B]/15 bg-[#080B09] py-10 text-[#B9C4BD]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div>
          <span className="font-serif text-base font-medium tracking-[0.2em] text-[#F5F1E8]">
            NATALIA STACHOWIAK
          </span>
          <p className="mt-1 text-xs text-[#148B78]">
            Aspiring Product Manager · Digital Transformation Manager
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <a href="#home" className="hover:text-[#C9A66B] transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-[#C9A66B] transition-colors">
            Über mich
          </a>
          <a href="#projects" className="hover:text-[#C9A66B] transition-colors">
            Projekte
          </a>
          <a href="#product-thinking" className="hover:text-[#C9A66B] transition-colors">
            Product Thinking
          </a>
          <a href="#skills" className="hover:text-[#C9A66B] transition-colors">
            Skills
          </a>
          <a href="#certificates" className="hover:text-[#C9A66B] transition-colors">
            Zertifikate
          </a>
          <a href="#contact" className="hover:text-[#C9A66B] transition-colors">
            Kontakt
          </a>
        </div>

        <div className="text-xs text-[#B9C4BD]/60">
          © {new Date().getFullYear()} Natalia Stachowiak. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
