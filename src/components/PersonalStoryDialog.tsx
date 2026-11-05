import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';
import { resolveAssetUrl } from '../utils/assetPath';

const camelImage = resolveAssetUrl('/assets/travel-camel.avif');
const umbrellasImage = resolveAssetUrl('/assets/travel-umbrellas.avif');
const beachImage = resolveAssetUrl('/assets/travel-beach.avif');

interface PersonalStoryDialogProps {
  currentLang: Language;
  open: boolean;
  onClose: () => void;
}

/**
 * Native modal dialog keeps the personal story out of the page flow.
 * showModal provides keyboard focus management, an inert background and Escape-to-close.
 */
export const PersonalStoryDialog: React.FC<PersonalStoryDialogProps> = ({ currentLang, open, onClose }) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      const priorOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = priorOverflow;
        if (dialog.open) dialog.close();
      };
    }

    if (dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="personal-story-title"
      onClose={onClose}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
      className="fixed left-1/2 top-1/2 m-0 w-[calc(100vw-1.5rem)] max-w-[1050px] max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl sm:rounded-3xl border border-[#C7A35A]/50 bg-[#080A09] p-0 text-[#F4F1EA] shadow-[0_24px_90px_rgba(0,0,0,0.9)] backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-20 flex min-h-14 items-center justify-between border-b border-[#C7A35A]/20 bg-[#080A09]/95 px-5 py-3 backdrop-blur-md sm:px-9">
        <span className="text-[10px] font-semibold tracking-[0.24em] text-[#C7A35A] uppercase">
          {currentLang === 'de' ? 'EINBLICKE ABSEITS DES LEBENSLAUFS' : currentLang === 'pl' ? 'POZA ŻYCIORYSEM' : 'BEYOND THE RESUME'}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={currentLang === 'de' ? 'Karte schließen' : currentLang === 'pl' ? 'Zamknij kartę' : 'Close card'}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C7A35A]/35 text-[#F4F1EA] transition-colors hover:bg-[#0F5C46] hover:border-[#C7A35A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A35A]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
        {/* PERSONAL STORY: deliberately separate from the professional biography above */}
        <section aria-labelledby="personal-story-title" className="px-5 pb-8 pt-6 sm:px-9 sm:pb-10 sm:pt-8">
          <div className="mb-7 sm:mb-10 max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#C7A35A] uppercase mb-3">
              {currentLang === 'de' ? 'PERSÖNLICH' : currentLang === 'pl' ? 'OSOBIŚCIE' : 'PERSONAL'}
            </p>
            <h2 id="personal-story-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4F1EA] leading-tight">
              {currentLang === 'de' ? 'Der Mensch hinter den Projekten' : currentLang === 'pl' ? 'Człowiek stojący za projektami' : 'The person behind the projects'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-sm sm:text-base text-[#F4F1EA]/85 leading-[1.8] font-sans text-left sm:text-justify [hyphens:auto]">
              <p className="font-serif italic text-xl sm:text-2xl leading-snug text-[#C7A35A]">
                {currentLang === 'de'
                  ? '„Wege entstehen dadurch, dass man sie geht.“'
                  : currentLang === 'pl'
                    ? '„Drogi powstają, gdy się nimi idzie.”'
                    : '“Paths are made by walking.”'}
              </p>
              <p className="mt-1 text-[11px] font-sans not-italic tracking-wide text-[#A9AEA9]">
                {currentLang === 'de' ? 'Sinngemäß nach Antonio Machado' : currentLang === 'pl' ? 'W duchu słów Antonia Machado' : 'Inspired by Antonio Machado'}
              </p>
              {(
                currentLang === 'de' ? [
                  'Vor sieben Jahren habe ich meine Heimat Polen verlassen und bin nach Deutschland gekommen. Ein neues Land, eine neue Sprache, eine andere Kultur und neue Perspektiven. Ich habe mir hier ein neues Leben aufgebaut – mit Neugier, Entschlossenheit und dem Vertrauen in meine eigenen Entscheidungen. Viele Herausforderungen musste ich selbst lösen. Nicht jede Entscheidung war einfach, aber auch diese Erfahrungen gehören zu meinem Weg.',
                  'Ich bin Mama, Autorin, leidenschaftliche Reisende und ein Mensch, der seinen eigenen Weg geht. Zu meinem Leben gehört auch meine französische Bulldogge, die mit ihrem unverwechselbaren Charakter immer wieder für ein Lächeln sorgt.',
                  'Reisen bedeutet für mich Freiheit und Inspiration. Mit dem Auto habe ich fast ganz Europa erkundet. Auch Dubai, die Dominikanische Republik und Sansibar gehören zu meinen Reiseerinnerungen. Doch mein Herz gehört einem Ort, an den ich immer wieder zurückkehre: Chalkidiki in Griechenland. Das kristallklare Wasser, das in der Sonne golden glitzert, die kleinen Buchten und die besondere Leichtigkeit machen diesen Ort für mich zu einem zweiten Zuhause.',
                  'Mich fasziniert die Psychologie – warum Menschen denken, fühlen und handeln, wie sie es tun. Diese Neugier hat auch meine kreative Seite geprägt. In meinem Buch „Du bist nicht zu viel“ beschäftige ich mich mit Beziehungen, Selbstwert und der Frage, wie wir uns selbst treu bleiben.',
                  'Eine weitere Leidenschaft ist die Fotografie. Ich liebe es, besondere Augenblicke, Stimmungen und kleine Details festzuhalten, die im Alltag oft unbemerkt bleiben. Für mich ist ein Foto nicht nur ein Bild, sondern eine Erinnerung und manchmal eine ganze Geschichte.',
                  'Mein Kreis ist klein, aber bewusst gewählt. Drei enge Freundinnen und meine Familie sind die Menschen, die mir wirklich am Herzen liegen. Mir geht es nicht darum, möglichst viele Menschen um mich zu haben, sondern die richtigen.',
                ] : currentLang === 'pl' ? [
                  'Siedem lat temu opuściłam Polskę i przeprowadziłam się do Niemiec. Nowy kraj, nowy język, inna kultura i nowe perspektywy. Zbudowałam tu nowe życie – z ciekawością, determinacją i zaufaniem do własnych decyzji. Wiele wyzwań musiałam rozwiązywać samodzielnie. Nie każda decyzja była łatwa, ale te doświadczenia również są częścią mojej drogi.',
                  'Jestem mamą, autorką książki, miłośniczką podróży i osobą, która idzie własną drogą. Towarzyszy mi też buldog francuski, którego wyjątkowy charakter nieustannie wywołuje uśmiech.',
                  'Podróże dają mi wolność i inspirację. Samochodem przemierzyłam niemal całą Europę; odwiedziłam również Dubaj, Dominikanę i Zanzibar. Jednak moje serce należy do miejsca, do którego zawsze wracam: Chalkidiki w Grecji. Krystaliczna woda połyskująca złotem w słońcu, małe zatoki i niepowtarzalna lekkość sprawiają, że czuję się tam jak w drugim domu.',
                  'Fascynuje mnie psychologia – to, dlaczego ludzie myślą, czują i działają w określony sposób. Ta ciekawość towarzyszyła mi także podczas pisania książki „Du bist nicht zu viel” o relacjach, poczuciu własnej wartości i pozostawaniu wierną sobie.',
                  'Kolejną moją pasją jest fotografia. Lubię zatrzymywać w kadrach chwile, nastroje i drobne szczegóły, które łatwo przeoczyć. Zdjęcie jest dla mnie nie tylko obrazem, lecz także wspomnieniem – czasem całą opowieścią.',
                  'Mój krąg bliskich jest niewielki, ale wybieram go świadomie. Trzy bliskie przyjaciółki i rodzina to ludzie, których naprawdę noszę w sercu. Nie liczy się dla mnie liczba znajomych, lecz jakość relacji.',
                ] : [
                  'Seven years ago, I left my home in Poland and moved to Germany. A new country, a new language, a different culture and fresh perspectives. I built a new life here with curiosity, determination and trust in my own decisions. I have had to solve many challenges on my own. Not every decision was easy, but those experiences are part of my journey too.',
                  'I am a mother, an author, a passionate traveller and someone who follows her own path. My French bulldog is part of that life too, with a personality that never fails to make me smile.',
                  'Travel means freedom and inspiration to me. I have explored almost all of Europe by car, and my journeys have also taken me to Dubai, the Dominican Republic and Zanzibar. Yet my heart belongs to a place I return to again and again: Chalkidiki in Greece. Crystal-clear water sparkling gold in the sun, secluded coves and a sense of lightness make it feel like a second home.',
                  'Psychology fascinates me – why people think, feel and act as they do. That curiosity has shaped my creative side as well. In my book “Du bist nicht zu viel”, I explore relationships, self-worth and staying true to yourself.',
                  'Photography is another passion of mine. I love capturing fleeting moments, moods and little details that often go unnoticed. To me, a photograph is more than an image: it is a memory, and sometimes an entire story.',
                  'I keep my circle small, by choice. My three close friends and my family are the people I hold dear. For me, it is not about having the most people around me, but about having the right ones.',
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
            {/* Relaxed editorial collage; no family/child/dog photographs. */}
            <div className="lg:col-span-5 relative px-2 pt-5 pb-6 sm:px-3 lg:pt-8">
              <div className="relative mx-auto max-w-[460px] min-h-[860px] sm:min-h-[1010px] lg:min-h-[1060px]">
                <figure className="absolute left-0 top-0 z-30 w-[67%] -rotate-[4deg] overflow-hidden rounded-xl border-4 border-[#F4F1EA] bg-[#101412] shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:z-30 hover:rotate-0 hover:scale-[1.03]">
                  <img src={camelImage} alt={currentLang === 'de' ? 'Reiseerinnerung: auf einem Kamel in der Wüste' : currentLang === 'pl' ? 'Wspomnienie z podróży: na wielbłądzie na pustyni' : 'Travel memory: riding a camel in the desert'} loading="lazy" decoding="async" width="408" height="1200" className="block h-auto w-full object-contain" />
                </figure>
                <figure className="absolute right-0 top-[15%] z-10 w-[62%] rotate-[6deg] overflow-hidden rounded-xl border-4 border-[#F4F1EA] bg-[#101412] shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:z-30 hover:rotate-0 hover:scale-[1.03]">
                  <img src={umbrellasImage} alt={currentLang === 'de' ? 'Reisefoto in einer beleuchteten Straße mit bunten Regenschirmen' : currentLang === 'pl' ? 'Podróżnicze zdjęcie: ulica z kolorowymi parasolami' : 'Travel photograph: a street decorated with colourful umbrellas'} loading="lazy" decoding="async" width="400" height="520" className="block aspect-[4/5] w-full object-cover" />
                </figure>
                <figure className="absolute bottom-[1%] left-[5%] z-10 w-[72%] -rotate-[3deg] overflow-hidden rounded-xl border-4 border-[#F4F1EA] bg-[#101412] shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:z-30 hover:rotate-0 hover:scale-[1.03]">
                  <img src={beachImage} alt={currentLang === 'de' ? 'Reiseerinnerung am weißen Sandstrand' : currentLang === 'pl' ? 'Wspomnienie z podróży na białej plaży' : 'Travel memory on a white-sand beach'} loading="lazy" decoding="async" width="460" height="330" className="block aspect-[4/3] w-full object-cover" />
                </figure>
                <span className="absolute right-[2%] bottom-[-1%] z-20 -rotate-6 font-serif italic text-lg sm:text-2xl text-[#C7A35A]">
                  {currentLang === 'de' ? 'Momente, die bleiben.' : currentLang === 'pl' ? 'Chwile, które zostają.' : 'Moments that stay.'}
                </span>
              </div>
            </div>
          </div>
        </section>
    </dialog>
  );
};
