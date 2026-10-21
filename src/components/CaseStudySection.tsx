import React from 'react';
import {
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { Language, ProjectData } from '../types';

interface CaseStudySectionProps {
  project: ProjectData;
  currentLang: Language;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ project, currentLang }) => {
  const cs = project.caseStudy;

  const getLangText = (obj: any): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[currentLang] || obj.de || obj.en || '';
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* 1. CHALLENGE & CONTEXT */}
      <section className="relative rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C7A35A]/15 text-[#C7A35A] font-serif text-xs font-bold">
            01
          </span>
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#C7A35A] uppercase">
            {currentLang === 'de' ? 'HERAUSFORDERUNG & KONTEXT' : currentLang === 'pl' ? 'WYZWANIE I KONTEKST' : 'THE CHALLENGE & CONTEXT'}
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F1EA]">
          {project.subtitle}
        </h2>
        <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[#A9AEA9]">
          {getLangText(project.description)}
        </p>
      </section>

      {/* 2. PROBLEM */}
      <section className="relative border-l-2 border-[#C7A35A] pl-5 sm:pl-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C7A35A]/15 text-[#C7A35A] font-serif text-xs font-bold">
            02
          </span>
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#C7A35A] uppercase">
            {currentLang === 'de' ? 'PROBLEMSTELLUNG' : currentLang === 'pl' ? 'PROBLEM' : 'THE PROBLEM'}
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F4F1EA] mb-4">
          {currentLang === 'de' ? 'Kernproblem & Ausgangslage' : currentLang === 'pl' ? 'Kluczowy problem' : 'Core Problem Statement'}
        </h3>
        <p className="font-sans text-sm sm:text-base leading-relaxed text-[#F4F1EA]">
          {getLangText(cs.problem)}
        </p>
      </section>

      {/* 3. USER / BUSINESS NEED */}
      {cs.userNeeds && (
        <section className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#148B78]/20 text-[#148B78] font-serif text-xs font-bold">
              03
            </span>
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#148B78] uppercase">
              {currentLang === 'de' ? 'NUTZER- & BUSINESS-BEDÜRFNISSE' : currentLang === 'pl' ? 'POTRZEBY UŻYTKOWNIKÓW I BIZNESU' : 'USER & BUSINESS NEEDS'}
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#F4F1EA] mb-3">
            {currentLang === 'de' ? 'Was Nutzer und Unternehmen wirklich benötigen' : currentLang === 'pl' ? 'Czego naprawdę potrzebują użytkownicy' : 'What Users & Businesses Really Need'}
          </h3>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#F4F1EA]">
            {getLangText(cs.userNeeds)}
          </p>
        </section>
      )}

      {/* 4. PRODUCT APPROACH & HYPOTHESES */}
      {cs.hypothesesAndDecisions && (
        <section className="rounded-2xl border border-[#C7A35A]/30 bg-[#101412] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C7A35A]/15 text-[#C7A35A] font-serif text-xs font-bold">
              04
            </span>
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#C7A35A] uppercase">
              {currentLang === 'de' ? 'PRODUKTANSATZ & HYPOTHESEN' : currentLang === 'pl' ? 'PODEJŚCIE PRODUKTOWE I HIPOTEZY' : 'PRODUCT APPROACH & HYPOTHESES'}
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#F4F1EA] mb-3">
            {currentLang === 'de' ? 'Hypothesengeleitete Produktentscheidungen' : currentLang === 'pl' ? 'Decyzje produktowe oparte na hipotezach' : 'Hypothesis-Driven Product Decisions'}
          </h3>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#F4F1EA]">
            {getLangText(cs.hypothesesAndDecisions)}
          </p>
        </section>
      )}

      {/* 5. SOLUTION */}
      <section className="relative rounded-2xl border border-[#0F5C46]/50 bg-[#101412] p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#148B78]/20 text-[#148B78] font-serif text-xs font-bold">
            05
          </span>
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#148B78] uppercase">
            {currentLang === 'de' ? 'DIE LÖSUNG' : currentLang === 'pl' ? 'ROZWIĄZANIE' : 'THE SOLUTION'}
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F4F1EA] mb-4">
          {currentLang === 'de' ? 'Lösungskonzept & Wertversprechen' : currentLang === 'pl' ? 'Koncepcja rozwiązania' : 'Solution Concept & Value Proposition'}
        </h3>
        <p className="font-sans text-sm sm:text-base leading-relaxed text-[#F4F1EA]">
          {getLangText(cs.solution)}
        </p>
      </section>

      {/* 6. PRODUCT FEATURES */}
      {cs.coreFeatures && cs.coreFeatures.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C7A35A]/15 text-[#C7A35A] font-serif text-xs font-bold">
              06
            </span>
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#C7A35A] uppercase">
              {currentLang === 'de' ? 'PRODUKTFEATURES & ARCHITEKTUR' : currentLang === 'pl' ? 'FUNKCJONALNOŚCI PRODUKTU' : 'PRODUCT FEATURES & ARCHITECTURE'}
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F4F1EA] mb-4">
            {currentLang === 'de' ? 'Zentrale Funktionsmodule' : currentLang === 'pl' ? 'Główne moduły funkcjonalne' : 'Core Functional Capabilities'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cs.coreFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#0F5C46]/30 bg-[#101412] p-5 transition-all duration-300 hover:border-[#C7A35A]"
              >
                <span className="font-sans text-xs font-bold tracking-wider text-[#C7A35A] uppercase">
                  {feat.title}
                </span>
                <p className="mt-2.5 font-sans text-xs sm:text-sm leading-relaxed text-[#A9AEA9]">
                  {getLangText(feat.desc)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. PROCESS & METHODS */}
      {(cs.research || cs.jtbd || cs.painPoints || cs.howMightWe || cs.customerJourney) && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C7A35A]/15 text-[#C7A35A] font-serif text-xs font-bold">
              07
            </span>
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#C7A35A] uppercase">
              {currentLang === 'de' ? 'PROZESS & METHODEN' : currentLang === 'pl' ? 'PROCES I METODY' : 'PROCESS & METHODS'}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
            {currentLang === 'de' ? 'Discovery & Product Design Framework' : currentLang === 'pl' ? 'Odkrywanie i projektowanie produktu' : 'Discovery & Design Framework'}
          </h3>

          {/* Research Insight */}
          {cs.research && (
            <div className="rounded-xl border border-[#0F5C46]/30 bg-[#101412] p-5 sm:p-6">
              <h4 className="font-serif text-lg font-semibold text-[#C7A35A] mb-2">
                User Research & Discovery
              </h4>
              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#A9AEA9]">
                {getLangText(cs.research)}
              </p>
            </div>
          )}

          {/* Jobs To Be Done (JTBD) */}
          {cs.jtbd && (
            <div className="rounded-xl border border-[#0F5C46]/40 bg-[#101412] p-5 sm:p-6">
              <span className="font-sans text-xs font-bold tracking-widest text-[#C7A35A] uppercase">
                Job To Be Done (JTBD)
              </span>
              <p className="mt-3 font-serif text-base sm:text-lg italic text-[#F4F1EA]">
                {getLangText(cs.jtbd)}
              </p>
            </div>
          )}

          {/* Pain Points */}
          {cs.painPoints && cs.painPoints.length > 0 && (
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#F4F1EA] mb-3">
                {currentLang === 'de' ? 'Identifizierte Nutzer-Pain-Points' : currentLang === 'pl' ? 'Punkty bólu użytkowników' : 'User Pain Points'}
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {cs.painPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-[#0F5C46]/30 bg-[#101412] p-4 text-xs sm:text-sm"
                  >
                    <span className="font-bold text-[#C7A35A] block mb-1">0{idx + 1}.</span>
                    <span className="text-[#A9AEA9]">{getLangText(pt)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How Might We */}
          {cs.howMightWe && (
            <div className="rounded-xl border border-[#C7A35A]/30 bg-[#101412] p-5 sm:p-6">
              <span className="font-sans text-xs font-bold tracking-wider text-[#C7A35A] uppercase">
                How Might We Fragestellung:
              </span>
              <p className="mt-2 font-serif text-lg sm:text-xl font-medium text-[#F4F1EA]">
                {getLangText(cs.howMightWe)}
              </p>
            </div>
          )}

          {/* Customer Journey */}
          {cs.customerJourney && cs.customerJourney.length > 0 && (
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#F4F1EA] mb-3">
                Customer Experience Journey
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {cs.customerJourney.map((cj, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-[#0F5C46]/30 bg-[#101412] p-4"
                  >
                    <span className="font-sans text-xs font-bold tracking-wider text-[#C7A35A] uppercase">
                      {cj.step}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-[#A9AEA9]">
                      {getLangText(cj.desc)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 8. PROTOTYPE & VALIDATION */}
      {(cs.prototype || cs.usabilityTesting || cs.mvp) && (
        <section className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#148B78]/20 text-[#148B78] font-serif text-xs font-bold">
              08
            </span>
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#148B78] uppercase">
              {currentLang === 'de' ? 'PROTOTYP & VALIDIERUNG' : currentLang === 'pl' ? 'PROTOTYP I WALIDACJA' : 'PROTOTYPE & VALIDATION'}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
            {currentLang === 'de' ? 'Erlebbare Umsetzung & Test' : currentLang === 'pl' ? 'Wdrożenie i testy' : 'Interactive Implementation & Testing'}
          </h3>

          {cs.prototype && (
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#F4F1EA]">
              {getLangText(cs.prototype)}
            </p>
          )}

          {cs.usabilityTesting && (
            <div className="rounded-xl border border-[#0F5C46]/30 bg-[#080A09] p-4">
              <span className="font-sans text-xs font-bold text-[#C7A35A] uppercase block mb-1">
                Usability Testing:
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#A9AEA9]">
                {getLangText(cs.usabilityTesting)}
              </p>
            </div>
          )}

          {cs.mvp && (
            <div className="rounded-xl border border-[#0F5C46]/30 bg-[#080A09] p-4">
              <span className="font-sans text-xs font-bold text-[#C7A35A] uppercase block mb-1">
                MVP Scope:
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#A9AEA9]">
                {getLangText(cs.mvp)}
              </p>
            </div>
          )}
        </section>
      )}

      {/* 9. LEARNINGS & OUTCOME */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C7A35A]/15 text-[#C7A35A] font-serif text-xs font-bold">
            09
          </span>
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#C7A35A] uppercase">
            {currentLang === 'de' ? 'LEARNINGS & ERGEBNIS' : currentLang === 'pl' ? 'WNIOSKI I REZULTATY' : 'LEARNINGS & OUTCOME'}
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
          {currentLang === 'de' ? 'Product Takeaways & Kennzahlen' : currentLang === 'pl' ? 'Kluczowe wnioski i metryki' : 'Product Takeaways & Metrics'}
        </h3>

        {/* Learnings Card */}
        <div className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-6 sm:p-8">
          <h4 className="flex items-center gap-2 font-serif text-lg sm:text-xl font-semibold text-[#C7A35A] mb-3">
            <CheckCircle2 className="h-5 w-5 text-[#148B78] shrink-0" />
            <span>Key Learnings</span>
          </h4>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#F4F1EA]">
            {getLangText(cs.learnings)}
          </p>
        </div>

        {/* Success Metrics */}
        {cs.successMetrics && (
          <div className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-6 sm:p-8">
            <h4 className="flex items-center gap-2 font-serif text-lg font-semibold text-[#148B78] mb-3">
              <TrendingUp className="h-5 w-5 text-[#148B78] shrink-0" />
              <span>{currentLang === 'de' ? 'Zielmetriken & Validierung' : currentLang === 'pl' ? 'Wskaźniki sukcesu' : 'Target Metrics & Validation'}</span>
            </h4>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#F4F1EA]">
              {getLangText(cs.successMetrics)}
            </p>
          </div>
        )}

        {/* Transparency Note */}
        {cs.transparencyNote && (
          <div className="rounded-xl border border-[#C7A35A]/20 bg-[#101412] p-5 text-xs text-[#A9AEA9]">
            <div className="font-semibold text-[#C7A35A] uppercase tracking-wider mb-1.5 text-[11px]">
              {currentLang === 'de' ? 'Transparenzhinweis zum Projektstatus' : currentLang === 'pl' ? 'Informacja o statusie projektu' : 'Project Status & Transparency Note'}
            </div>
            <p className="leading-relaxed">
              {getLangText(cs.transparencyNote)}
            </p>
          </div>
        )}
      </section>

    </div>
  );
};
