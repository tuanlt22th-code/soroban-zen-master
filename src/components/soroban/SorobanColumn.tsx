import { memo } from "react";
import { SorobanBead } from "./SorobanBead";
import type { ColumnState } from "@/lib/soroban";

interface SorobanColumnProps {
  index: number;
  total: number;
  state: ColumnState;
  disabled?: boolean;
  onChange: (index: number, next: ColumnState) => void;
}

function SorobanColumnBase({ index, total, state, disabled, onChange }: SorobanColumnProps) {
  const place = total - index; // 1 = hàng đơn vị
  const set = (next: ColumnState) => {
    if (disabled) return;
    onChange(index, next);
  };

  return (
    <div className="soroban-column" role="group" aria-label={`Cột thứ ${place} từ phải sang`}>
      <div className="soroban-rod" aria-hidden="true" />
      <div className="soroban-heaven">
        <SorobanBead
          active={state.heaven}
          top={state.heaven ? 1 : 0}
          label={`Cột ${place} · hạt trên (5)${state.heaven ? " · đang bật" : ""}`}
          onActivate={() => set({ ...state, heaven: !state.heaven })}
        />
      </div>
      <div className="soroban-bar" aria-hidden="true" />
      <div className="soroban-earth">
        {[0, 1, 2, 3].map((i) => {
          const active = i < state.earth;
          return (
            <SorobanBead
              key={i}
              active={active}
              top={active ? i : i + 1}
              label={`Cột ${place} · hạt dưới thứ ${i + 1}${active ? " · đang bật" : ""}`}
              onActivate={() =>
                set({ ...state, earth: (active ? i : i + 1) as ColumnState["earth"] })
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export const SorobanColumn = memo(SorobanColumnBase);
