import { useCallback, useState } from "react";
import { Soroban } from "@/components/soroban/Soroban";
import { PracticeTimer } from "./PracticeTimer";
import { SelectField, DigitOptions } from "./PracticeControls";
import { SessionSummary } from "./SessionSummary";
import { FeedbackBanner } from "./FeedbackBanner";
import {
  emptySoroban,
  formatDuration,
  formatNumberGroups,
  randomNumberWithDigits,
  sorobanToNumber,
  type SorobanState,
} from "@/lib/soroban";

type Phase = "idle" | "playing" | "checked" | "done";

export function NumberRepresentation() {
  const [digits, setDigits] = useState(3);
  const [count, setCount] = useState(5);
  const [phase, setPhase] = useState<Phase>("idle");
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState(0);
  const [board, setBoard] = useState<SorobanState>(() => emptySoroban());
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [stoppedMs, setStoppedMs] = useState<number | null>(null);
  const [times, setTimes] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [best, setBest] = useState<number | null>(null);

  const nextQuestion = useCallback(
    (nextIndex: number) => {
      setIndex(nextIndex);
      setTarget(randomNumberWithDigits(digits));
      setBoard(emptySoroban());
      setStoppedMs(null);
      setStartedAt(Date.now());
      setPhase("playing");
    },
    [digits],
  );

  const start = () => {
    setTimes([]);
    setCorrectCount(0);
    nextQuestion(0);
  };

  const check = () => {
    if (phase !== "playing" || startedAt === null) return;
    const elapsed = Date.now() - startedAt;
    const value = sorobanToNumber(board);
    const ok = value === target;
    setStoppedMs(elapsed);
    setTimes((t) => [...t, elapsed]);
    setBest((b) => (b === null || elapsed < b ? elapsed : b));
    if (ok) setCorrectCount((c) => c + 1);
    setLastCorrect(ok);
    setPhase("checked");
  };

  const advance = () => {
    if (index + 1 >= count) {
      setPhase("done");
      setStartedAt(null);
      return;
    }
    nextQuestion(index + 1);
  };

  if (phase === "done") {
    return (
      <SessionSummary
        stats={{
          total: count,
          correct: correctCount,
          times,
          extra: [{ label: "Số chữ số", value: `${digits}` }],
        }}
        onRestart={() => setPhase("idle")}
      />
    );
  }

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-card p-3">
        <SelectField
          label="Số chữ số"
          value={digits}
          disabled={phase !== "idle"}
          onChange={(e) => setDigits(Number(e.target.value))}
        >
          <DigitOptions />
        </SelectField>
        <SelectField
          label="Số câu"
          value={count}
          disabled={phase !== "idle"}
          onChange={(e) => setCount(Number(e.target.value))}
        >
          <option value={5}>5 số</option>
          <option value={10}>10 số</option>
        </SelectField>
      </section>

      <section className="rounded-xl border border-border bg-card p-4 text-center">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-muted-foreground">
            {phase === "idle" ? "Chưa bắt đầu" : `Câu ${index + 1} / ${count}`}
          </span>
          <PracticeTimer startedAt={startedAt} stoppedMs={stoppedMs} />
        </div>
        <p className="mt-3 break-all font-mono text-4xl font-black tracking-tight text-foreground sm:text-6xl">
          {phase === "idle" ? "—" : formatNumberGroups(target)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Thời gian tốt nhất: {best === null ? "—" : formatDuration(best)}
        </p>
      </section>

      <Soroban state={board} onChange={setBoard} disabled={phase === "checked"} />

      {phase === "checked" ? (
        <FeedbackBanner
          correct={lastCorrect}
          target={String(target)}
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
            Biểu diễn số
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
          <>
            {!lastCorrect ? (
              <button
                type="button"
                onClick={() => {
                  setBoard(emptySoroban());
                  setStoppedMs(null);
                  setStartedAt(Date.now());
                  setTimes((t) => t.slice(0, -1));
                  setPhase("playing");
                }}
                className="h-12 w-full rounded-xl border border-border bg-card text-base font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Làm lại câu này
              </button>
            ) : null}
            <button
              type="button"
              onClick={advance}
              className="h-14 w-full rounded-xl bg-primary text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {index + 1 >= count ? "Xem kết quả" : "Câu tiếp theo"}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
