import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PracticeShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="border-b border-border bg-card/80">
        <div className="mx-auto grid max-w-3xl grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-3">
          <Link
            to="/"
            aria-label="Quay lại trang chủ"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-foreground">{title}</h1>
            {subtitle ? (
              <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-3 py-4 pb-16 sm:px-4">{children}</main>
    </div>
  );
}
