import React from 'react';
import {
  Award,
  CheckCircle,
  XCircle,
  HelpCircle,
  Bookmark,
  TrendingUp,
  Target,
  BarChart3,
  X
} from 'lucide-react';

interface ScoreTallyProps {
  score: number;
  totalAnswered: number;
  totalQuestions: number;
  flaggedCount: number;
  activeObjective: string | null;
  onClearObjective: () => void;
  objectiveScore?: {
    correct: number;
    answered: number;
    total: number;
  };
}

export const ScoreTally: React.FC<ScoreTallyProps> = ({
  score,
  totalAnswered,
  totalQuestions,
  flaggedCount,
  activeObjective,
  onClearObjective,
  objectiveScore,
}) => {
  const incorrectCount = totalAnswered - score;
  const unansweredCount = totalQuestions - totalAnswered;

  const accuracyRate = totalAnswered > 0 ? Math.round((score / totalAnswered) * 1000) / 10 : 0;
  const completionRate = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 1000) / 10 : 0;

  // Passing criteria status based on Philippine CPA Licensure Examination (75% passing mark)
  let statusBadge = {
    label: 'Not Started',
    color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-300',
  };

  if (totalAnswered > 0) {
    if (accuracyRate >= 75) {
      statusBadge = {
        label: 'Passing (≥ 75%)',
        color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      };
    } else if (accuracyRate >= 65) {
      statusBadge = {
        label: 'Conditional Zone (65 - 74%)',
        color: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
      };
    } else {
      statusBadge = {
        label: 'Needs Reinforcement (< 65%)',
        color: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
      };
    }
  }

  // Bar segments
  const correctPct = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const incorrectPct = totalQuestions > 0 ? (incorrectCount / totalQuestions) * 100 : 0;
  const unansweredPct = totalQuestions > 0 ? (unansweredCount / totalQuestions) * 100 : 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Top Banner: Contrast Highlight */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Main Contrast Tally */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
                <Target className="w-4 h-4 text-indigo-400" />
                Performance Contrast Tally
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${statusBadge.color}`}>
                {statusBadge.label}
              </span>
            </div>

            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {score}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-indigo-300">
                / {totalAnswered}
              </span>
              <span className="text-sm font-semibold text-slate-300">
                Correct vs Answered
              </span>
              <span className="ml-2 px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-base sm:text-lg font-mono font-bold">
                {accuracyRate}% Accuracy
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Completed <span className="font-semibold text-white">{totalAnswered}</span> out of{' '}
              <span className="font-semibold text-white">{totalQuestions}</span> total questions ({completionRate}% of chapter)
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-white leading-none">{score}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Correct</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-white leading-none">{incorrectCount}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Incorrect</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-700/50 text-slate-300 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-white leading-none">{unansweredCount}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Unanswered</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-white leading-none">{flaggedCount}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Flagged</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Breakdown Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-medium">
            <span>Overall Chapter Distribution</span>
            <span>{score} Correct • {incorrectCount} Incorrect • {unansweredCount} Left</span>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${correctPct}%` }}
              className="bg-emerald-500 transition-all duration-300"
              title={`Correct: ${score} (${Math.round(correctPct)}%)`}
            />
            <div
              style={{ width: `${incorrectPct}%` }}
              className="bg-rose-500 transition-all duration-300"
              title={`Incorrect: ${incorrectCount} (${Math.round(incorrectPct)}%)`}
            />
            <div
              style={{ width: `${unansweredPct}%` }}
              className="bg-slate-700/60 transition-all duration-300"
              title={`Unanswered: ${unansweredCount} (${Math.round(unansweredPct)}%)`}
            />
          </div>
        </div>
      </div>

      {/* Active Objective Filter Strip (if selected) */}
      {activeObjective && objectiveScore && (
        <div className="px-4 py-3 bg-indigo-50 dark:bg-indigo-950/40 border-t border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-indigo-900 dark:text-indigo-200">Filtered Objective:</span>
            <span className="px-2 py-0.5 rounded bg-indigo-200/60 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 font-medium truncate">
              {activeObjective}
            </span>
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">
              ({objectiveScore.answered}/{objectiveScore.total} answered • {objectiveScore.correct} correct)
            </span>
          </div>

          <button
            type="button"
            onClick={onClearObjective}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-semibold text-xs transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            Show All Objectives
          </button>
        </div>
      )}
    </div>
  );
};
