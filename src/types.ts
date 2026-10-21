export type Language = 'de' | 'en' | 'pl';

export interface ProjectData {
  id: string;
  number: string;
  name: string;
  title: string;
  subtitle: string;
  category?: string;
  description: {
    de: string;
    en: string;
    pl: string;
  };
  tags: string[];
  mediaKey: string;
  accentColor?: string;
  externalAppUrl?: string;
  prototypeUrl?: string;
  videoUrl?: string;
  instagramUrl?: string;
  pdfUrl?: string;
  pdfFileName?: string;
  isExternalOnly?: boolean;
  projectTypeBadge?: { de: string; en: string; pl: string };
  caseStudy: {
    problem: { de: string; en: string; pl: string };
    userNeeds?: { de: string; en: string; pl: string };
    hypothesesAndDecisions?: { de: string; en: string; pl: string };
    solution: { de: string; en: string; pl: string };
    successMetrics?: { de: string; en: string; pl: string };
    transparencyNote?: { de: string; en: string; pl: string };
    research?: { de: string; en: string; pl: string };
    jtbd?: { de: string; en: string; pl: string };
    painPoints?: { de: string; en: string; pl: string }[];
    howMightWe?: { de: string; en: string; pl: string };
    customerJourney?: { step: string; desc: { de: string; en: string; pl: string } }[];
    coreFeatures?: { title: string; desc: { de: string; en: string; pl: string } }[];
    prototype?: { de: string; en: string; pl: string };
    usabilityTesting?: { de: string; en: string; pl: string };
    mvp?: { de: string; en: string; pl: string };
    learnings: { de: string; en: string; pl: string };
    nextSteps?: { de: string; en: string; pl: string };
  };
}

export interface JourneyMilestone {
  id: string;
  title: { de: string; en: string; pl: string };
  degreeOrRole: { de: string; en: string; pl: string };
  iconType: 'chemistry' | 'nature' | 'briefcase' | 'palette' | 'cpu' | 'target';
  statusHighlight?: { de: string; en: string; pl: string };
  details: {
    companyOrInstitution: string;
    period: string;
    description: { de: string; en: string; pl: string };
    responsibilities?: string[];
    learningsAndResults?: string[];
  };
}

export interface SkillCategory {
  number: string;
  title: { de: string; en: string; pl: string };
  skills: string[];
}

export type CertificateCategory = 'PRODUCT_MANAGEMENT' | 'AGILE_SCRUM' | 'DESIGN_THINKING' | 'AI' | 'ACADEMIC_ENVIRONMENT';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  issueDate?: string;
  category: CertificateCategory;
  status: 'COMPLETED' | 'IN_PROGRESS';
  credentialId?: string;
  verificationUrl?: string;
  signatory?: string;
  courseCode?: string;
  focus?: string;
  skillsAcquired?: string[];
  mediaKey?: string;
  pdfUrl?: string;
  titleI18n?: { de: string; en: string; pl: string };
  issuerI18n?: { de: string; en: string; pl: string };
  focusI18n?: { de: string; en: string; pl: string };
}

export interface MediaAssets {
  heroPortrait: string;
  aboutPortrait: string;
  gainImage: string;
  gainAppUrl?: string;
  streetLifeImage: string;
  streetLifeVideo: string;
  streetLifeVideoUrl?: string;
  streetLifeAppUrl?: string;
  fanPulsePrototypeUrl: string;
  vinylImage: string;
  vinylAppUrl: string;
  dineEaseImage: string;
  dineEaseAppUrl?: string;
  dineEasePrototypeUrl: string;
  duBistNichtZuVielUrl?: string;
  bookCover: string;
  instagramQr: string;
  cvPdfUrl?: string;
  cvPage1?: string;
  cvPage2?: string;
  linkedinUrl: string;
  [key: string]: string | undefined;
}
