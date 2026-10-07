import React from 'react';
import { Compass, CheckCircle2, Circle, ListFilter } from 'lucide-react';
import { UserAnswerRecord } from '../types/quiz';

interface ObjectiveStat {
  name: string;
  total: number;
  answered: number;
  correct: number;
}

interface ObjectiveNavProps {
  objectives: string[];
  selectedObjective: string | null;
  onSelectObjective: (objective: string | null) => void;
  objectiveStats: Record<string, ObjectiveStat>;
  totalQuestions: number;
  totalAnswered: number;
}

export const ObjectiveNav: React.FC<ObjectiveNavProps> = ({
  objectives,
  selectedObjective,
  onSelectObjective,
  objectiveStats,
  totalQuestions,
  totalAnswered,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Syllabus Learning Objectives Navigation
          </h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Filter questions by specific Board Exam topics
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {/* "All Objectives" Button */}
        <button
          type="button"
          onClick={() => onSelectObjective(null)}
          className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
            selectedObjective === null
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750'
          }`}
        >
          <ListFilter className="w-3.5 h-3.5" />
          <span>All Objectives</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
              selectedObjective === null
                ? 'bg-indigo-700 text-indigo-100'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            {totalAnswered}/{totalQuestions}
          </span>
        </button>

        {/* Individual Objectives */}
        {objectives.map((obj) => {
          const isSelected = selectedObjective === obj;
          const stat = objectiveStats[obj] || { total: 0, answered: 0, correct: 0 };
          const isFullyAnswered = stat.total > 0 && stat.answered === stat.total;

          return (
            <button
              key={obj}
              type="button"
              onClick={() => onSelectObjective(obj)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {isFullyAnswered ? (
                <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
              ) : (
                <Circle className={`w-3.5 h-3.5 opacity-50 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              )}
              <span className="truncate max-w-[200px] sm:max-w-none">{obj}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isSelected
                    ? 'bg-indigo-700 text-indigo-100'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {stat.answered}/{stat.total}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
