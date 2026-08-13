import type { ReactNode, SelectHTMLAttributes } from "react";

interface FieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: ReactNode;
}

export function SelectField({ label, children, id, ...rest }: FieldProps) {
  const selectId = id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label htmlFor={selectId} className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>
      <select
        id={selectId}
        {...rest}
        className="h-11 w-full rounded-lg border border-border bg-card px-3 text-base font-medium text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {children}
      </select>
    </div>
  );
}

export function DigitOptions({ max = 11 }: { max?: number }) {
  return (
    <>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <option key={n} value={n}>
          {n} chữ số
        </option>
      ))}
    </>
  );
}
