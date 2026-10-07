import React, { useState } from 'react';
import { Question, UserAnswerRecord } from '../types/quiz';
import { Grid, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionGridProps {
  questions: Question[];
  records: Record<number, UserAnswerRecord>;
  onJumpToQuestion: (number: number) => void;
}

export const QuestionGrid: React.FC<QuestionGridProps> = ({
  questions,
  records,
  onJumpToQuestion,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <Grid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Question Palette / Jump Grid ({questions.length} Items)</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></span> Unanswered
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Answered
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Correct
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Incorrect
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 ring-1 ring-amber-500"></span> Flagged
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 gap-1.5 sm:gap-2">
            {questions.map((q) => {
              const rec = records[q.number];
              const isAnswered = rec?.selectedAnswer != null;
              const isRevealed = rec?.isAnswerRevealed;
              const isCorrect = isAnswered && rec.selectedAnswer === q.correctAnswer;
              const isFlagged = rec?.isFlagged;

              let style = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';

              if (isRevealed) {
                if (isCorrect) {
                  style = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                } else {
                  style = 'bg-rose-500 text-white border-rose-600 font-bold';
                }
              } else if (isAnswered) {
                style = 'bg-indigo-600 text-white border-indigo-700 font-semibold';
              }

              return (
                <button
                  key={q.number}
                  type="button"
                  onClick={() => onJumpToQuestion(q.number)}
                  className={`relative h-9 rounded-lg border text-xs flex items-center justify-center transition-transform hover:scale-105 ${style}`}
                >
                  {q.number}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white dark:border-slate-900" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
