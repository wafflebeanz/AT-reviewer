import { AnswerOption, FilterMode, StudyMode, UserAnswerRecord } from '../types/quiz';

const STORAGE_KEY = 'ultimate_at_reviewer_progress_v1';

export interface StoredState {
  answers: Record<string, Record<number, UserAnswerRecord>>;
  activeChapterId: string;
  selectedObjective: string | null;
  filterMode: FilterMode;
  studyMode: StudyMode;
  showOnlyRevealed: boolean;
  searchQuery: string;
  lastSavedAt: string;
}

const DEFAULT_STATE: StoredState = {
  answers: {},
  activeChapterId: 'at-01',
  selectedObjective: null,
  filterMode: 'all',
  studyMode: 'practice',
  showOnlyRevealed: false,
  searchQuery: '',
  lastSavedAt: new Date().toISOString(),
};

export function loadStoredProgress(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
    };
  } catch (err) {
    console.error('Failed to load stored quiz progress from localStorage:', err);
    return DEFAULT_STATE;
  }
}

export function saveStoredProgress(state: StoredState): void {
  try {
    const toSave: StoredState = {
      ...state,
      lastSavedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error('Failed to save quiz progress to localStorage:', err);
  }
}

export function exportProgressToJson(state: StoredState): string {
  return JSON.stringify({
    app: 'The Ultimate AT Reviewer',
    version: '2024 Edition',
    exportedAt: new Date().toISOString(),
    state,
  }, null, 2);
}

export function importProgressFromJson(jsonText: string): StoredState | null {
  try {
    const parsed = JSON.parse(jsonText);
    if (parsed && parsed.state && typeof parsed.state.answers === 'object') {
      return parsed.state;
    }
    if (parsed && typeof parsed.answers === 'object') {
      return parsed;
    }
    return null;
  } catch (err) {
    console.error('Invalid backup JSON:', err);
    return null;
  }
}
