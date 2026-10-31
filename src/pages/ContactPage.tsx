import React, { useState } from 'react';
import { Mail, Linkedin, Phone, MapPin, Send, ArrowUpRight, Download, ExternalLink, FileText } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { CV_FILE } from '../data/assetRegistry';
import { CvPreviewModal } from '../components/CvPreviewModal';
import { getAbsoluteAssetUrl } from '../utils/assetPath';

interface ContactPageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  currentLang,
  mediaAssets,
}) => {
  const email = 'wsb.natalia@gmail.com';
  const phone = '+49 176 66313051';
  const location = 'Bielefeld, Deutschland';
  const linkedinUrl = mediaAssets.linkedinUrl || 'https://www.linkedin.com/in/natalia-stachowiak-0a8449306';
  const cvUrl = CV_FILE;
  const absoluteCvUrl = getAbsoluteAssetUrl(cvUrl);
  const [isCvPreviewOpen, setIsCvPreviewOpen] = useState(false);

  return (
    <PageTransition>
      <div className="relative w-full flex-grow px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-8 sm:py-16 space-y-12 sm:space-y-16">
        {/* Ambient Subtle Glow */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-[#0F5C46]/15 blur-[160px]" />

        {/* Top Back to Portfolio */}
        <div className="relative z-10 -mt-2 mb-4">
          <BackToPortfolio currentLang={currentLang} />
        </div>

        {/* 1. Large Editorial Headline */}
        <div className="relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
              {currentLang === 'de' ? 'KONTAKT & VERNETZUNG' : currentLang === 'pl' ? 'KONTAKT I WSPÓŁPRACA' : 'CONTACT & NETWORK'}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4F1EA]">
            LET'S CONNECT.
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#A9AEA9] max-w-xl mx-auto leading-relaxed">
            {currentLang === 'de'
              ? 'Ich freue mich über neue berufliche Herausforderungen und Kooperationen im digitalen Produktmanagement, KI-gestützten Innovationsinitiativen sowie den fundierten Austausch über nutzerzentrierte Technologien.'
              : currentLang === 'pl'
              ? 'Jestem otwarta na nowe wyzwania zawodowe i współpracę w obszarze cyfrowego zarządzania produktami, innowacji opartych na AI oraz merytoryczną wymianę doświadczeń technologicznych.'
              : 'Open to new professional opportunities and collaborative roles in digital product management, AI-driven innovation initiatives, and meaningful exchange on user-centered technology.'}
          </p>
        </div>

        {/* 2. Clean Minimal Contact Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Email Card */}
          <div className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-5 flex flex-col justify-between hover:border-[#C7A35A] transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#080A09] border border-[#0F5C46]/50 text-[#C7A35A] mb-4">
                <Mail className="h-4 w-4" />
              </div>
              <span className="font-sans text-[10px] font-bold tracking-widest text-[#C7A35A] uppercase block">
                E-MAIL
              </span>
              <a
                href={`mailto:${email}`}
                className="font-serif text-base sm:text-lg font-medium text-[#F4F1EA] hover:text-[#C7A35A] transition-colors truncate block mt-1"
              >
                {email}
              </a>
              <p className="text-xs text-[#A9AEA9] mt-1.5 leading-relaxed">
                {currentLang === 'de'
                  ? 'Direkte Kontaktaufnahme für Rollen & Fachgespräche'
                  : currentLang === 'pl'
                  ? 'Bezpośredni kontakt w sprawach ról i rozmów rekrutacyjnych'
                  : 'Direct contact for roles & professional discussions'}
              </p>
            </div>
            <a
              href={`mailto:${email}`}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#148B78] hover:text-[#C7A35A] transition-colors uppercase pt-3 border-t border-[#C7A35A]/15"
            >
              <span>{currentLang === 'de' ? 'E-Mail schreiben' : currentLang === 'pl' ? 'Napisz wiadomość' : 'Send an email'}</span>
              <Send className="h-3 w-3" />
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-5 flex flex-col justify-between hover:border-[#C7A35A] transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#080A09] border border-[#0F5C46]/50 text-[#C7A35A] mb-4">
                <Linkedin className="h-4 w-4" />
              </div>
              <span className="font-sans text-[10px] font-bold tracking-widest text-[#C7A35A] uppercase block">
                LINKEDIN
              </span>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-base sm:text-lg font-medium text-[#F4F1EA] hover:text-[#C7A35A] transition-colors truncate block mt-1"
              >
                in/natalia-stachowiak-0a8449306
              </a>
              <p className="text-xs text-[#A9AEA9] mt-1.5 leading-relaxed">
                {currentLang === 'de'
                  ? 'Professionelles Netzwerk, Produktideen & Austausch'
                  : currentLang === 'pl'
                  ? 'Sieć zawodowa, pomysły produktowe i wymiana myśli'
                  : 'Professional network, product ideas & exchange'}
              </p>
            </div>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#148B78] hover:text-[#C7A35A] transition-colors uppercase pt-3 border-t border-[#C7A35A]/15"
            >
              <span>{currentLang === 'de' ? 'Profil öffnen' : currentLang === 'pl' ? 'Zobacz profil' : 'View Profile'}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Location & Contact Details */}
          <div className="rounded-2xl border border-[#0F5C46]/40 bg-[#101412] p-5 flex flex-col justify-between hover:border-[#C7A35A] transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)] sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#080A09] border border-[#0F5C46]/50 text-[#C7A35A] mb-4">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="font-sans text-[10px] font-bold tracking-widest text-[#C7A35A] uppercase block">
                {currentLang === 'de' ? 'STANDORT & TELEFON' : currentLang === 'pl' ? 'LOKALIZACJA I TELEFON' : 'LOCATION & PHONE'}
              </span>
              <div className="font-serif text-base sm:text-lg font-medium text-[#F4F1EA] mt-1">
                {location}
              </div>
              <p className="text-xs text-[#A9AEA9] mt-1.5">
                {phone}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#C7A35A]/15 text-xs text-[#C7A35A]">
              {currentLang === 'de' ? 'Deutschlandweit / Remote / Hybrid' : currentLang === 'pl' ? 'Całe Niemcy / Zdalnie / Hybrydowo' : 'Germany-wide / Remote / Hybrid'}
            </div>
          </div>
        </div>

        {/* CV Download Strip */}
        <div className="relative z-10 overflow-hidden rounded-2xl border border-[#C7A35A]/30 bg-gradient-to-br from-[#101412] via-[#0E1512] to-[#0A0D0B] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#C7A35A]/50 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
          {/* Subtle Emerald Background Glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#0F5C46]/20 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 max-w-xl">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#080A09] border border-[#0F5C46]/50 text-[#C7A35A] shadow-inner">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F1EA] tracking-wide">
                  Lebenslauf
                </h3>
                <p className="text-xs sm:text-sm text-[#A9AEA9] leading-relaxed">
                  Kompakter Überblick über meinen beruflichen Weg, Qualifikationen und ausgewählte Projekte.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href={cvUrl}
                download="Natalia_Stachowiak_CV_grafisch.pdf"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-6 py-2.5 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] shadow-lg transition-all duration-200 hover:bg-[#148B78] hover:shadow-[0_0_20px_rgba(15,92,70,0.4)] uppercase cursor-pointer"
              >
                <Download className="h-4 w-4 text-[#C7A35A]" />
                <span>CV herunterladen</span>
              </a>

              <a
                href={absoluteCvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  setIsCvPreviewOpen(true);
                }}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C7A35A]/35 bg-transparent px-5 py-2.5 font-sans text-xs font-medium tracking-wider text-[#F4F1EA] transition-all duration-200 hover:border-[#C7A35A] hover:bg-[#101412] hover:text-[#C7A35A] uppercase cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#C7A35A]" />
                <span>Vorschau ansehen</span>
              </a>
            </div>
          </div>
        </div>

        {/* In-App Full 2-Page CV Preview Modal */}
        <CvPreviewModal
          isOpen={isCvPreviewOpen}
          currentLang={currentLang}
          onClose={() => setIsCvPreviewOpen(false)}
        />
      </div>
    </PageTransition>
  );
};
