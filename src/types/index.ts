export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StudentSkill {
  name: string;
  level: ProficiencyLevel;
  category?: string;
}

export interface RoleSkillRequirement {
  name: string;
  category: 'Core Fundamentals' | 'Frameworks & Tools' | 'Production & DevOps' | 'Testing & Architecture';
  importance: 'Dealbreaker' | 'High' | 'Advantage';
  description: string;
  expectedLevel: ProficiencyLevel;
}

export interface BenchmarkRole {
  id: string;
  title: string;
  iconName: string;
  description: string;
  averageSalaryRange: string;
  demandRating: 'Very High' | 'High' | 'Growing';
  requiredSkills: RoleSkillRequirement[];
  recommendedProjects: string[];
}

export interface MatchedSkill {
  name: string;
  category: string;
  studentProficiency: ProficiencyLevel;
  industryExpectation: string;
  statusNote: string;
}

export interface MissingSkill {
  name: string;
  category: string;
  priority: 'Dealbreaker' | 'High' | 'Advantage';
  whyCompaniesDemand: string;
  estimatedHoursToLearn: number;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  typicalInterviewTrap: string;
}

export interface CategoryScore {
  category: string;
  score: number;
  feedback: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  handsOnDeliverable: string;
  recommendedResources: Array<{
    name: string;
    type: string;
    tip: string;
    url?: string;
  }>;
  interviewQuestion: string;
  keyAnswerTakeaway: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  weekSpan: string;
  theme: string;
  focusSkills: string[];
  actionMilestones: RoadmapMilestone[];
}

export interface CapstoneProject {
  title: string;
  tagline: string;
  description: string;
  mustHaveFeatures: string[];
  skillsDemonstrated: string[];
}

export interface GapAnalysisData {
  overallMatchScore: number;
  summaryHeadline: string;
  executiveSummary: string;
  categoryScores: CategoryScore[];
  matchedSkills: MatchedSkill[];
  missingSkills: MissingSkill[];
  marketInsights: {
    hiringDemandRating: string;
    topDifferentiator: string;
    commonStudentPitfall: string;
  };
  roadmapPhases: RoadmapPhase[];
  recommendedCapstoneProject: CapstoneProject;
}

export interface StudentProfilePreset {
  id: string;
  name: string;
  badge: string;
  targetRole: string;
  background: string;
  skills: StudentSkill[];
}
