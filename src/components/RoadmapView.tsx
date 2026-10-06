import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  BookOpen,
  Code,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  Printer,
  ExternalLink,
  Flame,
  Check
} from 'lucide-react';
import { GapAnalysisData, RoadmapMilestone, RoadmapPhase } from '../types';

interface RoadmapViewProps {
  analysis: GapAnalysisData;
  targetRole: string;
  targetLevel: string;
  completedMilestones: string[];
  setCompletedMilestones: React.Dispatch<React.SetStateAction<string[]>>;
  projectedScore: number;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  analysis,
  targetRole,
  targetLevel,
  completedMilestones,
  setCompletedMilestones,
  projectedScore,
}) => {
  const { roadmapPhases = [], recommendedCapstoneProject, overallMatchScore } = analysis;
  const [expandedInterviewQuestions, setExpandedInterviewQuestions] = useState<Record<string, boolean>>({});
  const [copiedToast, setCopiedToast] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');

  // Count total milestones
  const allMilestoneIds = roadmapPhases.flatMap(p => p.actionMilestones.map(m => m.id));
  const totalMilestoneCount = allMilestoneIds.length || 1;
  const completedCount = completedMilestones.length;
  const completionPercent = Math.round((completedCount / totalMilestoneCount) * 100);

  const handleToggleMilestone = (milestoneId: string) => {
    const isAlreadyCompleted = completedMilestones.includes(milestoneId);
    let nextList: string[];
    if (isAlreadyCompleted) {
      nextList = completedMilestones.filter(id => id !== milestoneId);
    } else {
      nextList = [...completedMilestones, milestoneId];
      // Celebrate with confetti!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#6366f1', '#38bdf8', '#fbbf24'],
      });
    }
    setCompletedMilestones(nextList);
    try {
      localStorage.setItem(`skillgap_completed_${targetRole}`, JSON.stringify(nextList));
    } catch (e) {
      // storage quota or disabled
    }
  };

  const toggleInterviewQuestion = (id: string) => {
    setExpandedInterviewQuestions(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExportMarkdown = () => {
    let md = `# The Skill Gap Study Roadmap: ${targetRole} (${targetLevel})\n\n`;
    md += `**Initial Skill Match**: ${overallMatchScore}%\n`;
    md += `**Projected Match**: ${projectedScore}%\n`;
    md += `**Diagnosis**: ${analysis.summaryHeadline}\n\n`;
    md += `## Market Insights\n`;
    md += `- Hiring Demand: ${analysis.marketInsights?.hiringDemandRating}\n`;
    md += `- Key Differentiator: ${analysis.marketInsights?.topDifferentiator}\n`;
    md += `- Common Pitfall: ${analysis.marketInsights?.commonStudentPitfall}\n\n`;

    roadmapPhases.forEach(phase => {
      md += `## Phase ${phase.phaseNumber}: ${phase.title} (${phase.weekSpan})\n`;
      md += `*Theme: ${phase.theme}*\n\n`;
      phase.actionMilestones.forEach(m => {
        const isDone = completedMilestones.includes(m.id) ? '[x]' : '[ ]';
        md += `### ${isDone} ${m.title} (~${m.estimatedHours} hrs)\n`;
        md += `${m.description}\n\n`;
        md += `**Hands-on Deliverable**:\n- ${m.handsOnDeliverable}\n\n`;
        md += `**Recommended Resources**:\n`;
        m.recommendedResources?.forEach(r => {
          md += `- [${r.type}] ${r.name} - *${r.tip}*\n`;
        });
        md += `\n**Interview Prep**:\n`;
        md += `> Q: ${m.interviewQuestion}\n`;
        md += `> Key Takeaway: ${m.keyAnswerTakeaway}\n\n`;
      });
    });

    if (recommendedCapstoneProject) {
      md += `## Recommended Capstone Portfolio Project\n`;
      md += `### ${recommendedCapstoneProject.title}\n`;
      md += `${recommendedCapstoneProject.tagline}\n\n`;
      md += `${recommendedCapstoneProject.description}\n\n`;
      md += `**Key Features to Implement**:\n`;
      recommendedCapstoneProject.mustHaveFeatures?.forEach(f => {
        md += `- [ ] ${f}\n`;
      });
    }

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillGap_Roadmap_${targetRole.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyClipboard = () => {
    let text = `THE SKILL GAP ROADMAP: ${targetRole}\n`;
    text += `Match Score: ${overallMatchScore}% -> Target: ${projectedScore}%\n\n`;
    roadmapPhases.forEach(p => {
      text += `[${p.weekSpan}] Phase ${p.phaseNumber}: ${p.title}\n`;
      p.actionMilestones.forEach(m => {
        const check = completedMilestones.includes(m.id) ? '✓' : '○';
        text += `  ${check} ${m.title} (${m.estimatedHours}h): ${m.handsOnDeliverable}\n`;
      });
    });
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Roadmap Header Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Personalized Career Bridge Plan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Action Roadmap for {targetRole}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Every milestone below bridges a verified missing gap. Check items off as you learn and code to watch your
              interview readiness score rise toward 100%.
            </p>
          </div>

          {/* Progress & Projected Readiness Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shrink-0 min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">Projected Skill Match</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {projectedScore}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden my-1">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(overallMatchScore, projectedScore))}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>{completedCount} of {totalMilestoneCount} Milestones Done</span>
              <span className="font-semibold text-emerald-400">{completionPercent}%</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                filterMode === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({totalMilestoneCount})
            </button>
            <button
              onClick={() => setFilterMode('pending')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                filterMode === 'pending' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Remaining ({totalMilestoneCount - completedCount})
            </button>
            <button
              onClick={() => setFilterMode('completed')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                filterMode === 'completed' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyClipboard}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              title="Copy to clipboard"
            >
              {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedToast ? 'Copied!' : 'Copy Plan'}</span>
            </button>

            <button
              onClick={handleExportMarkdown}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
              title="Download as clean Markdown file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .md</span>
            </button>
          </div>
        </div>
      </div>

      {/* Phased Roadmap Timeline */}
      <div className="space-y-8">
        {roadmapPhases.map((phase, phaseIdx) => {
          // Filter milestones
          const filteredMilestones = phase.actionMilestones.filter(m => {
            const isDone = completedMilestones.includes(m.id);
            if (filterMode === 'pending') return !isDone;
            if (filterMode === 'completed') return isDone;
            return true;
          });

          if (filteredMilestones.length === 0 && filterMode !== 'all') {
            return null;
          }

          return (
            <div
              key={phase.phaseNumber}
              className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl"
            >
              {/* Phase Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    <span>Phase {phase.phaseNumber}</span>
                    <span>·</span>
                    <span className="text-slate-400">{phase.weekSpan}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{phase.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">{phase.theme}</p>
                </div>

                {/* Focus skills chips */}
                {phase.focusSkills && phase.focusSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:max-w-xs justify-start sm:justify-end">
                    {phase.focusSkills.map(skill => (
                      <span
                        key={skill}
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-indigo-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Milestones in this phase */}
              <div className="space-y-4 mt-6">
                {filteredMilestones.map(milestone => {
                  const isDone = completedMilestones.includes(milestone.id);
                  const isQOpen = expandedInterviewQuestions[milestone.id];

                  return (
                    <div
                      key={milestone.id}
                      className={`rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-slate-950/40 border-emerald-500/30'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          {/* Checkbox & Title */}
                          <div className="flex items-start space-x-3.5 flex-1">
                            <button
                              onClick={() => handleToggleMilestone(milestone.id)}
                              className={`mt-0.5 p-1 rounded-lg transition shrink-0 ${
                                isDone
                                  ? 'text-emerald-400 bg-emerald-500/20'
                                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                              }`}
                              title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>

                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4
                                  className={`font-bold text-sm ${
                                    isDone ? 'line-through text-slate-400' : 'text-white'
                                  }`}
                                >
                                  {milestone.title}
                                </h4>
                                <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />
                                  ~{milestone.estimatedHours} hrs
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed">{milestone.description}</p>
                            </div>
                          </div>
                        </div>

                        {/* Hands-on Deliverable */}
                        <div className="mt-4 pt-3.5 border-t border-slate-900/90 bg-slate-900/40 rounded-xl p-3 border border-slate-800/60">
                          <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 mb-1">
                            <Code className="w-3.5 h-3.5" />
                            <span>Hands-On Proof Deliverable:</span>
                          </div>
                          <p className="text-xs text-slate-300 font-mono text-[11px] leading-relaxed">
                            {milestone.handsOnDeliverable}
                          </p>
                        </div>

                        {/* Recommended Resources */}
                        {milestone.recommendedResources && milestone.recommendedResources.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {milestone.recommendedResources.map((res, idx) => (
                              <div
                                key={idx}
                                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                              >
                                <span className="text-[9px] uppercase font-bold px-1 py-0.2 rounded bg-indigo-950 text-indigo-400 border border-indigo-500/20">
                                  {res.type}
                                </span>
                                <span className="font-medium text-slate-200">{res.name}</span>
                                {res.tip && <span className="text-slate-500 italic hidden md:inline">({res.tip})</span>}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Interview Flashcard Toggle */}
                        {milestone.interviewQuestion && (
                          <div className="mt-4 pt-3 border-t border-slate-800/60">
                            <button
                              onClick={() => toggleInterviewQuestion(milestone.id)}
                              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1.5 transition"
                            >
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span>Test Yourself: Typical Interview Question</span>
                              {isQOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>

                            {isQOpen && (
                              <div className="mt-2 p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs space-y-2 animate-fadeIn">
                                <div className="font-semibold text-amber-200">
                                  Q: {milestone.interviewQuestion}
                                </div>
                                <div className="text-slate-300 leading-relaxed pt-1 border-t border-amber-500/10 text-[11px]">
                                  <strong className="text-amber-400">Key Takeaway for Candidates:</strong>{' '}
                                  {milestone.keyAnswerTakeaway}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Capstone Project Showcase Card */}
      {recommendedCapstoneProject && (
        <div className="rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Capstone Portfolio Differentiator</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">{recommendedCapstoneProject.title}</h3>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 font-medium">{recommendedCapstoneProject.tagline}</p>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed max-w-3xl">
            {recommendedCapstoneProject.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-indigo-900/60">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Must-Have Production Features:
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {recommendedCapstoneProject.mustHaveFeatures?.map((feat, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Skills Demonstrated on Your Resume:
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {recommendedCapstoneProject.skillsDemonstrated?.map((sk, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-900/60 text-indigo-200 border border-indigo-500/30 font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
