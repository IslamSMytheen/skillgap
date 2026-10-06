import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Monitor,
  Cloud,
  BarChart3,
  Shield,
  Smartphone,
  Server,
  Sparkles,
  Plus,
  X,
  Clock,
  Calendar,
  Briefcase,
  BookOpen,
  ArrowRight,
  UserCheck,
  FileText,
  Check,
  HelpCircle
} from 'lucide-react';
import { BenchmarkRole, ProficiencyLevel, StudentSkill } from '../types';
import { BENCHMARK_ROLES } from '../data/benchmarkRoles';
import { SAMPLE_STUDENT_PROFILES } from '../data/sampleProfiles';

interface SkillInputSectionProps {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  targetLevel: string;
  setTargetLevel: (level: string) => void;
  customJobDesc: string;
  setCustomJobDesc: (desc: string) => void;
  useCustomJD: boolean;
  setUseCustomJD: (val: boolean) => void;
  timelineWeeks: number;
  setTimelineWeeks: (weeks: number) => void;
  hoursPerWeek: number;
  setHoursPerWeek: (hours: number) => void;
  studentSkills: StudentSkill[];
  setStudentSkills: React.Dispatch<React.SetStateAction<StudentSkill[]>>;
  studentBackground: string;
  setStudentBackground: (bg: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onOpenResumeModal: () => void;
}

export const SkillInputSection: React.FC<SkillInputSectionProps> = ({
  selectedRole,
  setSelectedRole,
  targetLevel,
  setTargetLevel,
  customJobDesc,
  setCustomJobDesc,
  useCustomJD,
  setUseCustomJD,
  timelineWeeks,
  setTimelineWeeks,
  hoursPerWeek,
  setHoursPerWeek,
  studentSkills,
  setStudentSkills,
  studentBackground,
  setStudentBackground,
  onAnalyze,
  isAnalyzing,
  onOpenResumeModal,
}) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<ProficiencyLevel>('Intermediate');

  const currentRoleData = BENCHMARK_ROLES.find(r => r.title === selectedRole) || BENCHMARK_ROLES[0];

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const trimmed = newSkillName.trim();
    if (!studentSkills.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) {
      setStudentSkills(prev => [...prev, { name: trimmed, level: newSkillLevel }]);
    }
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillNameToRemove: string) => {
    setStudentSkills(prev => prev.filter(s => s.name.toLowerCase() !== skillNameToRemove.toLowerCase()));
  };

  const handleSkillLevelChange = (skillName: string, level: ProficiencyLevel) => {
    setStudentSkills(prev =>
      prev.map(s => (s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, level } : s))
    );
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = SAMPLE_STUDENT_PROFILES.find(p => p.id === presetId);
    if (!preset) return;
    setSelectedRole(preset.targetRole);
    setStudentSkills(preset.skills);
    setStudentBackground(preset.background);
    setUseCustomJD(false);
  };

  const handleToggleRecommendedSkill = (skillName: string) => {
    const exists = studentSkills.some(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (exists) {
      handleRemoveSkill(skillName);
    } else {
      setStudentSkills(prev => [...prev, { name: skillName, level: 'Beginner' }]);
    }
  };

  // Helper to render role icons
  const renderRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-blue-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-emerald-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-rose-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'Server': return <Server className="w-5 h-5 text-orange-400" />;
      default: return <Briefcase className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target vs. Reality Skill Diagnostics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Stop Guessing What to Learn. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              Map Exactly Where You Fall Short.
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Academic courses and online tutorials teach general syntax, but employers hire for production reliability,
            testing, containerization, and system architecture. Enter what you currently know, pick your dream role, and get
            your realistic match score with a step-by-step roadmap.
          </p>

          {/* Quick preset selector */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                Quick Test Drive (Load Sample Student):
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_STUDENT_PROFILES.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500/50 transition flex items-center space-x-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>{preset.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Target Career & Level */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                1
              </span>
              Target Role & Benchmark
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose from industry benchmarks or paste an exact job description.
            </p>
          </div>

          <button
            onClick={() => setUseCustomJD(!useCustomJD)}
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
          >
            {useCustomJD ? 'Back to Benchmark Roles' : 'Paste Specific Job Posting instead'}
          </button>
        </div>

        {!useCustomJD ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {BENCHMARK_ROLES.map(role => {
                const isSelected = selectedRole === role.title;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.title)}
                    className={`text-left p-4 rounded-xl border transition-all relative ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md shadow-indigo-950/50'
                        : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        {renderRoleIcon(role.iconName)}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {role.demandRating} Demand
                      </span>
                    </div>
                    <div className="font-semibold text-sm text-white">{role.title}</div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-2">{role.description}</div>
                    <div className="mt-3 text-[11px] font-medium text-emerald-400/90">
                      Avg: {role.averageSalaryRange}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Pasted Job Description or Custom Role Requirements:
              </label>
              <span className="text-[11px] text-slate-500">LinkedIn / Indeed / Handshake posting</span>
            </div>
            <textarea
              value={customJobDesc}
              onChange={e => setCustomJobDesc(e.target.value)}
              placeholder="Paste the full job posting requirements and responsibilities here... The Skill Gap will extract and analyze every required tech stack item, qualification, and soft expectation."
              rows={6}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono text-xs leading-relaxed"
            />
          </div>
        )}

        {/* Level & Availability Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Target Level
            </label>
            <select
              value={targetLevel}
              onChange={e => setTargetLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Intern / Junior">Intern / Junior (Entry Level)</option>
              <option value="Associate / Early Career">Associate (1-2 Years)</option>
              <option value="Mid-Level">Mid-Level (Solid Autonomy)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Study Timeline</span>
              <span className="text-indigo-400 font-mono">{timelineWeeks} Weeks</span>
            </div>
            <input
              type="range"
              min={4}
              max={16}
              step={2}
              value={timelineWeeks}
              onChange={e => setTimelineWeeks(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Fast (4w)</span>
              <span>Balanced (8w)</span>
              <span>Comprehensive (16w)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Hours per Week</span>
              <span className="text-emerald-400 font-mono">{hoursPerWeek} hrs/week</span>
            </div>
            <input
              type="range"
              min={5}
              max={35}
              step={5}
              value={hoursPerWeek}
              onChange={e => setHoursPerWeek(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Light (5h)</span>
              <span>Part-time (15h)</span>
              <span>Bootcamp (35h)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: What You Already Know (Student Skills) */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                2
              </span>
              Your Current Known Skills ({studentSkills.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add languages, libraries, tools, and courses you have learned or built projects with.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Import from Resume / Syllabus</span>
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            value={newSkillName}
            onChange={e => setNewSkillName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
            placeholder="Type a skill e.g. Python, React, SQL, Git, Docker, Spring Boot..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <select
            value={newSkillLevel}
            onChange={e => setNewSkillLevel(e.target.value as ProficiencyLevel)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="Beginner">Beginner (Tutorials / Intro)</option>
            <option value="Intermediate">Intermediate (Built Projects)</option>
            <option value="Advanced">Advanced (Confident / Deep)</option>
          </select>

          <button
            onClick={handleAddSkill}
            className="inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Student's Current Skills Badges */}
        {studentSkills.length > 0 ? (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-400">Your Active Skill Inventory:</div>
            <div className="flex flex-wrap gap-2.5">
              {studentSkills.map(skill => {
                const levelColor =
                  skill.level === 'Advanced'
                    ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                    : skill.level === 'Intermediate'
                    ? 'bg-indigo-950/50 text-indigo-300 border-indigo-500/40'
                    : 'bg-amber-950/50 text-amber-300 border-amber-500/40';

                return (
                  <div
                    key={skill.name}
                    className={`inline-flex items-center space-x-2 pl-3 pr-2 py-1.5 rounded-xl border text-xs font-medium ${levelColor}`}
                  >
                    <span>{skill.name}</span>

                    {/* Level dropdown */}
                    <select
                      value={skill.level}
                      onChange={e => handleSkillLevelChange(skill.name, e.target.value as ProficiencyLevel)}
                      className="bg-slate-900/90 text-[10px] font-semibold rounded px-1.5 py-0.5 border border-slate-700/60 focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>

                    <button
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
            No skills entered yet. Type skills above, or click a Quick Test Drive preset at the top of the page.
          </div>
        )}

        {/* Quick-add suggestions from target role benchmark */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="text-xs font-medium text-slate-400 mb-2.5 flex items-center justify-between">
            <span>Frequently required for {selectedRole} (Click to toggle):</span>
            <span className="text-[11px] text-slate-500">Green = Added</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentRoleData.requiredSkills.map(req => {
              const isAdded = studentSkills.some(s => s.name.toLowerCase() === req.name.toLowerCase());
              return (
                <button
                  key={req.name}
                  onClick={() => handleToggleRecommendedSkill(req.name)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition flex items-center space-x-1.5 ${
                    isAdded
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-semibold'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  {isAdded ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3 text-slate-500" />}
                  <span>{req.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Student Background & Coursework Context */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Optional Academic Background / Major / Projects Notes:
          </label>
          <input
            type="text"
            value={studentBackground}
            onChange={e => setStudentBackground(e.target.value)}
            placeholder="e.g. 3rd year CS major, built a bookstore web app with basic SQLite, completed OS and algorithms courses."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex flex-col items-center justify-center space-y-3 pt-2">
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || studentSkills.length === 0}
          className={`w-full max-w-md py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center space-x-3 shadow-xl transition-all transform hover:-translate-y-0.5 ${
            isAnalyzing || studentSkills.length === 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white shadow-indigo-600/30'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Skill Gap Against Industry Benchmarks...</span>
            </>
          ) : (
            <>
              <span>Calculate Skill Match & Generate Roadmap</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
        {studentSkills.length === 0 && (
          <p className="text-xs text-amber-400/80">
            Please add at least 1 skill or click a test drive preset above to calculate your gap score.
          </p>
        )}
      </div>
    </div>
  );
};
