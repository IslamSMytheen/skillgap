import React from 'react';
import { Target, Compass, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentTab: 'input' | 'dashboard' | 'roadmap';
  setCurrentTab: (tab: 'input' | 'dashboard' | 'roadmap') => void;
  hasAnalysis: boolean;
  matchScore?: number;
  projectedScore?: number;
  targetRole: string;
  onOpenResumeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  hasAnalysis,
  matchScore,
  projectedScore,
  targetRole,
  onOpenResumeModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('input')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Target className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  The Skill Gap
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Career Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Mapping student knowledge against real-world industry demands
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setCurrentTab('input')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentTab === 'input'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Configure & Skills</span>
            </button>

            <button
              onClick={() => hasAnalysis && setCurrentTab('dashboard')}
              disabled={!hasAnalysis}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                !hasAnalysis
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : currentTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Target className="h-4 w-4" />
              <span>Gap Analysis</span>
              {hasAnalysis && matchScore !== undefined && (
                <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-slate-800 font-bold text-indigo-300 border border-indigo-400/30">
                  {matchScore}%
                </span>
              )}
            </button>

            <button
              onClick={() => hasAnalysis && setCurrentTab('roadmap')}
              disabled={!hasAnalysis}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                !hasAnalysis
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : currentTab === 'roadmap'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Study Roadmap</span>
              {hasAnalysis && projectedScore !== undefined && projectedScore > (matchScore || 0) && (
                <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-emerald-950 font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  {projectedScore}%
                </span>
              )}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenResumeModal}
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 transition"
              title="Parse resume text to quickly populate your known skills"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Scan Resume</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
