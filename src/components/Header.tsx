import React, { useState } from 'react';
import { Chapter, StudyMode } from '../types/quiz';
import {
  CheckCircle2,
  Download,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileCheck2,
  ChevronDown,
  Layers,
  Trophy,
  Award,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  chapters: Chapter[];
  activeChapter: Chapter;
  onSelectChapter: (chapterId: string) => void;
  studyMode: StudyMode;
  onToggleStudyMode: (mode: StudyMode) => void;
  onOpenExportImport: () => void;
  onResetChapter: () => void;
  lastSavedAt: string;
  totalAnsweredOverall: number;
  totalQuestionsOverall: number;
  totalCorrectOverall: number;
}

export const Header: React.FC<HeaderProps> = ({
  chapters,
  activeChapter,
  onSelectChapter,
  studyMode,
  onToggleStudyMode,
  onOpenExportImport,
  onResetChapter,
  lastSavedAt,
  totalAnsweredOverall,
  totalQuestionsOverall,
  totalCorrectOverall,
}) => {
  const [showChapterMenu, setShowChapterMenu] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  const formattedTime = new Date(lastSavedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const isFinaleActive = activeChapter.id === 'at-finale' || activeChapter.code === 'FINALE';

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            {/* Left: Branding & Chapter Dropdown */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 flex-shrink-0">
                <FileCheck2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/50">
                    CPA Reviewer
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Auto-saved {formattedTime}
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                  The Ultimate AT Reviewer
                </h1>
              </div>

              {/* Chapter Selector Dropdown */}
              <div className="relative ml-2 sm:ml-4">
                <button
                  type="button"
                  onClick={() => setShowChapterMenu(!showChapterMenu)}
                  className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-sm border ${
                    isFinaleActive
                      ? 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                      : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-100'
                  }`}
                  aria-expanded={showChapterMenu}
                >
                  {isFinaleActive ? (
                    <Trophy className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Layers className="w-4 h-4 text-indigo-400" />
                  )}
                  <span className="truncate max-w-[130px] sm:max-w-[200px]">
                    {activeChapter.code}: {activeChapter.title}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showChapterMenu ? 'rotate-180' : ''}`} />
                </button>

                {showChapterMenu && (
                  <div
                    className="absolute left-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl z-50 overflow-hidden divide-y divide-slate-700/60 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setShowChapterMenu(false)}
                  >
                    <div className="p-3 bg-slate-900 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Select Chapter ({chapters.length} Modules)
                      </p>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {totalQuestionsOverall} Total Questions
                      </span>
                    </div>
                    <div className="max-h-80 overflow-y-auto p-1.5 space-y-1">
                      {chapters.map((ch) => {
                        const isCurrent = ch.id === activeChapter.id;
                        const isChFinale = ch.id === 'at-finale' || ch.code === 'FINALE';

                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => {
                              onSelectChapter(ch.id);
                              setShowChapterMenu(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${
                              isCurrent
                                ? isChFinale
                                  ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 font-semibold'
                                  : 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 font-semibold'
                                : isChFinale
                                ? 'bg-amber-950/30 hover:bg-amber-950/60 border border-amber-800/40 text-amber-200'
                                : 'hover:bg-slate-700 text-slate-200'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                                    isChFinale
                                      ? 'bg-amber-500 text-slate-950 flex items-center gap-1'
                                      : isCurrent
                                      ? 'bg-indigo-500 text-white'
                                      : 'bg-slate-700 text-slate-300'
                                  }`}
                                >
                                  {isChFinale && <Trophy className="w-3 h-3" />}
                                  {ch.code}
                                </span>
                                <span className="font-medium truncate">{ch.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                {ch.objectives.length} objectives • {ch.totalQuestions} verbatim questions
                              </p>
                            </div>
                            <span className="text-[11px] font-mono bg-slate-900/60 px-2 py-1 rounded text-slate-300 flex-shrink-0">
                              {ch.totalQuestions} Qs
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Dedicated Chapter Finale Shortcut Button */}
              <button
                type="button"
                onClick={() => onSelectChapter('at-finale')}
                className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm ${
                  isFinaleActive
                    ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-400/30'
                    : 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/40 text-amber-300'
                }`}
                title="Jump directly to the Chapter Finale CPALE Pre-Board Mock Exam"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Chapter Finale (70 Qs)</span>
              </button>
            </div>

            {/* Right: Study Mode Toggle & Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Mode Toggle */}
              <div className="hidden md:flex items-center p-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onToggleStudyMode('practice')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    studyMode === 'practice'
                      ? 'bg-indigo-600 text-white shadow font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Practice Mode
                </button>
                <button
                  type="button"
                  onClick={() => onToggleStudyMode('exam')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    studyMode === 'exam'
                      ? 'bg-amber-600 text-white shadow font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Exam Mode
                </button>
              </div>

              {/* Progress Backup & Sync */}
              <button
                type="button"
                onClick={onOpenExportImport}
                title="Backup or Restore Progress (JSON)"
                className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Save / Backup</span>
              </button>

              {/* Reset Chapter Progress */}
              <button
                type="button"
                onClick={onResetChapter}
                title="Reset answers for this chapter"
                className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/50 hover:border-rose-700/60 hover:text-rose-200 text-slate-400 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Reset Chapter</span>
              </button>

              {/* Help & Shortcuts */}
              <button
                type="button"
                onClick={() => setShowShortcutsModal(true)}
                title="Reviewer Tips & Instructions"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Shortcuts & Guide Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  AT
                </div>
                <div>
                  <h3 className="text-base font-bold">CPA Board Review Guide</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Mastering Auditing Theory</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowShortcutsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Item-by-Item Reveal Choice
                </h4>
                <p>
                  You can toggle <strong>"Show Correct Answer"</strong> on any question individually. It only reveals the key and detailed rationale for that specific item.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  Objective Filtering & Jump Grid
                </h4>
                <p>
                  Click on any objective chip at the top to filter items pertaining to that syllabus goal, or use the interactive Question Palette grid to jump directly to any question.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Chapter Finale (Grand Mock Exam)
                </h4>
                <p>
                  Select the <strong>Chapter Finale</strong> from the chapter selector or header shortcut to test yourself on 70 comprehensive board questions covering all 14 chapters!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                  <Download className="w-4 h-4 text-indigo-500" />
                  Automatic Progress Saving
                </h4>
                <p>
                  Every answer, flagged question, and reveal state is instantly persisted in your browser's local storage. Use the Save / Backup button to download your progress JSON file to restore anytime!
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowShortcutsModal(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
