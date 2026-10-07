import React from 'react';
import { FilterMode } from '../types/quiz';
import { Search, Filter, Bookmark, HelpCircle, CheckCircle, XCircle, X } from 'lucide-react';

interface FilterBarProps {
  filterMode: FilterMode;
  onSelectFilterMode: (mode: FilterMode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    unanswered: number;
    incorrect: number;
    correct: number;
    flagged: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterMode,
  onSelectFilterMode,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search questions, standards (e.g. PSA, internal control)..."
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectFilterMode('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 border ${
            filterMode === 'all'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750'
          }`}
        >
          <span>All</span>
          <span className="text-[10px] font-mono opacity-80">({counts.all})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilterMode('unanswered')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 border ${
            filterMode === 'unanswered'
              ? 'bg-slate-800 dark:bg-slate-700 text-white border-slate-800 shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750'
          }`}
        >
          <HelpCircle className="w-3 h-3" />
          <span>Unanswered</span>
          <span className="text-[10px] font-mono opacity-80">({counts.unanswered})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilterMode('incorrect')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 border ${
            filterMode === 'incorrect'
              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750'
          }`}
        >
          <XCircle className="w-3 h-3" />
          <span>Incorrect</span>
          <span className="text-[10px] font-mono opacity-80">({counts.incorrect})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilterMode('correct')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 border ${
            filterMode === 'correct'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750'
          }`}
        >
          <CheckCircle className="w-3 h-3" />
          <span>Correct</span>
          <span className="text-[10px] font-mono opacity-80">({counts.correct})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilterMode('flagged')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 border ${
            filterMode === 'flagged'
              ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750'
          }`}
        >
          <Bookmark className="w-3 h-3" />
          <span>Flagged</span>
          <span className="text-[10px] font-mono opacity-80">({counts.flagged})</span>
        </button>
      </div>
    </div>
  );
};
