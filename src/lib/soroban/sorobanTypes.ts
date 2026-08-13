export const SOROBAN_COLUMNS = 11;

/** Trạng thái một cột: hạt trên (5) và số hạt dưới đang bật (0-4). */
export interface ColumnState {
  heaven: boolean;
  earth: 0 | 1 | 2 | 3 | 4;
}

export type SorobanState = ColumnState[];

export const EMPTY_COLUMN: ColumnState = { heaven: false, earth: 0 };

export function emptySoroban(columns: number = SOROBAN_COLUMNS): SorobanState {
  return Array.from({ length: columns }, () => ({ ...EMPTY_COLUMN }));
}

export function columnValue(col: ColumnState): number {
  return (col.heaven ? 5 : 0) + col.earth;
}

export function digitToColumn(digit: number): ColumnState {
  if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
    throw new Error(`Chữ số không hợp lệ: ${digit}`);
  }
  return { heaven: digit >= 5, earth: (digit % 5) as ColumnState["earth"] };
}
