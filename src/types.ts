export interface Project {
  id: string;
  serial: string;
  title: string;
  category: "Simulation" | "Games";
  problem: string;
  challenge: string;
  solution: string;
  tech: string[];
  url?: string;
  metrics?: {
    label: string;
    before: number;
    after: number;
    unit: string;
  };
  architecture?: string[];
  role?: string;
  summary?: string;
  keyContributions?: string[];
  visualIdeas?: string[];
}

export interface TimelineEvent {
  period: string;
  role: string;
  company?: string;
  description: string;
  tags: string[];
  responsibilities?: string[];
  keyTakeaway?: string;
  focusAreas?: string[];
  isPromotionHighlight?: boolean;
  isSeniorHighlight?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; info: string }[];
}
