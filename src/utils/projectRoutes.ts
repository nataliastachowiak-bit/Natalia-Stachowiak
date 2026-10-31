import { ProjectData } from '../types';
import { PROJECTS } from '../data/portfolioData';

/**
 * Standard project slug mappings matching the required route specifications:
 * /projects/gain
 * /projects/streetlife
 * /projects/vinyl-ai
 * /projects/dine-ease
 * /projects/environix
 * /projects/du-bist-nicht-zu-viel
 */
export function getProjectSlug(idOrProject: string | ProjectData): string {
  const id = typeof idOrProject === 'string' ? idOrProject : idOrProject.id;
  switch (id) {
    case 'street-life':
      return 'streetlife';
    case 'vinyl':
      return 'vinyl-ai';
    case 'dine-ease':
      return 'dine-ease';
    case 'gain':
      return 'gain';
    case 'environix':
      return 'environix';
    case 'circulartwin-ai':
    case 'circulartwin':
      return 'circulartwin-ai';
    case 'ecomargin-ai':
    case 'ecomargin':
      return 'ecomargin-ai';
    case 'ai-building-concept':
    case 'ai-building':
    case 'building-ai':
      return 'ai-building-concept';
    case 'du-bist-nicht-zu-viel':
      return 'du-bist-nicht-zu-viel';
    case 'resourceloop-ai':
    case 'resourceloop':
      return 'resourceloop-ai';
    default:
      return id;
  }
}

export function getProjectPath(idOrProject: string | ProjectData): string {
  return `/projects/${getProjectSlug(idOrProject)}`;
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  const normalized = slug.toLowerCase().trim();
  
  if (normalized === 'gain') {
    return PROJECTS.find((p) => p.id === 'gain');
  }
  if (normalized === 'streetlife' || normalized === 'street-life') {
    return PROJECTS.find((p) => p.id === 'street-life');
  }
  if (normalized === 'vinyl-ai' || normalized === 'vinyl') {
    return PROJECTS.find((p) => p.id === 'vinyl');
  }
  if (normalized === 'dine-ease' || normalized === 'dineease') {
    return PROJECTS.find((p) => p.id === 'dine-ease');
  }
  if (normalized === 'environix' || normalized === 'environix-ai') {
    return PROJECTS.find((p) => p.id === 'environix');
  }
  if (normalized === 'circulartwin-ai' || normalized === 'circulartwin' || normalized === 'circular-twin-ai' || normalized === 'circular-twin') {
    return PROJECTS.find((p) => p.id === 'circulartwin-ai');
  }
  if (normalized === 'ecomargin-ai' || normalized === 'ecomargin') {
    return PROJECTS.find((p) => p.id === 'ecomargin-ai');
  }
  if (normalized === 'ai-building-concept' || normalized === 'ai-building' || normalized === 'building-ai') {
    return PROJECTS.find((p) => p.id === 'ai-building-concept');
  }
  if (normalized === 'du-bist-nicht-zu-viel' || normalized === 'book') {
    return PROJECTS.find((p) => p.id === 'du-bist-nicht-zu-viel');
  }

  return PROJECTS.find((p) => p.id === normalized);
}

// Ordered sequence for case study navigation: Previous / Next (Projects 01 to 08)
export const CASE_STUDY_SEQUENCE = [
  'environix',
  'ai-building-concept',
  'street-life',
  'circulartwin-ai',
  'gain',
  'vinyl',
  'dine-ease',
  'ecomargin-ai',
];

export function getPreviousProject(currentId: string): ProjectData {
  const index = CASE_STUDY_SEQUENCE.indexOf(currentId);
  const prevIndex = index <= 0 ? CASE_STUDY_SEQUENCE.length - 1 : index - 1;
  const prevId = CASE_STUDY_SEQUENCE[prevIndex];
  return PROJECTS.find((p) => p.id === prevId) || PROJECTS[0];
}

export function getNextProject(currentId: string): ProjectData {
  const index = CASE_STUDY_SEQUENCE.indexOf(currentId);
  const nextIndex = (index === -1 || index >= CASE_STUDY_SEQUENCE.length - 1) ? 0 : index + 1;
  const nextId = CASE_STUDY_SEQUENCE[nextIndex];
  return PROJECTS.find((p) => p.id === nextId) || PROJECTS[0];
}
