import React from 'react';
import {
  AnswerOption,
  Question,
  UserAnswerRecord
} from '../types/quiz';
import {
  Bookmark,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  record?: UserAnswerRecord;
  onSelectAnswer: (questionNum: number, answer: AnswerOption) => void;
  onToggleReveal: (questionNum: number) => void;
  onToggleFlag: (questionNum: number) => void;
  onClearAnswer: (questionNum: number) => void;
  isExamMode?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  record,
  onSelectAnswer,
  onToggleReveal,
  onToggleFlag,
  onClearAnswer,
  isExamMode = false,
}) => {
  const selectedAnswer = record?.selectedAnswer || null;
  const isRevealed = record?.isAnswerRevealed || false;
  const isFlagged = record?.isFlagged || false;

  const isAnswered = selectedAnswer !== null;
  const isCorrect = isAnswered && selectedAnswer === question.correctAnswer;

  return (
    <div
      id={`question-${question.number}`}
      className={`rounded-2xl border transition-all shadow-sm ${
        isRevealed
          ? isCorrect
            ? 'bg-emerald-50/30 dark:bg-emerald-950/15 border-emerald-300 dark:border-emerald-800/60'
            : 'bg-rose-50/30 dark:bg-rose-950/15 border-rose-300 dark:border-rose-800/60'
          : isAnswered
          ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Question Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs sm:text-sm">
            Q{question.number}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
            {question.chapterCode}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
            {question.objective}
          </span>
        </div>

        {/* Flag / Bookmark button */}
        <button
          type="button"
          onClick={() => onToggleFlag(question.number)}
          title={isFlagged ? 'Remove flag' : 'Flag question for later review'}
          className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
            isFlagged
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span className="hidden sm:inline">{isFlagged ? 'Flagged' : 'Flag'}</span>
        </button>
      </div>

      {/* Question Body */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Verbatim Question Text */}
        <div className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-medium leading-relaxed whitespace-pre-line">
          {question.question}
        </div>

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {question.options.map((opt) => {
            const isThisSelected = selectedAnswer === opt.key;
            const isThisCorrect = opt.key === question.correctAnswer;

            let buttonStyle = 'bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';
            let keyBadgeStyle = 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600';

            if (isRevealed) {
              if (isThisCorrect) {
                // Correct option
                buttonStyle = 'bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 border-emerald-500 shadow-sm font-medium';
                keyBadgeStyle = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isThisSelected && !isThisCorrect) {
                // Selected but wrong
                buttonStyle = 'bg-rose-100/70 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 border-rose-500 shadow-sm';
                keyBadgeStyle = 'bg-rose-600 text-white border-rose-600';
              } else {
                // Other options when revealed
                buttonStyle = 'opacity-60 bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800';
              }
            } else if (isThisSelected) {
              // Selected during active practice / exam
              buttonStyle = 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-100 border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm font-medium';
              keyBadgeStyle = 'bg-indigo-600 text-white border-indigo-600';
            }

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onSelectAnswer(question.number, opt.key)}
                className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${buttonStyle}`}
              >
                {/* Option Letter Key */}
                <span
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${keyBadgeStyle}`}
                >
                  {opt.key}
                </span>

                {/* Option Content Text */}
                <span className="flex-1 whitespace-pre-line">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Footer: Choice to Show Answer For Each Item Only */}
      <div className="p-3 sm:p-4 bg-slate-50/80 dark:bg-slate-850/80 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Per-Item Show Correct Answer Button */}
        <div className="flex items-center gap-2">
          {!isExamMode ? (
            <button
              type="button"
              onClick={() => onToggleReveal(question.number)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm ${
                isRevealed
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-650'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isRevealed ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Answer & Explanation</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Show Correct Answer & Rationale</span>
                </>
              )}
            </button>
          ) : (
            <span className="text-xs text-amber-600 dark:text-amber-400 italic">
              Answers hidden during Exam Mode. Switch to Practice Mode to reveal explanations per question.
            </span>
          )}

          {isAnswered && (
            <button
              type="button"
              onClick={() => onClearAnswer(question.number)}
              title="Clear your selected answer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear choice</span>
            </button>
          )}
        </div>

        {/* Right: Answer Status Badge */}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          {isRevealed ? (
            isCorrect ? (
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1 point)
              </span>
            ) : isAnswered ? (
              <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                <XCircle className="w-3.5 h-3.5" /> Incorrect (Selected: {selectedAnswer})
              </span>
            ) : (
              <span className="text-slate-500">Unanswered</span>
            )
          ) : isAnswered ? (
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
              Answer recorded: Option {selectedAnswer}
            </span>
          ) : (
            <span>Not yet answered</span>
          )}
        </div>
      </div>

      {/* Detailed Explanation / Rationale Box (Only shown if revealed for this item) */}
      {isRevealed && (
        <div className="p-4 sm:p-5 bg-indigo-50/70 dark:bg-indigo-950/40 border-t border-indigo-100 dark:border-indigo-900/60 rounded-b-2xl">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-indigo-950 dark:text-indigo-200">
                  Official Key: Option {question.correctAnswer}
                </span>
                <span className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium">
                  • Philippine Auditing Standards Reference
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {question.explanation || `The correct answer is Option ${question.correctAnswer}.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
