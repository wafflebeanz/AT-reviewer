import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Bookmark,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Percent,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { FilterMode } from '../types/quiz';

interface FloatingScoreProps {
  score: number;
  totalAnswered: number;
  totalQuestions: number;
  flaggedCount: number;
  activeChapterCode: string;
  filterMode: FilterMode;
  onSelectFilterMode: (mode: FilterMode) => void;
  onScrollToTop: () => void;
}

export const FloatingScore: React.FC<FloatingScoreProps> = ({
  score,
  totalAnswered,
  totalQuestions,
  flaggedCount,
  activeChapterCode,
  filterMode,
  onSelectFilterMode,
  onScrollToTop,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-5 left-4 z-40 px-3 py-2 rounded-full bg-slate-900/90 dark:bg-slate-800/95 text-white text-xs font-bold shadow-2xl border border-slate-700/80 backdrop-blur-md hover:bg-slate-800 transition-all flex items-center gap-1.5"
        title="Show floating total score"
      >
        <Award className="w-3.5 h-3.5 text-amber-400" />
        <span>Score: {score}/{totalAnswered}</span>
      </button>
    );
  }

  const incorrectCount = Math.max(0, totalAnswered - score);
  const unansweredCount = Math.max(0, totalQuestions - totalAnswered);
  const accuracyRate = totalAnswered > 0 ? Math.round((score / totalAnswered) * 1000) / 10 : 0;
  const completionPercentage = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;
  const isPassing = totalAnswered > 0 && accuracyRate >= 75;

  return (
    <div className="fixed bottom-5 left-4 sm:left-6 z-40 max-w-[calc(100vw-5.5rem)] sm:max-w-md transition-all">
      <div className="bg-slate-900/95 dark:bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-md overflow-hidden ring-1 ring-black/20">
        {/* Expanded View */}
        {isExpanded && (
          <div className="p-3.5 sm:p-4 border-b border-slate-800 space-y-3 bg-slate-950/40 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-indigo-600 font-mono font-bold text-[10px]">
                  {activeChapterCode}
                </span>
                <span className="font-bold text-slate-200">Total Score Breakdown</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                totalAnswered === 0
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : isPassing
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : accuracyRate >= 65
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}>
                {totalAnswered === 0
                  ? 'Not Started'
                  : isPassing
                  ? 'Passing (≥ 75%)'
                  : accuracyRate >= 65
                  ? 'Conditional (65-74%)'
                  : 'Needs Review (< 65%)'}
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              <button
                type="button"
                onClick={() => onSelectFilterMode('correct')}
                className={`p-2 rounded-xl border transition-all ${
                  filterMode === 'correct'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-emerald-400'
                }`}
                title="Filter correct answers"
              >
                <div className="text-base font-black font-mono">{score}</div>
                <div className="text-[10px] text-slate-400 font-medium">Correct</div>
              </button>

              <button
                type="button"
                onClick={() => onSelectFilterMode('incorrect')}
                className={`p-2 rounded-xl border transition-all ${
                  filterMode === 'incorrect'
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-400'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-rose-400'
                }`}
                title="Filter incorrect answers"
              >
                <div className="text-base font-black font-mono">{incorrectCount}</div>
                <div className="text-[10px] text-slate-400 font-medium">Mistakes</div>
              </button>

              <button
                type="button"
                onClick={() => onSelectFilterMode('unanswered')}
                className={`p-2 rounded-xl border transition-all ${
                  filterMode === 'unanswered'
                    ? 'bg-amber-950/60 border-amber-500 text-amber-200 ring-1 ring-amber-400'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-amber-400'
                }`}
                title="Filter unanswered questions"
              >
                <div className="text-base font-black font-mono">{unansweredCount}</div>
                <div className="text-[10px] text-slate-400 font-medium">Unanswered</div>
              </button>

              <button
                type="button"
                onClick={() => onSelectFilterMode('flagged')}
                className={`p-2 rounded-xl border transition-all ${
                  filterMode === 'flagged'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-200 ring-1 ring-purple-400'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-purple-400'
                }`}
                title="Filter flagged questions"
              >
                <div className="text-base font-black font-mono">{flaggedCount}</div>
                <div className="text-[10px] text-slate-400 font-medium">Flagged</div>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Completion: {totalAnswered} of {totalQuestions} ({completionPercentage}%)</span>
                <span>Accuracy: {accuracyRate}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${totalQuestions > 0 ? (score / totalQuestions) * 100 : 0}%` }}
                />
                <div
                  className="bg-rose-500 h-full transition-all duration-300"
                  style={{ width: `${totalQuestions > 0 ? (incorrectCount / totalQuestions) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Compact Bar (Always Visible) */}
        <div className="flex items-center gap-2 sm:gap-3 px-3.5 py-2 sm:py-2.5">
          {/* Main Score Tally Display */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-left hover:opacity-90 transition-opacity focus:outline-none"
            title="Click to view full score breakdown"
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-xl flex-shrink-0 font-bold ${
              totalAnswered === 0
                ? 'bg-slate-800 text-slate-400'
                : isPassing
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
            }`}>
              <Award className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden xs:inline">
                  Score:
                </span>
                <span className="font-mono font-black text-sm sm:text-base text-white">
                  {score}
                  <span className="text-slate-400 font-medium text-xs sm:text-sm">/{totalAnswered}</span>
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">answered</span>
                {totalAnswered > 0 && (
                  <span
                    className={`font-mono font-bold text-xs px-1.5 py-0.2 rounded ${
                      isPassing
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : accuracyRate >= 65
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {accuracyRate}%
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {activeChapterCode} • {totalAnswered}/{totalQuestions} total items
              </div>
            </div>
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-800 flex-shrink-0" />

          {/* Quick Mistakes button */}
          {incorrectCount > 0 && (
            <button
              type="button"
              onClick={() => onSelectFilterMode(filterMode === 'incorrect' ? 'all' : 'incorrect')}
              className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                filterMode === 'incorrect'
                  ? 'bg-rose-500 text-white font-bold'
                  : 'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30'
              }`}
              title="Filter incorrect questions"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{incorrectCount}</span>
            </button>
          )}

          {/* Expand / Collapse Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isExpanded ? 'Collapse score details' : 'Expand score details'}
            aria-label="Toggle score breakdown"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
