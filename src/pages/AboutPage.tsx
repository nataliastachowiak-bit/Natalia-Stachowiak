import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { LOCKED_ASSETS, ABOUT_IMAGE } from '../data/assetRegistry';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { resolveAssetUrl } from '../utils/assetPath';

const personalNightImage = resolveAssetUrl('/assets/personal-evening.avif');
const personalSeaImage = resolveAssetUrl('/assets/personal-seaside.avif');

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
                    Erfahrung und Projektpraxis mit digitalem Produktmanagement, KI und Innovation.
                    Ich arbeite branchenübergreifend an komplexen Produkt- und Nutzerproblemen.
                  </>
                ) : currentLang === 'pl' ? (
                  <>
                    Łączę analizę naukową (mgr chemii), doświadczenie w przedsiębiorczości
                    i pracy projektowej z cyfrowym zarządzaniem produktami, AI oraz innowacjami.
                    Interesują mnie wyzwania produktowe w różnych branżach.
                  </>
                ) : (
                  <>
                    My interdisciplinary background combines scientific analysis (M.Sc. Chemistry),
                    entrepreneurship and project experience with digital product management,
                    AI and innovation. I approach complex product challenges across industries.
                  </>
                )}
              </p>

              <p>
                {currentLang === 'de' ? (
                  <>
                    Ich strukturiere komplexe Herausforderungen, untersuche Nutzerbedürfnisse und
                    übersetze Erkenntnisse in nachvollziehbare Produktentscheidungen.
                    Mein Fokus liegt auf Product Discovery, datengestützten Konzepten und testbaren Prototypen.
                  </>
                ) : currentLang === 'pl' ? (
                  <>
                    Analizuję złożone wyzwania, badam potrzeby użytkowników i przekładam
                    wnioski na decyzje produktowe – od odkrywania problemów po prototypy,
                    które można testować i doskonalić.
                  </>
                ) : (
                  <>
                    I structure complex challenges, explore user needs and translate evidence into
                    transparent product decisions – from product discovery to data-informed
                    concepts and testable prototypes.
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

        {/* PERSONAL STORY: deliberately separate from the professional biography above */}
        <section aria-labelledby="personal-story-title" className="relative z-10 mt-20 sm:mt-28 border-t border-[#C7A35A]/25 pt-12 sm:pt-16 pb-10">
          <div className="mb-8 sm:mb-12 max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#C7A35A] uppercase mb-3">
              {currentLang === 'de' ? 'PERSÖNLICH' : currentLang === 'pl' ? 'OSOBIŚCIE' : 'PERSONAL'}
            </p>
            <h2 id="personal-story-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4F1EA] leading-tight">
              {currentLang === 'de' ? 'Der Mensch hinter den Projekten' : currentLang === 'pl' ? 'Człowiek stojący za projektami' : 'The person behind the projects'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-sm sm:text-base text-[#F4F1EA]/85 leading-[1.85] font-sans">
              <p className="font-serif italic text-xl sm:text-2xl leading-snug text-[#C7A35A]">
                {currentLang === 'de'
                  ? '„Ich war nie jemand, der darauf wartet, dass sich das Leben verändert. Ich verändere es selbst.“'
                  : currentLang === 'pl'
                    ? '„Nigdy nie czekałam, aż życie samo się zmieni. Sama je zmieniam.”'
                    : '“I have never been one to wait for life to change. I change it myself.”'}
              </p>
              {(
                currentLang === 'de' ? [
                  'Vor sieben Jahren habe ich meine Heimat Polen verlassen und bin nach Deutschland gekommen. Ein neues Land, eine neue Sprache, eine andere Kultur und neue Perspektiven. Ich habe mir hier ein neues Leben aufgebaut – mit Neugier, Entschlossenheit und dem Vertrauen in meine eigenen Entscheidungen.',
                  'Ich bin Mama, Autorin, leidenschaftliche Reisende und ein Mensch, der seinen eigenen Weg geht. Zu meinem Leben gehört auch meine französische Bulldogge, die mit ihrem unverwechselbaren Charakter immer wieder für ein Lächeln sorgt.',
                  'Reisen bedeutet für mich Freiheit und Inspiration. Mit dem Auto habe ich fast ganz Europa erkundet. Auch Dubai, die Dominikanische Republik und Sansibar gehören zu meinen Reiseerinnerungen. Doch mein Herz gehört einem Ort, an den ich immer wieder zurückkehre: Chalkidiki in Griechenland. Das kristallklare Wasser, das in der Sonne golden glitzert, die kleinen Buchten und die besondere Leichtigkeit machen diesen Ort für mich zu einem zweiten Zuhause.',
                  'Mich fasziniert die Psychologie – warum Menschen denken, fühlen und handeln, wie sie es tun. Diese Neugier hat auch meine kreative Seite geprägt. In meinem Buch „Du bist nicht zu viel“ beschäftige ich mich mit Beziehungen, Selbstwert und der Frage, wie wir uns selbst treu bleiben.',
                  'Eine weitere Leidenschaft ist die Fotografie. Ich liebe es, besondere Augenblicke, Stimmungen und kleine Details festzuhalten, die im Alltag oft unbemerkt bleiben. Für mich ist ein Foto nicht nur ein Bild, sondern eine Erinnerung und manchmal eine ganze Geschichte.',
                ] : currentLang === 'pl' ? [
                  'Siedem lat temu opuściłam Polskę i przeprowadziłam się do Niemiec. Nowy kraj, nowy język, inna kultura i nowe perspektywy. Zbudowałam tu nowe życie – z ciekawością, determinacją i zaufaniem do własnych decyzji.',
                  'Jestem mamą, autorką książki, miłośniczką podróży i osobą, która idzie własną drogą. Towarzyszy mi też buldog francuski, którego wyjątkowy charakter nieustannie wywołuje uśmiech.',
                  'Podróże dają mi wolność i inspirację. Samochodem przemierzyłam niemal całą Europę; odwiedziłam również Dubaj, Dominikanę i Zanzibar. Jednak moje serce należy do miejsca, do którego zawsze wracam: Chalkidiki w Grecji. Krystaliczna woda połyskująca złotem w słońcu, małe zatoki i niepowtarzalna lekkość sprawiają, że czuję się tam jak w drugim domu.',
                  'Fascynuje mnie psychologia – to, dlaczego ludzie myślą, czują i działają w określony sposób. Ta ciekawość towarzyszyła mi także podczas pisania książki „Du bist nicht zu viel” o relacjach, poczuciu własnej wartości i pozostawaniu wierną sobie.',
                  'Kolejną moją pasją jest fotografia. Lubię zatrzymywać w kadrach chwile, nastroje i drobne szczegóły, które łatwo przeoczyć. Zdjęcie jest dla mnie nie tylko obrazem, lecz także wspomnieniem – czasem całą opowieścią.',
                ] : [
                  'Seven years ago, I left my home in Poland and moved to Germany. A new country, a new language, a different culture and fresh perspectives. I built a new life here with curiosity, determination and trust in my own decisions.',
                  'I am a mother, an author, a passionate traveller and someone who follows her own path. My French bulldog is part of that life too, with a personality that never fails to make me smile.',
                  'Travel means freedom and inspiration to me. I have explored almost all of Europe by car, and my journeys have also taken me to Dubai, the Dominican Republic and Zanzibar. Yet my heart belongs to a place I return to again and again: Chalkidiki in Greece. Crystal-clear water sparkling gold in the sun, secluded coves and a sense of lightness make it feel like a second home.',
                  'Psychology fascinates me – why people think, feel and act as they do. That curiosity has shaped my creative side as well. In my book “Du bist nicht zu viel”, I explore relationships, self-worth and staying true to yourself.',
                  'Photography is another passion of mine. I love capturing fleeting moments, moods and little details that often go unnoticed. To me, a photograph is more than an image: it is a memory, and sometimes an entire story.',
                ]
              ).map((paragraph, index) => <p key={index} className="text-pretty">{paragraph}</p>)}
              <p className="font-serif text-lg sm:text-xl italic leading-snug text-[#C7A35A] pt-1">
                {currentLang === 'de'
                  ? 'Ich glaube, dass ein erfülltes Leben aus Mut, Neugier, echten Begegnungen und Momenten besteht, die in Erinnerung bleiben.'
                  : currentLang === 'pl'
                    ? 'Wierzę, że spełnione życie tworzą odwaga, ciekawość, autentyczne spotkania i chwile, które pozostają w pamięci.'
                    : 'I believe a fulfilling life is made of courage, curiosity, genuine connections and moments worth remembering.'}
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-5">
              <figure className="overflow-hidden rounded-2xl border border-[#C7A35A]/25 bg-[#101412] shadow-[0_12px_35px_rgba(0,0,0,0.32)]">
                <img src={personalNightImage} alt={currentLang === 'de' ? 'Persönlicher Moment mit Sohn und französischer Bulldogge beim Blick über die Stadt bei Nacht' : currentLang === 'pl' ? 'Rodzinny wieczór z synem i buldogiem francuskim z widokiem na miasto' : 'A family evening overlooking the city with my son and French bulldog'} loading="lazy" decoding="async" width="640" height="473" className="w-full h-full aspect-[4/3] object-cover" />
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-[#C7A35A]/25 bg-[#101412] shadow-[0_12px_35px_rgba(0,0,0,0.32)]">
                <img src={personalSeaImage} alt={currentLang === 'de' ? 'Persönliche Reiseerinnerung am Meer' : currentLang === 'pl' ? 'Osobista pamiątka z podróży nad morze' : 'A personal travel memory by the sea'} loading="lazy" decoding="async" width="640" height="480" className="w-full h-full aspect-[4/3] object-cover" />
              </figure>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
