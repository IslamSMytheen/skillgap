import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Flame,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Info,
  Clock,
  Briefcase,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Zap,
  Target
} from 'lucide-react';
import { GapAnalysisData, MissingSkill } from '../types';

interface AnalysisDashboardProps {
  analysis: GapAnalysisData;
  targetRole: string;
  targetLevel: string;
  projectedScore: number;
  onSelectSkillForDeepDive: (skill: MissingSkill) => void;
  onGoToRoadmap: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  analysis,
  targetRole,
  targetLevel,
  projectedScore,
  onSelectSkillForDeepDive,
  onGoToRoadmap,
}) => {
  const {
    overallMatchScore,
    summaryHeadline,
    executiveSummary,
    categoryScores = [],
    matchedSkills = [],
    missingSkills = [],
    marketInsights,
  } = analysis;

  // Split missing skills by priority
  const dealbreakers = missingSkills.filter(s => s.priority === 'Dealbreaker');
  const highPriority = missingSkills.filter(s => s.priority === 'High');
  const advantages = missingSkills.filter(s => s.priority === 'Advantage' || (!dealbreakers.includes(s) && !highPriority.includes(s)));

  const getScoreColor = (score: number) => {
    if (score >= 75) return { text: 'text-emerald-400', stroke: '#34d399', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    if (score >= 50) return { text: 'text-amber-400', stroke: '#fbbf24', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    return { text: 'text-rose-400', stroke: '#f43f5e', bg: 'bg-rose-500/10', border: 'border-rose-500/30' };
  };

  const scoreTheme = getScoreColor(overallMatchScore);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Match Percentage Dial Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-400" />
                Industry Skill Match
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {targetRole} ({targetLevel})
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1e293b"
                    strokeWidth="9"
                  />
                  {/* Active match stroke */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={scoreTheme.stroke}
                    strokeWidth="9"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - overallMatchScore / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Score text inside */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-4xl sm:text-5xl font-black tracking-tight ${scoreTheme.text}`}>
                    {overallMatchScore}%
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
                    Industry Match
                  </span>
                </div>
              </div>

              {/* Projected Growth Badge */}
              {projectedScore > overallMatchScore && (
                <div className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-pulse">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Projected with Roadmap: {projectedScore}% Ready</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <h3 className="text-sm font-bold text-white mb-1.5">{summaryHeadline}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{executiveSummary}</p>
          </div>
        </div>

        {/* Category Breakdown & Diagnostics */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart3Icon className="w-4 h-4 text-indigo-400" />
                Competency Domain Breakdown
              </h2>
              <span className="text-xs text-slate-400">
                {matchedSkills.length} Verified Skills · {missingSkills.length} Action Gaps
              </span>
            </div>

            {/* Category Progress Bars */}
            <div className="space-y-4 my-2">
              {categoryScores.map(cat => {
                const catTheme = getScoreColor(cat.score);
                return (
                  <div key={cat.category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{cat.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-slate-400 hidden sm:inline">{cat.feedback}</span>
                        <span className={`font-mono font-bold ${catTheme.text}`}>{cat.score}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${cat.score}%`,
                          backgroundColor: catTheme.stroke,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Market Insights Banner */}
          {marketInsights && (
            <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  Hiring Demand
                </div>
                <div className="text-xs font-semibold text-white">{marketInsights.hiringDemandRating}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 sm:col-span-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Top Differentiator for Interviews
                </div>
                <div className="text-xs text-slate-300 leading-snug">{marketInsights.topDifferentiator}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recruiter Reality Warning Box */}
      {dealbreakers.length > 0 && (
        <div className="rounded-2xl bg-rose-950/20 border border-rose-500/30 p-4 sm:p-5 flex items-start space-x-3.5">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-rose-200">
              The Recruiter Filter: {dealbreakers.length} Critical Dealbreaker Gaps Detected
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              When senior engineers and ATS screeners review student resumes, candidates lacking{' '}
              <strong className="text-white">
                {dealbreakers.map(d => d.name).slice(0, 3).join(', ')}
              </strong>{' '}
              are frequently sidelined before the phone screen, even with high GPA. These are prioritized in Phase 1 of your roadmap below.
            </p>
          </div>
        </div>
      )}

      {/* Missing Skills Deep Breakdown */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Zap className="w-4 h-4" />
              </span>
              Missing Skill Breakdown ({missingSkills.length} Areas)
            </h3>
            <p className="text-xs text-slate-400">
              Click any skill card to view quick 30-min exercises, weekend project ideas, and interview questions.
            </p>
          </div>

          <button
            onClick={onGoToRoadmap}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-950"
          >
            <span>Open Step-by-Step Study Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Section: Dealbreaker Skills */}
        {dealbreakers.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Dealbreakers (Must Master to Pass Resume Screens)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {dealbreakers.map(skill => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  priorityBadge="bg-rose-500/20 text-rose-300 border-rose-500/40"
                  onDeepDive={() => onSelectSkillForDeepDive(skill)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section: High Priority Skills */}
        {highPriority.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>High Priority (Core Day-to-Day Stack Requirements)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {highPriority.map(skill => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  priorityBadge="bg-amber-500/20 text-amber-300 border-amber-500/40"
                  onDeepDive={() => onSelectSkillForDeepDive(skill)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section: Advantage / Differentiator Skills */}
        {advantages.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Competitive Advantage (Sets You Apart From Other Grads)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {advantages.map(skill => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  priorityBadge="bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                  onDeepDive={() => onSelectSkillForDeepDive(skill)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Matched Skills Foundation Section */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Your Matched Skills ({matchedSkills.length})
          </h3>
          <span className="text-xs text-slate-400">Foundation you can already leverage</span>
        </div>

        {matchedSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {matchedSkills.map(matched => (
              <div
                key={matched.name}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">{matched.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {matched.studentProficiency}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2">{matched.industryExpectation}</div>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 italic">{matched.statusNote}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-500 text-center py-4">
            No exact matches found with the selected benchmark. Check your known skills list or try another role.
          </div>
        )}
      </div>

      {/* Bottom Roadmap Teaser CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 border border-indigo-800/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="text-base font-bold text-white">Ready to close the gap?</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            We generated a personalized milestone-by-milestone roadmap with hands-on projects, key concepts, curated resources, and interview flashcards.
          </p>
        </div>
        <button
          onClick={onGoToRoadmap}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center space-x-2 transition shrink-0 shadow-lg shadow-emerald-950"
        >
          <span>View Study Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Skill Card Subcomponent
interface SkillCardProps {
  skill: MissingSkill;
  priorityBadge: string;
  onDeepDive: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, priorityBadge, onDeepDive }) => {
  return (
    <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="font-bold text-sm text-white group-hover:text-indigo-300 transition">
            {skill.name}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${priorityBadge}`}>
            {skill.priority}
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          {skill.whyCompaniesDemand}
        </p>

        {skill.typicalInterviewTrap && (
          <div className="text-[11px] text-amber-300/90 bg-amber-950/30 border border-amber-500/20 rounded-lg p-2 mb-3">
            <span className="font-bold">Interview Trap:</span> {skill.typicalInterviewTrap}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px]">
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            ~{skill.estimatedHoursToLearn} hrs
          </span>
          <span>·</span>
          <span>{skill.difficulty}</span>
        </div>

        <button
          onClick={onDeepDive}
          className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1 transition"
        >
          <span>Deep Dive</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const BarChart3Icon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);
