import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';

export const PrivacyPage: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const data = {
    de: ['Datenschutzhinweise', 'Zurück zum Portfolio', 'Stand: November 2026. Informationen zu diesem persönlichen Karriereportfolio.', 'Verantwortliche und Kontakt', 'Natalia Stachowiak, Bielefeld. Datenschutzanfragen: wsb.natalia@gmail.com.', 'Hosting', 'Die Seite wird über GitHub Pages bereitgestellt. Dabei kann GitHub technische Zugriffsdaten wie IP-Adresse, Zeitpunkt und Browserinformationen verarbeiten.', 'Externe Dienste und Verweise', 'Schriften werden aktuell von Google Fonts geladen. Dein Browser kann dafür eine Verbindung zu Google aufbauen. Externe Dienste wie LinkedIn, edX und Lovable werden durch Anklicken ihrer Links aufgerufen. Der separate A/B-Test-Demonstrator kann eigene Analysedienste nutzen.', 'Lokale Browserdaten', 'Die Sprachauswahl wird gegebenenfalls im lokalen Browserspeicher gesichert. Ältere Versionen konnten dort Medieneinstellungen ablegen. Die aktuelle Portfolio-Oberfläche nutzt dafür keine persönliche Anmeldung.', 'Deine Rechte', 'Soweit personenbezogene Daten verarbeitet werden, bestehen die gesetzlichen Rechte nach der DSGVO, insbesondere Auskunft, Berichtigung, Löschung und Beschwerde bei einer Datenschutzaufsichtsbehörde.'],
    en: ['Privacy information', 'Back to portfolio', 'Updated November 2026. Information about this personal career portfolio.', 'Controller and contact', 'Natalia Stachowiak, Bielefeld. Privacy enquiries: wsb.natalia@gmail.com.', 'Hosting', 'This site is hosted by GitHub Pages. GitHub may process technical access information, including IP addresses, timestamps and browser details.', 'External services and links', 'Fonts currently load from Google Fonts servers. The browser may connect to Google. External services such as LinkedIn, edX and Lovable open when clicked. The separate A/B-test demonstration may use its own analytics service.', 'Local browser data', 'Your language preference may be saved locally. Older versions may have saved media settings locally. The public portfolio does not require an account.', 'Your rights', 'Where personal data is processed, relevant GDPR rights include access, rectification, erasure and the right to complain to a supervisory authority.'],
    pl: ['Informacje o prywatności', 'Powrót do portfolio', 'Aktualizacja: listopad 2026. Informacje o portfolio zawodowym.', 'Administrator i kontakt', 'Natalia Stachowiak, Bielefeld. Kontakt w sprawie prywatności: wsb.natalia@gmail.com.', 'Hosting', 'Strona jest hostowana przez GitHub Pages. GitHub może przetwarzać dane dostępu, takie jak adres IP, data i informacje o przeglądarce.', 'Usługi i linki zewnętrzne', 'Czcionki pobierane są z Google Fonts. Przeglądarka może nawiązać połączenie z Google. Linki do LinkedIn, edX i Lovable otwierają strony zewnętrzne. Odrębny demonstrator A/B może używać narzędzi analitycznych.', 'Dane lokalne', 'Wybór języka może być zapisany lokalnie. Starsze wersje mogły zapisywać ustawienia mediów. Publiczne portfolio nie wymaga konta.', 'Twoje prawa', 'W zakresie przetwarzania danych przysługują prawa wynikające z RODO: dostęp, sprostowanie, usunięcie i skarga do organu nadzorczego.']
  }[currentLang];
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:py-16">
      <Link to="/" className="text-sm text-[#C7A35A] hover:underline">{data[1]}</Link>
      <h1 className="mt-7 font-serif text-4xl text-[#F4F1EA]">{data[0]}</h1>
      <p className="mt-3 text-sm text-[#B9C4BD]">{data[2]}</p>
      <div className="mt-8 space-y-6">
        {[3,5,7,9,11].map(i => (
          <section key={i} className="rounded-xl border border-[#C7A35A]/20 bg-[#101412] p-5 sm:p-6">
            <h2 className="font-serif text-2xl text-[#C7A35A]">{data[i]}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#D1D5DB]">{data[i+1]}</p>
          </section>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#B9C4BD]">
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" className="underline text-[#C7A35A]" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a> · <a href="https://policies.google.com/privacy" className="underline text-[#C7A35A]" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
      </p>
    </div>
  );
};
