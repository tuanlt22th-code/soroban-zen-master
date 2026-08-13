import { formatDuration } from "@/lib/soroban";

export interface SessionStats {
  total: number;
  correct: number;
  times: number[];
  extra?: { label: string; value: string }[];
}

export function SessionSummary({
  stats,
  onRestart,
}: {
  stats: SessionStats;
  onRestart: () => void;
}) {
  const wrong = stats.total - stats.correct;
  const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
  const avg = stats.times.length
    ? stats.times.reduce((a, b) => a + b, 0) / stats.times.length
    : 0;
  const best = stats.times.length ? Math.min(...stats.times) : 0;

  const rows = [
    { label: "Số câu đúng", value: `${stats.correct}` },
    { label: "Số câu sai", value: `${wrong}` },
    { label: "Tỷ lệ chính xác", value: `${accuracy}%` },
    { label: "Thời gian trung bình", value: formatDuration(avg) },
    { label: "Thời gian nhanh nhất", value: formatDuration(best) },
    ...(stats.extra ?? []),
  ];

  return (
    <section className="rounded-xl border border-border bg-card p-4" aria-live="polite">
      <h2 className="text-lg font-bold text-foreground">Kết quả luyện tập</h2>
      <dl className="mt-3 divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 py-2">
            <dt className="text-sm text-muted-foreground">{row.label}</dt>
            <dd className="font-mono text-base font-semibold tabular-nums text-foreground">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={onRestart}
        className="mt-4 h-12 w-full rounded-xl bg-primary text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Luyện lại
      </button>
    </section>
  );
}
