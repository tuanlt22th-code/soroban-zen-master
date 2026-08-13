import { useEffect, useRef, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { parseExerciseFile, type ParseError } from "@/lib/exercises/exerciseParser";
import { addSet, loadSets, removeSet, type ExerciseSet } from "@/lib/exercises/exerciseStore";

export function ExerciseLibrary() {
  const [sets, setSets] = useState<ExerciseSet[]>([]);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [fatal, setFatal] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setSets(loadSets()), []);

  const handleFile = async (file: File) => {
    setErrors([]);
    setMessage(null);
    setFatal(null);
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "csv" && ext !== "txt") {
      setFatal("Chỉ hỗ trợ file .csv hoặc .txt");
      return;
    }
    let content = "";
    try {
      content = await file.text();
    } catch {
      setFatal("Không đọc được file. Vui lòng thử lại.");
      return;
    }
    if (!content.trim()) {
      setFatal("File rỗng, không có bài tập nào.");
      return;
    }
    const { exercises, errors: parseErrors } = parseExerciseFile(content);
    setErrors(parseErrors);
    if (exercises.length === 0) {
      setFatal("Không có dòng bài tập hợp lệ nào trong file.");
      return;
    }
    const setName = name.trim() || file.name.replace(/\.(csv|txt)$/i, "");
    addSet(setName, exercises);
    setSets(loadSets());
    setName("");
    setMessage(`Đã thêm bộ "${setName}" với ${exercises.length} bài.`);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (id: string) => {
    removeSet(id);
    setSets(loadSets());
  };

  return (
    <div className="space-y-4">
      <section className="space-y-3 rounded-xl border border-border bg-card p-4">
        <h2 className="text-base font-bold text-foreground">Upload bài tập</h2>
        <p className="text-sm text-muted-foreground">
          Mỗi dòng là một bài, ví dụ: <span className="font-mono">125 + 37 - 18</span>. Chỉ chấp
          nhận chữ số, dấu +, dấu - và khoảng trắng.
        </p>
        <div className="flex flex-col gap-1">
          <label htmlFor="set-name" className="text-xs font-semibold text-muted-foreground">
            Tên bộ bài tập
          </label>
          <input
            id="set-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Bài tập tuần 1"
            className="h-11 rounded-lg border border-border bg-background px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <input
          ref={inputRef}
          id="set-file"
          type="file"
          accept=".csv,.txt,text/csv,text/plain"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />
        <label
          htmlFor="set-file"
          className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Upload className="h-5 w-5" aria-hidden="true" />
          Chọn file CSV / TXT
        </label>

        {fatal ? (
          <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-foreground">
            {fatal}
          </p>
        ) : null}
        {message ? (
          <p role="status" className="rounded-lg border border-success/40 bg-success/10 p-3 text-sm text-foreground">
            {message}
          </p>
        ) : null}
        {errors.length > 0 ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
            <p className="font-semibold text-foreground">
              {errors.length} dòng bị lỗi (đã bỏ qua):
            </p>
            <ul className="mt-1 space-y-1 text-muted-foreground">
              {errors.slice(0, 20).map((err) => (
                <li key={err.line} className="break-words font-mono text-xs">
                  Dòng {err.line}: "{err.content}" — {err.message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-base font-bold text-foreground">Bộ bài tập</h2>
        {sets.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Chưa có bộ bài tập nào.</p>
        ) : (
          <ul className="mt-2 divide-y divide-border">
            {sets.map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.exercises.length} bài</p>
                </div>
                <button
                  type="button"
                  aria-label={`Xóa bộ ${s.name}`}
                  onClick={() => handleRemove(s.id)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
