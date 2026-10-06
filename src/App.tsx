import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SkillInputSection } from './components/SkillInputSection';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { RoadmapView } from './components/RoadmapView';
import { SkillDetailModal } from './components/SkillDetailModal';
import { ResumeParserModal } from './components/ResumeParserModal';
import { GapAnalysisData, MissingSkill, StudentSkill } from './types';
import { SAMPLE_STUDENT_PROFILES } from './data/sampleProfiles';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'input' | 'dashboard' | 'roadmap'>('input');

  // Input states initialized with a thoughtful default student profile
  const defaultProfile = SAMPLE_STUDENT_PROFILES[0];
  const [selectedRole, setSelectedRole] = useState<string>(defaultProfile.targetRole);
  const [targetLevel, setTargetLevel] = useState<string>('Intern / Junior');
  const [customJobDesc, setCustomJobDesc] = useState<string>('');
  const [useCustomJD, setUseCustomJD] = useState<boolean>(false);
  const [timelineWeeks, setTimelineWeeks] = useState<number>(8);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(15);
  const [studentSkills, setStudentSkills] = useState<StudentSkill[]>(defaultProfile.skills);
  const [studentBackground, setStudentBackground] = useState<string>(defaultProfile.background);

  // Analysis state
  const [analysis, setAnalysis] = useState<GapAnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Roadmap milestone completion state
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);

  // Modals state
  const [selectedSkillForDeepDive, setSelectedSkillForDeepDive] = useState<MissingSkill | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Load saved completed milestones from localStorage when role changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`skillgap_completed_${selectedRole}`);
      if (saved) {
        setCompletedMilestones(JSON.parse(saved));
      } else {
        setCompletedMilestones([]);
      }
    } catch {
      setCompletedMilestones([]);
    }
  }, [selectedRole]);

  // Handle analysis call
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: useCustomJD ? 'Custom Job Description' : selectedRole,
          targetLevel,
          customJobDescription: useCustomJD ? customJobDesc : undefined,
          studentSkills,
          studentBackground,
          timelineWeeks,
          hoursPerWeek,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setAnalysis(json.data);
        setCurrentTab('dashboard');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('Analysis failed:', json.error);
      }
    } catch (err) {
      console.error('Error contacting analysis API:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run initial analysis automatically on mount with default profile so the user immediately gets a full experience!
  useEffect(() => {
    handleRunAnalysis();
  }, []);

  // Calculate dynamic projected score
  const calculateProjectedScore = (): number => {
    if (!analysis) return 0;
    const baseScore = analysis.overallMatchScore;
    const allMilestones = analysis.roadmapPhases?.flatMap(p => p.actionMilestones) || [];
    const totalMilestones = allMilestones.length;
    if (totalMilestones === 0) return baseScore;

    const completedCount = completedMilestones.length;
    const remainingPotential = 98 - baseScore;
    const addedScore = Math.round((completedCount / totalMilestones) * remainingPotential);
    return Math.min(98, baseScore + addedScore);
  };

  const projectedScore = calculateProjectedScore();

  const handleAddExtractedSkills = (newSkills: StudentSkill[]) => {
    setStudentSkills(prev => {
      const existingNames = new Set(prev.map(s => s.name.toLowerCase()));
      const filtered = newSkills.filter(s => !existingNames.has(s.name.toLowerCase()));
      return [...prev, ...filtered];
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        hasAnalysis={!!analysis}
        matchScore={analysis?.overallMatchScore}
        projectedScore={projectedScore}
        targetRole={selectedRole}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'input' && (
          <SkillInputSection
            selectedRole={selectedRole}
            setSelectedRole={role => {
              setSelectedRole(role);
              setAnalysis(null);
            }}
            targetLevel={targetLevel}
            setTargetLevel={setTargetLevel}
            customJobDesc={customJobDesc}
            setCustomJobDesc={setCustomJobDesc}
            useCustomJD={useCustomJD}
            setUseCustomJD={setUseCustomJD}
            timelineWeeks={timelineWeeks}
            setTimelineWeeks={setTimelineWeeks}
            hoursPerWeek={hoursPerWeek}
            setHoursPerWeek={setHoursPerWeek}
            studentSkills={studentSkills}
            setStudentSkills={setStudentSkills}
            studentBackground={studentBackground}
            setStudentBackground={setStudentBackground}
            onAnalyze={handleRunAnalysis}
            isAnalyzing={isAnalyzing}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
          />
        )}

        {currentTab === 'dashboard' && analysis && (
          <AnalysisDashboard
            analysis={analysis}
            targetRole={selectedRole}
            targetLevel={targetLevel}
            projectedScore={projectedScore}
            onSelectSkillForDeepDive={skill => setSelectedSkillForDeepDive(skill)}
            onGoToRoadmap={() => setCurrentTab('roadmap')}
          />
        )}

        {currentTab === 'roadmap' && analysis && (
          <RoadmapView
            analysis={analysis}
            targetRole={selectedRole}
            targetLevel={targetLevel}
            completedMilestones={completedMilestones}
            setCompletedMilestones={setCompletedMilestones}
            projectedScore={projectedScore}
          />
        )}
      </main>

      {/* Modals */}
      <SkillDetailModal
        skill={selectedSkillForDeepDive}
        targetRole={selectedRole}
        onClose={() => setSelectedSkillForDeepDive(null)}
      />

      <ResumeParserModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onAddSkills={handleAddExtractedSkills}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>The Skill Gap · Built with Google AI Studio & Gemini</span>
          <span className="text-slate-600">
            Real industry requirements mapped to academic and self-taught learner profiles
          </span>
        </div>
      </footer>
    </div>
  );
}
