import { ProjectData, CertificateItem } from '../types';

export const PROJECTS: ProjectData[] = [
  {
    id: 'gain',
    number: '01',
    name: 'GAIN',
    title: 'GAIN — Netflix Innovation',
    subtitle: 'From Choice Overload to effortless discovery.',
    description: {
      de: 'Ein Produktinnovationskonzept, das untersucht, wie Nutzer schneller und einfacher entscheiden können, welche Inhalte sie auf Netflix ansehen möchten.',
      en: 'A product innovation concept examining how users can decide faster and more effortlessly what content to watch on Netflix.',
      pl: 'Koncepcja innowacji produktowej badająca, jak użytkownicy mogą szybciej i łatwiej decydować o wyborze treści na platformie Netflix.',
    },
    tags: ['Design Thinking', 'UX', 'Research', 'Prototyping'],
    mediaKey: 'gainImage',
    externalAppUrl: 'https://natflixgain.base44.app',
    projectTypeBadge: {
      de: 'Interaktiver Prototyp · Konzeptionelles Modell',
      en: 'Interactive Prototype · Conceptual Model',
      pl: 'Interaktywny prototyp · Model koncepcyjny',
    },
    caseStudy: {
      problem: {
        de: 'Choice Overload auf Streaming-Plattformen: Nutzer verbringen oft bis zu 25 Minuten mit dem Scrollen durch endlose Kataloge („Netflix Paralysis“), brechen frustriert ab oder wählen resigniert Wiederholungen alter Inhalte.',
        en: 'Choice overload on video streaming platforms: Viewers spend up to 25 minutes scrolling through endless catalog carousels ("Netflix Paralysis"), often giving up frustrated or defaulting to old re-runs.',
        pl: 'Problem przeciążenia wyborem na platformach streamingowych: Użytkownicy spędzają nawet 25 minut na przewijaniu katalogu, często rezygnując z seansu z powodu frustracji.',
      },
      userNeeds: {
        de: 'Schnelle Entscheidungsfindung (< 2 Minuten), Filterung nach aktuellem Gemütszustand und verfügbarer Zeit, Entlastung von kognitiver Ermüdung.',
        en: 'Decision in under 2 minutes, filtering by current emotional state and available watch window, relief from choice fatigue.',
        pl: 'Szybka decyzja (< 2 minuty), filtrowanie według nastroju i dostępnego czasu, redukcja zmęczenia decyzyjnego.',
      },
      hypothesesAndDecisions: {
        de: 'Hypothese: Eine strikte Begrenzung auf maximal 3 kuratierte Empfehlungen senkt die Abbruchquote signifikant. Produktentscheidung: Implementierung eines geführten Mood-Sliders mit transparenten Match-Signalen statt endloser Textlisten.',
        en: 'Hypothesis: Capping options to 3 curated recommendations significantly reduces drop-off. Product decision: Guided mood sliders with clear match reasoning instead of endless carousels.',
        pl: 'Hipoteza: Ograniczenie wyboru do maks. 3 rekomendacji znacząco redukuje porzucenia. Decyzja: Suwak nastroju z jasnym uzasadnieniem dopasowania.',
      },
      successMetrics: {
        de: 'Hypothesenbasierte Zielmetriken (Laborvalidierung): Angestrebte Reduktion der Time-to-Decision von 18 Min. auf unter 2 Min. In qualitativen Usability-Tests mit 8 Nutzern wählten alle Tester in durchschnittlich 1,8 Minuten zufriedenstellend aus.',
        en: 'Hypothetical Target Metrics (Lab Validation): Target time-to-decision reduction from 18 min to <2 min. In qualitative tests with 8 users, all participants completed a pick in 1.8 minutes.',
        pl: 'Docelowe wskaźniki (walidacja laboratoryjna): Skrócenie czasu decyzji z 18 min do poniżej 2 min. W testach z 8 osobami średni czas wyniósł 1,8 minuty.',
      },
      transparencyNote: {
        de: 'Interaktiver High-Fidelity-Prototyp & Design-Thinking-Konzept. Die genannten Messwerte spiegeln qualitative Laborergebnisse wider (Validierungshypothese).',
        en: 'Interactive high-fidelity prototype & Design Thinking concept. Metrics represent qualitative test outcomes (validation hypothesis).',
        pl: 'Interaktywny prototyp i koncepcja Design Thinking. Wyniki stanowią hipotezę walidacyjną z testów jakościowych.',
      },
      research: {
        de: 'Qualitative Nutzerinterviews und Verhaltensbeobachtungen ergaben: Das Hauptproblem ist nicht mangelnde Auswahl, sondern kognitive Überlastung und fehlender Kontext für den aktuellen Gemütszustand (Mood-Match).',
        en: 'Qualitative user interviews and observational research revealed: The core barrier is not content shortage, but cognitive exhaustion and lack of emotional mood-matching.',
        pl: 'Wywiady pogłębione i obserwacje zachowań użytkowników wykazały: Problem nie tkwi w małej bibliotece, lecz w przeciążeniu poznawczym i braku dopasowania do aktualnego nastroju.',
      },
      jtbd: {
        de: '„Wenn ich nach einem anstrengenden Tag auf der Couch entspannen will, möchte ich in unter 2 Minuten einen Film finden, der zu meiner aktuellen Stimmung passt, damit ich meine freie Zeit mit echtem Entertainment verbringe statt mit Suchen.“',
        en: '"When I want to unwind on the couch after an exhausting workday, I want to find a matching film in under 2 minutes, so that I spend my limited leisure time enjoying content rather than endlessly searching."',
        pl: '„Kiedy chcę odpocząć po ciężkim dniu, chcę znaleźć film w mniej niż 2 minuty dopasowany do mojego nastroju, aby cieszyć się seansem, a nie marnować czas na szukanie.”',
      },
      painPoints: [
        {
          de: 'Endlose, repetitive horizontale Carousels ohne situativen Bezug',
          en: 'Endless repetitive horizontal carousels detached from current context',
          pl: 'Nieskończone, powtarzające się listy bez uwzględnienia nastroju',
        },
        {
          de: 'Kognitive Ermüdung durch zu viele gleichwertige Vorschläge',
          en: 'Cognitive fatigue resulting from too many undifferentiated suggestions',
          pl: 'Zmęczenie decyzyjne spowodowane nadmiarem identycznie prezentowanych opcji',
        },
        {
          de: 'Enttäuschung über Trailervorschauen, die falsche Erwartungen wecken',
          en: 'Frustration with autoplay trailers setting inaccurate expectations',
          pl: 'Rozczarowanie zwiastunami budującymi mylne oczekiwania',
        },
      ],
      howMightWe: {
        de: 'Wie können wir den Entscheidungsprozess von passivem Browsing in eine intuitive, stimmungsgesteuerte 30-Sekunden-Entdeckung verwandeln?',
        en: 'How might we transform the decision loop from passive scrolling into an intuitive, mood-driven 30-second discovery flow?',
        pl: 'Jak moglibyśmy przekształcić pasywne przeglądanie w intuicyjne, 30-sekundowe odkrywanie oparte na nastroju?',
      },
      solution: {
        de: 'GAIN führt eine kuratierte, dynamische Mood- & Intent-Discovery ein: Nutzer wählen ihre momentane Energie, verfügbare Zeit und Begleitung. Ein intelligenter Match-Algorithmus präsentiert maximal 3 hochrelevante Empfehlungen mit transparenten Entscheidungshilfen.',
        en: 'GAIN introduces a curated dynamic Mood & Intent discovery engine: Users select their energy level, available watch window, and social context. The system filters down to at most 3 spot-on recommendations with transparent "Why this fits" signals.',
        pl: 'GAIN wprowadza mechanizm odkrywania treści na podstawie nastroju i intencji: Użytkownik określa swój nastrój, dostępny czas i towarzystwo. System proponuje maksymalnie 3 precyzyjne rekomendacje.',
      },
      prototype: {
        de: 'Der interaktive High-Fidelity-Prototyp wurde als voll funktionsfähige Web-Applikation umgesetzt und kann direkt live getestet werden.',
        en: 'The interactive high-fidelity prototype was built as a responsive web app and can be tested live directly.',
        pl: 'Interaktywny prototyp wysokiej wierności został zrealizowany jako aplikacja internetowa i jest dostępny do testów na żywo.',
      },
      usabilityTesting: {
        de: 'In Usability-Sessions mit 8 Testpersonen sank die durchschnittliche Entscheidungszeit von 18 Minuten auf 1,8 Minuten. 100 % der Probanden empfanden den geführten Prozess als stressfrei und motivierend.',
        en: 'During usability tests with 8 target users, average time-to-decision plummeted from 18 minutes to 1.8 minutes. 100% of participants reported reduced cognitive friction and high delight.',
        pl: 'W testach użyteczności z 8 uczestnikami średni czas wyboru filmu spadł z 18 minut do 1,8 minuty. Wszyscy badani ocenili proces jako bezstresowy i satysfakcjonujący.',
      },
      learnings: {
        de: 'Nutzer wollen nicht mehr Auswahl, sondern mehr Klarheit. Einschränkung auf wenige, fundierte Empfehlungen schafft deutlich größeres Vertrauen und unmittelbare Zufriedenheit.',
        en: 'Users do not crave more choice; they crave confidence. Intentionally narrowing options to calibrated recommendations builds trust and immediate satisfaction.',
        pl: 'Użytkownicy nie potrzebują większego wyboru, lecz pewności decyzji. Świadome ograniczenie opcji do kilku trafnych rekomendacji buduje zaufanie.',
      },
    },
  },
  {
    id: 'street-life',
    number: '02',
    name: 'street.life / FanPulse',
    title: 'street.life / FanPulse',
    subtitle: 'From Ticketing to Community Experience.',
    description: {
      de: 'Ein Product-Management-Konzept zur Weiterentwicklung einer Eventplattform von einer transaktionsorientierten Nutzung hin zu einer kontinuierlichen Event Experience.',
      en: 'A product management concept evolving an event platform from transactional ticket sales into an ongoing community event experience.',
      pl: 'Koncepcja Product Managementu przekształcająca platformę biletową z narzędzia transakcyjnego w ciągłe doświadczenie społecznościowe.',
    },
    tags: ['Product Strategy', 'MVP', 'AI', 'AI Community'],
    mediaKey: 'streetLifeImage',
    projectTypeBadge: {
      de: 'Strategisches Produktkonzept · MVP-Design',
      en: 'Strategic Product Concept · MVP Design',
      pl: 'Strategiczna koncepcja produktu · Projekt MVP',
    },
    caseStudy: {
      problem: {
        de: 'Klassische Ticketing-Portale enden nach dem Bezahlvorgang. Fans fühlen sich vor und nach dem Event allein gelassen; Veranstalter verlieren den direkten Draht zu ihren treuesten Besuchern.',
        en: 'Traditional ticketing portals conclude user interaction at checkout. Fans are left disconnected before and after the event; organizers lose direct relationships with their core audience.',
        pl: 'Tradycyjne platformy biletowe kończą kontakt po zapłacie. Fani pozostają bez wsparcia przed i po wydarzeniu, a organizatorzy tracą cenny kontakt ze społecznością.',
      },
      userNeeds: {
        de: 'Reibungslose Vorbereitung (Anreise, Offline-Ticket, Barrierefreiheit, Sicherheit) und echter Austausch mit Gleichgesinnten vor und nach dem Konzert.',
        en: 'Seamless preparation (transit, offline ticket pass, safety, accessibility) and peer connection before and after the concert.',
        pl: 'Sprawna organizacja (dojazd, bilet offline, bezpieczeństwo) oraz kontakt ze społecznością przed i po wydarzeniu.',
      },
      hypothesesAndDecisions: {
        de: 'Hypothese: Relevante Kundenbindung entsteht nicht im Checkout, sondern im emotionalen Vorfeld des Events. Produktentscheidung: Erweiterung um eine Begleit-App mit Offline-Ticket, Community-Spaces und KI-Serviceassistenten.',
        en: 'Hypothesis: Lasting retention forms in the anticipation phase, not at checkout. Product decision: Expand platform into an event companion with offline passes and community hubs.',
        pl: 'Hipoteza: Lojalność buduje się przed wydarzeniem, nie przy płatności. Decyzja: Rozbudowa platformy o cyfrowego towarzysza z biletem offline.',
      },
      customerJourney: [
        { step: '01 Discover', desc: { de: 'Events nach Musikgeschmack & Freundeskreis entdecken', en: 'Discover events tailored to music tastes and friend circles', pl: 'Odkrywanie wydarzeń dopasowanych do gustu muzycznego' } },
        { step: '02 Inform', desc: { de: 'Klarer Überblick über Line-up, Location & Barrierefreiheit', en: 'Clear line-up details, venue accessibility, and schedules', pl: 'Przejrzysty harmonogram, lokalizacja i dostępność' } },
        { step: '03 Decide', desc: { de: 'Gemeinsame Abstimmung mit Freunden direkt in der App', en: 'Group consensus and friend voting directly within the app', pl: 'Grupowe głosowanie ze znajomymi bezpośrednio w aplikacji' } },
        { step: '04 Ticket', desc: { de: 'Transparenter 2-Klick-Kauf ohne versteckte Gebühren', en: 'Transparent two-click checkout with zero hidden fees', pl: 'Przejrzysty zakup bez ukrytych opłat w 2 kliknięciach' } },
        { step: '05 Prepare', desc: { de: 'Packlisten, Anreise-Buddies & Community-Vorfreude', en: 'Packing guides, carpool coordination & anticipation chat', pl: 'Wskazówki dojazdu, koordynacja wspólnej trasy i czat' } },
        { step: '06 Experience', desc: { de: 'Live-Updates, Timetable-Alarm und Offline-Ticket', en: 'Live stage alerts, timetable reminders & offline wallet', pl: 'Powiadomienia na żywo, harmonogramy i bilet offline' } },
        { step: '07 Engage', desc: { de: 'Community-Galerie, Setlist-Voting und Feedback', en: 'Community gallery, setlist polling, and direct feedback', pl: 'Galeria społeczności, głosowanie na setlistę i opinie' } },
        { step: '08 Return', desc: { de: 'Treuebelohnungen, Vorkaufsrechte und nächste Events', en: 'Loyalty rewards, pre-sale perks, and curated next events', pl: 'Program lojalnościowy i pierwszeństwo zakupu na kolejne eventy' } },
      ],
      solution: {
        de: 'FanPulse erweitert die Plattform durch: Reibungsloses Ticketing, KI-gestützte Vorbereitung, personalisierte Event-Entdeckung, Festival-Community-Spaces und automatisierte Return-Loops.',
        en: 'FanPulse evolves the ecosystem via frictionless ticketing, AI-assisted logistics, tailored discovery, dedicated fan spaces, and automated re-engagement cycles.',
        pl: 'FanPulse wzbogaca platformę o: płynny zakup biletów, wsparcie AI, spersonalizowane rekomendacje, przestrzeń społecznościową i pętle powracających fanów.',
      },
      mvp: {
        de: 'MVP-Fokus: 1) Universelles Offline-Ticket, 2) Event-Chatroom für Ticketinhaber, 3) Intelligenter Push-Assistent bei Fahrplan- oder Wetteränderungen.',
        en: 'MVP Focus: 1) Universal offline pass, 2) Verified attendee group chat, 3) Smart push concierge notifying of timetable or weather shifts.',
        pl: 'Zakres MVP: 1) Portfel biletów offline, 2) Czat dla posiadaczy biletów, 3) Asystent powiadomień o zmianach godzin lub pogody.',
      },
      learnings: {
        de: 'Das eigentliche Produkt ist nicht das Ticket, sondern das Gemeinschaftserlebnis. Ein digitaler Begleiter vor und während des Events steigert die Wiederbuchungsrate signifikant.',
        en: 'The genuine product is not the ticket stub, but the shared human moment. Elevating the pre- and post-event touchpoints drives sustainable retention.',
        pl: 'Prawdziwym produktem nie jest sam bilet, lecz wspólne przeżycie. Cyfrowy towarzysz przed i w trakcie wydarzenia znacząco zwiększa powracalność fanów.',
      },
      successMetrics: {
        de: 'Konzeptionelle Ziel-KPIs (geplanter Pilot-Rahmen): Angestrebte Steigerung der Wiederbuchungsrate um +25 %, Entlastung des Vor-Ort-Info-Desks um bis zu 40 %, Erhöhung des NPS im Event-Lifecycle.',
        en: 'Conceptual Target KPIs (Pilot Framework): Targeted +25% repeat booking rate, up to 40% relief for on-site info desks, and elevated lifecycle NPS.',
        pl: 'Koncepcyjne docelowe KPI (ramy pilotażu): Planowany wzrost powracalności o +25%, odciążenie punktów informacyjnych o 40% i wyższy NPS.',
      },
      transparencyNote: {
        de: 'Strategisches Produktkonzept & UX-Architektur. Kennzahlen stellen modellierte Ziel-KPIs für einen zukünftigen MVP-Pilotbetrieb dar.',
        en: 'Strategic product concept & UX architecture. Metrics are modeled target KPIs for upcoming pilot validation.',
        pl: 'Strategiczna koncepcja produktu i architektura UX. Wskaźniki są celami modelowymi dla przyszłego pilotażu.',
      },
    },
  },
  {
    id: 'vinyl',
    number: '03',
    name: 'Vinyl',
    title: 'Vinyl — AI Event Support',
    subtitle: 'Your event. Your ticket. Your AI.',
    description: {
      de: 'Ein eigenständiges KI-Produktkonzept, das Eventinformationen, Offline-Tickets und intelligenten Kundenservice in einer Anwendung verbindet.',
      en: 'An independent AI product concept combining event logistics, offline digital passes, and intelligent attendee support in a single experience.',
      pl: 'Autorska koncepcja produktu AI łącząca informacje o wydarzeniach, bilety offline i inteligentną obsługę uczestników w jednej aplikacji.',
    },
    tags: ['AI Product', 'AI Agent', 'Customer Support', 'UX'],
    mediaKey: 'vinylImage',
    projectTypeBadge: {
      de: 'Eigenständiges KI-Produktkonzept · Spezifikation',
      en: 'Independent AI Product Concept · Specification',
      pl: 'Autorska koncepcja produktu AI · Specyfikacja',
    },
    caseStudy: {
      problem: {
        de: 'Auf Großveranstaltungen bricht häufig das Mobilfunknetz zusammen. Fans können ihre Online-Tickets nicht abrufen und finden keine verlässlichen Antworten auf dringende Fragen (z. B. Einlasszeiten, Schließfächer, Fundsachen).',
        en: 'Mobile networks frequently saturate at massive festivals. Attendees cannot load web tickets and find no immediate answers to critical queries (entry gates, lockers, lost items).',
        pl: 'Podczas dużych festiwali sieci komórkowe często zawodzą. Uczestnicy nie mogą załadować biletów ani uzyskać szybkich informacji o bramkach, depozytach czy harmonogramie.',
      },
      userNeeds: {
        de: 'Garantierter Einlass ohne Netzverbindung, sofortige Auskunft zu Sicherheits- und Orientierungsfragen ohne langes Warten in Warteschlangen.',
        en: 'Guaranteed venue access without cell signal, instant responses to safety and logistical FAQs without waiting in long queues.',
        pl: 'Pewny wstęp na teren imprezy bez zasięgu sieci, błyskawiczne odpowiedzi na pytania organizacyjne bez stania w kolejkach.',
      },
      hypothesesAndDecisions: {
        de: 'Hypothese: Ein lokaler On-Device-KI-Assistent mit gecachten Event-Daten kann 80 % der Standardfragen ohne Serververbindung beantworten. Produktentscheidung: Offline-First-Architektur mit lokaler Datenhaltung und Ein-Klick-Mensch-Eskalation.',
        en: 'Hypothesis: An edge-capable on-device AI assistant with cached festival data can resolve 80% of standard questions offline. Product decision: Offline-first architecture with local cache and one-tap human escalation.',
        pl: 'Hipoteza: Lokalny asystent AI z zapisanymi danymi rozwiąże 80% pytań bez połączenia z serwerem. Decyzja: Architektura offline-first z szybką eskalacją do człowieka.',
      },
      coreFeatures: [
        {
          title: '01 OFFLINE TICKET',
          desc: {
            de: 'Kryptografisch gesichertes Ticket-Wallet, das ohne jegliche Internetverbindung am Einlass fehlerfrei funktioniert.',
            en: 'Cryptographically cached digital pass that scans reliably at gates with zero internet connectivity.',
            pl: 'Zabezpieczony portfel biletowy działający w 100% offline bez konieczności połączenia z siecią.',
          },
        },
        {
          title: '02 AI EVENT ASSISTANT',
          desc: {
            de: 'Kontextbewusster KI-Concierge, der FAQs, Geländepläne, Timetables und Line-up-Empfehlungen in natürlicher Sprache beantwortet.',
            en: 'Context-aware AI concierge answering venue maps, safety FAQs, and timetable inquiries in natural conversational language.',
            pl: 'Inteligentny asystent odpowiadający na pytania o plan terenu, line-up i bezpieczeństwo w naturalnym języku.',
          },
        },
        {
          title: '03 CUSTOMER SERVICE & ESCALATION',
          desc: {
            de: 'Automatisierte Sofortlösung für 80 % der Standardanfragen mit nahtloser Eskalation an menschliche Helfer vor Ort bei Notfällen.',
            en: 'Instant automated resolution for 80% of routine inquiries with one-tap human escalation for on-site emergencies.',
            pl: 'Automatyczne rozwiązywanie 80% typowych zgłoszeń oraz natychmiastowe przekazanie do personelu na miejscu.',
          },
        },
      ],
      solution: {
        de: 'VINYL vereint ein Offline-First Wallet mit einem smarten lokalen KI-Agenten, der auch bei schwachem Signal agil und verlässlich unterstützt.',
        en: 'VINYL pairs an offline-first pass wallet with an edge-capable AI assistant delivering reassurance when infrastructure fails.',
        pl: 'VINYL łączy portfel biletowy działający w trybie offline ze sprytnym agentem AI, który pomaga nawet przy braku sygnału.',
      },
      learnings: {
        de: 'Für Event-Apps ist Ausfallsicherheit kein technisches Detail, sondern das Vertrauensfundament schlechthin. KI muss in kritischen Momenten Reibung nehmen, nicht hinzufügen.',
        en: 'For live experiences, resilience is not an implementation detail; it is the bedrock of attendee trust. AI must reduce stress in high-friction environments.',
        pl: 'W aplikacjach eventowych niezawodność offline to fundament zaufania. Sztuczna inteligencja musi redukować stres, a nie dodawać barier.',
      },
      successMetrics: {
        de: 'Hypothesenbasierte Zielmetriken: 0 % Einlass-Abbrüche durch Netzausfall (100 % Offline-Readiness), Beantwortung von 80 % der Standardanfragen in unter 15 Sekunden.',
        en: 'Hypothetical Target Metrics: 0% gate failures due to network blackout (100% offline readiness), 80% automated resolution in under 15 seconds.',
        pl: 'Docelowe wskaźniki walidacyjne: 0% problemów z wejściem przy braku sieci (100% gotowości offline), rozwiązanie 80% pytań w mniej niż 15 sekund.',
      },
      transparencyNote: {
        de: 'Konzeptionelle Produktspezifikation. Zielmetriken dienen als Validierungskriterien für Tests unter realitätsnahen Festivalbedingungen.',
        en: 'Conceptual product specification. Target metrics serve as validation criteria for field testing.',
        pl: 'Koncepcyjna specyfikacja produktu. Wskaźniki służą jako kryteria walidacji w testach terenowych.',
      },
      nextSteps: {
        de: 'Die VINYL-App wird als eigenständige Anwendung weiterentwickelt und evaluiert.',
        en: 'The VINYL application is developed independently and validated in live venue conditions.',
        pl: 'Aplikacja VINYL jest rozwijana jako niezależny produkt i przygotowywana do testów.',
      },
    },
  },
  {
    id: 'dine-ease',
    number: '04',
    name: 'Dine-Ease',
    title: 'Dine-Ease',
    subtitle: 'From manual shift planning to intelligent workforce management.',
    description: {
      de: 'Ein digitales Produktkonzept zur Vereinfachung der Personaleinsatzplanung durch strukturierte Verfügbarkeiten, automatisierte Planung und KI-Unterstützung.',
      en: 'A digital product concept streamlining staff shift scheduling via structured availability capture, automated roster building, and AI support.',
      pl: 'Koncepcja produktu cyfrowego usprawniająca planowanie grafików pracowniczych poprzez ustrukturyzowaną dostępność i wsparcie AI.',
    },
    tags: ['Automation', 'AI', 'UX', 'System Thinking'],
    mediaKey: 'dineEaseImage',
    projectTypeBadge: {
      de: 'B2B-Produktkonzept · Workflow-Automatisierung',
      en: 'B2B Product Concept · Workflow Automation',
      pl: 'Koncepcja produktu B2B · Automatyzacja procesów',
    },
    caseStudy: {
      problem: {
        de: 'Gastronomie-Schichtplanung erfolgt oft auf WhatsApp-Gruppen, Zetteln oder chaotischen Excel-Listen. Schichtleiter verlieren jede Woche Stunden mit Tauschanfragen und kurzfristigen Ausfällen.',
        en: 'Hospitality scheduling frequently relies on fragmented WhatsApp threads, paper notes, or brittle spreadsheets. Shift leads spend hours reconciling swaps and last-minute no-shows.',
        pl: 'Planowanie grafików w gastronomii wciąż opiera się na chaotycznych grupach WhatsApp i notatkach. Managerowie marnują godziny na ustalanie zamian.',
      },
      userNeeds: {
        de: 'Mitarbeiter wünschen transparente, faire Dienstpläne und unkomplizierten Schichttausch. Schichtleiter benötigen schnelle, rechtskonforme Pläne ohne Kommunikationschaos.',
        en: 'Staff need transparent, fair schedules and easy peer swaps. Shift leads require fast, compliant roster generation free from message clutter.',
        pl: 'Pracownicy oczekują przejrzystych grafików i łatwej wymiany zmian. Managerowie potrzebują szybkiego planowania zgodnego z przepisami.',
      },
      hypothesesAndDecisions: {
        de: 'Hypothese: Hohe Akzeptanz im Team erfordert Consumer-Grade Usability. Produktentscheidung: Mobile Verfügbarkeitseingabe mit 3 Taps, automatisierter KI-Planungsassistent („Mokka“) und transparente Tauschregeln.',
        en: 'Hypothesis: High team adoption demands consumer-grade usability. Product decision: 3-tap mobile availability inputs, automated AI scheduling ("Mokka"), and transparent peer swap rules.',
        pl: 'Hipoteza: Sukces wdrożenia wymaga prostoty aplikacji konsumenckiej. Decyzja: Zgłaszanie dyspozycyjności w 3 kliknięciach, asystent AI „Mokka” i przejrzyste zasady wymiany.',
      },
      solution: {
        de: 'Dine-Ease strukturiert Mitarbeiterverfügbarkeiten, Schichtwünsche und gesetzliche Ruhezeiten in einer intuitiven Plattform mit dem intelligenten Assistenten „Mokka“.',
        en: 'Dine-Ease structures staff availability, shift preferences, and mandatory rest periods within an intuitive dashboard assisted by "Mokka".',
        pl: 'Dine-Ease porządkuje dyspozycyjność pracowników i przepisy prawa pracy w intuicyjnej platformie wspieranej przez asystenta AI „Mokka”.',
      },
      coreFeatures: [
        {
          title: '01 EMPLOYEE AVAILABILITY',
          desc: {
            de: 'Mitarbeiter tragen ihre Wunschzeiten und Sperrtage mit wenigen Fingertipps im mobilen Dashboard ein.',
            en: 'Team members log their preferred shifts and blackout dates with simple mobile taps.',
            pl: 'Pracownicy szybko zgłaszają swoją dyspozycyjność i preferencje w aplikacji mobilnej.',
          },
        },
        {
          title: '02 AI ASSISTANT "MOKKA"',
          desc: {
            de: 'Schlägt optimale Dienstpläne unter Berücksichtigung von Qualifikationen, Verträgen und fairen Wochenendverteilungen vor.',
            en: 'Generates optimal shift rosters balancing skill distribution, contracts, and equitable weekend shifts.',
            pl: 'Generuje zoptymalizowane grafiki z uwzględnieniem kwalifikacji, limitów godzin i sprawiedliwego podziału.',
          },
        },
        {
          title: '03 SMART SHIFT SWAPS',
          desc: {
            de: 'Selbstorganisierter Schichttausch unter Kollegen mit automatischer Genehmigungsprüfung nach Qualifikation.',
            en: 'Peer-to-peer shift swaps with automated qualification checks before manager sign-off.',
            pl: 'Wymiana zmian między pracownikami z automatyczną weryfikacją kwalifikacji przed zatwierdzeniem.',
          },
        },
      ],
      learnings: {
        de: 'Erfolgreiche B2B-Tools für Dienstleister müssen so einfach bedienbar sein wie Consumer-Apps. Hohe Akzeptanz im Team ist der Schlüssel für verlässliche Planungsdaten.',
        en: 'Workforce tools in shift environments must feel as seamless as consumer social apps. Rapid team adoption is essential for planning data integrity.',
        pl: 'Narzędzia B2B dla gastronomii muszą być tak proste jak aplikacje konsumenckie. Zaangażowanie zespołu decyduje o sukcesie wdrożenia.',
      },
      successMetrics: {
        de: 'Modellierte Ziel-KPIs: Reduktion des wöchentlichen Planungsaufwands von 4 Stunden auf unter 30 Minuten, 90 % pünktlich eingereichte Verfügbarkeiten, 40 % weniger unbesetzte Schichten.',
        en: 'Modeled Target KPIs: Reduction in weekly scheduling overhead from 4 hours to <30 minutes, 90% on-time availability input, 40% fewer uncovered shifts.',
        pl: 'Modelowe wskaźniki docelowe: Skrócenie czasu planowania z 4 godzin do <30 minut, 90% terminowości zgłoszeń, 40% mniej braków kadrowych.',
      },
      transparencyNote: {
        de: 'B2B-Produktkonzept & Systemdesign. Kennzahlen repräsentieren quantifizierte Zielkriterien für den bevorstehenden Pilotbetrieb.',
        en: 'B2B product concept & system design. Metrics represent quantified target criteria for upcoming pilot deployment.',
        pl: 'Koncepcja produktu B2B i projekt systemowy. Wskaźniki są skwantyfikowanymi celami dla wdrożenia pilotażowego.',
      },
    },
  },
  {
    id: 'du-bist-nicht-zu-viel',
    number: '05',
    name: 'Du bist nicht zu viel',
    title: 'Du bist nicht zu viel',
    subtitle: 'From idea to published product.',
    description: {
      de: 'Ein persönliches Buchprojekt, das Schreiben, Produktentwicklung, Markenaufbau, Content Creation und Community verbindet.',
      en: 'A personal published book project combining writing, product development, brand identity, content creation, and community building.',
      pl: 'Autorski projekt książkowy łączący pisarstwo, rozwój produktu, budowę marki, tworzenie treści i społeczność.',
    },
    tags: ['Creation', 'Branding', 'Content', 'Community'],
    mediaKey: 'bookCover',
    instagramUrl: 'https://www.instagram.com/frau_en_power2026/',
    projectTypeBadge: {
      de: 'Reales Produkt · Veröffentlichtes Buch & Community',
      en: 'Live Product · Published Book & Community',
      pl: 'Wydany produkt · Książka i społeczność',
    },
    caseStudy: {
      problem: {
        de: 'Frauen im modernen Dating-Alltag kämpfen häufig mit Verunsicherung, Ghosting und dem Gefühl, „zu anspruchsvoll“ oder „zu viel“ zu sein. Es fehlte ein humorvoller, ehrlicher und psychologisch fundierter Begleiter ohne erhobenen Zeigefinger.',
        en: 'Women navigating modern dating frequently face self-doubt, ghosting, and the exhausting sentiment of being "too much" or demanding. There was a lack of honest, humorous, and psychologically grounded guidance free of condescension.',
        pl: 'Kobiety we współczesnym randkowaniu często mierzą się z niepewnością i poczuciem, że „wymagają zbyt wiele”. Brakowało szczerej, humorystycznej i psychologicznie mądrej książki.',
      },
      userNeeds: {
        de: 'Ehrliche, psychologisch fundierte Reflexion über Beziehungsdynamiken und Selbstwert, nahbares Storytelling und das Gefühl von Bestätigung und Gemeinschaft.',
        en: 'Honest, psychologically sound reflection on relational dynamics and self-worth, relatable storytelling, and community validation.',
        pl: 'Szczera, psychologicznie oparta refleksja o relacjach i poczuciu własnej wartości oraz poczucie zrozumienia i wspólnoty.',
      },
      hypothesesAndDecisions: {
        de: 'Hypothese: Ein Buch entfaltet die stärkste Wirkung, wenn es mit einem kontinuierlichen digitalen Community-Dialog verschmilzt. Produktentscheidung: Verknüpfung des gedruckten Werks mit einer dedizierten Instagram-Plattform (@frau_en_power2026) für tägliche Inspiration und Leser-Austausch.',
        en: 'Hypothesis: A book exerts maximum resonance when coupled with an ongoing social dialogue. Product decision: Link the print work to a dedicated Instagram platform (@frau_en_power2026) for daily reader connection.',
        pl: 'Hipoteza: Książka osiąga największą siłę, gdy łączy się z ciągłym dialogiem w mediach społecznościowych. Decyzja: Połączenie książki z profilem na Instagramie (@frau_en_power2026).',
      },
      solution: {
        de: 'Ein ganzheitliches Produkt: Ein pointiert geschriebenes Buch über Dating, Red Flags und Selbstwert, begleitet von einer interaktiven Instagram-Community (@frau_en_power2026), die Identifikation und Mut stiftet.',
        en: 'A comprehensive product execution: A sharply observed book dissecting dating patterns, red flags, and self-esteem, anchored by an authentic Instagram community (@frau_en_power2026).',
        pl: 'Kompleksowy produkt: Książka o randkowaniu, red flagach i poczuciu własnej wartości oraz zaangażowana społeczność na Instagramie (@frau_en_power2026).',
      },
      coreFeatures: [
        {
          title: '01 BOOK PRODUCT LIFECYCLE',
          desc: {
            de: 'Von der ersten Manuskript-Hypothese über Lektorat und Cover-Design bis zur fertigen Publikation.',
            en: 'From initial hypothesis and outline through editing, cover typography, and final market publication.',
            pl: 'Od pierwszej koncepcji tekstu, przez redakcję i projekt okładki, aż po publikację.',
          },
        },
        {
          title: '02 BRAND & VISUAL IDENTITY',
          desc: {
            de: 'Wiedererkennbares Design, nahbare Typografie und visuelles Storytelling für eine moderne weibliche Zielgruppe.',
            en: 'Distinctive brand aesthetic, refined typography, and engaging storytelling tailored to modern women.',
            pl: 'Rozpoznawalny styl graficzny, elegancka typografia i autentyczny storytelling.',
          },
        },
        {
          title: '03 COMMUNITY & DIALOGUE',
          desc: {
            de: 'Instagram-Präsenz (@frau_en_power2026) mit täglichem Austausch, Umfragen und echtem Feedback.',
            en: 'Active Instagram presence (@frau_en_power2026) engaging daily in polling, conversation, and feedback.',
            pl: 'Społeczność Instagram (@frau_en_power2026) z codziennymi ankietami i dyskusją.',
          },
        },
      ],
      learnings: {
        de: 'Ein Buch ist ein physisches Produkt mit Customer Journey, Zielgruppenbedürfnissen und Feedback-Zyklen. Authentisches Storytelling schafft die stärkste Bindung.',
        en: 'A book is a tangible product complete with audience discovery, customer journeys, and iteration loops. Vulnerable storytelling builds unmatched retention.',
        pl: 'Książka to pełnoprawny produkt z własną ścieżką użytkownika. Autentyczny storytelling buduje najtrwalszą relację.',
      },
      successMetrics: {
        de: 'Reale Marktergebnisse: Erfolgreich publiziertes Buch mit aktiver Leserschaft, kontinuierlich wachsende Community auf Instagram (@frau_en_power2026), hohe Interaktionsrate und direktes, emotionales Leserinnen-Feedback.',
        en: 'Real Market Results: Successfully published book in circulation, active reader community on Instagram (@frau_en_power2026), strong interaction rates and direct reader testimonials.',
        pl: 'Rzeczywiste wyniki rynkowe: Wydana książka, rosnąca społeczność na Instagramie (@frau_en_power2026) oraz bezpośrednie, zaangażowane opinie czytelniczek.',
      },
      transparencyNote: {
        de: 'Reales, kommerziell publiziertes Buchprodukt mit lebendiger Community. Ergebnisse basieren auf realen Verkäufen und echtem Leser-Engagement.',
        en: 'Real, commercially published book product with an active community. Outcomes reflect real market circulation and genuine engagement.',
        pl: 'Rzeczywisty, wydany produkt książkowy z aktywną społecznością czytelników.',
      },
    },
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-pm-program',
    title: 'Digital Product Management & Transformation',
    issuer: 'Professional IT Product Program',
    year: '2026–2027',
    category: 'PRODUCT_MANAGEMENT',
    status: 'IN_PROGRESS',
    focus: 'Product Strategy · Discovery to Delivery · User Journey · Roadmap & Metrics',
  },
  {
    id: 'cert-dt',
    title: 'Professional Certificate Program in Design Thinking',
    issuer: 'Professional Institute',
    year: '2026',
    category: 'DESIGN_THINKING',
    status: 'COMPLETED',
    focus: 'Empathize & Needfinding · Ideation · Rapid Prototyping · Usability Testing',
  },
  {
    id: 'cert-product-design',
    title: 'Product Design, Prototyping and Testing',
    issuer: 'Product Academy',
    year: '2026',
    category: 'PRODUCT_MANAGEMENT',
    status: 'COMPLETED',
    focus: 'Wireframing & UI/UX · Interactive Prototyping · Heuristics · Feedback Loops',
  },
  {
    id: 'cert-scrum-master',
    title: 'Scrum Master Intensive',
    issuer: 'Scrum Certification Body',
    year: '2026',
    category: 'AGILE_SCRUM',
    status: 'COMPLETED',
    focus: 'Scrum Framework & Roles · Sprint Planning · Backlog Refinement · Servant Leadership',
  },
  {
    id: 'cert-agile-inn',
    title: 'Agile Innovation and Problem Solving',
    issuer: 'Specialized Academy',
    year: '2026',
    category: 'AGILE_SCRUM',
    status: 'COMPLETED',
    focus: 'Agile Innovation Sprints · Problem Framing · Value Proposition · OKRs',
  },
  {
    id: 'cert-applied-scrum',
    title: 'Applied Scrum for Agile Project Management',
    issuer: 'Agile Leadership Center',
    year: '2026',
    category: 'AGILE_SCRUM',
    status: 'COMPLETED',
    focus: 'Cross-functional Collaboration · Sprint Delivery · Team Retrospectives',
  },
  {
    id: 'cert-agile-foundation',
    title: 'Agile Foundation',
    issuer: 'Agile Institute',
    year: '2026',
    category: 'AGILE_SCRUM',
    status: 'COMPLETED',
    focus: 'Agile Manifesto Principles · Iterative Delivery · Feedback Culture',
  },
  {
    id: 'cert-ai-kompakt',
    title: 'KI Kompakt – Grundlagen und Anwendungen',
    issuer: 'AI Training Center',
    year: '2026',
    category: 'AI',
    status: 'COMPLETED',
    focus: 'Generative AI Workflows · LLM Prompting · AI-Assisted Product Processes',
  },
  {
    id: 'cert-ai-grundlagen',
    title: 'KI-Grundlagen-Zertifikat',
    issuer: 'Technology Institute',
    year: '2026',
    category: 'AI',
    status: 'COMPLETED',
    focus: 'Machine Learning Concepts · Data-Driven Decision Making · AI Ethics & Use Cases',
  },
];
