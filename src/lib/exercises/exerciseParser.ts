export interface Exercise {
  id: string;
  raw: string;
  /** Các số hạng có dấu, dùng để hiển thị theo cột dọc */
  terms?: number[];
  /** Số chữ số lớn nhất trong các toán hạng */
  digits: number;
  /** Số phép tính (số dấu + / -) */
  opsCount: number;
  type: "add" | "sub" | "mixed";
  result: number;
}

export interface ParseError {
  line: number;
  content: string;
  message: string;
}

export interface ParseResult {
  exercises: Exercise[];
  errors: ParseError[];
}

const ALLOWED = /^[0-9+\-\s]+$/;

/** Kiểm tra và tính giá trị một biểu thức cộng/trừ (tính từ trái sang phải). */
export function parseExpression(raw: string): { ok: true; exercise: Omit<Exercise, "id"> } | { ok: false; message: string } {
  const text = raw.trim();
  if (!text) return { ok: false, message: "Dòng trống" };
  if (!ALLOWED.test(text)) {
    return { ok: false, message: "Chỉ cho phép chữ số, dấu +, dấu - và khoảng trắng" };
  }
  const tokens = text.match(/\d+|[+-]/g);
  if (!tokens) return { ok: false, message: "Không đọc được biểu thức" };

  const operands: number[] = [];
  const operators: ("+" | "-")[] = [];
  let expectNumber = true;
  for (const token of tokens) {
    if (expectNumber) {
      if (!/^\d+$/.test(token)) return { ok: false, message: `Thiếu số trước dấu "${token}"` };
      operands.push(Number(token));
      expectNumber = false;
    } else {
      if (/^\d+$/.test(token)) return { ok: false, message: "Thiếu dấu phép tính giữa hai số" };
      operators.push(token as "+" | "-");
      expectNumber = true;
    }
  }
  if (expectNumber) return { ok: false, message: "Biểu thức kết thúc bằng dấu phép tính" };
  if (operators.length === 0) return { ok: false, message: "Biểu thức phải có ít nhất một phép tính" };

  let result = operands[0]!;
  operators.forEach((op, i) => {
    result = op === "+" ? result + operands[i + 1]! : result - operands[i + 1]!;
  });

  const digits = Math.max(...operands.map((n) => String(n).length));
  if (digits > 11) return { ok: false, message: "Số vượt quá 11 chữ số" };

  const hasAdd = operators.includes("+");
  const hasSub = operators.includes("-");

  return {
    ok: true,
    exercise: {
      raw: text.replace(/\s+/g, " "),
      digits,
      opsCount: operators.length,
      type: hasAdd && hasSub ? "mixed" : hasSub ? "sub" : "add",
      result,
    },
  };
}

/** Đọc nội dung file CSV/TXT: mỗi dòng là một bài. */
export function parseExerciseFile(content: string): ParseResult {
  const exercises: Exercise[] = [];
  const errors: ParseError[] = [];
  const lines = content.replace(/\r\n?/g, "\n").split("\n");

  lines.forEach((line, index) => {
    if (!line.trim()) return;
    const parsed = parseExpression(line);
    if (parsed.ok) {
      exercises.push({ id: `${index}-${parsed.exercise.raw}`, ...parsed.exercise });
    } else {
      errors.push({ line: index + 1, content: line.trim(), message: parsed.message });
    }
  });

  return { exercises, errors };
}
