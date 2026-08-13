import { memo } from "react";

interface SorobanBeadProps {
  active: boolean;
  top: number; // vị trí (tính theo số ô hạt) từ đỉnh vùng chứa
  label: string;
  onActivate: () => void;
}

function SorobanBeadBase({ active, top, label, onActivate }: SorobanBeadProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onActivate}
      className="soroban-bead"
      data-active={active ? "true" : "false"}
      style={{ top: `calc(${top} * var(--bead-h))` }}
    >
      <span className="soroban-bead-body" />
    </button>
  );
}

export const SorobanBead = memo(SorobanBeadBase);
