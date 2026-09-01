import type { Exercise } from "./exerciseParser";
import d2r2 from "@/data/exercises/2D2R.json";
import d2r3 from "@/data/exercises/2D3R.json";
import d3r2 from "@/data/exercises/3D2R.json";
import d3r3 from "@/data/exercises/3D3R.json";
import d4r2 from "@/data/exercises/4D2R.json";
import d4r3 from "@/data/exercises/4D3R.json";
import d5r2 from "@/data/exercises/5D2R.json";
import d5r3 from "@/data/exercises/5D3R.json";

export interface BuiltinBank {
  id: string;
  label: string;
  digits: number;
  rows: number;
  problems: number[][];
}

export const BUILTIN_BANKS: BuiltinBank[] = [
  { id: "2D2R", label: "2 chữ số × 2 hàng", digits: 2, rows: 2, problems: d2r2 },
  { id: "2D3R", label: "2 chữ số × 3 hàng", digits: 2, rows: 3, problems: d2r3 },
  { id: "3D2R", label: "3 chữ số × 2 hàng", digits: 3, rows: 2, problems: d3r2 },
  { id: "3D3R", label: "3 chữ số × 3 hàng", digits: 3, rows: 3, problems: d3r3 },
  { id: "4D2R", label: "4 chữ số × 2 hàng", digits: 4, rows: 2, problems: d4r2 },
  { id: "4D3R", label: "4 chữ số × 3 hàng", digits: 4, rows: 3, problems: d4r3 },
  { id: "5D2R", label: "5 chữ số × 2 hàng", digits: 5, rows: 2, problems: d5r2 },
  { id: "5D3R", label: "5 chữ số × 3 hàng", digits: 5, rows: 3, problems: d5r3 },
];

export const QUESTION_COUNTS = [10, 15, 20] as const;

function toExercise(bankId: string, index: number, terms: number[]): Exercise {
  const raw = terms
    .map((t, i) => (i === 0 ? String(t) : t < 0 ? `- ${Math.abs(t)}` : `+ ${t}`))
    .join(" ");
  const hasAdd = terms.slice(1).some((t) => t > 0);
  const hasSub = terms.slice(1).some((t) => t < 0);
  return {
    id: `${bankId}-${index + 1}`,
    raw,
    terms,
    digits: Math.max(...terms.map((t) => String(Math.abs(t)).length)),
    opsCount: terms.length - 1,
    type: hasAdd && hasSub ? "mixed" : hasSub ? "sub" : "add",
    result: terms.reduce((a, b) => a + b, 0),
  };
}

/** Lấy ngẫu nhiên `count` bài không trùng lặp trong bộ 500 bài. */
export function pickRandom(bank: BuiltinBank, count: number): Exercise[] {
  const indices = bank.problems.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j]!, indices[i]!];
  }
  return indices
    .slice(0, count)
    .map((i) => toExercise(bank.id, i, bank.problems[i]!));
}
