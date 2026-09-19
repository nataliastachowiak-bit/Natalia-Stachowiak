import React from 'react';
import { Search, Lightbulb, Hammer, CheckSquare, TrendingUp, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ProductThinkingSectionProps {
  currentLang: Language;
}

export const ProductThinkingSection: React.FC<ProductThinkingSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].productThinking;

  const getStepIcon = (num: string) => {
    switch (num) {
      case '01':
        return <Search className="h-5 w-5 text-[#148B78]" />;
      case '02':
        return <Lightbulb className="h-5 w-5 text-[#C9A66B]" />;
      case '03':
        return <Hammer className="h-5 w-5 text-[#148B78]" />;
      case '04':
        return <CheckSquare className="h-5 w-5 text-[#C9A66B]" />;
      case '05':
        return <TrendingUp className="h-5 w-5 text-[#148B78]" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#C9A66B]" />;
    }
  };

  return (
    <section
      id="product-thinking"
      className="relative w-full border-b border-[#C9A66B]/15 bg-[#080B09] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B]" />
            <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
              {t.label}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F5F1E8]">
            From problem <span className="italic text-[#F5F1E8]">to product.</span>
          </h2>

          <p className="mt-4 font-serif text-base sm:text-lg italic text-[#C9A66B] max-w-xl mx-auto">
            {t.quote}
          </p>
        </div>

        {/* 5-Stage Visual Process: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Connecting bar for desktop */}
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-[2px] bg-gradient-to-r from-[#0B5A4D] via-[#C9A66B] to-[#0B5A4D] z-0" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 relative z-10">
            {t.steps.map((step: any) => (
              <div
                key={step.number}
                className="group flex flex-col rounded-xl border border-[#C9A66B]/25 bg-gradient-to-b from-[#063F35]/25 via-[#080B09] to-[#080B09] p-5 transition-all duration-300 hover:border-[#C9A66B] hover:shadow-[0_10px_25px_rgba(11,90,77,0.3)]"
              >
                {/* Step Circle */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A66B]/50 bg-[#080B09] shadow-[0_0_15px_rgba(11,90,77,0.4)] transition-transform group-hover:scale-110">
                    {getStepIcon(step.number)}
                  </div>
                  <span className="font-serif text-sm font-bold tracking-widest text-[#C9A66B]">
                    {step.number}
                  </span>
                </div>

                {/* Step Name */}
                <h3 className="font-serif text-lg font-semibold tracking-wider text-[#F5F1E8] uppercase transition-colors group-hover:text-[#C9A66B]">
                  {step.name}
                </h3>

                {/* Step Description */}
                <p className="mt-2 font-sans text-xs leading-relaxed text-[#B9C4BD]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
