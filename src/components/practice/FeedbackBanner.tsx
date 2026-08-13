import { Check, X } from "lucide-react";

export function FeedbackBanner({
  correct,
  target,
  answer,
}: {
  correct: boolean;
  target: string;
  answer: string;
}) {
  return (
    <div
      role="status"
      aria-live="assertive"
      data-correct={correct ? "true" : "false"}
      className="flex items-start gap-3 rounded-xl border p-3 data-[correct=false]:border-destructive/40 data-[correct=false]:bg-destructive/10 data-[correct=true]:border-success/40 data-[correct=true]:bg-success/10"
    >
      {correct ? (
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
      ) : (
        <X className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
      )}
      <div className="min-w-0">
        <p className="text-base font-bold text-foreground">{correct ? "Đúng!" : "Sai"}</p>
        {!correct ? (
          <p className="mt-1 break-words font-mono text-sm text-muted-foreground">
            Đáp án: <span className="font-bold text-foreground">{target}</span> · Bạn biểu diễn:{" "}
            <span className="font-bold text-foreground">{answer}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
