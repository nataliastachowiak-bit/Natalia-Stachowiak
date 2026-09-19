import React, { useState, useEffect } from 'react';
import { CertificateItem, Language, MediaAssets, ProjectData } from './types';
import { getInitialMediaAssets, resetMediaAssets, saveMediaAssets, getProjectLinkKey } from './data/mediaConfig';
import { loadMediaFromDB, saveMediaItemToDB, clearMediaDB } from './data/dbStorage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PersonalMottoBanner } from './components/PersonalMottoBanner';
import { SelectedWork } from './components/SelectedWork';
import { AboutSection } from './components/AboutSection';
import { ProductThinkingSection } from './components/ProductThinkingSection';
import { WhatIBringSection } from './components/WhatIBringSection';
import { CertificatesSection } from './components/CertificatesSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { JourneyDetailModal } from './components/JourneyDetailModal';
import { CertificateViewModal } from './components/CertificateViewModal';
import { CvModal } from './components/CvModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { MediaUploadModal } from './components/MediaUploadModal';

export default function App() {
  // Language State with LocalStorage Persistence
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('natalia_portfolio_lang');
    return (saved === 'en' || saved === 'pl' || saved === 'de') ? (saved as Language) : 'de';
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('natalia_portfolio_lang', lang);
  };

  // Media Assets State with IndexedDB + LocalStorage Persistence
  const [mediaAssets, setMediaAssets] = useState<MediaAssets>(getInitialMediaAssets);

  // Hydrate full assets (including photos & documents) from IndexedDB
  useEffect(() => {
    loadMediaFromDB().then((dbAssets) => {
      setMediaAssets((prev) => ({ ...prev, ...dbAssets }));
    });
  }, []);

  const handleSaveAsset = (key: string, value: string) => {
    const updated = { ...mediaAssets, [key]: value };
    setMediaAssets(updated);
    saveMediaAssets(updated);
    saveMediaItemToDB(key, value);
  };

  const handleResetAssets = () => {
    resetMediaAssets();
    clearMediaDB();
    setMediaAssets(getInitialMediaAssets());
  };

  // Active Navigation Observer
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'product-thinking', 'skills', 'certificates', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modals State
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedJourneyStation, setSelectedJourneyStation] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mediaUploadModalKey, setMediaUploadModalKey] = useState<string | null>(null);

  // Smooth scroll helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F5F1E8] selection:bg-[#0B5A4D] selection:text-[#C9A66B]">
      
      {/* Sticky Top Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onDownloadCvClick={() => setIsCvModalOpen(true)}
        onManageMediaClick={() => setMediaUploadModalKey('heroPortrait')}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 01: Hero Section */}
        <Hero
          currentLang={currentLang}
          mediaAssets={mediaAssets}
          onUploadMedia={(key) => setMediaUploadModalKey(key)}
          onExploreWorkClick={() => scrollToSection('projects')}
          onAboutMeClick={() => scrollToSection('about')}
        />

        {/* Leitsatz: Personal Motto Banner */}
        <PersonalMottoBanner currentLang={currentLang} />

        {/* 02: Selected Work (5 Project Cards) */}
        <SelectedWork
          currentLang={currentLang}
          mediaAssets={mediaAssets}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onUploadMedia={(key) => setMediaUploadModalKey(key)}
          onEditProjectLink={(proj) => setMediaUploadModalKey(getProjectLinkKey(proj.id))}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
        />

        {/* 03: Concentrated About & Journey Bento Grid (Matching Screenshot Layout) */}
        <AboutSection
          currentLang={currentLang}
          mediaAssets={mediaAssets}
          onSelectJourneyStation={(stationId) => setSelectedJourneyStation(stationId)}
          onUploadMedia={(key) => setMediaUploadModalKey(key)}
          onExploreSkillsClick={() => scrollToSection('skills')}
        />

        {/* 04: Product Thinking 5-Stage Process */}
        <ProductThinkingSection currentLang={currentLang} />

        {/* 05: What I Bring (6 Skill Cards) */}
        <WhatIBringSection currentLang={currentLang} />

        {/* 06: Certificates & Qualifications */}
        <CertificatesSection
          currentLang={currentLang}
          onViewCertificate={(cert) => setSelectedCert(cert)}
        />

        {/* 07: Academic Education */}
        <EducationSection currentLang={currentLang} />

        {/* 08: Contact & Connect */}
        <ContactSection
          currentLang={currentLang}
          mediaAssets={mediaAssets}
          onDownloadCvClick={() => setIsCvModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* MODALS */}
      {/* Project Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        currentLang={currentLang}
        mediaAssets={mediaAssets}
        onClose={() => setSelectedProject(null)}
        onUploadMedia={(key) => setMediaUploadModalKey(key)}
        onEditProjectLink={(proj) => setMediaUploadModalKey(getProjectLinkKey(proj.id))}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
      />

      {/* Journey Milestone Modal */}
      <JourneyDetailModal
        stationId={selectedJourneyStation}
        currentLang={currentLang}
        onClose={() => setSelectedJourneyStation(null)}
      />

      {/* Certificate Viewer Modal */}
      <CertificateViewModal
        cert={selectedCert}
        currentLang={currentLang}
        onClose={() => setSelectedCert(null)}
      />

      {/* CV Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        currentLang={currentLang}
        mediaAssets={mediaAssets}
        onClose={() => setIsCvModalOpen(false)}
        onUploadCv={(key) => setMediaUploadModalKey(key)}
      />

      {/* street.life Video Modal */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        mediaAssets={mediaAssets}
        onClose={() => setIsVideoModalOpen(false)}
        onUploadMedia={(key) => setMediaUploadModalKey(key)}
      />

      {/* Unified Media Asset Uploader Modal */}
      <MediaUploadModal
        isOpen={Boolean(mediaUploadModalKey)}
        targetKey={mediaUploadModalKey}
        mediaAssets={mediaAssets}
        onClose={() => setMediaUploadModalKey(null)}
        onSaveAsset={handleSaveAsset}
        onResetAssets={handleResetAssets}
      />

    </div>
  );
}
