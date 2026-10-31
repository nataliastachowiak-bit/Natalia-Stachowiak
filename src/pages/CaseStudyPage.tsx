import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { Language, MediaAssets, ProjectData } from '../types';
import { getProjectBySlug, getPreviousProject, getNextProject, getProjectPath } from '../utils/projectRoutes';
import { ProjectHero } from '../components/ProjectHero';
import { CaseStudySection } from '../components/CaseStudySection';
import { CircularTwinCaseStudyPage } from './CircularTwinCaseStudyPage';
import { AiBuildingCaseStudyPage } from './AiBuildingCaseStudyPage';
import { EcoMarginCaseStudyPage } from './EcoMarginCaseStudyPage';
import { PageTransition } from '../components/PageTransition';
import { CaseStudyBottomNav } from '../components/CaseStudyBottomNav';

interface CaseStudyPageProps {
  currentLang: Language;
  mediaAssets: MediaAssets;
  onUploadMedia?: (key: string) => void;
  onEditProjectLink?: (project: ProjectData) => void;
  onOpenVideoModal?: () => void;
  isReadOnly?: boolean;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({
  currentLang,
  mediaAssets,
  onUploadMedia,
  onEditProjectLink,
  onOpenVideoModal,
  isReadOnly = false,
}) => {
  const { slug } = useParams<{ slug: string }>();
  
  if (slug === 'circulartwin-ai' || slug === 'circulartwin') {
    return <CircularTwinCaseStudyPage currentLang={currentLang} mediaAssets={mediaAssets} />;
  }

  if (slug === 'ai-building-concept' || slug === 'ai-building' || slug === 'building-ai') {
    return <AiBuildingCaseStudyPage currentLang={currentLang} mediaAssets={mediaAssets} />;
  }

  if (slug === 'ecomargin-ai' || slug === 'ecomargin') {
    return <EcoMarginCaseStudyPage currentLang={currentLang} mediaAssets={mediaAssets} />;
  }

  if (slug === 'resourceloop-ai' || slug === 'resourceloop') {
    return <Navigate to="/projects#resourceloop" replace />;
  }

  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const prevProject = getPreviousProject(project.id);
  const nextProject = getNextProject(project.id);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#080A09]">
        
        {/* 1. Case Study Hero Section */}
        <ProjectHero
          project={project}
          currentLang={currentLang}
          mediaAssets={mediaAssets}
          onUploadMedia={onUploadMedia}
          onEditProjectLink={onEditProjectLink}
          onOpenVideoModal={onOpenVideoModal}
          isReadOnly={isReadOnly}
        />

        {/* 2. Structured PM Case Study Body */}
        <CaseStudySection
          project={project}
          currentLang={currentLang}
        />

        {/* 3. Bottom Project Navigation: ALLE CASE STUDIES | NÄCHSTES PROJEKT */}
        <CaseStudyBottomNav
          currentLang={currentLang}
          allProjectsUrl="/projects"
          nextProjectUrl={getProjectPath(nextProject)}
          nextProjectTitle={nextProject.name}
          prevProjectUrl={getProjectPath(prevProject)}
          prevProjectTitle={prevProject.name}
        />

      </div>
    </PageTransition>
  );
};
