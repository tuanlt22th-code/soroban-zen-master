import { useEffect, useState } from "react";
import { formatDuration } from "@/lib/soroban";

interface PracticeTimerProps {
  startedAt: number | null;
  /** Khi có giá trị, đồng hồ dừng lại và hiển thị giá trị này. */
  stoppedMs: number | null;
}

export function PracticeTimer({ startedAt, stoppedMs }: PracticeTimerProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (startedAt === null || stoppedMs !== null) return;
    const id = window.setInterval(() => setNow(Date.now()), 50);
    return () => window.clearInterval(id);
  }, [startedAt, stoppedMs]);

  const elapsed = stoppedMs ?? (startedAt === null ? 0 : Math.max(0, now - startedAt));

  return (
    <span
      role="timer"
      aria-label="Thời gian câu hiện tại"
      aria-live="off"
      className="font-mono text-lg font-semibold tabular-nums text-foreground sm:text-xl"
    >
      {formatDuration(elapsed)}
    </span>
  );
}
