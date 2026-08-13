import {
  SOROBAN_COLUMNS,
  digitToColumn,
  emptySoroban,
  type SorobanState,
} from "./sorobanTypes";

/**
 * Chuyển một số nguyên không âm thành trạng thái các cột Soroban.
 * Cột index 0 là cột ngoài cùng bên trái (hàng cao nhất).
 */
export function numberToSoroban(
  value: number | string,
  columns: number = SOROBAN_COLUMNS,
): SorobanState {
  const text = typeof value === "number" ? String(value) : value.trim();
  if (!/^\d+$/.test(text)) {
    throw new Error(`Số không hợp lệ: ${value}`);
  }
  const digits = text.replace(/^0+(?=\d)/, "");
  if (digits.length > columns) {
    throw new Error(`Số vượt quá ${columns} chữ số`);
  }
  const state = emptySoroban(columns);
  const offset = columns - digits.length;
  for (let i = 0; i < digits.length; i++) {
    state[offset + i] = digitToColumn(Number(digits[i]));
  }
  return state;
}
