import { columnValue, type SorobanState } from "./sorobanTypes";

/** Chuỗi chữ số của trạng thái Soroban (giữ nguyên số cột, có số 0 ở đầu). */
export function sorobanToDigits(state: SorobanState): string {
  return state.map((col) => String(columnValue(col))).join("");
}

/** Giá trị số thực tế đang được biểu diễn trên bàn tính. */
export function sorobanToNumber(state: SorobanState): number {
  return Number(sorobanToDigits(state));
}

export function sorobanEqualsNumber(state: SorobanState, target: number): boolean {
  return sorobanToNumber(state) === target;
}
