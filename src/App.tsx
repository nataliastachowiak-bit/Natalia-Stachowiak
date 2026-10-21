import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CertificateItem, Language, MediaAssets, ProjectData } from './types';
import { getInitialMediaAssets, resetMediaAssets, saveMediaAssets, getProjectLinkKey } from './data/mediaConfig';
import { loadMediaFromDB, saveMediaItemToDB, clearMediaDB } from './data/dbStorage';
import { isEditModeActive } from './data/config';
import { audioEngine, SectionKey } from './utils/audioEngine';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AudioPlayerWidget } from './components/AudioPlayerWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { CircularTwinCaseStudyPage } from './pages/CircularTwinCaseStudyPage';
import { AiBuildingCaseStudyPage } from './pages/AiBuildingCaseStudyPage';
import { EcoMarginCaseStudyPage } from './pages/EcoMarginCaseStudyPage';
import { JourneyPage } from './pages/JourneyPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { BookPage } from './pages/BookPage';
import { ContactPage } from './pages/ContactPage';

// Modals
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { MediaUploadModal } from './components/MediaUploadModal';

// Route-based Audio Harmonizer
function AudioRouteSync() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      audioEngine.onSectionEnter('hero');
    } else if (path.startsWith('/about')) {
      audioEngine.onSectionEnter('about');
    } else if (path.startsWith('/projects')) {
      audioEngine.onSectionEnter('projects');
    } else if (path.startsWith('/journey') || path.startsWith('/certificates')) {
      audioEngine.onSectionEnter('experience');
    } else if (path.startsWith('/contact')) {
      audioEngine.onSectionEnter('contact');
    } else {
      audioEngine.onSectionEnter('hero');
    }
  }, [location.pathname]);

  return null;
}

// Conditional Footer: on desktop /journey, the section is strictly a 1-screen 100vh viewport without scrollbars
function ConditionalFooter({ currentLang }: { currentLang: Language }) {
  const location = useLocation();
  if (location.pathname === '/journey') {
    return (
      <div className="lg:hidden">
        <Footer currentLang={currentLang} />
      </div>
    );
  }
  return <Footer currentLang={currentLang} />;
}

export default function App() {
  // Published / Read-Only Mode: active when IS_PUBLISHED is true, unless overridden via ?edit=true
  const isReadOnly = !isEditModeActive();

  // Language State with LocalStorage Persistence
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('natalia_portfolio_lang');
    return (saved === 'en' || saved === 'pl' || saved === 'de') ? (saved as Language) : 'de';
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('natalia_portfolio_lang', lang);
  };

  // Sync HTML lang attribute and document title with currentLang
  useEffect(() => {
    document.documentElement.lang = currentLang;
    if (currentLang === 'de') {
      document.title = 'Natalia Stachowiak — Digital Product Management · AI · Digital Transformation';
    } else if (currentLang === 'pl') {
      document.title = 'Natalia Stachowiak — Cyfrowe Zarządzanie Produktem · AI · Transformacja Cyfrowa';
    } else {
      document.title = 'Natalia Stachowiak — Digital Product Management · AI · Digital Transformation';
    }
  }, [currentLang]);

  // Media Assets State with IndexedDB + LocalStorage Persistence
  const [mediaAssets, setMediaAssets] = useState<MediaAssets>(getInitialMediaAssets);

  useEffect(() => {
    loadMediaFromDB().then((dbAssets) => {
      setMediaAssets((prev) => {
        const merged = { ...prev };
        for (const [k, v] of Object.entries(dbAssets)) {
          if (typeof v === 'string' && v.trim() !== '') {
            (merged as any)[k] = v;
          }
        }
        return merged;
      });
    });
  }, []);

  const handleSaveAsset = (key: string, value: string) => {
    const updated = { ...mediaAssets, [key]: value };
    // Synchronize aliases so any reference finds the user's uploaded asset
    if (key === 'heroPortrait' || key === 'profilePhoto' || key === 'homeMainImage') {
      updated.heroPortrait = value;
      updated.profilePhoto = value;
      updated.homeMainImage = value;
    }
    if (key === 'aboutPortrait' || key === 'aboutPhoto' || key === 'aboutImage') {
      updated.aboutPortrait = value;
      updated.aboutPhoto = value;
      updated.aboutImage = value;
    }
    if (key === 'environixImage' || key === 'environixCover') {
      updated.environixImage = value;
      updated.environixCover = value;
    }
    if (key === 'circularTwinCover' || key === 'circularTwinImage' || key === 'circularTwinVision') {
      updated.circularTwinCover = value;
      updated.circularTwinImage = value;
      updated.circularTwinVision = value;
    }
    if (key === 'aiBuildingCover' || key === 'aiBuildingVision') {
      updated.aiBuildingCover = value;
      updated.aiBuildingVision = value;
    }
    setMediaAssets(updated);
    saveMediaAssets(updated);
    saveMediaItemToDB(key, value);
  };

  const handleResetAssets = () => {
    resetMediaAssets();
    clearMediaDB();
    setMediaAssets(getInitialMediaAssets());
  };

  // Modals State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mediaUploadModalKey, setMediaUploadModalKey] = useState<string | null>(null);

  // Trigger modal sound focus
  const isAnyModalOpen = Boolean(isVideoModalOpen || mediaUploadModalKey);
  useEffect(() => {
    if (isAnyModalOpen) {
      audioEngine.onSectionEnter('modal');
    }
  }, [isAnyModalOpen]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AudioRouteSync />

      <div className="min-h-screen bg-[#080A09] text-[#F4F1EA] selection:bg-[#0F5C46] selection:text-[#C7A35A] flex flex-col justify-between">
        
        {/* Sticky Global Multi-Page Navigation Bar */}
        <Navbar
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onManageMediaClick={() => setMediaUploadModalKey('heroPortrait')}
          isReadOnly={isReadOnly}
        />

        {/* Client-Side Multi-Page Routes */}
        <main className="flex-grow flex flex-col">
          <Routes>
            {/* 1. HOME: Route / */}
            <Route
              path="/"
              element={
                <HomePage
                  currentLang={currentLang}
                  mediaAssets={mediaAssets}
                  onUploadMedia={(key) => setMediaUploadModalKey(key)}
                  onEditProjectLink={(proj) => setMediaUploadModalKey(getProjectLinkKey(proj.id))}
                  isReadOnly={isReadOnly}
                />
              }
            />

            {/* 2. ABOUT: Route /about */}
            <Route
              path="/about"
              element={
                <AboutPage
                  currentLang={currentLang}
                  mediaAssets={mediaAssets}
                  onUploadMedia={(key) => setMediaUploadModalKey(key)}
                  isReadOnly={isReadOnly}
                />
              }
            />

            {/* 3. PROJECTS: Route /projects */}
            <Route
              path="/projects"
              element={
                <ProjectsPage
                  currentLang={currentLang}
                  mediaAssets={mediaAssets}
                  onUploadMedia={(key) => setMediaUploadModalKey(key)}
                  onEditProjectLink={(proj) => setMediaUploadModalKey(getProjectLinkKey(proj.id))}
                  isReadOnly={isReadOnly}
                />
              }
            />

            {/* 4. DEDICATED CIRCULARTWIN AI CASE STUDY: Route /projects/circulartwin-ai */}
            <Route
              path="/projects/circulartwin-ai"
              element={
                <CircularTwinCaseStudyPage
                  currentLang={currentLang}
                  mediaAssets={mediaAssets}
                />
              }
            />

            {/* 5. DEDICATED AI BUILDING CONCEPT CASE STUDY: Route /projects/ai-building-concept */}
            <Route
              path="/projects/ai-building-concept"
              element={
                <AiBuildingCaseStudyPage
                  currentLang={currentLang}
                  mediaAssets={mediaAssets}
                />
              }
            />
            <Route
              path="/projects/ai-building"
              element={<Navigate to="/projects/ai-building-concept" replace />}
            />

            {/* 6. DEDICATED ECOMARGIN AI CASE STUDY: Route /projects/ecomargin-ai */}
            <Route
              path="/projects/ecomargin-ai"
              element={
                <EcoMarginCaseStudyPage
                  currentLang={currentLang}
                  mediaAssets={mediaAssets}
                />
              }
            />
            <Route
              path="/projects/ecomargin"
              element={<Navigate to="/projects/ecomargin-ai" replace />}
            />

            {/* 7. INDIVIDUAL CASE STUDY PAGES: Route /projects/:slug */}
            <Route
              path="/projects/:slug"
              element={
                <CaseStudyPage
                  currentLang={currentLang}
                  mediaAssets={mediaAssets}
                  onUploadMedia={(key) => setMediaUploadModalKey(key)}
                  onEditProjectLink={(proj) => setMediaUploadModalKey(getProjectLinkKey(proj.id))}
                  onOpenVideoModal={() => setIsVideoModalOpen(true)}
                  isReadOnly={isReadOnly}
                />
              }
            />

            {/* 5. JOURNEY: Route /journey */}
            <Route
              path="/journey"
              element={
                <JourneyPage
                  currentLang={currentLang}
                />
              }
            />

            {/* 6. CERTIFICATES: Route /certificates */}
            <Route
              path="/certificates"
              element={<CertificatesPage currentLang={currentLang} />}
            />

            {/* 7. BOOK: Route /book */}
            <Route
              path="/book"
              element={<BookPage currentLang={currentLang} mediaAssets={mediaAssets} />}
            />

            {/* 8. CONTACT: Route /contact */}
            <Route
              path="/contact"
              element={
                <ContactPage
                  currentLang={currentLang}
                  mediaAssets={mediaAssets}
                />
              }
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer (auto-hidden on desktop /journey for 100vh 1-screen rule) */}
        <ConditionalFooter currentLang={currentLang} />

        {/* GLOBAL MODALS */}
        {/* street.life Video Modal */}
        <VideoPlayerModal
          isOpen={isVideoModalOpen}
          mediaAssets={mediaAssets}
          onClose={() => setIsVideoModalOpen(false)}
          onUploadMedia={(key) => setMediaUploadModalKey(key)}
          isReadOnly={isReadOnly}
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

        {/* Floating Ambient Audio Player */}
        <AudioPlayerWidget currentLang={currentLang} />

      </div>
    </BrowserRouter>
  );
}
