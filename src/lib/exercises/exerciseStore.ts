import type { Exercise } from "./exerciseParser";

export interface ExerciseSet {
  id: string;
  name: string;
  createdAt: number;
  exercises: Exercise[];
}

const KEY = "soroban.exercise-sets.v1";

/**
 * Lưu trữ bộ bài tập ở local storage (prototype).
 * Toàn bộ truy cập đi qua module này để sau có thể đổi sang backend.
 */
export function loadSets(): ExerciseSet[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ExerciseSet[]) : [];
  } catch {
    return [];
  }
}

export function saveSets(sets: ExerciseSet[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(sets));
  } catch {
    /* bỏ qua lỗi lưu trữ */
  }
}

export function addSet(name: string, exercises: Exercise[]): ExerciseSet {
  const set: ExerciseSet = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    createdAt: Date.now(),
    exercises,
  };
  saveSets([set, ...loadSets()]);
  return set;
}

export function removeSet(id: string): void {
  saveSets(loadSets().filter((s) => s.id !== id));
}
