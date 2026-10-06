import React, { useEffect, useState } from 'react';
import { X, Sparkles, BookOpen, Clock, Code, HelpCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { MissingSkill } from '../types';

interface SkillDetailModalProps {
  skill: MissingSkill | null;
  targetRole: string;
  onClose: () => void;
}

interface SkillExplanationData {
  skillName: string;
  oneLineSummary: string;
  whyRecruitersCare: string;
  mentalModel: string;
  quickStartExercise: string;
  weekendProjectIdea: string;
  top3InterviewQuestions: Array<{ q: string; conciseAnswer: string }>;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, targetRole, onClose }) => {
  const [data, setData] = useState<SkillExplanationData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!skill) {
      setData(null);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch('/api/explain-skill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skillName: skill.name,
        targetRole,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (isMounted && res.success && res.data) {
          setData(res.data);
        }
      })
      .catch(err => {
        console.error('Failed to load skill explanation:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [skill, targetRole]);

  if (!skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md px-6 py-5 border-b border-slate-800 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {skill.priority} Gap
              </span>
              <span className="text-xs text-slate-400">~{skill.estimatedHoursToLearn} Hours to Master</span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">{skill.name}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-xs text-slate-400">Consulting Career Architect on {skill.name}...</p>
            </div>
          ) : data ? (
            <>
              {/* One line summary & Mental model */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                    Concept in Simple Terms:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {data.oneLineSummary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    Mental Model:
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {data.mentalModel}
                  </p>
                </div>
              </div>

              {/* Why recruiters care */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Why Hiring Managers Test For This:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-amber-950/20 border border-amber-500/20 rounded-xl p-3">
                  {data.whyRecruitersCare}
                </p>
              </div>

              {/* Hands-on Tasks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-cyan-400 mb-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>30-Minute Quick Start:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {data.quickStartExercise}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 mb-1.5">
                    <Code className="w-3.5 h-3.5" />
                    <span>Weekend Proof Project:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {data.weekendProjectIdea}
                  </p>
                </div>
              </div>

              {/* Top 3 Interview Questions */}
              {data.top3InterviewQuestions && data.top3InterviewQuestions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                    Top Technical Interview Questions:
                  </h4>
                  <div className="space-y-2.5">
                    {data.top3InterviewQuestions.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                        <div className="font-semibold text-slate-200">
                          {idx + 1}. {item.q}
                        </div>
                        <div className="text-slate-400 text-[11px] leading-relaxed pt-1 border-t border-slate-800/60">
                          <strong className="text-indigo-400">Winning Answer:</strong> {item.conciseAnswer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-xs text-slate-400 text-center py-8">
              Could not load detailed skill breakdown.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900 px-6 py-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
