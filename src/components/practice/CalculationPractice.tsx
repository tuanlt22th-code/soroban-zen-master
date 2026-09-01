import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Soroban } from "@/components/soroban/Soroban";
import { PracticeTimer } from "./PracticeTimer";
import { SelectField } from "./PracticeControls";
import { SessionSummary } from "./SessionSummary";
import { FeedbackBanner } from "./FeedbackBanner";
import { VerticalProblem } from "./VerticalProblem";
import { emptySoroban, sorobanToNumber, type SorobanState } from "@/lib/soroban";
import { loadSets, type ExerciseSet } from "@/lib/exercises/exerciseStore";
import { filterExercises, type ExerciseFilter } from "@/lib/exercises/exerciseFilter";
import { BUILTIN_BANKS, QUESTION_COUNTS, pickRandom } from "@/lib/exercises/builtinSets";
import type { Exercise } from "@/lib/exercises/exerciseParser";

type Phase = "idle" | "playing" | "checked" | "done";
type Source = "builtin" | "custom";

export function CalculationPractice() {
  const [source, setSource] = useState<Source>("builtin");
  const [bankId, setBankId] = useState(BUILTIN_BANKS[0]!.id);
  const [count, setCount] = useState<number>(10);
  const [sets, setSets] = useState<ExerciseSet[]>([]);
  const [setId, setSetId] = useState("");
  const [filter, setFilter] = useState<ExerciseFilter>({
    digits: "all",
    opsCount: "all",
    type: "all",
  });
  const [phase, setPhase] = useState<Phase>("idle");
  const [queue, setQueue] = useState<Exercise[]>([]);
  const [index, setIndex] = useState(0);
  const [board, setBoard] = useState<SorobanState>(() => emptySoroban());
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [stoppedMs, setStoppedMs] = useState<number | null>(null);
  const [times, setTimes] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadSets();
    setSets(stored);
    if (stored[0]) setSetId(stored[0].id);
  }, []);

  const activeSet = sets.find((s) => s.id === setId) ?? null;
  const activeBank = BUILTIN_BANKS.find((b) => b.id === bankId) ?? BUILTIN_BANKS[0]!;
  const matching = useMemo(
    () => (activeSet ? filterExercises(activeSet.exercises, filter) : []),
    [activeSet, filter],
  );

  const current = queue[index];

  const start = () => {
    let selected: Exercise[];
    if (source === "builtin") {
      selected = pickRandom(activeBank, count);
    } else {
      if (!activeSet) {
        setError("Bạn chưa chọn bộ bài tập.");
        return;
      }
      if (matching.length === 0) {
        setError("Không có bài nào phù hợp với bộ lọc.");
        return;
      }
      selected = matching;
    }
    setError(null);
    setQueue(selected);
    setIndex(0);
    setTimes([]);
    setCorrectCount(0);
    setBoard(emptySoroban());
    setStoppedMs(null);
    setStartedAt(Date.now());
    setPhase("playing");
  };

  const check = () => {
    if (phase !== "playing" || startedAt === null || !current) return;
    const elapsed = Date.now() - startedAt;
    const ok = sorobanToNumber(board) === current.result;
    setStoppedMs(elapsed);
    setTimes((t) => [...t, elapsed]);
    if (ok) setCorrectCount((c) => c + 1);
    setLastCorrect(ok);
    setPhase("checked");
  };

  const advance = () => {
    if (index + 1 >= queue.length) {
      setStartedAt(null);
      setPhase("done");
      return;
    }
    setIndex(index + 1);
    setBoard(emptySoroban());
    setStoppedMs(null);
    setStartedAt(Date.now());
    setPhase("playing");
  };

  if (phase === "done") {
    return (
      <SessionSummary
        stats={{ total: queue.length, correct: correctCount, times }}
        onRestart={() => setPhase("idle")}
      />
    );
  }

  return (
    <div className="space-y-4">
      {phase === "idle" ? (
        <section className="space-y-3 rounded-xl border border-border bg-card p-3">
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { id: "builtin", label: "Bộ soạn sẵn" },
                { id: "custom", label: "Bộ của tôi" },
              ] as { id: Source; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSource(tab.id);
                  setError(null);
                }}
                className={`h-11 rounded-lg border text-sm font-bold transition-colors ${
                  source === tab.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {source === "builtin" ? (
            <>
              <SelectField
                label="Dạng bài (chữ số × số hàng)"
                value={bankId}
                onChange={(e) => setBankId(e.target.value)}
              >
                {BUILTIN_BANKS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.id} — {b.label}
                  </option>
                ))}
              </SelectField>
              <SelectField
                label="Số câu mỗi lượt"
                value={String(count)}
                onChange={(e) => setCount(Number(e.target.value))}
              >
                {QUESTION_COUNTS.map((c) => (
                  <option key={c} value={c}>
                    {c} câu
                  </option>
                ))}
              </SelectField>
              <p className="text-xs text-muted-foreground">
                Lấy ngẫu nhiên {count} bài trong kho {activeBank.problems.length} bài của dạng{" "}
                {activeBank.id}.
              </p>
            </>
          ) : sets.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Chưa có bộ bài tập nào.{" "}
              <Link to="/bo-bai-tap" className="font-semibold text-primary underline">
                Upload bài tập
              </Link>{" "}
              để bắt đầu.
            </p>
          ) : (
            <>
              <SelectField
                label="Chọn bộ bài"
                value={setId}
                onChange={(e) => setSetId(e.target.value)}
              >
                {sets.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.exercises.length} bài)
                  </option>
                ))}
              </SelectField>
              <div className="grid grid-cols-2 gap-3">
                <SelectField
                  label="Số chữ số"
                  value={String(filter.digits)}
                  onChange={(e) =>
                    setFilter((f) => ({
                      ...f,
                      digits: e.target.value === "all" ? "all" : Number(e.target.value),
                    }))
                  }
                >
                  <option value="all">Tất cả</option>
                  <option value="2">2 chữ số</option>
                  <option value="3">3 chữ số</option>
                  <option value="4">4 chữ số</option>
                </SelectField>
                <SelectField
                  label="Số phép tính"
                  value={String(filter.opsCount)}
                  onChange={(e) =>
                    setFilter((f) => ({
                      ...f,
                      opsCount: e.target.value === "all" ? "all" : Number(e.target.value),
                    }))
                  }
                >
                  <option value="all">Tất cả</option>
                  <option value="2">2 phép tính</option>
                  <option value="3">3 phép tính</option>
                </SelectField>
              </div>
              <SelectField
                label="Phép tính"
                value={filter.type}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, type: e.target.value as ExerciseFilter["type"] }))
                }
              >
                <option value="all">Tất cả</option>
                <option value="add">Cộng</option>
                <option value="sub">Trừ</option>
                <option value="mixed">Cộng và trừ</option>
              </SelectField>
              <p className="text-xs text-muted-foreground">
                Có {matching.length} bài phù hợp với bộ lọc.
              </p>
            </>
          )}
        </section>
      ) : null}

      {error ? (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-foreground">
          {error}
        </p>
      ) : null}

      <section className="rounded-xl border border-border bg-card p-4 text-center">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-muted-foreground">
            {phase === "idle" ? "Chưa bắt đầu" : `Câu ${index + 1} / ${queue.length}`}
          </span>
          <PracticeTimer startedAt={startedAt} stoppedMs={stoppedMs} />
        </div>
        <div className="mt-3">
          {current && phase !== "idle" ? (
            current.terms && current.terms.length > 0 ? (
              <VerticalProblem terms={current.terms} />
            ) : (
              <p className="break-words font-mono text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                {current.raw}
              </p>
            )
          ) : (
            <p className="font-mono text-3xl font-black text-muted-foreground">—</p>
          )}
        </div>
      </section>

      <Soroban state={board} onChange={setBoard} disabled={phase !== "playing"} />

      {phase === "checked" && current ? (
        <FeedbackBanner
          correct={lastCorrect}
          target={String(current.result)}
          answer={String(sorobanToNumber(board))}
        />
      ) : null}

      <div className="flex flex-col gap-2">
        {phase === "idle" ? (
          <button
            type="button"
            onClick={start}
            className="h-14 w-full rounded-xl bg-primary text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Bắt đầu
          </button>
        ) : null}
        {phase === "playing" ? (
          <>
            <button
              type="button"
              onClick={check}
              className="h-14 w-full rounded-xl bg-primary text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Kiểm tra
            </button>
            <button
              type="button"
              onClick={() => setBoard(emptySoroban())}
              className="h-12 w-full rounded-xl border border-border bg-card text-base font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Xóa bàn tính
            </button>
          </>
        ) : null}
        {phase === "checked" ? (
          <button
            type="button"
            onClick={advance}
            className="h-14 w-full rounded-xl bg-primary text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {index + 1 >= queue.length ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
