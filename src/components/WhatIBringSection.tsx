import React from 'react';
import {
  Compass,
  Users2,
  GitBranch,
  Bot,
  TrendingUp,
  Atom,
  CheckCircle,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface WhatIBringSectionProps {
  currentLang: Language;
}

export const WhatIBringSection: React.FC<WhatIBringSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].skills;

  const getCardIcon = (num: string) => {
    switch (num) {
      case '01':
        return <Compass className="h-5 w-5 text-[#C9A66B]" />;
      case '02':
        return <Users2 className="h-5 w-5 text-[#148B78]" />;
      case '03':
        return <GitBranch className="h-5 w-5 text-[#C9A66B]" />;
      case '04':
        return <Bot className="h-5 w-5 text-[#148B78]" />;
      case '05':
        return <TrendingUp className="h-5 w-5 text-[#C9A66B]" />;
      case '06':
        return <Atom className="h-5 w-5 text-[#148B78]" />;
      default:
        return <CheckCircle className="h-5 w-5 text-[#C9A66B]" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative w-full border-b border-[#C9A66B]/15 bg-[#080B09] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B]" />
            <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
              {t.mainSectionTitle}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F5F1E8]">
            Different experiences.
            <span className="block italic text-[#F5F1E8]">One product mindset.</span>
          </h2>
        </div>

        {/* 6 Elegant Skill Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.categories.map((cat: any) => (
            <div
              key={cat.number}
              className="group relative flex flex-col justify-between rounded-xl border border-[#C9A66B]/25 bg-gradient-to-b from-[#063F35]/20 via-[#080B09] to-[#080B09] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A66B] hover:shadow-[0_12px_30px_rgba(11,90,77,0.3)]"
            >
              <div>
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0B5A4D] bg-[#063F35]/40 transition-transform group-hover:scale-105">
                    {getCardIcon(cat.number)}
                  </div>
                  <span className="font-serif text-xs font-bold tracking-widest text-[#C9A66B]">
                    {cat.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-semibold tracking-wide text-[#F5F1E8] uppercase transition-colors group-hover:text-[#C9A66B]">
                  {cat.title}
                </h3>

                {/* Skill Items List */}
                <ul className="mt-4 space-y-2">
                  {cat.items.map((skill: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs text-[#B9C4BD] transition-colors group-hover:text-[#F5F1E8]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#148B78]" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-[#C9A66B]/15 pt-3">
                <span className="text-[10px] font-medium tracking-wider text-[#C9A66B]/80 uppercase">
                  Evidenzbasiert & Praxiserprobt
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
