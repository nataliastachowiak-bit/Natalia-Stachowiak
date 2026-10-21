import React from 'react';
import { Mail, Linkedin, Phone, MapPin, Send, ArrowUpRight, Download, ExternalLink } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { PageTransition } from '../components/PageTransition';
import { BackToPortfolio } from '../components/BackToPortfolio';
import { CV_FILE } from '../data/assetRegistry';

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
              ? 'Offen für spannende Möglichkeiten im IT- & KI-Produktmanagement, innovative Initiativen und fundierten Fachaustausch.'
              : currentLang === 'pl'
              ? 'Otwarta na nowe możliwości w zarządzaniu produktami IT i AI, innowacyjne inicjatywy oraz wymianę doświadczeń.'
              : 'Open for opportunities in IT & AI Product Management, innovative projects, and professional exchange.'}
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
        <div className="relative z-10 rounded-2xl border border-[#C7A35A]/30 bg-[#101412] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
          <div className="space-y-1">
            <span className="font-sans text-[10px] font-bold tracking-widest text-[#C7A35A] uppercase block">
              {currentLang === 'de' ? 'TABELLARISCHER LEBENSLAUF (CV)' : currentLang === 'pl' ? 'ŻYCIORYS ZAWODOWY (CV)' : 'CURRICULUM VITAE (CV)'}
            </span>
            <p className="text-sm text-[#F4F1EA] font-medium font-mono">
              Natalia_Stachowiak_CV_grafisch_FINAL_2026.pdf
            </p>
            <p className="text-xs text-[#A9AEA9]">
              {currentLang === 'de'
                ? 'Originale 2-seitige grafische PDF mit Case Studies, My Journey & Qualifikationen'
                : currentLang === 'pl'
                ? 'Oryginalny 2-stronicowy graficzny plik PDF z Case Studies, My Journey i kwalifikacjami'
                : 'Original 2-page graphical PDF with Case Studies, My Journey & Qualifications'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#C7A35A]/60 bg-transparent px-5 py-2.5 font-sans text-xs font-semibold tracking-wider text-[#F4F1EA] transition-all hover:bg-[#101412] hover:text-[#C7A35A] uppercase"
            >
              <ExternalLink className="h-4 w-4 text-[#C7A35A]" />
              <span>
                {currentLang === 'de' ? 'Vorschau ↗' : currentLang === 'pl' ? 'Podgląd ↗' : 'Preview ↗'}
              </span>
            </a>

            <a
              href={cvUrl}
              download="Natalia_Stachowiak_CV_grafisch_FINAL_2026.pdf"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-6 py-2.5 font-sans text-xs font-semibold tracking-wider text-white shadow-lg transition-all hover:bg-[#148B78] uppercase"
            >
              <Download className="h-4 w-4 text-[#C7A35A]" />
              <span>CV herunterladen</span>
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
