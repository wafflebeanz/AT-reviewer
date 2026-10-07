export type AnswerOption = 'A' | 'B' | 'C' | 'D' | 'E';
export type FilterMode = 'all' | 'unanswered' | 'incorrect' | 'correct' | 'flagged';
export type StudyMode = 'practice' | 'exam';

export interface QuestionOption {
  key: AnswerOption;
  text: string;
}

export interface Question {
  id: string;
  number: number;
  chapterId: string;
  chapterCode: string; // e.g. "AT-01"
  chapterTitle: string;
  objective: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: AnswerOption;
  explanation?: string;
  page?: number;
}

export interface Chapter {
  id: string;
  code: string;
  title: string;
  description: string;
  objectives: string[];
  totalQuestions: number;
  questions: Question[];
}

export interface UserAnswerRecord {
  selectedAnswer: AnswerOption | null;
  isAnswerRevealed: boolean;
  isFlagged: boolean;
  answeredAt?: string;
}

export interface ChapterProgress {
  chapterId: string;
  answers: Record<number, UserAnswerRecord>;
  lastUpdated: string;
}

export interface OverallStats {
  totalAnswered: number;
  totalCorrect: number;
  totalQuestions: number;
  accuracyRate: number; // percentage
}
