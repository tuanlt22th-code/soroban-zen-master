import type { Exercise } from "./exerciseParser";

export interface ExerciseFilter {
  digits: number | "all";
  opsCount: number | "all";
  type: "add" | "sub" | "mixed" | "all";
}

export const DEFAULT_FILTER: ExerciseFilter = { digits: "all", opsCount: "all", type: "all" };

export function filterExercises(exercises: Exercise[], filter: ExerciseFilter): Exercise[] {
  return exercises.filter((ex) => {
    if (filter.digits !== "all" && ex.digits !== filter.digits) return false;
    if (filter.opsCount !== "all" && ex.opsCount !== filter.opsCount) return false;
    if (filter.type !== "all" && ex.type !== filter.type) return false;
    return true;
  });
}
