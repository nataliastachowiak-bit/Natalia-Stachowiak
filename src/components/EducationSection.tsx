import React from 'react';
import { GraduationCap, Award, Clock, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface EducationSectionProps {
  currentLang: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].education;

  return (
    <section className="relative w-full border-b border-[#C9A66B]/15 bg-[#080B09] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B]" />
            <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
              ACADEMIC BACKGROUND
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F5F1E8]">
            {t.headline}
          </h2>
        </div>

        {/* 3 Education Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.items.map((item: any, idx: number) => {
            const isInProgress = item.status === 'IN_PROGRESS';
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-xl border border-[#C9A66B]/25 bg-gradient-to-b from-[#063F35]/20 via-[#080B09] to-[#080B09] p-6 transition-all duration-300 hover:border-[#C9A66B]"
              >
                <div>
                  {/* Status Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0B5A4D] bg-[#063F35]/40 text-[#C9A66B]">
                      <GraduationCap className="h-5 w-5" />
                    </div>

                    {isInProgress ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A66B] bg-[#C9A66B]/15 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#C9A66B] uppercase">
                        <Clock className="h-3 w-3" />
                        IN PROGRESS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0B5A4D] bg-[#063F35]/30 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-[#148B78] uppercase">
                        <CheckCircle2 className="h-3 w-3" />
                        COMPLETED
                      </span>
                    )}
                  </div>

                  {/* Degree Title */}
                  <h3 className="font-serif text-lg font-semibold text-[#F5F1E8] transition-colors group-hover:text-[#C9A66B]">
                    {item.degree}
                  </h3>

                  {/* Institution */}
                  <p className="mt-1 font-sans text-xs font-medium text-[#148B78]">
                    {item.institution}
                  </p>

                  {/* Description */}
                  <p className="mt-3 font-sans text-xs leading-relaxed text-[#B9C4BD]">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#C9A66B]/15 pt-3 text-[11px] text-[#B9C4BD]/70">
                  <span>Status: {item.period}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
