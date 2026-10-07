import React from 'react';
import { Chapter } from '../types/quiz';
import { Target, CheckSquare, Trophy, Award, Sparkles, BookOpen } from 'lucide-react';

interface ChapterInfoBannerProps {
  chapter: Chapter;
}

export const ChapterInfoBanner: React.FC<ChapterInfoBannerProps> = ({ chapter }) => {
  const isFinale = chapter.id === 'at-finale' || chapter.code === 'FINALE';

  if (isFinale) {
    return (
      <div className="bg-gradient-to-r from-amber-900/40 via-indigo-950/60 to-purple-950/40 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Trophy className="w-3.5 h-3.5" />
                CPALE Grand Finale
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                Comprehensive Summative Pre-Board Examination
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                Passing Benchmark: 75% (53 / 70)
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              {chapter.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {chapter.description}
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-amber-200/90 font-medium">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Simulates the actual Philippine CPA Licensure Examination (CPALE) 70-item Auditing Theory test specifications.</span>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-700/80 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Award className="w-4 h-4" />
              <span><strong className="text-white text-sm">70</strong> Board Questions</span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-300">
              <Target className="w-3.5 h-3.5" />
              <span><strong className="text-white">{chapter.objectives.length}</strong> Syllabus Domains</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs sm:text-sm">
              {chapter.code}
            </span>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {chapter.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
            {chapter.description}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            <span><strong className="text-slate-800 dark:text-slate-200">{chapter.objectives.length}</strong> Objectives</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
            <span><strong className="text-slate-800 dark:text-slate-200">{chapter.totalQuestions}</strong> Verbatim Items</span>
          </div>
        </div>
      </div>
    </div>
  );
};
