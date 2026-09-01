interface VerticalProblemProps {
  terms: number[];
}

/** Hiển thị phép tính xếp theo cột dọc như trong sách luyện Soroban. */
export function VerticalProblem({ terms }: VerticalProblemProps) {
  return (
    <div className="mx-auto inline-block text-right font-mono text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
      {terms.map((term, i) => (
        <div key={i} className="flex items-center justify-end gap-3 tabular-nums">
          <span className="w-5 text-center text-muted-foreground">
            {i === 0 ? "" : term < 0 ? "−" : "+"}
          </span>
          <span>{Math.abs(term).toLocaleString("vi-VN")}</span>
        </div>
      ))}
      <div className="mt-1 border-t-4 border-foreground/70" />
    </div>
  );
}
