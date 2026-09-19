import React from 'react';
import { Mail, Download, Linkedin, ArrowUpRight, Instagram, Globe, FileText } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { translations } from '../data/translations';
import { BotanicalDecoration } from './BotanicalDecoration';

interface ContactSectionProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onDownloadCvClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  mediaAssets,
  onDownloadCvClick,
}) => {
  const t = translations[currentLang].contact;

  const professionalNetworks = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      title: 'Natalia Stachowiak auf LinkedIn',
      url: mediaAssets.linkedinUrl || 'https://www.linkedin.com/in/natalia-stachowiak-pm',
      icon: <Linkedin className="h-4 w-4 text-[#C9A66B]" />,
      badge: 'Profile',
    },
    {
      id: 'email',
      label: 'E-Mail',
      title: 'Direkte Nachricht via E-Mail',
      url: `mailto:${t.emailAddress || 'wsb.natalia@gmail.com'}`,
      icon: <Mail className="h-4 w-4 text-[#C9A66B]" />,
      badge: 'Direct',
    },
    {
      id: 'instagram',
      label: 'Instagram · Buch',
      title: 'Buchprojekt & Community @frau_en_power2026',
      url: mediaAssets.duBistNichtZuVielUrl || 'https://www.instagram.com/frau_en_power2026/',
      icon: <Instagram className="h-4 w-4 text-[#C9A66B]" />,
      badge: 'Author',
    },
    {
      id: 'gain',
      label: 'GAIN Web-App',
      title: 'Live Web-App & Netflix Innovation',
      url: mediaAssets.gainAppUrl || 'https://natflixgain.base44.app',
      icon: <Globe className="h-4 w-4 text-[#C9A66B]" />,
      badge: 'Live App',
    },
    {
      id: 'cv',
      label: 'Curriculum Vitae',
      title: 'Vollständiger tabellarischer Lebenslauf',
      url: mediaAssets.cvPdfUrl || '#',
      onClick: (e: React.MouseEvent) => {
        if (!mediaAssets.cvPdfUrl) {
          e.preventDefault();
          onDownloadCvClick();
        }
      },
      icon: <FileText className="h-4 w-4 text-[#C9A66B]" />,
      badge: 'CV (PDF)',
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#080B09] py-20 lg:py-28"
    >
      {/* Background Ambience */}
      <BotanicalDecoration position="bottom-right" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#0B5A4D]/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* Tag */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9A66B]" />
          <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A66B] uppercase">
            {t.label}
          </span>
        </div>

        {/* Big Serif Headline */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F5F1E8]">
          {t.headline}
        </h2>

        {/* Body */}
        <p className="mt-6 font-sans text-base sm:text-lg leading-relaxed text-[#B9C4BD] max-w-2xl mx-auto">
          {t.body || t.subline}
        </p>

        {/* Email Address Prominently Displayed */}
        <div className="mt-8">
          <a
            href={`mailto:${t.emailAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-2xl border border-[#C9A66B]/50 bg-gradient-to-r from-[#063F35]/50 via-[#080B09] to-[#063F35]/50 px-6 py-4 shadow-[0_10px_30px_rgba(11,90,77,0.3)] transition-all duration-300 hover:border-[#C9A66B] hover:shadow-[0_0_35px_rgba(201,166,107,0.35)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A66B] bg-[#0B5A4D]/40 text-[#C9A66B] group-hover:scale-110">
              <Mail className="h-5 w-5" />
            </div>
            <span className="font-serif text-lg sm:text-2xl font-medium tracking-wide text-[#F5F1E8] group-hover:text-[#C9A66B]">
              {t.emailAddress}
            </span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Write Email Button */}
          <a
            href={`mailto:${t.emailAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#C9A66B] bg-[#0B5A4D] px-7 py-3.5 font-sans text-xs font-semibold tracking-wider text-white shadow-lg transition-all hover:bg-[#148B78] hover:border-white uppercase"
          >
            <Mail className="h-4 w-4 text-[#C9A66B]" />
            <span>{t.emailBtn || t.sendEmail || 'E-Mail schreiben'}</span>
          </a>

          {/* Download CV Button */}
          <button
            type="button"
            onClick={onDownloadCvClick}
            className="flex items-center gap-2 rounded-full border border-[#C9A66B]/70 bg-[#080B09] px-7 py-3.5 font-sans text-xs font-semibold tracking-wider text-[#F5F1E8] shadow-lg transition-all hover:border-[#C9A66B] hover:bg-[#063F35]/30 uppercase"
          >
            <Download className="h-4 w-4 text-[#C9A66B]" />
            <span>{t.cvBtn || t.downloadCv || 'CV herunterladen'}</span>
          </button>

          {/* LinkedIn Profile Direct Link */}
          <a
            href={mediaAssets.linkedinUrl || 'https://www.linkedin.com/in/natalia-stachowiak-pm'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#C9A66B]/40 bg-[#080B09] px-6 py-3.5 font-sans text-xs font-medium tracking-wider text-[#B9C4BD] transition-all hover:border-[#C9A66B] hover:text-[#F5F1E8] uppercase"
          >
            <Linkedin className="h-4 w-4 text-[#C9A66B]" />
            <span>{t.linkedin || 'LinkedIn'}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#C9A66B]" />
          </a>
        </div>

        {/* Floating Social Media & Professional Network Bar */}
        <div className="sticky bottom-6 z-40 mx-auto mt-14 flex max-w-fit items-center justify-center px-2">
          <div
            id="floating-social-bar"
            aria-label="Floating Social Media & Professional Networks Bar"
            className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#C9A66B]/50 bg-[#080B09]/95 p-1.5 px-3 shadow-[0_12px_35px_rgba(6,63,53,0.65),0_0_25px_rgba(201,166,107,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-[#C9A66B] hover:shadow-[0_16px_45px_rgba(201,166,107,0.25)] sm:gap-2 sm:px-4 sm:py-2"
          >
            {/* Live Indicator Pill */}
            <div className="hidden sm:flex items-center gap-2 pr-2.5 border-r border-[#C9A66B]/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#148B78] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#148B78]" />
              </span>
              <span className="font-sans text-[10px] font-bold tracking-widest text-[#C9A66B] uppercase">
                Networks
              </span>
            </div>

            {/* Network Links (All open in a new tab) */}
            {professionalNetworks.map((net) => (
              <a
                key={net.id}
                href={net.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={net.onClick}
                title={`${net.title} (öffnet in neuem Tab)`}
                aria-label={`${net.label} – öffnet in neuem Tab`}
                className="group flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1.5 text-xs font-medium text-[#F5F1E8] transition-all duration-200 hover:border-[#C9A66B]/60 hover:bg-[#063F35]/60 hover:text-[#C9A66B] hover:shadow-[0_0_12px_rgba(201,166,107,0.2)]"
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {net.icon}
                </span>
                <span className="whitespace-nowrap text-[11px] sm:text-xs">
                  {net.label}
                </span>
                <ArrowUpRight className="h-3 w-3 text-[#C9A66B]/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C9A66B]" />
              </a>
            ))}
          </div>
        </div>

        {/* Handwritten Accent */}
        <div className="mt-10 text-center font-['Caveat',cursive] text-3xl font-semibold text-[#C9A66B] rotate-[-2deg]">
          {t.scriptConnect}
        </div>

      </div>
    </section>
  );
};
