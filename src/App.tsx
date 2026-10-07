import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  allChapters,
  getChapterById
} from './data/chapters';
import {
  AnswerOption,
  Chapter,
  FilterMode,
  Question,
  StudyMode,
  UserAnswerRecord
} from './types/quiz';
import {
  loadStoredProgress,
  saveStoredProgress,
  StoredState
} from './utils/storage';
import { Header } from './components/Header';
import { ScoreTally } from './components/ScoreTally';
import { ObjectiveNav } from './components/ObjectiveNav';
import { FilterBar } from './components/FilterBar';
import { QuestionGrid } from './components/QuestionGrid';
import { QuestionCard } from './components/QuestionCard';
import { ChapterInfoBanner } from './components/ChapterInfoBanner';
import { ExportImportModal } from './components/ExportImportModal';
import { FloatingScore } from './components/FloatingScore';
import { VirtualPet } from './components/VirtualPet';
import {
  ArrowUp,
  RotateCcw,
  Sparkles,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Trophy,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function App() {
  // Load initial state from localStorage
  const [state, setState] = useState<StoredState>(() => loadStoredProgress());
  const [isExportImportOpen, setIsExportImportOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Active Chapter
  const activeChapter = useMemo(() => {
    return getChapterById(state.activeChapterId) || allChapters[0];
  }, [state.activeChapterId]);

  const currentChapterIndex = useMemo(() => {
    return allChapters.findIndex((c) => c.id === activeChapter.id);
  }, [activeChapter.id]);

  const prevChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < allChapters.length - 1 ? allChapters[currentChapterIndex + 1] : null;
  const isFinale = activeChapter.id === 'at-finale' || activeChapter.code === 'FINALE';

  // Current chapter answers map: { [questionNumber]: UserAnswerRecord }
  const currentChapterAnswers = useMemo(() => {
    return state.answers[activeChapter.id] || {};
  }, [state.answers, activeChapter.id]);

  // Auto-save on any state change
  useEffect(() => {
    saveStoredProgress(state);
  }, [state]);

  // Handle scroll for "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers for Chapter, Objective, Filter, Search
  const handleSelectChapter = (chapterId: string) => {
    setState((prev) => ({
      ...prev,
      activeChapterId: chapterId,
      selectedObjective: null, // Reset objective filter when changing chapter
      searchQuery: '',
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectObjective = (objective: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedObjective: objective,
    }));
  };

  const handleSelectFilterMode = (mode: FilterMode) => {
    setState((prev) => ({
      ...prev,
      filterMode: mode,
    }));
  };

  const handleSearchChange = (query: string) => {
    setState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const handleToggleStudyMode = (mode: StudyMode) => {
    setState((prev) => ({
      ...prev,
      studyMode: mode,
    }));
  };

  // Answer interaction handlers
  const handleSelectAnswer = (questionNum: number, answer: AnswerOption) => {
    setState((prev) => {
      const chapterAnswers = { ...(prev.answers[activeChapter.id] || {}) };
      const existing = chapterAnswers[questionNum] || {
        selectedAnswer: null,
        isAnswerRevealed: false,
        isFlagged: false,
      };

      chapterAnswers[questionNum] = {
        ...existing,
        selectedAnswer: answer,
        isAnswerRevealed: false,
        answeredAt: new Date().toISOString(),
      };

      return {
        ...prev,
        answers: {
          ...prev.answers,
          [activeChapter.id]: chapterAnswers,
        },
      };
    });
  };

  // Toggling reveal for each item only pertaining to that item
  const handleToggleReveal = (questionNum: number) => {
    setState((prev) => {
      const chapterAnswers = { ...(prev.answers[activeChapter.id] || {}) };
      const existing = chapterAnswers[questionNum] || {
        selectedAnswer: null,
        isAnswerRevealed: false,
        isFlagged: false,
      };

      chapterAnswers[questionNum] = {
        ...existing,
        isAnswerRevealed: !existing.isAnswerRevealed,
      };

      return {
        ...prev,
        answers: {
          ...prev.answers,
          [activeChapter.id]: chapterAnswers,
        },
      };
    });
  };

  const handleToggleFlag = (questionNum: number) => {
    setState((prev) => {
      const chapterAnswers = { ...(prev.answers[activeChapter.id] || {}) };
      const existing = chapterAnswers[questionNum] || {
        selectedAnswer: null,
        isAnswerRevealed: false,
        isFlagged: false,
      };

      chapterAnswers[questionNum] = {
        ...existing,
        isFlagged: !existing.isFlagged,
      };

      return {
        ...prev,
        answers: {
          ...prev.answers,
          [activeChapter.id]: chapterAnswers,
        },
      };
    });
  };

  const handleClearAnswer = (questionNum: number) => {
    setState((prev) => {
      const chapterAnswers = { ...(prev.answers[activeChapter.id] || {}) };
      const existing = chapterAnswers[questionNum];
      if (!existing) return prev;

      chapterAnswers[questionNum] = {
        ...existing,
        selectedAnswer: null,
        isAnswerRevealed: false,
      };

      return {
        ...prev,
        answers: {
          ...prev.answers,
          [activeChapter.id]: chapterAnswers,
        },
      };
    });
  };

  // Reset actions
  const handleResetCurrentChapter = () => {
    setState((prev) => {
      const newAnswers = { ...prev.answers };
      delete newAnswers[activeChapter.id];
      return {
        ...prev,
        answers: newAnswers,
      };
    });
  };

  const handleResetAllChapters = () => {
    setState((prev) => ({
      ...prev,
      answers: {},
    }));
  };

  const handleImportState = (importedState: StoredState) => {
    setState(importedState);
  };

  // Jump to specific question
  const handleJumpToQuestion = (num: number) => {
    const el = document.getElementById(`question-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-indigo-500/40');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-indigo-500/40');
      }, 1500);
    }
  };

  // Filter questions based on Objective, FilterMode, and Search
  const filteredQuestions = useMemo(() => {
    let result = activeChapter.questions;

    // 1. Filter by Objective
    if (state.selectedObjective) {
      result = result.filter((q) => q.objective === state.selectedObjective);
    }

    // 2. Filter by status (All, Unanswered, Incorrect, Correct, Flagged)
    if (state.filterMode !== 'all') {
      result = result.filter((q) => {
        const record = currentChapterAnswers[q.number];
        const isAnswered = record?.selectedAnswer != null;
        const isCorrect = isAnswered && record.selectedAnswer === q.correctAnswer;
        const isFlagged = record?.isFlagged || false;

        switch (state.filterMode) {
          case 'unanswered':
            return !isAnswered;
          case 'incorrect':
            return isAnswered && !isCorrect;
          case 'correct':
            return isAnswered && isCorrect;
          case 'flagged':
            return isFlagged;
          default:
            return true;
        }
      });
    }

    // 3. Search Query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        const inStem = item.question.toLowerCase().includes(q);
        const inObjective = item.objective.toLowerCase().includes(q);
        const inOptions = item.options.some((opt) => opt.text.toLowerCase().includes(q));
        const inExplanation = (item.explanation || '').toLowerCase().includes(q);
        return inStem || inObjective || inOptions || inExplanation;
      });
    }

    return result;
  }, [activeChapter.questions, state.selectedObjective, state.filterMode, state.searchQuery, currentChapterAnswers]);

  // Overall and Chapter Score Tallies
  const { chapterScore, chapterAnswered, chapterFlagged } = useMemo(() => {
    let score = 0;
    let answered = 0;
    let flagged = 0;

    activeChapter.questions.forEach((q) => {
      const rec = currentChapterAnswers[q.number];
      if (rec?.selectedAnswer != null) {
        answered++;
        if (rec.selectedAnswer === q.correctAnswer) {
          score++;
        }
      }
      if (rec?.isFlagged) {
        flagged++;
      }
    });

    return { chapterScore: score, chapterAnswered: answered, chapterFlagged: flagged };
  }, [activeChapter.questions, currentChapterAnswers]);

  // Stats per Objective
  const objectiveStats = useMemo(() => {
    const map: Record<string, { name: string; total: number; answered: number; correct: number }> = {};
    activeChapter.objectives.forEach((obj) => {
      map[obj] = { name: obj, total: 0, answered: 0, correct: 0 };
    });

    activeChapter.questions.forEach((q) => {
      if (!map[q.objective]) {
        map[q.objective] = { name: q.objective, total: 0, answered: 0, correct: 0 };
      }
      map[q.objective].total++;
      const rec = currentChapterAnswers[q.number];
      if (rec?.selectedAnswer != null) {
        map[q.objective].answered++;
        if (rec.selectedAnswer === q.correctAnswer) {
          map[q.objective].correct++;
        }
      }
    });

    return map;
  }, [activeChapter, currentChapterAnswers]);

  // Current objective score (if filtered)
  const activeObjectiveScore = useMemo(() => {
    if (!state.selectedObjective) return undefined;
    return objectiveStats[state.selectedObjective];
  }, [state.selectedObjective, objectiveStats]);

  // Filter counts for current chapter & active objective filter
  const filterCounts = useMemo(() => {
    const baseList = state.selectedObjective
      ? activeChapter.questions.filter((q) => q.objective === state.selectedObjective)
      : activeChapter.questions;

    let unans = 0;
    let incorr = 0;
    let corr = 0;
    let flg = 0;

    baseList.forEach((q) => {
      const rec = currentChapterAnswers[q.number];
      const isAns = rec?.selectedAnswer != null;
      if (!isAns) unans++;
      else if (rec.selectedAnswer === q.correctAnswer) corr++;
      else incorr++;

      if (rec?.isFlagged) flg++;
    });

    return {
      all: baseList.length,
      unanswered: unans,
      incorrect: incorr,
      correct: corr,
      flagged: flg,
    };
  }, [activeChapter.questions, state.selectedObjective, currentChapterAnswers]);

  // Overall Global tally across all chapters
  const overallTally = useMemo(() => {
    let totQ = 0;
    let totAns = 0;
    let totCorr = 0;

    allChapters.forEach((ch) => {
      totQ += ch.totalQuestions;
      const chAns = state.answers[ch.id] || {};
      ch.questions.forEach((q) => {
        const rec = chAns[q.number];
        if (rec?.selectedAnswer != null) {
          totAns++;
          if (rec.selectedAnswer === q.correctAnswer) {
            totCorr++;
          }
        }
      });
    });

    return {
      totalQuestions: totQ,
      totalAnswered: totAns,
      totalCorrect: totCorr,
    };
  }, [state.answers]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Header with Chapter Selector & Mode Switches */}
      <Header
        chapters={allChapters}
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        studyMode={state.studyMode}
        onToggleStudyMode={handleToggleStudyMode}
        onOpenExportImport={() => setIsExportImportOpen(true)}
        onResetChapter={() => {
          if (window.confirm(`Reset answers for ${activeChapter.code}?`)) {
            handleResetCurrentChapter();
          }
        }}
        lastSavedAt={state.lastSavedAt}
        totalAnsweredOverall={overallTally.totalAnswered}
        totalQuestionsOverall={overallTally.totalQuestions}
        totalCorrectOverall={overallTally.totalCorrect}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Chapter Overview Info */}
        <ChapterInfoBanner chapter={activeChapter} />

        {/* Live Total Score Contrast Tally vs Answered Questions */}
        <ScoreTally
          score={chapterScore}
          totalAnswered={chapterAnswered}
          totalQuestions={activeChapter.totalQuestions}
          flaggedCount={chapterFlagged}
          activeObjective={state.selectedObjective}
          onClearObjective={() => handleSelectObjective(null)}
          objectiveScore={activeObjectiveScore}
        />

        {/* Navigation Among All Objectives */}
        <ObjectiveNav
          objectives={activeChapter.objectives}
          selectedObjective={state.selectedObjective}
          onSelectObjective={handleSelectObjective}
          objectiveStats={objectiveStats}
          totalQuestions={activeChapter.totalQuestions}
          totalAnswered={chapterAnswered}
        />

        {/* Question Palette / Jump Grid */}
        <QuestionGrid
          questions={activeChapter.questions}
          records={currentChapterAnswers}
          onJumpToQuestion={handleJumpToQuestion}
        />

        {/* Search & Filter Bar */}
        <FilterBar
          filterMode={state.filterMode}
          onSelectFilterMode={handleSelectFilterMode}
          searchQuery={state.searchQuery}
          onSearchChange={handleSearchChange}
          counts={filterCounts}
        />

        {/* Questions Feed */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No Questions Found Matching Filter
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              There are no questions in this objective matching your selected filter or search term.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  handleSelectObjective(null);
                  handleSelectFilterMode('all');
                  handleSearchChange('');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span>
                Showing <strong className="text-slate-800 dark:text-slate-200">{filteredQuestions.length}</strong> of{' '}
                <strong className="text-slate-800 dark:text-slate-200">{activeChapter.totalQuestions}</strong> items
              </span>
              <span className="hidden sm:inline">
                Click "Show Correct Answer" on any question to view its individual key & rationale
              </span>
            </div>

            {filteredQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                record={currentChapterAnswers[q.number]}
                onSelectAnswer={handleSelectAnswer}
                onToggleReveal={handleToggleReveal}
                onToggleFlag={handleToggleFlag}
                onClearAnswer={handleClearAnswer}
                isExamMode={state.studyMode === 'exam'}
              />
            ))}
          </div>
        )}

        {/* Chapter Finale Special Completion & Score Analysis Banner */}
        {isFinale ? (
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Trophy className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-amber-300">
                    Chapter Finale: Pre-Board Performance Evaluation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Simulating the 70-item Certified Public Accountant Licensure Examination (CPALE) in Auditing Theory.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {chapterScore} <span className="text-base text-slate-400 font-normal">/ {activeChapter.totalQuestions}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-400">
                    {chapterAnswered > 0
                      ? `${Math.round((chapterScore / chapterAnswered) * 100)}% Accuracy (${chapterAnswered} answered)`
                      : '0 Answered Yet'}
                  </div>
                </div>
              </div>
            </div>

            {/* Passing Status Indicator */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                {chapterScore >= 53 ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                )}
                <div>
                  <span className="font-bold text-white">
                    {chapterScore >= 53
                      ? 'PASSED: CPALE Passing Benchmark Met (>= 75%)!'
                      : `Benchmark: 75% Passing Standard (53 out of 70 correct required)`}
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {chapterScore >= 53
                      ? 'Congratulations! You have demonstrated exceptional mastery across all 14 Auditing Theory domains.'
                      : `You need ${Math.max(0, 53 - chapterScore)} more correct answers to meet the Philippine CPA Licensure passing mark.`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {filterCounts.incorrect > 0 && (
                  <button
                    type="button"
                    onClick={() => handleSelectFilterMode('incorrect')}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-colors"
                  >
                    Review {filterCounts.incorrect} Incorrect
                  </button>
                )}
                {chapterFlagged > 0 && (
                  <button
                    type="button"
                    onClick={() => handleSelectFilterMode('flagged')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors"
                  >
                    Review {chapterFlagged} Flagged
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset your answers for the Chapter Finale Exam to start a fresh attempt?')) {
                      handleResetCurrentChapter();
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Finale
                </button>
              </div>
            </div>

            {/* Return to Chapters Navigation */}
            {prevChapter && (
              <div className="pt-2 flex justify-start">
                <button
                  type="button"
                  onClick={() => handleSelectChapter(prevChapter.id)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to {prevChapter.code}: {prevChapter.title}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Bottom Chapter Navigation & Finale Callout for Regular Chapters */
          <div className="space-y-4 pt-4">
            {/* Finale Teaser Banner on regular chapters */}
            <div className="bg-gradient-to-r from-amber-950/30 via-indigo-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-amber-200">
                    Comprehensive CPALE Pre-Board Mock Exam
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                  Test your comprehensive knowledge with the 70-question Chapter Finale covering all 14 Auditing Theory syllabus modules.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleSelectChapter('at-finale')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0"
              >
                <Trophy className="w-4 h-4" />
                <span>Go to Chapter Finale (70 Qs)</span>
              </button>
            </div>

            {/* Previous & Next Chapter Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              {prevChapter ? (
                <button
                  type="button"
                  onClick={() => handleSelectChapter(prevChapter.id)}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous: <strong className="font-bold">{prevChapter.code}</strong></span>
                </button>
              ) : <div />}

              {nextChapter && (
                <button
                  type="button"
                  onClick={() => handleSelectChapter(nextChapter.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                    nextChapter.id === 'at-finale'
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 shadow-md'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {nextChapter.id === 'at-finale' ? (
                    <>
                      <Trophy className="w-4 h-4" />
                      <span>Proceed to Chapter Finale!</span>
                    </>
                  ) : (
                    <>
                      <span>Next: <strong className="font-bold">{nextChapter.code}</strong></span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Live Total Score HUD */}
      <FloatingScore
        score={chapterScore}
        totalAnswered={chapterAnswered}
        totalQuestions={activeChapter.totalQuestions}
        flaggedCount={chapterFlagged}
        activeChapterCode={activeChapter.code}
        filterMode={state.filterMode}
        onSelectFilterMode={handleSelectFilterMode}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Floating Virtual Pet Companion */}
      <VirtualPet
        score={chapterScore}
        totalAnswered={chapterAnswered}
        totalQuestions={activeChapter.totalQuestions}
        chapterId={activeChapter.id}
        chapterCode={activeChapter.code}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 transition-all z-40 focus:outline-none focus:ring-4 focus:ring-indigo-400/40"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Save, Backup & Restore Modal */}
      <ExportImportModal
        isOpen={isExportImportOpen}
        onClose={() => setIsExportImportOpen(false)}
        currentState={state}
        onImportState={handleImportState}
        onResetCurrentChapter={handleResetCurrentChapter}
        onResetAllChapters={handleResetAllChapters}
        activeChapterCode={activeChapter.code}
      />
    </div>
  );
}
