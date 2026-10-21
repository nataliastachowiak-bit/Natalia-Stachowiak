import React from 'react';
import { Mail, Linkedin, ArrowUpRight, Instagram, Globe } from 'lucide-react';
import { Language, MediaAssets } from '../types';
import { translations } from '../data/translations';
import { BotanicalDecoration } from './BotanicalDecoration';

interface ContactSectionProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  mediaAssets,
}) => {
  const t = translations[currentLang].contact;

  const professionalNetworks = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      title: 'Natalia Stachowiak auf LinkedIn',
      url: mediaAssets.linkedinUrl || 'https://www.linkedin.com/in/natalia-stachowiak-0a8449306',
      icon: <Linkedin className="h-4 w-4 text-[#C7A35A]" />,
      badge: 'Profile',
    },
    {
      id: 'email',
      label: 'E-Mail',
      title: 'Direkte Nachricht via E-Mail',
      url: `mailto:${t.emailAddress || 'wsb.natalia@gmail.com'}`,
      icon: <Mail className="h-4 w-4 text-[#C7A35A]" />,
      badge: 'Direct',
    },
    {
      id: 'instagram',
      label: 'Instagram · Buch',
      title: 'Buchprojekt & Community @frau_en_power2026',
      url: mediaAssets.duBistNichtZuVielUrl || 'https://www.instagram.com/frau_en_power2026/',
      icon: <Instagram className="h-4 w-4 text-[#C7A35A]" />,
      badge: 'Author',
    },
    {
      id: 'gain',
      label: 'GAIN Web-App',
      title: 'Live Web-App & Netflix Innovation',
      url: mediaAssets.gainAppUrl || 'https://natflixgain.base44.app',
      icon: <Globe className="h-4 w-4 text-[#C7A35A]" />,
      badge: 'Live App',
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#080B09] py-20 lg:py-28"
    >
      {/* Background Ambience */}
      <BotanicalDecoration position="bottom-right" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#0F5C46]/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* Tag */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35A]" />
          <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C7A35A] uppercase">
            {t.label}
          </span>
        </div>

        {/* Big Serif Headline */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F4F1EA]">
          {t.headline}
        </h2>

        {/* Body */}
        <p className="mt-6 font-sans text-base sm:text-lg leading-relaxed text-[#A9AEA9] max-w-2xl mx-auto">
          {t.body || t.subline}
        </p>

        {/* Email Address Prominently Displayed */}
        <div className="mt-8 px-2">
          <a
            href={`mailto:${t.emailAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex max-w-full items-center gap-3 rounded-2xl border border-[#C7A35A]/50 bg-gradient-to-r from-[#101412]/50 via-[#080B09] to-[#101412]/50 px-4 sm:px-6 py-3.5 sm:py-4 shadow-[0_10px_30px_rgba(11,90,77,0.3)] transition-all duration-300 hover:border-[#C7A35A] hover:shadow-[0_0_35px_rgba(201,166,107,0.35)]"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-[#C7A35A] bg-[#0F5C46]/40 text-[#C7A35A] group-hover:scale-110">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="font-serif text-base sm:text-2xl font-medium tracking-wide text-[#F4F1EA] group-hover:text-[#C7A35A] break-all sm:break-normal">
              {t.emailAddress}
            </span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
          {/* Write Email Button */}
          <a
            href={`mailto:${t.emailAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C7A35A] bg-[#0F5C46] px-6 sm:px-7 py-3.5 font-sans text-xs font-semibold tracking-wider text-white shadow-lg transition-all hover:bg-[#148B78] hover:border-white uppercase active:scale-98"
          >
            <Mail className="h-4 w-4 text-[#C7A35A]" />
            <span>{t.emailBtn || t.sendEmail || 'E-Mail schreiben'}</span>
          </a>

          {/* LinkedIn Profile Direct Link */}
          <a
            href={mediaAssets.linkedinUrl || 'https://www.linkedin.com/in/natalia-stachowiak-0a8449306'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C7A35A]/40 bg-[#080B09] px-6 py-3.5 font-sans text-xs font-medium tracking-wider text-[#A9AEA9] transition-all hover:border-[#C7A35A] hover:text-[#F4F1EA] uppercase active:scale-98"
          >
            <Linkedin className="h-4 w-4 text-[#C7A35A]" />
            <span>{t.linkedin || 'LinkedIn'}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#C7A35A]" />
          </a>
        </div>

        {/* Floating Social Media & Professional Network Bar */}
        <div className="sticky bottom-6 z-40 mx-auto mt-14 flex max-w-fit items-center justify-center px-2">
          <div
            id="floating-social-bar"
            aria-label="Floating Social Media & Professional Networks Bar"
            className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#C7A35A]/50 bg-[#080B09]/95 p-1.5 px-3 shadow-[0_12px_35px_rgba(6,63,53,0.65),0_0_25px_rgba(201,166,107,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-[#C7A35A] hover:shadow-[0_16px_45px_rgba(201,166,107,0.25)] sm:gap-2 sm:px-4 sm:py-2"
          >
            {/* Live Indicator Pill */}
            <div className="hidden sm:flex items-center gap-2 pr-2.5 border-r border-[#C7A35A]/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#148B78] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#148B78]" />
              </span>
              <span className="font-sans text-[10px] font-bold tracking-widest text-[#C7A35A] uppercase">
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
                title={`${net.title} (öffnet in neuem Tab)`}
                aria-label={`${net.label} – öffnet in neuem Tab`}
                className="group flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1.5 text-xs font-medium text-[#F4F1EA] transition-all duration-200 hover:border-[#C7A35A]/60 hover:bg-[#101412]/60 hover:text-[#C7A35A] hover:shadow-[0_0_12px_rgba(201,166,107,0.2)]"
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {net.icon}
                </span>
                <span className="whitespace-nowrap text-[11px] sm:text-xs">
                  {net.label}
                </span>
                <ArrowUpRight className="h-3 w-3 text-[#C7A35A]/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C7A35A]" />
              </a>
            ))}
          </div>
        </div>

        {/* Handwritten Accent */}
        <div className="mt-10 text-center font-['Caveat',cursive] text-3xl font-semibold text-[#C7A35A] rotate-[-2deg]">
          {t.scriptConnect}
        </div>

      </div>
    </section>
  );
};
