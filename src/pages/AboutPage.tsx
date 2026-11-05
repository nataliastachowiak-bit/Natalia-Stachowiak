import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { LOCKED_ASSETS, ABOUT_IMAGE } from '../data/assetRegistry';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { resolveAssetUrl } from '../utils/assetPath';
import { PersonalStoryDialog } from '../components/PersonalStoryDialog';

const personalNightImage = resolveAssetUrl('/assets/personal-evening.avif');

interface AboutPageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onUploadMedia?: (key: string) => void;
  isReadOnly?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  currentLang,
  mediaAssets,
  isReadOnly = false,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [personalStoryOpen, setPersonalStoryOpen] = useState(false);
  const aboutImageSrc = mediaAssets.aboutPortrait || mediaAssets.aboutPhoto || mediaAssets.aboutImage || ABOUT_IMAGE;

  return (
    <PageTransition>
      <div className="relative w-full flex-grow flex flex-col justify-center min-h-[calc(100vh-90px)] px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto py-6 sm:py-10">
        {/* Subtle Ambient Background Accent */}
        <div className="pointer-events-none absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-[#0F5C46]/12 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-[#C7A35A]/10 blur-[130px]" />

        {/* Back to Portfolio */}
        <div className="relative z-10 mb-4 sm:mb-6">
          <BackToPortfolio currentLang={currentLang} />
        </div>

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT SIDE: Exact Photograph (Untouched, Clean Editorial Frame) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] xl:max-w-[440px] w-full">
              <div
                className="relative aspect-[1008/947] w-full overflow-hidden rounded-2xl border border-[#C7A35A]/30 bg-[#101412] shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                style={{ aspectRatio: '1008 / 947' }}
              >
                <img
                  src={aboutImageSrc}
                  alt="Natalia Stachowiak"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = ABOUT_IMAGE;
                  }}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A09]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-center">
                  <p className="font-['Caveat',cursive] text-lg sm:text-xl text-[#C7A35A]">
                    „Different experiences. One direction.“
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Clean Editorial Persona & Biography */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 lg:space-y-6">
            
            {/* Small Label */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
                <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
                  {currentLang === 'de' ? 'ÜBER MICH' : currentLang === 'pl' ? 'O MNIE' : 'ABOUT ME'}
                </span>
              </div>

              {/* Large Editorial Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#F4F1EA] leading-[1.15]">
                Different experiences. <br />
                <span className="italic text-[#C7A35A]">One direction.</span>
              </h1>
            </div>

            {/* Short Professional Biography */}
            <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-[#F4F1EA]/90 font-sans">
              <p>
                {currentLang === 'de' ? (
                  <>
                    Mein Profil verbindet wissenschaftliche Analyse (M.Sc. Chemie), unternehmerische
                    Verantwortung in der Produktion und Projektpraxis mit Produktmanagement und Innovation.
                    Ich interessiere mich für physische und technische Produkte ebenso wie für digitale Lösungen und KI.
                  </>
                ) : currentLang === 'pl' ? (
                  <>
                    Łączę analizę naukową (mgr chemii), doświadczenie w prowadzeniu firmy produkcyjnej
                    i pracy projektowej z zarządzaniem produktami i innowacjami.
                    Interesują mnie produkty techniczne, fizyczne, cyfrowe i AI.
                  </>
                ) : (
                  <>
                    My background combines scientific analysis (M.Sc. Chemistry),
                    entrepreneurial responsibility in manufacturing and project work with product management.
                    I am interested in technical and physical products as well as digital solutions and AI.
                  </>
                )}
              </p>

              <p>
                {currentLang === 'de' ? (
                  <>
                    Ich strukturiere komplexe Herausforderungen, untersuche Kunden- und Nutzerbedürfnisse
                    und berücksichtige technische Machbarkeit und wirtschaftlichen Nutzen.
                    Diese Perspektiven verbinde ich mit Product Discovery und testbaren Produktkonzepten.
                  </>
                ) : currentLang === 'pl' ? (
                  <>
                    Analizuję złożone problemy, badam potrzeby klientów i użytkowników
                    oraz biorę pod uwagę wykonalność techniczną i wartość biznesową.
                    Łączę te perspektywy z Product Discovery i prototypami do testowania.
                  </>
                ) : (
                  <>
                    I structure complex challenges, explore customer and user needs, and consider
                    technical feasibility and commercial value. I bring these perspectives
                    to product discovery and testable product concepts.
                  </>
                )}
              </p>

              <p className="text-[#A9AEA9]">
                {currentLang === 'de' ? (
                  <>
                    Mich interessiert nicht nur, was Technologie möglich macht,
                    sondern vor allem, welchen messbaren Mehrwert sie für Menschen und
                    Unternehmen schafft.
                  </>
                ) : currentLang === 'pl' ? (
                  <>
                    Interesuje mnie nie tylko to, co umożliwia technologia,
                    lecz przede wszystkim wymierna wartość, jaką wnosi dla ludzi i przedsiębiorstw.
                  </>
                ) : (
                  <>
                    I am not just driven by what technology makes possible,
                    but above all by the measurable value and genuine progress it delivers for people and businesses.
                  </>
                )}
              </p>
            </div>

            {/* Clean Accordion for Additional Personal Biography */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#C7A35A] hover:text-[#F4F1EA] transition-colors focus:outline-none"
              >
                <span>
                  {showMore
                    ? (currentLang === 'de' ? 'Weniger anzeigen ↑' : currentLang === 'pl' ? 'Zwiń ↑' : 'Show less ↑')
                    : (currentLang === 'de' ? 'Mehr über mich lesen ↓' : currentLang === 'pl' ? 'Więcej o mnie czytaj ↓' : 'Read more about me ↓')}
                </span>
                {showMore ? (
                  <ChevronUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                )}
              </button>

              {showMore && (
                <div className="mt-3.5 p-4 sm:p-5 rounded-xl border border-[#C7A35A]/20 bg-[#101412] text-xs sm:text-sm text-[#A9AEA9] leading-relaxed animate-fadeIn space-y-2.5">
                  <p>
                    {currentLang === 'de' ? (
                      'Als Produktpersönlichkeit schaue ich stets über den Tellerrand einzelner Disziplinen. Ich habe gelernt, komplexe Sachverhalte schnell zu strukturieren, Hypothesen faktenbasiert zu überprüfen und Teams mit Klarheit und Empathie auf ein gemeinsames Ziel auszurichten.'
                    ) : currentLang === 'pl' ? (
                      'Jako osoba produktowa patrzę szeroko poza ramy pojedynczej dyscypliny. Nauczyłam się szybko strukturyzować złożone zagadnienia, weryfikować hipotezy w oparciu o fakty oraz prowadzić zespoły z jasnością i empatią ku wspólnemu celowi.'
                    ) : (
                      'As a product thinker, I naturally look beyond the silos of single disciplines. I have learned to quickly structure complex domains, validate hypotheses with evidence, and align cross-functional teams around shared value with clarity and empathy.'
                    )}
                  </p>
                  <p>
                    {currentLang === 'de' ? (
                      'Gutes Produktmanagement bedeutet für mich: Nutzerbedürfnisse präzise erfassen, wirtschaftliche Machbarkeit wahren und moderne Technologien – von KI bis agile Software-Workflows – zielgerichtet einsetzen, um spürbare Erleichterung im Alltag zu schaffen.'
                    ) : currentLang === 'pl' ? (
                      'Dobre zarządzanie produktem oznacza dla mnie: precyzyjne zrozumienie potrzeb użytkownika, dbałość o realia biznesowe i celowe wykorzystanie nowoczesnych technologii (od AI po workflow zwinny), aby tworzyć realne ułatwienia w codziennym życiu.'
                    ) : (
                      'To me, great product management means deeply understanding user friction, safeguarding commercial viability, and applying modern technologies like AI with purpose to create genuine positive outcomes.'
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* EXACTLY TWO CTAs AT BOTTOM */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <Link
                to="/projects"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0F5C46] px-6 py-2.5 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] transition-all hover:bg-[#148B78] uppercase"
              >
                <span>{currentLang === 'de' ? 'MEINE PROJEKTE' : currentLang === 'pl' ? 'MOJE PROJEKTY' : 'MY PROJECTS'}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#C7A35A]" />
              </Link>

              <Link
                to="/journey"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#C7A35A]/50 bg-transparent px-6 py-2.5 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] hover:border-[#C7A35A] hover:bg-[#101412] uppercase transition-all"
              >
                <span>MY JOURNEY</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#C7A35A]" />
              </Link>
            </div>

          </div>
        </div>

        {/* Compact teaser: full personal story opens in a modal card, not a long waterfall. */}
        <div className="relative z-10 mt-8 sm:mt-12 pb-5">
          <button
            type="button"
            onClick={() => setPersonalStoryOpen(true)}
            aria-haspopup="dialog"
            className="group w-full overflow-hidden rounded-2xl border border-[#C7A35A]/30 bg-[#101412] text-left shadow-[0_16px_45px_rgba(0,0,0,0.4)] transition-all hover:border-[#C7A35A]/75 hover:shadow-[0_16px_55px_rgba(15,92,70,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A35A]"
          >
            <div className="flex min-h-[155px] flex-col sm:flex-row sm:items-center">
              <img
                src={personalNightImage}
                alt={currentLang === 'de' ? 'Persönlicher Abend mit der Familie und französischer Bulldogge über den Lichtern der Stadt' : currentLang === 'pl' ? 'Rodzinny wieczór z buldogiem francuskim z widokiem na światła miasta' : 'A family evening with a French bulldog overlooking city lights'}
                loading="lazy"
                decoding="async"
                className="h-36 w-full object-cover sm:h-[155px] sm:w-52 sm:shrink-0"
              />
              <div className="flex-1 px-5 py-5 sm:px-8">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A35A]">
                  {currentLang === 'de' ? 'PERSÖNLICH' : currentLang === 'pl' ? 'OSOBIŚCIE' : 'PERSONAL'}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
                  {currentLang === 'de' ? 'Der Mensch hinter den Projekten' : currentLang === 'pl' ? 'Człowiek stojący za projektami' : 'The person behind the projects'}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#A9AEA9]">
                  {currentLang === 'de'
                    ? 'Einblicke in mein Leben, meine Lieblingsorte und das, was mir wichtig ist.'
                    : currentLang === 'pl'
                      ? 'Kilka osobistych historii o życiu, ulubionych miejscach i tym, co ważne.'
                      : 'A personal glimpse into my life, favourite places and what matters most.'}
                </p>
              </div>
              <span className="mx-5 mb-5 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#C7A35A]/45 px-5 py-2 text-xs font-semibold tracking-wide text-[#C7A35A] transition-colors group-hover:bg-[#0F5C46] group-hover:text-white sm:mx-7 sm:mb-0">
                {currentLang === 'de' ? 'Karte öffnen' : currentLang === 'pl' ? 'Otwórz kartę' : 'Open card'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </button>
        </div>
        <PersonalStoryDialog currentLang={currentLang} open={personalStoryOpen} onClose={() => setPersonalStoryOpen(false)} />
      </div>
    </PageTransition>
  );
};
