import { useCallback, useEffect, useRef, useState } from "react";
import { Soroban } from "@/components/soroban/Soroban";
import { PracticeTimer } from "./PracticeTimer";
import { SelectField, DigitOptions } from "./PracticeControls";
import { SessionSummary } from "./SessionSummary";
import { FeedbackBanner } from "./FeedbackBanner";
import {
  emptySoroban,
  randomNumberWithDigits,
  sorobanToNumber,
  type SorobanState,
} from "@/lib/soroban";

const SPEEDS = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.5, 1.8, 2.0];

type Phase = "idle" | "ready" | "flash" | "input" | "checked" | "done";

export function MentalArithmetic() {
  const [digits, setDigits] = useState(3);
  const [count, setCount] = useState(5);
  const [speedIndex, setSpeedIndex] = useState(2);
  const speed = SPEEDS[speedIndex] ?? 0.5;

  const [phase, setPhase] = useState<Phase>("idle");
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState(0);
  const [board, setBoard] = useState<SorobanState>(() => emptySoroban());
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [stoppedMs, setStoppedMs] = useState<number | null>(null);
  const [times, setTimes] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const runQuestion = useCallback(
    (nextIndex: number) => {
      clearTimers();
      const value = randomNumberWithDigits(digits);
      setIndex(nextIndex);
      setTarget(value);
      setBoard(emptySoroban());
      setStoppedMs(null);
      setStartedAt(null);
      setPhase("ready");
      timers.current.push(
        window.setTimeout(() => {
          setPhase("flash");
          timers.current.push(
            window.setTimeout(() => {
              setPhase("input");
              setStartedAt(Date.now());
            }, speed * 1000),
          );
        }, 900),
      );
    },
    [digits, speed],
  );

  const start = () => {
    setTimes([]);
    setCorrectCount(0);
    runQuestion(0);
  };

  const check = () => {
    if (phase !== "input" || startedAt === null) return;
    const elapsed = Date.now() - startedAt;
    const ok = sorobanToNumber(board) === target;
    setStoppedMs(elapsed);
    setTimes((t) => [...t, elapsed]);
    if (ok) setCorrectCount((c) => c + 1);
    setLastCorrect(ok);
    setPhase("checked");
  };

  const advance = () => {
    if (index + 1 >= count) {
      clearTimers();
      setStartedAt(null);
      setPhase("done");
      return;
    }
    runQuestion(index + 1);
  };

  if (phase === "done") {
    return (
      <SessionSummary
        stats={{
          total: count,
          correct: correctCount,
          times,
          extra: [
            { label: "Số chữ số", value: `${digits}` },
            { label: "Tốc độ hiển thị", value: `${speed.toFixed(1)} giây` },
          ],
        }}
        onRestart={() => setPhase("idle")}
      />
    );
  }

  const configLocked = phase !== "idle";

  return (
    <div className="space-y-4">
      <section className="space-y-3 rounded-xl border border-border bg-card p-3">
        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="Số chữ số"
            value={digits}
            disabled={configLocked}
            onChange={(e) => setDigits(Number(e.target.value))}
          >
            <DigitOptions />
          </SelectField>
          <SelectField
            label="Số câu"
            value={count}
            disabled={configLocked}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            <option value={5}>5 số</option>
            <option value={10}>10 số</option>
          </SelectField>
        </div>
        <div>
          <label
            htmlFor="speed"
            className="flex items-center justify-between text-xs font-semibold text-muted-foreground"
          >
            <span>Thời gian hiển thị</span>
            <span className="font-mono text-sm text-foreground">Tốc độ: {speed.toFixed(1)} giây</span>
          </label>
          <input
            id="speed"
            type="range"
            min={0}
            max={SPEEDS.length - 1}
            step={1}
            value={speedIndex}
            disabled={configLocked}
            aria-valuetext={`${speed.toFixed(1)} giây`}
            onChange={(e) => setSpeedIndex(Number(e.target.value))}
            className="mt-2 h-11 w-full accent-primary"
          />
        </div>
      </section>

      <section className="grid min-h-[9rem] place-items-center rounded-xl border border-border bg-card p-4 text-center">
        <div className="w-full">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold text-muted-foreground">
              {phase === "idle" ? "Chưa bắt đầu" : `Câu ${index + 1} / ${count}`}
            </span>
            <PracticeTimer startedAt={startedAt} stoppedMs={stoppedMs} />
          </div>
          <div className="mt-3" aria-live="polite">
            {phase === "idle" ? (
              <p className="text-sm text-muted-foreground">
                Số sẽ hiện trong {speed.toFixed(1)} giây rồi biến mất.
              </p>
            ) : null}
            {phase === "ready" ? (
              <p className="text-2xl font-bold text-muted-foreground">Sẵn sàng?</p>
            ) : null}
            {phase === "flash" ? (
              <p className="break-all font-mono text-5xl font-black tracking-tight text-foreground sm:text-7xl">
                {target}
              </p>
            ) : null}
            {phase === "input" ? (
              <p className="text-base font-semibold text-muted-foreground">
                Hãy biểu diễn số vừa xem trên bàn tính
              </p>
            ) : null}
            {phase === "checked" ? (
              <p className="break-all font-mono text-3xl font-black text-foreground">{target}</p>
            ) : null}
          </div>
        </div>
      </section>

      <Soroban
        state={board}
        onChange={setBoard}
        disabled={phase === "checked" || phase === "ready" || phase === "flash" || phase === "idle"}
      />

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
            Bắt đầu ảo tính
          </button>
        ) : null}
        {phase === "input" ? (
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
            {index + 1 >= count ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
