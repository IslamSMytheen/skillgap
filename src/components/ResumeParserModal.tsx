import React, { useState } from 'react';
import { X, Sparkles, FileText, Check, Plus, AlertCircle } from 'lucide-react';
import { StudentSkill, ProficiencyLevel } from '../types';

interface ResumeParserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkills: (skills: StudentSkill[]) => void;
}

export const ResumeParserModal: React.FC<ResumeParserModalProps> = ({ isOpen, onClose, onAddSkills }) => {
  const [text, setText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [extractedList, setExtractedList] = useState<Array<{ name: string; selected: boolean; level: ProficiencyLevel }>>([]);
  const [hasParsed, setHasParsed] = useState(false);

  if (!isOpen) return null;

  const handleParse = async () => {
    if (!text.trim()) return;
    setIsParsing(true);
    setHasParsed(false);

    try {
      const res = await fetch('/api/extract-skills-from-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type: 'resume' }),
      });
      const data = await res.json();
      if (data.success && data.data && data.data.skills) {
        setExtractedList(
          data.data.skills.map((s: any) => ({
            name: s.name,
            selected: true,
            level: 'Intermediate',
          }))
        );
        setHasParsed(true);
      }
    } catch (e) {
      console.error('Failed to extract skills:', e);
    } finally {
      setIsParsing(false);
    }
  };

  const handleToggleSelect = (index: number) => {
    setExtractedList(prev =>
      prev.map((item, i) => (i === index ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleApply = () => {
    const toAdd: StudentSkill[] = extractedList
      .filter(i => i.selected)
      .map(i => ({ name: i.name, level: i.level }));
    onAddSkills(toAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md px-6 py-5 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Extract Skills from Resume or Syllabus</h2>
              <p className="text-xs text-slate-400">Paste your resume content to populate your profile in seconds</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Resume Text, LinkedIn Summary, or Course Syllabus:
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste plain text here... E.g.
'Projects: Developed fullstack inventory tracker using React, Node.js, Express, and MongoDB. Used Git for version control. Coursework: Data Structures in Java, Operating Systems, Database Management Systems...'"
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleParse}
              disabled={isParsing || !text.trim()}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
                isParsing || !text.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {isParsing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Extracting Skills...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Scan & Identify Skills</span>
                </>
              )}
            </button>
          </div>

          {/* Results list */}
          {hasParsed && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Identified Skills ({extractedList.length}):</span>
                <span className="text-slate-400">Select which to import</span>
              </div>

              {extractedList.length > 0 ? (
                <div className="max-h-48 overflow-y-auto space-y-1.5 p-1">
                  {extractedList.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleToggleSelect(idx)}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                        item.selected
                          ? 'bg-indigo-950/40 border-indigo-500 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                            item.selected ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-slate-700'
                          }`}
                        >
                          {item.selected && <Check className="w-3 h-3" />}
                        </div>
                        <span className="font-semibold">{item.name}</span>
                      </div>

                      <select
                        value={item.level}
                        onChange={e => {
                          e.stopPropagation();
                          const val = e.target.value as ProficiencyLevel;
                          setExtractedList(prev => prev.map((it, i) => (i === idx ? { ...it, level: val } : it)));
                        }}
                        className="bg-slate-900 text-[10px] rounded px-1.5 py-0.5 border border-slate-700 text-slate-300"
                        onClick={e => e.stopPropagation()}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No skills recognized in this text. Try pasting key project bullet points.</p>
              )}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-slate-900 px-6 py-4 border-t border-slate-800 flex justify-between items-center">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition">
            Cancel
          </button>
          {hasParsed && extractedList.length > 0 && (
            <button
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Import {extractedList.filter(i => i.selected).length} Skills</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
