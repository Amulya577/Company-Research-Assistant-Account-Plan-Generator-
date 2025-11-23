export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: Source[];
  timestamp: number;
}

export interface Source {
  title: string;
  uri: string;
}

export enum ResearchStatus {
  IDLE = 'IDLE',
  RESEARCHING = 'RESEARCHING',
  GENERATING_PLAN = 'GENERATING_PLAN',
  UPDATING_SECTION = 'UPDATING_SECTION'
}

export interface HistoryItem {
  id: number;
  title: string;
  date: string;
}

// --- Detailed Account Plan Structure ---

export interface BasicProfile {
  name: string;
  website: string;
  headquarters: string;
  foundedYear: string;
  founders: string[];
  industry: string;
  subIndustry: string;
  companyType: string;
  size: string;
  stockTicker?: string;
}

export interface Financials {
  revenue: string;
  growth: string;
  fundingRounds: string;
  majorInvestors: string[];
  keyMarkets: string[];
  mainProducts: string[];
  customerSegments: string[];
}

export interface Strategy {
  vision: string;
  strategicPriorities: string[];
  challenges: string[];
  competition: string;
  risks: string[];
  opportunities: string[];
}

export interface Culture {
  summary: string;
  values: string[];
  workModel: string; // Remote/Hybrid/Onsite
  employeeSentiment: string;
  leadership: KeyPerson[];
}

export interface Technology {
  techStackOverview: string;
  languages: string[];
  cloudProviders: string[];
  databases: string[];
  devOpsTools: string[];
  securityStandards: string[];
}

export interface History {
  timeline: string; // Short history/pivots
  recentNews: string[]; // Last 6-12 months
  previousVsCurrentStrategy: string;
}

export interface Relationship {
  status: string; // Prospect, Active, etc.
  engagementNotes: string;
  nextSteps: string[];
}

export interface Metadata {
  dataSources: string[];
  lastUpdated: string;
  confidenceScore: string;
  tags: string[];
}

export interface KeyPerson {
  name: string;
  title: string;
  roleSummary?: string;
}

export interface AccountPlan {
  profile: BasicProfile;
  financials: Financials;
  strategy: Strategy;
  culture: Culture;
  technology: Technology;
  history: History;
  relationship: Relationship;
  metadata: Metadata;
}

// Helper to determine which top-level key we are editing
export type SectionKey = keyof AccountPlan;